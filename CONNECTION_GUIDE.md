# Frontend-Backend Connection Guide

This guide explains how to connect and run the frontend and backend together.

## Quick Start

### 1. Start the Backend (Spring Boot)

```bash
# Make sure MySQL is running and database 'hms' exists
./mvnw spring-boot:run
```

The backend will start on **http://localhost:8080**

### 2. Start the Frontend (React)

Open a new terminal:

```bash
cd frontend
npm install  # First time only
npm run dev
```

The frontend will start on **http://localhost:3000**

## How the Connection Works

### Development Mode (Vite Proxy)

In development, the frontend uses Vite's proxy feature:

1. Frontend runs on `http://localhost:3000`
2. All `/api/*` requests are automatically proxied to `http://localhost:8080`
3. This avoids CORS issues during development

**Configuration:** `frontend/vite.config.ts`
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  },
}
```

### CORS Configuration

The backend has CORS enabled in two ways:

1. **Global CORS Filter** (`CorsConfig.java`) - Allows all origins, methods, and headers
2. **Controller-level** - Each controller has `@CrossOrigin` annotation

This ensures the frontend can communicate with the backend from any origin.

## Testing the Connection

1. Open the frontend at `http://localhost:3000`
2. Navigate to the Dashboard - it should load statistics
3. Try creating a new Patient, Doctor, Caretaker, or Medicine
4. Use the Search feature to find entities by UID

## Troubleshooting

### Backend not starting
- Check if MySQL is running
- Verify database credentials in `application.properties`
- Ensure port 8080 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 8080
- Check browser console for errors
- Ensure no firewall is blocking the connection
- Try accessing `http://localhost:8080/api/patients` directly in browser

### CORS errors
- The global CORS configuration should handle this
- If issues persist, check that `CorsConfig.java` is in the correct package

### Port conflicts
- Backend: Change `server.port` in `application.properties`
- Frontend: Change `port` in `vite.config.ts`

## Production Setup

For production, you'll need to:

1. Build the frontend: `npm run build` (creates `dist` folder)
2. Serve the frontend static files (nginx, Apache, or serve from Spring Boot)
3. Update CORS configuration to allow only your production domain
4. Set `VITE_API_URL` environment variable to your production API URL

