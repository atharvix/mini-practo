# Hospital Management System - Frontend

A modern React + TypeScript frontend for the Hospital Management System (HMS).

## Features

- 📊 **Dashboard** - Overview of all entities
- 👤 **Patients Management** - CRUD operations for patients
- 👨‍⚕️ **Doctors Management** - CRUD operations for doctors
- 👷 **Caretakers Management** - CRUD operations for caretakers
- 💊 **Medicines Management** - CRUD operations and stock management
- 🔍 **Search** - Search across all entities by UID

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router DOM
- Axios
- CSS3 (Custom CSS with CSS Variables)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Configuration

The frontend is configured to proxy API requests to `http://localhost:8080` by default (configured in `vite.config.ts`).

To change the API URL, create a `.env` file:
```
VITE_API_URL=http://localhost:8080/api
```

## Backend Requirements

Make sure the Spring Boot backend is running on `http://localhost:8080` before starting the frontend.

## Build

To build for production:
```bash
npm run build
```

The production build will be in the `dist` folder.

