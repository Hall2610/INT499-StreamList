// src/pages/Movies.jsx
import { useEffect, useRef, useState } from "react";
import { searchMovies } from "../api/tmdb";
import useLocalStorage from "../useLocalStorage";

function Movies() {
  const [query, setQuery] = useLocalStorage("tmdbQuery", "");
  const [results, setResults] = useLocalStorage("tmdbResults", []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [restored, setRestored] = useState(false);

  // Prevent the "restored" effect from running more than once
  const didCheckRestore = useRef(false);

  // Prevent older searches from overwriting newer results (race condition)
  const activeRequestId = useRef(0);

  useEffect(() => {
    if (didCheckRestore.current) return;
    didCheckRestore.current = true;

    const hasStoredQuery = typeof query === "string" && query.trim().length > 0;
    const hasStoredResults = Array.isArray(results) && results.length > 0;

    if (hasStoredQuery || hasStoredResults) {
      setRestored(true);
    }
  }, [query, results]);

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmed = typeof query === "string" ? query.trim() : "";
    if (!trimmed) {
      setError("Please enter a search term.");
      return;
    }

    const requestId = ++activeRequestId.current;

    setLoading(true);
    setError(null);

    try {
      const movies = await searchMovies(trimmed);

      // If another request started after this one, ignore this response
      if (requestId !== activeRequestId.current) return;

      setResults(Array.isArray(movies) ? movies : []);
      setRestored(false); // new search replaces restored state
    } catch (err) {
      if (requestId !== activeRequestId.current) return;

      console.error(err);
      const message =
        (err && typeof err === "object" && "message" in err && err.message) ||
        "Something went wrong.";
      setError(message);
    } finally {
      if (requestId === activeRequestId.current) {
        setLoading(false);
      }
    }
  }

  function handleClear() {
    // This clears both UI state and persisted localStorage values via your hook
    setQuery("");
    setResults([]);
    setError(null);
    setRestored(false);
  }

  const trimmedQuery = typeof query === "string" ? query.trim() : "";
  const showNoResults =
    !loading && !error && Array.isArray(results) && results.length === 0 && trimmedQuery.length > 0;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Movie Search</h1>

      {/* Accessibility: announce restored state */}
      {restored && (
        <p style={{ marginTop: "0.5rem" }} aria-live="polite">
          Restored your previous search from localStorage.
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        {/* Label improves accessibility and testing */}
        <label htmlFor="movie-search" style={{ display: "block", marginBottom: "0.25rem" }}>
          Search
        </label>

        <input
          id="movie-search"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Search for a movie..."
          style={{
            padding: "0.5rem",
            minWidth: "250px",
            marginRight: "0.5rem",
          }}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>

        <button type="button" onClick={handleClear} style={{ marginLeft: "0.5rem" }}>
          Clear
        </button>
      </form>

      {error && (
        <p style={{ color: "red" }} aria-live="assertive">
          Error: {error}
        </p>
      )}

      {showNoResults && <p>No results found for that search.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {Array.isArray(results) &&
          results.map((movie) => {
            const overview =
              typeof movie?.overview === "string" ? movie.overview.trim() : "";

            const shortOverview =
              overview.length > 150 ? overview.slice(0, 150) + "..." : overview;

            return (
              <div
                key={movie?.id ?? `${movie?.title ?? "movie"}-${Math.random()}`}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                }}
              >
                {movie?.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie?.title ? `${movie.title} poster` : "Movie poster"}
                    style={{
                      width: "100%",
                      borderRadius: "4px",
                      marginBottom: "0.5rem",
                    }}
                    loading="lazy"
                  />
                ) : (
                  <div
                    style={{
                      height: "330px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px dashed #ccc",
                      borderRadius: "4px",
                      marginBottom: "0.5rem",
                      padding: "0.5rem",
                      textAlign: "center",
                    }}
                  >
                    No poster available
                  </div>
                )}

                <h3 style={{ margin: "0.25rem 0" }}>{movie?.title || "Untitled"}</h3>

                <p style={{ margin: "0.25rem 0" }}>
                  Release: {movie?.release_date || "N/A"}
                </p>

                <p style={{ margin: "0.25rem 0" }}>
                  Rating: {movie?.vote_average ?? "N/A"}
                </p>

                <p style={{ fontSize: "0.85rem" }}>
                  {shortOverview || "No overview available."}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Movies;
