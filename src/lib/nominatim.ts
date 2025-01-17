export interface NominatimResult {
    place_id: number
    licence: string
    osm_type: string
    osm_id: number
    boundingbox: string[]
    lat: string
    lon: string
    display_name: string
    class: string
    type: string
    importance: number
    address: { county?: string, state?: string },
    name: string
  }
  
  export async function searchLocations(query: string): Promise<NominatimResult[]> {
    const params = new URLSearchParams({
      q: query,
      format: 'json',
      countrycodes: 'ao', // Angola country code
      limit: '10',
      addressdetails: '1',
    })
  
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params}`,
      {
        headers: {
          'User-Agent': 'AngolaRealEstate/1.0',
        },
      }
    )
  
    if (!response.ok) {
      throw new Error('Failed to fetch locations')
    }
  
    return response.json()
  }