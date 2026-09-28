#!/usr/bin/env bash
# Belge bekçisi — aktif/arşiv ayrımı (PO kararı K-A, 2026-09-26; OTONOM-PROMPT.txt Bölüm 5c).
# Sık okunan belgelerde bitmiş/eski metnin aktif dosyada birikmesini (şişmeyi) otomatik yakalar.
#
# HATA (çıkış 1 — CI kırmızı):
#   · docs/otonom/00-KUYRUK.md'de Durum=BITTI satırı (kural a) ya da "→" katlanmış satır (kural b)
#     (istisna: Durum'u "kısmen" / "bekliyor" içeren belirsiz satırlar — taşınmaz, UYARI olarak listelenir)
#   · docs/otonom/01-KARARLAR.md'de ya da docs/otonom/kararlar/KARAR-*.md kart dosyasında "İŞLENDİ" notlu karar kartı (kural c)
#   · CLAUDE.md / docs/otonom/OTONOM-PROMPT.txt'te kod (`...`) dışında "~~[ESKİ" katmanı (kural e)
#   · kural (t) TEK KAYNAK (PO 2026-09-28, İŞ 2): bitti arşivindeki iş aktif belgede BEKLIYOR / ⬜ / açık
#     durumla anılıyor (t1) · bir işin değişken kuyruk durumu başka belgeye parantezle kopyalanmış (t2)
# UYARI (çıkış kodunu değiştirmez): boyut eşikleri (Bölüm 5c; GÖREV 2.5: 00-KUYRUK 90 · 01-KARARLAR 40 · 02-ILERLEME 80 KB) · kural (h): arşivdeki BITTI satırı "madde N"
#   atfı taşıyor ve docs/kararlar/00-KARAR-TAKIP.md'de madde N satırında ✅ / 🟨 yok → "BITTI işin kaynağı açık"
#   (gerekçeli istisna: docs/raporlar/kod-denetimi/bekci-istisna.txt — satır biçimi "<iş> madde <N> # <gerekçe>").
#   · KR-22 (eski etiket (i)): CI job'u scripts/verify.sh başlığında anılmıyor (KR-22)
#   · YN-11 (eski etiket (j)): docs/raporlar/ altında ilk 5 satırında TÜR etiketi olmayan rapor (YN-11)
#   · YN-12 (eski etiket (k)): docs/ altında indekssiz (giriş noktası olmayan) klasör (YN-12)
#   · YN-10 (eski etiket (l)): CLAUDE.md'nin kendi içine satır numarasıyla atfı (YN-10)
#   · YN-09 (eski etiket (m)): 00-KUYRUK / 00-KARAR-TAKIP'te 1.000 karakteri aşan satır sayısı (YN-09)
#   · kural (n): 00-KUYRUK'ta kapısı 🔴 ya da Durumu ATLANDI(karar) olan satır → 00-KUYRUK-KARAR-BEKLEYEN.md'ye (GÖREV 2.4, 5c-n)
#   · kural (i) BAĞLAM SÖZLEŞMESİ (GÖREV 2.5, 5c-i): (i1) BITTI doğrulamasında ❌/⚠️/🔁 olan iş bitti arşivinde
#     ön eksiz (🟨 KISMEN / ❌ TUTMUYOR / 🔁 SONRADAN DEĞİŞTİ / ✅ TAMAMLANDI) · (i2) kırık bağlam işaretçisi
#     (KİLİT HARİTASI ↔ KARAR-BEKLEYEN §, iki yön) · (i3) kaynak izi olmayan aktif / karar bekleyen satır ·
#     (i4) 01-KARARLAR indeksi ↔ kart CEVAP çelişkisi · (i5) ✍️/✅ kararın işi hâlâ KARAR-BEKLEYEN'de
#   · kural (t3) TEK KAYNAK: "⬜ → X" ama X kuyrukta "BITTI (kısmen …)" (İŞ 2, 2026-09-28)
#   Harf notu: (i)-(m) eskiden AJ-46 uyarılarının etiketiydi; 5c kurallarıyla karışmasın diye o uyarılar
#   2026-09-28'den beri iş kimliğiyle (KR-22 · YN-11 · YN-12 · YN-10 · YN-09) anılır, (i) kural harfi oldu.
#
# Kullanım: bash scripts/belge-bekci.sh [kök-dizin]   (varsayılan: reponun kökü; testler geçici kök verir)
set -euo pipefail
ROOT="${1:-$(cd "$(dirname "$0")/.." && pwd)}"

