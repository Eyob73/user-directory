import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'user-directory-favorites'

function readFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = useCallback(
    (id) => favorites.includes(Number(id)),
    [favorites],
  )

  const toggleFavorite = useCallback((id) => {
    const numId = Number(id)
    setFavorites((prev) =>
      prev.includes(numId)
        ? prev.filter((favId) => favId !== numId)
        : [...prev, numId],
    )
  }, [])

  return { favorites, isFavorite, toggleFavorite }
}
