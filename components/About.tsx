"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle, Building2, Home, Handshake } from "lucide-react"

const services = [
  {
    icon: Building2,
    title: "Avaliação de Imóveis",
    description: "Avaliamos seu imóvel com precisão e transparência",
  },
  {
    icon: Home,
    title: "Apresentação de Imóveis",
    description: "Apresentamos os melhores imóveis de acordo com seu perfil",
  },
  {
    icon: Handshake,
    title: "Venda e Aluguel",
    description: "Trabalhamos com venda e locação de imóveis",
  },
]

export function About() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Imagem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://bdxoocqlcrurivdxkxao.supabase.co/storage/v1/object/public/project/foto_imobiliaria.jpg"
                alt="Imobiliária Kazavel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Sobre a Imobiliária Kazavel
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                A Imobiliária Kazavel é referência no mercado imobiliário de Cascavel e região. 
                Com uma equipe especializada e comprometida, oferecemos soluções completas para 
                quem busca comprar, vender ou alugar imóveis.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Temos parceria estratégica com a <strong className="text-black">Surreal Construções e Reformas</strong>, 
                empresa com mais de <strong className="text-black">15 anos de experiência</strong> no mercado, 
                garantindo qualidade e confiança em todos os nossos projetos.
              </p>
            </div>

            {/* Serviços */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Nossos Serviços
              </h3>
              <div className="space-y-3">
                {services.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <Icon className="h-5 w-5 text-[#FFCC00]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {service.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {service.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Destaque da Parceria */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#FFCC00] rounded-lg p-6 mt-6"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-black flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-black mb-2">
                    Parceria Estratégica
                  </h4>
                  <p className="text-black/90 text-sm leading-relaxed">
                    Em parceria com a <strong>Surreal Construções e Reformas</strong>, 
                    oferecemos soluções completas para construção, reforma e manutenção de imóveis, 
                    com mais de 15 anos de experiência e excelência no mercado.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
