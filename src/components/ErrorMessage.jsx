export default function ErrorMessage({ message, onRetry }) {
  return (
    <div
      className="mx-auto max-w-lg rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-900 dark:bg-rose-950/50"
      role="alert"
    >
      <span className="mb-3 block text-4xl" aria-hidden="true">
        ❌
      </span>
      <h2 className="mb-2 text-lg font-semibold text-rose-800 dark:text-rose-200">
        Something went wrong
      </h2>
      <p className="mb-6 text-sm text-rose-700 dark:text-rose-300">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-rose-700"
        >
          Try again
        </button>
      )}
    </div>
  )
}
