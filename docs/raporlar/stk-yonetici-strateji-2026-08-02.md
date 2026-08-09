# STK YÖNETİCİ PANELİ — STRATEJİ (İDEAL TASARIM)
**Tarih:** 2026-08-02 · **Amaç:** STK yöneticisi (tenant admin) panelinin OLMASI GEREKEN hâli
**Yöntem:** Önce ideal (bu belge) → sonra kod keşfiyle kıyas → sonra aksiyon planı.
**Yetki felsefesi (ürün sahibi):** DENGELİ — yönetici izlesin + kritik birkaç aksiyon alabilsin.
**Uyarı:** Bu İDEAL. Neyin yapılabilir/yapılamaz olduğu, keşif raporuyla kıyas sonrası netleşecek.

---

## 0. STK YÖNETİCİSİ KİM? (kapsam)

**Tenant admin** = bir derneğin/kulübün/STK'nın başkanı/koordinatörü.
**SADECE kendi kurumunu** yönetir — başka kurumun verisine ASLA erişemez (tenant izolasyonu).
Platform admin (sistem sahibi = ürün sahibi) ile KARIŞTIRILMAMALI; o ayrı katman, ayrı strateji.

Yöneticinin işi üç eksende: **GÖRMEK · KARAR VERMEK · MÜDAHALE ETMEK.**

---

## 1. GÖRMEK (İzleme — yöneticinin gözü)

İlke: **Kişi listesi değil, anlamlı özet → tıklayınca detay (drill-down).**
(yonetici-persona belgesindeki 3 temel soruya dayanır.)

### S1 — "Program yaşıyor mu?" (aktiflik/ivme)
- Aktif üye sayısı + oran (bu hafta/ay giren).
- Bu ayki görüşme sayısı + geçen aya göre yön (↑/↓).
- Haftalık aktiflik trendi.

### S2 — "Kimse kaynıyor mu?" (boşluk/risk — müdahale tetikler)
- Mentörsüz bekleyen menti sayısı → tıkla → kimler.
- Hiç görüşme yapmamış ("ölü") eşleşmeler.
- Pasif üyeler (X gündür girmemiş) → dürtülecekler.
- Mentör/menti dengesi (arz-talep).

### S3 — "Gösterebilir miyim?" (kanıt/etki — sponsora/kurula)
- Toplam: üye / eşleşme / görüşme (kümülatif).
- Onboarding/DISC tamamlama oranı.
- Ortalama eşleşme uyum skoru (kalite — bizim farkımız).

---

## 2. KARAR VERMEK (panel yöneticiyi harekete geçirmeli)

Panel sadece göstermemeli, yöneticiyi UYARMALI (o aramamalı):
- "15 menti mentör bekliyor" (kırmızı) → yönetici "mentör davet etmeliyim" der.
- "Şu eşleşme 3 haftadır görüşmedi" → "dürteyim" der.
- "Bu mentör 5 mentiyle dolu" → yük dengesi farkındalığı.
Panel: rahatlat ("her şey yolunda") ya da uyar (net sorun). Belirsizlik bırakma.

---

## 3. MÜDAHALE ETMEK (dengeli yetki — kritik aksiyonlar)

### ✅ Yönetici YAPABİLİR
| Aksiyon | Not |
|---|---|
| **Onaylama/reddetme** | Üye katılım kontrolü (bkz. Bölüm 4) — kalite kapısı |
| **Davet etme** | Yeni mentör/menti çağır — havuzu büyüt |
| **Dürtme** | Pasif üyeye hatırlatma. **Hem otomatik (sistem) hem elle (yönetici).** |
| **Üye çıkarma/engelleme** | Kendi kurumundan. **LOGLU (denetim izi).** Admin ile paylaşımlı yetki. |
| **Yönetici atama** | Başka birini yönetici yap — yükü paylaş. (Son-admin guard: son yönetici çıkarılamaz.) |

### ❌ Yönetici YAPAMAZ (bilinçli sınır)
| Kısıt | Gerekçe |
|---|---|
| **Elle eşleştirme YOK** | Eşleştirme TAMAMEN algoritma. Yönetici sadece SONUCU görür, karışmaz. |
|  | Gerekçe: (1) DISC algoritması bizim farkımız — baypas edilmemeli. (2) Torpil/adaletsizlik önlenir. |
| **Başka tenant'ın verisi** | Tenant izolasyonu — asla. |
| **Sistem geneli ayarlar** | Platform admin katmanı. |

---

## 4. ÜYE KATILIM MODELİ (açık kapı YOK — hep yönetici kontrolü)

Rastgele kimse giremez. İki davet-bazlı yol:

### Yol A — Davet + yönetici onayı ("hayalet mod")
1. Yönetici davet linki gönderir.
2. Kişi tüm aşamaları tamamlar (kayıt + DISC + profil).
3. Yönetici onaylayana kadar **HAYALET/PASİF mod** — sistemde var ama havuzda görünmez, eşleşmez.
4. Yönetici onaylar → aktifleşir, havuza girer.
→ Kullanım: "tanımadığım biri geldi, önce bakayım."

### Yol B — Ön-tanımlı davet (otomatik onay)
1. Yönetici önceden "şu kişi şu bilgilerle gelecek" diye tanımlar.
2. Kişi o bilgilerle kayıt olunca sistem **OTOMATİK onaylar** (yönetici zaten önden tanıdı).
→ Kullanım: "bu kişiyi zaten tanıyorum, beni uğraştırma."

