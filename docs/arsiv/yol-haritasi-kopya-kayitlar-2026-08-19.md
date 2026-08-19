# Yol Haritası — Kopya Kayıtlar Arşivi

**📸 DONDURULMUŞ (2026-08-19)** — `10-yol-haritasi.md`'de **iki kez** listelenmiş madde kopyalarının taşındığı yer.

> **Neden taşındı:** Maddeler **30-34** yol haritasında hem **v1-D** (★ 2026-08-15 KEŞİF TESPİTLERİ) hem de **v1-E**
> (★ YÖNETİCİ KULLANICI YÖNETİMİ + GÜVENLİK) bloklarında **birebir aynı metinle** görünüyordu (byte-byte aynı,
> alt GÜNCELLEME notları dahil — kelime-kelime karşılaştırıldı). Bu gerçek kopyadır (aynı iş + aynı bağlam + aynı statü).
> v1-E bloğu asıl olarak yalnız **35, 36, 37** maddelerini içermeli; 30-34 oraya yanlışlıkla ikinci kez yapıştırılmıştı.
>
> **Karar (büyük belge düzenleme turu):** v1-D oluşumu **asıl olarak korundu** (30-34 = 2026-08-15 keşif tespitleri,
> doğal yeri orası). v1-E'deki **kopya** buraya taşındı (silinmedi — Belge Düzeltme Deseni / Kural 6). Aktif yol
> haritasında v1-E bloğu artık yalnız 35-37 içerir + bu belgeye kısa iz bırakıldı.
>
> **Asıl (canlı) kayıtlar:** `docs/kararlar/10-yol-haritasi.md` → v1-D bloğu, madde 30-34.

---

## v1-E bloğundan taşınan kopya (madde 30-34, 2026-08-19 itibarıyla)

> Aşağıdaki metin, v1-E bloğundaki tekrar oluşumun aynen kopyasıdır. Güncel/canonical statü için aktif yol haritasının
> v1-D bloğuna bakın.

30. **⚠️ Sertifika bankası canlıda eksik (5 vs 20)** — kodda 20 senaryo (`seed-certification.ts`), canlıda yalnız 5 soru (salt-okuma sayımı). Zengin banka seed edilmemiş → `seedCertification()` kontrollü çalıştırma. **Canlı DB yazımı → PO onayı ZORUNLU** (tehlikeli tam `seed.ts` değil; bu fonksiyon idempotent/silmez ama canlıda çalışır).
31. **DISC-tipine-özel "mentiye yaklaşım" içeriği YOK (en büyük içerik boşluğu)** — hiçbir testte mentinin DISC tipine göre uyarlanan yaklaşım içeriği yok. 3 seçenek (eksikler raporu): (1) statik yaklaşım kılavuzu (M, önerilen) · (2) SJT'yi menti-DISC koşullu genişletme (L, migration) · (3) sertifikaya tip-özel varyant (L, önerilmez). Kısmen v2 #20 (KARAR 9) ile ilişkili — PO netleştirir.
32. **Admin soru düzenleme UI (S)** — backend PATCH hazır (`questionController.ts`), FE'de düzenle butonu yok → salt-frontend, hızlı kazanç.
    > ⚠️ GÜNCELLEME (2026-08-17): ✅ **TAMAMLANDI, CANLIDA (çatı #87).** Kuruma özel soruya Düzenle butonu + inline form; backend PATCH `/api/questions/:id` (ADMIN + tenant-scoped IDOR) zaten hazırdı. Yalnız metin düzenlenir. CI Integration (Admin) yeşil.
33. **Çift DISC seed temizliği + SJT belge-kod çelişkisi (S)** — `seed.ts` (32 soru) ile `seed-questions.ts` (20, canlıda olan) çelişiyor → tek kaynağa indir. Ayrıca `03-psikometri` "4 pedagojik SJT" der, kodda 3 var → SJT genişlet ya da belgeyi düzelt.
    > ⚠️ GÜNCELLEME (2026-08-17): ✅ **KISMİ (backend #45).** Ölü/çelişen `prisma/seed-questions.ts` (hiç import edilmeyen standalone, 20 global DISC) **silindi** — aktif `seed.ts` (32) canonical kaldı. **DB'ye dokunulmadı, seed çalıştırılmadı.** **KALAN (PO kararı, canlı DB yazımı):** (a) **seed↔canlı**: canlıda 20 DISC var (eski seed izi), `seed.ts` 32 üretir → re-seed mi trim mi? (b) **SJT belge-kod**: kod **3** (doğrulandı), `03-psikometri:47` "4" der → belge kod gerçeğine hizalandı, 4'e içerik genişletme PO kararı.
34. **Öğrenme yolculuğu tamamlanma görünürlüğü (S)** — yönetici kimin tamamladığını göremiyor (`learningJourneyCompletedAt` admin select'te yok); retention için faydalı.
    > ⚠️ GÜNCELLEME (2026-08-17): brief "yapıldı" dedi ama **kod-doğrulama NEGATİF** — `learningJourneyCompletedAt` STK `adminController` select'inde YOK (yalnız `platformTenantController` = platform süper-admin drill-down'da var). STK yönetici hâlâ göremiyor → **AÇIK** (kod gerçeği esas).
