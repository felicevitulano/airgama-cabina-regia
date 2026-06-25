// VoxBI backend — traduce una domanda in linguaggio naturale in una query OLAP
// usando Claude (SDK ufficiale @anthropic-ai/sdk). Nessun dato reale: il frontend
// calcola il report in locale sul cubo sintetico, qui facciamo solo NL -> query.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic(); // legge ANTHROPIC_API_KEY dall'ambiente (.env)
const MODEL = process.env.VOX_MODEL || 'claude-opus-4-8';
const PORT = process.env.PORT || 8787;

const FAMIGLIE = ['Valvole anti-riflusso', 'Griglie di aerazione', 'Raccordi PVC', 'Raccordi PP', 'Sifoni', 'Drenaggio suolo', 'Cassette WC'];
const CLIENTI = ['Idrotermica Salento', 'Edil Murge', 'Termoidraulica Jonica', 'Costruzioni Adriatica', 'Edilsud Costruzioni', 'Idraulica Pugliese', 'BTP Méditerranée', 'Hellas Hydro', 'Iberia Drenajes', 'Balkan Bau'];
const MEASURES = ['fatturato', 'margine', 'marginePct', 'scaduto', 'achiev', 'qta'];
const DIMS = ['cliente', 'famiglia', 'area', 'regione', 'mese', 'trimestre'];
const MESI = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'];

const SYSTEM = `Sei un traduttore di domande in italiano in una query OLAP sui dati di vendita di Airgama.
Rispondi SOLO con un oggetto JSON valido, senza testo introduttivo, senza markdown, senza commenti.

Schema della risposta:
{
  "measure": una di ${JSON.stringify(MEASURES)},
  "dim": una di ${JSON.stringify(DIMS)},
  "filters": { "area"?: "Italia"|"Export", "famiglia"?: <nome famiglia>, "cliente"?: <nome cliente>, "mese"?: "Gen".."Giu", "trimestre"?: "T1"|"T2" },
  "limit": intero 1-12 (default 8)
}

Significati delle misure: fatturato; margine = margine in euro; marginePct = marginalità in percentuale; scaduto = crediti scaduti; achiev = percentuale di raggiungimento del budget/target; qta = quantità/pezzi venduti.
Dimensioni = come raggruppare i dati. Filtri = restringere i dati.
Famiglie valide: ${JSON.stringify(FAMIGLIE)}.
Clienti validi (usa il nome esatto): ${JSON.stringify(CLIENTI)}.
Mesi: Gen, Feb, Mar, Apr, Mag, Giu. Trimestri: T1 (gen-mar), T2 (apr-giu).

Regole:
- Se la domanda confronta T1 e T2, o chiede "per trimestre", usa "dim":"trimestre" SENZA filtro trimestre.
- Se cita un solo trimestre, mettilo in filters.trimestre e scegli un'altra dimensione (di solito "famiglia").
- "top N", "i 5 ...", "i primi 3 ...": imposta "limit" a N.
- Includi in "filters" solo ciò che è esplicitamente richiesto; ometti le chiavi non usate.
- Se la dimensione non è chiara, usa "famiglia". Se la misura non è chiara, usa "fatturato".`;

const app = express();
app.use(cors());
app.use(express.json({ limit: '16kb' }));

function sanitize(p) {
  const out = { measure: 'fatturato', dim: 'famiglia', filters: {}, limit: 8 };
  if (p && typeof p === 'object') {
    if (MEASURES.includes(p.measure)) out.measure = p.measure;
    if (DIMS.includes(p.dim)) out.dim = p.dim;
    if (Number.isFinite(p.limit)) out.limit = Math.max(1, Math.min(12, Math.round(p.limit)));
    const f = p.filters || {};
    if (f.area === 'Italia' || f.area === 'Export') out.filters.area = f.area;
    if (typeof f.famiglia === 'string' && FAMIGLIE.includes(f.famiglia)) out.filters.famiglia = f.famiglia;
    if (typeof f.cliente === 'string' && CLIENTI.includes(f.cliente)) out.filters.cliente = f.cliente;
    if (typeof f.mese === 'string' && MESI.includes(f.mese)) out.filters.mese = f.mese;
    if (f.trimestre === 'T1' || f.trimestre === 'T2') out.filters.trimestre = f.trimestre;
  }
  return out;
}

app.get('/health', (_req, res) => res.json({ ok: true, model: MODEL }));

app.post('/api/vox', async (req, res) => {
  const q = ((req.body && req.body.question) || '').toString().trim().slice(0, 500);
  if (!q) return res.status(400).json({ error: 'Domanda mancante' });
  try {
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 400,
      system: SYSTEM,
      messages: [{ role: 'user', content: q }],
    });
    const raw = (msg.content.find((b) => b.type === 'text') || {}).text || '{}';
    const jsonText = raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1);
    let parsed;
    try { parsed = JSON.parse(jsonText); } catch (_) { parsed = {}; }
    res.json({ ok: true, params: sanitize(parsed), model: msg.model });
  } catch (e) {
    console.error('vox error:', e && e.message);
    res.status(500).json({ error: String((e && e.message) || e) });
  }
});

app.listen(PORT, () => console.log(`VoxBI backend in ascolto su http://localhost:${PORT} (modello ${MODEL})`));
