"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getPropertyDetail } from "@/lib/api/property-detail"
import { PropertyDetail } from "@/lib/types/property-detail"
import { 
  Loader2, 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Ruler, 
  Tag,
  Home,
  Building,
  MessageCircle,
  CheckCircle,
  Share2,
  Copy,
  Check,
  X
} from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const amenitiesLabels: Record<string, string> = {
  air_conditioning: 'Ar Condicionado',
  elevator: 'Elevador',
  pool: 'Piscina',
  grill: 'Churrasqueira',
  kitchen: 'Cozinha',
  balcony: 'Varanda',
  laundry_room: 'Área de Serviço',
  home_office: 'Escritório',
  internet: 'Internet',
  interfone: 'Interfone',
  doorman: 'Portaria',
  gourmet_area: 'Área Gourmet',
  terrace: 'Terraço',
  closet: 'Closet',
  built_in_furniture: 'Mobília Planejada',
}

const typeLabels: Record<string, string> = {
  house: 'Casa',
  apartment: 'Apartamento',
  land: 'Terreno',
  office: 'Escritório',
  store: 'Loja',
  farm: 'Fazenda',
  small_farm: 'Chácara',
}

export function PropertyDetailPageClient() {
  const params = useParams()
  const [property, setProperty] = useState<PropertyDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [gallerySwiper, setGallerySwiper] = useState<SwiperType | null>(null)
  const [propertyUrl, setPropertyUrl] = useState('')

  const propertyId = params.id as string

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPropertyUrl(window.location.href)
    }
  }, [])

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getPropertyDetail(propertyId)

        if (response.status && response.data) {
          setProperty(response.data)
        } else {
          setError(response.message || 'Imóvel não encontrado')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar imóvel')
      } finally {
        setLoading(false)
      }
    }

    if (propertyId) {
      loadProperty()
    }
  }, [propertyId])

  const formatCurrency = (value: number | null) => {
    if (!value) return null
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getLocationText = () => {
    if (!property) return ""
    const parts: string[] = []
    if (property.street) parts.push(property.street)
    if (property.address_number) parts.push(property.address_number)
    if (property.neighborhood) parts.push(property.neighborhood.name)
    if (property.city) parts.push(property.city.name)
    if (property.state) parts.push(property.state.uf)
    return parts.join(", ") || "Localização não informada"
  }

  const getWhatsAppMessage = () => {
    if (!property) return ""
    return `Olá! Tenho interesse no imóvel ${property.code} - ${property.title}.\n\n${propertyUrl}`
  }

  const whatsappUrl = `https://wa.me/554599382315?text=${encodeURIComponent(getWhatsAppMessage())}`

  const handleShare = async () => {
    if (!property) return

    const shareData = {
      title: property.title,
      text: `Confira este imóvel: ${property.title} - Código: ${property.code}`,
      url: propertyUrl,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.log('Erro ao compartilhar:', err)
        }
      }
    } else {
      handleCopyLink()
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(propertyUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar link:', err)
    }
  }

  // Função para extrair o ID do vídeo do YouTube e converter para URL de embed
  const getYouTubeEmbedUrl = (url: string): string | null => {
    if (!url) return null
    
    // Padrões de URL do YouTube
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`
      }
    }
    
    // Se já for uma URL de embed, retornar como está
    if (url.includes('youtube.com/embed/')) {
      return url
    }
    
    return null
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#FFCC00]" />
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-20 text-center">
            <p className="text-red-600 text-lg mb-4">{error || 'Imóvel não encontrado'}</p>
            <Link href="/properties">
              <Button className="bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-black">
                Voltar para Imóveis
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const sortedImages = property.images.sort((a, b) => a.order - b.order)
  const sortedVideos = property.videos ? property.videos.sort((a, b) => a.order - b.order) : []

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full overflow-x-hidden">
        {/* Botão Voltar e Compartilhar */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <Link href="/properties">
                <Button variant="ghost" className="text-gray-600 hover:text-black text-sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Voltar para Imóveis</span>
                  <span className="sm:hidden">Voltar</span>
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleCopyLink}
                  className="text-gray-600 hover:text-black text-sm px-2 sm:px-4"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Link Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Copiar Link</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="text-gray-600 hover:text-black text-sm px-2 sm:px-4"
                >
                  <Share2 className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Compartilhar</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Galeria de Imagens - Grid Preview */}
        <div className="bg-white w-full overflow-x-hidden">
          <div className="container mx-auto px-4 py-8 w-full max-w-full">
            {sortedImages.length > 0 ? (
              <div className="relative w-full">
                {/* Grid de Preview das Fotos */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 relative w-full">
                  {/* Primeira foto grande (esquerda) */}
                  <div className="row-span-2 col-span-2 md:col-span-2 relative h-[200px] sm:h-[300px] md:h-[500px] w-full">
                    <Image
                      src={sortedImages[0].url}
                      alt={`${property.title} - Imagem principal`}
                      fill
                      className="object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        setShowGallery(true)
                        setTimeout(() => {
                          if (gallerySwiper) {
                            gallerySwiper.slideTo(0)
                          }
                        }, 100)
                      }}
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Segunda foto (topo direito) */}
                  {sortedImages[1] && (
                    <div className="relative h-[95px] sm:h-[145px] md:h-[245px] w-full">
                      <Image
                        src={sortedImages[1].url}
                        alt={`${property.title} - Imagem 2`}
                        fill
                        className="object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => {
                          setShowGallery(true)
                          setTimeout(() => {
                            if (gallerySwiper) {
                              gallerySwiper.slideTo(1)
                            }
                          }, 100)
                        }}
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  )}

                  {/* Terceira foto (meio direito) */}
                  {sortedImages[2] && (
                    <div className="relative h-[95px] sm:h-[145px] md:h-[245px] w-full">
                      <Image
                        src={sortedImages[2].url}
                        alt={`${property.title} - Imagem 3`}
                        fill
                        className="object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => {
                          setShowGallery(true)
                          setTimeout(() => {
                            if (gallerySwiper) {
                              gallerySwiper.slideTo(2)
                            }
                          }, 100)
                        }}
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  )}

                  {/* Quarta foto (baixo direito) */}
                  {sortedImages[3] && (
                    <div className="relative h-[95px] sm:h-[145px] md:h-[245px] w-full">
                      <Image
                        src={sortedImages[3].url}
                        alt={`${property.title} - Imagem 4`}
                        fill
                        className="object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => {
                          setShowGallery(true)
                          setTimeout(() => {
                            if (gallerySwiper) {
                              gallerySwiper.slideTo(3)
                            }
                          }, 100)
                        }}
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  )}

                  {/* Botão Visualizar Fotos */}
                  <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 z-10">
                    <Button
                      onClick={() => setShowGallery(true)}
                      className="bg-white hover:bg-gray-100 text-black shadow-lg text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
                    >
                      Visualizar Fotos
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[300px] sm:h-[500px] md:h-[600px] flex items-center justify-center bg-gray-200 rounded-lg w-full">
                <span className="text-gray-400">Sem imagens disponíveis</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal de Galeria Completa */}
        {showGallery && sortedImages.length > 0 && (
          <div 
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowGallery(false)
              }
            }}
          >
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-[101] text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
              aria-label="Fechar galeria"
            >
              <X className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>
            
            <div className="w-full max-w-7xl h-full flex flex-col py-2 sm:py-12 overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                onSwiper={setGallerySwiper}
                className="h-full w-full"
              >
                {sortedImages.map((image) => (
                  <SwiperSlide key={image.id}>
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                      <Image
                        src={image.url}
                        alt={`${property.title} - Imagem ${image.order}`}
                        width={1200}
                        height={800}
                        className="max-w-full max-h-full object-contain"
                        priority={image.order === 1}
                        unoptimized
                        sizes="100vw"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-8 w-full max-w-full overflow-x-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2 space-y-6 w-full min-w-0">
              {/* Título e Código */}
              <div className="w-full min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 break-words">{property.title}</h1>
                  <span className="bg-[#FFCC00] text-black px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap self-start sm:self-auto">
                    Código: {property.code}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-gray-600 text-sm sm:text-base">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFCC00] mt-0.5 flex-shrink-0" />
                  <span className="break-words">{getLocationText()}</span>
                </div>
              </div>

              {/* Descrição */}
              {property.description && (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Descrição</h2>
                    <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Características */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Características</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {property.number_bedrooms !== null && (
                      <div className="flex items-center gap-2">
                        <Bed className="h-5 w-5 text-[#FFCC00]" />
                        <div>
                          <p className="text-sm text-gray-500">Quartos</p>
                          <p className="font-semibold">{property.number_bedrooms}</p>
                        </div>
                      </div>
                    )}
                    {property.number_suites !== null && (
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5 text-[#FFCC00]" />
                        <div>
                          <p className="text-sm text-gray-500">Suítes</p>
                          <p className="font-semibold">{property.number_suites}</p>
                        </div>
                      </div>
                    )}
                    {property.number_bathrooms !== null && (
                      <div className="flex items-center gap-2">
                        <Bath className="h-5 w-5 text-[#FFCC00]" />
                        <div>
                          <p className="text-sm text-gray-500">Banheiros</p>
                          <p className="font-semibold">{property.number_bathrooms}</p>
                        </div>
                      </div>
                    )}
                    {property.number_parking_spaces !== null && (
                      <div className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-[#FFCC00]" />
                        <div>
                          <p className="text-sm text-gray-500">Vagas</p>
                          <p className="font-semibold">{property.number_parking_spaces}</p>
                        </div>
                      </div>
                    )}
                    {property.private_area !== null && (
                      <div className="flex items-center gap-2">
                        <Ruler className="h-5 w-5 text-[#FFCC00]" />
                        <div>
                          <p className="text-sm text-gray-500">Área Privativa</p>
                          <p className="font-semibold">{property.private_area} m²</p>
                        </div>
                      </div>
                    )}
                    {property.total_area !== null && (
                      <div className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-[#FFCC00]" />
                        <div>
                          <p className="text-sm text-gray-500">Área Total</p>
                          <p className="font-semibold">{property.total_area} m²</p>
                        </div>
                      </div>
                    )}
                    {property.useful_area !== null && (
                      <div className="flex items-center gap-2">
                        <Ruler className="h-5 w-5 text-[#FFCC00]" />
                        <div>
                          <p className="text-sm text-gray-500">Área Útil</p>
                          <p className="font-semibold">{property.useful_area} m²</p>
                        </div>
                      </div>
                    )}
                    {property.type && (
                      <div className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-[#FFCC00]" />
                        <div>
                          <p className="text-sm text-gray-500">Tipo</p>
                          <p className="font-semibold">{typeLabels[property.type] || property.type}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Comodidades */}
              {property.amenities && property.amenities.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Comodidades</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-[#FFCC00]" />
                          <span>{amenitiesLabels[amenity] || amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Vídeos */}
              {sortedVideos.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Vídeos</h2>
                    <div className="space-y-6">
                      {sortedVideos.map((video) => {
                        const embedUrl = getYouTubeEmbedUrl(video.url)
                        if (!embedUrl) return null
                        
                        return (
                          <div key={video.id} className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                              src={embedUrl}
                              title={`Vídeo do imóvel ${property.title}`}
                              className="absolute top-0 left-0 w-full h-full rounded-lg"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar - Informações e Contato */}
            <div className="lg:col-span-1 w-full min-w-0">
              <Card className="sticky top-4 w-full">
                <CardContent className="pt-6 w-full">
                  {/* Valores */}
                  <div className="space-y-4 mb-6">
                    {property.sale_value && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Venda</p>
                        <p className="text-2xl font-bold text-[#FFCC00]">
                          {formatCurrency(property.sale_value)}
                        </p>
                      </div>
                    )}
                    {property.lease_value && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Locação</p>
                        <p className="text-2xl font-bold text-[#FFCC00]">
                          {formatCurrency(property.lease_value)}
                        </p>
                      </div>
                    )}
                    {property.condominium_value && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Condomínio</p>
                        <p className="text-lg font-semibold text-gray-700">
                          {formatCurrency(property.condominium_value)}
                        </p>
                      </div>
                    )}
                    {property.iptu_value && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">IPTU</p>
                        <p className="text-lg font-semibold text-gray-700">
                          {formatCurrency(property.iptu_value)}
                        </p>
                      </div>
                    )}
                    {property.value_fire_insurance && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Seguro Incêndio</p>
                        <p className="text-lg font-semibold text-gray-700">
                          {formatCurrency(property.value_fire_insurance)}
                        </p>
                      </div>
                    )}
                    {!property.sale_value && !property.lease_value && (
                      <p className="text-gray-500">Valor sob consulta</p>
                    )}
                  </div>

                  {/* Negociações */}
                  {property.negotiations && property.negotiations.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-2">Negociação</p>
                      <div className="flex flex-wrap gap-2">
                        {property.negotiations.map((neg) => (
                          <span
                            key={neg}
                            className="bg-[#FFCC00] text-black px-3 py-1 rounded-full text-sm font-semibold"
                          >
                            {neg === 'sale' ? 'Venda' : 'Locação'}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Financiamento */}
                  {property.financing !== null && (
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-1">Financiamento</p>
                      <p className="font-semibold">
                        {property.financing ? 'Aceita' : 'Não aceita'}
                      </p>
                    </div>
                  )}

                  {/* Botão de Contato */}
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg py-6">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Entrar em Contato
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
