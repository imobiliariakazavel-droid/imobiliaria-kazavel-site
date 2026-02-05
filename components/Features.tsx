"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Home, Shield, Users } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Home,
    title: "Ampla Variedade",
    description: "Centenas de imóveis disponíveis para compra e locação",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Transações seguras e documentação completa",
  },
  {
    icon: Users,
    title: "Atendimento Personalizado",
    description: "Equipe especializada para te ajudar a encontrar o imóvel ideal",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por que escolher a Kazavel?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Somos referência em imóveis em Cascavel e região
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-2 hover:border-primary transition-colors h-full">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
