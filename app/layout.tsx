import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Imobiliária Kazavel",
  description: "Site institucional para uma imobiliária com opção para buscar imóveis por filtro",
  icons: {
    icon: "https://bdxoocqlcrurivdxkxao.supabase.co/storage/v1/object/public/project/favicon.png",
    shortcut: "https://bdxoocqlcrurivdxkxao.supabase.co/storage/v1/object/public/project/favicon.png",
    apple: "https://bdxoocqlcrurivdxkxao.supabase.co/storage/v1/object/public/project/favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