python3 - "$ROOT" <<'PY'
import os, re, sys

root = sys.argv[1]
errors, warnings = [], []

def read(rel):
    p = os.path.join(root, rel)
    return open(p, encoding='utf-8').read() if os.path.exists(p) else None

import glob
STATUS = re.compile(r'^(✅ )?(BITTI|BEKLIYOR|CALISILIYOR|PR-ACIK|BASARISIZ|ATLANDI|IPTAL|→)')

kuyruk = read('docs/otonom/00-KUYRUK.md')
if kuyruk is not None:
    for no, line in enumerate(kuyruk.split('\n'), 1):
        cells = line.split('|')
        if not line.startswith('| ') or len(cells) < 9:
            continue
        durum = cells[6].strip()
        if not STATUS.match(durum):
            continue
        kimlik = cells[1].strip()
        if durum.startswith('→'):
            errors.append(f'00-KUYRUK.md:{no} {kimlik} katlanmış ("{durum[:30]}") → arsiv/00-KUYRUK-katlanmis.md (5c-b)')
        elif re.match(r'^(✅ )?BITTI', durum):
            if 'kısmen' in durum or 'bekliyor' in durum:
                warnings.append(f'00-KUYRUK.md:{no} {kimlik} belirsiz BITTI ("{durum[:40]}") — kalan kısım bitince arşive')
            else:
                errors.append(f'00-KUYRUK.md:{no} {kimlik} Durum=BITTI kuyrukta kalmış → arsiv/00-KUYRUK-bitti-*.md (5c-a)')

kararlar = read('docs/otonom/01-KARARLAR.md')
if kararlar is not None:
    for card in re.split(r'(?m)^(?=### KARAR-)', kararlar)[1:]:
        if re.search(r'İŞLENDİ|\bISLENDI\b', card):
            errors.append(f'01-KARARLAR.md {card.split(chr(10), 1)[0][:60]} "İŞLENDİ" notlu kart aktif dosyada → arsiv/kararlar/ (5c-c)')
# GÖREV 2.4 (2026-09-28): kart gövdeleri kart başına dosyada — aktif klasörde İŞLENDİ notlu kart kalmasın.
for kpath in sorted(glob.glob(os.path.join(root, 'docs/otonom/kararlar/KARAR-*.md'))):
    card = open(kpath, encoding='utf-8').read()
    if re.search(r'İŞLENDİ|\bISLENDI\b', card):
        errors.append(f'{os.path.relpath(kpath, root)} "İŞLENDİ" notlu kart aktif klasörde → docs/otonom/arsiv/kararlar/ (5c-c)')

for rel in ('CLAUDE.md', 'docs/otonom/OTONOM-PROMPT.txt'):
    text = read(rel)
    if text is None:
        continue
    for no, line in enumerate(text.split('\n'), 1):
        outside_code = re.sub(r'`[^`]*`', '', line)
        if re.search(r'~~\[ESK[İI]', outside_code):
            errors.append(f'{rel}:{no} "~~[ESKİ" katmanı aktif kural dosyasında → arsiv/kural-gecmisi-*.md (5c-e)')

# Kural (n) GÖREV 2.4: kapısı 🔴 olan satır 00-KUYRUK-KARAR-BEKLEYEN.md'de durur — yalnız UYARI.
if kuyruk is not None:
    for no, line in enumerate(kuyruk.split('\n'), 1):
        cells = line.split('|')
        if not line.startswith('| ') or len(cells) < 9 or not STATUS.match(cells[6].strip()):
            continue
        if re.sub(r'~~.*?~~', '', cells[4]).strip().startswith('🔴'):
            warnings.append(f'00-KUYRUK.md:{no} {cells[1].strip()} kapısı 🔴 → docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md + § 🔴 KİLİT HARİTASI işaretçisi (5c-n)')
        elif cells[6].strip().startswith('ATLANDI'):
            warnings.append(f'00-KUYRUK.md:{no} {cells[1].strip()} Durum ATLANDI(karar) → docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md + § 🔴 KİLİT HARİTASI işaretçisi (5c-n)')

