> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ) · kapılar 4 renk (Bölüm 7).

**Son güncelleme:** 2026-09-26 21:12 UTC · çatı main HEAD `3b190e0` · backend main HEAD `58d0b31` (= canlı pointer)

**Durum:** ÇALIŞIYOR (VPS oturumu · en fazla 2 şerit)

**Şu an yapılan:** Y1-B9b canlıda. Son takip (alt ajan): `canCrossTenantMatch` askı kuralı. Ardından tur kapanışı (belge senkronu + TUR ÖZETİ).

**Son merge'ler (bu oturum, en yeniden eskiye):**
| PR | İş | Canlı kontrol |
|---|---|---|
| backend #166 + çatı #345 | Y1-B9b (askıdaki kurum önerilerde yok, reapply kapalı) | ok:true, db:up, site 200 |
| backend #165 + çatı #344 | Y1-B9 (dondurulmuş/reddedilmiş kurum erişemez; KVKK hakları açık) | ok:true, db:up ×2, site 200 |
| backend #163 + çatı #342 | F-18 (KPI CSV dışa aktarımı) | ok:true, db:up, site 200 |
| backend #161 · #159 + çatı #341 | KR-16 (Prisma CLI imajda, yeni açılış komutu) · IC-12 | ok:true, db:up, site 200 (3 ardışık) |
| çatı #339 | AN-10 (mentör yazımı) | ok:true, db:up, site 200 |
| backend #156 · #158 + çatı #338 | Y-02 · IC-11 (pointer → `60715c7`) | ok:true, db:up, site 200 |
| backend #152 + çatı #335 | GV-19 (şifre değiştirme) + AN-09 (#155) | ok:true, db:up, site 200 |
| backend #153 · #154 + çatı #336 | PS-09 · KR-21 (pointer → `3f76c7b`) | ok:true, db:up, site 200 |
| çatı #334 | YN-13 (kişi adı) | belge işi |
| çatı #333 | PS-10 (boş mentör listesi profili suçlamıyor) | ok:true, db:up, site 200 |
| çatı #331 | IC-01 (DISC boyut etiketleri Türkçe) | ok:true, db:up, site 200 |
| çatı #330 | KR-22 (verify.sh ↔ CI) | ok:true, db:up |
| backend #143 · #145 · #150 + çatı #329 | PS-A1 · GV-08 · KR-14 | ok:true, db:up, site 200 |
| çatı #328 | GÖREV 0 — kapı düzeni 4 renk | ok:true, db:up, site 200 |

**Açık PR'lar:**
| PR | İş | CI | İnceleme | Neden açık |
|---|---|---|---|---|
| backend #157 + çatı #337 | AN-26 · 🔵 KARAR-98 (migration) | yeşil (941 test) | ✅ ONAY (2. tur) | PO EVET (+ alt soru: paylaşımlı havuzda kime) + `Conversation` yedeği |
| backend #164 + çatı #343 | Y1-B8 OAuth onay kapısı · 🟢+7b (auth) | yeşil | **SORUN VAR (ürün):** Bekleme Odası kimseye açılmaz | **KARAR-101** (A: olduğu gibi · B: bekleme odası açık, iç uçlar kapalı) |
| backend #162 + çatı #340 | P-05 görüşme reddinde nazik bildirim · kuyrukta 🔵 (içerik migration'sız) | yeşil | ✅ ONAY | kapı yeniden değerlendirilmeli; 🟢'ye çekilirse #162 → re-bump → #340 |
| backend #160 | AN-02 seed metin yazımı · 🔵 KARAR-99 | koşuyor | gerekmiyor (yalnız metin) | PO EVET + `Question`/`SjtQuestion` yedeği + 2 satır UPDATE |
| backend #151 + çatı #332 | IC-08 onay bekleyene düzeltme notu · 🟢+7b | yeşil | ✅ ONAY | ⛔ #151 merge sınıflandırıcı reddi (Engeller) |
| backend #148 + çatı #326 | U-18 · 🔵 KARAR-97 | yeşil | ✅ ONAY (2. tur) | PO EVET + `Conversation` yedeği (DB erişimi gerekir) |
| backend #142 + çatı #320 | AN-30 · 🔵 KARAR-96 · ⛔ çıkış blokeri | yeşil | ✅ ONAY (2. tur) | PO EVET + `Consent` yedeği (DB erişimi gerekir) |
| çatı #110 | ⛔ MERGE ETME (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**Kapı dağılımı (#328 sonrası, açık 122 satır):** 🟢 51 · 🔵 11 · 🟡 9 · 🔴 51 (beklenen 51/11/6/50). Fark: 🟡 +3 = PS-A1 · PS-A3 · PS-A4 (49'luk listede yoktu, değiştirilmedi); 🔴 +1 = KR-08 / F-14 karışık hücre (teyit gerek). Ayrıntı: `02-ILERLEME.md` 2026-09-26 kaydı · PR #328.

**Push edilmemiş iş:** yok. (Önceki oturumun `/tmp` worktree'sindeki KR-22 yarım işi kurtarıldı → #330; eski `/tmp` worktree'leri silinmedi — PO onayıyla temizlenir.)

