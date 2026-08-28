# Değerlendirme/Test Sistemi — Derinleştirilmiş Eksik Analizi (2026-08-15)

**📸 DONDURULMUŞ (2026-08-15)** — envanter raporunun (PR #78, 7. bölüm) derinleştirilmiş hâli. İçerik dökümü: [`../../arsiv/icerik/00-icerik-index.md`](../../arsiv/icerik/00-icerik-index.md) (⚠️ BAYAT, 2026-08-28 arşive taşındı — güncel: `../icerik/tam-soru-dokumu-2026-08-26.md`).

> Her eksik için: ne eksik · neden önemli · şu an ne var/yok (dosya:satır) · nasıl yapılabilir (seçenekler) · iş boyu · migration? · PO kararı · yol haritası eşlemesi. **Kod/şema DEĞİŞMEDİ**, `10-yol-haritasi.md`'ye DOKUNULMADI (yalnız eşleme notu).

---

## EKSİK 1 — DISC-tipine-özel "mentiye yaklaşım" içeriği (EN BÜYÜK BOŞLUK)
- **Ne eksik:** Mentöre, mentinin DISC tipine (D/I/S/C) veya arketipine göre NASIL yaklaşacağını öğreten/sınayan adaptif içerik. "D-tipi mentiye hızlı/özerklik tanıyarak, S-tipi mentiye sabırla/destekle yaklaş" gibi koşullu senaryolar.
- **Neden önemli:** Ürün vaadinin çekirdeği (DISC eşleştirmenin "aksiyona dönüşmesi"); mentör eşleşmeyi alıyor ama "bu tiple nasıl çalışırım" rehberi yok.
- **Şu an ne var/yok:** Sertifika (`icerik/sertifika-senaryolari`), öğrenme yolculuğu (`icerik/ogrenme-yolculugu`), SJT (`icerik/sjt-sorulari`) hepsi **genel**; menti-DISC koşullu dallanma YOK (üç içerik belgesinde kanıtlı). Eşleştirme motoru DISC/OCEAN'ı skorluyor (`scoring.service.ts`) ama mentöre yaklaşım metni üretmiyor.
- **Nasıl yapılabilir (3 seçenek):**
  1. **Statik yaklaşım kılavuzu (en hızlı):** Her DISC tipi/arketip için elle yazılmış "bu tiple nasıl çalışılır" metni; eşleşme kartında/mentör panelinde gösterilir. Şema: küçük (metin tablosu ya da sabit map). İçerik yükü: 4 DISC × birkaç paragraf (veya 8 arketip). **Boy: M.** Migration: minimal/yok (sabit map olabilir).
  2. **Mevcut SJT'yi genişletme:** SJT'ye "mentin şu tipte, ne yaparsın" senaryoları + menti-DISC koşullu tetikleme (`triggersOnMentiDiscType` gibi yeni alan). Şema değişikliği + içerik. **Boy: L.** Migration: EVET (yeni alan + soru bankası).
  3. **Sertifikaya DISC-koşullu senaryo ekleme:** Sertifika bankasına tip-özel varyantlar. Ama sertifika "yetkinlik kapısı"; yaklaşım kılavuzuyla amaç karışır. **Boy: L, önerilmez** (amaç bulanıklaşır).
- **Öneri:** Seçenek 1 (statik kılavuz) ile başla — düşük risk, hızlı değer; sonra talep olursa Seçenek 2. **PO kararı:** hangi seçenek + içerik kim yazacak (uzman metni).
- **Yol haritası eşlemesi:** Kısmen **v2 İş 20 = KARAR 9 "Mentör yaklaşım kılavuzu Katman 3"** (vizyon, KVKK/rıza gerektiren derin analiz). Statik kılavuz (Seçenek 1) bunun hafif/erken bir alt-kümesi olabilir — PO netleştirmeli.

## EKSİK 2 — Sertifika 20-senaryo bankası canlıya seed edilmemiş (KRİTİK, sessiz)
- **Ne eksik:** Kodda 20 zengin senaryo (`seed-certification.ts`) var; **canlıda yalnız 5 soru** (salt-okuma sayımı). Zengin banka deploy edilmemiş.
- **Neden önemli:** Mentörler şu an eksik/eski 5 soruyla sertifikalanıyor; ürünün en olgun içeriği kullanıcıya ulaşmıyor. Sessiz bir kayıp (kimse fark etmemiş).
- **Şu an ne var/yok:** Kod 20 soru + 80 seçenek; canlı 5 soru + 20 seçenek (`icerik/sertifika-senaryolari` kaynak bölümü).
- **Nasıl yapılabilir:** `seedCertification()` fonksiyonu (`seed-certification.ts:259`) idempotent upsert + eski soruları pasifleştirme içeriyor — **tehlikeli tam `seed.ts` DEĞİL**, yalnız bu fonksiyon kontrollü çalıştırılırsa canlıya 20 senaryo eklenir/güncellenir, veri silmez. Yine de canlı DB'de çalışacağı için PO onayı + dikkatli uygulama şart.
- **Boy: S** (çalıştırma) ama **canlı DB yazımı → PO onayı ZORUNLU.** Migration: yok (veri seed, şema değil).
- **PO kararı:** `seedCertification()` canlıda kontrollü çalıştırılsın mı? (Ayrı, onaylı bir "seed turu".)
- **Yol haritası eşlemesi:** Yol haritasında açık kalem YOK — yeni tespit. Eklenmeli.

## EKSİK 3 — İki çelişen DISC seed kaynağı
- **Ne eksik:** `seed-questions.ts` (20 soru, güvenli) ile `seed.ts` (32 soru, tehlikeli/çalıştırma-yasak) farklı DISC setleri tanımlıyor. Canlıda 20 var. `seed.ts`'in soru bloğu ölü/çelişkili.
- **Neden önemli:** Gelecekte yanlış seed çalıştırılırsa tutarsızlık; bakım kafası karıştırır.
- **Nasıl yapılabilir:** `seed.ts`'teki soru bankasını kaldır veya tek kaynağa (`seed-questions.ts`) indir; dokümante et. **Boy: S.** Migration: yok. Salt kod temizliği (ayrı tur).
- **PO kararı:** tek DISC seed kaynağına indirgeme onayı.
- **Yol haritası eşlemesi:** yok — yeni tespit (teknik borç).

## EKSİK 4 — SJT belge-kod çelişkisi (Mini Akademi 4 SJT)
- **Ne eksik:** `03-psikometri-ve-algoritma.md:44-49` "Mini Akademi = 4 pedagojik SJT" der; kodda 3 SJT var (ve OCEAN kalibrasyonu amaçlı, Mini Akademi değil).
- **Neden önemli:** Belge niyeti kodla uyuşmuyor; ileride yanlış yönlendirir. Ayrıca SJT içeriği zayıf (3 soru → kalibrasyon sınırlı).
- **Nasıl yapılabilir:** (a) SJT'yi 4+ soruya çıkar (içerik, `seed.ts` genişletme, boy S–M); ve/veya (b) belgeyi kod gerçeğine güncelle (salt-docs, S). Karar: içerik mi genişletilecek, belge mi düzeltilecek.
- **Boy: S–M.** Migration: yok.
- **PO kararı:** SJT genişletilsin mi yoksa belge mi güncellensin?
- **Yol haritası eşlemesi:** yok — yeni tespit.

## EKSİK 5 — Admin soru düzenleme UI'ı yarım
- **Ne eksik:** Backend `updateQuestion` PATCH hazır (`questionController.ts:115-147`) ama `/admin/questions` sayfasında **düzenle butonu yok** (sadece ekle + sil).
- **Neden önemli:** Yönetici STK-custom soruyu düzeltmek için silip yeniden eklemek zorunda; yarım özellik.
- **Nasıl yapılabilir:** FE'de düzenle formu/butonu + mevcut PATCH endpoint'ine bağla. **Boy: S** (salt-frontend, backend hazır). Migration: yok.
- **PO kararı:** öncelik mi? (küçük, hızlı kazanç)
- **Yol haritası eşlemesi:** yok — yeni tespit.

## EKSİK 6 — STK-custom soru özelliği neredeyse kullanılmamış
- **Ne eksik:** Canlıda yalnız 1 STK-custom soru; özellik var ama değer üretmiyor. Ayrıca STK-custom sorular DISC skoruna katılmaz (yalnız profil zenginleştirme) — amacı belirsiz.
- **Nasıl yapılabilir:** (a) örnek içerik/şablonla canlandır, veya (b) özelliği gözden geçir/kaldır. **Boy: S** (karar + içerik).
- **PO kararı:** tutulsun/canlandırılsın mı, kaldırılsın mı?
- **Yol haritası eşlemesi:** yok.

## EKSİK 7 — Öğrenme yolculuğu tamamlanma görünürlüğü (yönetici)
- **Ne eksik:** Yönetici bir kullanıcının öğrenme yolculuğunu tamamlayıp tamamlamadığını göremiyor (`learningJourneyCompletedAt` admin panelinde sorgulanmıyor).
- **Neden önemli:** Retention/takip için faydalı; kimin onboarding'i yarım kaldı görünmüyor.
- **Nasıl yapılabilir:** admin select + FE gösterim. **Boy: S.** Migration: yok (alan mevcut).
- **PO kararı:** retention paneline eklensin mi?
- **Yol haritası eşlemesi:** kısmen v2 retention (İş 24) ile ilişkili.

---

## ÖZET — öncelik önerisi (karar PO'da)
| # | Eksik | Boy | Migration | Canlı DB yazımı | Aciliyet |
|---|---|---|---|---|---|
| 2 | Sertifika 20-banka canlıya | S | yok | ✅ (seed, PO onayı) | 🔴 yüksek (içerik kaybı) |
| 1 | DISC-tipine yaklaşım (statik kılavuz) | M | minimal | hayır | 🟡 yüksek değer |
| 5 | Admin soru düzenleme UI | S | yok | hayır | 🟢 hızlı kazanç |
| 4 | SJT genişletme / belge düzelt | S–M | yok | hayır | 🟢 orta |
| 3 | Çift DISC seed temizliği | S | yok | hayır | 🟢 teknik borç |
| 7 | Öğrenme yolculuğu görünürlüğü | S | yok | hayır | 🟢 düşük |
| 6 | STK-custom gözden geçir | S | yok | hayır | 🟢 düşük |

*Not: Onaylı-bekleyen İş 2+3 migration'ı (kim onayladı + red gerekçesi) bu rapordan ayrıdır; bu tabloya dahil değildir.*
