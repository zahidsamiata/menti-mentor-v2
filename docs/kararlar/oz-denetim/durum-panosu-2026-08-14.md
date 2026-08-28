# 🎛️ DURUM PANOSU — Kararlar Tek Bakışta

**📸 DONDURULMUŞ** (2026-08-14 anlık görüntüsü) · **Son güncelleme:** 2026-08-14
> ⚠️ GÜNCELLEME (2026-08-28, G9-06): Üst-etiket 🔄 YAŞAYAN → 📸 DONDURULMUŞ'a çevrildi — pano 2026-08-14'ten beri güncellenmedi (~14 gün), "yaşayan" iddiası bayattı (KURAL 12 tazelik). Güncel karar durumu için `docs/kararlar/00-KARAR-TAKIP.md` canonical'dır. İçerik değiştirilmedi; yalnız etiket dürüstleştirildi.

> **Kaynak:** `00-karar-statu-haritasi-2026-08-14.md` (📸 dondurulmuş ham harita). **Bu pano onun görsel özetidir**
> — yeni bilgi/keşif ÜRETMEZ, sadece tarayabilir tek-bakışa çevirir. **Kod ilerledikçe bu pano güncellenir** (🔄).
> Dosya:satır kanıtı ve tam gerekçe için ham haritaya bak. Bu pano **önceliklendirme yapmaz** (o ayrı tur: v1/v2).

---

## 1) TEPE ÖZET

**Lejant:** 🟩 tam bitti (canlıda) · 🟨 arka var/ön yok (az işle kazanç) · 🟧 yarım · 🟥 hiç başlanmadı ·
🔵 bilinçli bekliyor (boşluk değil) · ⬜ kod-dışı (strateji/politika/manuel) · ❓ belirsiz (teyit) · ❌ çelişki.

