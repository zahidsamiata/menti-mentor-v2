# 09-DURUM — Geçmiş Katmanlar Arşivi

**📸 DONDURULMUŞ (2026-08-19)** — bu belge `09-DURUM.md`'nin başlığında istiflenen tarihsel katmanları
(iç-içe "Önceki:" tarih matruşkası + üst üste binmiş ⚠️ GÜNCELLEME SHA/PR notları) korumak için oluşturuldu.

> **Neden taşındı:** `09-DURUM.md` "yalnızca ŞU AN"ı tutması gereken canlı belge; ancak her merge turunda
> başlığına yeni bir SHA/tarih katmanı ekleniyordu ve okunamaz hâle geldi (belge çürümesi). Bu tur (büyük belge
> düzenleme, 2026-08-19) başlık **tek net "şu an" bloğuna** sadeleştirildi; aşağıdaki tarihsel katmanlar
> **silinmedi, buraya taşındı** (Belge Düzeltme Deseni / belge-duzeni-rehberi Kural 6). Kronolojik iz burada durur.
> **Not:** 2026-08-10 öncesi tam geçmiş ayrı arşivde: `docs/arsiv/09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md`.

---

## A. Eski başlık — iç-içe "Önceki:" tarih matruşkası (2026-08-17'ye kadar)

> `09-DURUM.md` başlığındaki "Son güncelleme" bloğunun 2026-08-19 öncesi hâli (kronolojik olarak istiflenmişti):

- **Son güncelleme: 2026-08-17** — ① grubu masa temizliği MERGED, canlıda: #32 admin soru düzenleme UI (çatı #87) ·
  #6 correction-maili fix (backend #44) · #33 ölü seed temizliği (backend #45) → çatı main `41f91b4` · backend `e83ec9c` ·
  pointer senkron · açık PR 0/0.
- **Önceki: 2026-08-15** — 5-PR masa temizliği merge'i: menü 4-grup #76, sertifika rozeti kişi-geneli #40+#77,
  envanter+içerik raporları #78+#79 → hepsi CANLIDA; çatı main `444c025` · backend `5eafbbd` · açık PR 0/0;
  v1 #8 + #11 tamamlandı, #10 zaten mevcuttu.
- **Önceki: KARAR 5 DISC güvenlik açığı** düzeltildi ve CANLIYA merge edildi: backend #37 + çatı #71 MERGED,
  submodule pointer senkron, iki repo main CI yeşil → v1 #1 tamamlandı.
- **Önceki: 2026-08-14** — oturum kapanışı: bu oturumun 5 belge PR'ı [#65 belge temizliği · #66 devir ·
  #67 karar-statü haritası · #68 durum panosu · #69 v1/v2 yol haritası] MERGED → açık PR: 0, masa temiz;
  IDOR çelişkisi kod keşfiyle çözüldü — kapanış özeti: `docs/devir/07-oturum-2026-08-14.md`.
- **Önceki: 2026-08-11** — oturum belgeleri merge oldu → "açık PR" bloğu gerçek merge durumuna çekildi.

---

## B. Eski "Backend/çatı main HEAD" bloğu — istiflenmiş SHA GÜNCELLEME katmanları

> `09-DURUM.md`'de "Backend main HEAD" satırının altında üst üste binmiş SHA senkron notları (her merge turu bir katman):

