import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { RecaptchaProvider } from "@/components/RecaptchaProvider";

export const metadata: Metadata = {
  title: "Portfolio Développeur Web",
  description: "Portfolio moderne d'un développeur web full-stack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <RecaptchaProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </RecaptchaProvider>
      </body>
    </html>
  );
}

