"use client"

import { useState, useEffect } from "react"
import { Property } from "@/lib/types/properties"
import { getProperties } from "@/lib/api/properties"
import { PropertyCard } from "@/components/PropertyCard"
import { Loader2, Star } from "lucide-react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Swiper as SwiperType } from "swiper"

// Importar estilos do Swiper
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  useEffect(() => {
    const loadFeaturedProperties = async () => {
      try {
        setLoading(true)
        const response = await getProperties({
          only_featured: true,
          items_page: 12, // Limitar a 12 imóveis em destaque
        })

        if (response.status) {
          setProperties(response.data)
        }
      } catch (error) {
        console.error("Erro ao carregar imóveis em destaque:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedProperties()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[#FFCC00]" />
          </div>
        </div>
      </section>
    )
  }

  if (properties.length === 0) {
    return null // Não exibir seção se não houver imóveis em destaque
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="h-8 w-8 text-[#FFCC00] fill-[#FFCC00]" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Imóveis em Destaque
            </h2>
            <Star className="h-8 w-8 text-[#FFCC00] fill-[#FFCC00]" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Confira nossa seleção especial de imóveis
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            onSwiper={(swiper) => {
              setSwiper(swiper)
              setIsBeginning(swiper.isBeginning)
              setIsEnd(swiper.isEnd)
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning)
              setIsEnd(swiper.isEnd)
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={false}
            className="!pb-12"
          >
            {properties.map((property) => (
              <SwiperSlide key={property.id}>
                <PropertyCard property={property} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navegação customizada */}
          {swiper && properties.length > 1 && (
            <>
              <button
                onClick={() => swiper.slidePrev()}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white hover:bg-gray-100 shadow-lg rounded-full p-3 transition-all hidden md:flex items-center justify-center ${
                  isBeginning ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Imóvel anterior"
                disabled={isBeginning}
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>
              <button
                onClick={() => swiper.slideNext()}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white hover:bg-gray-100 shadow-lg rounded-full p-3 transition-all hidden md:flex items-center justify-center ${
                  isEnd ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Próximo imóvel"
                disabled={isEnd}
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
