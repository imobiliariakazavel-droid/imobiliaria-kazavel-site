import { CitiesResponse, CitiesApiParams } from '@/lib/types/cities'

/**
 * Busca cidades que possuem imóveis cadastrados
 * 
 * @param params - Parâmetros de busca e paginação
 * @returns Resposta com lista de cidades e informações de paginação
 */
export async function getCities(params?: CitiesApiParams): Promise<CitiesResponse> {
  const searchParams = new URLSearchParams()

  if (params?.page) {
    searchParams.append('page', params.page.toString())
  }

  if (params?.items_page) {
    searchParams.append('items_page', params.items_page.toString())
  }

  if (params?.search) {
    searchParams.append('search', params.search)
  }

  const url = `/api/cities${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar cidades: ${response.statusText}`)
  }

  return response.json()
}
