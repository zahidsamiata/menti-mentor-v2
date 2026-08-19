# MentiMentor — Yol Haritası (SIRADAKİ İŞLER) · v1/v2 öncelikli

**🔄 YAŞAYAN** (canonical: iş kuyruğu)

> Bu belge yalnızca **BUNDAN SONRA yapılacak açık işleri** öncelik sırasıyla tutar. Biten işler burada durmaz —
> güncel durum `09-DURUM.md`'de; 2026-08-10 öncesi tam geçmiş `docs/arsiv/09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md`'de.
>
> **Son güncelleme:** 2026-08-19 (**#12 DISC çoklu harf ✅ MERGED, canlıda** (backend #47 + çatı #93 + docs #94) · **#37 giriş enumeration sertleştirme ✅ MERGED, canlıda** (backend #46 + çatı #91 + docs #92, madde 37 kapandı — PENDING dahil). Çatı `753c545` · backend `b6187c1` · açık kod PR 0/0. Detay: `09-DURUM.md`. Eski tarih katmanları: `docs/arsiv/09-DURUM-gecmis-katmanlar-2026-08-19.md`.
> Önceki: 2026-08-17 (**① grubu masa temizliği MERGED, canlıda**: **#32 admin soru düzenleme UI ✅ (çatı #87)** · **#6 correction-maili fix ✅ (backend #44)** · **#33 ölü seed dosyası temizliği ✅ kısmi (backend #45)** · **#5 ThemeToggle ✅ zaten mevcut** (kod-doğrulandı). Çatı `41f91b4` · backend `e83ec9c` · açık PR 0/0. **#13 cevap-tipi = migration gerektiriyor → AÇIK** (brief "yapıldı" dedi, YANLIŞ). Önceki: 2026-08-15 (**5-PR masa temizliği merge'i, canlıda**: **#8 menü 4-grup ✅ (#76)** · **#11 sertifika rozeti ✅ kişi-geneli (#40+#77)** · **#10 durum rozeti ✅ zaten mevcuttu** (kod gerçeği düzeltmesi) · envanter/içerik raporları #78+#79.
> Çatı main `444c025` · backend `5eafbbd` · açık PR 0/0. **v1-C kalan ~6 iş** (#5,6,7-follow-up,9,12,13). Yeni tespitler v1-D (#29-34) eklendi: İş 2+3 migration ONAYLI, sertifika 5→20, DISC-yaklaşım boşluğu vb.
> Önceki: **v1 #1 = KARAR 5 DISC güvenlik ✅** — backend #37 + çatı #71 MERGED).
> **2026-08-16:** İş 2 + İş 3 (P1+P2+P3) tümü ✅ CANLIDA (#41-#43, #81-#85) — onay/red izi + gerekçe + yönetici-adı + reddedilen kullanıcı akışı. Yeni işler v1-E (#35-#37: iki tip red, aktif kullanıcı çıkarma, enumeration sertleştirme). Önceki: 2026-08-14 (**v1/v2
> önceliklendirme** — kaynak: `00-karar-statu-haritasi-2026-08-14.md` + `00-DURUM-PANOSU.md` + KARAR 5 güvenlik denetimi.
> Biten işler [F1/F2/F7] düşürüldü, tasarım kararları eklendi). Önceki: 2026-08-11 (F bölümü 7 madde).
> **Statüler karar-statü haritasından gelir (dosya:satır kanıtlı).**
>
> **Çerçeve (ürün sahibi kararı):** **GENİŞ v1** = (1) yasal+güvenlik blocker · (2) az işle kazanç · (3) STK admin panel tam görünsün.
> **v2** = ağır/riskli/ileri-faz. **İşler tek tek, ürün sahibi başlattıkça yapılır; sırayı PO değiştirebilir.**

---

# 🟢 v1 — CANLI ÖNCESİ (öncelikli, sırayla)

## v1-A · 🔴 GÜVENLİK & YASAL BLOCKER (canlı-öncesi ŞART)

1. **✅ KARAR 5 — DISC güvenlik açığı düzeltmesi** — **v1 #1, canlı-öncesi ŞART → TAMAMLANDI, CANLIDA.** *(backend #37 + çatı #71 MERGED.)*
   > ⚠️ GÜNCELLEME (2026-08-15, merge turu): **✅ tamamlandı, canlıda.** backend #37 (`0850eaa`) + çatı #71 (`4c48a8e`) `--merge`
   > ile MERGED; submodule pointer senkron; iki repo main CI yeşil; regresyon testi CI Integration suite'te geçiyor. **v1 #1 kapandı.**
   > ⚠️ GÜNCELLEME (2026-08-15): düzeltme kodlandı → **PR açık, merge bekliyor** (henüz merge YOK). Merkezi `discVisibility.ts`
   > (`canViewerSeeDiscType`): `listUsers`+`getUser` menti→mentör `discType`/`discResultCard`'ı response'tan çıkarır; FE menti kartı
   > DISC göstermez; regresyon testi eklendi. Gerçek kanıt CI'da (lokal entegrasyon TEST_DATABASE_URL guard'ıyla durur). Detay: `09-DURUM.md` "✅ GÜVENLİK".
   - **Bulgu (bu oturum, salt-okuma denetimi):** Menti, mentörün DISC **tipini (harf) + arketipini** görüyor → KARAR 5 ihlali.
     Kanıt: `backend/src/controllers/userController.ts:90` (`listUsers` select `discType`) + `:138-139` (`USER_PUBLIC_SELECT`
     `discType`/`discResultCard`) + `frontend/src/app/(dashboard)/menti/page.tsx:262-266` (render). Ham vektör güvenli (`USER_FULL_SELECT` self/admin).
   - **Çelişki:** kod `discType`'ı bilinçli public tasarlamış (yorum s.138) — KARAR 5 (2026-08-11) daha yeni PO kararı → **KARAR 5 kazanır**.
   - **İş:** viewer-role + target-role farkındalıklı select (menti→mentör **gizle**; mentör→menti **göster**; admin hepsi). Tek yönlü kaldırma mentörün meşru görünümünü bozar.
   - **⚠️ ÖN-KOŞUL:** havuz kart işi (v1-C, KARAR 2/7) **bu düzeltmeden SONRA** yapılır — yoksa açığı ekrana taşır.
2. **✅ K2 — OAuth `kvkkConsentAt`** (KVKK) — **MERGED, canlıda (#38+#73).** OAuth `handleNewUser` + self-serve kurucu admin `new Date()` set eder; test `oauth-kvkk-consent.test.ts`.
3. **✅ K4 — Yaş 18+ doğrulama** (KVKK) — **MERGED, canlıda (#38+#73).** **PO kararı: ayrı kutu DEĞİL** → tek KVKK onayının metnine gömüldü ("...ve 18 yaşından büyük olduğumu beyan ederim"). DB'ye yaş yazılmaz (şema yok) — öz-beyan kapısı.
4. **✅ K5 — Sunucu konumu beyanı** (KVKK) — **MERGED, canlıda (#73).** `kvkk/page.tsx` "8. Sunucu Konumu ve Yurt Dışı Aktarım" (İrlanda/AB, KVKK Md.9). Taslak-not disclaimer'ı kapsamı korur (hukukçu gözden geçirebilir).

> **Not:** K1 yasal metinler ✅ yazılı (hukukçu onayı ayrı, PO/dış iş). K3 (eski kayıt consent politikası) → aşağıda "❓ önce karar".

## v1-B · ★ AZ İŞLE KAZANÇ (🟨/🟧 — S, ucuz kazanım)
5. **ThemeToggle admin/platform nav'a** (S) — ~~menti/mentör'de var, admin/platform'da yok~~.
   > ⚠️ GÜNCELLEME (2026-08-17): ✅ **ZATEN MEVCUT** (kod gerçeği — bu tur doğrulandı). `(admin)/layout.tsx:92` `<ThemeToggle />` render ediyor + `platform/dashboard/page.tsx`'te de var. Yeniden yapılmadı, teyit edildi.
6. **Onay paneli bildirim maili** (S-M) — mail altyapısı hazır; kurum onay/ret maili + `destek@` + prod `PLATFORM_ADMIN_EMAIL` bağlanacak (başvuran sessiz kalmasın).
   > ⚠️ GÜNCELLEME (2026-08-17): **KULLANICI onay/red maili zaten çalışıyor** (teyit): `approveUser`→onay maili, `rejectUser`→red maili (gerekçeli), `emailService.sendUserApprovalNotification`. Bulunan bug **düzeltildi (backend #44):** `requestCorrection` düzeltme notunu (`feedbackNote`) e-postaya iletmiyordu → `rejectionReason` geçirildi. **KALAN (bu madde asıl kapsamı, AÇIK):** kurum(tenant)-onay/ret maili + `destek@` + prod `PLATFORM_ADMIN_EMAIL` env bağlama — kullanıcı maili ile karıştırma.

> (K2 OAuth consent + K5 sunucu konumu da S-boyu az-işle-kazanç; yasal oldukları için v1-A'da.)

## v1-C · STK ADMİN PANEL — TAM GÖRÜNSÜN (görünüm eksikleri)
7. **Havuz KART görünümü + "Neden uyumlu" L1 (KARAR 2 + KARAR 7 · =md.5)** — backend `compatibilityReason` üretiyor, FE hâlâ tablo + tip eksik. **⚠️ KARAR 5 düzeltmesinden SONRA** (kart bakan-role göre ayrışmalı: menti→mentör DISC göstermez).
   > ⚠️ GÜNCELLEME (2026-08-15): **ön-koşul KARŞILANDI** — KARAR 5 düzeltmesi canlıda (#37+#71). Bu iş artık yapılabilir → **sıradaki v1 adayı**. Kart, mevcut merkezi `canViewerSeeDiscType` kuralından beslenir (menti→mentör DISC göstermez; bakan-role göre ayrışma hazır).
   > ⚠️ GÜNCELLEME (2026-08-15, merge turu): **menti→mentör yönü MERGED, canlıda (#39+#74).** Kalan (mentör→menti kartı DISC+gerekçeli + yönetici havuz kartları md.10/11) follow-up.
   > ⚠️ GÜNCELLEME (2026-08-15, 5-PR merge turu): **yönetici havuz md.10 durum rozeti ZATEN VARDI + md.11 sertifika rozeti canlıda (#40+#77).** Kalan follow-up: yalnız **mentör→menti aday kartı DISC+gerekçeli** (RankedMenti'ye menti discType; KARAR 5 izin verir).
   > ⚠️ GÜNCELLEME (2026-08-15, kısmi): **menti→mentör yönü PR açık (backend #39 + çatı #74), merge PO'da.** GÜVENLİ YOL: `computeTotalScore` ters yönde → `rankMentorsForMenti` (yeni salt-okuma endpoint `GET /mentis/:id/mentor-matches`, canlı eşleştirme değişmedi). Menti kartı %skor + jenerik gerekçe gösterir; **KARAR 5: mentör discType/discScore menti response'unda YOK** (test: `mentor-matches.test.ts`). **KALAN (follow-up):** mentör→menti aday kartı DISC+gerekçeli (RankedMenti'ye menti discType eklenmeli — KARAR 5 izin verir) + yönetici havuz kartları (md.10/11 rozetlerle).
   > ⚠️ GÜNCELLEME (2026-08-17, #37 turu — #7 kod-gerçeği doğrulaması + ERTELENDİ): **DİKKAT — "follow-up kartı" iki farklı okumaya geliyor; İKİSİ DE "sıfırdan büyük iş/hiçbiri yok" DEĞİL. "eşleşme sonrası hiç izlenmiyor" varsayımı kod gerçeğiyle ÇELİŞİYOR.**
   >
   > **(A) Bu maddenin (md.5) LİTERAL kapsamı = havuz aday KARTI + "neden uyumlu" gösterimi.** menti→mentör yönü canlıda (#39+#74). Kalan: (a) mentör→menti aday kartı gerekçe — backend `compatibilityReason` ÜRETİYOR (`matchingController.ts:10-16`), FE render YOK (`frontend/.../(dashboard)/mentor/page.tsx:417-442`), FE tipinde alan yok (`types/matching.ts:41-54`) → **FE-only, S**; (b) menti DISC HARFİ — `RankedMenti`'de `discType` YOK, yalnız `discScore` % (`services/matching.ts:6-19`); controller DISC tipini bilinçli gizliyor (KARAR 3, `matchingController.ts:8-9`) → backend+FE, **S–M**, ama KARAR 3 ↔ KARAR 5 ↔ md.4/#12 uzlaştırması PO'da. **Migration YOK.** (Detay: 2026-08-16 #7 keşfi.)
   >
   > **(B) "Eşleşme SONRASI takip mekanizması" okuması = büyük ölçüde ZATEN VAR (greenfield değil).** Kanıt (`backend/prisma/schema.prisma`): görüşme takibi `Meeting`(500)+`MeetingCheckIn`(539) — durum döngüsü/check-in/risk sinyali; iletişim izi `Conversation`(414)+`Message`(445) — unread/bildirim; anlaşma yaşam döngüsü `MentorshipAgreement`(1181, DRAFT→ACTIVE→RENEWAL→ENDED); ilişki durumu `Match`(981)+`MatchStatus`(917, ACTIVE/COMPLETED/EARLY_EXIT/DISSOLVED); ilerleme `learning-journey`. **GERÇEKTEN eksik olan:** bunları TEK "eşleşme takip panosu" kartında birleştiren UI + merkezi "after-match journey" alanı (şu an dağınık: `Meeting.notes`, `MeetingCheckIn.openNote/nextTopicNote`). Bu birleştirme UI-ağırlıklı; migration ancak merkezi model istenirse gerekir.
   >
   > **KULLANICI/PO KARARI GEREKLİ:** #7 ile kastedilen (A) kart-gösterimi mi, (B) takip-panosu birleştirmesi mi? Her iki durumda da iş "kısmen mevcut"tan devam eder, sıfırdan tablo+migration DEĞİL. **Ertelendi** — #30 (sertifika) / #31 (DISC-yaklaşım) ile birlikte PO ile detaylı netleştirilecek.
8. **Sol menü 4-grup gruplama (KARAR 1 · =md.2)** — ~~`layout.tsx` hâlâ "3+Gelişmiş"~~.
   > ⚠️ GÜNCELLEME (2026-08-15): ✅ **TAMAMLANDI, CANLIDA (çatı #76).** 4 grup uygulandı: Günlük İşler · İnsanlar · Program & İçerik · Ayarlar & Kurulum. Salt-frontend (`(admin)/layout.tsx`).
9. **Algoritma Kalibrasyon sayfası (md.6)** — sayfa var ama sadece rapor-frekansı; ağırlık (0.60/0.40) gösterimi/ayarı yok.
   > ⚠️ GÜNCELLEME (2026-08-17): 2026-08-17 brief'i "yapıldı" dedi ama **kod-doğrulama NEGATİF** — `(admin)/admin/algorithm-tuner/page.tsx`'te 0.60/0.40 ağırlık gösterimi grep'te YOK. **AÇIK kalıyor** (kod gerçeği esas).
10. **Durum rozeti (KARAR 3)** — Onaylı/Bekliyor/Pasif, yalnız yönetici görür.
    > ⚠️ GÜNCELLEME (2026-08-15): ✅ **ZATEN MEVCUTTU** (kod gerçeği — ⏳ yanlıştı). Mentör+menti havuz tablosunda "Durum" sütunu `APPROVAL_META` ile Onaylı/Bekliyor/Reddedildi gösteriyor (`mentor-havuzu/page.tsx`, `menti-havuzu/page.tsx`); admin-only. Yeniden yapılmadı, teyit edildi.
11. **Sertifika rozeti (KARAR 4)** — "Sertifikalı ✓", herkes görür.
    > ⚠️ GÜNCELLEME (2026-08-15): ✅ **TAMAMLANDI, CANLIDA (backend #40 + çatı #77).** **KİŞİ-GENELİ** — kişi herhangi bir kurumda sertifikalıysa mentör havuzunda "✓ Sertifikalı"; `TenantMembership.isCertified` `some()` ile türetilir (`UserProfile.isCertified` bakımsız → kullanılmadı; migration gerekmedi).
12. **✅ DISC baskın+ikincil HARF "DI" (KARAR 11 · =md.4) — MERGED, CANLIDA (2026-08-19).**
    > ⚠️ GÜNCELLEME (2026-08-19): **✅ MERGED, canlıda** — backend #47 (`4c63d0e`) + çatı #93 (`61b6eb2`) + docs #94 (`42e35bf`). Türetilmiş 1–3 harf (ör. "D","DI","Di","DIs"). **Eşikler PO onaylı:** orta çizgi **0.25** (normalize vektör, eşit pay — `discVectorService.ts:130-143`) + BÜYÜK/küçük = **birincilin %75'i**. Tek merkezi `DISC_LETTER_CONFIG` (başlangıç değerleri; gerçek veriyle kalibre edilecek). **Migration YOK** — harf saklanan vektörden türetilir (`discLetters.ts`). **Güvenlik:** yalnız harf gönderilir, ham vektör response'a KONMAZ (KARAR 5/PII; `admin.test.ts` doğrular). **Gösterim:** yönetici havuz (menti/mentör/bekleme) + kendi profil + menti dashboard (paylaşılan `DiscBadge`). **Kapsam DIŞI (belirgin):** peer kartı (menti→mentör KARAR 5'te gizli), platform üye tablosu + DISC dağılım grafiği (agregat), eşleşme aday kartı (=#7).
13. **Soru cevap-tipi seçimi (md.10)** — soru formunda şıklı/açık-uçlu seçimi. *(⚠️ kapsam belirsiz — aşağıda teyit.)*
    > ⚠️ GÜNCELLEME (2026-08-17): **AÇIK (yapılmadı) — brief "yapıldı" dedi, YANLIŞ.** Önceki turda koddan kanıtlandı: `Question` modelinde cevap-tipi alanı YOK (`schema.prisma`) → yeni alan = **migration** = canlı DB yazımı → 🛑 kırmızı kural. "Küçük FE" değil, **full-stack M** (schema + form + test rendering). Kapsam hâlâ belirsiz (hangi tipler/validation/skoring) → **PO netleştirmeli**, migration onaylı ayrı tur.

## v1-D · ★ 2026-08-15 KEŞİF TESPİTLERİ (yeni — PO önceliklendirir)
> Kaynak: `docs/raporlar/degerlendirme-test-soru-envanteri-2026-08-15.md` + `icerik/` + `eksikler-derinlestirilmis-2026-08-15.md`.
29. **İş 2 + İş 3 (P1+P2+P3) — ✅ TAMAMEN CANLIDA (2026-08-16)** — migration (User'a 5 nullable alan) + onay/red izi + red gerekçesi + yönetici-adı gösterimi + reddedilen kullanıcı akışı.
    > ⚠️ GÜNCELLEME (2026-08-16): İş 2 (izi) + İş 3 P1 (gerekçe) + yönetici-adı canlıda (#41+#81+#82+#42+#83).
    > ⚠️ GÜNCELLEME (2026-08-16, P2/P3): **İş 3 P2/P3 de CANLIDA (#43+#85, Yol 1).** Reddedilen kullanıcı doğru şifreyle gerekçesini görür (token yok, enumeration-safe) + `POST /api/auth/reapply` ile tekrar başvurur (REJECTED→PENDING, red geçmişi korunur, IDOR-safe). Kibar red e-postası. **İş 3 ailesi kapandı.** Kabul edilen sınırlar → yeni maddeler #35-#37.
30. **⚠️ Sertifika bankası canlıda eksik (5 vs 20)** — kodda 20 senaryo (`seed-certification.ts`), canlıda yalnız 5 soru (salt-okuma sayımı). Zengin banka seed edilmemiş → `seedCertification()` kontrollü çalıştırma. **Canlı DB yazımı → PO onayı ZORUNLU** (tehlikeli tam `seed.ts` değil; bu fonksiyon idempotent/silmez ama canlıda çalışır).
31. **DISC-tipine-özel "mentiye yaklaşım" içeriği YOK (en büyük içerik boşluğu)** — hiçbir testte mentinin DISC tipine göre uyarlanan yaklaşım içeriği yok. 3 seçenek (eksikler raporu): (1) statik yaklaşım kılavuzu (M, önerilen) · (2) SJT'yi menti-DISC koşullu genişletme (L, migration) · (3) sertifikaya tip-özel varyant (L, önerilmez). Kısmen v2 #20 (KARAR 9) ile ilişkili — PO netleştirir.
32. **Admin soru düzenleme UI (S)** — ~~backend PATCH hazır (`questionController.ts`), FE'de düzenle butonu yok~~ → salt-frontend, hızlı kazanç.
    > ⚠️ GÜNCELLEME (2026-08-17): ✅ **TAMAMLANDI, CANLIDA (çatı #87).** Kuruma özel soruya Düzenle butonu + inline form; backend PATCH `/api/questions/:id` (ADMIN + tenant-scoped IDOR) zaten hazırdı. Yalnız metin düzenlenir. CI Integration (Admin) yeşil. *(Bu madde v1-D + v1-E'de iki kez listelenmişti — kopya; ikisi de kapandı.)*
33. **Çift DISC seed temizliği + SJT belge-kod çelişkisi (S)** — `seed.ts` (32 soru) ile `seed-questions.ts` (20, canlıda olan) çelişiyor → tek kaynağa indir. Ayrıca `03-psikometri` "4 pedagojik SJT" der, kodda 3 var → SJT genişlet ya da belgeyi düzelt.
    > ⚠️ GÜNCELLEME (2026-08-17): ✅ **KISMİ (backend #45).** Ölü/çelişen `prisma/seed-questions.ts` (hiç import edilmeyen standalone, 20 global DISC) **silindi** — aktif `seed.ts` (32) canonical kaldı. **DB'ye dokunulmadı, seed çalıştırılmadı.** **KALAN (PO kararı, canlı DB yazımı):** (a) **seed↔canlı**: canlıda 20 DISC var (eski seed izi), `seed.ts` 32 üretir → re-seed mi trim mi? (b) **SJT belge-kod**: kod **3** (doğrulandı), `03-psikometri:47` "4" der → belge kod gerçeğine hizalandı (bu tur), 4'e içerik genişletme PO kararı. *(Madde v1-D + v1-E'de iki kez — kopya.)*
34. **Öğrenme yolculuğu tamamlanma görünürlüğü (S)** — yönetici kimin tamamladığını göremiyor (`learningJourneyCompletedAt` admin select'te yok); retention için faydalı.
    > ⚠️ GÜNCELLEME (2026-08-17): brief "yapıldı" dedi ama **kod-doğrulama NEGATİF** — `learningJourneyCompletedAt` STK `adminController` select'inde YOK (yalnız `platformTenantController` = platform süper-admin drill-down'da var). STK yönetici hâlâ göremiyor → **AÇIK** (kod gerçeği esas). *(Madde v1-D + v1-E'de iki kez — kopya.)*

## v1-E · ★ YÖNETİCİ KULLANICI YÖNETİMİ + GÜVENLİK (2026-08-16 tespitleri — PO ileride)
> İş 3 P2/P3 turundan çıkan yeni işler. Şimdi kodlanMADI; kayda geçti.
35. **İki tip red: "düzeltme iste" vs "kalıcı reddet/ghost" (M-L, migration olası)** — Şu an tek tip red (kibar e-posta + tekrar başvuru). İSTENEN: yönetici reddederken seçsin: (a) **Düzeltme iste** → mevcut akış (e-posta + kullanıcı gerekçe görür + tekrar başvurur); (b) **Kalıcı reddet/ghost** → kullanıcıya HİÇ bildirim gitmez (sessiz), tekrar başvuramaz, sistemde görünmez. Gerekçe: kuruma uygun olmayan kişiye "tekrar başvurabilirsiniz" demek yanlış. Muhtemelen backend'e red-tipi alanı (migration, canlı DB → PO onayı) + 2 buton + e-posta ayrımı.
36. **Onaylanmış (aktif) kullanıcıyı sistemden çıkarma (⚠️ önce KEŞİF)** — yönetici zaten onaylanmış menti/mentörü sonradan çıkarabilmeli (red değil; kabul edilmişi pasifleştirme/atma). **Kodda ZATEN VAR MI belirsiz** → ayrı turda önce git'ten doğrula (isActive=false/demote var mı), eksikse yap.
37. **✅ Giriş enumeration sertleştirme (PENDING dahil) — güvenlik — MERGED, CANLIDA (2026-08-19).**
    > ⚠️ GÜNCELLEME (2026-08-19): **✅ MERGED, canlıda** — backend #46 (`b6187c1`) + çatı #91 (`af33339`) + docs #92 (`1cd2c56`). "Önce kimlik doğrula → sonra duruma göre yönlendir" deseni: yok/OAuth/şifresiz/yanlış-şifre → hepsi aynı generic 401; durum (REJECTED/pasif/PENDING) yalnız doğru şifreden SONRA. PENDING şifre-öncesi sızıntısı KAPANDI. Enumeration testleri (`auth.test.ts`) CI'da. **Şema değişmedi (migration yok).** Bilinen sınır: timing yan-kanalı kapsam dışı (üretim-öncesi, düşük risk).
30. **⚠️ Sertifika bankası canlıda eksik (5 vs 20)** — kodda 20 senaryo (`seed-certification.ts`), canlıda yalnız 5 soru (salt-okuma sayımı). Zengin banka seed edilmemiş → `seedCertification()` kontrollü çalıştırma. **Canlı DB yazımı → PO onayı ZORUNLU** (tehlikeli tam `seed.ts` değil; bu fonksiyon idempotent/silmez ama canlıda çalışır).
31. **DISC-tipine-özel "mentiye yaklaşım" içeriği YOK (en büyük içerik boşluğu)** — hiçbir testte mentinin DISC tipine göre uyarlanan yaklaşım içeriği yok. 3 seçenek (eksikler raporu): (1) statik yaklaşım kılavuzu (M, önerilen) · (2) SJT'yi menti-DISC koşullu genişletme (L, migration) · (3) sertifikaya tip-özel varyant (L, önerilmez). Kısmen v2 #20 (KARAR 9) ile ilişkili — PO netleştirir.
32. **Admin soru düzenleme UI (S)** — ~~backend PATCH hazır (`questionController.ts`), FE'de düzenle butonu yok~~ → salt-frontend, hızlı kazanç.
    > ⚠️ GÜNCELLEME (2026-08-17): ✅ **TAMAMLANDI, CANLIDA (çatı #87).** Kuruma özel soruya Düzenle butonu + inline form; backend PATCH `/api/questions/:id` (ADMIN + tenant-scoped IDOR) zaten hazırdı. Yalnız metin düzenlenir. CI Integration (Admin) yeşil. *(Bu madde v1-D + v1-E'de iki kez listelenmişti — kopya; ikisi de kapandı.)*
33. **Çift DISC seed temizliği + SJT belge-kod çelişkisi (S)** — `seed.ts` (32 soru) ile `seed-questions.ts` (20, canlıda olan) çelişiyor → tek kaynağa indir. Ayrıca `03-psikometri` "4 pedagojik SJT" der, kodda 3 var → SJT genişlet ya da belgeyi düzelt.
    > ⚠️ GÜNCELLEME (2026-08-17): ✅ **KISMİ (backend #45).** Ölü/çelişen `prisma/seed-questions.ts` (hiç import edilmeyen standalone, 20 global DISC) **silindi** — aktif `seed.ts` (32) canonical kaldı. **DB'ye dokunulmadı, seed çalıştırılmadı.** **KALAN (PO kararı, canlı DB yazımı):** (a) **seed↔canlı**: canlıda 20 DISC var (eski seed izi), `seed.ts` 32 üretir → re-seed mi trim mi? (b) **SJT belge-kod**: kod **3** (doğrulandı), `03-psikometri:47` "4" der → belge kod gerçeğine hizalandı (bu tur), 4'e içerik genişletme PO kararı. *(Madde v1-D + v1-E'de iki kez — kopya.)*
34. **Öğrenme yolculuğu tamamlanma görünürlüğü (S)** — yönetici kimin tamamladığını göremiyor (`learningJourneyCompletedAt` admin select'te yok); retention için faydalı.
    > ⚠️ GÜNCELLEME (2026-08-17): brief "yapıldı" dedi ama **kod-doğrulama NEGATİF** — `learningJourneyCompletedAt` STK `adminController` select'inde YOK (yalnız `platformTenantController` = platform süper-admin drill-down'da var). STK yönetici hâlâ göremiyor → **AÇIK** (kod gerçeği esas). *(Madde v1-D + v1-E'de iki kez — kopya.)*

---

# 🔵 v2 — SONRA (ağır / riskli / ileri-faz)

## v2-A · Algoritma (canlı davranış — staging ŞART)
14. **Sektör skoru servisi canlı bağlama (eski İŞ 7)** — 5-bileşen `sector-scorer.service.ts` yazılı, canlı yola bağlı değil. Canlı eşleşmeyi değiştirir → **staging şart**.
15. **Eşleştirmeyi birleştir (eski İŞ 8)** — iki paralel skorlama tek sisteme; İŞ 7 sonrası, staging'de.

## v2-B · Büyük/riskli (DB + migration + geri-alınamaz)
16. **F3 — Tenant hard-delete (KVKK Md.7)** — sadece freeze var. **GERİ-ALINAMAZ + DB** (canlı=lokal aynı Neon) → önce keşif + PO kararı, ANCAK sonra kod.
17. **F6 — Hayalet mod + toplu CSV davet** — şemada yok → yeni model/migration → ayrı büyük tur, PO onaylı.
18. **`VisibilityOptIn.requestMessage` şema kolonu DROP** (🔵) — ertelenmiş teknik borç; DB'ye dokunur → PO-onaylı ayrı migration turu.

## v2-C · İleri-faz / bilinçli ertelenmiş (🔵 — boşluk DEĞİL)
19. **"Neden uyumlu" Katman 2 (KARAR 8)** — ürün olgunlaşınca zenginleştirme.
20. **Mentör yaklaşım kılavuzu Katman 3 (KARAR 9)** — vizyon; KVKK rıza + mahremiyet + etik karar ÖNCE.
21. **Sektör kolonu (KARAR 10 · =md.3)** — canlı-sonrası (veri girişi boşluğu, blocker değil).
22. **Landing UX paketi + yumuşak lacivert tema** — tooltip/hover/WCAG kontrast/kart/slogan/light-tema DISC renk-rozet (canlı-sonrası).
23. **Push bildirim (gerçek Expo/FCM)** — şu an stub (`sent:true`); in-app/e-posta idare ediyor.

## v2-D · Retention / güvenlik-iyileştirme / altyapı
24. **Retention otomatik nudge (cron)** — manuel `nudgeUser` var; otomatik zamanlı yok.
25. **Privacy center UI + DISC için ayrı rıza** (KVKK ileri).
26. **RLS lint kuralı** (`findUnique` sızıntı tuzağı — güvenlik-iyileştirme, `04:18`).
27. **Staging ortamı (eski İŞ 5)** — `staging.sivilkapasite.org` + ayrı Neon branch + Dokploy 2. app (v2-A'nın ön koşulu).
28. **Ortam temizliği** — merged worktree/branch sil (`cati-lj/bump/compose`); önce `git branch --merged` teyidi.

---

# ⚠️ v1/v2 SINIRDA — PO KARARI GEREKLİ
- **K6 — Admin server-side guard** (`frontend/src/middleware.ts` yok, client-side only). API zaten backend-korumalı → **savunma-derinliği, blocker DEĞİL**. v1-güvenlik mi v2-iyileştirme mi → **PO kararı**.
- **Sektör/etiket başlangıç havuzu (KARAR 12 · =md.12)** — seed'de etiket var, admin-yönetilir tablo yok. **seed mi / admin-tablo mu** = şema+keşif+PO kararı. Panel görünümü (v1) mi, şema-işi (v2) mi → **PO kararı**.

# ❓ ÖNCE TEYİT / ÜRÜN KARARI GEREK (kodlanamaz — keşif ister)
> Bunlar v1/v2 sırasına sokulmadan önce **keşif veya PO ürün kararı** ister; doğrudan kodlanamaz.
- **SJT/scoring endpoint'leri** (`/scoring/compute-profile`, `/rank-mentors`) — backend hazır, FE çağrısı yok → **bağla mı sil mi? PO ürün kararı** (canlı eşleşme farklı yol kullanıyor).
- **F5 — Eşleşme hesaplama tetikleyicisi** — event-driven mi sayfa-açılınca mı (`08:20`) → keşif + PO.
- **KARAR 6 — Otomatik onay** (önden davet→onaylı) — `InvitationTemplate` var, tetik yok → keşif.
- **super-admin router + `setVisibilityOptIn` (Taraf-1)** — sil / bağla / ertele → PO kararı (ikisi de kasıtlı korundu, testli).
- **Match DB'ye persist ediliyor mu** · **ön-tanımlı davet otomatik onay (Yol B)** — teyit (DB'ye bağlanılmadı).
- **Öğrenme yolculuğu kalan uçları** (DISC ton, STK düzenleme, içerik onayı, uçtan uca test) — teyit.
- **STK iki-aha modeli** · **mentör görünürlük opt-in ekranı (7a)** · persona sunum fikirleri (ilk-aha/reddi-yumuşat/emeği-görünür) — teyit.
- **K3 — Eski kayıt consent politikası** (yeniden-rıza / bulk / erteleme) — PO kararı.
- **md.11 gereksiz tek-seçenekli dropdown** — minor UI, güncel formda teyit.

---

# 🟢 E) ÜRÜN SAHİBİ MANUEL İŞLERİ (kod değil — ayrı kuyruk)
- **⚠️ Foto volume / Dokploy ayarı — CANLI/MERGE ÖNCESİ ŞART.** `/app/uploads` kalıcı volume + `UPLOAD_DIR` + uid 1001 yazma izni; yoksa fotolar sessizce silinir. (`dokploy-foto-volume-talimati.md`)
- Chat uçtan uca canlı test · Mentör metriklerini canlıda gözle görme · Repoları PRIVATE yapma.
- **Sunucu/altyapı güvenliği** (Dokploy HTTP, firewall, SSH, SSL, yedekleme) — ayrı tur, altyapı (`04:49-51`).

---

# ✅ TAMAMLANDI — bu turda bayattan düşürüldü (tarihsel iz)
> Karar-statü haritası bunları **kod TAM** buldu; yol haritası hâlâ "yapılacak" sayıyordu → düşürüldü. Detay: `09-DURUM.md`.
- **F1 — Fotoğraf yükleme** ✅ (kanıt: `avatarController.ts:23-57` + `profile/page.tsx:101-207`). "foto zorunlu kart" bağı ayrı iş (v1-C kart).
- **F2 — Platform drill-down UI** ✅ (kanıt: `platformTenantController.ts` + `lib/api/platform.ts`).
- **F7 — KPI drill-down (sayıdan kişiye)** ✅ (kanıt: `retentionMetrics.service.ts` + `ProgramHealthSection.tsx`).
- **#62 STK admin S işleri** (md.1 şifre · md.7 yönetici atama · md.9 CORE/DEEPENING TR) ✅ · **md.8 soru görünürlük · md.13 sertifika konuları** ✅ (doğrulandı).

---

## 📌 HER İŞTE SABİT KURALLAR
- Mod bildir: keşif→PLANLA (salt-okuma) · kod+"merge etme"→BYPASS. Merge gerekince "BYPASS + şu PR'a merge yetkisi (PO onaylı)".
- Güvenlik ağı: uzun otonom işlerde "PR aç, MERGE ETME" → ürün sahibi en sonda inceler.
- Submodule sırası: backend PR → çatı pointer → çatı PR (ara commit yok).
- Neon migration: `IF NOT EXISTS` + `db execute` + `migrate resolve`; `db push` YASAK. Canlı=lokal aynı DB → onay al.
- Test güvenliği: `TEST_DATABASE_URL` yoksa testler gerçek Neon'a truncate atmaz (guard).
- Canlı davranışı değiştiren her iş (sektör skoru, eşleştirme birleştirme) staging'den SONRA.
- Temiz kod: sabitler config'te, açık isim, DRY, katman ayrımı, mevcut stile uy. Kullanıcıya görünen metin Türkçe.