# Kural (h): BITTI işin kaynağı (00-KARAR-TAKIP maddesi) açık kalmasın — yalnız UYARI.
takip = read('docs/kararlar/00-KARAR-TAKIP.md')
if takip is not None:
    madde_rows = {}
    for tline in takip.split('\n'):
        mm = re.match(r'^\|\s*(\d+)\s*\|', tline)
        if mm:
            madde_rows.setdefault(int(mm.group(1)), []).append(tline)
    istisna = set()
    ist = read('docs/raporlar/kod-denetimi/bekci-istisna.txt')
    for ino, iline in enumerate((ist or '').split('\n'), 1):
        body = iline.strip()
        if not body or body.startswith('#'):
            continue
        im = re.match(r'^(\S+)\s+madde\s+(\d+)\s*#\s*(\S.*)$', body)
        if not im:
            warnings.append(f'bekci-istisna.txt:{ino} biçim/gerekçe eksik ("<iş> madde <N> # <gerekçe>") — satır yok sayıldı')
            continue
        istisna.add((im.group(1), int(im.group(2))))
    for arch in sorted(glob.glob(os.path.join(root, 'docs/otonom/arsiv/00-KUYRUK-bitti-*.md'))):
        aname = os.path.relpath(arch, root)
        for no, line in enumerate(open(arch, encoding='utf-8').read().split('\n'), 1):
            cells = line.split('|')
            if not line.startswith('| ') or len(cells) < 9:
                continue
            durum = re.sub(r'~~.*?~~', '', cells[6]).strip()
            if 'BITTI' not in durum or durum.startswith('→'):
                continue
            kimlik = cells[1].strip()
            maddeler = set()
            for mm in re.finditer(r'madde\s+(\d+(?:\s*[+,/]\s*\d+)*)', cells[3]):
                maddeler.update(int(x) for x in re.findall(r'\d+', mm.group(1)))
            for madde in sorted(maddeler):
                satirlar = madde_rows.get(madde)
                if not satirlar or (kimlik, madde) in istisna:
                    continue
                if not any('✅' in t or '🟨' in t for t in satirlar):
                    warnings.append(f'BITTI işin kaynağı açık: {kimlik} → madde {madde} (00-KARAR-TAKIP; {aname}:{no}) — kural (h): "✅ yapıldı — {kimlik} · PR #" ya da istisna')

# KR-22 (eski etiket (i)): CI job'ları scripts/verify.sh başlık yorumunda anılıyor mu — yalnız UYARI.
# Yerelde koşulmayan job da "bilinçli fark" olarak başlıkta yazılı olmalı. backend/ CI dosyası yalnız
# submodule çekiliyse okunur (çatı docs-guard job'u submodule çekmez → orada atlanır).
vsh = read('scripts/verify.sh')
if vsh is not None:
    header = []
    for vline in vsh.split('\n'):
        if not vline.startswith('#'):
            break
        header.append(vline)
    header = '\n'.join(header)
    for ci_rel in ('.github/workflows/ci.yml', 'backend/.github/workflows/ci.yml'):
        ci_text = read(ci_rel)
        if ci_text is None:
            continue
        in_jobs = False
        for cline in ci_text.split('\n'):
            if re.match(r'^jobs:\s*$', cline):
                in_jobs = True
                continue
            if in_jobs and re.match(r'^\S', cline):
                in_jobs = False
            jm = re.match(r'^  ([A-Za-z0-9_-]+):\s*(#.*)?$', cline) if in_jobs else None
            if jm and not re.search(r'(?<![\w-])' + re.escape(jm.group(1)) + r'(?![\w-])', header):
                warnings.append(f'{ci_rel} job "{jm.group(1)}" scripts/verify.sh başlığında anılmıyor — adım eşlemesine ya da "bilinçli farklar"a yaz (KR-22)')

