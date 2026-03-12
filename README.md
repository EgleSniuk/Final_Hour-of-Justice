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

## Projekto struktura

- `./` - Next.js frontend projektas (šiame repo root kataloge)
- `../hour-of-justice-be/` - atskiras backend repo (`Final_Hour-of-Justice_be`)

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
cd ..\hour-of-justice-be
npm install
copy .env.example .env
npm run dev
```

Backend veiks: `http://localhost:4000`

Backend `.env` pavyzdys:

```bash
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/hour_of_justice?retryWrites=true&w=majority
JWT_SECRET=your_strong_secret
CLIENT_ORIGIN=http://localhost:3000
```

Frontend `.env.local` pavyzdys:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Patogus paleidimas is root

Repo root kataloge galite naudoti:

```bash
npm run dev
npm run dev:backend
```

`npm run dev:backend` paleidzia backend is `../hour-of-justice-be` katalogo.

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

- Galite naudoti tiek lokalų MongoDB (`mongodb://127.0.0.1:27017/...`), tiek MongoDB Atlas (`mongodb+srv://...`).
- Frontend naudoja `NEXT_PUBLIC_API_URL` (`.env.local`) prisijungimui prie backend.
