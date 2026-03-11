# Uzduotis AI Chat

Tikslas: pilnai atskirti projekta i du katalogus `frontend/` ir `backend/`, kad abu veiktu atskirai development rezimu.

## Ka reikia padaryti

1. Sutvarkyti struktura:
- Visas Next.js kodas turi buti `frontend/` kataloge.
- Visas Node/Express kodas turi buti `backend/` kataloge.

2. Sutvarkyti paleidima:
- `frontend`: `npm install`, `npm run dev` (portas 3000)
- `backend`: `npm install`, `npm run dev` (portas 4000)

3. Sutvarkyti aplinkos kintamuosius:
- `frontend/.env.local`:
  - `NEXT_PUBLIC_API_URL=http://localhost:4000`
- `backend/.env`:
  - `PORT=4000`
  - `MONGODB_URI=<mano_mongodb_uri>`
  - `JWT_SECRET=<mano_secret>`
  - `CLIENT_ORIGIN=http://localhost:3000`

4. Patikrinti API rysi:
- Frontend requestai turi eiti i `NEXT_PUBLIC_API_URL`.
- Backend CORS turi leisti `CLIENT_ORIGIN`.
- `GET /health` turi veikti.

5. Isvalyti nereikalingus failus root kataloge:
- Root'e neturi likti frontend/backend runtime failu (`node_modules`, `.next`, `pages`, `server` ir pan.).
- Root'e gali likti tik bendri failai (pvz. `.git`, `.gitignore`, `README.md`) ir katalogai `frontend/`, `backend/`.

6. Atnaujinti dokumentacija (`README.md`):
- Projekto struktura
- Paleidimo instrukcijos frontend ir backend
- `.env` pavyzdziai

## Priemimo kriterijai

- `cd frontend && npm run dev` sekmingai paleidzia UI ant `http://localhost:3000`.
- `cd backend && npm run dev` sekmingai paleidzia API ant `http://localhost:4000`.
- `http://localhost:4000/health` grazina `{ "ok": true }`.
- Frontend forume uzsikrauna klausimai is backend be CORS klaidu.

## Atsakymo formatas (AI)

Pateik:
1. Kokius failus ir katalogus pakeitei.
2. Kodel pakeitei.
3. Ka patikrinti rankiniu budu po pakeitimu.
