### KARAR-5 · Öğrenme yolculuğu içeriği canlıya girsin mi?  [ÜRÜN KARARI · SEED]
**Şu an ne var:** Seed dosyası `backend/prisma/seed-learning-journey.ts` 7 mentör + 6 menti aşaması içeriyor (`npm run seed:learning-journey`; toplu silme yok, kurum-dışı ortak aşamaları üzerine yazar `:518-521`). Bu dosyadaki metinler kurgu adları gömülü taşıyor ("Zeynep" 30, "Deniz" 14 satırda; `{mentor_*}` yer tutucusu 0). 2026-09-21'de yazılan isim-değişkenli yeni menti içeriği (madde 147) seed'e taşınmadı — bugün "at" denirse eski, gömülü-adlı içerik yazılır. Canlıda bu tablolarda kayıt olup olmadığı bilinmiyor (sayım KARAR-35/C11'e bağlı). Neden atılmadığı artık kuyrukta yazılı: isim altyapısı (I-09/KARAR-30) ve mevcut 6 menti aşamasının üzerine yazma kararı (`docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md:44`).
**Sorun ne:** Kullanıcı öğrenme yolculuğu bölümünde ya boş ekran ya eksik içerik görüyor.
**Neden sana soruyorum:** Seed = canlı veriye yazma. Senin iki değişmez kuralından biri.
**Seçenekler:**
**A) At (önce yedek)** · Kullanıcı: içeriği görmeye başlar · Kazanç: hazır iş kullanıcıya ulaşır · Kayıp: içeriği kimse okumadan canlıya gider; kötü/eksik metin kullanıcıya görünür · Süre: S · Geri alınır: evet (yedek var) · Migration: yok
**B) Önce sen oku, sonra at** · Kullanıcı: bir gün daha bekler · Kazanç: canlıya çıkan metni görmüş olursun · Kayıp: sana bir okuma işi daha düşer · Süre: S + senin zamanın · Geri alınır: evet (yedek var) · Migration: yok
**C) Ertele** · Kullanıcı: boş ekran devam · Kazanç: yok · Kayıp: hazır iş rafta kalmaya devam eder · Süre: — (iş yok) · Geri alınır: — · Migration: yok
**Karşılaştırma:** Bu içeriğin kalitesinden eminsen A. Kim yazdığını/ne yazdığını hatırlamıyorsan B — ajan içeriği okunur biçimde ilerleme dosyasına döker, sen beş dakikada bakarsın. C'nin savunması yok.
**Benim önerim:** B — kullanıcıya ilk görünen içerik, bir kez göz gezdirmeye değer.
**Cevap vermezsen:** K-18 atlanır.
**İlgili kartlar:** KARAR-30 (sıra: isim altyapısı seed'den önce mi) · KARAR-35 (C11 sayım: canlıda aşama var mı) · KARAR-59 (kurgu ad: gömülü adlar kalabilir mi) · KARAR-127 (Mini Akademi öğrenme yolculuğuna eklenebilir) — birlikte cevaplanması önerilir: KARAR-59 + KARAR-30 + KARAR-5
**CEVAP:**

---

