import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { FeaturedProperties } from "@/components/FeaturedProperties"
import { Features } from "@/components/Features"
import { About } from "@/components/About"
import { Footer } from "@/components/Footer"
import { WhatsAppButton } from "@/components/WhatsAppButton"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedProperties />
        <Features />
        <About />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
