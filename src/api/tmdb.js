// src/api/tmdb.js

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query) {
  if (typeof API_KEY !== "string" || API_KEY.trim() === "") {
    console.error("TMDB API key is missing. Check your .env file.");
    throw new Error("TMDB API key is not configured");
  }

  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch movies from TMDB");
  }

  const data = await response.json();
  return data.results; // array of movie objects
}