# YN-11 (eski etiket (j)): docs/raporlar/ altındaki her rapor ilk 5 satırında TÜR etiketi taşır — yalnız UYARI.
# (belge-duzeni-rehberi KURAL 3: 🔄 yaşayan · 📸 dondurulmuş; ısı katmanı 🔥/🌡️/🧊 da etiket sayılır.)
TUR_ETIKETI = ('📸', '🔄', '🔥', '🧊', '🌡️', '🌡')
for dirpath, _dirs, files in os.walk(os.path.join(root, 'docs/raporlar')):
    for fname in sorted(files):
        if not fname.endswith('.md'):
            continue
        rpath = os.path.join(dirpath, fname)
        with open(rpath, encoding='utf-8') as fh:
            head = ''.join(fh.readline() for _ in range(5))
        if not any(t in head for t in TUR_ETIKETI):
            warnings.append(f'{os.path.relpath(rpath, root)} ilk 5 satırda TÜR etiketi (📸/🔄/🔥/🌡️/🧊) yok — başa etiket yaz (YN-11, rehber KURAL 3)')

# YN-12 (eski etiket (k)): docs/ altındaki her klasörün giriş noktası (indeks) var — yalnız UYARI.
# İndeks deseni rehber KURAL 2-B ile aynı: ^00-.*ind(ex|eks) (dört kalıbı da yakalar). docs/ kökünün girişi 00-BELGE-HARITASI.md.
INDEKS = re.compile(r'^00-.*ind(ex|eks)', re.I)
docs_root = os.path.join(root, 'docs')
for dirpath, _dirs, files in os.walk(docs_root):
    if dirpath == docs_root:
        continue
    if not any(f.endswith(('.md', '.txt')) for f in files):
        continue
    if not any(INDEKS.match(f) for f in files):
        warnings.append(f'{os.path.relpath(dirpath, root)}/ giriş noktası (00-INDEX.md) yok — kısa indeks aç (YN-12, rehber KURAL 2-B)')

# YN-10 (eski etiket (l)): CLAUDE.md kendi içine satır numarasıyla atıf yapmaz (her düzenlemede kayar) — yalnız UYARI.
# Atıf bölüm adıyla yazılır: "§ Çalışma Sözleşmesi". Başka dosyaya satır atfı (ör. `00-KUYRUK.md:12`) bu kuralın dışında.
claude_md = read('CLAUDE.md')
if claude_md is not None:
    for no, line in enumerate(claude_md.split('\n'), 1):
        for sm in re.finditer(r'(?<![\w/.-])CLAUDE\.md:\d+(?:-\d+)?', line):
            warnings.append(f'CLAUDE.md:{no} kendi içine satır atfı "{sm.group(0)}" — bölüm adına çevir ("§ <başlık>") (YN-10)')

# YN-09 (eski etiket (m)): kuyruk ve karar-takip satırları 1.000 karakter tavanını aşmasın — yalnız UYARI (dosya başına tek satır).
# Tavan: CLAUDE.md § "tarihsel iz satırın İÇİNDE tutulmaz" madde 1. Karar-takip'te ## GEÇMİŞ bölümü sayılmaz.
SATIR_TAVANI = 1000
for rel in ('docs/otonom/00-KUYRUK.md', 'docs/kararlar/00-KARAR-TAKIP.md'):
    text = read(rel)
    if text is None:
        continue
    uzun = []
    for no, line in enumerate(text.split('\n'), 1):
        if line.startswith('## GEÇMİŞ'):
            break
        if len(line) > SATIR_TAVANI:
            uzun.append((len(line), no))
    if uzun:
        en_uzun = max(uzun)
        warnings.append(f'{rel} {len(uzun)} satır > {SATIR_TAVANI} karakter (en uzun :{en_uzun[1]} = {en_uzun[0]}) — eski katmanı GEÇMİŞ/arşive taşı (YN-09)')

# ── Kural (i) GÖREV 2.5 (2026-09-28): BAĞLAM SÖZLEŞMESİ VE DURUMA GÖRE AYIRMA — (i1)-(i5) yalnız UYARI ──
# Kuyruk satırı: ilk hücresi iş kimliği (X-01, AJ-10, PS-A2…) olan, en az 8 sütunlu tablo satırı.
IS_KIMLIGI = re.compile(r'^[A-Z][A-Z0-9]*-[A-Za-z0-9-]+$')
def kuyruk_satirlari(text):
    for no, line in enumerate(text.split('\n'), 1):
        cells = line.split('|')
        if line.startswith('| ') and len(cells) >= 9 and IS_KIMLIGI.match(cells[1].strip()):
            yield no, cells

