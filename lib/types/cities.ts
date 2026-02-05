export interface City {
  id: string
  name: string
}

export interface CitiesPagination {
  total_items: number
  total_pages: number
  current_page: number
}

export interface CitiesResponse {
  status: boolean
  message: string
  data: City[]
  pagination: CitiesPagination
}

export interface CitiesApiParams {
  page?: number
  items_page?: number
  search?: string
}
