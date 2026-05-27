import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchUserById } from "../api/users";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useFavorites } from "../hooks/useFavorites";

function DetailItem({ icon, label, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
      <dt className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        <span aria-hidden="true">{icon}</span>
        {label}
      </dt>
      <dd className="text-sm font-medium text-slate-900 dark:text-slate-100">
        {children}
      </dd>
    </div>
  );
}

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prevId, setPrevId] = useState(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (id !== prevId) {
    setPrevId(id);
    setUser(null);
    setLoading(true);
    setError(null);
  }

  useEffect(() => {
    let cancelled = false;

    fetchUserById(id)
      .then(({ data }) => {
        if (!cancelled) setUser(data);
      })
      .catch((err) => {
        if (!cancelled) {
          if (err.response?.status === 404) {
            setError("User not found.");
          } else {
            setError(
              err.response?.data?.message ||
                err.message ||
                "Failed to load user details.",
            );
          }
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const loadUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchUserById(id);
      setUser(data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("User not found.");
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load user details.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const websiteUrl = user?.website?.startsWith("http")
    ? user.website
    : `https://${user?.website}`;

  const mapsUrl = user?.address?.geo
    ? `https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`
    : null;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to directory
      </Link>

      {loading && <Loader message="Loading user details..." />}

      {!loading && error && <ErrorMessage message={error} onRetry={loadUser} />}

      {!loading && !error && user && (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div className="bg-linear-to-br from-indigo-600 to-violet-700 px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold text-white backdrop-blur">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    {user.name}
                  </h1>
                  <p className="text-indigo-100">@{user.username}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite(user.id)}
                className={`self-start rounded-xl px-4 py-2 text-sm font-medium transition sm:self-center ${
                  isFavorite(user.id)
                    ? "bg-white text-rose-600"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {isFavorite(user.id) ? "❤️ Favorited" : "🤍 Add to favorites"}
              </button>
            </div>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
            <DetailItem icon="🆔" label="Username">
              @{user.username}
            </DetailItem>
            <DetailItem icon="📧" label="Email">
              <a
                href={`mailto:${user.email}`}
                className="text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {user.email}
              </a>
            </DetailItem>
            <DetailItem icon="📱" label="Phone">
              <a
                href={`tel:${user.phone}`}
                className="text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {user.phone}
              </a>
            </DetailItem>
            <DetailItem icon="🌐" label="Website">
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {user.website}
              </a>
            </DetailItem>
            <DetailItem icon="🏢" label="Company">
              <div>
                <p>{user.company.name}</p>
                <p className="mt-1 text-xs font-normal italic text-slate-500 dark:text-slate-400">
                  &ldquo;{user.company.catchPhrase}&rdquo;
                </p>
              </div>
            </DetailItem>
            <DetailItem icon="📍" label="Address">
              {user.address.suite}, {user.address.street}
            </DetailItem>
            <DetailItem icon="🏙️" label="City">
              {user.address.city}
            </DetailItem>
            <DetailItem icon="📮" label="Zipcode">
              {user.address.zipcode}
            </DetailItem>
            <DetailItem icon="🌍" label="Geo Location">
              {mapsUrl ? (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Lat {user.address.geo.lat}, Lng {user.address.geo.lng}
                </a>
              ) : (
                `Lat ${user.address.geo.lat}, Lng ${user.address.geo.lng}`
              )}
            </DetailItem>
          </div>
        </article>
      )}
    </main>
  );
}
