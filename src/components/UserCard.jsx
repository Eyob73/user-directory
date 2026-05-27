import { Link } from "react-router-dom";

function InfoRow({ icon, label, value, href }) {
  const content = (
    <span className="truncate text-sm text-slate-600 dark:text-slate-300">
      {value}
    </span>
  );

  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 shrink-0 text-base" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <span className="sr-only">{label}: </span>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="truncate text-sm text-indigo-600 hover:underline dark:text-indigo-400"
          >
            {value}
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

export default function UserCard({ user, isFavorite, onToggleFavorite }) {
  const website = user.website.replace(/^https?:\/\//, "");
  const websiteUrl = user.website.startsWith("http")
    ? user.website
    : `https://${user.website}`;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(user.id);
  };

  return (
    <article className="group relative">
      <Link
        to={`/users/${user.id}`}
        className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/50"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {user.name.charAt(0)}
          </div>
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            className={`rounded-full p-2 transition hover:scale-110 ${
              isFavorite
                ? "text-rose-500"
                : "text-slate-300 hover:text-rose-400 dark:text-slate-600"
            }`}
          >
            <svg
              className="h-5 w-5"
              fill={isFavorite ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <h2 className="mb-3 text-lg font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
          {user.name}
        </h2>

        <div className="mt-auto space-y-2">
          <InfoRow
            icon="📧"
            label="Email"
            value={user.email}
            href={`mailto:${user.email}`}
          />
          <InfoRow
            icon="📱"
            label="Phone"
            value={user.phone}
            href={`tel:${user.phone}`}
          />
          <InfoRow icon="🏢" label="Company" value={user.company.name} />
          <InfoRow
            icon="🌐"
            label="Website"
            value={website}
            href={websiteUrl}
          />
        </div>
      </Link>
    </article>
  );
}
