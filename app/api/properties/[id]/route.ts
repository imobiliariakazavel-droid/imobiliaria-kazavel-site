import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Desabilitar cache para garantir dados sempre atualizados
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id

    if (!propertyId) {
      return NextResponse.json(
        {
          status: false,
          message: 'ID do imóvel é obrigatório',
          data: null,
        },
        { status: 400 }
      )
    }

    // Chamar a função RPC do Supabase
    const { data, error } = await supabase.rpc('get_propertie_client', {
      p_id: propertyId,
    })

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: 'Erro ao buscar imóvel: ' + error.message,
          data: null,
        },
        { status: 500 }
      )
    }

    // A função já retorna o JSON formatado
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: 'Erro interno do servidor: ' + (error instanceof Error ? error.message : 'Erro desconhecido'),
        data: null,
      },
      { status: 500 }
    )
  }
}
