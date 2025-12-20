// src/pages/Movies.jsx
import React from "react";
import { searchMovies } from "../api/tmdb";
import useLocalStorage from "../useLocalStorage";

function Movies() {
  const [query, setQuery] = useLocalStorage("tmdbQuery", "");
  const [results, setResults] = useLocalStorage("tmdbResults", []);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const movies = await searchMovies(query);
      setResults(movies); // this will also update localStorage
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Movie Search</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          style={{ padding: "0.5rem", minWidth: "250px", marginRight: "0.5rem" }}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {results.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "0.75rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", borderRadius: "4px", marginBottom: "0.5rem" }}
              />
            )}
            <h3>{movie.title}</h3>
            <p>Release: {movie.release_date || "N/A"}</p>
            <p>Rating: {movie.vote_average ?? "N/A"}</p>
            <p style={{ fontSize: "0.85rem" }}>
              {movie.overview ? movie.overview.slice(0, 150) + "..." : "No overview"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
