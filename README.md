# Hour of Justice – Baigiamasis Projektas

Pilnas forumo projektas su:
- Frontend: Next.js (Pages Router, React)
- Backend: Node.js + Express
- Duomenų bazė: MongoDB (Mongoose)
- Autentifikacija: JWT

## Įgyvendintas funkcionalumas

- Registracija
- Prisijungimas
- Klausimų sąrašo peržiūra
- Klausimo sukūrimas (tik prisijungus)
- Klausimo trynimas (tik savo, prisijungus)
- Atsakymų peržiūra
- Atsakymo sukūrimas (tik prisijungus)
- Atsakymo trynimas (tik savo, prisijungus)
- Atsakymų like/dislike (tik prisijungus)
- Klausimų filtrai: visi / atsakyti / neatsakyti
- Responsive UI (desktop + mobile)

## Projekto struktūra

- `pages/` – frontend puslapiai
- `components/` – UI komponentai
- `lib/` – API klientas ir auth helperiai
- `types/` – TypeScript tipai
- `server/` – Express API ir MongoDB modeliai

## Paleidimas (development)

### 1) Frontend

Repo root kataloge:

```bash
npm install
copy .env.local.example .env.local
npm run dev
```

Frontend veiks: `http://localhost:3000`

### 2) Backend

Naujame terminale:

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

Backend veiks: `http://localhost:4000`

## Pagrindiniai backend endpointai

- `POST /register`
- `POST /login`
- `GET /questions`
- `POST /question`
- `DELETE /question/:id`
- `GET /question/:id/answers`
- `POST /question/:id/answers`
- `DELETE /answer/:id`
- `POST /answer/:id/reaction` (body: `{ "type": "like" | "dislike" }`)

## Pastabos

- Norint veikiančio projekto, turi veikti MongoDB serveris.
- Frontend naudoja `NEXT_PUBLIC_API_URL` (`.env.local`) prisijungimui prie backend.
