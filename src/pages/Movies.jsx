// src/pages/Movies.jsx
import React from "react";
import { searchMovies } from "../api/tmdb";
import useLocalStorage from "../useLocalStorage";

function Movies() {
  const [query, setQuery] = useLocalStorage("tmdbQuery", "");
  const [results, setResults] = useLocalStorage("tmdbResults", []);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [restored, setRestored] = React.useState(false);

  // Detect restored session data (useful for your video narration)
  React.useEffect(() => {
    const hasStoredQuery = typeof query === "string" && query.trim().length > 0;
    const hasStoredResults = Array.isArray(results) && results.length > 0;

    if (hasStoredQuery || hasStoredResults) {
      setRestored(true);
    }
    // Run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) {
      setError("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const movies = await searchMovies(trimmed);
      setResults(Array.isArray(movies) ? movies : []);
      setRestored(false); // this is a new search, not a restored view
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setQuery("");
    setResults([]);
    setError(null);
    setRestored(false);

    // Extra explicit clearing for demonstration clarity
    localStorage.removeItem("tmdbQuery");
    localStorage.removeItem("tmdbResults");
  }

  const showNoResults =
    !loading &&
    !error &&
    Array.isArray(results) &&
    results.length === 0 &&
    query.trim().length > 0;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Movie Search</h1>

      {restored && (
        <p style={{ marginTop: "0.5rem" }}>
          Restored your previous search from localStorage.
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
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

        <button
          type="button"
          onClick={handleClear}
          style={{ marginLeft: "0.5rem" }}
        >
          Clear
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
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
              typeof movie.overview === "string" ? movie.overview.trim() : "";

            const shortOverview =
              overview.length > 150 ? overview.slice(0, 150) + "..." : overview;

            return (
              <div
                key={movie.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                }}
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title || "Movie poster"}
                    style={{
                      width: "100%",
                      borderRadius: "4px",
                      marginBottom: "0.5rem",
                    }}
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

                <h3 style={{ margin: "0.25rem 0" }}>
                  {movie.title || "Untitled"}
                </h3>

                <p style={{ margin: "0.25rem 0" }}>
                  Release: {movie.release_date || "N/A"}
                </p>

                <p style={{ margin: "0.25rem 0" }}>
                  Rating: {movie.vote_average ?? "N/A"}
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
