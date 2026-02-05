export type PropertiesType = 'house' | 'apartment' | 'land' | 'office' | 'store' | 'farm' | 'small_farm'
export type PropertiesNegotiations = 'sale' | 'lease'
export type OrderProperties = 
  | 'greater_value'
  | 'lowest_value'
  | 'largest_private_area'
  | 'smallest_private_area'
  | 'largest_number_bedrooms'
  | 'smallest_number_bedrooms'
export type PropertiesAmenities = 
  | 'air_conditioning'
  | 'elevator'
  | 'pool'
  | 'grill'
  | 'kitchen'
  | 'balcony'
  | 'laundry_room'
  | 'home_office'
  | 'internet'
  | 'interfone'
  | 'doorman'
  | 'gourmet_area'
  | 'terrace'
  | 'closet'
  | 'built_in_furniture'

export interface State {
  id: string
  name: string
  uf: string
}

export interface City {
  id: string
  name: string
}

export interface Neighborhood {
  id: string
  name: string
}

export interface PropertyImage {
  id: string
  url: string
  order: number
}

export interface Property {
  id: string
  title: string
  state: State | null
  city: City | null
  neighborhood: Neighborhood | null
  code: string
  images: PropertyImage[]
  sale_value: number | null
  lease_value: number | null
  negotiations: PropertiesNegotiations[]
  private_area: number | null
  number_bedrooms: number | null
  number_suites: number | null
  number_parking_spaces: number | null
  number_bathrooms: number | null
}

export interface PropertiesPagination {
  total_items: number
  total_pages: number
  current_page: number
}

export interface PropertiesResponse {
  status: boolean
  message: string
  data: Property[]
  pagination: PropertiesPagination
}

export interface PropertiesApiParams {
  code?: string
  type?: PropertiesType
  city_id?: string
  neighborhood_id?: string
  negotiation?: PropertiesNegotiations
  page?: number
  items_page?: number
  minimum_value?: number
  maximum_value?: number
  number_bedrooms?: number
  number_bathrooms?: number
  number_parking_spaces?: number
  minimum_private_area?: number
  maximum_private_area?: number
  amenities?: PropertiesAmenities[]
  order?: OrderProperties
}