| Statü | Sayı | Ne demek |
|---|---:|---|
| 🟩 TAM BİTTİ | **31** | backend+ön yüz+canlı çalışıyor |
| 🟨 ARKA VAR / ÖN YOK ★ | **14** | backend hazır, kullanıcı göremiyor → az işle kazanç |
| 🟧 YARIM KALDI | **3** | başlanmış, bitmemiş |
| 🟥 HİÇ BAŞLANMADI | **18** | karar var, kod yok |
| 🔵 BİLİNÇLİ BEKLİYOR | **7** | ileri-faz/Katman/kasıtlı ertelenmiş |
| ⬜ KOD-DIŞI | **10** | strateji/politika/PO-manuel/altyapı |
| ❓ BELİRSİZ | **9** | statü net değil → PO teyidi |
| ❌ ÇELİŞKİ | **0** | (tek çelişki — 2 IDOR — ✅ çözüldü: korumalı) |
| **TOPLAM** | **92** | (statü satırı; ~10'u çapraz-referans, bkz. not) |

> **★ Hızlı okuma:** Toplam **92 karar/madde**; **31'i canlıda çalışıyor**, **17'si az işle kazanç** (🟨 14 + 🟧 3),
> **18'i hiç başlanmadı**, **7'si bilinçli beklemede**. Tek güvenlik çelişkisi (IDOR) çözüldü.
>
> **Sayım notu (dürüstlük):** 92, ham haritadaki **statü satırı** sayısıdır. Bunların ~10'u **çapraz-referanstır**
> (aynı karar iki kümede görünür — ör. tasarım kararları hem KÜME 4 hem "13 admin bulgusu" KÜME 5'te). Benzersiz
> karar ≈ 82. Kategori toplamları satır bazında tutarlıdır (31+14+3+18+7+10+9 = 92).

---

## 2) ★ AZ İŞLE KAZANÇ (🟨 + 🟧) — önce buraya bak
> Backend hazır / yarım; kullanıcıya çıkması küçük-orta iş. İş boyu (S/M/L) ham harita kanıtından tahmin — emin değilse "?".

| # | Madde | Ne var / ne eksik | İş | Statü |
|---|---|---|---|---|
| 1 | **K2 — OAuth `kvkkConsentAt`** | local/self-serve set ediyor; OAuth etmiyor (NULL) | **S** | 🟧 |
| 2 | **Sunucu konumu beyanı (K5)** | veri sorumlusu metni var; hosting konumu yok | **S** | 🟨 |
| 3 | **ThemeToggle admin/platform nav** | menti/mentör'de var; admin/platform'da yok | **S** | 🟨 |
| 4 | **SJT/scoring endpoint'leri** | backend route hazır; FE çağrısı yok | **M** (veya sil) | 🟨 |
| 5 | **"Neden uyumlu" L1 (KARAR 7)** | backend `compatibilityReason` üretiyor; FE tip+kart eksik | **S-M** | 🟨 |
| 6 | **Onay paneli bildirim maili** | mail altyapısı hazır; onay/ret maili bağlanmadı | **S-M** | 🟨 |
| 7 | **md.6 Algoritma Kalibrasyon** | sayfa var; ağırlık (0.60/0.40) UI'ı yok | **M** | 🟧 |
| 8 | **DISC asimetri (KARAR 5)** | yüzde gizli ✓; menti→mentör tip gizleme backend'de kanıtlanamadı | **M** ⚠️güvenlik | 🟨 |
| 9 | **Mentör görünürlük opt-in ekranı (7a)** | backend + tablo var; FE ekranı belirsiz | **M?** | 🟨 |
| 10 | **Soru cevap-tipi seçimi (md.10)** | soru formu var; şıklı/açık-uçlu seçimi ayrı | **M?** | 🟨 |
| 11 | **Havuz KART görünümü (KARAR 2 · =md.5)** | backend veri var; FE hâlâ tablo | **L** | 🟨 |
| 12 | **Sektör/etiket havuzu (KARAR 12 · =md.12)** | seed'de etiket var; admin-yönetilir tablo yok | **L** (keşif+PO) | 🟨 |
| 13 | **Sektör skoru servisi** | 5-bileşen yazılı; canlı yola bağlı değil | **L** (⚠️staging şart) | 🟨 |
| 14 | **Push bildirim (Expo/FCM)** | stub `sent:true`; in-app/e-posta idare ediyor | **L** (bilinçli ertelenebilir) | 🟧 |

> **Not:** 17 satır → 3'ü çapraz-ref (md.5=KARAR 2, md.12=KARAR 12; +bir) → **14 benzersiz madde.** En düşük maliyet: #1–3 (S).

---

## 3) TAM STATÜ TABLOSU (tarayabilir — detay için ham harita)

### KÜME 1 — Vizyon · Mimari · Psikometri
| Karar | Statü | Plan | Not |
|---|:--:|:--:|---|
| DISC/mizaç eşleştirme · multi-tenant · anti-toksik hard-gate | 🟩 | — | çekirdek, canlı |
| DISC→OCEAN · 8 arketip · SJT · formül (0.60/0.40) · sertifika · fallback | 🟩 | — | canlı |
| Sektör skoru 5-bileşen servisi | 🟨 | VAR | yazılı ama canlı yola bağlı değil (staging şart) |
| certified/qualityMultiplier → TenantMembership | 🟩 | — | ❓ tüm okumalar oradan mı (K7) |
| Freemium · modül sırası | ⬜ | — | ❓ politika/PO |
| Erasmus iptal · UniClub→Sivilkapasite · fiyat | ⬜ | — | çelişki-çözüm kaydı |

### KÜME 2 — Güvenlik & KVKK
| Karar | Statü | Plan | Not |
|---|:--:|:--:|---|
| 5 katman tenant izolasyonu · DISC ham maskeleme · audit log | 🟩 | — | canlı |
| 2 IDOR | 🟩 | — | ✅ çözüldü (korumalı, `161ae00`) |
| K1 yasal metinler | 🟩 | VAR | ❓ hukukçu onayı (dış iş) |
| K2 OAuth kvkkConsentAt | 🟧 | VAR | ★ küçük backend fix |
| K5 veri sorumlusu + sunucu konumu | 🟨 | VAR | sorumlu var, konum yok |
| K3 eski kayıt consent politikası | ⬜ | VAR | ❓ karar (yeniden-rıza/bulk) |
| K4 yaş 18+ doğrulama | 🟥 | VAR | input+alan yok |
| K6 admin server-side guard | 🟥 | VAR | client-side only (savunma-derinliği) |
| Privacy center UI · DISC ayrı rıza · RLS lint | 🟥 | VAR | kodda yok |
| Sunucu/altyapı güvenliği (firewall/SSH/SSL) | ⬜ | — | ayrı tur, altyapı |

### KÜME 3 — Özellikler & Paneller
| Karar | Statü | Plan | Not |
|---|:--:|:--:|---|
| Chat v1 · mentör paneli · platform katmanı | 🟩 | — | canlı |
| Platform drill-down UI · KPI drill-down · sertifika panosu | 🟩 | VAR | ⚠️ eski "FE yok" idi → artık TAM |
| lastLoginAt KPI · fotoğraf upload · yönetici atama · havuz/branding | 🟩 | VAR | fotoğraf upload TAM (F1 bayat) |
| SJT/scoring endpoint'leri | 🟨 | — | ★ backend var/FE yok (bağla/sil PO) |
| Match DB persist · ön-tanımlı davet otomatik onay (Yol B) | ❓ | — | teyit gerek |

### KÜME 4 — Tasarım & UX (tasarim-kararlari 12 + landing)
| Karar | Statü | Plan | Not |
|---|:--:|:--:|---|
| KARAR 1 sol menü 4-grup (=md.2) | 🟥 | ~A | layout hâlâ 3+Gelişmiş |
| KARAR 3 durum rozeti · KARAR 4 sertifika rozeti · KARAR 11 DISC ikincil harf (=md.4) | 🟥 | ~A | render edilmiyor |
| KARAR 2 havuz kart (=md.5) · KARAR 7 neden-uyumlu · KARAR 12 etiket havuzu (=md.12) | 🟨 | ~A | ★ backend kısmen var, FE eksik |
| KARAR 5 DISC asimetri | 🟨 | — | ❓ ⚠️ PII/güvenlik teyidi |
| KARAR 6 otomatik onay | ❓ | ~F6 | davet→onay tetiği kodda yok |
| KARAR 8/9/10 (Katman 2/3, sektör kolonu) | 🔵 | — | bilinçli erteleme |
| F4 landing slogan | 🟥 | VAR | ❓ tam metin hazır, PO onayı |
| Dark/light tema altyapısı | 🟩 | — | canlı |
| ThemeToggle admin/platform · yumuşak lacivert + Landing UX | 🟨/🔵 | VAR | toggle kısmi; UX paketi canlı-sonrası |

### KÜME 5 — STK Admin 13 Bulgusu
| Bulgu | Statü | Plan | Not |
|---|:--:|:--:|---|
| md.1 şifre · md.7 yönetici atama · md.9 CORE/DEEPENING TR · md.8 soru görünürlük · md.13 sertifika konuları | 🟩 | VAR | #62 + doğrulandı |
| md.6 algoritma kalibrasyon | 🟧 | VAR | sayfa var, ağırlık UI yok |
| md.10 cevap tipi seçimi · md.12 etiket yönetimi (=KARAR 12) | 🟨 | VAR | ❓ |
| md.11 gereksiz dropdown | ❓ | VAR | minor UI |
| md.2 menü (=KARAR 1) · md.4 DISC ikincil (=KARAR 11) | 🟥 | VAR | koda geçmemiş |
| md.3 sektör kolonu (=KARAR 10) | 🔵 | VAR | canlı-sonrası |

### KÜME 6 — Algoritma · Altyapı · Denetimden Kurtarılanlar (F1–F7)
| Karar | Statü | Plan | Not |
|---|:--:|:--:|---|
| F1 foto upload · F2 platform drill-down · F7 KPI drill-down | 🟩 | VAR | ⚠️ **roadmap bayat** (kod TAM) |
| Sektör skoru bağla · onay paneli maili | 🟨 | VAR | backend hazır |
| Eşleştirmeyi birleştir · VisibilityOptIn DROP | 🔵 | VAR | staging/ayrı migration |
| Retention otomatik nudge · staging · ortam temizliği · F3 hard-delete · F4 slogan · F6 hayalet mod+CSV | 🟥 | VAR | başlanmadı (F3/F6 büyük+riskli) |
| super-admin/Taraf-1 · öğrenme yolculuğu uçları · F5 tetikleyici | ❓ | VAR | PO kararı/teyit |

### KÜME 7 — Unutulmuş Niyetler & PO Manuel
| Karar | Statü | Plan | Not |
|---|:--:|:--:|---|
| Chat testi · foto volume · metrik gözle · repo private | ⬜ | VAR (E) | PO manuel (foto volume: merge ÖNCESİ şart) |
| Bekleme salonu bildirim izni | 🟥 | VAR | `Notification.requestPermission` yok |
| Mentör opt-in ekranı | 🟨 | — | backend var, FE belirsiz |
| Push bildirim | 🟧 | — | stub (biliniyor) |
| STK iki-aha · persona fikirleri (ilk-aha/reddi yumuşat/emeği görünür) | ❓ | — | teyit gerek |
| `.env.backup` temizliği | ⬜ | — | ❓ PO |

---

## 4) DİKKAT KUTULARI

> 🔴 **GÜVENLİK TEYİDİ BEKLEYEN — KARAR 5 (DISC asimetrisi):** Menti, mentörün DISC tipini görmemeli.
> Yüzde hiç gösterilmiyor (✓) ama menti→mentör tip gizleme backend'de kanıtlanamadı. **PII/güvenlik teyidi ŞART**
> (DTO role-ayrışması; frontend gizleme yetmez). Kodlanmadan önce doğrulanmalı.

> ⚠️ **YOL HARİTASI BAYAT — F1/F2/F7 kod TAM:** Fotoğraf upload (F1), platform drill-down (F2), KPI drill-down (F7)
> **kodda bitmiş ve çalışıyor**; yol haritası hâlâ "yapılacak iş" sayıyor. **v1/v2 önceliklendirme turunda düzeltilmeli.**

> 🔵 **BİLİNÇLİ ERTELENENLER boşluk DEĞİL:** Katman 2/3 (KARAR 8/9), sektör kolonu (KARAR 10), eşleştirme birleştirme,
> VisibilityOptIn DROP — bunlar kasıtlı beklemede (ileri-faz/staging/migration). 🟥 "hiç başlanmadı" ile karıştırma.

> 📌 **Açık PR birikimi:** #65 (belge temizliği) · #66 (devir) · #67 (ham harita) · +bu (pano). Hepsi salt-docs;
> `00-INDEX.md`/`09-DURUM.md`'ye dokunuyor → merge'de ufak çakışma olabilir. **Öneri: eskiden yeniye sırayla merge**
> (#65→#66→#67→bu), her adımda 1-2 satır trivial conflict. **Merge kararı PO'da — bu tur merge YOK.**

---
> **Sıradaki (AYRI tur):** Yol haritası **v1/v2 önceliklendirme** — ürün sahibi v1/v2 çerçevesini verecek, sonra
> `10-yol-haritasi.md` bu panoya göre önem sırasına dizilecek. Bu pano önceliklendirme yapmaz.
