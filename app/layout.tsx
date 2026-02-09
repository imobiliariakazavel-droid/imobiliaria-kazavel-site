import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://imobiliariakazavel.com.br"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Imobiliária Kazavel - Imóveis em Cascavel",
    template: "%s | Imobiliária Kazavel",
  },
  description: "Encontre o imóvel ideal em Cascavel. Imobiliária Kazavel oferece casas, apartamentos, terrenos e muito mais. Busque por filtros e encontre seu novo lar.",
  keywords: [
    "imobiliária",
    "imóveis Cascavel",
    "casas à venda",
    "apartamentos à venda",
    "terrenos Cascavel",
    "imobiliária Kazavel",
    "comprar imóvel Cascavel",
    "alugar imóvel Cascavel",
    "imóveis em Cascavel PR",
  ],
  applicationName: "Imobiliária Kazavel",
  authors: [{ name: "Imobiliária Kazavel" }],
  creator: "Imobiliária Kazavel",
  publisher: "Imobiliária Kazavel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Imobiliária Kazavel",
    title: "Imobiliária Kazavel - Imóveis em Cascavel",
    description: "Encontre o imóvel ideal em Cascavel. Imobiliária Kazavel oferece casas, apartamentos, terrenos e muito mais.",
    images: [
      {
        url: "https://bdxoocqlcrurivdxkxao.supabase.co/storage/v1/object/public/project/logo_black.png",
        width: 1200,
        height: 630,
        alt: "Imobiliária Kazavel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imobiliária Kazavel - Imóveis em Cascavel",
    description: "Encontre o imóvel ideal em Cascavel. Imobiliária Kazavel oferece casas, apartamentos, terrenos e muito mais.",
    images: ["https://bdxoocqlcrurivdxkxao.supabase.co/storage/v1/object/public/project/logo_black.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://bdxoocqlcrurivdxkxao.supabase.co/storage/v1/object/public/project/favicon_2.jpg",
    shortcut: "https://bdxoocqlcrurivdxkxao.supabase.co/storage/v1/object/public/project/favicon_2.jpg",
    apple: "https://bdxoocqlcrurivdxkxao.supabase.co/storage/v1/object/public/project/favicon_2.jpg",
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "Y-oeOPHwB5-k3rimtGjfvXqs5CXmZU7mfGCHrUnShro",
  },
  other: {
    "og:site_name": "Imobiliária Kazavel",
    "application-name": "Imobiliária Kazavel",
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
