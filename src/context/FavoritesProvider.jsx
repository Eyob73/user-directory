import { useState, useEffect, useCallback } from 'react'
import { FavoritesContext } from './favoritesContext'

const STORAGE_KEY = 'user-directory-favorites'

function readFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
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

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}
