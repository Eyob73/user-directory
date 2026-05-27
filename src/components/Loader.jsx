export default function Loader({ message = 'Loading users...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600 dark:border-indigo-900 dark:border-t-indigo-400"
        role="status"
        aria-label="Loading"
      />
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
        {message}
      </p>
    </div>
  )
}
