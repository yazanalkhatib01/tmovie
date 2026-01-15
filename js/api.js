console.log("API JS LOADED");

/**
 * Generic fetch helper
 * @param {string} endpoint
 * @returns {Promise<Object>}
 */

async function fetchFromAPI(endpoint) {
  const separator = endpoint.includes("?") ? "&" : "?";

  const res = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

/**
 * Get Trending Movies (Weekly)
 * @returns {Promise<Array>}
 */

//Recommended-card
async function getRecommendedMovies() {
  return await fetchFromAPI("/movie/top_rated");
}

//Trending Movies-card
async function getTrendingMovies() {
  return await fetchFromAPI("/trending/movie/week");
}

//Hero
async function getHeroMovie() {
  const data = await fetchFromAPI("/trending/movie/day");
  return data.results.slice(0, 5);
}

let GENRES_MAP = {};
async function loadGenres() {
  const data = await fetchFromAPI("/genre/movie/list");
  data.genres.forEach((g) => {
    GENRES_MAP[g.id] = g.name;
  });
}

//Trending Series
async function getTrendingSeries() {
  const data = await fetchFromAPI("/trending/tv/day");
  return data.results;
}

// Genres
async function getMoviesByGenre(genreId) {
  const data = await fetchFromAPI(
    `/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`
  );
  return data.results;
}