**Engeller:**
- 🗄️ Tek seferlik DB erişimi gerekiyor: **Y-05** (`SystemLog.meta` JSON yol sorguları için indeks — önce `EXPLAIN` ile sorgu planı doğrulanmalı).
- ⛔ 2026-09-26 18:25 UTC — `gh pr merge 151 --merge` (backend, IC-08) REDDEDİLDİ. Ret metni AYNEN: `Permission for this action was denied by the Claude Code auto mode classifier. Reason: [Merge Without Review].` #151 CI yeşil + 7b ONAY (yorum 5848715616); çatı #332 buna bağlı. Ardışık ret: 1 (sonraki merge'ler başarılı → sayaç sıfırlandı).
- 🔵 DB erişimi: AN-30 (KARAR-96) ve U-18 (KARAR-97) için PO "EVET" verirse tarihli yedek gerekir → bu VPS'te DATABASE_URL yok: "tek seferlik DB erişimi gerekiyor: AN-30 #142/#320 · U-18 #148/#326".

**PO'ya sorular:** ⭐ **KARAR-101** (güvenlik açığı B8 nasıl kapansın — Bekleme Odası kalsın mı) · KARAR-96/97/98/99 (🔵 EVET/HAYIR) · KARAR-100 (gerekçesiz değer).

**Strateji katmanına not:**
- (Y1-B9 7b takipleri) frontend `isSuspended`'ı okumuyor (askı ekranı yok, kullanıcı her sayfada ayrı hata görür) · süper-yönetici reddinden sonra onay vermek erişimi açmıyor (ayrıca aktif etmek gerekiyor) · reddedilen kurumun tek yöneticisi hesabını kapatamıyor (SON_ADMIN). Backend takipleri (eşleşme önerileri, reapply) ajan tarafından yapılıyor.
- (K5-Y1) `docs/raporlar/kesif/kod-inceleme-teyit-dogrulamasi-2026-09-26.md`: B8 + B9 güvenlik açıkları kuyrukta satırsızdı → ajan K5-Y1 gereği "Y1-B8" / "Y1-B9" kod adlarıyla PR açıyor (kuyruğa satır EKLENMEDİ; satır açmak sizde). D8 (09-DURUM bayat) tur kapanışındaki belge senkronunda ele alınacak.
- (F-18 7b) Kurum-içi rol sayımları hâlâ `User.role`'den (KPI servisi + G1-18) — CLAUDE.md kuralı `TenantMembership.role`; kuyrukta satırı yok.
- (P-05) Kuyrukta 🔵 ama uygulama migration/seed/canlı veri İÇERMİYOR (KARAR-22 B: jenerik metin). 7b ONAY'lı ve CI yeşil — kapı 🟢'ye çekilirse ajan merge eder.
- (AN-53) `docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md` §Öne çıkan bulgular: kuyrukta karşılığı OLMAYAN ~30 ⬜ kalem (ör. G1-09 KVKK başvuru adresi, G1-10 aydınlatma kategorileri, G1-18 `User.role` sayımları, G7-02 açık tema kontrastı, G10-12 `/clubs`) ve "BITTI ama kalemin tamamı değil" 5 vaka (F-04/G1-23, F-27/G6-01, G6-03, G7-13, F-21/G7-09). Ajan iş eklemez → satır açma kararı sizde.
- (Y-02 7b) `GET /api/system-logs` iz bırakmıyor ve `meta`'yı tam döndürüyor — kuyrukta satırı yok.
- AN-30 7b: OAuth pending token ile access token aynı sırrı kullanıyor (`typ` yok, sömürülemez) — kuyrukta satırı yok; AN-30 merge edildiği turda CLAUDE.md public uç listesine `POST /api/auth/oauth/complete-registration` eklenmeli.
- U-18 takip: gerçek bildirim + inbox'ta ret işareti (bildirim servisi hâlâ stub — OB-09).
- PS-A1/PS-A3/PS-A4 kapı sütunu 🟡 (yeni tanımla matching → 🟢+7b beklenir).
- `/api/super-admin/*` uçları frontend'de kullanılmıyor (MÜKERRER, K-13); Y-02 PR'ı maskesiz PII sızıntısını kapattı, kaldırma silme protokolüne tabi.
- I-12 ATLANDI(karar): KARAR-57 cevabına bağlı. AN-06 kod ayağı büyük olasılıkla migration (🔵) + PO teyidi.

**Karar kilidi (en çok iş açan cevapsız kartlar):** KARAR-57 (4, +I-12) · KARAR-45 (4) · KARAR-56 (3) · KARAR-68/65/62/61/59/55 (2'şer) · 🔵 KARAR-96 (AN-30 çıkış blokeri) · 🔵 KARAR-97 (U-18).

**Sıradaki 5 iş:** (1) GV-19/Y-02 7b sonucu → merge + pointer bump (AN-09 dahil) · (2) E-3 kalan BAĞLA kalemleri (çifti engelle arayüzü) · (3) AN-26 hatırlatma/eskalasyon · (4) Y-17 / Y-12 değerlendirmesi · (5) K5 yedek havuz (Y1 teyit-gerek maddeleri).
