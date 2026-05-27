export default function Loader({
  message = 'Loading users...',
  variant = 'grid',
}) {
  if (variant === 'details') {
    return (
      <div className="py-4" aria-live="polite" aria-busy="true">
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div className="bg-linear-to-br from-indigo-600 to-violet-700 px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 animate-pulse rounded-2xl bg-white/30" />
                <div className="space-y-2">
                  <div className="h-6 w-40 animate-pulse rounded bg-white/35" />
                  <div className="h-4 w-24 animate-pulse rounded bg-white/25" />
                </div>
              </div>
              <div className="h-9 w-36 animate-pulse rounded-xl bg-white/25" />
            </div>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50"
              >
                <div className="mb-2 h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm font-medium text-slate-600 dark:text-slate-400">
          {message}
        </p>
      </div>
    )
  }

  return (
    <div className="py-8" aria-live="polite" aria-busy="true">
      <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="h-12 w-12 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="h-6 w-6 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>

            <div className="mb-4 h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-4/6 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-3/6 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm font-medium text-slate-600 dark:text-slate-400">
        {message}
      </p>
    </div>
  )
}