**Ortak ilke:** Her iki yolda da açık kapı yok — hep bir yönetici kontrolü/güveni var.
Bu, kalite + güvenlik (KVKK, sahte hesap önleme) için kritik.

---

## 5. SİSTEM AKIŞI (yönetici deneyimi — ideal)

1. **İlk giriş:** Boş liste DEĞİL — özet dashboard (program sağlığı) + varsa "aha".
2. **Günlük/haftalık iş:** Panele girer → uyarıları görür (mentörsüz menti, pasifler) →
   birkaç tıkla müdahale (davet, dürtme, onay). Uzun uğraş YOK.
3. **Dönemsel:** Toplam etkiyi görür → sponsora/kurula sunar.

---

## 6. DENETİM / GÜVENLİK NOTLARI

- **Engelleme/çıkarma LOGLU** — kim, kimi, ne zaman, neden. Keyfi/kötüye kullanım önlenir.
- **Tenant izolasyonu** — her aksiyon/görünüm kendi kurumuyla sınırlı (bugün 2 IDOR kapatıldı;
  yönetici panelinde de sıkı olmalı).
- **Yönetici atama/çıkarma** — son-admin guard (kurum yöneticisiz kalmasın).
- **Hayalet mod** — pasif üye havuzda görünmez, eşleşmez, PII sızmaz.

---

## 7. SONRAKİ ADIM (metodoloji)

1. **Kıyas:** Bu ideali, kod keşif raporuyla (stk-yonetici-panel-envanteri) karşılaştır:
   "şu var, şu eksik, şu yarım".
2. **Karar:** Ne yapılabilir / ne yapılamaz / ne yapmamalıyız (ürün sahibi).
3. **Aksiyon planı:** Eksikleri önceliklendir → prompt(lar).
4. Sonra AYNI metodoloji: platform admin → (mentör/menti mevcut-kıyas).

---
*STK yönetici stratejisi (ideal). Kardeş: yonetici-persona-ve-metrikler (persona/metrik derinliği).
Kıyas bekliyor: stk-yonetici-panel-envanteri (kod keşfi).*

---

## KOD DOĞRULAMA NOTU (2026-08-05)
> Gövdedeki "kodda VAR/YOK" iddiaları gerçek koda karşı doğrulandı (dosya:satır). Gövde tarihsel korundu; yalnız isim nötrlendi + bu not eklendi.

### ✅ Doğrulanan (kod gerçekten öyle)
- **Elle eşleştirme YOK** (Bölüm 3) — admin route'larında elle eşleştirme/pairing endpoint'i yok; yalnız GET `/api/admin/matches` (görüntüleme, `routes/adminRoutes.ts:49`), `/users/:id/rematch` (algoritma yeniden koşumu, `:54`), `block-pair` (bir eşleşmeyi engeller, `routes/adminSettingsRoutes.ts:18`). Eşleştirme algoritmik: `services/matching.ts` `rankMentisForMentor`.
- **Onay/davet/dürtme/yönetici-atama VAR** (Bölüm 3) — approveUser/rejectUser (`routes/adminRoutes.ts:51-52`), createInvitation (`routes/selfServeRoutes.ts:24`), nudgeUser (`routes/adminRoutes.ts:56`), promote/demote-admin (`:84-85`).
- **Son-admin guard** (Bölüm 3, 6) — `controllers/adminController.ts:744-748`: son aktif admin düşürülemez (`SON_ADMIN` hatası).
- **Üye çıkarma/engelleme + LOGLU** (Bölüm 3, 6) — rejectUser `isActive:false` + `logger.info('SYSTEM', ...)` (`controllers/adminController.ts:624,627`); ayrıca block-pair eşleşme engelleme (`controllers/adminSettingsController.ts:128`). (Loglama SystemLog/logger üzerinden; ayrı denetim tablosu değil.)

### ⚠️ YANLIŞ / EKSİK (belge diyor ama kod farklı)
- **Hayalet mod "havuzda görünmez" KISMEN uygulanmış** (Bölüm 4) — onay kapısı VAR (register `approvalStatus:'PENDING'`, `controllers/authController.ts:159`; approve/reject). Mentör→menti yönü doğru filtreli: menti adayları `approvalStatus:'APPROVED'` süzülüyor (`services/matching.ts:132`) → onaysız menti mentöre görünmez. **AMA** menti→mentör havuzu (`listUsers`, `controllers/userController.ts` where = tenantId+role+isActive) approvalStatus **filtrelemiyor**; register `isActive`'i set etmiyor → schema default `true`. Sonuç: **onaysız (PENDING) bir mentör, menti'nin havuzunda görünür/talep alabilir** → "havuzda görünmez" bu yönde tam değil. (Follow-up adayı: `listUsers` where'ine `approvalStatus:'APPROVED'`.)
  - **(Güncelleme 2026-08-05: DÜZELTİLDİ → PR #31, commit `be295e2`.** `listUsers` where'ine `approvalStatus:'APPROVED'` eklendi (rol-bağımsız); PENDING üye artık peer havuzunda görünmüyor. Test: `listusers-approval-filter.test.ts`. CI yeşil.)

### ❓ Teyit edilemeyen
- **Yol B — ön-tanımlı davet OTOMATİK onay** (Bölüm 4) — davet altyapısı (InvitationTemplate + `/invitations/:token/join`) var, ama "kayıt olunca sistem OTOMATİK onaylar" davranışı kodda net konumlanmadı → teyit gerek.
