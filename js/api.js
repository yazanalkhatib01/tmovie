console.log("API JS LOADED");

/**
 * Generic fetch helper
 * @param {string} endpoint
 * @returns {Promise<Object>}
 */

async function fetchFromAPI(endpoint) {
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
  }
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
