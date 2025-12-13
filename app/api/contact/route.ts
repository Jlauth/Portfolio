import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Limitation simple du rate limiting (en production, utilisez Redis ou un service dédié)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute
    return true;
  }

  if (userLimit.count >= 5) {
    // Maximum 5 requêtes par minute
    return false;
  }

  userLimit.count++;
  return true;
}

function sanitizeString(input: string, maxLength: number): string {
  // Supprimer les caractères dangereux et limiter la longueur
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, "") // Protection XSS basique
    .replace(/\s+/g, " "); // Normaliser les espaces
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    // Si la clé secrète n'est pas configurée, accepter la requête (pour le développement)
    console.warn("reCAPTCHA secret key non configurée - la vérification est désactivée");
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json();
    
    // Logger les détails pour le debug
    console.log("reCAPTCHA verification result:", {
      success: data.success,
      score: data.score,
      errors: data["error-codes"],
    });
    
    // Vérifier que la requête est réussie et que le score est acceptable (>= 0.5)
    const isValid = data.success === true && (data.score || 0) >= 0.5;
    
    if (!isValid) {
      console.warn("reCAPTCHA validation failed:", {
        success: data.success,
        score: data.score,
        errors: data["error-codes"],
      });
    }
    
    return isValid;
  } catch (error) {
    console.error("Erreur lors de la vérification reCAPTCHA:", error);
    return false;
  }
}

function validateFormData(data: {
  name?: string;
  email?: string;
  message?: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validation du nom
  if (!data.name || typeof data.name !== "string") {
    errors.push("Le nom est requis");
  } else {
    const sanitizedName = sanitizeString(data.name, 100);
    if (sanitizedName.length < 2) {
      errors.push("Le nom doit contenir au moins 2 caractères");
    }
    if (sanitizedName.length > 100) {
      errors.push("Le nom est trop long (maximum 100 caractères)");
    }
  }

  // Validation de l'email
  if (!data.email || typeof data.email !== "string") {
    errors.push("L'email est requis");
  } else {
    const sanitizedEmail = sanitizeString(data.email, 254);
    if (!validateEmail(sanitizedEmail)) {
      errors.push("L'email n'est pas valide");
    }
  }

  // Validation du message
  if (!data.message || typeof data.message !== "string") {
    errors.push("Le message est requis");
  } else {
    const sanitizedMessage = sanitizeString(data.message, 2000);
    if (sanitizedMessage.length < 10) {
      errors.push("Le message doit contenir au moins 10 caractères");
    }
    if (sanitizedMessage.length > 2000) {
      errors.push("Le message est trop long (maximum 2000 caractères)");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function POST(request: NextRequest) {
  try {
    // Récupérer l'IP pour le rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Vérifier le rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez patienter avant de réessayer." },
        { status: 429 }
      );
    }

    // Parser le body
    const body = await request.json();

    // Vérifier le honeypot (si le champ website est rempli, c'est un bot)
    if (body.website && body.website.trim() !== "") {
      // C'est probablement un bot, rejeter silencieusement
      return NextResponse.json(
        { success: true, message: "Message envoyé avec succès" },
        { status: 200 }
      );
    }

    // Vérifier le token reCAPTCHA (optionnel en dev, obligatoire en prod)
    const recaptchaToken = body.recaptchaToken;
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    // Si reCAPTCHA est configuré, vérifier le token
    if (recaptchaSecretKey && recaptchaSecretKey !== "your_recaptcha_secret_key") {
      if (!recaptchaToken) {
        return NextResponse.json(
          { error: "Vérification de sécurité requise" },
          { status: 400 }
        );
      }

      const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
      if (!isRecaptchaValid) {
        console.error("reCAPTCHA validation failed for token:", recaptchaToken?.substring(0, 20) + "...");
        return NextResponse.json(
          { error: "Échec de la vérification de sécurité. Veuillez réessayer." },
          { status: 400 }
        );
      }
    }

    // Valider les données
    const validation = validateFormData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: "Données invalides", details: validation.errors },
        { status: 400 }
      );
    }

    // Sanitiser les données
    const sanitizedData = {
      name: sanitizeString(body.name, 100),
      email: sanitizeString(body.email, 254).toLowerCase(),
      message: sanitizeString(body.message, 2000),
    };

    // Vérifier que Supabase est configuré
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase n'est pas configuré");
      return NextResponse.json(
        { error: "Service temporairement indisponible" },
        { status: 503 }
      );
    }

    // Créer le client Supabase
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Insérer dans la base de données
    const { error } = await supabase.from("contacts").insert([
      {
        name: sanitizedData.name,
        email: sanitizedData.email,
        message: sanitizedData.message,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Erreur Supabase:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi du message" },
        { status: 500 }
      );
    }

    // Envoyer un email de notification (optionnel, ne bloque pas si ça échoue)
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "lauth_jean@live.fr";

    if (resendApiKey && resendApiKey !== "your_resend_api_key_here") {
      try {
        const resend = new Resend(resendApiKey);
        const emailResult = await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>", // Remplacez par votre domaine vérifié
          to: notificationEmail,
          subject: `Nouveau message de contact de ${sanitizedData.name}`,
          html: `
            <h2>Nouveau message de contact</h2>
            <p><strong>Nom:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Message:</strong></p>
            <p>${sanitizedData.message.replace(/\n/g, "<br>")}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">Message reçu le ${new Date().toLocaleString("fr-FR")}</p>
          `,
        });
        console.log("Email envoyé avec succès:", emailResult);
      } catch (emailError) {
        // Ne pas bloquer si l'email échoue, juste logger
        console.error("Erreur lors de l'envoi de l'email:", emailError);
      }
    } else {
      console.warn("RESEND_API_KEY non configurée ou invalide. Email non envoyé.");
    }

    return NextResponse.json(
      { success: true, message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

