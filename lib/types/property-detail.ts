import { PropertiesType, PropertiesNegotiations, PropertiesAmenities } from './properties'

export interface PropertyDetailState {
  id: string
  name: string
  uf: string
}

export interface PropertyDetailCity {
  id: string
  name: string
}

export interface PropertyDetailNeighborhood {
  id: string
  name: string
}

export interface PropertyDetailImage {
  id: string
  url: string
  order: number
}

export interface PropertyDetailVideo {
  id: string
  url: string
  order: number
}

export interface PropertyDetail {
  id: string
  title: string
  description: string | null
  code: string
  type: PropertiesType
  state: PropertyDetailState | null
  city: PropertyDetailCity | null
  neighborhood: PropertyDetailNeighborhood | null
  street: string | null
  address_number: string | null
  address_complement: string | null
  cep: string | null
  sale_value: number | null
  lease_value: number | null
  condominium_value: number | null
  iptu_value: number | null
  value_fire_insurance: number | null
  financing: boolean | null
  negotiations: PropertiesNegotiations[]
  amenities: PropertiesAmenities[]
  number_bedrooms: number | null
  number_suites: number | null
  number_bathrooms: number | null
  number_parking_spaces: number | null
  number_rooms: number | null
  total_area: number | null
  private_area: number | null
  useful_area: number | null
  images: PropertyDetailImage[]
  videos: PropertyDetailVideo[]
}

export interface PropertyDetailResponse {
  status: boolean
  message: string
  data: PropertyDetail | null
}
