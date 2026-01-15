console.log("APP JS LOADED");

//card favorite icon
document.addEventListener("click", (e) => {
  const favBtn = e.target.closest(".movie-card__favorite");
  if (!favBtn) return;

  e.stopPropagation();
  favBtn.classList.toggle("movie-card__favorite--active");
});

//sidebarToggle
const sidebar = document.querySelector(".sidebar--menu");
const toggleBtn = document.getElementById("sidebarToggle");
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar--collapsed");
});

//-API-
//hero,recommended,trendingMoves

let heroMovies = [];
let heroIndex = 0;

async function initHomePage() {
  await loadGenres();

  if (document.getElementById("hero__title")) {
    heroMovies = await getHeroMovie();
    renderHero(heroMovies[heroIndex]);
    initHeroSlider();
  }

  if (document.getElementById("recommended-movies")) {
    const recommended = await getRecommendedMovies();
    renderMovies("recommended-movies", recommended.results);
  }

  if (document.getElementById("trending-movies")) {
    const trending = await getTrendingMovies();
    renderMovies("trending-movies", trending.results);
  }

  if (document.getElementById("trending-series")) {
    const series = await getTrendingSeries();
    renderMovies("trending-series", series);
  }

  if (document.getElementById("genres__tabs")) {
    const genresArray = Object.entries(GENRES_MAP).map(([id, name]) => ({
      id: Number(id),
      name,
    }));

    renderGenresTabs(genresArray);

    const firstGenreId = genresArray[0].id;
    const movies = await getMoviesByGenre(firstGenreId);
    renderMovies("genres-movies", movies);

    initGenresTabs();
  }
}
initHomePage();

function initHeroSlider() {
  const nextBtn = document.querySelector(".hero__arrow:last-child");
  const prevBtn = document.querySelector(".hero__arrow:first-child");

  nextBtn.addEventListener("click", () => {
    heroIndex = (heroIndex + 1) % heroMovies.length;
    renderHero(heroMovies[heroIndex], true);
  });

  prevBtn.addEventListener("click", () => {
    heroIndex = (heroIndex - 1 + heroMovies.length) % heroMovies.length;
    renderHero(heroMovies[heroIndex], true);
  });
}

//Genres tabs functionality

function initGenresTabs() {
  const tabs = document.querySelectorAll(".genres__tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", async () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const genreId = tab.dataset.id;
      const movies = await getMoviesByGenre(genreId);
      renderMovies("genres-movies", movies);
    });
  });
}
