# Uzduotis AI Chat

Tikslas: tureti veikianti forumo frontend projekto dali root kataloge ir backend atskirame repo, kad abu veiktu development rezimu.

## Ka reikia padaryti

1. Sutvarkyti struktura:
- Visas Next.js kodas turi buti siame repo root kataloge (`hour-of-justice/`).
- Visas Node/Express kodas turi buti atskirame repo `../hour-of-justice-be/`.

2. Sutvarkyti paleidima:
- `hour-of-justice` (frontend): `npm install`, `npm run dev` (portas 3000)
- `hour-of-justice-be` (backend): `npm install`, `npm run dev` (portas 4000)

3. Sutvarkyti aplinkos kintamuosius:
- `hour-of-justice/.env.local`:
  - `NEXT_PUBLIC_API_URL=http://localhost:4000`
- `hour-of-justice-be/.env`:
  - `PORT=4000`
  - `MONGODB_URI=<mano_mongodb_uri>`
  - `JWT_SECRET=<mano_secret>`
  - `CLIENT_ORIGIN=http://localhost:3000`

4. Patikrinti API rysi:
- Frontend requestai turi eiti i `NEXT_PUBLIC_API_URL`.
- Backend CORS turi leisti `CLIENT_ORIGIN`.
- `GET /health` turi veikti.

5. Isvalyti nereikalingus failus root kataloge:
- `frontend/` katalogo neturi likti.
- Root'e turi buti Next.js runtime failai (`pages`, `public`, `styles`, `node_modules`, `.next`) nes frontend dabar veikia is root.

6. Atnaujinti dokumentacija (`README.md`):
- Projekto struktura
- Paleidimo instrukcijos frontend ir backend
- `.env` pavyzdziai

## Priemimo kriterijai

- Is `hour-of-justice` katalogo `npm run dev` sekmingai paleidzia UI ant `http://localhost:3000`.
- Is `hour-of-justice-be` katalogo `npm run dev` sekmingai paleidzia API ant `http://localhost:4000`.
- `http://localhost:4000/health` grazina `{ "ok": true }`.
- Frontend forume uzsikrauna klausimai is backend be CORS klaidu.

## Atsakymo formatas (AI)

Pateik:
1. Kokius failus ir katalogus pakeitei.
2. Kodel pakeitei.
3. Ka patikrinti rankiniu budu po pakeitimu.
