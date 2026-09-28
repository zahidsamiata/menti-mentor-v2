### KARAR-62 · İlk ölçüm: herkes aynı senaryoları mı çözsün, sistem kişiye göre mi seçsin?  (2 işi açar)  [ÜRÜN KARARI · ÖLÇME YÖNTEMİ]
> Cross-ref: KARAR-57 "hangi test kanonik" kararıdır; bu kart "aynı mı, adaptif mi" ayrı ölçme yöntemi kararıdır.
**Şu an ne var:** 39'luk senaryo bankası kodda yok (şemada senaryo tablosu hazır, seed'de yalnız 3 örnek senaryo — `schema.prisma:932-946` · `seed.ts:535-580`; kullanıcıya senaryo soran ekran yok). Kullanıcı bugün 8 soruluk DISC testi çözüyor (`onboardingController.ts:109-190`). Yazılı iki plan birbirini tutmuyor: Tasarım belgesi "ilk oturum 12 senaryo, herkes aynı 12'yi görür, karşılaştırma için şart" (`TAS:159-163`); senaryo bankası "5 sabit + 10 kişiye göre seçilen = 15 senaryo" (`BANKA:14,45`, "PO onaylı").
**Sorun ne:** Daha yeni belge daha eskisindeki "şart" kelimesini gerekçe yazmadan aşmış. 15 senaryolu planda kişiler arası doğrudan karşılaştırma yalnız 5 ortak senaryoda mümkün. "Kişiye göre seçme" motoru kodda hiç yok (`triggersOn` alanı var — `schema.prisma:939` — `src/` içinde kullanımı 0).
**Neden sana soruyorum:** Ölçme yöntemi değişiyor: kullanıcının kaç soru çözeceği ve iki kişinin aynı ölçüyle ölçülüp ölçülmediği. Teknik değil.
**Seçenekler:**
· **A — 5 sabit + 10 kişiye göre seçilen (senaryo bankası planı).** Kullanıcı ne görür: 15 senaryo (~5 dk), belirsiz kaldığı tarafa odaklanan sorular. Ne kazanırsın: en çok bilgi, en az "şimdilik" etiketi. **Ne kaybedersin:** kişiler arası karşılaştırma 5 senaryoya düşer; seçim motoru yazılmadan başlanamaz (ek iş M-L); tasarımdaki "şart" geri alınır. Süre L · geri alınır ✅ · migration muhtemelen VAR (TEYİT GEREK)
· **B — 12 sabit senaryo, herkese aynı (tasarım belgesi planı).** Kullanıcı ne görür: 12 senaryo (~4 dk). Ne kazanırsın: en basit, herkese adil, karşılaştırılabilir; seçim motoru gerekmez. **Ne kaybedersin:** 39'luk bankada "12'lik çekirdek" yok, yeniden seçilmesi gerekir; belirsiz boyuta odaklanma olmaz; daha az sinyal (`TAS:332` bunu "dürüst sınır" demiş). Süre M · geri alınır ✅ · migration aynı
· **C — Geçiş planı: şimdilik 15 SABİT senaryo (5 çekirdek + havuzdan seçilmiş sabit 10), kişiye göre seçim sonra.** Kullanıcı ne görür: 15 senaryo, herkes aynı. Ne kazanırsın: seçim motorunu beklemeden 15 sinyal + karşılaştırılabilirlik; A'ya sonra geçilir. **Ne kaybedersin:** sabit 10'u birinin seçmesi gerekir (içerik işi); "en bulanık boyuta odaklanma" ertelenir; iki geçiş olur. Süre M · geri alınır ✅ · migration aynı
**Karşılaştırma:** Ölçümün kişiye özel keskinliği önemliyse ve seçim motorunun işine hazırsan A. Kurum yöneticisinin iki kişiyi aynı ölçüyle kıyaslaması önemliyse B. Hemen başlamak ama A'yı kapatmamak istiyorsan C.
**Benim önerim:** C — seçim motoru bugün yok, C bugün uygulanabilir ve A'ya açık kalır. ⚠️ Bu bir ölçme yöntemi kararı; önerime güvenme, kendi önceliğine göre seç.
**Cevap vermezsen:** senaryo bankasının koda girişi (Faz 5 "a"+"f": 39 senaryo seed + 5+10 akış) hangi akışı kuracağını bilemez; kuyrukta AN-04 bu cevabı bekliyor (`00-KUYRUK.md:161`).
**İlgili kartlar:** KARAR-57 (hangi test esas — ayrı ama komşu soru) · KARAR-58 (bankaya geçiş yolu; AN-04 ikisine kilitli) · KARAR-63 (40-60 derinleşme tetiği seçim motoruna bağlı) — birlikte cevaplanması önerilir: KARAR-58 + KARAR-62
**CEVAP:**

---

