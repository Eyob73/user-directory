import { useEffect, useMemo, useState } from 'react'
import { fetchUsers } from '../api/users'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import UserCard from '../components/UserCard'
import { useFavorites } from '../hooks/useFavorites'

const USERS_PER_PAGE = 6

export default function Home({ showFavoritesOnly }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [prevSearch, setPrevSearch] = useState(search)
  const [prevFavoritesFilter, setPrevFavoritesFilter] = useState(showFavoritesOnly)
  const { isFavorite, toggleFavorite } = useFavorites()

  if (search !== prevSearch) {
    setPrevSearch(search)
    setCurrentPage(1)
  }

  if (showFavoritesOnly !== prevFavoritesFilter) {
    setPrevFavoritesFilter(showFavoritesOnly)
    setCurrentPage(1)
  }

  const loadUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await fetchUsers()
      setUsers(data)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to fetch users. Please check your connection.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let cancelled = false

    fetchUsers()
      .then(({ data }) => {
        if (!cancelled) setUsers(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.message ||
              'Failed to fetch users. Please check your connection.',
          )
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()
    let list = users

    if (showFavoritesOnly) {
      list = list.filter((user) => isFavorite(user.id))
    }

    if (!query) return list

    return list.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.company.name.toLowerCase().includes(query) ||
        user.phone.includes(query),
    )
  }, [users, search, showFavoritesOnly, isFavorite])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE))
  const activePage = Math.min(currentPage, totalPages)

  const paginatedUsers = useMemo(() => {
    const start = (activePage - 1) * USERS_PER_PAGE
    return filteredUsers.slice(start, start + USERS_PER_PAGE)
  }, [filteredUsers, activePage])

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Discover People
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Browse and search our directory of users. Click a card for full details.
        </p>
      </div>

      <div className="mb-8 flex justify-center sm:justify-start">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {loading && <Loader />}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={loadUsers} />
      )}

      {!loading && !error && (
        <>
          <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
            Showing {paginatedUsers.length} of {filteredUsers.length} user
            {filteredUsers.length !== 1 ? 's' : ''}
            {showFavoritesOnly && ' in favorites'}
            {search.trim() && ` matching "${search.trim()}"`}
          </p>

          {filteredUsers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
              <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
                {showFavoritesOnly
                  ? 'No favorites yet. Tap the heart on a user card to save one.'
                  : 'No users match your search.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  isFavorite={isFavorite(user.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}

          <Pagination
            currentPage={activePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </main>
  )
}
