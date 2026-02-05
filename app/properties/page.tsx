"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import { PropertyCard } from "@/components/PropertyCard"
import { AdvancedFilters, AdvancedFiltersState } from "@/components/AdvancedFilters"
import { Button } from "@/components/ui/button"
import { getProperties } from "@/lib/api/properties"
import { Property, PropertiesApiParams, PropertiesAmenities, OrderProperties } from "@/lib/types/properties"
import { Loader2, ChevronLeft, ChevronRight, Home, Search, ArrowUpDown } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

function PropertiesPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 12

  // Estado dos filtros avançados
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFiltersState>({
    amenities: [],
    code: undefined,
    type: undefined,
    city_id: undefined,
    neighborhood_id: undefined,
    negotiation: undefined,
  })

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10)
    setCurrentPage(page)

    // Carregar filtros avançados da URL
    const amenitiesParam = searchParams.get('amenities')
    setAdvancedFilters({
      code: searchParams.get('code') || undefined,
      type: (searchParams.get('type') as any) || undefined,
      city_id: searchParams.get('city_id') || undefined,
      neighborhood_id: searchParams.get('neighborhood_id') || undefined,
      negotiation: (searchParams.get('negotiation') as any) || undefined,
      minimum_value: searchParams.get('minimum_value') ? parseFloat(searchParams.get('minimum_value')!) : undefined,
      maximum_value: searchParams.get('maximum_value') ? parseFloat(searchParams.get('maximum_value')!) : undefined,
      number_bedrooms: searchParams.get('number_bedrooms') ? parseInt(searchParams.get('number_bedrooms')!, 10) : undefined,
      number_bathrooms: searchParams.get('number_bathrooms') ? parseInt(searchParams.get('number_bathrooms')!, 10) : undefined,
      number_parking_spaces: searchParams.get('number_parking_spaces') ? parseInt(searchParams.get('number_parking_spaces')!, 10) : undefined,
      minimum_private_area: searchParams.get('minimum_private_area') ? parseFloat(searchParams.get('minimum_private_area')!) : undefined,
      maximum_private_area: searchParams.get('maximum_private_area') ? parseFloat(searchParams.get('maximum_private_area')!) : undefined,
      amenities: amenitiesParam ? amenitiesParam.split(',').filter(Boolean) as PropertiesAmenities[] : [],
    })
  }, [searchParams])

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const filters: PropertiesApiParams = {
          code: searchParams.get('code') || undefined,
          type: (searchParams.get('type') as any) || undefined,
          city_id: searchParams.get('city_id') || undefined,
          neighborhood_id: searchParams.get('neighborhood_id') || undefined,
          negotiation: (searchParams.get('negotiation') as any) || undefined,
          page: currentPage,
          items_page: itemsPerPage,
          minimum_value: searchParams.get('minimum_value') ? parseFloat(searchParams.get('minimum_value')!) : undefined,
          maximum_value: searchParams.get('maximum_value') ? parseFloat(searchParams.get('maximum_value')!) : undefined,
          number_bedrooms: searchParams.get('number_bedrooms') ? parseInt(searchParams.get('number_bedrooms')!, 10) : undefined,
          number_bathrooms: searchParams.get('number_bathrooms') ? parseInt(searchParams.get('number_bathrooms')!, 10) : undefined,
          number_parking_spaces: searchParams.get('number_parking_spaces') ? parseInt(searchParams.get('number_parking_spaces')!, 10) : undefined,
          minimum_private_area: searchParams.get('minimum_private_area') ? parseFloat(searchParams.get('minimum_private_area')!) : undefined,
          maximum_private_area: searchParams.get('maximum_private_area') ? parseFloat(searchParams.get('maximum_private_area')!) : undefined,
          amenities: searchParams.get('amenities') ? searchParams.get('amenities')!.split(',').filter(Boolean) as PropertiesAmenities[] : undefined,
          order: (searchParams.get('order') as OrderProperties) || undefined,
        }
        
        const response = await getProperties(filters)

        if (response.status) {
          setProperties(response.data)
          setTotalPages(response.pagination.total_pages)
          setTotalItems(response.pagination.total_items)
        } else {
          setError(response.message || 'Erro ao carregar imóveis')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar imóveis')
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [searchParams, currentPage, itemsPerPage])

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/properties?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAdvancedFiltersChange = (filters: AdvancedFiltersState) => {
    setAdvancedFilters(filters)
    
    const params = new URLSearchParams(searchParams.toString())
    params.delete('page') // Resetar para primeira página
    
    // Remover todos os filtros antigos
    params.delete('code')
    params.delete('type')
    params.delete('city_id')
    params.delete('neighborhood_id')
    params.delete('negotiation')
    params.delete('minimum_value')
    params.delete('maximum_value')
    params.delete('number_bedrooms')
    params.delete('number_bathrooms')
    params.delete('number_parking_spaces')
    params.delete('minimum_private_area')
    params.delete('maximum_private_area')
    params.delete('amenities')

    // Adicionar novos filtros básicos
    if (filters.code) {
      params.set('code', filters.code)
    }
    if (filters.type) {
      params.set('type', filters.type)
    }
    if (filters.city_id) {
      params.set('city_id', filters.city_id)
    }
    if (filters.neighborhood_id) {
      params.set('neighborhood_id', filters.neighborhood_id)
    }
    if (filters.negotiation) {
      params.set('negotiation', filters.negotiation)
    }

    // Adicionar novos filtros avançados
    if (filters.minimum_value !== undefined) {
      params.set('minimum_value', filters.minimum_value.toString())
    }
    if (filters.maximum_value !== undefined) {
      params.set('maximum_value', filters.maximum_value.toString())
    }
    if (filters.number_bedrooms !== undefined) {
      params.set('number_bedrooms', filters.number_bedrooms.toString())
    }
    if (filters.number_bathrooms !== undefined) {
      params.set('number_bathrooms', filters.number_bathrooms.toString())
    }
    if (filters.number_parking_spaces !== undefined) {
      params.set('number_parking_spaces', filters.number_parking_spaces.toString())
    }
    if (filters.minimum_private_area !== undefined) {
      params.set('minimum_private_area', filters.minimum_private_area.toString())
    }
    if (filters.maximum_private_area !== undefined) {
      params.set('maximum_private_area', filters.maximum_private_area.toString())
    }
    if (filters.amenities.length > 0) {
      params.set('amenities', filters.amenities.join(','))
    }

    router.push(`/properties?${params.toString()}`)
  }

  const handleClearAdvancedFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('code')
    params.delete('type')
    params.delete('city_id')
    params.delete('neighborhood_id')
    params.delete('negotiation')
    params.delete('minimum_value')
    params.delete('maximum_value')
    params.delete('number_bedrooms')
    params.delete('number_bathrooms')
    params.delete('number_parking_spaces')
    params.delete('minimum_private_area')
    params.delete('maximum_private_area')
    params.delete('amenities')
    params.delete('page')
    
    router.push(`/properties?${params.toString()}`)
  }

  const getActiveFilters = () => {
    const filters: string[] = []
    if (searchParams.get('code')) filters.push(`Código: ${searchParams.get('code')}`)
    if (searchParams.get('type')) {
      const typeMap: Record<string, string> = {
        house: 'Casa',
        apartment: 'Apartamento',
        land: 'Terreno',
        office: 'Escritório',
        store: 'Loja',
      }
      filters.push(`Tipo: ${typeMap[searchParams.get('type') || ''] || searchParams.get('type')}`)
    }
    if (searchParams.get('negotiation')) {
      const negMap: Record<string, string> = {
        sale: 'Venda',
        lease: 'Locação',
      }
      filters.push(`Negociação: ${negMap[searchParams.get('negotiation') || ''] || searchParams.get('negotiation')}`)
    }
    if (searchParams.get('number_bedrooms')) {
      filters.push(`${searchParams.get('number_bedrooms')}+ Quartos`)
    }
    if (searchParams.get('number_bathrooms')) {
      filters.push(`${searchParams.get('number_bathrooms')}+ Banheiros`)
    }
    if (searchParams.get('number_parking_spaces')) {
      filters.push(`${searchParams.get('number_parking_spaces')}+ Vagas`)
    }
    if (searchParams.get('minimum_private_area') || searchParams.get('maximum_private_area')) {
      const min = searchParams.get('minimum_private_area')
      const max = searchParams.get('maximum_private_area')
      if (min && max) {
        filters.push(`Área: ${min}m² - ${max}m²`)
      } else if (min) {
        filters.push(`Área: ${min}m²+`)
      } else if (max) {
        filters.push(`Área: até ${max}m²`)
      }
    }
    if (searchParams.get('minimum_value') || searchParams.get('maximum_value')) {
      const min = searchParams.get('minimum_value')
      const max = searchParams.get('maximum_value')
      if (min && max) {
        filters.push(`Preço: R$ ${parseFloat(min).toLocaleString('pt-BR')} - R$ ${parseFloat(max).toLocaleString('pt-BR')}`)
      } else if (min) {
        filters.push(`Preço: R$ ${parseFloat(min).toLocaleString('pt-BR')}+`)
      } else if (max) {
        filters.push(`Preço: até R$ ${parseFloat(max).toLocaleString('pt-BR')}`)
      }
    }
    return filters
  }

  const activeFilters = getActiveFilters()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-[#FFCC00] to-[#FFCC00]/80 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
                  Imóveis Encontrados
                </h1>
                {loading ? (
                  <p className="text-black/70">Carregando...</p>
                ) : (
                  <p className="text-black/70">
                    {totalItems} {totalItems === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/">
                  <Button variant="outline" className="bg-white hover:bg-gray-100">
                    <Home className="h-4 w-4 mr-2" />
                    Início
                  </Button>
                </Link>
                <Link href="/#search">
                  <Button className="bg-black hover:bg-black/90 text-white">
                    <Search className="h-4 w-4 mr-2" />
                    Nova Busca
                  </Button>
                </Link>
              </div>
            </div>

            {activeFilters.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <span
                    key={index}
                    className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {filter}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Seletor de Ordenação */}
          <div className="mb-4 flex justify-end">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-gray-600" />
              <Select
                value={searchParams.get('order') || "recent"}
                onValueChange={(value) => {
                  const params = new URLSearchParams(searchParams.toString())
                  params.delete('page') // Resetar para primeira página
                  
                  if (value === "recent") {
                    params.delete('order')
                  } else {
                    params.set('order', value)
                  }
                  
                  router.push(`/properties?${params.toString()}`)
                }}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais Recentes</SelectItem>
                  <SelectItem value="greater_value">Maior Valor</SelectItem>
                  <SelectItem value="lowest_value">Menor Valor</SelectItem>
                  <SelectItem value="largest_private_area">Maior Área</SelectItem>
                  <SelectItem value="smallest_private_area">Menor Área</SelectItem>
                  <SelectItem value="largest_number_bedrooms">Mais Quartos</SelectItem>
                  <SelectItem value="smallest_number_bedrooms">Menos Quartos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filtros Avançados */}
          <div className="mb-6">
            <AdvancedFilters
              filters={advancedFilters}
              onChange={handleAdvancedFiltersChange}
              onClear={handleClearAdvancedFilters}
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-[#FFCC00]" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <Link href="/">
                <Button className="bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-black">
                  Voltar ao Início
                </Button>
              </Link>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg mb-4">Nenhum imóvel encontrado com os filtros selecionados.</p>
              <Link href="/">
                <Button className="bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-black">
                  Fazer Nova Busca
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-white hover:bg-gray-100"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        // Mostrar primeira, última, atual e páginas próximas
                        return (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        )
                      })
                      .map((page, index, array) => {
                        // Adicionar "..." quando necessário
                        const showEllipsis = index > 0 && page - array[index - 1] > 1
                        return (
                          <div key={page} className="flex items-center gap-1">
                            {showEllipsis && (
                              <span className="px-2 text-gray-500">...</span>
                            )}
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              onClick={() => handlePageChange(page)}
                              className={
                                currentPage === page
                                  ? "bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-black"
                                  : "bg-white hover:bg-gray-100"
                              }
                            >
                              {page}
                            </Button>
                          </div>
                        )
                      })}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-white hover:bg-gray-100"
                  >
                    Próxima
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#FFCC00]" />
        </main>
        <Footer />
      </div>
    }>
      <PropertiesPageContent />
    </Suspense>
  )
}
