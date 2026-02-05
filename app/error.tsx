"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ops! Algo deu errado</h1>
          <p className="text-gray-600 mb-8">
            Ocorreu um erro inesperado. Por favor, tente novamente.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={reset} className="bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-black">
              Tentar Novamente
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = "/"}
              className="bg-white hover:bg-gray-100"
            >
              Voltar ao Início
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
