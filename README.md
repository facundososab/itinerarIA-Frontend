# ItinerarIA - Frontend

## Prerequisites
List of necessary dependencies and versions to run the project:
- Node.js (version 21.7.1 or higher)
- npm

## Installation
Instructions to clone the repository and install dependencies:

```bash
git clone https://github.com/facundososab/itinerarIA-Frontend.git
cd itinerarIA-Frontend
npm install
```

You must create a .env file to define the Backend API URL for the application as follows:

```bash
VITE_API_URL = 'http://example:1000'
```
By default, it will be set to http://localhost:3000.

## Usage
How to run the application in a development environment:

```bash
npm run dev
```

This will open the application at http://localhost:5173 (you can adjust the URL in the vite.config.ts file).

To ensure the application runs correctly, the backend must be running. You can find it here: ([ItinerarIA-Backend](https://github.com/TomasSanchezMachado/itinerarIA-Backend))


