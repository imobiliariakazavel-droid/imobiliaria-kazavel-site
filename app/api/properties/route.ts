import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const type = searchParams.get('type')
    const cityId = searchParams.get('city_id')
    const neighborhoodId = searchParams.get('neighborhood_id')
    const negotiation = searchParams.get('negotiation')
    const page = searchParams.get('page')
    const itemsPage = searchParams.get('items_page')
    const minimumValue = searchParams.get('minimum_value')
    const maximumValue = searchParams.get('maximum_value')
    const numberBedrooms = searchParams.get('number_bedrooms')
    const numberBathrooms = searchParams.get('number_bathrooms')
    const numberParkingSpaces = searchParams.get('number_parking_spaces')
    const minimumPrivateArea = searchParams.get('minimum_private_area')
    const maximumPrivateArea = searchParams.get('maximum_private_area')
    const amenities = searchParams.get('amenities')
    const order = searchParams.get('order')

    // Converter parâmetros para tipos apropriados ou null
    const pCode = code && code.trim() !== '' ? code.trim() : null
    const pType = type || null
    const pCityId = cityId || null
    const pNeighborhoodId = neighborhoodId || null
    const pNegotiation = negotiation || null
    const pPage = page ? parseInt(page, 10) : null
    const pItemsPage = itemsPage ? parseInt(itemsPage, 10) : null
    const pMinimumValue = minimumValue ? parseFloat(minimumValue) : null
    const pMaximumValue = maximumValue ? parseFloat(maximumValue) : null
    const pNumberBedrooms = numberBedrooms ? parseInt(numberBedrooms, 10) : null
    const pNumberBathrooms = numberBathrooms ? parseInt(numberBathrooms, 10) : null
    const pNumberParkingSpaces = numberParkingSpaces ? parseInt(numberParkingSpaces, 10) : null
    const pMinimumPrivateArea = minimumPrivateArea ? parseFloat(minimumPrivateArea) : null
    const pMaximumPrivateArea = maximumPrivateArea ? parseFloat(maximumPrivateArea) : null
    const pAmenities = amenities && amenities.trim() !== '' ? amenities.split(',').filter(Boolean) : null
    const pOrder = order || null

    // Chamar a função RPC do Supabase
    const { data, error } = await supabase.rpc('get_properties_client', {
      p_code: pCode,
      p_type: pType,
      p_city_id: pCityId,
      p_neighborhood_id: pNeighborhoodId,
      p_negotiation: pNegotiation,
      p_page: pPage,
      p_items_page: pItemsPage,
      p_minimum_value: pMinimumValue,
      p_maximum_value: pMaximumValue,
      p_number_bedrooms: pNumberBedrooms,
      p_number_bathrooms: pNumberBathrooms,
      p_number_parking_spaces: pNumberParkingSpaces,
      p_minimum_private_area: pMinimumPrivateArea,
      p_maximum_private_area: pMaximumPrivateArea,
      p_amenities: pAmenities,
      p_order: pOrder,
    })

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: 'Erro ao buscar imóveis: ' + error.message,
          data: [],
          pagination: {
            total_items: 0,
            total_pages: 0,
            current_page: 1,
          },
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
        pagination: {
          total_items: 0,
          total_pages: 0,
          current_page: 1,
        },
      },
      { status: 500 }
    )
  }
}