def kimlik_geciyor(kimlik, text):
    return re.search(r'(?<![\w-])' + re.escape(kimlik) + r'(?![\w-])', text) is not None

bekleyen = read('docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md')
# KARAR-BEKLEYEN bölümleri: "## <başlık>" → (satır kimlikleri, bölüm metni)
bolumler = {}
if bekleyen is not None:
    for blok in re.split(r'(?m)^(?=## )', bekleyen):
        if not blok.startswith('## '):
            continue
        baslik = blok.split('\n', 1)[0][3:].strip()
        bolumler[baslik] = ([c[1].strip() for _n, c in kuyruk_satirlari(blok)], blok)
bekleyen_kimlikler = {k for ids, _b in bolumler.values() for k in ids}

# (i1) Doğrulanmamış BITTI arşivde işaretsiz: BITTI doğrulama raporunda ❌/⚠️/🔁 bölümündeki iş, bitti
# arşivinde Durum'u dört ön ekten biriyle başlamıyorsa (okuyan onu hâlâ "tam bitti" sanır).
ON_EKLER = ('🟨 KISMEN', '❌ TUTMUYOR', '🔁 SONRADAN DEĞİŞTİ', '✅ TAMAMLANDI')
supheli = {}
for rpath in sorted(glob.glob(os.path.join(root, 'docs/raporlar/kod-denetimi/bitti-dogrulama-*.md'))):
    bolum = None
    for dline in open(rpath, encoding='utf-8').read().split('\n'):
        if dline.startswith('## '):
            bolum = next((e for e in ('❌', '⚠️', '🔁') if dline[3:].startswith(e)), None)
            continue
        cells = dline.split('|')
        if bolum and dline.startswith('| ') and len(cells) > 3 and IS_KIMLIGI.match(cells[1].strip()):
            supheli.setdefault(cells[1].strip(), (bolum, os.path.basename(rpath)))
if supheli:
    for arch in sorted(glob.glob(os.path.join(root, 'docs/otonom/arsiv/00-KUYRUK-bitti-*.md'))):
        aname = os.path.relpath(arch, root)
        for no, cells in kuyruk_satirlari(open(arch, encoding='utf-8').read()):
            kimlik = cells[1].strip()
            durum = re.sub(r'~~.*?~~', '', cells[6]).strip().replace('**', '')
            if kimlik in supheli and not durum.startswith(ON_EKLER):
                bolum, rapor = supheli[kimlik]
                warnings.append(f'{aname}:{no} {kimlik} doğrulamada {bolum} ({rapor}) ama Durum ön eksiz — 🟨 KISMEN / ❌ TUTMUYOR / 🔁 SONRADAN DEĞİŞTİ / ✅ TAMAMLANDI yaz (5c-i1)')

