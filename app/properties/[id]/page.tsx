import { Metadata } from "next"
import { PropertyDetailPageClient } from "./PropertyDetailPageClient"
import { supabase } from "@/lib/supabase"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://imobiliariakazavel.com.br"

async function getPropertyForMetadata(id: string) {
  try {
    const { data, error } = await supabase.rpc('get_propertie_client', {
      p_id: id,
    })

    if (error || !data || !data.status || !data.data) {
      return null
    }

    return data.data
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const property = await getPropertyForMetadata(params.id)

  if (!property) {
    return {
      title: "Imóvel não encontrado",
      description: "O imóvel solicitado não foi encontrado.",
    }
  }

  const title = `${property.title} - Código ${property.code} | Imobiliária Kazavel`
  const description = property.description 
    ? `${property.description.substring(0, 160)}...` 
    : `Imóvel ${property.type === 'house' ? 'Casa' : property.type === 'apartment' ? 'Apartamento' : 'Imóvel'} em ${property.city?.name || 'Cascavel'}. ${property.sale_value ? `Venda: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.sale_value)}` : ''} ${property.lease_value ? `Locação: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.lease_value)}` : ''}`

  const imageUrl = property.images && property.images.length > 0 
    ? property.images[0].url 
    : "https://bdxoocqlcrurivdxkxao.supabase.co/storage/v1/object/public/project/logo_black.png"

  const url = `${siteUrl}/properties/${params.id}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Imobiliária Kazavel",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  return <PropertyDetailPageClient />
}
