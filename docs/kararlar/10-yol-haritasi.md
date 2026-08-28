# MentiMentor — Yol Haritası (SIRADAKİ İŞLER) · v1/v2 öncelikli

**🔄 YAŞAYAN** (canonical: iş kuyruğu)

> **Çıkış önceliği için bkz. `00-CIKIS-PLANI.md`** — bu belge tüm açık işleri **numara sırasıyla** tutar; çıkış-öncesi/sonrası sınıflandırması (K0-K5) çıkış planındadır.

> Bu belge yalnızca **BUNDAN SONRA yapılacak açık işleri** öncelik sırasıyla tutar. Biten işler burada durmaz —
> güncel durum `09-DURUM.md`'de; 2026-08-10 öncesi tam geçmiş `docs/arsiv/09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md`'de.
>
> **Son güncelleme:** 2026-08-22 (**analiz + SEO paketi turu**: (1) 6 boyutlu salt-okuma denetim `analiz.md`, ana-agent koddan doğruladı → **biten maddeler (1-5,7A,8-12,29,32,34,37) kompakt ✅ stub'a indirildi** (uzun geçmiş → `10-yol-tamamlananlar.md`); **madde 38-50** eklendi (en kritik: **#38 `updateUser` password-hash sızıntısı** + **#39 `hardDeleteUser` KVKK-silme FK-patlaması**, ikisi de YÜKSEK). (2) **PO SEO/kurumsal/a11y isteği → madde 51-66** eklendi (🔴 **#66 KRİTİK `www`→çıplak-host 301** · favicon/OG/sitemap/robots/lang · GTM+GA4+Clarity+GSC · Hakkımızda/İletişim/Footer/alt-nav · scroll-top+WhatsApp · JSON-LD · WCAG · tema — mevcut durum koddan doğrulandı). Kod PR açılmadı (salt-okuma/kayıt turu). Detay: kök `analiz.md`.
> Önceki: 2026-08-19 (merge turu — **#7 Aşama 1 ✅ MERGED, canlıda**: değerlendirme/metrik ölü uçları bağlandı (backend #48 + çatı #100). Çatı `ef2b995` · backend `b5f4b88` · pointer senkron · açık kod PR 0/0. Detay: `09-DURUM.md` "✅ #7 AŞAMA 1". **Aşama 2/3 açık** (otomatik pasifleştirme=migration, yeniden değerlendirme, ContextualFeedbackHost).
> Önceki: 2026-08-19 (**#12 DISC çoklu harf ✅ MERGED, canlıda** (backend #47 + çatı #93 + docs #94) · **#37 giriş enumeration sertleştirme ✅ MERGED, canlıda** (backend #46 + çatı #91 + docs #92, madde 37 kapandı — PENDING dahil). Çatı `753c545` · backend `b6187c1` · açık kod PR 0/0. Detay: `09-DURUM.md`. Eski tarih katmanları: `docs/arsiv/09-DURUM-gecmis-katmanlar-2026-08-19.md`.
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

# 🎯 AKTİF AÇIK İŞLER — HIZLI INDEX (yalnız yapılacaklar)

> **Bu bölüm "aktif yol haritası"nın özüdür:** yalnız **açık/yapılacak** maddeleri gösterir. Detay + gerekçe için aşağıdaki
> numaralı bloklara in (madde numaraları referans için sabittir — değişmez). **✅ Biten işlerin tam kaydı:**
> `docs/kararlar/10-yol-tamamlananlar.md` (v1 tamamlananlar) + `09-DURUM.md` (şu an). **v2 backlog** aşağıda ayrı bölümde (madde 14-28).

**🔴 v1-A güvenlik/yasal BLOCKER (analiz 2026-08-22 — canlı-öncesi):**
- **38** — `updateUser` password+PII sızıntısı · **✅ CANLIDA (#51 MERGED → backend main `b4b6d66`)** — db.ts global omit + explicit select + test.
- **39** — `hardDeleteUser` FK-RESTRICT nedeniyle gerçek veride patlar → **KVKK Md.7 silme çalışmıyor** · *AÇIK, YÜKSEK* — migration olası (SetNull), PO onaylı.
- **40** — KVKK FE üçlüsü (dışa aktarma/anonimleştirme/kalıcı silme) yok — backend hazır · *AÇIK* (Md.20 görünürlük boşluğu, #39 ile).
- **67** — 🍪 Çerez-izni bandı (KVKK cookie consent) · *AÇIK, ÖNCELİKLİ* — analytics'in (#56) yasal ön-koşulu; rıza-öncesi izleme durmalı (Consent Mode v2). (Not: #56 GTM/GA4 yapısı EN SON kontrol edilecek.)

**🟢 v1 açık işler (canlı-öncesi, PO başlattıkça):**
- **6** — Onay paneli bildirim maili · *KALAN:* kurum(tenant)-onay/ret maili + `destek@` + prod `PLATFORM_ADMIN_EMAIL` (kullanıcı maili zaten çalışıyor).
- **7** — Havuz KART follow-up · *KALAN:* (A) gerekçe ✅ MERGED + Aşama 1 ✅; **Aşama 2/3 açık** (otomatik pasifleştirme=migration, yeniden değerlendirme, ContextualFeedbackHost) → PO onaylı migration turu.
- **9** — Algoritma kalibrasyon · **9a** ayar + **9b** motor-okuma → **✅ CANLIDA (backend #52 `838d128` + çatı #114 `6e6e798`; migration YOK).** DURAK-A: özel ağırlıklı tenant 0.
- **95** — Kalibrasyon "son değişiklik" aktör izi → **✅ CANLIDA (backend #53 `b433554` + çatı #116 `9b09dc3`; migration YOK).** Detay: `00-KARAR-TAKIP` madde 95.
- **93+39 (96)** — Tam anonimleştirme + hardDelete→anonymize → **✅ CANLIDA (backend #54 `b433554`; PO (c)+(iii)+(2); migration YOK).** Sınır: userId (cuid) kalır → hukukçu H-9. Detay: `00-KARAR-TAKIP` madde 96.
- **13** — Soru cevap-tipi seçimi · *AÇIK* — migration (canlı DB) + kapsam belirsiz → PO netleştir, onaylı ayrı tur.
- **30** — Sertifika bankası 5→20 seed · *AÇIK* — canlı DB yazımı → PO onayı zorunlu.
- **31** — DISC-tipine-özel "mentiye yaklaşım" içeriği · *AÇIK* — en büyük içerik boşluğu, PO netleştir.
- **33** — SJT belge-kod (4 vs 3) + seed↔canlı (32 vs 20) *KALAN* · *AÇIK* — canlı DB yazımı → PO.
- **35** — İki tip red: "düzeltme iste" vs "kalıcı reddet/ghost" · *AÇIK* — migration olası, PO.
- **36** — Onaylanmış (aktif) kullanıcıyı sistemden çıkarma · *AÇIK* — önce keşif (kodda var mı?).

**⚠️ v1/v2 sınırda + ❓ önce teyit:** aşağıdaki ilgili bölümlerde (K6 guard, sektör havuzu, SJT endpoint bağlama vb. — PO/keşif kararı).

**🔵 v2 backlog (15 iş, dokunulmamış):** madde 14-28 — aşağıda "v2 — SONRA" bölümü (algoritma/DB-riskli/ileri-faz/retention).

**🧹 Analiz tespitleri (2026-08-22, `analiz.md`):** madde **38-50** — aşağıda "v1-F/v3 ANALİZ TESPİTLERİ" bölümü (güvenlik/DB blocker'ları 38-39, FE-eksik modüller 40-43, ölü kod + temiz kod + a11y 44-50).

**🌐 SEO + kurumsal sayfa + ölçüm + a11y (2026-08-22, PO isteği):** madde **51-66** — aşağıda "v1-G/v3 SEO PAKETİ". **🔴 #66 KRİTİK: `www`→çıplak-host 301** (şu an www ile açılıyor, kanonik yönlendirme yok). Ayrıca: favicon/OG/sitemap/robots/lang 51-55 · GTM/GA4/Clarity/GSC 56 · Hakkımızda/İletişim/Footer/Nav 57-59 · scroll-top + WhatsApp buton 60-61 · JSON-LD 62 · semantik HTML + WCAG + tema 63-65. ⚠️ #56 analytics KVKK çerez-rızası ister. #59 (alt nav) PO netleştir.

---

# 🗺️ KOD İŞ SIRASI — PO ÖNCELİK (2026-08-28)

> **Bu bölüm S17 sözünün çıktısıdır** (KURAL 8 adım 3: öncelik verildi → roadmap satırı).
> Her kalem TEK SATIR + kart referansı; **detay kopyalanmaz** → canonical:
> `../raporlar/bilanco/kararlar/00-ONCELIK-SIRASI-2026-08-28.md` (sıra) + `G*.md` kartları (karar).
> ⚠️ Mevcut madde numaraları korunur; burada YENİ numara açılmaz.
> ⚠️ SIRA, TAAHHÜT DEĞİL: Faz 1-2 (+Faz 0 PO-manuel) bitince kullanıcı alınabilir; Faz 7-8'in bir kısmı hiç yapılmayabilir.

**🟣 FAZ 0 — PO-PARK** (kod sırasından çıkarıldı, İPTAL EDİLMEDİ — env/ayar bekliyor):
- G8-01+G8-02 foto volume+env · G5-01+G5-02 kurum maili · G1-09 destek@ · G1-10+G1-13 aydınlatma+kulüp beyanı (avukatta) · G1-28 sunucu sertleştirme · G8-03+G8-04 canlı testler · G8-05 yedek env sil · G8-08 izole test DB.

**FAZ 1 — Ucuz temizlik** (paralel güvenli, migration yok):
- ✅ **Faz 1a (2026-08-28, PR — MERGE BEKLİYOR):** G9 belge-düzeni 12 kalem (G9-02/03/04/05/06/08/09/10/13/14/15/16) + G9-05 gerekçe TAMAM. Detay: G9 kartları ✅.
- ⬜ **Faz 1b (kod temizliği — AYRI TUR):** G10-01 ölü kod · G6-07 kullanılmayan paket · G8-06 dal temizliği · G3-15 yazım · G7-12 slogan · G7-13 tema yönü.
- ⏸️ G9-11/G9-12 (büyük belge reorg) + G9-07 (OneDrive taşıma, PO-manuel) = ŞİMDİLİK ALINMADI.

**FAZ 2 — Çıkış blokeri kod tarafı:**
- G1-05 KVKK hak ekranı · G1-07 rıza sürümü ⚠️ MIGRATION TEK BAŞINA · G1-06 otomatik imha · G1-08 OAuth rıza ayrımı · **G1-01 yaş 18+ form+DB** (PO 2026-08-28: Faz 8→Faz 2, KVKK zinciri).

**FAZ 3 — Güvenlik incelikleri:**
- ⭐ G1-17+G7-04 BİRLİKTE (aynı `middleware.ts`) · G1-04 SuspicionReport tenantId · G1-23 logoUrl guard · G1-26 CAPTCHA/IP limit · G1-02 DISC harf teyidi · G1-19 qualityMultiplier okuma teyidi · G1-14+G1-15 denetim izi.

**FAZ 4 — Veri temeli** (⚠️ algoritmadan ÖNCE):
- S21 profil envanteri (KEŞİF; tasarım B10.6) · Üç soru S1/S2/S3 + görünürlük ⚠️ MIGRATION TEK BAŞINA (B10.2/10.3) · G1-29+G6-03 tenant silme+onDelete ⚠️ MIGRATION TEK BAŞINA · G1-16 rıza backfill (⭐ şimdi ucuz).

**FAZ 5 — Algoritma** (ana iş; tasarım B9):
- G2-09 sektör asimetri (B9.4) · G2-10 kalite çarpanı çift-uygulama (B9.5) · G2-07+G2-08+G10-21 sektör+OCEAN (TEK İŞ) · 12 senaryo+arketipler ⚠️ MIGRATION (B3/B5) · yeni skor+2 veto (B9.1/9.2/9.3) · madde 125 derinleşme/triggersOn (B6) · G4-01 havuz kartı (B10.3) · göç planı (B12, ⚠️ AÇIK).

**FAZ 6 — İçerik:**
- ⭐ G3-09 seed runner ÖNCE (G3-08'i kilitler) · G3-08 sertifika 5→20 (⚠️ canlı DB, PO onayı) · G3-13 answerType ⚠️ MIGRATION · G3-19 etiket havuzu · sertifika hatalı-konu hedefleme (B7) · öğrenme↔sertifika yüzey ayrımı (B8) · menti personası çeşitlendirme (B8) · G3-16+G3-18 canlı içerik teyidi · **G3-05 sertifika soru ekleme yetkisi** (PO 2026-08-28: Faz 8→Faz 6).

**FAZ 7 — Kullanıcı deneyimi:**
- G4-22+G4-23 bekleme anı · G4-24 menti özgüven sunumu · G4-25 ret yumuşatma · G4-30 yönetici export · G4-31 kırmızı uyarı · G5-04 bildirim izni · G5-07 push stub · G7-01+G7-02+G7-09 erişilebilirlik (TEK PAKET) · **G4-39 "görüşme tamamladım" kartı** (PO 2026-08-28: Faz 8→Faz 7).

**FAZ 8 — Kalanlar:**
- G4-02/04/05/08/14/17 panel · G6-01 N+1 · G6-05 metin merkezileştirme · G7-03 SEO · G10-22/23 · G5-05 geri bildirim akışı · **keşifler:** G4-09+G4-10 super-admin · G10-25 profil düzenleme.
- ⚠️ **DURAK kalemleri PO'ca karara bağlandı (2026-08-28):** G2-01..05 → 🗑️ GEÇERSİZ (DISC→Big Five, sıralamadan çıkarıldı) · G1-01→Faz 2 · G3-05→Faz 6 · G4-39→Faz 7. **Faz 8'de kalan:** G2-11 KARAR 6 oto-onay tetiği · G8-13 sekme yavaşlığı · G8-14 sol-alt kullanıcı menüsü. (Detay: `../raporlar/bilanco/kararlar/00-ONCELIK-SIRASI-2026-08-28.md`.)

**Bağlı işler:** G1-13↔G1-10 · G3-04→G3-13 · G1-17↔G7-04 · G2-07+G2-08+G10-21 · G8-01↔G10-25 · G3-09→G3-08 · G5-01+G5-02+G1-09. (Detay: `00-ONCELIK-SIRASI-2026-08-28.md`.)

---

# 🟢 v1 — CANLI ÖNCESİ (öncelikli, sırayla)

## v1-A · 🔴 GÜVENLİK & YASAL BLOCKER (canlı-öncesi ŞART)

1. **✅ KARAR 5 — DISC güvenlik açığı düzeltmesi — v1 #1, canlı-öncesi ŞART → TAMAMLANDI, CANLIDA** *(backend #37 + çatı #71 MERGED, 2026-08-15).* Menti artık mentörün DISC tipini görmüyor (merkezi `discVisibility.ts`/`canViewerSeeDiscType`); regresyon testi CI'da. **Tam tarihsel gövde:** `10-yol-tamamlananlar.md` md.1 · **güncel anlatı:** `09-DURUM.md` "✅ GÜVENLİK". *(ÖN-KOŞUL notu tarihsel: havuz kart işi bundan SONRA yapıldı.)*
2. **✅ K2 — OAuth `kvkkConsentAt`** (KVKK) — **MERGED, canlıda (#38+#73).** OAuth `handleNewUser` + self-serve kurucu admin `new Date()` set eder; test `oauth-kvkk-consent.test.ts`.
3. **✅ K4 — Yaş 18+ doğrulama** (KVKK) — **MERGED, canlıda (#38+#73).** **PO kararı: ayrı kutu DEĞİL** → tek KVKK onayının metnine gömüldü ("...ve 18 yaşından büyük olduğumu beyan ederim"). DB'ye yaş yazılmaz (şema yok) — öz-beyan kapısı.
4. **✅ K5 — Sunucu konumu beyanı** (KVKK) — **MERGED, canlıda (#73).** `kvkk/page.tsx` "8. Sunucu Konumu ve Yurt Dışı Aktarım" (İrlanda/AB, KVKK Md.9). Taslak-not disclaimer'ı kapsamı korur (hukukçu gözden geçirebilir).

> **Not:** K1 yasal metinler ✅ yazılı (hukukçu onayı ayrı, PO/dış iş). K3 (eski kayıt consent politikası) → aşağıda "❓ önce karar".

## v1-B · ★ AZ İŞLE KAZANÇ (🟨/🟧 — S, ucuz kazanım)
5. **✅ ThemeToggle admin/platform nav — ZATEN MEVCUT** (kod-doğrulandı 2026-08-17; `(admin)/layout.tsx:92` + `platform/dashboard`). Kayıt: `10-yol-tamamlananlar.md` md.5.
6. **Onay paneli bildirim maili** (S-M) · *KISMİ.* **✅ Biten:** kullanıcı onay/ret maili çalışıyor; `requestCorrection` bug düzeltildi (backend #44); kurum mail altyapısı + "düzeltme iste" akışı MERGED, canlıda (backend #50 + çatı #104). **🔴 KALAN (AÇIK):** kurum onay/ret **mail GÖNDERİMİ KAPALI** (`TENANT_NOTIFICATIONS_ENABLED=false`, log-only) → PO `destek@` + prod SMTP env kurup bayrağı açacak (00-KARAR-TAKIP **37m**).

> (K2 OAuth consent + K5 sunucu konumu da S-boyu az-işle-kazanç; yasal oldukları için v1-A'da.)

## v1-C · STK ADMİN PANEL — TAM GÖRÜNSÜN (görünüm eksikleri)
7. **Havuz KART + "Neden uyumlu" (KARAR 2/7 · =md.5)** · *KISMİ.* **✅ Biten (canlıda):** menti→mentör kart yönü (#39+#74); (A) mentör→menti aday kartı "neden uyumlu" gerekçe FE render (#49+#102); #7 AŞAMA 1 = değerlendirme/metrik ölü uçları bağlandı (kalite puanı + risk rozeti, backend #48 + çatı #100). Tam kayıt: `09-DURUM.md` "✅ #7 AŞAMA 1", tasarım `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md`.
   > **🟡 KALAN (AÇIK) — Aşama 2/3 (migration'lı):** otomatik pasifleştirme + tenant eşik alanı + checkpoint gerçek bildirim (Aşama 2); yeniden değerlendirme + onay döngüsü + pasif-hatırlatma + `ContextualFeedbackHost` bağlama (Aşama 3). Ayrıca menti DISC HARFİ aday kartına eklenmedi (KARAR 3↔5 uzlaştırması PO'da). → PO onaylı migration turu.
8. **✅ Sol menü 4-grup gruplama (KARAR 1 · =md.2) — TAMAMLANDI, CANLIDA (çatı #76, 2026-08-15).** Günlük İşler · İnsanlar · Program & İçerik · Ayarlar & Kurulum. Kayıt: `10-yol-tamamlananlar.md` md.8.
9. **Algoritma Kalibrasyon sayfası (md.6)** · *KISMİ.* **✅ Biten (canlıda):** "Mevcut Eşleştirme Ağırlıkları" gösterim kartı (%60/%40) + `GET /api/admin/algorithm-tuner/weights` (backend #49 + çatı #102). **✅ CANLIDA (backend #52 + çatı #114, MIGRATION YOK):** **9b** motor kaydedilen ağırlığı okur (N+1 yok, regresyon) · **9a** tenant manuel ayar (`PUT weights` + FE +/− UI). DURAK-A (Neon prod salt-okuma): özel ağırlıklı tenant **0** → sıralama değişmedi. Kalan: **madde 95** (aktör izi).
10. **✅ Durum rozeti (KARAR 3) — ZATEN MEVCUTTU (kod-doğrulandı 2026-08-15).** Havuz "Durum" sütunu (`APPROVAL_META`, admin-only). Kayıt: `10-yol-tamamlananlar.md` md.10.
11. **✅ Sertifika rozeti (KARAR 4) — TAMAMLANDI, CANLIDA (backend #40 + çatı #77).** Kişi-geneli "✓ Sertifikalı" (`TenantMembership.isCertified` `some()`). Kayıt: `10-yol-tamamlananlar.md` md.11.
12. **✅ DISC baskın+ikincil HARF "DI" (KARAR 11 · =md.4) — MERGED, CANLIDA (backend #47 + çatı #93 + docs #94, 2026-08-19).** Türetilmiş 1–3 harf, tek merkezi `DISC_LETTER_CONFIG`, migration yok (vektörden türetilir), ham vektör response'a konmaz (KARAR 5/PII). Kayıt: `10-yol-tamamlananlar.md` md.12.
13. **Soru cevap-tipi seçimi (md.10)** — soru formunda şıklı/açık-uçlu seçimi. *(⚠️ kapsam belirsiz — aşağıda teyit.)*
    > ⚠️ GÜNCELLEME (2026-08-17): **AÇIK (yapılmadı) — brief "yapıldı" dedi, YANLIŞ.** Önceki turda koddan kanıtlandı: `Question` modelinde cevap-tipi alanı YOK (`schema.prisma`) → yeni alan = **migration** = canlı DB yazımı → 🛑 kırmızı kural. "Küçük FE" değil, **full-stack M** (schema + form + test rendering). Kapsam hâlâ belirsiz (hangi tipler/validation/skoring) → **PO netleştirmeli**, migration onaylı ayrı tur.

## v1-D · ★ 2026-08-15 KEŞİF TESPİTLERİ (yeni — PO önceliklendirir)
> Kaynak: `docs/raporlar/kod-denetimi/degerlendirme-test-soru-envanteri-2026-08-15.md` + `icerik/` + `eksikler-derinlestirilmis-2026-08-15.md`.
29. **✅ İş 2 + İş 3 (P1+P2+P3) — TAMAMEN CANLIDA (#41-#43, #81-#85, 2026-08-16).** Onay/red izi + red gerekçesi + yönetici-adı + reddedilen kullanıcı akışı (enumeration-safe gerekçe görüntüleme + `reapply`). Kayıt: `10-yol-tamamlananlar.md` md.29.
30. **⚠️ Sertifika bankası canlıda eksik (5 vs 20)** — kodda 20 senaryo (`seed-certification.ts`), canlıda yalnız 5 soru (salt-okuma sayımı). Zengin banka seed edilmemiş → `seedCertification()` kontrollü çalıştırma. **Canlı DB yazımı → PO onayı ZORUNLU** (tehlikeli tam `seed.ts` değil; bu fonksiyon idempotent/silmez ama canlıda çalışır).
    > ⚠️ GÜNCELLEME (2026-08-23) — **BLOKE (T5):** `seed-certification.ts` **hiçbir runner/npm-script'e bağlı değil** (tek seed komutu = tehlikeli `prisma/seed.ts`). Dosya kod-kanıtlı GÜVENLİ (yalnız `upsert`) ama **güvenli çalıştırma yolu yok.** Önce idempotent, yalnız certification tablosuna yazan **güvenli runner** eklenmeli (ör. `npm run seed:certification`), SONRA PO onaylı DB turu. Detay: `00-KARAR-TAKIP.md` Bölüm F (T5).
31. **DISC-tipine-özel "mentiye yaklaşım" içeriği YOK (en büyük içerik boşluğu)** — hiçbir testte mentinin DISC tipine göre uyarlanan yaklaşım içeriği yok. 3 seçenek (eksikler raporu): (1) statik yaklaşım kılavuzu (M, önerilen) · (2) SJT'yi menti-DISC koşullu genişletme (L, migration) · (3) sertifikaya tip-özel varyant (L, önerilmez). Kısmen v2 #20 (KARAR 9) ile ilişkili — PO netleştirir.
32. **✅ Admin soru düzenleme UI (S) — TAMAMLANDI, CANLIDA (çatı #87, 2026-08-17).** Kuruma özel soruya Düzenle butonu + inline form (backend PATCH zaten hazırdı, tenant-scoped IDOR). Kayıt: `10-yol-tamamlananlar.md` md.32.
33. **Çift DISC seed + SJT belge-kod çelişkisi (S)** · *KISMİ.* **✅ Biten (backend #45):** ölü/çelişen `prisma/seed-questions.ts` silindi, `seed.ts` (32) canonical. **🟡 KALAN (AÇIK, PO + canlı DB yazımı):** (a) seed↔canlı = canlıda 20 DISC, `seed.ts` 32 üretir → re-seed mi trim mi? (b) SJT belge-kod = kod 3, belge 4 diyordu → belge hizalandı; 4'e içerik genişletme PO kararı.
34. **✅ Öğrenme yolculuğu tamamlanma görünürlüğü (S) — MERGED, CANLIDA (backend #49 + çatı #102, 2026-08-19).** `adminListUsers` select + menti/mentör havuzuna "Öğrenme Yolculuğu" kolonu. STK yöneticisi artık kimin tamamladığını görür. Kayıt: `10-yol-tamamlananlar.md` md.34.

## v1-E · ★ YÖNETİCİ KULLANICI YÖNETİMİ + GÜVENLİK (2026-08-16 tespitleri — PO ileride)
> İş 3 P2/P3 turundan çıkan yeni işler. Şimdi kodlanMADI; kayda geçti.
35. **İki tip red: "düzeltme iste" vs "kalıcı reddet/ghost" (M-L, migration olası)** — Şu an tek tip red (kibar e-posta + tekrar başvuru). İSTENEN: yönetici reddederken seçsin: (a) **Düzeltme iste** → mevcut akış (e-posta + kullanıcı gerekçe görür + tekrar başvurur); (b) **Kalıcı reddet/ghost** → kullanıcıya HİÇ bildirim gitmez (sessiz), tekrar başvuramaz, sistemde görünmez. Gerekçe: kuruma uygun olmayan kişiye "tekrar başvurabilirsiniz" demek yanlış. Muhtemelen backend'e red-tipi alanı (migration, canlı DB → PO onayı) + 2 buton + e-posta ayrımı.
36. **Onaylanmış (aktif) kullanıcıyı sistemden çıkarma (⚠️ önce KEŞİF)** — yönetici zaten onaylanmış menti/mentörü sonradan çıkarabilmeli (red değil; kabul edilmişi pasifleştirme/atma). **Kodda ZATEN VAR MI belirsiz** → ayrı turda önce git'ten doğrula (isActive=false/demote var mı), eksikse yap.
37. **✅ Giriş enumeration sertleştirme (PENDING dahil) — güvenlik — MERGED, CANLIDA (backend #46 + çatı #91 + docs #92, 2026-08-19).** "Önce kimlik doğrula → sonra duruma göre yönlendir": tüm başarısız hâller aynı generic 401; durum yalnız doğru şifreden sonra. PENDING sızıntısı kapandı, testler CI'da, migration yok. Kayıt: `10-yol-tamamlananlar.md` md.37. Bilinen sınır: timing yan-kanalı (üretim-öncesi, düşük risk).
> ⚠️ GÜNCELLEME (2026-08-19, tekrar denetimi): Bu blokta ayrıca **madde 30-34 ikinci kez** (v1-D ile birebir aynı metinle)
> listelenmişti — **gerçek kopya** (aynı iş + aynı bağlam + aynı statü, kelime-kelime doğrulandı). Kopya kayıtlar arşive
> alındı: `docs/arsiv/yol-haritasi-kopya-kayitlar-2026-08-19.md`. **Asıl/canonical kayıtlar yukarıda v1-D bloğunda** (madde 30-34).

---

# 🧹 v1-F / v3 · ANALİZ TESPİTLERİ (2026-08-22 — `analiz.md`, PO önceliklendirir)
> Kaynak: kök `analiz.md` (6 boyutlu salt-okuma denetim, ana-agent koddan doğruladı). Statüler kod gerçeğiyle kanıtlı.
> Kod PR açılmadı (analiz turu). Not: bazıları aşağıdaki v2/"❓ teyit" maddeleriyle örtüşür — çapraz-referans verildi.

## v1-F-A · 🔴 GÜVENLİK & KVKK (canlı-öncesi değerlendir)
38. **🔴 `updateUser` yanıtı `password` hash + tüm PII sızdırıyor (YÜKSEK)** — `userController.ts:272-277` `.update` explicit `select` YOK → bcrypt hash + `discVector`/email/CV döner. Aynı dosyada `createUser`/`updateMyProfile` select kullanıyor; bu handler atlanmış. **Etki:** `PATCH /api/users/:id` (ADMIN) başka üyeyi güncellerken hash+PII yanıta düşer (CLAUDE.md "password ASLA dönmesin" ihlali). **Fix (düşük risk, hızlı):** explicit `select` + kalıcı olarak global `omit:{user:{password:true}}`. *(ana-agent koddan doğruladı.)* → kanıt+kod-teyidi: `00-KARAR-TAKIP.md` Bölüm F.1 (G1). · **✅ CANLIDA (#51 MERGED, `b4b6d66`).**
39. **🔴 `hardDeleteUser` FK-RESTRICT nedeniyle patlar → KVKK Md.7 silme çalışmıyor (YÜKSEK)** — `gdprService.ts:145-178` transaction yalnız 6 tabloyu siliyor; `Meeting`/`Feedback`/`Conversation`/`Message`/`UserReport`/`MentorshipAgreement` FK'leri RESTRICT → gerçek veride `tx.user.delete()` rollback. **Kodun kendi yorumu (171-174) bunu itiraf ediyor.** **Fix:** silme öncesi zinciri tamamla VEYA istatistik-korunacaklarda userId nullable + `onDelete:SetNull`. Sil vs anonimleştir = PO kararı, migration → PO onaylı. (v2 #16 tenant-hard-delete ile akraba, ayrı.) → kanıt+kod-teyidi: `00-KARAR-TAKIP.md` Bölüm F.1 (G2).
40. **KVKK FE üçlüsü yok** (dışa aktarma `GET /users/:id/export` [Md.20] · anonimleştirme · kalıcı silme) — backend hazır, FE'de 0 çağrı (doğrulandı). #39 çözülünce birlikte bağlanmalı. PO kararı.

## v1-F-B · 🟡 BACKEND VAR / FRONTEND YOK — bağlanmamış modüller (PO: özellik mi ölü mü?)
41. **Kulüp modülü FE yok** — tüm `clubRoutes` (`GET/POST/PATCH /api/clubs...`) FE'de 0 çağrı (doğrulandı). Backend tam. Yarım özellik → PO netleştir.
42. **Feedback-logs modülü FE yok** — tüm `feedbackLogRoutes` (ML geri bildirim) FE'de 0 çağrı. Yarım özellik → PO.
43. **Kurum-içi şikayet inceleme FE yok** — `GET/PATCH /api/admin/reports` (tenant-admin tarafı) FE'de yok; yalnız platform `user-reports` var. → PO.
> **Not:** mentör görünürlük opt-in FE'si zaten "❓ teyit" bölümünde madde 7a olarak kayıtlı (analiz de FE'de 0 çağrı buldu — teyit güçlendi). super-admin router / scoring endpoint'leri de aynı bölümde (aşağı bkz.).

## v1-F-C · 🧹 ÖLÜ KOD + TEMİZ KOD + a11y (düşük-orta, çoğu PO onayı ister)
44. **Kesin-ölü kod (yüksek güven, PO onayıyla sil):** `services/llmRetry.ts` (0 importer, tüketicisi silinmiş) · `context/TenantContext.tsx` (0 import, canonical = `providers/TenantProvider.tsx`) · `organisms/MeetingScheduler.tsx` (0 import; `mentor/availability` mantığı inline kopyalamış). *(ana-agent 0-import doğruladı.)*
45. **Yarım-özellik ölü kod (silme, niyeti yok eder → araştır/bağla):** `TenantSwitcher.tsx` (çok-kurum UI, nav'a konmamış) · `ProfileStrengthCard.tsx` + `profile-completeness.service.ts` (uçtan uca bağlanmamış) · `sector-scorer.service.ts` (=v2 #14) · `matchingInterface.ts` (JOB_LISTING iskeleti, planlı) · ContextualFeedback kümesi (=#7 Aşama 3).
46. **Kullanılmayan 5 `@radix-ui/*` paketi** (avatar/dialog/dropdown-menu/separator/toast) — FE'de 0 import; bundle/audit temizliği. Kaldırınca `npm run build` yeşil kalmalı (DOĞRULANMALI).
47. **Temiz-kod borcu:** Zod doğrulama-hata bloğu ~85 yerde birebir kopya → `validate()` middleware · refresh-token/cookie güvenlik yardımcıları `authController` ↔ `selfServeController` duplike (güvenlik-hassas) → paylaşılan modül · 100+ satırlık handler'lar (login/getKpiDashboard) service'e bölünmeli.
48. **DB performans:** konuşma listesi N+1 (2N+1 sorgu, `conversationController.ts:236`) · pagination'sız liste endpoint'leri (`requestController`/`feedbackLogController`/`clubController`) → `take` ekle.
49. **DB bütünlük:** string-tabanlı enum adayları (`UserReport.reason/status`, `Tenant.plan/...`, `MeetingCheckIn.*`, `InvitationTemplate.role`) → zamanla enum · çift rol kaynağı `User.role` vs `TenantMembership.role` (CLAUDE.md canonical = membership) legacy/terk netleştir (00-KARAR-TAKIP çift-kaynak adayı).
50. **a11y noktasal borç:** `ReportUserButton` şikayet modalı `role="dialog"`/focus-trap/Escape yok (doğrulandı) → `ConfirmDialog` desenine taşı · `admin/questions` form 3 select + textarea label'sız · `DailyQuestionWidget` radiogroup deseni yok (`LikertScale` varken). (=v2 #22 WCAG paketi ile örtüşür.)

---

# 🌐 v1-G / v3 · SEO + KURUMSAL SAYFA + ÖLÇÜM + a11y PAKETİ (2026-08-22 — PO isteği)
> Kaynak: ürün sahibi isteği (SEO / pazarlama / erişilebilirlik). "Mevcut durum" notları bu tur **koddan doğrulandı**.
> ⚠️ **KVKK NOTU:** GA4/Clarity/GTM izleme çerezleri KVKK'da **açık rıza** ister → **çerez-izni bandı** (madde 56) izleme kodlarından ÖNCE devreye girmeli (Consent Mode v2).

## v1-G-A · SEO teknik altyapı (server-side)
66. **🔴 KRİTİK — `www` → `www`'suz 301 kalıcı yönlendirme (kanonik host)** — mevcut: site şu an **`www.` ile açılıyor**; iki host (www / çıplak) aynı içeriği sunuyor → **duplicate content + bölünmüş link değeri + kanonik belirsizliği**. Yapılacak: `www.<domain>` → çıplak `<domain>` **301** (kalıcı). **Uygulama yüzeyi (kod-doğrulandı):** `middleware.ts` YOK + `next.config.mjs`'de redirect YOK. Seçenekler: (a) **Dokploy/Traefik reverse-proxy** düzeyinde host-redirect (önerilen — Next.js'ten önce, en temiz) · (b) `next.config.mjs` `redirects()` + `has:[{type:'host',value:'www.<domain>'}]` (standalone output ile çalışır). **Bağımlı:** #52 `metadataBase`/canonical **çıplak host** olmalı; #54 sitemap/robots URL'leri çıplak host; **SSL sertifikası her iki host'u da kapsamalı.** (Kısmen altyapı işi → E) bölümü ile de ilişkili.)
51. **Favicon = kurum logosu + ikon seti** — mevcut: yalnız default `app/favicon.ico`. Eklenecek: logo-favicon + `app/icon.png` + `app/apple-icon.png` + `app/opengraph-image.(png|tsx)` (Next.js dosya-tabanlı metadata; otomatik `<link>`/OG).
52. **OG/Twitter + `metadataBase` + canonical (tüm sayfalar)** — mevcut: **landing** (`app/page.tsx:18-39`) OG+twitter+robots VAR (`locale:'tr_TR'`); **root layout** (`app/layout.tsx:32-35`) minimal (OG YOK), iç public sayfalar OG'siz, `metadataBase`/canonical YOK. Eklenecek: root'a `metadataBase` + varsayılan OG + her public sayfaya başlık/description/canonical.
53. **SEO için doğru server-side render** — mevcut: landing zaten **server component** (SSR, iyi taban). Yapılacak: public pazarlama/yasal sayfalar SSG/SSR olsun; **dashboard/admin/platform rotaları `noindex`** (özel içerik) → robots + meta ile arama dışı bırak.
54. **`app/sitemap.ts` (dinamik/otomatik) + `app/robots.ts`** — YOK. Next.js App Router `sitemap.ts` dinamik üretir. **"Her sayfa yayınlandığında otomatik"** = public rota listesini **tek kaynaktan türet** (statik public dizi + dinamik rotalar) → yeni sayfa eklenince sitemap kendiliğinden güncellenir. `robots.ts` sitemap URL'i + dashboard `disallow` yazsın.
55. **`lang` = Türkiye Türkçesi** — mevcut: `app/layout.tsx:39` `lang="tr"`. Değişecek: **`lang="tr-TR"`**.

## v1-G-B · Ölçüm & arama konsolu (⚠️ önce çerez rızası)
56. **GTM + GA4 + Clarity + GSC kurulumu** · *KISMİ — kod eklendi (2026-08-22), build yeşil.* **✅ Yapıldı:** `components/analytics/Analytics.tsx` (`next/script`, yalnız production) — GTM `GTM-WVRM7WFN` (head betiği + body `<noscript>`), GA4 `G-920PDSDB4D` (gtag.js), Clarity `y6gtphs1l7`; GSC doğrulama `layout.tsx` `metadata.verification.google`. ID'ler gizli değil → koda gömülü (PO onaylı). `layout.tsx`'e bağlandı. **🔴 KALAN:** (a) PR + merge + deploy (bu turda merge/deploy YOK) · (b) canlıda doğrulama (GSC "Doğrula" + GA realtime + Clarity oturum) · (c) **⚠️ KVKK çerez-izni bandı YOK** → kodlar şu an rıza-öncesi tetikleniyor; Consent Mode v2 ile koşullandırılmalı (bant ayrı iş). ID'ler ileride çok-ortam olursa env'e taşınabilir (şu an prod-tek, gömülü kabul edildi).
   > 📌 NOT (2026-08-22, PO): **GTM + GA4 yapısı EN SON kontrol edilecek** — canlı deploy sonrası (çift-sayım/GTM-container tag doğrulaması + GSC "Doğrula" + GA realtime). Şimdilik dokunulmaz.
67. **🔴 ÖNCELİKLİ — Çerez-izni bandı (KVKK cookie consent)** — GA4/Clarity/GTM izleme çerezleri KVKK'da **açık rıza** ister; şu an madde 56 kodları **rıza-öncesi** tetikleniyor. Yapılacak: çerez-izni bandı (kabul / ret / ayarla) + **Consent Mode v2** — rıza verilene dek izleme tag'leri tetiklenmez, reddedilirse analytics yüklenmez, tercih saklanır (yeniden sorulmaz). Erişilebilir (klavye/focus, `role`), Türkçe metin. **Bu, madde 56'nın (analytics) yasal ÖN-KOŞULudur → analytics canlıya alınmadan ÖNCE yapılır.**

## v1-G-C · Kurumsal sayfalar + navigasyon + footer
57. **Hakkımızda + İletişim sayfaları** — YOK (`app/hakkimizda`, `app/iletisim` oluştur). İletişim'e WhatsApp/e-posta + (varsa) form. Nav + footer menüye ekle.
58. **Footer'ı paylaşılan bileşene çıkar + yasal linkleri BAĞLA** — mevcut: footer **inline + yalnız landing'de** (`app/page.tsx:53-73`); "Gizlilik Politikası"/"Kullanım Koşulları" **ölü `<span>` metin (link DEĞİL)**. Oysa sayfalar VAR: `/gizlilik`, `/kvkk`, `/terms`, `/metodoloji`. Yapılacak: `components/.../Footer.tsx` paylaşılan bileşen + gerçek `<Link>` (gizlilik/kvkk/terms/hakkimizda/iletisim) + tüm public layout'lara ekle.
59. **Navbar girişlerini tek alt bara toplama** — mevcut: `app/_sections/Navbar`. **❓ PO NETLEŞTİR:** "tek bara çevirilip altta gösterilecek" = **mobil alt sabit navigasyon (bottom-nav)** mı, tüm cihazlarda mı? Cihaz+kapsam belirlenmeli (erişilebilir: `<nav aria-label>`, klavye/focus, aktif-durum).

## v1-G-D · Yüzen aksiyon butonları (a11y'li)
60. **Scroll-to-top butonu** — YOK. Kaydırınca sağ-altta belirir; erişilebilir (`<button aria-label="Yukarı çık">`, klavye + `focus-visible`).
61. **WhatsApp yüzen buton** — YOK. Scroll-top'un **ÜSTÜnde**; tıklayınca `https://wa.me/905534702863` (0553 470 28 63 → +90 uluslararası). `aria-label="WhatsApp ile iletişim"`, yeni sekme (`target="_blank" rel="noopener"`).

## v1-G-E · Yapısal veri (JSON-LD schema)
62. **JSON-LD schema** — YOK. Eklenecek: **Organization** (logo/iletişim/sosyal) + **WebSite** (+ SearchAction) root/landing'de; **BreadcrumbList** iç sayfalarda; uygunsa **Service** / **FAQPage**. Server component'te `<script type="application/ld+json">` ile.

## v1-G-F · Semantik HTML + WCAG (frontend + dashboard)
63. **Semantik HTML kurgusu (frontend geneli)** — kısmen (landing `main`/`footer` var). Yapılacak: tüm public + dashboard sayfalarında landmark (`header/nav/main/footer`), başlık hiyerarşisi, liste/section semantiği gözden geçir.
64. **WCAG denetimi — HEM dashboard HEM frontend** — analiz **#50** başlangıç bulgularını verdi (ReportUserButton modal, admin/questions label, DailyQuestionWidget radiogroup). Yapılacak: kapsamlı **WCAG 2.1 AA** denetimi (kontrast, klavye, ARIA, focus, form) + düzeltme; axe/Lighthouse ölçümü.
65. **Tema (sistem rengine göre + sağ-üst toggle)** — ✅ **BÜYÜK ÖLÇÜDE MEVCUT** (kod-doğrulandı): `ThemeProvider` + `layout.tsx:24` FOUC-önleyen init script `prefers-color-scheme`'e göre light/dark + `ThemeToggle` (=md.5). Yapılacak: public/landing'de toggle'ın sağ-üstte olduğunu teyit + parlatma (yeni iş değil).

## v1-H · 2026-08-23 tam-belge + niyet taramasından (madde 68-78)
> Yalnız kuyruk satırı — kanıt/kod-teyidi/boy/migration **`00-KARAR-TAKIP.md` Bölüm F**'te (tekrar edilmez). Numara sabit (68'den).
68. **🔴 `SuspicionReport` listesi reporter PII'sini maskesiz döner** (`platformController.ts:353`, select yok) · *AÇIK, güvenlik* · detay: Bölüm F.1 (G3).
69. **✅ Zod VALIDATION mesajı** — **CANLIDA (#51 MERGED → backend main `b4b6d66`)** (`firstValidationMessage`; FE otomatik gösterir). Detay: KARAR-TAKIP F.2 + `10-yol-tamamlananlar`.
70. **✅ adaptive-test `progress`** — **CANLIDA (#51 MERGED)** (migration yok; FE guard kaldırma = ayrı FE turu, kalan). Detay: KARAR-TAKIP F.2 + `10-yol-tamamlananlar`.
71. **🟡 `SuspicionReport`'ta `tenantId` yok → raporlar global, tenant-izolasyon boşluğu** · *AÇIK, güvenlik/izolasyon* · detay: Bölüm F.2 (T3).
72. **🔵❓ Sertifika baraj "0 puan" kuralı yalnız `isRedLine`'da** — "tüm sorularda mı" kararı yok · detay: Bölüm F.2 (T4).
73. **🟡 Güvenli sertifika seed runner ekle** (`seed-certification.ts` runner'a bağlı değil — **madde #30'u bloklar**) · *AÇIK* · detay: Bölüm F.2 (T5).
74. **❓ Mükerrer/eski platform API konsolidasyonu** (`super-admin/*` + `system-logs` — `platform/*`/`platform/logs` ikamesi) · detay: Bölüm F.2 (T6).
75. **🟡 Mentör görünürlük opt-in FE ekranı** (backend `setVisibilityOptIn` + test var, FE bağlı değil) · *AÇIK* · detay: Bölüm F.2 (T7).
76. **❓ Sıfırdan manuel eşleştirme çelişkisi** (envanter "eksik" ↔ strateji "elle eşleştirme YASAK") — PO kararı · detay: Bölüm F.2 (T8).
77. **🟡 Platform tek-kullanıcı profil drill-down endpoint'i yok** (üye listesi var, kişiye inilmiyor) · detay: Bölüm F.2 (T9).
78. **🟡 Mentör emeği görünür kılma** (takdir/rozet/"yılın mentörü" — persona-kaynaklı, hiç yok) · detay: Bölüm F.2 (T10).

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
