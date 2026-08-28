# PLATFORM ADMIN PANELİ — STRATEJİ (İDEAL TASARIM)
**📸 DONDURULMUŞ (2026-08-02)** — o günün keşif fotoğrafı, güncellenmez; güncel durum: `09-DURUM.md`
**Tarih:** 2026-08-02 · **Amaç:** Platform admin (sistem sahibi = ürün sahibi) panelinin OLMASI GEREKEN hâli
**Kardeş belge:** `stk-yonetici-strateji.md` (tenant admin — kendi kurumunu yöneten)
**Yöntem:** Önce ideal (bu belge) → kod keşfiyle kıyas → aksiyon planı.
**Durum:** Strateji ✅ · Kıyas ✅ (platform-admin-panel-envanteri) · Aksiyon ✅ (KVKK turu yapıldı).

---

## 0. PLATFORM ADMIN KİM? (kapsam + STK yöneticisinden fark)

**Platform admin = ürün sahibi, sistemin sahibi.** Tüm sistemi yönetir.

| | STK YÖNETİCİ (tenant admin) | PLATFORM ADMIN (sistem sahibi) |
|---|---|---|
| Kapsam | TEK kurum | TÜM sistem |
| Auth | tenant admin (`/admin`) | ayrı katman (`/platform`, `isPlatformAdmin`) |
| Görür | Kendi kurumunun verisi | Tüm kurumlar + sistem sağlığı + kötüye kullanım |
| İzole kural | Tenant izolasyonu (başkasını göremez) | Tam görünürlük AMA loglu (mahremiyet) |

**İki katman kesinlikle ayrı** — auth, route, yetki farklı. Karıştırılmaz.

---

## 1. YETKİ FELSEFESİ: "BASİT YÜZEY + DERİN ARKA ODA"

Ürün sahibi kararı: **Tam görünürlük** (istenirse her kurumun içine, en detaya kadar inilebilir)
AMA **basit arayüz** (günlük bakışta sade, sakin; karmaşa yok).

- **Üst katman:** Sade dashboard — birkaç önemli şey. Her gün buna bakılır.
- **Derinlik:** İstenince tıkla-tıkla en dibe (kurum → kullanıcı → görüşme).
- **Kural:** Derinlik yüzeyi KİRLETMEZ — istenince ortaya çıkar, sürekli önde durmaz.
- **Sınır:** Tam yetki var ama **sorumlu kullanım** — hassas veriye/kuruma inmek LOGLANIR (KVKK).

(Bu, STK panelindeki "özet → drill-down" prensibinin platform ölçeğidir. Tutarlı tasarım dili.)

---

## 2. GÖRMEK — BASİT YÜZEY (4 blok)

### A · Büyüme nabzı
- Kaç kurum (aktif / bekleyen / dondurulmuş) · kaç kullanıcı (toplam + rol dağılımı).
- Bu ay artış (yeni kurum + yeni kullanıcı) · ivme (↑/↓).
- **Aktiflik:** lastLoginAt verisiyle sistem-geneli aktif/pasif oranı.

### B · Sistem sağlığı
- Genel durum göstergesi (yeşil/kırmızı): sistem ayakta mı, mail (Resend) gidiyor mu, DB sağlıklı mı.
- **Hata/log görünürlüğü** — özet yüzeyde, son kritik hatalar "derin arka oda"da (tıklayınca).

### C · Kötüye kullanım alarmı (çift kaynak)
- **Otomatik tespit** (sistem anormalliği) **+ kullanıcı şikayeti** (report).
- Yüzeyde "dikkat gereken N durum" → tıkla → detay.

### D · Kurum listesi (drill-down kapısı)
- Hangi kurum aktif / ölü / onay bekliyor.
- Tıkla → kurum içi (üye, eşleşme, aktivite) → tıkla → tek kullanıcı → en dibe.
- ⚠️ Kurum içine her iniş LOGLANIR (KVKK — "kim, ne zaman, neye baktı").

---

## 3. YÖNETMEK — KRİTİK KONTROLLER (kapıcı)

| Aksiyon | Not |
|---|---|
| **Kurum onaylama/reddetme** | Kapıcı — kim sisteme kurum olarak girer. |
| **Kurum dondurma/silme** | Yaşam döngüsü kontrolü ürün sahibinde. Silme geri-alınamaz → loglu. |
| **Kötüye kullanıma müdahale** | Şüpheli kurumu/kullanıcıyı dondur (şikayet + otomatik tespit kaynaklı). |
| **Platform seviyesi ayarlar** | Sistem geneli konfigürasyon. |
| **Kurum içine inme (destek/şüphe)** | Tek kullanıcı/görüşme detayına erişim — **LOGLU** (mahremiyet). |

---

## 4. KORUMAK — GÜVENLİK + MAHREMİYET DENGESİ

- **KVKK audit log:** Platform admin her şeyi görebilir ama hassas erişim (kurum içi, PII/DISC,
  dondurma/silme) LOGLANIR — "kim, ne zaman, ne yaptı". Log İÇERİĞİ hassas veri tutmaz
  (ne yapıldığını kaydeder, DISC/PII değerini DEĞİL). → Bu aksiyon turunda yapıldı ✅.
- **Kötüye kullanım tespiti:** otomatik anormallik + kullanıcı şikayeti (report) birlikte.
- **Sistem sağlığı:** hata logları görünür, kritik olanlar öne çıkar.

---

## 5. SİSTEM AKIŞI (ideal deneyim)

1. **İlk giriş:** Sade dashboard — büyüme + sağlık + dikkat gereken durumlar (kaç onay bekliyor,
   kaç şüphe). Karmaşa yok.
2. **Günlük:** Bakar → "her şey yolunda" görür ya da "3 kurum onay bekliyor / 1 şüphe var" →
   birkaç tıkla halleder.
