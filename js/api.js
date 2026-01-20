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
 * Get Trending Movies (Daily)
 * @returns {Promise<Array>}
 */

async function getRecommendedMovies() {
  return await fetchFromAPI("/movie/top_rated");
}

async function getTrendingMovies() {
  return await fetchFromAPI("/trending/movie/day");
}

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

async function getTrendingSeries() {
  const data = await fetchFromAPI("/trending/tv/day");
  return data.results;
}

async function getMoviesByGenre(genreId) {
  const data = await fetchFromAPI(
    `/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`
  );
  return data.results;
}

async function getIMDBTopMovies() {
  const data = await fetchFromAPI("/movie/top_rated");
  return data.results;
}

async function getIMDBTopSeries() {
  const data = await fetchFromAPI("/tv/top_rated");
  return data.results;
}

async function getTrendingTVShows() {
  const data = await fetchFromAPI("/trending/tv/day");
  return data.results;
}

async function getWatchlist() {
  const data = await fetchFromAPI("/trending/movie/day");
  return data.results;
}
