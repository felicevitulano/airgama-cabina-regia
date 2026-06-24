# Airgama · Cabina di Regia (mockup)

Prototipo cliccabile ad alta fedeltà di una **cabina di regia con AI agentica** per Airgama S.r.l. (Taviano, LE) — unifica e monitora i flussi aziendali (commerciale, magazzino, amministrazione) sopra i sistemi esistenti, instrada gli allarmi alla persona giusta con soluzioni già pronte e alimenta una BI che oggi non c'è.

> Mockup dimostrativo di vision/pitch. **Dati sintetici** ma verosimili. I pulsanti danno feedback simulato (toast), nessuna logica reale.

## Cosa contiene

Estetica "control-room" dark, palette derivata dal logo Airgama (navy + rosso + tricolore), numeri in monospace, logica a semaforo (verde/giallo/rosso). Sei schermate navigabili con **drill-down a tutta pagina** e breadcrumb:

1. **Cabina di Regia** — i tre flussi con badge semaforico, fonti connesse (Gestionale · MES · App Picking · Contabilità) e allarmi attivi con le agent card che "parlano" come un collega.
2. **Momento Agentico** — il caso Edilsud (ordine € 18.500, scaduto € 12.300, sforamento fido): l'agente legge la situazione, instrada alle persone giuste e propone 3 mosse con impatto stimato.
3. **App Picking** (mobile) — lista di prelievo dell'operatore: scansione, spunta, avanzamento in tempo reale. Gestisce anche i **prelievi parziali per mancanza a magazzino**: i pezzi non disponibili diventano una segnalazione automatica con bozza di riordino. Genera il dato che oggi manca.
4. **BI & Insight** — marginalità per famiglia/cliente, rotazione, andamento scaduto, Italia vs export, e l'"insight dell'agente" che fa emergere un pattern non ovvio.
5. **VoxBI** — BI conversazionale: scrivi una domanda in linguaggio naturale (es. «top 5 clienti per marginalità», «export vs budget», «andamento per mese») e l'agente costruisce in tempo reale narrazione, KPI e grafici coerenti con la richiesta.
6. **Analisi OLAP** — analyzer ad hoc stile Pentaho/Saiku: trascina (o tocca) dimensioni su Righe/Colonne, misure e filtri e la **tabella pivot (crosstab)** si costruisce al volo, con totali, grafici e commento dell'agente. Preset pronti per le analisi più comuni.

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
