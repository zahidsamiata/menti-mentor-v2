> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ) · kapılar 4 renk (Bölüm 7).

**Son güncelleme:** 2026-10-27 (2. oturum) · çatı main `33523a2` · backend main `6917448` (= çatı pointer)

**Durum:** ÇALIŞIYOR. Oturum PO'nun Windows bilgisayarında (Cursor): Node 24 (CI/canlı 22 — kanıt CI), gh girişli, Python 3.15 (`py`). ⚠️ Bu bilgisayarda bekçi için iki ortam ayarı gerekiyor: (1) `python3` → `py` kısayolu (PATH başı), (2) bekçinin öz-testleri (`belge-bekci.test.sh`) Windows'ta 4-5 vakada düşüyor — Git Bash grep 3.0 emoji eşleştiremiyor ve Python yolları `\` ile yazıyor; ortamsal, CI'da (Linux) aynı testler yeşil. Bu yüzden `npm run verify` burada bekçi adımında kırmızı; diğer adımlar tek tek koşuluyor (tsc · tsc-test · eslint · birim · fe tsc · vitest · build), bekçinin repo denetimi ayrıca koşuyor (HATA yok).

**Şu an yapılan:** ara TUR ÖZETİ yazıldı (02-ILERLEME başı); sıradaki PN-06. 🔵 PO bekleyen: → U-12B (KARAR-144) · → U-13C (KARAR-145).

**Sıradaki 5 iş (§ AŞAMA PN öncelik sırası):** PN-06 (arketip eşikleri → ana + yakın tip, matching 7b) → PN-03 → PS-03 → I-12 → PN-01.

**Son merge'ler:** AN-50 + AN-10 — backend #323 + çatı #496 (`33523a2`; canlı yeniden başladı, ok:true db:up, site 200) · U-15 — #317 + #493 (`8d6fec3`) · Y1-B8 — #313 + #491 (`7d53871`) · U-13 — #315 + #492 (`7a15fcc`) · U-12 — #312 + #490 (`3004219`).

**PO bekleyen hazır PR'lar (hepsi 7b ONAY):**
- 🔵 E-4 karantina — backend #289 + çatı #474 · **KARAR-134**
- 🔵 ⛔ I-08 günlük deneme — backend #291 + çatı #476 · **KARAR-135** (+ KARAR-136 soru)
- 🔵 ⛔ P-08 yolculuk ilerlemesi — backend #293 + çatı #479 · **KARAR-137**
- 🔵 ⛔ AN-36 kurum yasal bilgileri — backend #300 + çatı #484 · **KARAR-139** (⚠️ #484 pointer merge öncesi main HEAD'e)
- 🔵 ⛔ AN-27 zaman önerisi mesajı — backend #309 + çatı #487 · **KARAR-140**
- 🔵 ⛔ AN-29 topluluk tipi kurum — backend #310 + çatı #489 · **KARAR-142** (yedek Tenant; 6 PO sorusu kartta)
- 🔵 ⛔ AJ-111 gevşetme oranı — backend #307 + çatı #486 · **KARAR-141** (yeni tablo, yedek gerekmez)
- 🟡 DK-03 iz kaydı (#286/#472) · DK-01 Sentry (#290/#475) · AN-41 KVKK paket (#477) · AJ-91 panel metinleri (#478) · AJ-123 bekleme sayfası metni (#481)
- Ürün sorusu: **KARAR-138** (dışa aktarmada başkasının yazdıkları, KVKK)
- ⚠️ Birden çok migration PR'ı merge sırası: her merge öncesi ilgili tablo yedeği; I-08 + P-08 ortak TenantMembership yedeği yeter; AN-27 Message; AN-36 + AN-29 ortak Tenant yedeği yeter.


**Açık PR'lar:**
| PR | İş | CI | İnceleme | Neden açık |
|---|---|---|---|---|
| backend #319 + çatı #494 | U-12B davet iptal · 🔵 ⛔ MIGRATION | bekliyor | ✅ ONAY | **KARAR-144** EVET (yedek gerekmez) |
| backend #320 + çatı #495 | U-13C rol tarihçesi · 🔵 ⛔ MIGRATION | bekliyor | ✅ ONAY | **KARAR-145** EVET (yedek gerekmez) |
| backend #227 + çatı #420 | AJ-77 13 durum alanı enum · 🔵 ⛔ MIGRATION | yeşil (#420 main gerisinde) | ✅ ONAY | KARAR-128 EVET + §3b sayım + 5 tablo yedeği (DB erişimi) |
| backend #212 | AJ-50 ham DISC kart temizliği · 🔵 | yeşil | ✅ ONAY | KARAR-116 EVET + yedek (DB erişimi) |
| backend #164 + çatı #343 | Y1-B8 OAuth onay kapısı (güvenlik) | CONFLICTING (2026-09-29) | SORUN VAR (ürün) | KARAR-101 ✅ B genişletilmiş + EK — kuyrukta Y1-B8 (§ AŞAMA PN, 1. sıra); yeni dalda yeniden yazılacak, yeni PR açılınca bu ikisi kapatılır |
| backend #157 + çatı #337 | AN-26 hatırlatma · 🔵 ⛔ | CONFLICTING | ✅ | KARAR-98 |
| backend #148 + çatı #326 | U-18 mesaj talebi reddi · 🔵 ⛔ | CONFLICTING | ✅ | KARAR-97 |
| backend #142 + çatı #320 | AN-30 granüler rıza · 🔵 ⛔ · çıkış blokeri | CONFLICTING | ✅ | KARAR-96 |
| backend #160 | AN-02 seed metni · 🔵 | yeşil | — | KARAR-99 |
| backend #185 | AN-52-1 anket tablosu · 🔵 ⛔ | yeşil | ✅ | KARAR-106 |
| backend #186 + çatı #370 | AN-12 karantina · 🔵 | yeşil | ✅ | KARAR-107 |
| backend #189 + çatı #374 | K-15 müsaitlik tür+süre · 🔵 ⛔ | yeşil | ✅ | KARAR-111 + yedek |
| backend #289 + çatı #474 | E-4 karantina · 🔵 | yeşil | ✅ ONAY | KARAR-134 EVET |
| backend #286 + çatı #472 | DK-03 platform iz kaydı · 🟡 KVKK | yeşil | ✅ ONAY (2 tur) | satır notu: merge yok |
| çatı #110 | ⛔ MERGE ETME (analytics/çerez) | — | — | kalıcı kural |


**Push edilmemiş iş:** yok. **Stash:** yok. **Worktree:** yok.

**Engeller:**
- ✅ ORTAM çözüldü (2. oturum, 2026-10-27): node · gh · py var; bekçi lokalde koştu (HATA yok, 33 UYARI — boyut eşikleri + bilinen "kısmen" satırları).
- 🗄️ Tek seferlik DB erişimi gerekiyor: AJ-77 (§3b sayım + 5 tablo yedeği) · AJ-50 · K-15 · Y-05 (EXPLAIN) · 🔵 EVET gelirse yedek: AN-30 · U-18 · AN-26 · AN-02. (DATABASE_URL bu bilgisayarda yok ve kurulmaz — K8.3.)

**PO'ya sorular:** 🔵 KARAR-145 (U-13C rol tarihçesi tablosu, yedek gerekmez) · 🔵 KARAR-144 (U-12B davet linki iptal tablosu, yedek gerekmez) · KARAR-89 (NPS hangi kutuya — ajan önerisi kartta; PN-10 · PN-11 bekliyor) · 🔵 EVET/HAYIR: KARAR-134 · 135 · 137 · 139 · 140 · 141 · 142 · 96 · 97 · 98 · 99 · 106 · 107 · 111 · 116 · 128 · ürün: KARAR-136 · 138 · toplu paket: `docs/otonom/KARAR-PAKETI.md` (⚠️ paket 2026-10-21 cevaplarından önce yazıldı; 9 kart artık ✅).

**Strateji katmanına not:** (YENİ 2026-10-27) KARAR-83: kartın C seçeneği "yalnız platform yöneticisi" iken CEVAP metni C'yi "rol tarihçesi" olarak tanımlıyor → CEVAP metni uygulandı (U-13C). PO farklı niyetliyse kartı düzeltsin. · AŞAMA PN satırları 5c-n "geri dönüş yeri" yerine PN bölümüne alındı (PO md.4 "öne al") — bekçi (i2)/(n) bu sapmayı uyarırsa gerekçe budur. · I-18/IC-13 IPTAL(PO) aktif kuyrukta (PN bölümü sonu) duruyor; arşiv yeri (bitti arşivi IPTAL satırı almıyor) bir sonraki belge turunda netleşir. · Önceki notlar: (000) AJ-113 7b notu: randevu ucu mentörün onay durumuna (approvalStatus) bakmıyor — KARAR-101 (onay bekleyen kullanıcı) ile birlikte ele alınmalı. (00) AJ-99 7b notu: `GET /api/feedback-logs` mentöre kendi FeedbackLog kayıtlarını ham puan + menti adıyla döndürüyor; bugün FeedbackLog'a menti yazmıyor → risk yok, ama KARAR-12 "B" seçilirse (menti yazarsa) liste ucu k-anonimlik maskesini aşar — KARAR-12 cevabında dikkate alınmalı. (0) İŞ 2 teyit listesi (#455): G7-10 "mobil" ayağı AJ-86 ölçütünde yok · G7-14 "sanallaştırma" kodda yok (AJ-83 sayfalama yaptı) — ikisi de 🟨, bitip bitmediği PO/strateji teyidi · 7b notu: Y3 (00-KARAR-TAKIP) PDF/Excel biçimi istenirse ayrı iş. İŞ 2 CI: bekçi mevcut docs-guard job'unda koşuyor, iş akışı dosyası değişmedi.  (1) Bekçi (i5) E-5 uyarısı bilinçli: KARAR-11 ✅ ama gerçek silme PO ikinci onayı + karantina turu bekliyor. (2) 00-KUYRUK 116 KB > 90 KB eşiği — kalan uzunluk AJ-96…111 yeni satırlarından ve gerekçeli uzun satırlardan (AJ-68 kısmen). (3) 🔵 PR'ların 4'ü main ile çakışıyor — EVET gelince rebase gerekir. (4) Paylaşılan backend `.gitignore` artık `node_modules` sembolik bağını da yakalıyor (AJ-69 dersi).

**Karar kilidi tablosu:** cevapsız 113 kart — sıralı liste `01-KARARLAR.md` § ⬜ / ✍️ ve `00-KUYRUK.md` § 🔴 KİLİT HARİTASI (en çok kilitleyen: KARAR-80 bağları, KARAR-46 (4 iş), KARAR numarasız (4 iş), KARAR-58 · 89 (2+ iş)).
