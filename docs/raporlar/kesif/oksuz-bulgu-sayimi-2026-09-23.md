> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-23 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Bu belge kalemlerin TANIMINI tutar, DURUMUNU TUTMAZ. Buradaki işaretler 2026-09-23 durumudur. Güncel durum: `docs/otonom/00-KUYRUK.md` (köprü: `docs/kararlar/00-KART-INDEKSI.md`)

# TAM SAYIM — ÖKSÜZ BULGU DENETİMİ

> **📸 DONDURULMUŞ — 2026-09-23.** Plan değildir; bulguları kuyruğa işlendikten sonra güncellenmez.
> **Mod:** 🟩 PLANLA niteliğinde (salt-okuma; hiçbir kod/şema/seed/`docs/otonom/` değişmedi, hiçbir şey silinmedi).
> **Tür:** 📸 keşif çıktısı · **Şerit/dal:** `otonom/CO-oksuz-bulgu-sayimi-20260923` · **Önek:** OB-01…OB-24
> **Soru:** "Raporlarda yazılan her eksik, kuyrukta karşılığı var mı?" Belge haritası daha önce **19 öksüz bulgu** saydı — o KISMİ idi (yalnız `kesif/` 17 belge). PO: **TAM SAYIM** istedi.
> **Kapsam:** `docs/raporlar/kesif/` (30 rapor) + `kod-denetimi/` (8) + `panel/` (5) + `persona/` (4). Say için `frontend/src` + `backend/src` grep/read ile kod-teyit.
> **Yöntem:** 5 paralel alt-ajan, her biri kendi kümesinin **baseline** anti-tekrar kaynağını ÖNCE okudu (belge-haritası §C.2 · bilanço `T2-B/C/D` · devir-analizi · konsey-yonetisim), kapsadıklarını TEKRAR ÇIKARMADI, spot-check yaptı. Her bulgu bugün `00-KUYRUK.md` · `00-KARAR-TAKIP.md` · `01-KARARLAR.md` · `03-PO-ELLE-ISLER.md`'de arandı; ⚫/✔️ için kod grep'le teyit edildi.
> **DURUM alfabesi:** ✅ ISLENMIS (kuyruk/kart satırı var) · 🔄 KISMEN · ⚫ GECERSIZ (kanıt şart) · ✔️ ZATEN YAPILMIS (dosya:satir şart) · ⛔ OKSUZ (hiçbir karşılığı yok). ⚫/✔️ için kanıt yoksa ⛔ OKSUZ sayıldı.

---

## 0. ⭐ ÖNCE OKU — beş cümle

