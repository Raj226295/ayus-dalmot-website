# Ayush Kursela

## Structure

- `frontend/user` — customer website (port 5173)
- `frontend/admin` — protected admin application (port 5174)
- `backend` — shared backend scaffold (port 5000)

The existing user and admin interfaces are preserved as separate Vite applications. Both frontends use the same static Ayush assets from `frontend/user/public`.

## Install

```bash
npm install
npm run install:all
```

Environment files are located at:

- `frontend/user/.env`
- `frontend/admin/.env`
- `backend/.env`

## Development

Run all applications:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev:user
npm run dev:admin
npm run dev:backend
```

URLs:

- User: `http://localhost:5173`
- Admin: `http://localhost:5174`
- Backend health: `http://localhost:5000/api/health`

## Production builds

```bash
npm run build
```
