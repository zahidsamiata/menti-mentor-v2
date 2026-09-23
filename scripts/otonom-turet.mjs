#!/usr/bin/env node
// Türetilmiş otonom dosyalarını üretir (belge-duzeni-rehberi § TÜRETİLMİŞ DOSYALAR).
//   docs/otonom/00-SIRADAKI.md  ← 00-KUYRUK.md baş kısmı + YALNIZ 🟢 BEKLIYOR satırları
//   docs/otonom/01-CEVAPSIZ.md  ← 01-KARARLAR.md'de CEVAP satırı BOŞ kartlar
// Neden üretim, bölme değil: kapı değişken bir özelliktir (🟡→🟢, 🔴→🟢). Kuyruğu kapıya göre
// dosyalara bölmek her kapı değişiminde satır taşımayı, dolayısıyla kayıp/çift kayıt riskini getirir.
// Kaynaklar tek doğrudur; bu iki dosya her tur sonunda baştan yazılır.
// Kullanım: node scripts/otonom-turet.mjs   (ya da: npm run otonom:turet)

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OTONOM = join(ROOT, 'docs', 'otonom');
const KUYRUK = join(OTONOM, '00-KUYRUK.md');
const KARARLAR = join(OTONOM, '01-KARARLAR.md');
const SIRADAKI = join(OTONOM, '00-SIRADAKI.md');
const CEVAPSIZ = join(OTONOM, '01-CEVAPSIZ.md');

const now = new Date();
const stamp = now.toISOString().slice(0, 16).replace('T', ' ') + ' UTC';

const banner = (source) => [
  `> ⚙️ **TÜRETİLMİŞ** — kaynak: \`docs/otonom/${source}\` · üretim: ${stamp} · üretici: \`scripts/otonom-turet.mjs\``,
  `> ⛔ **BURAYA ELLE YAZMA.** Kaynak olarak kullanma, atıf verme. Çelişki halinde **${source} KAZANIR.**`,
  `> Üretim tarihi 1 günden eskiyse bu dosyaya güvenme → kaynaktan hedefli oku (\`OTONOM-PROMPT.txt\` § 0.4).`,
  `> 🔥 SICAK — her otonom turda okunur. Hedefli okuma: OTONOM-PROMPT.txt · Okuma`,
];

// Markdown tablo satırını hücrelere ayırır. Ters tırnak içindeki ve `\|` ile kaçırılmış
// dikey çizgiler hücre sınırı sayılmaz (Not kolonlarında kod parçaları var).
function splitRow(line) {
  const cells = [];
  let cur = '';
  let inCode = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '\\' && line[i + 1] === '|') { cur += '\\|'; i++; continue; }
    if (ch === '`') inCode = !inCode;
    if (ch === '|' && !inCode) { cells.push(cur); cur = ''; continue; }
    cur += ch;
  }
  cells.push(cur);
  // Baştaki ve sondaki boş parçalar (satır "|" ile başlar/biter)
  return cells.slice(1, -1).map((c) => c.trim());
}

const stripStruck = (s) => s.replace(/~~[\s\S]*?~~/g, '');

// Etkin kapı: üstü çizili eski kapı atılır, kalan metindeki daire emojilerine bakılır.
function effectiveGate(cell) {
  const s = stripStruck(cell);
  const has = (e) => s.includes(e);
  const set = ['🟢', '🟡', '🔴'].filter(has);
  if (set.length === 1) return set[0];
  if (set.length === 0) return '?';
  return 'karma';
}

const effectiveStatus = (cell) => stripStruck(cell).replace(/[*_]/g, '').trim().split(/\s+/)[0] || '';