# (i2) Kırık bağlam işaretçisi: 00-KUYRUK § 🔴 KİLİT HARİTASI ↔ KARAR-BEKLEYEN bölümleri iki yönde tutmalı.
if kuyruk is not None and bekleyen is not None:
    harita = re.search(r'(?ms)^## 🔴 KİLİT HARİTASI.*?(?=^## |\Z)', kuyruk)
    isaretci = {}  # bölüm → işaretçide sayılan işler
    for hline in (harita.group(0) if harita else '').split('\n'):
        hm = re.search(r' → (\d+) iş (?:bekliyor: ([^·]*)|KARAR-BEKLEYEN)', hline)
        if not hline.startswith('- ') or not hm:
            continue
        etiket = hline[2:hline.index(' → ')][:40]
        sayilan = [x.strip() for x in (hm.group(2) or '').split(',') if x.strip()]
        if int(hm.group(1)) != len(sayilan):
            warnings.append(f'00-KUYRUK § KİLİT HARİTASI "{etiket}" {hm.group(1)} iş diyor, {len(sayilan)} iş sayıyor (5c-i2)')
        am = re.search(r'ayrıntı: 00-KUYRUK-KARAR-BEKLEYEN\.md § (.+?)\s*$', hline)
        if not am:
            if sayilan:
                warnings.append(f'00-KUYRUK § KİLİT HARİTASI "{etiket}" iş sayıyor ama KARAR-BEKLEYEN § göstermiyor (5c-i2)')
            continue
        hedef = am.group(1)
        isaretci.setdefault(hedef, set()).update(sayilan)
        if hedef not in bolumler:
            warnings.append(f'00-KUYRUK § KİLİT HARİTASI "{etiket}" → KARAR-BEKLEYEN § {hedef} yok (5c-i2)')
            continue
        ids, metin = bolumler[hedef]
        for kimlik in sayilan:
            if kimlik not in ids and not (kimlik in bekleyen_kimlikler and kimlik_geciyor(kimlik, metin)):
                warnings.append(f'00-KUYRUK § KİLİT HARİTASI "{etiket}" {kimlik} sayıyor ama KARAR-BEKLEYEN § {hedef}\'de yok (5c-i2)')
    for baslik, (ids, _metin) in bolumler.items():
        if baslik not in isaretci:
            warnings.append(f'00-KUYRUK-KARAR-BEKLEYEN.md § {baslik} için 00-KUYRUK § KİLİT HARİTASI\'nda işaretçi yok (5c-i2)')
            continue
        for kimlik in ids:
            if kimlik not in isaretci[baslik]:
                warnings.append(f'00-KUYRUK-KARAR-BEKLEYEN.md § {baslik} {kimlik} işaretçide sayılmıyor (5c-i2)')

# (i3) Kaynaksız aktif iş: bağlam sözleşmesinin KAYNAK ayağı — kaynak izi = "kaynak" · "ajan-ekledi" ·
# KARAR-N · madde N / md.N · G-kart (G1-23) · belge yolu (docs/… ya da *.md).
KAYNAK_IZI = re.compile(r'kaynak(?!s[ıi]z)|ajan-ekledi|KARAR-\d|\bmadde\s+\d|\bmd\.\s*\d|\bG\d+-\d+|docs/|[\w-]\.md\b', re.I)
for rel, text in (('00-KUYRUK.md', kuyruk), ('00-KUYRUK-KARAR-BEKLEYEN.md', bekleyen)):
    for no, cells in kuyruk_satirlari(text or ''):
        if not KAYNAK_IZI.search('|'.join(cells)):
            warnings.append(f'{rel}:{no} {cells[1].strip()} kaynak izi yok (kaynak: · ajan-ekledi · KARAR-N · madde N · G-kart · belge yolu) — bağlam sözleşmesi (5c-i3)')

# (i4) İndeks ↔ kart CEVAP çelişkisi · (i5) ✍️/✅ kararın işi hâlâ KARAR-BEKLEYEN'de.
cevapli = set()
if kararlar is not None:
    for kline in kararlar.split('\n'):
        km = re.match(r'^\| KARAR-(\d+) \|', kline)
        cells = kline.split('|')
        if not km or len(cells) < 6:
            continue
        no = int(km.group(1))
        durum = re.sub(r'~~.*?~~', '', cells[4]).replace('**', '').strip()
        if durum.startswith(('✍️', '✍', '✅')):
            cevapli.add(no)
        elif not durum.startswith('⬜'):
            continue
        kart = next((p for p in (os.path.join(root, f'docs/otonom/{d}/KARAR-{no:03d}.md') for d in ('kararlar', 'arsiv/kararlar')) if os.path.exists(p)), None)
        if kart is None:
            continue
        cevap_satirlari = re.findall(r'(?m)^\*\*CEVAP[^*\n]*:\*\*(.*)$', open(kart, encoding='utf-8').read())
        dolu = bool(cevap_satirlari) and cevap_satirlari[-1].strip() != ''
        kname = os.path.relpath(kart, root)
        if dolu and durum.startswith('⬜'):
            warnings.append(f'01-KARARLAR indeksi KARAR-{no} ⬜ ama {kname} CEVAP dolu → indekste ✍️ (5c-i4)')
        elif not dolu and no in cevapli:
            warnings.append(f'01-KARARLAR indeksi KARAR-{no} {durum[:2].strip()} ama {kname} CEVAP boş (5c-i4)')
