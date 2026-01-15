console.log("UI JS LOADED");

//profile Img
const randomId = Math.floor(Math.random() * 70) + 1;
document.getElementById(
  "profileImg"
).src = `https://i.pravatar.cc/150?img=${randomId}`;

//card slider
const slider = document.querySelector(".movies-grid");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5;
  slider.scrollLeft = scrollLeft - walk;
});

//Api-ui
// cards
function createMovieCard(item) {
  const title = item.title || item.name;
  const image = item.poster_path || item.backdrop_path;
  const rating = item.vote_average?.toFixed(1) || "N/A";

  if (!image) return "";

  return `
    <div class="movie-card">
      <div class="movie-card__image">
        <img src="${IMAGE_BASE_URL + image}" alt="${title}" />

        <button class="movie-card__favorite">
          <span class="material-symbols-outlined">favorite</span>
        </button>

        <div class="movie-card__rating">
          <span class="material-symbols-outlined">star</span>
          ${rating}
        </div>
      </div>

      <div class="movie-card__info">
        <h3 class="movie-card__title">${title}</h3>
      </div>
    </div>
  `;
}

function renderMovies(containerId, movies = []) {
  const container = document.getElementById(containerId);
  container.innerHTML = movies.map(createMovieCard).join("");
}
//Hero
function renderHero(movie, animate = false) {
  const hero = document.querySelector(".hero");
  const title = document.getElementById("hero__title");
  const desc = document.getElementById("hero__desc");
  const bg = document.getElementById("hero__bg");
  const meta = document.getElementById("hero__meta");

  if (animate) hero.classList.add("hero--fade");

  setTimeout(() => {
    title.textContent = movie.title;
    desc.textContent = movie.overview;

    bg.src = IMAGE_BASE_URL + movie.backdrop_path;
    bg.alt = movie.title;

    const genres = movie.genre_ids
      .map((id) => GENRES_MAP[id])
      .filter(Boolean)
      .join(" • ");

    meta.innerHTML = `
    <span class="hero__imdb">
      <span class="hero__imdb-logo">IMDb</span>
      ${movie.vote_average.toFixed(1)}
    </span>
    <span>${genres}</span>
  `;
  }, 150);

  if (animate) {
    setTimeout(() => hero.classList.remove("hero--fade"), 300);
  }
}

//Genres tabs
function renderGenresTabs(genres) {
  const container = document.getElementById("genres__tabs");

  container.innerHTML = genres
    .slice(0, 8)
    .map(
      (g, i) => `
      <button 
        class="genres__tab ${i === 0 ? "active" : ""}" 
        data-id="${g.id}">
        ${g.name}
      </button>
    `
    )
    .join("");
}
