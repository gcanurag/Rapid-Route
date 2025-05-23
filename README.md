
# Rapid Route 🚗📍

Rapid Route is a web application that finds the shortest path between different locations in Kathmandu using Dijkstra’s algorithm. The app uses real-world distance data collected from Google Maps and visualizes optimized routes through an interactive interface.

## 🔧 Features

- Real-time shortest route calculation
- Dijkstra's algorithm for accuracy
- Distance data from over 50 places in Kathmandu Valley
- Vite-based frontend and custom backend API

## 🗺️ Example Locations

Some of the included locations:
- Pulchowk
- Lagankhel
- Satdobato
- Godawari
- Bhattedanda
- Kaleshowr
- And many more...

## 🛠️ Tech Stack

- **Frontend:** Vite + JavaScript
- **Backend:** Flask Python 
- **Algorithm:** Dijkstra’s Algorithm

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Python

### Clone the Repository

```bash
git clone https://github.com/gcanurag/Rapid-Route.git
cd Rapid-Route
```

### Start the Backend

Go to the `api` folder:

```bash
cd api
npm install
npm start
```

> Make sure your backend runs on a known port like `http://localhost:5000`.

### Start the Frontend

Open a new terminal, go to the `vite-project` folder:

```bash
cd ../vite-project
npm install
npm run dev
```

> The frontend will run on something like `http://localhost:5173`.

## 📌 Usage

- Select a source and destination from dropdown menus.
- The app displays the shortest route with total distance.
- Great for route optimization and learning pathfinding algorithms.


