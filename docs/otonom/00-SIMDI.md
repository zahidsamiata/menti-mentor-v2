> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ) · kapılar 4 renk (Bölüm 7).

**Son güncelleme:** 2026-09-28 · çatı main HEAD (bu commit) · backend main HEAD `b79547d`

**Durum:** CALISIYOR — PO görevi (2026-09-28): GÖREV 1 (T1 güvenlik/KVKK/veri kaybı) → 2 (belge düzeni) → 3 (karar kartları + KARAR-PAKETI) → 4 (T2 → T3 → T4 → T5) → DURDU (K1-a). K5'e geçilmez.

**Şu an yapılan:** GÖREV 1 — BITTI: AJ-57 (#214/#407) · AJ-73 (#213/#406). Backend merge, çatı pointer CI'da: AJ-74 (#216) + AJ-88 (#218) → çatı #408. Yazılıyor: AJ-87 · AJ-69. Önceki turun TUR ÖZETİ: `02-ILERLEME.md` başı.

**Son merge'ler:** backend #213 + çatı #406 (AJ-73, canlı ok:true · db:up · site 200) · backend #214 + çatı #407 (AJ-57) · backend #216 (AJ-74) · #218 (AJ-88) — pointer #408'de.

**Açık PR'lar:**
| PR | İş | CI | İnceleme | Neden açık |
|---|---|---|---|---|
| backend #212 | AJ-50 ham DISC kart temizliği · 🔵 | yeşil | ✅ ONAY (2. tur) | KARAR-116 EVET + `User.discResultCard` yedeği (DB erişimi) |
| backend #164 + çatı #343 | Y1-B8 OAuth onay kapısı (güvenlik) | yeşil | SORUN VAR (ürün) | **KARAR-101** — Bekleme Odası kalsın mı |
| backend #157 + çatı #337 | AN-26 hatırlatma/eskalasyon · 🔵 | yeşil | ✅ ONAY | KARAR-98 EVET (+ alt soru) + `Conversation` yedeği |
| backend #148 + çatı #326 | U-18 mesaj talebi reddi · 🔵 | yeşil | ✅ ONAY | KARAR-97 EVET + `Conversation` yedeği |
| backend #142 + çatı #320 | AN-30 granüler rıza · 🔵 · çıkış blokeri | yeşil | ✅ ONAY | KARAR-96 EVET + `Consent` yedeği |
| backend #160 | AN-02 seed metin yazımı · 🔵 | yeşil | — | KARAR-99 EVET + 2 satır UPDATE |
| backend #185 | AN-52-1 anket tablosu · 🔵 ⛔ MIGRATION | yeşil | ✅ ONAY | KARAR-106 EVET bekliyor (yedek gerekmez — yeni tablo) |
| backend #186 + çatı #370 | AN-12 karantina · 🔵 | yeşil | ✅ ONAY (iki PR) | KARAR-107 EVET bekliyor |
| backend #189 + çatı #374 | K-15 müsaitlik tür+süre · 🔵 ⛔ MIGRATION | yeşil | ✅ ONAY | KARAR-111 EVET + `AvailabilityBlock` yedeği (merge'den önce) |
| çatı #408 | AJ-74 + AJ-88 pointer (backend #216 #218 merge edildi) | koşuyor | ✅ ONAY (ikisi) | CI |
| çatı #110 | ⛔ MERGE ETME (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**Push edilmemiş iş:** yok.

**Engeller:**
- 🗄️ Tek seferlik DB erişimi gerekiyor: K-15 · Y-05 (EXPLAIN) · 🔵 EVET gelirse yedek için: AN-30 · U-18 · AN-26 · AN-02 · AJ-50.

**PO'ya sorular:** 🔵 EVET/HAYIR: KARAR-96 · 97 · 98 · 99 · 106 · 107 · 111 · 116 · ⭐ güvenlik: KARAR-101 (Y1-B8) · toplu karar paketi bu turda hazırlanıyor (`docs/otonom/KARAR-PAKETI.md`, GÖREV 3).

**Strateji katmanına not:** —

**Sıradaki 5 iş:** AJ-87 · AJ-69 (yazılıyor) → AJ-51 → AJ-54 → AJ-59.