for baslik, (_ids, metin) in bolumler.items():
    bm = re.match(r'^KARAR-(\d+)$', baslik)
    for _n, cells in kuyruk_satirlari(metin):
        bagli = [int(x) for x in re.findall(r'KARAR-(\d+)', cells[4])] or ([int(bm.group(1))] if bm else [])
        if bagli and all(k in cevapli for k in bagli):
            warnings.append(f'00-KUYRUK-KARAR-BEKLEYEN.md § {baslik} {cells[1].strip()} bağlı KARAR ({", ".join(f"KARAR-{k}" for k in bagli)}) ✍️/✅ ama iş hâlâ KARAR-BEKLEYEN\'de → 00-KUYRUK "Geri dönüş yeri"ne (5c-i5)')

# ── kural (t) TEK KAYNAK (PO 2026-09-28, İŞ 2): bir işin durumu YALNIZ kuyrukta yaşar ──────────────
# Kuyruk = 00-KUYRUK + 00-KUYRUK-KARAR-BEKLEYEN + arsiv/00-KUYRUK-bitti-*. Diğer aktif belgeler başka bir
# işin durumunu KOPYALAMAZ, yalnız işaretçi yazar ("→ AJ-75"). Kopya zamanla bayatlar: 2026-09-28 tur sonu
# denetiminde 00-KART-INDEKSI G1-20 / G7-10 / G7-11 / G7-13 / G7-14 bitmiş işi "BEKLIYOR" gösteriyordu.
#   (t1) HATA  bitti arşivindeki (tam BITTI/✅, aktif kuyrukta yeniden açılmamış) iş aktif belgede açık durumla
#              anılıyor: "X (BEKLIYOR|⬜|açık|CALISILIYOR|PR-ACIK)" · "⬜/BEKLIYOR/AÇIK → X" · "X: BEKLIYOR"
#   (t2) HATA  herhangi bir iş kimliğinin değişken kuyruk durumu parantezle kopyalanmış: "X (BEKLIYOR|
#              CALISILIYOR|PR-ACIK|BASARISIZ|ATLANDI…)" → işaretçi yaz ("→ X"). BITTI kopyası serbest (değişmez olgu).
#   (t3) UYARI "⬜ → X" ama X kuyrukta "BITTI (kısmen …)" → hücreyi "🟨 kısmen — X; kalan → <sahip>" yap.
# Kapsam: aktif belgeler. HARİÇ: docs/arsiv/ · docs/otonom/arsiv/ · docs/raporlar/ (tarihli fotoğraf) ·
# 02-ILERLEME.md (tarihli günlük — o anki durumu kaydeder) · "## GEÇMİŞ" bölümü · ~~üstü çizili~~ · `kod` (örnek) ·
# kart dosyalarında **CEVAP** satırı (yalnız PO yazar, bayt bayt korunur).
TEK_KAYNAK_BELGELER = ['docs/kararlar/00-KART-INDEKSI.md', 'docs/kararlar/00-KARAR-TAKIP.md',
                       'docs/kararlar/10-yol-haritasi.md', 'docs/otonom/OTONOM-PROMPT.txt']
TEK_KAYNAK_BELGELER += sorted(os.path.relpath(p, root) for p in glob.glob(os.path.join(root, 'docs/otonom/*.md'))
                              if os.path.basename(p) != '02-ILERLEME.md')
TEK_KAYNAK_BELGELER += sorted(os.path.relpath(p, root) for p in glob.glob(os.path.join(root, 'docs/otonom/kararlar/*.md')))

def is_satirlari(rel):
    text = read(rel)
    if text is None:
        return
    for line in text.split('\n'):
        cells = line.split('|')
        if line.startswith('| ') and len(cells) >= 9:
            yield cells[1].strip().strip('*').strip(), cells[6].strip()

aktif_durum = {}
for rel in ('docs/otonom/00-KUYRUK.md', 'docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md'):
    for kimlik, durum in is_satirlari(rel):
        aktif_durum.setdefault(kimlik, durum)
bitmis = set()
for bpath in sorted(glob.glob(os.path.join(root, 'docs/otonom/arsiv/00-KUYRUK-bitti-*.md'))):
    for kimlik, durum in is_satirlari(os.path.relpath(bpath, root)):
        if re.match(r'^(✅|BITTI)', durum) and not re.search(r'k[ıi]smen', durum, re.I):
            bitmis.add(kimlik)
