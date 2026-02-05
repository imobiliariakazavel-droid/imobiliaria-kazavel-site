"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="https://bdxoocqlcrurivdxkxao.supabase.co/storage/v1/object/public/project/logo_black.png"
              alt="Imobiliária Kazavel"
              width={150}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Início
            </Link>
            <Link href="/imoveis" className="text-sm font-medium hover:text-primary transition-colors">
              Imóveis
            </Link>
            <Link href="/sobre" className="text-sm font-medium hover:text-primary transition-colors">
              Sobre
            </Link>
            <Link href="/contato" className="text-sm font-medium hover:text-primary transition-colors">
              Contato
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4 text-sm">
              <a href="tel:4599382315" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span>(45) 9938-2315</span>
              </a>
              <a href="mailto:imobiliariakazavel@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                <span className="hidden xl:inline">imobiliariakazavel@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