- **Başlangıç satırı:** Backend main HEAD `afc2769` · çatı main HEAD `e817a2d` (#69) · submodule pointer = `afc2769` (senkron).
- ⚠️ GÜNCELLEME (2026-08-15): KARAR 5 merge sonrası → backend main HEAD `0850eaa` (#37) · çatı main HEAD `4c48a8e` (#71)
  · submodule pointer = `0850eaa` (senkron, `git submodule status` + `ls-tree` doğrulandı).
- ⚠️ GÜNCELLEME (2026-08-15, v1 merge turu): 4 kod PR sonrası → backend `379658a` (#38+#39) · çatı `c3e4626` (#73+#74) ·
  pointer `379658a` (senkron, `ls-tree` == `rev-parse`).
- ⚠️ GÜNCELLEME (2026-08-15, 5-PR merge turu): masa temizliği sonrası → çatı `444c025` (#77) · backend `5eafbbd` (#40) ·
  pointer `5eafbbd` (senkron). Merge sırası: #78→#79→#76→#40→#77 (#77 pointer'ı #40 merge commit'ine bump edildi).
- ⚠️ GÜNCELLEME (2026-08-16, İş 2+3 turu): onay/red izi + gerekçe sonrası → çatı `b66e07c` (#82) · backend `ed84806` (#41) ·
  pointer `ed84806` (senkron). Merge sırası: #41→#81 (pointer bump)→#82. Migration canlıya uygulandı (User'a 5 nullable kolon).
- ⚠️ GÜNCELLEME (2026-08-16, yönetici-adı + İş 3 P2/P3): #42+#83 → #84 (docs) → #43+#85 MERGED. Son: çatı `513ba84` ·
  backend `a9fc0bf` · pointer `a9fc0bf` (senkron). Açık PR 0/0.
- ⚠️ GÜNCELLEME (2026-08-17, ① grubu masa temizliği): admin soru düzenleme UI + correction-maili fix + ölü seed temizliği
  MERGED. Merge sırası: backend #44→#45 → çatı pointer bump #88 → çatı FE #87. Son: çatı `41f91b4` (#88) · backend `e83ec9c` (#45)
  · pointer `e83ec9c` (senkron). Açık PR 0/0.

---

## C. Eski "Açık PR" bloğu — istiflenmiş katmanlar

> `09-DURUM.md`'de "Açık PR" satırının altında biriken GÜNCELLEME notları (her tur bir katman):

- **Başlangıç:** çatı 0 · backend 0 — masa temiz (2026-08-14: bu oturumun 5 belge PR'ı #65–#69 sırayla MERGED).
- ⚠️ GÜNCELLEME (2026-08-14): bu satır #65–#69 açıkken "çatı #65 (merge PO'da)" diyordu; 5 PR merge olunca gerçeğe (açık PR 0) çekildi.
- ⚠️ GÜNCELLEME (2026-08-15): açık PR: backend #37 + çatı #71 — KARAR 5 DISC güvenlik düzeltmesi, merge PO'da.
- ⚠️ GÜNCELLEME (2026-08-15, aynı gün geç): #37 + #71 MERGED, canlıda → açık PR yeniden çatı 0 · backend 0, masa temiz.
- ⚠️ GÜNCELLEME (2026-08-15, v1 turu): yeni v1 işleri açıldı → açık PR: bu docs (#72) · KVKK backend #38 + çatı #73 ·
  havuz-kart backend #39 + çatı #74 — hepsi merge PO'da. İki repo tüm CI yeşil.
- ⚠️ GÜNCELLEME (2026-08-15, v1 merge turu): 4 kod PR sırayla MERGED, canlıda (#38→#73→#39→#74). Açık PR yalnız bu docs (#72).
  #74'te submodule pointer çakışması backend main HEAD'e bump ile çözüldü.
- ⚠️ GÜNCELLEME (2026-08-15, devir turu): #72 de MERGED (çatı `cafd68c`) → açık PR gerçekte çatı 0 · backend 0.
  Oturum kapanışı: `docs/devir/08-oturum-2026-08-15.md`.
- ⚠️ GÜNCELLEME (2026-08-15, 5-PR merge turu): 5 PR daha açılıp merge edildi (#76 menü · #40+#77 rozet · #78 envanter · #79 içerik).
  Merge sonrası açık PR yeniden çatı 0 · backend 0, masa temiz.
- ⚠️ GÜNCELLEME (2026-08-16, İş 2+3 turu): #80 (docs) + #41+#81 (İş 2+P1 backend) + #82 (İş 2/3 FE) MERGED, canlıda.
  Açık: yönetici-adı gösterimi (backend #42 + çatı #83, CI yeşil, merge PO'da) + bu docs PR.
- ⚠️ GÜNCELLEME (2026-08-17, #37 turu): ① grubu docs (#89+#90) MERGED. Yeni açık PR: #37 login enumeration — backend #46
  (`fix/login-enumeration-hardening`, base main → backend CI entegrasyon testleri) + çatı pointer #91 (`backend` → `2ccabd2`) + bu docs PR.
  Merge PO'da.

---

## D. #37 ve #12 — "PR açık, merge PO'da" dönemi (2026-08-17 katmanları)

> Aşağıdaki iki blok `09-DURUM.md`'de "PR AÇIK, MERGE PO'DA" statüsündeydi. **2026-08-19'da git ile doğrulandı: İKİSİ DE MERGED, canlıda**
> (aktif `09-DURUM.md` güncel statüyü gösterir). Bu dönemin "açık PR" ayrıntısı tarihsel iz olarak burada saklanır.

**#37 LOGIN ENUMERATION — (o dönem) PR AÇIK, MERGE PO'DA (2026-08-17):** Backend PR #46 + çatı pointer PR #91 + docs PR.
Doğrulama: lokal backend tsc (src+test) + eslint yeşil; entegrasyon/enumeration testleri CI'da.
→ **2026-08-19 gerçeği:** MERGED — backend #46 (`b6187c1`) + çatı #91 (`af33339`) + docs #92 (`1cd2c56`), canlıda.

**#12 DISC ÇOKLU HARF — (o dönem) PR AÇIK, MERGE PO'DA (2026-08-17):** Backend PR #47 + çatı (FE + pointer) PR #93 + docs PR.
Onaylanan eşikler (PO, 2026-08-17): midline 0.25 (normalize vektör); BÜYÜK/küçük = birincilin %75'i. Tek merkezi `DISC_LETTER_CONFIG`.
→ **2026-08-19 gerçeği:** MERGED — backend #47 (`4c63d0e`) + çatı #93 (`61b6eb2`) + docs #94 (`42e35bf`), canlıda.
