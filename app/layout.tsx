import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AeroPlay.ma — Waitlist avions télécommandés au Maroc",
  description:
    "Rejoins la waitlist AeroPlay.ma pour les avions RC au Maroc. Choisis ton modèle, indique ton budget et reçois une proposition au lancement.",
  openGraph: {
    title: "AeroPlay.ma — Waitlist avions télécommandés au Maroc",
    description:
      "Avions RC pour débutants et passionnés au Maroc. Inscription waitlist gratuite, sans paiement aujourd'hui.",
    locale: "fr_MA",
    siteName: "AeroPlay.ma",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-slate-900">
        {children}
      </body>
    </html>
  );
}
