"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronDown, ChevronUp, X, Loader2, Check } from "lucide-react"
import { PropertiesAmenities, PropertiesType, PropertiesNegotiations } from "@/lib/types/properties"
import { getCities } from "@/lib/api/cities"
import { City } from "@/lib/types/cities"
import { getNeighborhoods } from "@/lib/api/neighborhoods"
import { Neighborhood } from "@/lib/types/neighborhoods"
import { cn } from "@/lib/utils"

interface AdvancedFiltersProps {
  filters: AdvancedFiltersState
  onChange: (filters: AdvancedFiltersState) => void
  onClear: () => void
}

export interface AdvancedFiltersState {
  code?: string
  type?: PropertiesType
  city_id?: string
  neighborhood_id?: string
  negotiation?: PropertiesNegotiations
  minimum_value?: number
  maximum_value?: number
  number_bedrooms?: number
  number_bathrooms?: number
  number_parking_spaces?: number
  minimum_private_area?: number
  maximum_private_area?: number
  amenities: PropertiesAmenities[]
}

const amenitiesOptions: { value: PropertiesAmenities; label: string }[] = [
  { value: 'air_conditioning', label: 'Ar Condicionado' },
  { value: 'elevator', label: 'Elevador' },
  { value: 'pool', label: 'Piscina' },
  { value: 'grill', label: 'Churrasqueira' },
  { value: 'kitchen', label: 'Cozinha' },
  { value: 'balcony', label: 'Varanda' },
  { value: 'laundry_room', label: 'Área de Serviço' },
  { value: 'home_office', label: 'Escritório' },
  { value: 'internet', label: 'Internet' },
  { value: 'interfone', label: 'Interfone' },
  { value: 'doorman', label: 'Portaria' },
  { value: 'gourmet_area', label: 'Área Gourmet' },
  { value: 'terrace', label: 'Terraço' },
  { value: 'closet', label: 'Closet' },
  { value: 'built_in_furniture', label: 'Mobília Planejada' },
]

