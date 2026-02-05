"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Property } from "@/lib/types/properties"
import { MapPin, Bed, Bath, Car, Ruler, Tag, ChevronLeft, ChevronRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"

// Importar estilos do Swiper
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const images = property.images && property.images.length > 0 
    ? property.images.sort((a, b) => a.order - b.order)
    : []
  
  const hasMultipleImages = images.length > 1

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
    const parts: string[] = []
    if (property.neighborhood) parts.push(property.neighborhood.name)
    if (property.city) parts.push(property.city.name)
    if (property.state) parts.push(property.state.uf)
    return parts.join(", ") || "Localização não informada"
  }

  const getNegotiationText = () => {
    if (property.negotiations.length === 2) return "Venda e Locação"
    if (property.negotiations.includes('sale')) return "Venda"
    if (property.negotiations.includes('lease')) return "Locação"
    return ""
  }

  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 cursor-pointer h-full flex flex-col">
      <div className="relative w-full h-64 overflow-hidden bg-gray-100">
        {images.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            onSwiper={setSwiper}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            className="h-full w-full"
            pagination={{
              clickable: true,
              dynamicBullets: images.length > 5,
            }}
            navigation={false}
            touchEventsTarget="container"
            allowTouchMove={true}
            loop={false}
          >
            {images.map((image, index) => (
              <SwiperSlide key={image.id || index}>
                <Image
                  src={image.url}
                  alt={`${property.title} - Imagem ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm">Sem imagem</span>
          </div>
        )}
        
        {/* Overlay com informações */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {property.negotiations.length > 0 && (
            <div className="absolute top-3 right-3 pointer-events-none">
              <span className="bg-[#FFCC00] text-black px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {getNegotiationText()}
              </span>
            </div>
          )}
          {property.code && (
            <div className="absolute top-3 left-3 pointer-events-none">
              <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Código: {property.code}
              </span>
            </div>
          )}
          {hasMultipleImages && (
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 pointer-events-none">
              <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>

        {/* Navegação customizada para melhor controle */}
        {hasMultipleImages && swiper && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                swiper.slidePrev()
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 active:bg-black/80 text-white p-2 rounded-full transition-all md:opacity-0 md:group-hover:opacity-100 pointer-events-auto touch-manipulation"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                swiper.slideNext()
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 active:bg-black/80 text-white p-2 rounded-full transition-all md:opacity-0 md:group-hover:opacity-100 pointer-events-auto touch-manipulation"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 min-h-[3.5rem]">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-gray-600 text-sm">
          <MapPin className="h-4 w-4 text-[#FFCC00]" />
          <span className="line-clamp-1">{getLocationText()}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-3">
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          {property.number_bedrooms !== null && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-[#FFCC00]" />
              <span>{property.number_bedrooms} {property.number_bedrooms === 1 ? 'Quarto' : 'Quartos'}</span>
            </div>
          )}
          {property.number_bathrooms !== null && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-[#FFCC00]" />
              <span>{property.number_bathrooms} {property.number_bathrooms === 1 ? 'Banheiro' : 'Banheiros'}</span>
            </div>
          )}
          {property.number_parking_spaces !== null && (
            <div className="flex items-center gap-1">
              <Car className="h-4 w-4 text-[#FFCC00]" />
              <span>{property.number_parking_spaces} {property.number_parking_spaces === 1 ? 'Vaga' : 'Vagas'}</span>
            </div>
          )}
          {property.private_area !== null && (
            <div className="flex items-center gap-1">
              <Ruler className="h-4 w-4 text-[#FFCC00]" />
              <span>{property.private_area} m²</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-gray-100">
        <div className="w-full">
          {property.sale_value && (
            <div className="mb-2">
              <p className="text-xs text-gray-500">Venda</p>
              <p className="text-xl font-bold text-[#FFCC00]">
                {formatCurrency(property.sale_value)}
              </p>
            </div>
          )}
          {property.lease_value && (
            <div>
              <p className="text-xs text-gray-500">Locação</p>
              <p className="text-xl font-bold text-[#FFCC00]">
                {formatCurrency(property.lease_value)}
              </p>
            </div>
          )}
          {!property.sale_value && !property.lease_value && (
            <p className="text-sm text-gray-500">Valor sob consulta</p>
          )}
        </div>
      </CardFooter>
    </Card>
    </Link>
  )
}
