import { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://imobiliariakazavel.com.br"

export const metadata: Metadata = {
  title: "Imóveis em Cascavel - Imobiliária Kazavel",
  description: "Encontre o imóvel ideal em Cascavel. Busque casas, apartamentos, terrenos e muito mais com filtros avançados. Imobiliária Kazavel - Seu novo lar está aqui.",
  keywords: [
    "imóveis Cascavel",
    "casas à venda Cascavel",
    "apartamentos Cascavel",
    "terrenos Cascavel",
    "imóveis para alugar Cascavel",
    "imobiliária Cascavel",
    "comprar imóvel Cascavel",
  ],
  openGraph: {
    title: "Imóveis em Cascavel - Imobiliária Kazavel",
    description: "Encontre o imóvel ideal em Cascavel. Busque casas, apartamentos, terrenos e muito mais com filtros avançados.",
    url: `${siteUrl}/properties`,
    siteName: "Imobiliária Kazavel",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imóveis em Cascavel - Imobiliária Kazavel",
    description: "Encontre o imóvel ideal em Cascavel. Busque casas, apartamentos, terrenos e muito mais.",
  },
  alternates: {
    canonical: `${siteUrl}/properties`,
  },
}

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