bitmis -= set(aktif_durum)  # aktif kuyrukta yeniden açılmış iş bitmiş sayılmaz

KIMLIK = r'(?<![\w-])([A-Z][A-Z0-9]{0,3}(?:-[A-Z0-9]+)+[a-z]?)(?![\w-])'
ACIK = r'(?:BEKL[İI]YOR|⬜|[Aa]çık|AÇIK|CALISILIYOR|ÇALIŞILIYOR|PR-ACIK)'
T1_SONRA = re.compile(KIMLIK + r'\s*(?:\(\s*' + ACIK + r'|:\s*(?:BEKL[İI]YOR|⬜))')
T1_ONCE = re.compile(r'(?:⬜|BEKL[İI]YOR|AÇIK)\s*(?:→|->)\s*' + KIMLIK)
T2 = re.compile(KIMLIK + r'\s*\(\s*(BEKL[İI]YOR|CALISILIYOR|ÇALIŞILIYOR|PR-ACIK|BASARISIZ|ATLANDI)')
T3 = re.compile(r'⬜\s*(?:→|->)\s*' + KIMLIK)

for rel in dict.fromkeys(TEK_KAYNAK_BELGELER):
    text = read(rel)
    if text is None:
        continue
    for no, line in enumerate(text.split('\n'), 1):
        if re.match(r'^##\s+GEÇMİŞ', line):
            break
        if re.match(r'^\s*\*\*CEVAP', line):
            continue
        satir = re.sub(r'`[^`]*`', '', re.sub(r'~~.*?~~', '', line))  # kod içi = kural örneği
        bulunan = set()
        for m in list(T1_SONRA.finditer(satir)) + list(T1_ONCE.finditer(satir)):
            if m.group(1) in bitmis and m.group(1) not in bulunan:
                bulunan.add(m.group(1))
                errors.append(f'{rel}:{no} {m.group(1)} bitti arşivinde ama burada açık görünüyor ("{m.group(0)[:40]}") — kart kendi durumunu "✅ {m.group(1)} · PR #" yapsın ya da işaretçi yaz (5c-t1)')
        for m in T2.finditer(satir):
            if m.group(1) not in bulunan:
                errors.append(f'{rel}:{no} {m.group(1)} durumu kopyalanmış ("{m.group(0)[:40]}") — durum yalnız kuyrukta; işaretçi yaz: "→ {m.group(1)}" (5c-t2)')
        for m in T3.finditer(satir):
            durum = aktif_durum.get(m.group(1), '')
            if re.match(r'^(✅ )?BITTI', durum):
                warnings.append(f'{rel}:{no} "⬜ → {m.group(1)}" ama kuyrukta "{durum[:40]}" → "🟨 kısmen — {m.group(1)}; kalan → <sahip>" (5c-t3)')

LIMITS = [('docs/otonom/00-KUYRUK.md', 90), ('docs/otonom/01-KARARLAR.md', 40),
          ('docs/otonom/02-ILERLEME.md', 80), ('CLAUDE.md', 35), ('docs/otonom/OTONOM-PROMPT.txt', 35),
          ('docs/otonom/03-PO-ELLE-ISLER.md', 30), ('docs/00-BELGE-HARITASI.md', 20)]
for rel, kb in LIMITS:
    p = os.path.join(root, rel)
    if os.path.exists(p) and os.path.getsize(p) > kb * 1024:
        warnings.append(f'{rel} {os.path.getsize(p) / 1024:.0f} KB > {kb} KB eşiği — arşive taşınacak metin var mı? (5c)')

print('── belge bekçisi (OTONOM-PROMPT 5c) ──')
for w in warnings:
    print(f'  ⚠️  UYARI  {w}')
for e in errors:
    print(f'  ✗ HATA   {e}')
if errors:
    print(f'  ❌ {len(errors)} HATA — bitmiş/eski metin aktif belgede. Arşive taşı (metin AYNEN), bekçiyi kapatma.')
    sys.exit(1)
print(f'  ✓ HATA yok ({len(warnings)} uyarı)')
PY
