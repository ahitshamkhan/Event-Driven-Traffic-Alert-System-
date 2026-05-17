# Event-Driven Traffic Alert System (TrafficFlow)

A MERN-inspired, event-driven traffic monitoring platform for smart cities. The repository includes a fully designed React command center UI and a backend scaffold for building a real-time alerting system.

## Overview
TrafficFlow provides a centralized command interface for live traffic monitoring, alert management, and camera event publishing. The frontend delivers a polished, role-aware dashboard while the backend folder lays out the core event-driven architecture modules and API structure.

## Key Features
- Event-driven architecture with an event bus + observer pattern design.
- Idempotent processing concept to block duplicate alerts.
- Role-based routing (e.g., police/admin-only camera control).
- Real-time dashboard and live feed UI.
- Alert and violation management screens.
- Camera control panel for publishing events.
- JWT-aware API client with auto-token handling.
- Dark/light theme support.

## Architecture (Design Focus)
The backend directory is structured to support:
- **Event Envelope** with schema/version metadata.
- **Event Bus + Subscribers** for routing traffic signals.
- **Idempotent Receiver** for deduplication.
- **Services** (alerts, reporting, dashboard, logging).
- **REST API** for auth, events, alerts, cameras, and dashboard stats.

> Note: Backend files are currently placeholders; use the structure to implement your API and event processing logic.

## Tech Stack
**Frontend**
- React 18 + React Router
- Tailwind CSS
- Axios
- Socket.io client
- Recharts
- Framer Motion

**Backend (scaffold)**
- Node.js / Express (intended)
- MongoDB (intended)
- Socket.io (intended)

## Repository Structure
```
.
├─ backend/               # Backend scaffold (controllers, routes, models, events, services)
└─ frontend/              # React UI
```

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm start
```

### Environment Variables (Frontend)
Create a `frontend/.env` file if you need custom endpoints:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

### Backend
The `backend/` folder provides a module layout but no implementation. Add your server entry, dependencies, and configuration as needed.

## Expected API Endpoints
These are the endpoints used by the frontend service layer:

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT |
| GET | `/events` | List events (with filters) |
| GET | `/events/:id` | Fetch single event |
| POST | `/events` | Publish event |
| GET | `/alerts` | List alerts |
| GET | `/alerts/:id` | Fetch single alert |
| PATCH | `/alerts/:id` | Update alert status |
| GET | `/dashboard/stats` | Dashboard summary stats |
| GET | `/cameras` | Camera inventory/status |

## Roles & Access
- **Public:** Home, Login, Register
- **Authenticated:** Dashboard, Live Feed, Alerts
- **Police/Admin:** Camera Control

## Notes
- Several UI screens currently use static mock data; connect them to your API for live updates.
- `react-scripts build` expects a `frontend/public/index.html` file (add it when you initialize the frontend template).

## License
No license file is included yet.
