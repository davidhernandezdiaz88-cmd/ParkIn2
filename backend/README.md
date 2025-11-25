# Backend — ParkIn

Node.js + Express API with MongoDB (Mongoose).

Env example: see `.env.example`.

Scripts:
- `npm run dev` — dev server with nodemon
- `npm run start` — start
- `npm run seed` — seed database with admin and sample data

Endpoints (starter):
- `GET /api/health` — health check
- `POST /api/auth/register` — register
- `POST /api/auth/login` — login
- `GET /api/parkings` — list parkings
- `POST /api/parkings` — create parking (admin)
- `GET /api/parkings/:id` — get parking with spots
- `GET /api/spots/parking/:parkingId` — list spots
- `POST /api/spots` — create spot (admin)

Run seed after installing dependencies and configuring `.env`:

```powershell
cd backend; npm install; cp .env.example .env; npm run seed
```
