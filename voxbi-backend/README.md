# VoxBI backend (Claude)

Piccolo backend Node che traduce una domanda in linguaggio naturale in una **query OLAP** usando Claude (modello `claude-opus-4-8`, SDK ufficiale `@anthropic-ai/sdk`). Il frontend del mockup calcola poi il report in locale sul cubo sintetico: a Claude arriva **solo la domanda + lo schema dei campi**, mai i dati.

## ⚠️ Sicurezza chiave
- La chiave NON è inclusa qui. Crea `.env` da `.env.example` e incolla la tua.
- La chiave condivisa in chat va considerata **compromessa**: rigenerala su console.anthropic.com → API Keys.
- `.env` e `node_modules/` sono in `.gitignore`: non committarli mai.

## Avvio
```bash
cd voxbi-backend
cp .env.example .env        # poi incolla la tua chiave in .env
npm install
npm start                   # → http://localhost:8787
```

## Endpoint
- `GET /health` → `{ ok, model }`
- `POST /api/vox` body `{ "question": "i 3 clienti più redditizi in Italia" }`
  → `{ ok, params: { measure, dim, filters, limit }, model }`

## Come si collega al mockup
Il file `airgama-cabina-di-regia.html`, **se aperto in locale** (`localhost`/`127.0.0.1`), chiama automaticamente `http://localhost:8787/api/vox`. Se il backend non risponde (o se la pagina è su GitHub Pages), VoxBI ricade sul parser a regole offline — nessun errore, nessuna chiave necessaria.

Per cambiare modello (es. più economico): `VOX_MODEL=claude-haiku-4-5` in `.env`.
