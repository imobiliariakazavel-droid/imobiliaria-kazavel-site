export interface Neighborhood {
  id: string
  name: string
}

export interface NeighborhoodsPagination {
  total_items: number
  total_pages: number
  current_page: number
}

export interface NeighborhoodsResponse {
  status: boolean
  message: string
  data: Neighborhood[]
  pagination: NeighborhoodsPagination
}

export interface NeighborhoodsApiParams {
  page?: number
  items_page?: number
  city_id?: string
  search?: string
}
