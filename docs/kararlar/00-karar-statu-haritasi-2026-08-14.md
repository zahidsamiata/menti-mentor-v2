# Karar Statü Haritası

**📸 DONDURULMUŞ (2026-08-14)** — o günün fotoğrafı; güncellenmez. Bu belge **ham statü haritasıdır** —
sonraki adım (ayrı tur) bunu tek-bakışta **DURUM PANOSU**'na (`00-DURUM-PANOSU`) dönüştürecek, sonra
yol haritası v1/v2 önceliklendirmesi yapılacak. **Bu belge önceliklendirme YAPMAZ, pano DEĞİLDİR.**

> **Amaç:** `docs/kararlar/` + `docs/raporlar/` + `10-yol-haritasi.md` (A–F) içindeki her kararın **ŞU AN
> gerçekte** hangi durumda olduğunu — gri bölgeler dahil — tek yerden, dosya:satır kanıtıyla göstermek.
> Asıl değer gri bölgede: 🟨 "arka var / ön yok" = az işle kazanç.
>
> **Yöntem:** Mevcut denetimlerin (belge-aksiyon-denetimi, unutulmus-niyet, belge-denetimi, stk-admin-bulgu,
> tasarim-kararlari-admin) üstüne bina edildi; gri/şüpheli maddeler **güncel kodla** (2026-08-14, #62 sonrası) teyit edildi.
> "sanırım" yok — kanıt yoksa ❓ BELİRSİZ. Karar noktalarında durulmadı, ❓ + "PO kararı gerekli" notu düşüldü.

---

## KAPSAM — taranan kaynaklar
- **KAYNAK 1 — belgeler:** `docs/kararlar/` 01–08 (vizyon, mimari, psikometri, güvenlik, özellikler, tasarım,
  çalışma, açık sorular) + `tasarim-kararlari-admin-2026-08-11` (12 KARAR) + `stk-admin-bulgu-envanteri` (13 bulgu) +
  `docs/raporlar/` 16 belge (strateji/persona/envanter/teşhis).
- **KAYNAK 2 — yol haritası:** `10-yol-haritasi.md` A (13 admin bulgusu) · B (KVKK K1–K5) · C (algoritma+hardening) ·
  D (altyapı+temizlik) · E (PO manuel) · F (denetimden kurtarılan F1–F7).
- **Mevcut denetim tabanı (sıfırdan üretilmedi, statü güncellendi):** `belge-aksiyon-denetimi-2026-08-11.md` (34 belge),
  `unutulmus-niyet-envanteri-2026-08-10.md`, `belge-denetimi-2026-08-10.md`.
- **Toplam karar (yaklaşık):** ~50 (kesin dağılım ÖZET'te). Kümeler halinde işlendi.

## BOYUT & RENK LEJANTI
Her karar **üç boyutta** işaretlenir (plan ile kod AYRI sorular):
- **BOYUT A — PLAN:** yol haritasında (10-yol) madde var mı? `PLAN:VAR` / `PLAN:YOK`.
- **BOYUT B — KOD:**
  - 🟩 **TAM BİTTİ** — backend + ön yüz + canlıda çalışıyor.
  - 🟨 **ARKA VAR / ÖN YOK** — backend yazılmış, kullanıcı göremiyor (buton/ekran eksik). ★ **az işle kazanç.**
  - 🟧 **YARIM KALDI** — başlanmış, ne backend ne ön yüz tam.
  - 🟥 **HİÇ BAŞLANMADI** — karar var, kod yok.
  - 🔵 **SIRADA BEKLİYOR** — planlı ama BİLİNÇLİ ertelenmiş/ileri-faz/Katman-3 (boşluk değil, kasıtlı).
  - ⬜ **KOD-DIŞI** — saf strateji/tasarım/politika, kod gerektirmez.
- **BOYUT C — ÇELİŞKİ:** ❌ geçersiz/çeliştli (kazanan kanıtlı) · ❓ belirsiz (PO kesinleştirmeli) · (yoksa boş).

---

<!-- KÜME 1 -->
## KÜME 1 — Vizyon · Mimari · Psikometri (kararlar 01–03)
_(işleniyor)_

<!-- KÜME 2 -->
## KÜME 2 — Güvenlik & KVKK (04 + yol haritası B / K1–K6)
_(işleniyor)_

<!-- KÜME 3 -->
## KÜME 3 — Özellikler & Paneller (05 + raporlar: panel/platform/strateji) ★ 🟨 yoğunluğu
_(işleniyor)_

<!-- KÜME 4 -->
## KÜME 4 — Tasarım & UX (06 + tasarim-kararlari-admin 12 KARAR + landing)
_(işleniyor)_

<!-- KÜME 5 -->
## KÜME 5 — STK Admin 13 Bulgusu (yol haritası A)
_(işleniyor)_

<!-- KÜME 6 -->
## KÜME 6 — Algoritma · Altyapı · Denetimden Kurtarılanlar (yol haritası C/D/F)
_(işleniyor)_

<!-- KÜME 7 -->
## KÜME 7 — Unutulmuş Niyetler & PO Manuel (yol haritası E + envanter C)
_(işleniyor)_

---

## ÖZET
_(en sonda — toplam sayı + kategori dağılımı + 🟨 vurgu listesi + en büyük 🟥/❓ kümeleri)_
