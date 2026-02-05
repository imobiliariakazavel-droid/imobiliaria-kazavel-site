import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Página não encontrada</h2>
          <p className="text-gray-600 mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button className="bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-black">
                Voltar ao Início
              </Button>
            </Link>
            <Link href="/properties">
              <Button variant="outline" className="bg-white hover:bg-gray-100">
                Ver Imóveis
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
