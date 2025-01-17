"use client"

import { useState, useCallback } from 'react'
import { useDebounce } from './use-debounce'
import { searchLocations, NominatimResult } from '@/lib/nominatim'

export function useLocationSearch() {
  const [results, setResults] = useState<NominatimResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const locations = await searchLocations(query)
      setResults(locations)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search locations')
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    results,
    isLoading,
    error,
    search,
  }
}