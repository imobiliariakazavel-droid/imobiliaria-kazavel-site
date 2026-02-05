import { PropertyDetailResponse } from '@/lib/types/property-detail'

/**
 * Busca detalhes de um imóvel específico
 * 
 * @param id - ID do imóvel
 * @returns Resposta com detalhes do imóvel
 */
export async function getPropertyDetail(id: string): Promise<PropertyDetailResponse> {
  const response = await fetch(`/api/properties/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar imóvel: ${response.statusText}`)
  }

  return response.json()
}
