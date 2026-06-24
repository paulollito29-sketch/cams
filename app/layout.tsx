import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Nutrigo — Nutrición Inteligente",
  description:
    "Calculamos tus necesidades nutricionales según tu actividad, horarios y preferencias.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-stone-50 text-stone-800 antialiased">{children}</body>
    </html>
  )
}
