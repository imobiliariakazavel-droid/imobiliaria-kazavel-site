"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, MapPin, Loader2, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { getCities } from "@/lib/api/cities"
import { City } from "@/lib/types/cities"
import { getNeighborhoods } from "@/lib/api/neighborhoods"
import { Neighborhood } from "@/lib/types/neighborhoods"

export function Hero() {
  const router = useRouter()
  const [searchFilters, setSearchFilters] = useState({
    codigo: "",
    tipo: "",
    cidade: "",
    bairro: "",
    negociacao: "",
  })
  const [cities, setCities] = useState<City[]>([])
  const [loadingCities, setLoadingCities] = useState(true)
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])
  const [loadingNeighborhoods, setLoadingNeighborhoods] = useState(false)
  const [filterByCodigo, setFilterByCodigo] = useState(false)

  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoadingCities(true)
        const response = await getCities({
          items_page: 100, // Buscar até 100 cidades
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
      if (!searchFilters.cidade) {
        setNeighborhoods([])
        return
      }

      try {
        setLoadingNeighborhoods(true)
        const response = await getNeighborhoods({
          city_id: searchFilters.cidade,
          items_page: 100, // Buscar até 100 bairros
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
  }, [searchFilters.cidade])

  const handleCityChange = (cityId: string) => {
    setSearchFilters({ ...searchFilters, cidade: cityId, bairro: "" })
  }

  const handleCodigoChange = (value: string) => {
    setSearchFilters({ ...searchFilters, codigo: value })
  }

  const handleFilterByCodigo = () => {
    setFilterByCodigo(true)
    setSearchFilters({
      codigo: "",
      tipo: "",
      cidade: "",
      bairro: "",
      negociacao: "",
    })
  }

  const handleBackToFilters = () => {
    setFilterByCodigo(false)
    setSearchFilters({
      codigo: "",
      tipo: "",
      cidade: "",
      bairro: "",
      negociacao: "",
    })
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    
    if (filterByCodigo && searchFilters.codigo.trim()) {
      params.set('code', searchFilters.codigo.trim())
    } else {
      if (searchFilters.tipo) {
        params.set('type', searchFilters.tipo)
      }
      if (searchFilters.cidade) {
        params.set('city_id', searchFilters.cidade)
      }
      if (searchFilters.bairro) {
        params.set('neighborhood_id', searchFilters.bairro)
      }
      if (searchFilters.negociacao) {
        params.set('negotiation', searchFilters.negociacao)
      }
    }

    // Redirecionar para a página de listagem com os filtros
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <section id="search" className="relative py-20 md:py-32 overflow-hidden">
      {/* Imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://bdxoocqlcrurivdxkxao.supabase.co/storage/v1/object/public/project/Cascavel.png"
          alt="Cascavel - PR"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay escuro para melhorar legibilidade */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Encontre o <span className="text-primary">imóvel ideal</span> para você
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 ${filterByCodigo ? 'lg:grid-cols-1' : 'lg:grid-cols-4'}`}>
              {filterByCodigo && (
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código
                  </label>
                  <Input
                    placeholder="Digite o código"
                    value={searchFilters.codigo}
                    onChange={(e) => handleCodigoChange(e.target.value)}
                  />
                </div>
              )}

              {!filterByCodigo && (
                <>
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Imóvel
                    </label>
                    <Select
                      value={searchFilters.tipo || undefined}
                      onValueChange={(value) =>
                        setSearchFilters({ ...searchFilters, tipo: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">Casa</SelectItem>
                        <SelectItem value="apartment">Apartamento</SelectItem>
                        <SelectItem value="land">Terreno</SelectItem>
                        <SelectItem value="office">Escritório</SelectItem>
                        <SelectItem value="store">Loja</SelectItem>
                        <SelectItem value="farm">Fazenda</SelectItem>
                        <SelectItem value="small_farm">Chácara</SelectItem>
                        <SelectItem value="two_story_house">Sobrado</SelectItem>
                        <SelectItem value="condominium">Condomínio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cidade
                    </label>
                    <Select
                      value={searchFilters.cidade || undefined}
                      onValueChange={handleCityChange}
                      disabled={loadingCities}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={loadingCities ? "Carregando..." : "Selecione a cidade"} />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingCities ? (
                          <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          </div>
                        ) : cities.length > 0 ? (
                          cities.map((city) => (
                            <SelectItem key={city.id} value={city.id}>
                              {city.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="px-2 py-1.5 text-sm text-muted-foreground text-center">
                            Nenhuma cidade encontrada
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bairro
                    </label>
                    <Select
                      value={searchFilters.bairro || undefined}
                      onValueChange={(value) =>
                        setSearchFilters({ ...searchFilters, bairro: value })
                      }
                      disabled={!searchFilters.cidade || loadingNeighborhoods}
                    >
                      <SelectTrigger>
                        <SelectValue 
                          placeholder={
                            !searchFilters.cidade 
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
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          </div>
                        ) : neighborhoods.length > 0 ? (
                          neighborhoods.map((neighborhood) => (
                            <SelectItem key={neighborhood.id} value={neighborhood.id}>
                              {neighborhood.name}
                            </SelectItem>
                          ))
                        ) : searchFilters.cidade ? (
                          <div className="px-2 py-1.5 text-sm text-muted-foreground text-center">
                            Nenhum bairro encontrado
                          </div>
                        ) : null}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Negociação
                    </label>
                    <Select
                      value={searchFilters.negociacao || undefined}
                      onValueChange={(value) =>
                        setSearchFilters({ ...searchFilters, negociacao: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Todas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sale">Venda</SelectItem>
                        <SelectItem value="lease">Locação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                onClick={handleSearch}
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-black font-semibold py-6 px-8 text-lg"
                size="lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Buscar Imóveis
              </Button>

              {filterByCodigo ? (
                <button
                  onClick={handleBackToFilters}
                  className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar aos filtros
                </button>
              ) : (
                <button
                  onClick={handleFilterByCodigo}
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Filtrar por código
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-white/90">
            <a
              href="https://www.google.com/maps/search/?api=1&query=R.+Cuiabá,+4570+-+Alto+Alegre,+Cascavel+-+PR,+85805-260"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 drop-shadow-md hover:text-primary transition-colors cursor-pointer"
            >
              <MapPin className="h-4 w-4 text-primary" />
              <span>R. Cuiabá, 4570 - Alto Alegre, Cascavel - PR</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