1. **Genel tablo iyi: 2026-09-21 devir turu + 2026-08-26 bilanço, raporların aksiyon-bulgularının büyük çoğunluğunu (~%90) kuyruğa/karara/PO'ya bağlamış.** Beş küme de aynı sonucu verdi: gerçek öksüz sayısı düşük, çıkışı bloke eden **kanıtlı yeni öksüz YOK**.
2. **Belge haritasının saydığı 19'un 7'si ARTIK ÖKSÜZ DEĞİL** — kod aradan ilerledi (klasör silindi, logout bağlandı, `/api/requests`+`verifiedBy` girdi) ya da kuyruğa işlendi (KARAR-28, F-32, F-33). Bu, "eskiyi kopyalama, kendin doğrula" kuralının neden şart olduğunun kanıtı.
3. **En kritik gerçek öksüz kümesi: kart tasarım 5 ürün kararı** (DISC gösterim · sektör chip · sayfa-başı kart · arama/filtre · menti-kartı-aynı-mı). Backend rozet/sektör/uyum% HAZIR ama **hiçbir belgede karar açılmamış** → kart havuzu FE'si (MVP'nin görünen yüzü) bunları bekliyor. **POTANSİYEL ÇIKIŞ BLOKERİ.**
4. **İkinci öksüz kümesi: kapasite 3'lüsü** (Neon connection_limit · matching cache/`take:500` · cron duplication) — kod-teyitli hâlâ mevcut, kuyrukta SIFIR satır. Çıkış blokeri değil ama cron-duplication çok-instance deploy'da koşullu risk (PO-ELLE deploy topolojisi).
5. **Güvenlik/KVKK tarafında öksüz YOK:** konsey-guvenlik'in 11 güvenlik + 6-model KVKK bulgusunun tamamı GV-03…GV-25'te satır aldı (2'si "RAPOR BOŞLUĞU" etiketiyle PO onayına). Bu, çıkış açısından en rahatlatıcı bulgu.

---

## 1. BELGE HARİTASININ 19 ÖKSÜZÜ — bugünkü durum (kod-teyitli)

> Kaynak: `docs/00-BELGE-HARITASI.md §C.2:248-266`. Her biri bugün grep/read ile doğrulandı (kod HEAD `9baa9f1` civarı).

| # | Bulgu | Kaynak:satır | Bugünkü kanıt | DURUM |
|---|---|---|---|---|
| 1 | `Menti Mentör proje/` 0-byte klasör | `depo-denetimi:18-23` | klasör YOK (silinmiş) | ✔️ YAPILMIS |
| 2 | Neon `connection_limit` yok + seri mail cron | `kapasite:19-24` | `connection_limit` grep boş → hâlâ ayarsız; kuyruk karşılığı YOK | ⛔ OKSUZ |
| 3 | Eşleştirme cache yok + `take:500` sabit | `kapasite:26-31` | `matching.ts:171,397` `take:500` HÂLÂ VAR; kuyruk YOK | ⛔ OKSUZ |
| 4 | `node-cron` çok-instance duplication | `kapasite:38` | yalnız `CRON_ENABLED` gate; advisory-lock yok; kuyruk YOK | ⛔ OKSUZ |
| 5 | `rateLimiter.ts` tenant tek-bucket → 429 | `kapasite:36` | genel-bucket duruyor ama IP-bazlı ayrı limitler eklenmiş (login/register/pwreset…) | 🔄 KISMEN |
| 6 | `LLM_PROVIDER` env duruyor, LLM kapalı | `hayalet-backend:46` | KARAR-28 açık (`01-KARARLAR.md:625`) — ölü env silinsin mi | ✅ ISLENMIS |
| 7 | `pending-approval`+`stk/pending-review` nav-linksiz | `hayalet-backend:49` | iki sayfa da var; nav'dan bilinçli-programatik linksiz | ⚫ GECERSIZ (tasarım) |
| 8 | `NotificationService` 7-fn stub | `hayalet-backend:54` | `notificationService.ts:1-50` bilinçli stub (SystemLog+console, FCM TODO); kuyruk YOK | ⛔ OKSUZ (bilinçli) |
| 9 | **B10** sekme geçişi yavaş (`useApiClient` refetch) | `teshis:29` | kök-neden kapandı (`useApiClient.ts:24-32` stable ref); istemci-önbelleği → **F-32** (🟢) | ✅ ISLENMIS |
| 10 | **B11** logout UI'ya bağlı değil | `teshis:30` | `DashboardNav.tsx:30,38-41,70-78` logout butonu var (+admin/platform/pending) | ✔️ YAPILMIS |
| 11 | **B12** sol-alt kullanıcı kartı yok | `teshis:31` | nav'da ad+logout var; sol-alt kart/dropdown → **F-33** (🟢) | ✅ ISLENMIS |
| 12 | Kartta DISC nasıl gösterilsin | `mentor-karti:87` | 01-KARARLAR/kuyrukta karar YOK; backend rozet hazır | ⛔ OKSUZ |
| 13 | Sektör etiketi kaç tane, "+N" mı | `mentor-karti:88` | kuyruk/kart YOK | ⛔ OKSUZ |
| 14 | Sayfa başına kaç kart (15/18/20) | `mentor-karti:89` | kuyruk/kart YOK | ⛔ OKSUZ |
| 15 | Havuzda arama+filtre bu tur mu | `mentor-karti:90` | kuyruk/kart YOK | ⛔ OKSUZ |
| 16 | Menti kartı mentör kartıyla aynı mı | `mentor-karti:91` | kuyruk/kart YOK | ⛔ OKSUZ |
| 17 | PO karar 5 — serbest mesajlaşma ertelendi | `mentor-karti:116-119` | `backend/CLAUDE.md`'de niyet-mektubu akışı belgeli ama takip-belgesinde numarasız | 🔄 KISMEN |
| 18 | hayalet-envanter 2 kalem: `/api/requests` GET · `Tenant.verifiedBy` | `hayalet-envanter:113` | `/api/requests` → IDOR testi var; `verifiedBy` → `schema.prisma:224`+migration var | ✔️ YAPILMIS (kod) — ama `verifiedBy` YAZIMI öksüz, bkz. OB-19 |
| 19 | Kalan şema drift: `updatedAt` DEFAULT ×4 · `LearningStage.tenantId` onDelete | `00-KARAR-TAKIP.md:666` | F.8 tam keşif+çözüm (`00-KARAR-TAKIP.md:657-677`); `MentorshipAgreement` 150 öksüz satır 🔴 PO'da | 🔄 KISMEN |

**19'un dağılımı:** ✔️ 3 · ✅ 3 · 🔄 3 · ⚫ 1 · **⛔ 9** (2,3,4,8,12,13,14,15,16). Yani belge haritasının 19'undan **bugün hâlâ gerçek öksüz olan 8-9 kalem** var — çoğu kapasite (2/3/4) ve kart tasarım (12-16) kümesinde toplanıyor.

---

## 2. TAM SAYIM ÖKSÜZ TABLOSU (tüm kümeler, mükerrer birleştirilmiş)

> Yalnız bugün gerçekten **⛔ OKSUZ** olanlar (aktif kuyruk/kart/PO satırı yok, kod-teyitli hâlâ geçerli). ✅/✔️/⚫/🔄 olanlar §1 ve alt bölümlerde.

| OB | Bulgu | kaynak:satır | tür | çıkış blokeri | etki |
|:--:|---|---|---|:--:|---|
| OB-01 | Kart tasarım: DISC nasıl gösterilsin (harf/renk/kelime) | `mentor-karti-rakip-analizi:87` | PO/ürün | 🟠 potansiyel | kart havuzu FE bunu bekliyor (backend hazır) |
| OB-02 | Kart tasarım: sektör etiketi sayısı + "+N" | `…rakip:88` | PO/ürün | 🟠 potansiyel | aynı küme |
| OB-03 | Kart tasarım: sayfa başına kaç kart | `…rakip:89` | PO/ürün | 🟠 potansiyel | aynı küme |
| OB-04 | Kart tasarım: havuzda arama+filtre bu tur mu | `…rakip:90` | PO/ürün | 🟠 potansiyel | aynı küme |
| OB-05 | Kart tasarım: menti kartı mentör kartıyla aynı mı | `…rakip:91` | PO/ürün | 🟠 potansiyel | aynı küme |
| OB-06 | Neon `connection_limit` ayarsız + seri mail cron await | `kapasite-analizi:19-24` | kod/PO-ELLE | hayır | ~30-40 eşzamanlıda "too many connections" |
| OB-07 | Eşleştirmede cache yok + `take:500` sabit kırpma | `kapasite-analizi:26-31` | kod | hayır | 500+ adayda admin yanlış sayı görebilir + CPU |
| OB-08 | `node-cron` çok-instance cron duplication (advisory-lock yok) | `kapasite-analizi:38` | kod/PO-ELLE | 🟠 koşullu | çok-instance deploy'da mükerrer mail/tuning (kullanıcıya görünür) |
| OB-09 | `NotificationService` stub — gerçek push provider yok | `hayalet-backend:54` | kod | hayır | **bilinçli tasarım** (FCM TODO); in-app/mail idare ediyor |
| OB-10 | Ghost-red 30-gün geri-alınabilir uyku modu backend'de yok | `kvkk-veri-aktarim:71` / madde 35 | kod/PO | hayır | KARAR 2a'ya bağlı (`00-KARAR-TAKIP.md:75`), devir-analizi:179 "kuyruğa giremez" der — belgeli erteleme |
| OB-11 | DISC testi başında noktasal KVKK/rıza aydınlatması yok | `kvkk-veri-aktarim:80` / madde 83/85 | kod/hukuk | 🟠 potansiyel KVKK | özel-nitelikli (psikometrik) veri toplama noktası; avukat paketine (KARAR-47) bağlanabilir, bağlanmamış |
| OB-12 | onDelete stratejisi tanımsız (FK RESTRICT çoğu ilişkide) | `proje-analizi:106,163` / madde 49 | kod/şema | hayır | dolu tenant hard-delete edilemez; **KUYRUK:367 "sonraki devir turu" — belgeli erteleme** |
| OB-13 | STK-custom soru kullanılmıyor (DISC skoruna katılmaz) — tut/kaldır | `eksikler-derinlestirilmis:51-55` | PO | hayır | kullanılmayan özellik; ❓PO, satır yok (canlı sayım TEYİT GEREK) |
| OB-14 | Mükerrer/ölü uçlar: `/rematch` · PATCH `/users/:id/self-profile` · `SjtQuestion`/`SjtOption` 0-query tablolar | `yarim-is-niyet:21,26` | kod/PO | hayır | NİYET belgesiz uçlar + ölü-tablo adayı; KARAR-TAKIP'te ❓PO, kuyrukta satır yok |
| OB-15 | Otomatik anomali/kötüye-kullanım tespiti derinleştirme (v1→v2) | `platform-admin-panel-envanteri:73,123` | kod | hayır | v1 (`getAnomalies`) çalışıyor + kullanıcı-şikayeti; v2 numaralı takibe girmemiş |
| OB-16 | İçerik ağırlık çelişkisi: belge %45/%30/%25 ↔ kod 0.6/0.4 | `konsey-icerik §2.2 ÇAPRAZ-2` | belge↔kod (ürün) | hayır | bugün gizli; Big Five kartı (I-15) bağlanınca görünür olabilir → KARAR-45 notuna |
| OB-17 | `VisibilityOptIn` durum alanı ZATEN VAR → I-10/I-16 "migration gerekir" varsayımı yumuşayabilir | `konsey-icerik §2.2 ÇAPRAZ-3` | mimari-teyit (iş-azaltıcı) | hayır | I-10/I-16 eforunu düşürür; ikisinin de notunda işlenmemiş |
| OB-18 | Öğrenme yolculuğu 7↔8 aşama ayrışması (belge 8, seed 7 — 8. aşama hiç girmemiş) | `konsey-icerik / faz6:197` | içerik↔seed | hayır | I-17 yalnız gizlilik+bitirme'yi kapsıyor; 7↔8 ayrı → K-18 notuna |
| OB-19 | `Tenant.verifiedBy` yazımı yok (0 oku + 0 yaz) — "kim doğruladı" audit izi | `hayalet-envanter:72` | teknik BAĞLA | hayır | `verificationStatus`/`verifiedAt` yazılıyor, `verifiedBy` boş; rapor "bilinçli erteleme" demiş |
| OB-20 | `admin/algorithm-tuner:134` "kişilik uyumu" ↔ ürün "DISC tanı değildir" feragati çelişkisi | `konsey-icerik §9.9` | terim/tutarlılık | hayır | tek-kelime düzeltme; IC-11 (terim birleştirme) notuna |
| OB-21 | `GameSection.tsx:69,86` "kazanacağın arketip" — testi ödül oyunu gibi çerçeveliyor | `konsey-icerik §4.1 C1-9` | metin/vaat (ürün) | hayır | KARAR-48 C1-6'da kapandı, C1-9 dışarıda kaldı → KARAR-48 notuna |
| OB-22 | Suspicion raporu DB'ye yazıp mail göndermiyor + kullanıcı geri-bildirim mekanizması | `teshis:53-57` (E24) | kod | hayır | TEYİT GEREK; MVP ~4-6h; §C.2 atlamış |
| OB-23 | Foto ZORUNLU kılma kararı (upload backend ✅, zorunluluk açık) | `kart-havuz:120-123` | PO/ürün | hayır | upload+select var, "zorunlu mu" kararı izsiz |
| OB-24 | Sayfa metinleri merkezileştirme (C17, 9+ dosya inline) · frontend liste sanallaştırma (E-B) · etiket doğrudan-ekleme akışı (C20) | `teshis:42,45` / `kapasite:37` | kod/temiz-kod | hayır | düşük; temiz-kod/UX borcu, canlı-sonrası |

**Öksüz sayısı: ~24 kalem** (birleştirilmiş). Bunların **hiçbiri kanıtlı çıkış blokeri değil**; 6'sı 🟠 potansiyel (OB-01..05 kart tasarım kümesi + OB-08 cron-duplication + OB-11 KVKK aydınlatma).

---

## 3. KÜME BAZINDA ÖZET (baseline atıflarıyla)

### 3.1 `kod-denetimi/` (8 rapor) — baseline: bilanço `T2-C` (207 kalem)
- **Bilanço T2-C 8 raporun 207 aksiyon-bulgusunu 2026-08-26'da defterledi**, her birini T1 numarasına bağladı. Bulgular bugüne iki köprüyle geldi: **AŞAMA F devri** (G-kartı→F-satırı: G1-06→F-02 … G4-08→F-24) + **2026-09-21 konseyleri** (GV/P/U/V).
- **~%90 izlenir.** Kaymaların çoğu ⚫ GECERSIZ (kod ilerledi: madde 40 KVKK FE artık VAR — `DataPrivacySection.tsx:175`; madde 82 consentVersion artık VAR → GV-18; madde 71 tasarım kararı; P-16 User.role; F-27 N+1).
- **Gerçek öksüz: OB-10 (ghost-red) · OB-11 (DISC-test aydınlatması) · OB-12 (onDelete) · OB-13 (STK-custom) · OB-14 (rematch/self-profile/SjtQuestion).** İkisi (OB-10, OB-12) devir-analizi'nde "sonraki devir turu"na açıkça ertelenmiş → belgeli, kör nokta değil.

### 3.2 `panel/` + `persona/` (9 belge) — baseline: bilanço `T2-D` (117 kalem)
- **Bilanço T2-D 7 belgeyi (2 INDEX hariç) 2026-08-26'da eksiksiz denetledi;** bu belgeler Y1-Y7 + madde 76/77/78 + KARAR-6'nın KAYNAĞI. 6 "hayalet-tamam" tespit etmiş (kapanmış).
- **Kaynak niyetlerin tamamı bilançodan sonra kuyruğa (F-15..F-25, P-01..P-16) ve karta (Y1-Y11, KARAR-20/22/41) bağlanmış — çoğu BITTI/CANLIDA** (menti umut PR#228, mentör takdir PR#82/#216/#222, proaktif uyarı PR#231, mail-sağlık PR#84).
- ⚠️ **YANLIŞ SORU TUZAĞI kontrolü yapıldı:** "Yol B davet oto-onay" özelliği "yok" sanılabilir ama `authController.ts:165` davetli=onaylı tetiği KODDA VAR (✔️).
- **Gerçek öksüz: OB-15 (otomatik anomali v2) + SuspicionReport.tenantId ayağı** (reporter-maske ✅ kapandı, tenantId pasif madde 71).

### 3.3 `kesif/` 2026-08-02 turu (9 rapor) — baseline: belge-haritası §C.2 + bilanço `T2-B`
- 19 öksüzün güncel durumu §1'de. **7'si artık öksüz değil.**
- Belge-haritasının ATLADIĞI ek bulgular tespit edildi: E-A (`.env.backup-anaDB` silinmiş ✔️) · E-G (DISC/rozet WCAG → K-10/F-21 ✅) · E-H (DISC/sektör ağırlık ✅ CANLIDA #52) · **OB-22 (E24 suspicion-mail) · OB-23 (foto zorunlu) · OB-24 (C17/C20/E-B)** öksüz.

### 3.4 `kesif/` RECENT — konsey (4) + devir + po-cikis — baseline: devir-analizi + konsey-yonetisim
- **Absorpsiyon istisnai:** 15 yeni karar kartı (KARAR-38…52), 4 yeni kuyruk aşaması (GV/PS/IC/YN, ~60 satır), 8 yeni PO işi, avukat paketi.
- **⭐ Güvenlik/KVKK: öksüz YOK.** 11 güvenlik bulgusunun 11'i satır aldı (G-1/G-2→GV-01/02 ⛔⛔ blok; G-3..G-7→GV-03..07 çıkış-blokeri 🟡; G-8..G-11→GV-10/11/24/25). 6 IDOR'dan 2'si (G-6/G-7→GV-24/GV-25) "RAPOR BOŞLUĞU" etiketiyle PO onayına eklenmiş (KURAL 9). KVKK 6-model+4-alan anonimleştirme tablosu tamamı GV-08'de.
- **Gerçek öksüz: 5 küçük içerik-konseyi bulgusu → OB-16, OB-17, OB-18, OB-20, OB-21.** Hepsi ❓TEYİT GEREK/metin cilası; yeni satır yerine mevcut satır Not'una eklenmeli.

### 3.5 `kesif/` RECENT — faz5/eslestirme/profil/sema/yetki/hayalet-envanter/icerik-onkosul + 3 taze (09-19)
- **11 raporun 10'u TAM bağlı.** Taze 3 rapor (operasyonel-hazirlik 2101 st → AŞAMA V · uctan-uca → AŞAMA U · panel-denetimi → AŞAMA P) belge-haritası onları §C'ye almadan ÖNCE kuyruğa tam işlenmiş; §4 risk kalemleri tek tek haritalanmış (avatar-disk→K-04, trust-proxy→K-14, yedek+restore→madde120).
- **Tek gerçek öksüz: OB-19 (`Tenant.verifiedBy` yazımı)** — zayıf, bilinçli ertelenmiş teknik audit izi.

---

## 4. ÇIKIŞ BLOKERİ DEĞERLENDİRMESİ

- **Kanıtlı çıkış blokeri öksüz: YOK.** Beş kümenin hiçbiri, çıkışı bloke eden ve hiçbir yerde takip edilmeyen bir bulgu bulmadı.
- **🟠 Potansiyel (PO'nun bakması gereken) öksüz kümeler:**
  1. **Kart tasarım 5'lisi (OB-01..05)** — en yüksek öncelikli. Backend hazır, kart havuzu FE (MVP'nin görünen yüzü) 5 ürün kararını bekliyor. **Tek karar-kartı olarak `01-KARARLAR`'a açılmalı.**
  2. **OB-08 cron-duplication** — Dokploy çok-instance'a çıkarsa mükerrer mail kullanıcıya görünür → **PO-ELLE (deploy topolojisi teyidi).**
  3. **OB-11 DISC-test KVKK aydınlatması** — özel-nitelikli veri; avukat paketine (KARAR-47) bağlanmalı.
- **Belgeli erteleme (öksüz değil, kör nokta değil):** OB-10 (ghost-red, KARAR 2a) · OB-12 (onDelete, "sonraki devir turu") · OB-19 (verifiedBy, "sonraki tur").

---

## 5. HAZIR KUYRUK / KART SATIRLARI (numarasız — PO işler)

- **[aday KART · yüksek öncelik] Mentör/menti kart havuzu tasarım kararları** 🔴 — OB-01..05 tek kartta kümele: DISC gösterim biçimi · sektör etiketi sayısı+"+N" · sayfa başına kart · arama/filtre bu tur mu · menti kartı aynı mı. Backend rozet/sektör/uyum% hazır (`onboardingController`, `menti/page.tsx`). Kart açılmadan FE bağlanamaz.
- **[aday 03-PO-ELLE] Deploy topolojisi + kapasite** — OB-06 (Neon connection_limit) · OB-08 (cron çok-instance advisory-lock) → PO Dokploy topolojisini teyit etsin; tek-instance ise OB-08 ⚫, değilse 🟡 iş.
- **[aday kuyruk 🟡] Eşleştirme `take:500` + cache** OB-07 — canlı-sonrası performans, düşük öncelik.
- **[aday AVUKAT paketi] OB-11** DISC-test noktasal KVKK aydınlatması → KARAR-47 avukat paketine ek madde.
- **[aday NOT-ekle, yeni satır AÇMA]:** OB-16→KARAR-45 · OB-17→I-10/I-16 · OB-18→K-18 · OB-20→IC-11 · OB-21→KARAR-48. (İçerik konseyi 5 küçük bulgusu; mevcut satır Not'una "ek bulgu".)
- **[aday PO kararı] Ölü/mükerrer triyaj** OB-13 (STK-custom soru) · OB-14 (rematch/self-profile/SjtQuestion) · OB-23 (foto zorunlu mu) — SİLME PROTOKOLÜ gereği niyet-anla + karar.
- **[aday kuyruk 🟢/🟡] Küçük teknik** OB-09 (NotificationService — bilinçli stub, karar: canlı-sonrası mı) · OB-19 (verifiedBy yazımı, 🟢 BAĞLA) · OB-22 (suspicion-mail MVP) · OB-24 (metin merkezileştirme/sanallaştırma, temiz-kod).

---

## 6. BU TURUN PROMPTUNA ELEŞTİRİ

1. **"TAM SAYIM" hedefi ile "TEKRAR ÇIKARMA" kuralı gerilimde.** Belge haritası + bilanço + devir zaten ~%90'ı işlemiş; bu tur ağırlıklı olarak **doğrulama** turu oldu (yeni öksüz azdı). Bu değerli ama prompt "19 KISMİ idi, TAM SAYIM" derken çok daha büyük bir öksüz hasadı bekliyor gibiydi — gerçek bulgu, "öksüzler zaten büyük ölçüde işlenmiş" oldu. **Öneri:** bir sonraki tur "sayım" yerine "kart tasarım 5'lisi ve kapasite 3'lüsü GİBİ bilinen öksüz kümeleri kuyruğa DEVRET" işine odaklansın — sayım doygunluğa ulaştı.
2. **`bilanco/` klasörü kapsam dışıydı ama baseline'ın çoğu oradaydı** (T2-B/C/D). Ajanlar bilançoyu okumak zorunda kaldı. **Öneri:** kapsam listesine `bilanco/bolumler/` açıkça eklensin (anti-tekrar kaynağı olarak).
3. **Kod-teyit için backend submodule bir ajanda boş geldi** (KATMAN 2 konsey ajanı kodu okuyamadı, rapor+kuyruk atıflarına dayandı). **Öneri:** kod-teyit gereken ajanlara "submodule dolu mu kontrol et, değilse ana repodan backend/ yolunu kullan" talimatı verilsin.
4. **"Çıkış blokeri mi" sorusu her öksüz için soruldu ama "çıkış" tanımı prompt'ta yoktu** — MVP kapsamı mı, ilk gerçek kullanıcı mı, KVKK yasal zorunluluk mu? Bu belirsizlik "potansiyel blokeri" etiketini öznel bıraktı. **Öneri:** çıkış tanımı (hangi eşik) baştan verilsin.
5. **Bir sonraki analiz turu neye bakmalı:** (a) kart tasarım 5 kararının kuyruğa/karta devri sonrası FE bağlama işi, (b) `bilanco/` klasörünün kendi öksüzleri (bu tur girmedi), (c) `docs/kararlar/konu/` tasarım belgelerindeki alınmış-ama-uygulanmamış kararlar (Bölüm 4'ün konusu), (d) canlı DB sayımı gerektiren TEYİT GEREK kalemleri (OB-13 STK-custom, suspicion-mail) — bunlar bulut oturumunda yapılamaz, PO-ELLE.

---

## 7. TAM KAPSAM BEYANI

- **kesif/ (30 rapor):** ✅ tamamı — 2026-08-02 turu (9) + RECENT konsey/devir/po-cikis (6) + faz5/eslestirme/profil/sema/yetki/hayalet/icerik-onkosul/3-taze (11) + bu turun kendi ürettiği 4 (mutabakat/E/icerik-kalitesi/tam-okuma, kapsam dışı bırakıldı — kaynak değil çıktı).
- **kod-denetimi/ (8):** ✅ tamamı (baseline T2-C).
- **panel/ (5) + persona/ (4):** ✅ tamamı (baseline T2-D).
- **Okunmayan dilim:** yok — 5 paralel alt-ajanla tüm hedef raporlar TAM okundu; büyük olanlar (operasyonel-hazirlik 2101 st) dilimlenerek okundu. Kısmi okuma yapılmadı.
- **`bilanco/` klasörünün KENDİ raporları** (belge-bilancosu, karar-defteri, tekrar-onleme) kapsam dışıydı (yalnız bolumler baseline olarak okundu) → gelecek tur adayı (§6.5).
- **⛔ Dokunulmayanlar:** ürün kodu · şema · seed · KARAR CEVAP satırları · `docs/otonom/` · hiçbir şey silinmedi.
- **Belge senkronu:** iş kaynağı tek kuyruk; bu rapor bulguları **aday**dır, kuyruğa devir PO turunda. 09-DURUM/10-yol/00-KARAR-TAKIP güncellenmedi.
