# Airgama · Cabina di Regia (mockup)

Prototipo cliccabile ad alta fedeltà di una **cabina di regia con AI agentica** per Airgama S.r.l. (Taviano, LE) — unifica e monitora i flussi aziendali (commerciale, magazzino, amministrazione) sopra i sistemi esistenti, instrada gli allarmi alla persona giusta con soluzioni già pronte e alimenta una BI che oggi non c'è.

> Mockup dimostrativo di vision/pitch. **Dati sintetici** ma verosimili. I pulsanti danno feedback simulato (toast), nessuna logica reale.

## Cosa contiene

Estetica "control-room" dark, palette derivata dal logo Airgama (navy + rosso + tricolore), numeri in monospace, logica a semaforo (verde/giallo/rosso). Sei tab navigabili con **drill-down a tutta pagina** e breadcrumb:

1. **Flusso Dati** — dashboard grafica iniziale: diagramma animato di come i dati si muovono dai sistemi (Gestionale · MES · App Picking · Contabilità) → strato AI/agenti → output (Cabina di Regia, BI, Riordini), con stato dei flussi, volumi e **punti di attenzione** cliccabili.
2. **Cabina di Regia** — i tre flussi (Commerciale · Magazzino · Amministrazione) con badge semaforico e un **Centro allarmi** categorizzato con ≥ 7 allarmi per categoria (Commerciale, Magazzino, Amministrazione, Produzione), instradati alla persona giusta. Il caso Edilsud (ordine € 18.500 oltre fido) si apre cliccando il suo allarme: l'agente legge la situazione, instrada e propone 3 mosse con impatto stimato.
3. **Analisi OLAP** — analyzer ad hoc stile Pentaho/Saiku: trascina (o tocca) dimensioni su Righe/Colonne, misure e filtri e la **tabella pivot (crosstab)** si costruisce al volo, con totali, grafici e commento dell'agente. Preset pronti.
4. **VoxBI** — BI conversazionale: scrivi una domanda in linguaggio naturale (es. «top 5 clienti per marginalità», «export vs budget», «andamento per mese») e l'agente costruisce in tempo reale narrazione, KPI e grafici coerenti con la richiesta.
5. **Insight strategici** — marginalità per famiglia/cliente, rotazione, andamento scaduto, Italia vs export, e l'"insight dell'agente" che fa emergere un pattern non ovvio.
6. **App Picking** (mobile) — lista di prelievo dell'operatore: scansione, spunta, avanzamento in tempo reale. Gestisce anche i **prelievi parziali per mancanza a magazzino**: i pezzi non disponibili diventano una segnalazione automatica con bozza di riordino. Genera il dato che oggi manca.

Drill-down disponibili su flussi, fonti, allarmi, KPI, famiglie di prodotto, clienti, articoli di picking e **singole righe ordine**.

## File

| File | Descrizione |
|------|-------------|
| [`index.html`](index.html) | **Versione offline self-contained** (~930 KB): font incorporati, zero dipendenze di rete. Si apre con doppio clic ovunque, anche senza internet. È anche la pagina pubblicata via GitHub Pages. |
| [`airgama-cabina-di-regia-light.html`](airgama-cabina-di-regia-light.html) | Versione leggera (~118 KB): carica i font da Google Fonts (richiede connessione al primo caricamento). |

## Come si apre

Apri `index.html` in un browser (doppio clic). Niente build, niente dipendenze.

---
Prototipo a scopo dimostrativo · dati sintetici.
