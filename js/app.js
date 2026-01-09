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
    heroIndex = 0;
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
