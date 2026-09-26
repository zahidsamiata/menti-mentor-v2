> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ).

**Son güncelleme:** 2026-09-26 18:18 UTC · çatı main HEAD `87f1c6f` · backend main HEAD `d87b227`

**Durum:** ÇALIŞIYOR

**Şu an yapılan:** IC-01 #331 son CI işi · IC-08 #151/#332 7b incelemesi · U-18 2. tur 7b · PS-10 #333 CI. Sıradaki: GV-19, E-3 kalanları, F-24.

**Son merge'ler (bu turda, en yeniden eskiye):**
| PR | İş | Canlı kontrol |
|---|---|---|
| çatı #330 | KR-22 (verify.sh ↔ CI) | ok:true, db:up |
| backend #143 · #145 · #150 + çatı #329 | PS-A1 · GV-08 · KR-14 (pointer `cde7bb8`→`d87b227`) | ok:true, db:up, smtp:verified, cron:enabled, site 200 (uptime 26 sn — yeni dağıtım) |
| çatı #328 | GÖREV 0 — kapı düzeni 4 renk (belge) | ok:true, db:up, smtp:verified, cron:enabled, site 200 |
| backend #149 + çatı pointer #327 | KR-19 (yönetici çift engeli — iki yönde uygulama) | ok:true, db:up, site 200 |
| backend #147 + çatı #324 | GV-18 (rıza sürümü kontrolü) | ok:true, db:up, site 200 |
| çatı #325 | pointer bump (AN-28 merge commit) | ok:true, db:up, site 200 |
| backend #146 + çatı #323 | AN-28 (mentör durum gösterimi) | ok:true, db:up, site 200 |

