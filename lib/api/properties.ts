import { PropertiesResponse, PropertiesApiParams } from '@/lib/types/properties'

/**
 * Busca imóveis com filtros e paginação
 * 
 * @param params - Parâmetros de busca e paginação
 * @returns Resposta com lista de imóveis e informações de paginação
 */
export async function getProperties(params?: PropertiesApiParams): Promise<PropertiesResponse> {
  const searchParams = new URLSearchParams()

  if (params?.code) {
    searchParams.append('code', params.code)
  }

  if (params?.type) {
    searchParams.append('type', params.type)
  }

  if (params?.city_id) {
    searchParams.append('city_id', params.city_id)
  }

  if (params?.neighborhood_id) {
    searchParams.append('neighborhood_id', params.neighborhood_id)
  }

  if (params?.negotiation) {
    searchParams.append('negotiation', params.negotiation)
  }

  if (params?.page) {
    searchParams.append('page', params.page.toString())
  }

  if (params?.items_page) {
    searchParams.append('items_page', params.items_page.toString())
  }

  if (params?.minimum_value !== undefined) {
    searchParams.append('minimum_value', params.minimum_value.toString())
  }

  if (params?.maximum_value !== undefined) {
    searchParams.append('maximum_value', params.maximum_value.toString())
  }

  if (params?.number_bedrooms !== undefined) {
    searchParams.append('number_bedrooms', params.number_bedrooms.toString())
  }

  if (params?.number_bathrooms !== undefined) {
    searchParams.append('number_bathrooms', params.number_bathrooms.toString())
  }

  if (params?.number_parking_spaces !== undefined) {
    searchParams.append('number_parking_spaces', params.number_parking_spaces.toString())
  }

  if (params?.minimum_private_area !== undefined) {
    searchParams.append('minimum_private_area', params.minimum_private_area.toString())
  }

  if (params?.maximum_private_area !== undefined) {
    searchParams.append('maximum_private_area', params.maximum_private_area.toString())
  }

  if (params?.amenities && params.amenities.length > 0) {
    searchParams.append('amenities', params.amenities.join(','))
  }

  if (params?.order) {
    searchParams.append('order', params.order)
  }

  if (params?.only_featured !== undefined) {
    searchParams.append('only_featured', params.only_featured.toString())
  }

  const url = `/api/properties${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar imóveis: ${response.statusText}`)
  }

  return response.json()
}
