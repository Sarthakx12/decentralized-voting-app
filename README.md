# NexusVote DApp

NexusVote is a decentralized governance dApp that lets communities create proposals and cast verifiable on-chain votes.

It is designed to be:

- **Secure** – Votes are recorded on-chain and tamper‑resistant.
- **Transparent** – Anyone can verify results and voter participation.
- **User‑friendly** – Modern UI with wallet-based authentication.

---

## Features

- **Landing page** describing "The Future of Decentralized Governance".
- **Connect Wallet** CTA for onboarding users.
- **Highlights** of security, finality, and decentralization.
- Responsive layout styled with Tailwind CSS and shadcn‑ui components.

---

## Tech stack

- Vite (React + TypeScript)
- React 18
- TypeScript
- Tailwind CSS
- shadcn‑ui component library

---

## Getting started

Install dependencies and start the dev server:

```sh
npm install
npm run dev
```

By default the app runs on `http://localhost:5173` (or the port Vite chooses). In your case you may also be using a custom host/port such as `http://192.168.x.x:8080` via the Vite server configuration.

---

## Available scripts

All scripts are defined in `package.json`:

- `npm run dev` – Start the Vite development server.
- `npm run build` – Create an optimized production build.
- `npm run build:dev` – Development-mode build (useful for some deployments).
- `npm run preview` – Preview the production build locally.
- `npm run lint` – Run ESLint on the project.

---

## Project structure (high level)

- `index.html` – HTML entry point and metadata.
- `src/` – React application source code.
- `src/main.tsx` – React/Vite root entry.
- `src/components/` – UI components.
- `src/routes` or main page components – Landing / dApp views.
- `src/index.css` / `src/styles` – Global styles and Tailwind setup.
- `public/` – Static assets (favicons, OG images, etc.).

---

## Development notes

- Update OpenGraph / Twitter meta tags in `index.html` and assets in `public/` to match your branding.
- Configure wallet connection and blockchain network settings in the relevant React components/services.

Feel free to extend NexusVote with proposal creation flows, vote weighting, delegation, and analytics dashboards.
