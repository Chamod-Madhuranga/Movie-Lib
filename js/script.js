function toggleMenu() {
  document.querySelector(".nav-list").classList.toggle("show");
}
//for form validations
function validateForm() {
  const form = document.getElementById('contact-form');
  const requiredFields = ['firstName', 'lastName', 'email', 'comments'];
  for (const name of requiredFields) {
    if (!form[name].value.trim()) {
      alert(`${form[name].placeholder} is required.`);
      return false;
    }
  }
  return true;
}




// Fetch default movies on load
window.addEventListener("DOMContentLoaded", () => {
  fetchInitialMovies("batman");
});

async function fetchInitialMovies(query) {
  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
  const data = await response.json();
  const grid = document.getElementById("movie-grid");

  grid.innerHTML = ""; // clear all

  data.slice(0, 3).forEach(item => {
    const show = item.show;
    const card = createMovieCard(show);
    grid.appendChild(card);
  });
}

// Search from user input
async function searchMovies() {
  const query = document.getElementById("search").value.trim();
  if (!query) return;

  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
  const data = await response.json();
  const grid = document.getElementById("movie-grid");

  data.forEach(item => {
    const show = item.show;
    const card = createMovieCard(show);
    grid.appendChild(card);
  });
}

// Card creation
function createMovieCard(show) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <button class="remove-btn" onclick="removeMovie(this)">×</button>
    <img src="${show.image?.medium || 'assets/placeholder.png'}" alt="${show.name}" />
    <h3>${show.name}</h3>
    <p>${show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'No description available.'}</p>
  `;
  return card;
}

// Remove card
function removeMovie(button) {
  button.closest(".movie-card").remove();
}
