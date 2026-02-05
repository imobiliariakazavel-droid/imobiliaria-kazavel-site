import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page')
    const itemsPage = searchParams.get('items_page')
    const search = searchParams.get('search')

    // Converter parâmetros para números ou null
    const pPage = page ? parseInt(page, 10) : null
    const pItemsPage = itemsPage ? parseInt(itemsPage, 10) : null
    const pSearch = search || null

    // Chamar a função RPC do Supabase
    const { data, error } = await supabase.rpc('get_cities_properties', {
      p_page: pPage,
      p_items_page: pItemsPage,
      p_search: pSearch,
    })

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: 'Erro ao buscar cidades: ' + error.message,
          data: [],
        },
        { status: 500 }
      )
    }

    // A função já retorna o JSON formatado
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: 'Erro interno do servidor: ' + (error instanceof Error ? error.message : 'Erro desconhecido'),
        data: [],
      },
      { status: 500 }
    )
  }
}