3. **Gerekince:** Bir soruna iner (kurum → kullanıcı → detay). Derinlik hazır ama zorunlu değil.
   Her iniş loglanır.

---

## 6. STK KIYASINDAN GELEN ORTAK VERİLER (iki kez yapmama notu)

- **lastLoginAt:** STK için tenant-scoped eklendi; platform sistem-geneli aktiflik için de kullanır.
- **Drill-down:** STK'da özet→kişi yapıldı; platform'da kurum→kullanıcı benzer mantık.
- **Denetim-log deseni:** nudge/engelleme logu → platform KVKK audit log aynı deseni kullandı.

---

## 7. AKSİYON DURUMU (bu strateji ne kadar hayata geçti?)

Platform admin aksiyon turu yapıldı:
- ✅ **KVKK audit log** (~~[ESKİ · düzeltildi 2026-08-14] AdminAuditLog tablosu — migration, onaylı~~ → **gerçek: `SystemLog` modeline AUDIT kategorisiyle yazılır**, ayrı tablo/migration YOK — grep 2026-08-28 teyitli) — Bölüm 4.
  - **⚠️ GÜNCELLEME (2026-08-14):** Kodda `AdminAuditLog` tablosu YOK; denetim kaydı mevcut `SystemLog` modeline AUDIT kategorisiyle yazılıyor (`platformAudit.ts`). "AdminAuditLog tablosu/migration" ifadesi YANLIŞ — loglama çalışıyor ama tablo adı hatalı. Detay: aşağıda "⚠️ YANLIŞ / EKSİK" bölümü.
- ✅ **Kötüye kullanım** (kullanıcı şikayeti/report + basit otomatik tespit) — Bölüm 2C.
- ✅ **Sistem sağlığı paneli** (özet + son hatalar) — Bölüm 2B.

**Temeli sağlamdı** (ayrı katman + kurum yaşam döngüsü zaten vardı); eksikler güvenlik/gözlem
tarafındaydı ve kapatıldı. Kalan: otomatik tespit derinleştirme (v1 basit kural kondu),
sistem-geneli metriklerin zenginleştirilmesi.

---

## 8. SONRAKİ ADIM

1. **Kalan incelikler:** otomatik kötüye kullanım tespitini güçlendir (v1 → v2), sistem-geneli
   büyüme/aktiflik metriklerini zenginleştir.
2. **Diğer roller:** aynı metodoloji mentör/menti için (kıyas + aksiyon).
3. **Merge turu** — bu turun commit'leri dahil, canlıya çıkış (ürün sahibi kararı, CI yeşilse).

---
*Platform admin stratejisi (ideal + aksiyon durumu). Kardeş: stk-yonetici-strateji.
Kıyas: platform-admin-panel-envanteri. Aksiyon: KVKK/kötüye-kullanım/sağlık turu (yapıldı).*

---

## KOD DOĞRULAMA NOTU (2026-08-05)
> Gövdedeki iddialar gerçek koda karşı doğrulandı (dosya:satır). Gövde tarihsel korundu; yalnız isim nötrlendi + bu not eklendi.

### ✅ Doğrulanan (kod gerçekten öyle)
- **Ayrı katman (`/platform`, `isPlatformAdmin`)** (Bölüm 0) — `routes/platformRoutes.ts` + `middleware/platformAuth.ts` (requirePlatformAdmin); platform JWT `aud:'platform'` + `isPlatformAdmin` claim (`controllers/platformTenantController.ts:6`). Not: `isPlatformAdmin` bir TOKEN claim'i, User tablosunda sütun DEĞİL.
- **Kurum yaşam döngüsü — onay/dondur VAR** (Bölüm 3) — approveTenant (`controllers/platformController.ts:236`), rejectTenant (`:252`), freezeTenant `isActive:false` (`:273`), activateTenant (`:283`); route'lar `routes/platformRoutes.ts:49-52`.
- **Kötüye kullanım (report + otomatik tespit) + sistem sağlığı** (Bölüm 2C, 2B, 7) — listUserReports/reviewUserReport (`controllers/platformController.ts:325,361`), getAnomalies (`:378`), getPlatformHealth (`:131`).
- **KVKK erişim loglama fonksiyonel** (Bölüm 4, 7) — `services/platformAudit.ts` `auditPlatformAction`; kurum-derin görünüm handler'ları veriyi göndermeden ÖNCE AUDIT yazıyor (`controllers/platformTenantController.ts:12,131,206,243,273`).

### ⚠️ YANLIŞ / EKSİK (belge diyor ama kod farklı)
- **"AdminAuditLog tablosu (migration, onaylı)" iddiası YANLIŞ** (Bölüm 4, 7) — kodda `AdminAuditLog` modeli/tablosu/migration'ı **YOK**. Denetim, mevcut **`SystemLog`** modeline (`prisma/schema.prisma:569`) AUDIT kategorisiyle yazılıyor; `services/platformAudit.ts:9` açıkça "ayrı tablo/migration gerekmez" diyor. → Loglama fonksiyonu DOĞRU ve çalışıyor, ama iddia edilen **tablo adı/migration YANLIŞ** (yeni tablo yaratılmadı).
- **Kurum "silme" (hard delete) YOK** (Bölüm 3) — platform route'larında yalnız approve/reject/freeze/activate var (`routes/platformRoutes.ts:49-52`); kalıcı silme endpoint'i yok. "Silme" pratikte **freeze (isActive:false, soft/geri-alınabilir)** ile karşılanıyor; geri-alınamaz hard-delete uygulanmamış.

### ❓ Teyit edilemeyen
- Yok — ana iddialar ✅ veya ⚠️ olarak net sonuçlandı.
