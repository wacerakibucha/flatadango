const BASE_URL = "http://localhost:3000";
let currentFilm = null;

document.addEventListener("DOMContentLoaded", () => {
  fetchFilms();
  document.getElementById("buy-ticket").addEventListener("click", buyTicket);
  document.getElementById("delete-film").addEventListener("click", deleteCurrentFilm);
});

function fetchFilms() {
  fetch(`${BASE_URL}/films`)
    .then(r => r.json())
    .then(renderFilmList)
    .catch(err => console.error("Error fetching films:", err));
}

function renderFilmList(films) {
  const ul = document.getElementById("films");
  ul.innerHTML = "";
  films.forEach(film => {
    const li = document.createElement("li");
    li.className = "film-item";
    if (film.capacity - film.tickets_sold <= 0) li.classList.add("sold-out");
    li.dataset.id = film.id;
    li.textContent = film.title;

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "li-delete";
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteFilm(film.id, li);
    });

    li.addEventListener("click", () => loadFilmDetails(film.id));
    li.appendChild(del);
    ul.appendChild(li);
  });

  if (films.length > 0) {
    loadFilmDetails(films[0].id);
  } else {
    clearDetails();
  }
}

function loadFilmDetails(id) {
  fetch(`${BASE_URL}/films/${id}`)
    .then(r => r.json())
    .then(film => {
      currentFilm = film;
      renderFilmDetails(film);
    })
    .catch(err => console.error("Error loading details:", err));
}

function renderFilmDetails(film) {
  document.getElementById("poster").src = film.poster;
  document.getElementById("title").textContent = film.title;
  document.getElementById("runtime").textContent = `Runtime: ${film.runtime} minutes`;
  document.getElementById("showtime").textContent = `Showtime: ${film.showtime}`;
  const available = film.capacity - film.tickets_sold;
  document.getElementById("available").textContent = `${available} tickets available`;
  document.getElementById("description").textContent = film.description;

  const buyBtn = document.getElementById("buy-ticket");
  buyBtn.disabled = available <= 0;
  buyBtn.textContent = available <= 0 ? "Sold Out" : "Buy Ticket";

  const li = document.querySelector(`#films li[data-id="${film.id}"]`);
  if (li) {
    if (available <= 0) li.classList.add("sold-out");
    else li.classList.remove("sold-out");
  }
}

function buyTicket() {
  if (!currentFilm) return;
  const available = currentFilm.capacity - currentFilm.tickets_sold;
  if (available <= 0) return alert("Sold out!");

  const updatedTicketsSold = currentFilm.tickets_sold + 1;

  fetch(`${BASE_URL}/films/${currentFilm.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tickets_sold: updatedTicketsSold })
  })
    .then(r => r.json())
    .then(updatedFilm => {
      currentFilm = updatedFilm;
      renderFilmDetails(updatedFilm);

      return fetch(`${BASE_URL}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ film_id: updatedFilm.id, number_of_tickets: 1 })
      });
    })
    .then(r => r.json())
    .then(ticketRecord => console.log("Ticket record saved:", ticketRecord))
    .catch(err => console.error("Error buying ticket:", err));
}

function deleteFilm(id, liElement) {
  fetch(`${BASE_URL}/films/${id}`, { method: "DELETE" })
    .then(() => {
      if (liElement) liElement.remove();
      if (currentFilm && currentFilm.id === id) {
        const firstLi = document.querySelector("#films li");
        if (firstLi) loadFilmDetails(firstLi.dataset.id);
        else clearDetails();
      }
    })
    .catch(err => console.error("Error deleting film:", err));
}

function deleteCurrentFilm() {
  if (!currentFilm) return;
  const li = document.querySelector(`#films li[data-id="${currentFilm.id}"]`);
  deleteFilm(currentFilm.id, li);
}

function clearDetails() {
  document.getElementById("poster").src = "";
  document.getElementById("title").textContent = "No films";
  document.getElementById("runtime").textContent = "";
  document.getElementById("showtime").textContent = "";
  document.getElementById("available").textContent = "";
  document.getElementById("description").textContent = "";
  const buyBtn = document.getElementById("buy-ticket");
  buyBtn.disabled = true;
  buyBtn.textContent = "Buy Ticket";
}
