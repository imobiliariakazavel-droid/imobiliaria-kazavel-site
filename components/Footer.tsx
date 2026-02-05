"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="https://bdxoocqlcrurivdxkxao.supabase.co/storage/v1/object/public/project/logo_white.png"
                alt="Imobiliária Kazavel"
                width={150}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-300 mb-4">
              Imobiliária referência no mercado de Cascavel.
              Encontre o imóvel ideal para você.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/imoveis" className="text-gray-300 hover:text-primary transition-colors">
                  Imóveis
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="tel:4599382315"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  (45) 9938-2315
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:imobiliariakazavel@gmail.com"
                  className="text-gray-300 hover:text-primary transition-colors break-all"
                >
                  imobiliariakazavel@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=R.+Cuiabá,+4570+-+Alto+Alegre,+Cascavel+-+PR,+85805-260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  R. Cuiabá, 4570 - Alto Alegre<br />
                  Cascavel - PR, 85805-260
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  Segunda a Sexta: 08h - 18h
                </span>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/Kazavel.Imobiliaria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6 text-primary" />
              </a>
              <a
                href="https://www.instagram.com/imobiliaria_kazavel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6 text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Imobiliária Kazavel. Todos os direitos reservados.</p>
          <p className="mt-2">CRECI: 9243</p>
        </div>
      </div>
    </footer>
  )
}
