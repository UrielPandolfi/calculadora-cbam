import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coldwell Banker | Tu siguiente nivel",
  description: "Descubre el potencial de convertir tu agencia inmobiliaria en una franquicia Coldwell Banker. Cuatro preguntas, un ejercicio a tu medida.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body className="antialiased">{children}</body>
    </html>
  );
}