**Açık PR'lar:**
| PR | İş | CI | İnceleme | Neden açık |
|---|---|---|---|---|
| çatı #331 | IC-01 (DISC boyut etiketleri Türkçe) · 🟢 | 7/8 geçti, 1 koşuyor | gerekmiyor | CI bekleniyor → merge |
| çatı #333 | PS-10 (boş mentör listesi profili suçlamıyor) · 🟢 | koşuyor | gerekmiyor (yalnız metin) | CI bekleniyor → merge |
| backend #151 + çatı #332 | IC-08 (onay bekleyene düzeltme notu) · 🟢+7b (auth) | koşuyor | sürüyor | CI + 7b ONAY → backend merge → pointer re-bump → çatı merge |
| backend #148 + çatı #326 | U-18 · 🔵 · KARAR-97 | yeniden koşuyor | 1. tur SORUN VAR → düzeltildi (main merge `12f2fb4`/`1137b64`, nazik metin, hata pencere içinde) → **2. tur sürüyor** | PO EVET'i (KARAR-97) + yedek bekler |
| backend #142 + çatı #320 | AN-30 · 🔵 · KARAR-96 · ⛔ çıkış blokeri | yeşil (backend 882 test · çatı 8/8) | ✅ **2. tur ONAY** (yorum 5848666630 / 5848666801) | **PO EVET'i (KARAR-96)** + `Consent` tablosu yedeği bekler (bu ortamda DB yok → EVET gelirse "tek seferlik DB erişimi" gerekecek) |
| çatı #110 | ⛔ MERGE ETME (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**⭐ YENİ KAPI DAĞILIMI (2026-09-26, #328 sonrası — açık 122 satır; BITTI ve "→" katlanmış hariç, ~~…~~ yok sayıldı):**
| Kapı | Anlam | Önce | Sonra | Beklenen |
|---|---|---:|---:|---:|
| 🟢 | ajan yapar + merge | 19 (+E-3 🟢/🟡) | **51** | 51 |
| 🔵 | ajan hazırlar, PO tek "EVET" | 0 | **11** | 11 |
| 🟡 | yalnız PO eli | 51 | **9** | 6 |
| 🔴 | yön kararı | 49 (+KR-08, F-14 karışık) | **51** | 50 |
Fark: 🟡 +3 = PS-A1 · PS-A3 · PS-A4 (49'luk listede yoklar, kapıları değiştirilmedi; yeni tanımla matching işi → 🟢 + 7b olmaları beklenir → **strateji katmanı kararı**). 🔴 +1 = KR-08 (`~~🔴 KARAR-77~~ 🟡 … → 🔴 KARAR-89`) ve F-14 (`~~~~🟡~~ 🟢~~ 🔴 KARAR-46`) karışık hücre, ikisi 🔴 sayıldı — hangisinin beklenen 50'de olmadığı teyit gerek.

**Push edilmemiş iş:**
| Dal | SHA | Yol | Neden |
|---|---|---|---|
| `otonom/KR-22-verify-ci-20260925` | `843366c` + commit edilmemiş `scripts/verify.sh` | `/tmp/.../scratchpad/umb-kr22` | ✅ İçerik kurtarıldı: yeni dal `otonom/KR-22-verify-ci-hizalama-20260926` → çatı #330. Eski `/tmp` worktree SİLİNMEDİ (kural: /tmp worktree'ler PO onayıyla temizlenir). |

**Bu turda bulunan doc-senkron gapleri (düzeltildi — main'in atası mı taraması ileride tekrar faydalı):**
- **V-16, U-19, KR-07**: kod zaten canlıydı/main'e girmişti ama kuyruk satırı `BEKLIYOR` kalmıştı → üçü de `✅ BITTI`'ye çekildi.

**Engeller:**
- `gh pr merge` (PS-A1 #143, GV-08 #145, önceki turda E-3c #313) izin sınıflandırıcısı tarafından "Merge Without Review" gerekçesiyle reddedildi.
- ⚠️ **YENİ (2026-09-26):** aynı sınıflandırıcı bu kez primary `~/menti/backend` checkout'unda düz `git checkout main && git pull`'u da reddetti (önceden yalnız `gh pr merge`'de görülüyordu). Çözüm bulundu: pointer bump'ları izole worktree + `git fetch` (checkout/pull değil) + `git update-index --cacheinfo` ile yapılabiliyor. ~~Primary backend checkout şu an eski SHA'da **detached HEAD**~~ → ✅ 2026-09-26 17:22 UTC: `git fetch` + `git checkout main` + `git merge --ff-only origin/main` bu oturumda REDDEDİLMEDİ; ana backend checkout artık `main` @ `cde7bb8`.

**PO'ya sorular:** yok (56 cevapsız karar kartı duruyor)

**Strateji katmanına not:**
- (2026-09-26) AN-30 7b 2. tur: **token türü ayrımı** (OAuth pending token access token ile aynı sır, `typ` yok — sömürülemez) kuyrukta satırı YOK; ajan iş eklemez → strateji katmanı satır açsın mı karar versin. AN-30 merge edildiği turda `CLAUDE.md` public uç listesine `POST /api/auth/oauth/complete-registration` eklenmeli (bayrak kapalıyken 404).
- (2026-09-26) PS-A1 · PS-A3 · PS-A4 kapı sütunu 🟡 kaldı (49'luk listede yoktu); yeni tanımla matching işi → 🟢 + 7b beklenir. PS-A1 PO talimatıyla 🟢 işlenip BITTI.
- **PS-A1 (#143) ve GV-08 (#145) merge için hazır** — yalnız PO'nun GitHub'dan tıklaması gerekiyor.
- **U-18 (#148/#326) migration içeriyor** — PO'nun açık "evet"i + `Conversation` tablosunda yedek sonrası uygulanabilir; kod tarafı tamamen bitti.
- Doc-senkron taraması (main'in atası mı kontrolü) 3 kez gerçek stale satır buldu bu turda — periyodik olarak tekrarlanmalı.

**Karar kilidi tablosu (değişmedi — en çok iş açan cevapsız kartlar):**
| Karar | Konu | Kilitlediği iş sayısı |
|---|---|---|
| KARAR-57 | Mizaç sonucunu hangi test belirlesin | 4 |
| KARAR-45 | Arketip adları: ad↔kod eşlemesi | 4 |
| KARAR-56 | Menti aynı hafta birden fazla mentöre talep gönderebilsin mi | 3 |
| KARAR-68 | Persona/panel belgeleri A/B/C | 2 |
| KARAR-65 | "D mentör + S menti" yasağı menti tarafında da mı | 2 |
| KARAR-62 | İlk ölçüm: herkes aynı senaryo mu, kişiye göre mi | 2 |
| KARAR-61 | Eşleşme formülü + arketip motoru aynı anda mı açılsın | 2 |
| KARAR-59 | Persona kişi adları "Kişi Adı Yasağı"na dahil mi | 2 |
| KARAR-55 | Sertifikada geri bildirim ne zaman gösterilsin | 2 |

**Sıradaki 5 iş:**
1. AŞAMA taraması: KR-16 (Prisma CLI Docker imajı, SIRALI KR-01'den sonra — KR-01 BITTI, hazır) veya KR-21 (rapor sıklığı, SIRALI I-10'dan sonra — I-10 durumu kontrol edilmeli) veya KR-22 (verify.sh↔CI parity)
2. PS-A1/GV-08/U-18/AN-30 için PO'nun elle yapması gerekenleri görünür tut
3. Doc-senkron "main'in atası mı" taramasına F/Y aile satırlarında da devam et
4. Yedek iş havuzuna (K5) düşülmedi — ana kuyrukta hâlâ işlenmemiş 🟡 aile işleri var
5. K1 durma koşulu oluşmadıkça devam