// ── 00-SIRADAKI ────────────────────────────────────────────────────────────
function buildSiradaki() {
  const lines = readFileSync(KUYRUK, 'utf8').split('\n');
  // Baş kısım: ilk iş bölümüne ("## ⛔⛔" ya da "## AŞAMA") kadar olan tanımlar
  const firstSection = lines.findIndex((l) => /^## (⛔⛔|AŞAMA )/.test(l));
  const head = lines.slice(0, firstSection);

  let section = '';
  const picked = []; // { section, line, id, blocker }
  const skipped = { karma: [], '?': [] };
  let totalRows = 0;
  let badRows = 0;

  for (let i = firstSection; i < lines.length; i++) {
    const l = lines[i];
    if (/^## /.test(l)) { section = l; continue; }
    if (/^\| #/.test(l)) continue;
    if (!/^\| [A-Z]/.test(l)) continue;
    const cells = splitRow(l);
    totalRows++;
    if (cells.length !== 7) { badRows++; continue; }
    const [id, , , kapi, , durum] = cells;
    if (effectiveStatus(durum) !== 'BEKLIYOR') continue;
    const gate = effectiveGate(kapi);
    if (gate === 'karma' || gate === '?') { skipped[gate].push(id); continue; }
    if (gate !== '🟢') continue;
    const [, serit, is, , bitti] = cells;
    // Not kolonu (kanıt zinciri) buraya ALINMAZ: dosya 🔥 SICAK tavanını (40.000) aşmasın.
    // İşe başlarken tam satır kaynaktan okunur (başlıktaki grep komutu).
    const line = `| ${id} | ${serit} | ${is} | 🟢 | ${bitti} |`;
    picked.push({ section, line, id, blocker: /ÇIKIŞ BLOKERİ/.test(l) });
  }

  const out = [];
  out.push('# 00-SIRADAKI — yalnız 🟢 BEKLIYOR işler');
  out.push('');
  out.push(...banner('00-KUYRUK.md'));
  out.push('');
  out.push(`**Sayım:** kuyrukta ${totalRows} iş satırı tarandı · **🟢 BEKLIYOR: ${picked.length}** · ` +
    `⛔ çıkış blokeri olan 🟢: ${picked.filter((p) => p.blocker).length}` +
    (badRows ? ` · ⚠️ ayrıştırılamayan satır: ${badRows} (kaynaktan bak)` : ''));
  if (skipped.karma.length || skipped['?'].length) {
    out.push(`**Kapısı belirsiz (buraya ALINMADI — kaynakta bak):** ` +
      [...skipped.karma, ...skipped['?']].join(' · '));
  }
  out.push('');
  out.push('---');
  out.push('');
  out.push('⚠️ **Not kolonu bu dosyada YOK** (kanıt zinciri uzun; 40.000 tavanı). Bir işe BAŞLARKEN tam satırı kaynaktan oku:');
  out.push("`grep -n '^| <iş-no> |' docs/otonom/00-KUYRUK.md`");
  out.push('');
  out.push('<!-- ↓ 00-KUYRUK.md baş kısmı (tanımlar), aynen -->');
  out.push(...head);
  out.push('<!-- ↑ baş kısım sonu -->');
  out.push('');

  const blockers = picked.filter((p) => p.blocker);
  if (blockers.length) {
    out.push('## ⛔ ÖNCE BUNLAR — 🟢 çıkış blokerleri');
    out.push('');
    out.push(blockers.map((b) => b.id).join(' · '));
    out.push('');
  }

  let lastSection = null;
  for (const p of picked) {
    if (p.section !== lastSection) {
      out.push('');
      out.push(p.section);
      out.push('');
      out.push('| # | Şerit | İş | Kapı | Bitti demek |');
      out.push('|---|---|---|---|---|');
      lastSection = p.section;
    }
    out.push(p.line);
  }
  out.push('');
  writeFileSync(SIRADAKI, out.join('\n'));
  return { rows: picked.length, blockers: blockers.length, total: totalRows, bad: badRows };
}

// ── 01-CEVAPSIZ ────────────────────────────────────────────────────────────
function buildCevapsiz() {
  const text = readFileSync(KARARLAR, 'utf8');
  const lines = text.split('\n');

  // İndeks tablolarındaki "kaç işi açar" hücresi (KARAR-N → hücre)
  const opens = new Map();
  for (const l of lines) {
    if (!/^\| \**KARAR-\d+/.test(l)) continue;
    const cells = splitRow(l);
    const m = cells[0].match(/KARAR-(\d+)/);
    if (m && cells.length >= 3 && !opens.has(m[1])) opens.set(m[1], cells[2]);
  }

  // Kart gövdeleri: "### KARAR-N · başlık" … "**CEVAP:**" satırı
  const cards = [];
  let cur = null;
  for (const l of lines) {
    const h = l.match(/^### KARAR-(\d+) · (.*)$/);
    if (h) { cur = { n: h[1], title: h[2].trim(), answered: null }; cards.push(cur); continue; }
    if (cur && /^\*\*CEVAP:\*\*/.test(l) && cur.answered === null) {
      cur.answered = l.replace(/^\*\*CEVAP:\*\*/, '').trim().length > 0;
    }
  }
  const open = cards.filter((c) => c.answered === false);
  const noLine = cards.filter((c) => c.answered === null);

  // Kilitli işler: kuyrukta kapısı 🔴 olup bu kartı anan BEKLIYOR satırlar
  const kLines = readFileSync(KUYRUK, 'utf8').split('\n').filter((l) => /^\| [A-Z]/.test(l) && !/^\| #/.test(l));
  const locked = new Map();
  for (const l of kLines) {
    const cells = splitRow(l);
    if (cells.length !== 7) continue;
    const [id, , , kapi, , durum] = cells;
    if (effectiveStatus(durum) !== 'BEKLIYOR' || effectiveGate(kapi) !== '🔴') continue;
    for (const m of stripStruck(kapi).matchAll(/KARAR-(\d+)/g)) {
      if (!locked.has(m[1])) locked.set(m[1], []);
      locked.get(m[1]).push(id);
    }
  }

  const clean = (s) => s.replace(/\|/g, '\\|');
  const out = [];
  out.push('# 01-CEVAPSIZ — CEVAP satırı boş kararlar');
  out.push('');
  out.push(...banner('01-KARARLAR.md'));
  out.push('');
  out.push(`**Sayım:** ${cards.length} kart gövdesi · **cevapsız: ${open.length}**` +
    (noLine.length ? ` · ⚠️ CEVAP satırı bulunamayan: ${noLine.map((c) => 'KARAR-' + c.n).join(', ')}` : ''));
  out.push('Kart gövdesini açmak için: `grep -n -A 25 \'^### KARAR-<n> \' docs/otonom/01-KARARLAR.md`');
  out.push('"Kilitli işler" = kuyrukta kapısı 🔴 olan, Kapı hücresinde bu kartı anan BEKLIYOR satırlar (otomatik sayım).');
  out.push('"Kaç işi açar" = 01-KARARLAR indeks tablosundaki beyan (elle yazılmış).');
  out.push('');
  out.push('| Kart | Başlık | Kaç işi açar (indeks) | Kilitli işler (kuyruk 🔴) |');
  out.push('|---|---|---|---|');
  for (const c of open) {
    const lk = locked.get(c.n) || [];
    out.push(`| KARAR-${c.n} | ${clean(c.title)} | ${clean(opens.get(c.n) || '—')} | ${lk.length ? lk.join(' · ') : '—'} |`);
  }
  out.push('');
  writeFileSync(CEVAPSIZ, out.join('\n'));
  return { cards: cards.length, open: open.length };
}

const s = buildSiradaki();
const c = buildCevapsiz();
console.log(`00-SIRADAKI: ${s.rows} 🟢 BEKLIYOR satır (${s.blockers} çıkış blokeri) / ${s.total} iş satırı taranmış` +
  (s.bad ? ` · ayrıştırılamayan ${s.bad}` : ''));
console.log(`01-CEVAPSIZ: ${c.open} cevapsız kart / ${c.cards} kart gövdesi`);
