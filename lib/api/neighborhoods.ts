import { NeighborhoodsResponse, NeighborhoodsApiParams } from '@/lib/types/neighborhoods'

/**
 * Busca bairros que possuem imóveis cadastrados
 * 
 * @param params - Parâmetros de busca, paginação e filtro por cidade
 * @returns Resposta com lista de bairros e informações de paginação
 */
export async function getNeighborhoods(params?: NeighborhoodsApiParams): Promise<NeighborhoodsResponse> {
  const searchParams = new URLSearchParams()

  if (params?.page) {
    searchParams.append('page', params.page.toString())
  }

  if (params?.items_page) {
    searchParams.append('items_page', params.items_page.toString())
  }

  if (params?.city_id) {
    searchParams.append('city_id', params.city_id)
  }

  if (params?.search) {
    searchParams.append('search', params.search)
  }

  const url = `/api/neighborhoods${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar bairros: ${response.statusText}`)
  }

  return response.json()
}
