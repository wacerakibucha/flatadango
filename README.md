# Flatadango 

Flatadango is a mini web app that lets users view movies, buy tickets, and manage showings for the Flatiron Movie Theater.  

This project demonstrates the **three pillars of JavaScript**:
1. **Handling Events** (clicks for buying/deleting/selecting films)  
2. **Manipulating the DOM** (rendering film list and details dynamically)  
3. **Communicating with the Server** (using `GET`, `POST`, `PATCH`, and `DELETE` with `json-server`)  

---

## 🚀 Features
- See details of the first movie on page load.  
- Browse a menu of all movies.  
- Buy tickets (updates available tickets, prevents overselling).  
- Delete a film from the server and UI.  
- Sold-out movies are marked clearly in the UI.  


## 📦 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/flatadango.git
cd flatadango
Install dependencies (optional)

If you use Node packages later, install them here. For now, only json-server is needed.

npm install

3. Start the backend (json-server)

Run the server to serve the data in db.json:

npx json-server --watch db.json --port 3000


You should see endpoints like:

http://localhost:3000/films

http://localhost:3000/tickets

 Keep this terminal window running while using the app.

4. Start the frontend

Open index.html in your browser. Use VS Code’s Live Server extension
Right-click index.html → Open with Live Server
App will open at http://127.0.0.1:5500/ or similar


Open in browser: http://localhost:5500/index.html

🔑 How to Use

On load, the first movie’s details appear.

Click on a film in the left menu to load its details.

Click Buy Ticket to reduce available tickets (until sold out).

Click Delete Film to remove the movie from the list and the server.

🛠️ API Endpoints Used

GET /films → fetch list of films.

GET /films/:id → fetch details of a single film.

PATCH /films/:id → update tickets_sold when buying tickets.

POST /tickets → log a new ticket purchase.

DELETE /films/:id → remove a film.

📂 Project Structure
flatadango/
│── index.html      # Main HTML page
│── styles.css      # Styles
│── main.js         # Core JavaScript logic
│── db.json         # Mock database for json-server
│── README.md       # Project documentation
└── .gitignore


Author

Beatrice Kibucha