export function AdvancedFilters({ filters, onChange, onClear }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState<AdvancedFiltersState>(filters)
  const [cities, setCities] = useState<City[]>([])
  const [loadingCities, setLoadingCities] = useState(true)
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])
  const [loadingNeighborhoods, setLoadingNeighborhoods] = useState(false)

  // Sincronizar estado local com props quando mudarem externamente
  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoadingCities(true)
        const response = await getCities({
          items_page: 100,
        })
        if (response.status && response.data) {
          setCities(response.data)
        }
      } catch (error) {
        console.error("Erro ao carregar cidades:", error)
      } finally {
        setLoadingCities(false)
      }
    }

    loadCities()
  }, [])

  useEffect(() => {
    const loadNeighborhoods = async () => {
      if (!localFilters.city_id) {
        setNeighborhoods([])
        return
      }

      try {
        setLoadingNeighborhoods(true)
        const response = await getNeighborhoods({
          city_id: localFilters.city_id,
          items_page: 100,
        })
        if (response.status && response.data) {
          setNeighborhoods(response.data)
        }
      } catch (error) {
        console.error("Erro ao carregar bairros:", error)
        setNeighborhoods([])
      } finally {
        setLoadingNeighborhoods(false)
      }
    }

    loadNeighborhoods()
  }, [localFilters.city_id])

  const hasActiveFilters = 
    localFilters.code !== undefined ||
    localFilters.type !== undefined ||
    localFilters.city_id !== undefined ||
    localFilters.neighborhood_id !== undefined ||
    localFilters.negotiation !== undefined ||
    localFilters.minimum_value !== undefined ||
    localFilters.maximum_value !== undefined ||
    localFilters.number_bedrooms !== undefined ||
    localFilters.number_bathrooms !== undefined ||
    localFilters.number_parking_spaces !== undefined ||
    localFilters.minimum_private_area !== undefined ||
    localFilters.maximum_private_area !== undefined ||
    localFilters.amenities.length > 0

  const updateLocalFilter = (key: keyof AdvancedFiltersState, value: any) => {
    setLocalFilters(prev => {
      const newFilters = { ...prev, [key]: value }
      // Se mudar a cidade, limpar o bairro
      if (key === 'city_id') {
        newFilters.neighborhood_id = undefined
      }
      return newFilters
    })
  }

  const toggleAmenity = (amenity: PropertiesAmenities) => {
    const newAmenities = localFilters.amenities.includes(amenity)
      ? localFilters.amenities.filter(a => a !== amenity)
      : [...localFilters.amenities, amenity]
    updateLocalFilter('amenities', newAmenities)
  }

  const handleApplyFilters = () => {
    onChange(localFilters)
  }

  const handleClearFilters = () => {
    const emptyFilters: AdvancedFiltersState = {
      amenities: [],
    }
    setLocalFilters(emptyFilters)
    onClear()
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">Filtros Avançados</span>
          {hasActiveFilters && (
            <span className="bg-[#FFCC00] text-black text-xs font-semibold px-2 py-0.5 rounded-full">
              {[
                localFilters.minimum_value !== undefined ? 1 : 0,
                localFilters.maximum_value !== undefined ? 1 : 0,
                localFilters.number_bedrooms !== undefined ? 1 : 0,
                localFilters.number_bathrooms !== undefined ? 1 : 0,
                localFilters.number_parking_spaces !== undefined ? 1 : 0,
                localFilters.minimum_private_area !== undefined ? 1 : 0,
                localFilters.maximum_private_area !== undefined ? 1 : 0,
                localFilters.amenities.length,
                localFilters.code ? 1 : 0,
                localFilters.type ? 1 : 0,
                localFilters.city_id ? 1 : 0,
                localFilters.neighborhood_id ? 1 : 0,
                localFilters.negotiation ? 1 : 0,
              ].reduce((a, b) => a + b, 0)}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-600" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-gray-200 space-y-6">
          {/* Filtros Básicos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filtros Básicos
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Código</label>
                <Input
                  placeholder="Digite o código"
                  value={localFilters.code || ''}
                  onChange={(e) => {
                    updateLocalFilter('code', e.target.value.trim() || undefined)
                  }}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Tipo de Imóvel</label>
                <Select
                  value={localFilters.type || "any"}
                  onValueChange={(value) => {
                    updateLocalFilter('type', value === "any" ? undefined : value as PropertiesType)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Todos</SelectItem>
                    <SelectItem value="house">Casa</SelectItem>
                    <SelectItem value="apartment">Apartamento</SelectItem>
                    <SelectItem value="land">Terreno</SelectItem>
                    <SelectItem value="office">Escritório</SelectItem>
                    <SelectItem value="store">Loja</SelectItem>
                    <SelectItem value="farm">Fazenda</SelectItem>
                    <SelectItem value="small_farm">Chácara</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Negociação</label>
                <Select
                  value={localFilters.negotiation || "any"}
                  onValueChange={(value) => {
                    updateLocalFilter('negotiation', value === "any" ? undefined : value as PropertiesNegotiations)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Todas</SelectItem>
                    <SelectItem value="sale">Venda</SelectItem>
                    <SelectItem value="lease">Locação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Cidade</label>
                <Select
                  value={localFilters.city_id || "any"}
                  onValueChange={(value) => {
                    updateLocalFilter('city_id', value === "any" ? undefined : value)
                  }}
                  disabled={loadingCities}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loadingCities ? "Carregando..." : "Selecione a cidade"} />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingCities ? (
                      <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-4 w-4 animate-spin text-[#FFCC00]" />
                      </div>
                    ) : (
                      <>
                        <SelectItem value="any">Todas</SelectItem>
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.id}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Bairro</label>
                <Select
                  value={localFilters.neighborhood_id || "any"}
                  onValueChange={(value) => {
                    updateLocalFilter('neighborhood_id', value === "any" ? undefined : value)
                  }}
                  disabled={!localFilters.city_id || loadingNeighborhoods}
                >
                  <SelectTrigger>
                    <SelectValue 
                      placeholder={
                        !filters.city_id 
                          ? "Selecione uma cidade primeiro" 
                          : loadingNeighborhoods 
                          ? "Carregando..." 
                          : "Selecione o bairro"
                      } 
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingNeighborhoods ? (
                      <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-4 w-4 animate-spin text-[#FFCC00]" />
                      </div>
                    ) : neighborhoods.length > 0 ? (
                      <>
                        <SelectItem value="any">Todos</SelectItem>
                        {neighborhoods.map((neighborhood) => (
                          <SelectItem key={neighborhood.id} value={neighborhood.id}>
                            {neighborhood.name}
                          </SelectItem>
                        ))}
                      </>
                    ) : localFilters.city_id ? (
                      <div className="px-2 py-1.5 text-sm text-muted-foreground text-center">
                        Nenhum bairro encontrado
                      </div>
                    ) : null}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Faixa de Preço */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Faixa de Preço (R$)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="number"
                  placeholder="Valor mínimo"
                  value={localFilters.minimum_value || ''}
                  onChange={(e) => {
                    const value = e.target.value ? parseFloat(e.target.value) : undefined
                    updateLocalFilter('minimum_value', value)
                  }}
                  min="0"
                  step="1000"
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Valor máximo"
                  value={localFilters.maximum_value || ''}
                  onChange={(e) => {
                    const value = e.target.value ? parseFloat(e.target.value) : undefined
                    updateLocalFilter('maximum_value', value)
                  }}
                  min="0"
                  step="1000"
                />
              </div>
            </div>
          </div>

          {/* Características */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Características
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Quartos (mínimo)</label>
                <Select
                  value={localFilters.number_bedrooms?.toString() || "any"}
                  onValueChange={(value) => {
                    updateLocalFilter('number_bedrooms', value === "any" ? undefined : parseInt(value, 10))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Qualquer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Qualquer</SelectItem>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}+ {num === 1 ? 'Quarto' : 'Quartos'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Banheiros (mínimo)</label>
                <Select
                  value={localFilters.number_bathrooms?.toString() || "any"}
                  onValueChange={(value) => {
                    updateLocalFilter('number_bathrooms', value === "any" ? undefined : parseInt(value, 10))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Qualquer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Qualquer</SelectItem>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}+ {num === 1 ? 'Banheiro' : 'Banheiros'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Vagas (mínimo)</label>
                <Select
                  value={localFilters.number_parking_spaces?.toString() || "any"}
                  onValueChange={(value) => {
                    updateLocalFilter('number_parking_spaces', value === "any" ? undefined : parseInt(value, 10))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Qualquer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Qualquer</SelectItem>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}+ {num === 1 ? 'Vaga' : 'Vagas'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Área Privativa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Área Privativa (m²)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="number"
                  placeholder="Área mínima"
                  value={localFilters.minimum_private_area || ''}
                  onChange={(e) => {
                    const value = e.target.value ? parseFloat(e.target.value) : undefined
                    updateLocalFilter('minimum_private_area', value)
                  }}
                  min="0"
                  step="10"
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Área máxima"
                  value={localFilters.maximum_private_area || ''}
                  onChange={(e) => {
                    const value = e.target.value ? parseFloat(e.target.value) : undefined
                    updateLocalFilter('maximum_private_area', value)
                  }}
                  min="0"
                  step="10"
                />
              </div>
            </div>
          </div>

          {/* Amenidades */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenidades
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {amenitiesOptions.map((amenity) => {
                const isSelected = localFilters.amenities.includes(amenity.value)
                return (
                  <button
                    key={amenity.value}
                    type="button"
                    onClick={() => toggleAmenity(amenity.value)}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors text-left",
                      isSelected
                        ? "bg-[#FFCC00] text-black border-2 border-black"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
                    )}
                  >
                    {amenity.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center pt-4 border-t border-gray-200 gap-3">
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="text-gray-700 hover:text-black w-full sm:w-auto"
              >
                <X className="h-4 w-4 mr-2" />
                Limpar Filtros
              </Button>
            )}
            <Button
              onClick={handleApplyFilters}
              className="bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-black font-semibold w-full sm:w-auto"
            >
              <Check className="h-4 w-4 mr-2" />
              Aplicar Filtros
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
