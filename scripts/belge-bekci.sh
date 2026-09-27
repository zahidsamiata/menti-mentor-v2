#!/usr/bin/env bash
# Belge bekçisi — aktif/arşiv ayrımı (PO kararı K-A, 2026-09-26; OTONOM-PROMPT.txt Bölüm 5c).
# Sık okunan belgelerde bitmiş/eski metnin aktif dosyada birikmesini (şişmeyi) otomatik yakalar.
#
# HATA (çıkış 1 — CI kırmızı):
#   · docs/otonom/00-KUYRUK.md'de Durum=BITTI satırı (kural a) ya da "→" katlanmış satır (kural b)
#     (istisna: Durum'u "kısmen" / "bekliyor" içeren belirsiz satırlar — taşınmaz, UYARI olarak listelenir)
#   · docs/otonom/01-KARARLAR.md'de "İŞLENDİ" notlu karar kartı (kural c)
#   · CLAUDE.md / docs/otonom/OTONOM-PROMPT.txt'te kod (`...`) dışında "~~[ESKİ" katmanı (kural e)
# UYARI (çıkış kodunu değiştirmez): boyut eşikleri (Bölüm 5c) · kural (h): arşivdeki BITTI satırı "madde N"
#   atfı taşıyor ve docs/kararlar/00-KARAR-TAKIP.md'de madde N satırında ✅ / 🟨 yok → "BITTI işin kaynağı açık"
#   (gerekçeli istisna: docs/raporlar/kod-denetimi/bekci-istisna.txt — satır biçimi "<iş> madde <N> # <gerekçe>").
#   · kural (i): CI job'u scripts/verify.sh başlığında anılmıyor (KR-22)
#   · kural (j): docs/raporlar/ altında ilk 5 satırında TÜR etiketi olmayan rapor (YN-11)
#   · kural (k): docs/ altında indekssiz (giriş noktası olmayan) klasör (YN-12)
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
            errors.append(f'01-KARARLAR.md {card.split(chr(10), 1)[0][:60]} "İŞLENDİ" notlu kart aktif dosyada → arsiv/01-KARARLAR-cevaplanmis.md (5c-c)')

for rel in ('CLAUDE.md', 'docs/otonom/OTONOM-PROMPT.txt'):
    text = read(rel)
    if text is None:
        continue
    for no, line in enumerate(text.split('\n'), 1):
        outside_code = re.sub(r'`[^`]*`', '', line)
        if re.search(r'~~\[ESK[İI]', outside_code):
            errors.append(f'{rel}:{no} "~~[ESKİ" katmanı aktif kural dosyasında → arsiv/kural-gecmisi-*.md (5c-e)')

# Kural (h): BITTI işin kaynağı (00-KARAR-TAKIP maddesi) açık kalmasın — yalnız UYARI.
import glob
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

# Kural (i) KR-22: CI job'ları scripts/verify.sh başlık yorumunda anılıyor mu — yalnız UYARI.
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

# Kural (j) YN-11: docs/raporlar/ altındaki her rapor ilk 5 satırında TÜR etiketi taşır — yalnız UYARI.
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

# Kural (k) YN-12: docs/ altındaki her klasörün giriş noktası (indeks) var — yalnız UYARI.
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

LIMITS = [('docs/otonom/00-KUYRUK.md', 150), ('docs/otonom/01-KARARLAR.md', 150),
          ('docs/otonom/02-ILERLEME.md', 150), ('CLAUDE.md', 35), ('docs/otonom/OTONOM-PROMPT.txt', 35),
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
