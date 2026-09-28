> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ) · kapılar 4 renk (Bölüm 7).

**Son güncelleme:** 2026-09-28 11:25 UTC · çatı main HEAD (bu commit) · backend main HEAD `07d71a2`

**Durum:** CALISIYOR (devam turu — kota ~09:30 UTC'de kesti; 00-SIMDI 08:01'den beri güncellenmemişti). Sıra: 2.4 bölmeyi bitir (TEK BAŞINA) → AJ-58 → AJ-72 kaydı → 2.5 → GÖREV 3 KARAR-PAKETI (merge) + kart zenginleştirme → GÖREV 4 (AJ-83 …) → DURDU (K1-a).

**Şu an yapılan:** Adım 5 — KARAR-PAKETI çatı #425 (7b'de; ilk 10 karar 24 iş tam + 4 koşullu). Adım 6 — AJ-83 yazılıyor. 2.5 MERGE (#424).

**Devam turu — kesinti öncesi yarım kalanlar ve nasıl kapandı:**
| İş | Dal | Son hâl (11:20 UTC teyit) | Kapanış PR'ı |
|---|---|---|---|
| GÖREV 2.4 bölme | `otonom/DURUMA-GORE-BOLME-20260928` | ✅ MERGE `71869b8` — geri bakılabilirlik 3. koşu 20/20; 7b ONAY (A-F + G/H delta + I) | #421 |
| AJ-58 | backend `…AJ-58-hatirlatma-basarisiz-eposta-20260928` | ✅ MERGE (7b ONAY; canlı ok) | AJ-72 | çatı `otonom/AJ-72-kurum-askida-ekrani-20260928` | ✅ #422 MERGE + kural h kaydı yeni yapıda (yönetici metni → KARAR-129) | #422 + `6ef28cc` |
Süreç notu: 2.4 "tek başına" olmalıydı; AJ-72 ve AJ-58 aynı anda yürütüldü (docs'a dokunmadılar, zarar yok) — kural ihlali, bu turda tekrarlanmaz.

**Son merge'ler:** çatı #422 (AJ-72) · #419 (AJ-75) · #418 (GÖREV 2.3) · #417 (AJ-55) · #416 (GÖREV 2.1) · #415 (AJ-59) · #414 (GÖREV 2.2) · #413 (AJ-51) · #412 (AJ-54) · #411 (AJ-69) — her merge sonrası canlı ok:true · db:up · site 200 (11:20 UTC: ok:true · db:up · site 200).

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
| backend #227 + çatı #420 | AJ-77 13 durum alanı enum · 🔵 ⛔ MIGRATION | yeşil | ✅ ONAY | KARAR-128 EVET + §3b sayım + 5 tablo yedeği (DB erişimi) |
| çatı #425 | GÖREV 3.5 KARAR-PAKETI | koşuyor | 7b sürüyor | inceleme |
| çatı #110 | ⛔ MERGE ETME (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**Push edilmemiş iş:** yok.

**Engeller:**
- ⛔ 2026-09-28 ~07:50 UTC — AJ-75 7b inceleme ajanının `gh pr comment` çağrısı (backend #226) REDDEDİLDİ. Ret metni AYNEN (ajan raporundan): `Excess Sensitive Detail`. → kısa, hassas ayrıntısız yorum yazıldı; ayrıntılar AJ-103/AJ-104 satırlarında. Ardışık ret sayacı: 1 (sonraki komutlar geçti).
- 🗄️ Tek seferlik DB erişimi gerekiyor: AJ-77 (§3b sayım + yedek) · K-15 · Y-05 (EXPLAIN) · 🔵 EVET gelirse yedek için: AN-30 · U-18 · AN-26 · AN-02 · AJ-50.

**PO'ya sorular:** 🔵 EVET/HAYIR: KARAR-96 · 97 · 98 · 99 · 106 · 107 · 111 · 116 · ⭐ güvenlik: KARAR-101 · yeni: KARAR-126 (az yanıtlı ilk ayda NPS düşüş önerisi — KVKK çıkarımı) · toplu karar paketi GÖREV 3'te (`docs/otonom/KARAR-PAKETI.md`).

**Strateji katmanına not:** 7b bir kez `node_modules` sembolik bağının backend commit'ine girdiğini yakaladı (AJ-69) — backend `.gitignore` `node_modules/` bağı yakalamıyordu; düzeltildi, uygulayıcı kurallarına ders eklendi. Yeni satırlar: AJ-96 · 97 · 98 · 99 · 100.

**Sıradaki 5 iş:** 2.5 merge → KARAR-PAKETI merge → kart zenginleştirme (3.1) ∥ AJ-83 → AJ-90 → AJ-60.
