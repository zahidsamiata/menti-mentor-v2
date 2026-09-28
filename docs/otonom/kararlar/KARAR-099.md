### KARAR-99 · 🔵 EVET/HAYIR — AN-02: iki soru metnindeki yazım hatası canlıda düzeltilsin mi? (1 iş açar: AN-02) [🔵 CANLI VERİYE YAZMA]
**Kullanıcı ne görür:** Kullanıcılar iki soruyu doğru yazımla okur: "Başkalarını motive etmek ve ilham vermek benim doğal bir **güçlü yanım** gibi hissettiriyor." (bugün "güçlüğüm") ve SJT senaryosunda "**Mentin**, haftalardır çalıştığı bir projeyi…" (bugün "Menteen"). Kanıt: backend PR `menti-mentor#160` (`prisma/seed.ts` PR'da `:70` ve `:540`; bugünkü main'de hatalı metinler `backend/prisma/seed.ts:72` ve `:542`).
**Ne değişir:** Canlı veritabanında **2 satırın metni** güncellenir: `Question` tablosunda 1 soru metni, `SjtQuestion` tablosunda 1 senaryo metni. Başka hiçbir kayıt değişmez; kullanıcı cevapları etkilenmez (cevaplar soru kimliğine bağlı, metne değil — uygulama öncesi kontrol edilecek). ⛔ `seed.ts` ÇALIŞTIRILMAZ (yıkıcı seed); düzeltme yalnız bu iki satıra hedefli `UPDATE` ile yapılır.
**Geri alınır mı:** Evet — eski iki metin yedekten geri yazılabilir.
**Yedeği alınacak tablo:** `Question` ve `SjtQuestion` (tarihli yedek; satır sayıları `02-ILERLEME.md`'ye).
**Durum:** seed dosyası düzeltmesi PR'da (#160 — 2026-09-28 gh: CI yeşil, main ile temiz birleşiyor) · canlı UPDATE için DB erişimi gerekir (bu VPS'te yok).
**EVET** → ajan tarihli yedeği alır → iki satırı günceller → canlıda görür → #160 merge. (DB erişimi yoksa: "EVET var, tek seferlik DB erişimi gerekiyor" diye `00-SIMDI`'ye yazar.)
**HAYIR** → canlı metinler olduğu gibi kalır; #160 (yalnız dosya) yine de merge edilebilir ya da kapatılır — cevabında belirt.
**Ne kaybedersin:** EVET → canlı veriye iki satırlık elle yazım + iki tablonun yedeği için tek seferlik DB erişimi gerekir; cevapların metne değil soru kimliğine bağlı olduğu uygulama öncesi kontrol edilmeli · HAYIR → kullanıcılar iki soruyu hatalı yazımla okumaya devam eder; yalnız dosya düzeltilirse yeni ortam doğru, canlı yanlış kalır.
**Benim önerim:** yok — değişiklik küçük ve geri alınır ama canlı veriye yazma onayı kuralı gereği yalnız senin.
**Cevap vermezsen:** AN-02 PR-ACIK kalır; iki soru hatalı yazımla görünmeye devam eder.
**İlgili kartlar:** KARAR-85 (yeni ortamda DISC soru havuzu aynı `seed.ts` metinlerinden doluyor)
**CEVAP:**

---

