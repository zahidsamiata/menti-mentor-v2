#!/usr/bin/env bash
# Belge bekçisi — aktif/arşiv ayrımı (PO kararı K-A, 2026-09-26; OTONOM-PROMPT.txt Bölüm 5c).
# Sık okunan belgelerde bitmiş/eski metnin aktif dosyada birikmesini (şişmeyi) otomatik yakalar.
#
# HATA (çıkış 1 — CI kırmızı):
#   · docs/otonom/00-KUYRUK.md'de Durum=BITTI satırı (kural a) ya da "→" katlanmış satır (kural b)
#     (istisna: Durum'u "kısmen" / "bekliyor" içeren belirsiz satırlar — taşınmaz, UYARI olarak listelenir)
#   · docs/otonom/01-KARARLAR.md'de "İŞLENDİ" notlu karar kartı (kural c)
#   · CLAUDE.md / docs/otonom/OTONOM-PROMPT.txt'te kod (`...`) dışında "~~[ESKİ" katmanı (kural e)
# UYARI (çıkış kodunu değiştirmez): boyut eşikleri (Bölüm 5c).
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
