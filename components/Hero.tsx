"use client"

import { useState } from "react"
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
import { Search, MapPin } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  const [searchFilters, setSearchFilters] = useState({
    tipo: "",
    cidade: "",
    bairro: "",
    precoMin: "",
    precoMax: "",
  })

  const handleSearch = () => {
    // TODO: Implementar busca quando API estiver pronta
    console.log("Buscar imóveis:", searchFilters)
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Imóvel
                </label>
                <Select
                  value={searchFilters.tipo}
                  onValueChange={(value) =>
                    setSearchFilters({ ...searchFilters, tipo: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                    <SelectItem value="comercial">Comercial</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade
                </label>
                <Select
                  value={searchFilters.cidade}
                  onValueChange={(value) =>
                    setSearchFilters({ ...searchFilters, cidade: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Cascavel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cascavel">Cascavel</SelectItem>
                    <SelectItem value="outras">Outras cidades</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bairro
                </label>
                <Input
                  placeholder="Digite o bairro"
                  value={searchFilters.bairro}
                  onChange={(e) =>
                    setSearchFilters({ ...searchFilters, bairro: e.target.value })
                  }
                />
              </div>

              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço Mínimo
                </label>
                <Input
                  type="number"
                  placeholder="R$ 0,00"
                  value={searchFilters.precoMin}
                  onChange={(e) =>
                    setSearchFilters({ ...searchFilters, precoMin: e.target.value })
                  }
                />
              </div>

              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço Máximo
                </label>
                <Input
                  type="number"
                  placeholder="R$ 0,00"
                  value={searchFilters.precoMax}
                  onChange={(e) =>
                    setSearchFilters({ ...searchFilters, precoMax: e.target.value })
                  }
                />
              </div>
            </div>

            <Button
              onClick={handleSearch}
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-black font-semibold py-6 px-8 text-lg"
              size="lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Buscar Imóveis
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-white/90">
            <div className="flex items-center gap-2 drop-shadow-md">
              <MapPin className="h-4 w-4 text-primary" />
              <span>R. Cuiabá, 4570 - Alto Alegre, Cascavel - PR</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
