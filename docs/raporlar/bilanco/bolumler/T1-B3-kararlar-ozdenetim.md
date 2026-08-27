# BELGE BİLANÇOSU — TUR 1 / GRUP B3 (`docs/kararlar/oz-denetim/` — 7 belge)

**📸 DONDURULMUŞ** (bilanço bölümü — 2026-08-26) · Tur 1/GRUP-B3 · Salt-okuma. Kod/DB/PR/commit YOK.

> **Ne bu:** `docs/kararlar/oz-denetim/` altındaki 7 öz-denetim belgesinin baştan-sona okuma-sayımı. Bu belgeler
> projenin KENDİ kararlarının gerçekle uyumunu denetleyen ESKİ fotoğraflardır (2026-08-10..14, DONDURULMUŞ).
> Her defter satırı `T1-A-canonical.md` ile çaprazlandı: eski bulgu aradan kapanmış mı (✅) yoksa hâlâ açık mı (⬜/❓).
> **Numara DOĞURMADIM · belge SİLMEDİM/TAŞIMADIM · hakem OLMADIM. NİHAİ RAPOR/PR YAZILMAZ.**

---

## 0. OKUMA İLERLEME TABLOSU

| belge | satır | tam okundu | bulunan kalem |
|---|:---:|:---:|:---:|
| `belge-aksiyon-denetimi-2026-08-11.md` | 315 | ✅ TAM | ~55 karar/bulgu (4 kategori: YAPILDI/YOL-HARİTASINDA/UNUTULDU/TEYİT) + 2 öne-çıkan liste (15 kalem) + KVKK vaka (4) |
| `belge-denetimi-2026-08-10.md` | 106 | ✅ TAM | 10-yol İŞ 0-8 + 09-DURUM bloklar + 4 belge-içi çelişki + geçersiz/açık listeler |
| `belge-temizlik-haritasi-2026-08-14.md` | 145 | ✅ TAM | 44 belge sınıflandırma + 5 öne-çıkan liste (bayat/gruplama/arşiv/INDEX/etiket) |
| `durum-panosu-2026-08-14.md` | 158 | ✅ TAM | 92 statü satırı özet + AZ-İŞLE-KAZANÇ 14 + 7 küme tablo + 4 dikkat kutusu |
| `karar-statu-haritasi-2026-08-14.md` | 216 | ✅ TAM | ~72 karar (7 küme, 3-boyut) + 🟨 10-liste + roadmap-bayat + 🟥/❓ listeler |
| `stk-admin-bulgu-envanteri-2026-08-11.md` | 63 | ✅ TAM | 13 bulgu (B1-B13, B8 alt-parçalı) + öncelik + tip dağılımı |
| `unutulmus-niyet-envanteri-2026-08-10.md` | 122 | ✅ TAM | K1-K7 kritik + 4 kategori (A/B/C/D) ~40+ niyet |

**GRUP-B3 toplam: 7/7 belge TAM okundu. Okunmayan: 0.**

> **Genel bağlam:** Bu 7 belge birbirinin ÜSTÜNE bina edilmiş (karar-statu-haritasi kendisi diğer 5'i kaynak alır;
> durum-panosu = karar-statu'nun görsel özeti). Aynı kararlar farklı numaralarla (İŞ 0-8 / K1-K7 / F1-F7 / KARAR 1-12 /
> md.1-13 / B1-B13) tekrar geçer. Aşağıdaki defter TEKİL kaynak-satır bazında yazılmıştır; tekrar eden kararlar
> ilk kaynağında tam, sonrakilerde "(≡ üstteki X)" notuyla verildi. Canonical (T1-A) çaprazı her satırda.

---

## 1. DEFTER — belge-aksiyon-denetimi-2026-08-11.md (315 satır)

> En kapsamlı eski denetim (34 belge tarandı). Kategoriler: YAPILDI (kod kanıtlı) · YOL-HARİTASINDA · UNUTULDU · TEYİT GEREK.

| kaynak (dosya:satır) | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| :30-35 | DISC eşleştirme · multi-tenant · anti-toksik · freemium · modül-sırası · Erasmus-iptal | NUMARASIZ (çekirdek) | ✅ YAPILDI | freemium=❓politika (T1-A KÜME1 ⬜), modül-sırası=❓; kalanı çekirdek canlı |
| :40-45 | Canlı=lokal Neon · Express+Prisma+Next15 · SMTP mail · Neon migration kuralı · seed uyarısı · "31 migration/60+ model" | NUMARASIZ | ✅ YAPILDI (son satır ❓) | "31 migration" sayısı TEYİT GEREK (belge kendisi "sayılmadı" diyor) |
| :50-57 | DISC→OCEAN · 8 arketip · formül 0.60/0.40 · hard-gate · SJT(Likert red) · **sektör-skoru 5-bileşen canlı-yola bağlı DEĞİL** · sertifika · fallback | madde 14 (sektör) | ⬜ AÇIK (sektör) | sektör-skoru = T1-A madde 14 v2 backlog + karar-statu 🟨; kalanı ✅ |
| :62-66 | 5-katman tenant izolasyon · X-Tenant JWT çapraz · **2 IDOR** · certified→Membership · DISC maske · audit log | NUMARASIZ (güvenlik) | ✅ YAPILDI | **2 IDOR ✅ ÇÖZÜLDÜ 2026-08-14 (`161ae00`)** — belge içinde :66 çözüm notu var; T1-A KÜME2 teyit. certified→Membership=❓K7 açık |
| :67 | certified/qualityMultiplier tüm okumalar Membership'ten mi (K7) | NUMARASIZ (K7) | ❓ TEYİT GEREK | S1(kimlik) — kod kanıtı yok, canonical'da da ❓; T1-A'da yok, açık |
| :70 | Privacy center UI / DISC ayrı rıza / 18+ / FK nullable | ≈madde 40/83/K4 | ⬜ AÇIK | T1-A madde 40 (KVKK FE ⬜) + 83 (OAuth rıza ❓) |
| :75-81 | Platform admin panel · 5 admin panel · takvim+meeting-feedback · **meeting timezone** · öğrenme-yolculuğu · ağırlık-ayarı hardcoded · **arkadaş başvuru b3** | NUMARASIZ | ✅/❓ karışık | timezone+b3 = TEYİT (muhtemelen eskimiş); ağırlık-ayarı = madde 9a ✅ CANLIDA (#52); panel ✅ |
| :86-92 | Dark/light tema · **ThemeToggle admin/platform** · **landing slogan değişimi** · landing UX · DISC-renk-WCAG · **yumuşak lacivert tema** · kart tasarımı | madde 5(toggle)/F4(slogan)/22(UX) | ⬜ AÇIK (çoğu) | toggle: T1-A madde 5 ✅ ama admin/platform nav'da yok (karar-statu 🟨); slogan=F4 🟥; lacivert=UNUTULDU |
| :88 | **Landing slogan ("Mentörlük programınızı…") page.tsx hâlâ eski** | F4 | ⬜ AÇIK | UNUTULDU işaretli; karar-statu F4 🟥 "PO tam metni onaylayınca"; S2 içerik |
| :91 | **Yumuşak lacivert tema yönelişi — karar var, kod yok** | NUMARASIZ | ⬜ AÇIK | UNUTULDU; roadmap'te net değil (landing-UX'e gömülü olabilir → PO teyit); S2 |
| :97-99 | 8-unsur prompt · hafıza sistemi · DB/prod refleksleri | NUMARASIZ (süreç) | ✅ YAPILDI | CLAUDE.md süreç kuralı |
| :104-111 | Yaş 18+ · veri-sorumlusu+sunucu · yasal-metin · **eşleşme tetikleyicisi** · yöneticilik-verme · etiket-ekleme · foto-zorunlu · kart-DISC-gösterim | K4/K5/K1/F5/md.7/md.12 | ⬜ AÇIK | eşleşme tetikleyicisi=UNUTULDU (F5 ❓); K5 sunucu=T1-A madde 4 ✅ (Londra #73); yöneticilik=md.7 ✅(#62) |
| :107 | **Eşleşme tetikleyicisi (event-driven mi sayfa-açılınca mı) — karar yok** | F5 | ❓ TEYİT/KARAR | UNUTULDU; karar-statu F5 ❓; T1-A A14 ile örtüşür (❓ keşif+PO) |
| :119-138 | Önceki denetimlerin özeti (İŞ0 mail ✅ · İŞ2 guard ✅ · İŞ1/5/7 açık · K1-K6 · bekleme-salonu bildirim · sektör-skoru · super-admin) | ≡ diğer belgeler | ⬜/✅ karışık | aşağıda ilgili belgelerde tam işlendi |
| :143 | Belge haritası + çelişki-çözüm kaydı (fiyat/isim/Erasmus) | NUMARASIZ | ✅ YAPILDI | 00-INDEX sistematik |
| :159 | **Match DB'ye persist ediliyor mu** | NUMARASIZ | ❓ TEYİT GEREK | canlı DB sorgusu yapılmadı; karar-statu KÜME3 ❓; T1-A A15 ile örtüşür |
| :160-162 | **Platform drill-down UI (backend hazır FE yok)** · lastLoginAt KPI · KPI drill-down | F2/F7 | ✅ YAPILDI (aradan kapandı) | **karar-statu KÜME3: artık TAM** (`platformTenantController.ts:75-276` + FE); eski "UNUTULDU" bayat |
| :163 | **Tenant hard-delete (KVKK Md.7) — sadece freeze var** | F3 / madde 16(v2) | ⬜ AÇIK | UNUTULDU; karar-statu F3 🟥 "GERİ-ALINAMAZ+DB, keşif+PO"; T1-A madde 16 v2 |
| :164-165 | SuspicionReport tenantId/maskeleme · otomatik nudge | madde 71/68 | ✅/⬜ | maske ✅(#51 madde 68); tenantId=T1-A madde 71 ❓ (güvenlik boşluğu); otomatik-nudge ⬜ |
| :170-176 | Ayrı platform katmanı · yaşam döngüsü · **elle eşleştirme YOK (bilinçli)** · onay/davet/atama · hayalet-mod · **ön-tanımlı davet OTOMATİK onay** · büyüme trendi | KARAR 6(oto-onay)/madde 76 | ✅/❓ | elle-eşleştirme YASAK ↔ T1-A madde 76/Ç5 (envanter "eksik" ile ÇELİŞKİ, açık PO); oto-onay=KARAR 6 ❓ |
| :191 | **B11 logout / B12 kullanıcı kartı "BOZUK"** | NUMARASIZ | ❓ TEYİT GEREK | teshis 08-02; "muhtemelen eskimiş"; T1-A'da yok |
| :193 | **C17 sayfa metinleri merkezileştirme — dağınık inline string** | ≈madde 47 | ⬜ AÇIK | UNUTULDU; T1-A madde 47 (temiz-kod borcu) içinde olabilir |
| :195 | 2 IDOR (teshis "BOZUK" ↔ denetçi "korumalı") | NUMARASIZ | ✅ YAPILDI (aradan kapandı) | ≡ :62-66; çözüldü `161ae00` |
| :212-217 | iceBreaker ölü ✅silinmiş · rewardPenalty yanlış-alarm · **sector-scorer bağlanmamış** · SJT endpoint FE-çağrısı-yok · rematch/visibility-optin FE · matchingInterface/llmRetry atıl | madde 14/44/45/86 | ⬜/❓ | SJT-endpoint=T1-A KÜME3 🟨 (bağla/sil PO); llmRetry=madde 44 ölü-kod; sector-scorer=madde 14 |
| :226 | **Fotoğraf upload (client-side) — endpoint/UI yok, kart işini bloke** | F1 | ✅ YAPILDI (aradan kapandı) | **karar-statu KÜME3/F1: kod TAM** (`avatarController.ts:23-57`+`profile/page.tsx`); eski "UNUTULDU" bayat; "foto zorunlu kart" bağı ayrı ❓ |
| :228 | **Hayalet mod (pasif üye) + toplu CSV davet — şemada yok** | F6 / madde 17(v2) | ⬜ AÇIK | UNUTULDU; karar-statu F6 🟥 "migration, ayrı büyük tur"; T1-A madde 17 v2 |
| :229 | `.env.backup-*` temizliği | NUMARASIZ | ❓ TEYİT (PO) | env geçişi bitince silinebilir |
| :250-254 | Bekleme salonu bildirim izni · **mentör opt-in "Ekran 7a"** · **STK iki-aha** · aha-tetikleyici · çift-tenant K7 | NUMARASIZ | ⬜/❓ | bildirim-izni ⬜ (grep boş); opt-in 7a=karar-statu 🟨; iki-aha ❓; = unutulmus-niyet D bölümü |
| :264-267 | KVKK vaka: register-consent ✅ · **OAuth consent AÇIK (K2)** · legal-sayfa taslak ✅ · 6 branch bayat | K2 | ⬜ AÇIK (OAuth) | **K2 = T1-A madde 2 ✅ CANLIDA (#38+#73 `oauthService.ts:112`)** — bu ESKİ denetimde AÇIK, aradan KAPANMIŞ ✅ |
| :278-285 (LİSTE 1) | Öne-çıkan UNUTULMUŞ: foto-upload · platform-drilldown · tenant-hard-delete · landing-slogan · eşleşme-tetik · hayalet+CSV · KPI-drilldown · metin-merkezileştirme | F1/F2/F7/F3/F4/F5/F6 | karışık | foto✅ · drilldown✅ · hard-delete⬜ · slogan⬜ · tetik❓ · hayalet⬜ · KPI✅ · metin⬜ (yukarıda tekil) |
| :297-307 (LİSTE 2) | Eskimiş/çelişki: 2-IDOR · B11-logout · timezone · b3-membership · SJT-endpoint · .env.backup · "31 migration" | NUMARASIZ | çoğu ✅/❓ | IDOR✅kapandı · logout/timezone/b3=❓eskimiş · SJT=🟨açık |

---

## 2. DEFTER — belge-denetimi-2026-08-10.md (106 satır)

> 09-DURUM + 10-yol'un İŞ 0-8 madde denetimi. İşaretler: ✅çözülmüş · 🔵açık · ⚠️eskimiş.

| kaynak (dosya:satır) | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| :22 | **İŞ 0 MAIL** "Gmail kırık" → aslında ÇALIŞIYOR (SMTP relay + forgot/reset tam) | İŞ 0 | ✅ YAPILDI (aradan kapandı) | belge içinde ⚠️ESKİMİŞ; `emailService.ts` + forgot/reset sayfaları |
| :23 | **İŞ 1 TEMİZLİK** worktree/branch sil (`cati-lj/bump/compose`) | İŞ 1 / madde 44/28(v2) | ⬜ AÇIK | 🔵 "yapılmadı"; karar-statu KÜME6 🟥 hâlâ var (2026-08-14 teyit); T1-A madde 28 v2 (ortam temizliği) |
| :24 | **İŞ 2 İZOLE TEST DB** guard yok → aslında ÇÖZÜLDÜ (`.env.test`+guard) | İŞ 2 | ✅ YAPILDI | `assertTestDatabase.ts:44-76` |
| :25 | **İŞ 3 ONAY PANELİ** bildirim maili + destek@ + prod admin | İŞ 3 / madde 6/84 | ❓/⬜ AÇIK | karar-statu KÜME6 🟨 "mail bağlanmadı"; T1-A madde 6 (🟡 kurum kısmı açık) + 84 (destek@ ❓) |
| :26 | **İŞ 4 ÖĞRENME YOLCULUĞU uçları** (DISC ton/STK düzenleme/içerik onayı/uçtan uca) | İŞ 4 | ❓ TEYİT GEREK | kod MERGED; uçlar teyit; karar-statu KÜME6 ❓; T1-A A15 ile örtüşür |
| :27 | **İŞ 5 STAGING** `.env.compose.staging` yok | İŞ 5 / madde 27(v2) | ⬜ AÇIK | 🔵 yok; karar-statu 🟥 "canlı-riskli işlerin ön koşulu"; T1-A madde 27 v2 |
| :28 | **İŞ 6 LANDING UX** merge durumu belirsiz | İŞ 6 / madde 22(v2) | ❓ TEYİT GEREK | T1-A madde 22 v2 (landing UX+tema) |
| :29 | **İŞ 7 SEKTÖR SKORU** uyuyan 5-bileşen'i canlı yola bağla | İŞ 7 / madde 14(v2) | ⬜ AÇIK | 🔵 "HÂLÂ AÇIK"; canlı `computeSectorScore` (tag×0.6) kullanıyor; T1-A madde 14 v2 |
| :30 | **İŞ 8 EŞLEŞTİRME BİRLEŞTİR** (İŞ 7 sonrası) | İŞ 8 / madde 15(v2) | ⬜ AÇIK | 🔵; karar-statu KÜME6 🔵; T1-A madde 15 v2 |
| :31-32 | Retention davranışsal kalan · **repo PRIVATE yap** | NUMARASIZ | ⬜/✅ | repo-private = **T1-A A22 ✅ 2026-08-25 PO yaptı** (aradan kapandı); retention-davranışsal ⬜ |
| :35-38 | ⚠️ Envanter #54 düzeltmesi: sektör "sabit 50 stub" İMPRECISE — gerçek etiket-örtüşme skorer var, zengin servis UYUYOR | NUMARASIZ (düzeltme) | 📌 not | belge-içi dürüstlük düzeltmesi; İŞ 7 niyeti geçerli kalır |
| :48-53 | 09-DURUM eskimiş bloklar: "chat canlıya taşınıyor #47 açık" · "#34 PR açık" · "4-rol Mentör ⬜" · "platform tema yapılacak" | NUMARASIZ | ✅ YAPILDI (aradan kapandı) | hepsi ⚠️ESKİMİŞ; #47/#34/#43 MERGED, mentör paneli canlı → belge-içi bayat blok temizliği (PO kararı adayı) |
| :54-56 | mentiRequestController SİLİNDİ ✅ · VisibilityOptIn.requestMessage duruyor · foto-volume/chat-test/metrik bekleyen | madde 18(v2)/A21 | ✅/🔵 | requestMessage DROP = T1-A A21/madde 18 v2 (🔵 ertelendi); silme ✅ doğru |
| :59-62 | 09-DURUM 4 belge-içi çelişki (chat 3-durum · VisibilityOptIn 2-durum · 4-rol · platform-tema) | NUMARASIZ | 🗑️ GEÇERSİZ ADAYI | eski bloklar silinmemiş → okuyucu karışık durum görür; **PO kararı adayı (arşive taşı)**, YAPMADIM |
| :80-91 (SONUÇ) | ⚠️GEÇERSİZ liste + 🔵AÇIK liste (KVKK K1-K5 · STK 13-bulgu · İŞ7 · İŞ1 · staging · PO-manuel) | ≡ yukarı | ⬜/✅ | temiz-sıra önerisi = PO onaylı ayrı tur (belge düzeltme deseni) |

---

## 3. DEFTER — belge-temizlik-haritasi-2026-08-14.md (145 satır)

> 44 belge düzen-sınıflandırması (belge-duzeni-rehberi 6 kural). SADECE keşif; taşıma/silme YOK, hepsi PO kararı.
> **Not:** Bu belgenin bulguları BELGE-DÜZENİ (etiket/INDEX/arşiv) hakkında — kod işi değil, S2 belge-hijyeni.

| kaynak (dosya:satır) | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| :22-40 | kararlar/ 19 belge: 11'inde üst-etiket (🔄/📸) yok; 02/04/05/06/08 **bayat** işaretli | NUMARASIZ (belge-düzeni) | ⬜ AÇIK (belge) | S2; A5 belge-reorg turuna bağlı; 2026-08-23 kısmi reorg yapıldı (T1-A A5) |
| :26 | `04-guvenlik` s.28-29 **2 IDOR çelişki** → ⚠️DOĞRULAMA GEREK | NUMARASIZ | ✅ YAPILDI (aradan kapandı) | belge içinde :90 **✅ÇÖZÜLDÜ 2026-08-14** (`161ae00`); çelişki kapandı |
| :42-61 | raporlar/ 16 belge: **16/16 üst-etiket yok · 14/16 INDEX'te yok** | NUMARASIZ (belge-düzeni) | ⬜ AÇIK (belge) | S2; INDEX Kural-5 eksiği; A5 reorg kapsamı |
| :56 | `platform-admin-strateji` s.74 "AdminAuditLog tablosu" ↔ not "SystemLog'a AUDIT" — gövde yanlış | NUMARASIZ | ⬜ AÇIK (belge) | bayat gövde işaretlenmeli (silme yok); S2 |
| :58 | `stk-yonetici-strateji` s.81-87 "hayalet mod görünmez" ↔ not "PR #31 düzeltildi" | NUMARASIZ | ⬜ AÇIK (belge) | bayat gövde; S2 |
| :63-69 | arsiv/ 3 belge: `strateji-ve-guvenlik` etiket yok · `SOHBET-KARAR-OZETI` zayıf format · arşiv INDEX'te yok | NUMARASIZ (belge-düzeni) | ⬜ AÇIK (belge) | S2 |
| :71-80 | devir/ 6 belge: canonical-link eksik · `devir/02` bayat-SHA · `devir/03` K1-K6 durum belirsiz | NUMARASIZ (belge-düzeni) | ⬜ AÇIK (belge) | S2; kopya-bilgi riski (Kural 1) |
| :88-99 (LİSTE 1) | ~10 bayat/yanlış belge (04-IDOR✅ · strateji-iddiaları · 02-Next.js-sürüm · 06-lacivert · 05-timezone · 03-stub) | NUMARASIZ | ⬜ AÇIK (belge) | IDOR kapandı; kalanı işaretleme bekliyor; S2 |
| :101-111 (LİSTE 2) | Gruplama/cross-ref: **denetim kümesi (3 belge)** · persona-üçlüsü · panel-çifti · strateji-çifti · backend-envanteri · devir↔canonical | NUMARASIZ | ⬜ AÇIK (belge) | S2; INDEX'te gruplama (fiziksel birleştirme değil) |
| :113-123 (LİSTE 3) | Arşiv adayları (6, hepsi TEYİT): hayalet-backend · kapasite · katilim-modeli · mentor-karti · tema-durum · devir-seti | NUMARASIZ | ❓ TEYİT (belge) | koşula bağlı (iş bitince); hiçbiri taşınmadı; PO kararı |
| :125-133 (LİSTE 4/5) | INDEX'te eksik 15 belge (14 rapor+1 arşiv) · üst-etiket eksik ~29 belge | NUMARASIZ | ⬜ AÇIK (belge) | S2; Kural 3+5 |
| :145 | Sonraki adım: öneriler öncelik + uygula (AYRI tur, PO onaylı) — en yüksek: 04-IDOR doğrula · strateji-iddia işaretle · INDEX tamamla | NUMARASIZ | ⬜ AÇIK | PO onaylı ayrı tur (A5 reorg) |

---

## 4. DEFTER — durum-panosu-2026-08-14.md (158 satır)

> ⚠️ **ÖZEL DİKKAT (görev talimatı):** T1-A A11 bu belgeyi "🔄 etiketli ama donmuş → 📸'ye düşürülmeli" çelişkisiyle işaretlemiş.
> **DOĞRULANDI:** satır 3 `**🔄 YAŞAYAN** ... Son güncelleme: 2026-08-14` — evet 🔄 etiketli, ama içerik 2026-08-14'te donmuş
> (12+ gün güncellenmemiş, birçok "FE yok" satırı artık bayat). Bu = T1-A A11 = KARAR-TAKIP açık PO kararı. **TAŞIMADIM** (PO kararı adayı).

| kaynak (dosya:satır) | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| :3 | **🔄 etiketli ama 2026-08-14'te donmuş** (etiket-gerçek çelişkisi) | A11 | ⬜ AÇIK (PO kararı) | **DOĞRULANDI** — 🔄 YAŞAYAN etiketi + statik içerik; T1-A A11 (📸'ye düşürülmeli); PO kararı, TAŞINMADI |
| :18-33 (TEPE) | 92 statü satırı: 🟩31 · 🟨14 · 🟧3 · 🟥18 · 🔵7 · ⬜10 · ❓9 · ❌0 (benzersiz ≈82) | NUMARASIZ (özet) | 📌 sayım | ≡ karar-statu-haritasi'nın özeti; kaynak orada |
| :42-56 (AZ-İŞLE-KAZANÇ 14) | K2-OAuth🟧 · sunucu-konum🟨 · toggle🟨 · SJT-endpoint🟨 · neden-uyumlu-L1🟨 · onay-maili🟨 · md.6-kalibrasyon🟧 · DISC-asimetri🟨 · opt-in-7a🟨 · cevap-tipi🟨 · kart-görünüm🟨 · etiket-havuzu🟨 · sektör-skoru🟨 · push🟧 | ≡ karar-statu 🟨-liste | ⬜/❓ | **K2 aradan ✅ (#38+#73)** — pano bayat gösteriyor; kalanı karar-statu ile aynı |
| :49 (#8) | **DISC asimetri (KARAR 5) — menti→mentör tip gizleme backend'de kanıtlanamadı** | KARAR 5 | ❓ TEYİT GEREK | **S1(güvenlik/PII) — kod kanıtı YOK → ❓ (asla ✅ deme)**; T1-A madde 1 "DISC güvenlik ✅(#37)" der ama bu satır menti→mentör TİP gizlemeyi ayrıca sorguluyor; ÇAPRAZ: madde 1 yüzde-gizleme ✅, tip-gizleme ❓ |
| :66-136 (7 KÜME) | Tam statü tablosu (Vizyon/Güvenlik/Özellik/Tasarım/STK-13/Algoritma/Unutulmuş) | ≡ karar-statu 7 küme | ⬜/✅/❓ | birebir karar-statu-haritasi ile aynı; §5'te tam işlendi |
| :91-92 | Platform/KPI drill-down · foto-upload "⚠️ eski FE yok idi → artık TAM (F1 bayat)" | F1/F2/F7 | ✅ YAPILDI (aradan kapandı) | pano kendisi bayat-roadmap'i işaret ediyor |
| :142-144 (kutu 🔴) | **KARAR 5 DISC asimetri GÜVENLİK TEYİDİ BEKLEYEN** — kodlanmadan doğrulanmalı | KARAR 5 | ❓ TEYİT GEREK | S1; DTO role-ayrışması; frontend gizleme yetmez; ≡ :49 |
| :146-147 (kutu ⚠️) | **YOL HARİTASI BAYAT — F1/F2/F7 kod TAM** ama roadmap "yapılacak" | F1/F2/F7 | ✅ YAPILDI (aradan kapandı) | önceliklendirme turunda düzeltilecek |
| :149-150 (kutu 🔵) | Bilinçli ertelenenler boşluk değil (Katman2/3 · sektör kolonu · eşleştirme birleştir · VisibilityOptIn DROP) | KARAR 8/9/10 · madde 15/18 | 🔵 (bilinçli) | T1-A v2 backlog |
| :152-154 (kutu 📌) | Açık PR birikimi #65/#66/#67/+pano (salt-docs) — sırayla merge öner | NUMARASIZ | ✅ YAPILDI (aradan kapandı) | 2026-08-14 açık PR'lardı; bugün merged (belge canlıda) |
| :157 | Sıradaki: v1/v2 önceliklendirme (PO çerçeve verecek) | NUMARASIZ | ⬜ AÇIK | PO işi |

---

## 5. DEFTER — karar-statu-haritasi-2026-08-14.md (216 satır)

> En bulgu-yoğun ham harita (~72 karar, 7 küme, 3-boyut: PLAN/KOD/ÇELİŞKİ). Diğer 5 denetimin üstüne bina edilmiş.

| kaynak (dosya:satır) | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| :45-50 (KÜME1) | DISC-eşleştirme · multi-tenant · anti-toksik · OCEAN/arketip/SJT · formül · sertifika/fallback | NUMARASIZ | ✅ YAPILDI | 🟩 çekirdek canlı |
| :51 | **Sektör skoru 5-bileşen servisi 🟨** canlı yola bağlı değil (staging şart) | madde 14(v2) | ⬜ AÇIK | ≡ İŞ 7; T1-A madde 14 v2 |
| :52-55 | Freemium⬜❓ · modül-sırası⬜❓ · certified→Membership🟩❓K7 · Erasmus/UniClub⬜ | K7 | ⬜/❓ | freemium/modül=❓politika; K7=❓kimlik teyit (S1) |
| :62 | **2 IDOR 🟩✅** çözüldü `161ae00` (`matchingController.ts:45-52`, `requestController.ts:116-121`) | NUMARASIZ | ✅ YAPILDI | S1(güvenlik); belge kod-kanıtlı; çelişki kapandı |
| :65 | **K1 yasal metinler 🟩** taslak değil, YAZILI; hukukçu onayı PO/dış | K1 / madde 90(v.dolaylı) | ⬜ AÇIK (dış) | sayfalar var; hukukçu onayı açık; A17 (FE-entegrasyon iptal, Word ile avukata) ile ilişkili |
| :66 | **K2 OAuth `kvkkConsentAt` 🟧** OAuth NULL, local/self-serve set ediyor | K2 / madde 2 | ✅ YAPILDI (aradan kapandı) | **T1-A madde 2 ✅ CANLIDA (#38+#73 `oauthService.ts:112`)** — bu 2026-08-14 harita 🟧 açık gösteriyor, ARADAN KAPANMIŞ |
| :67 | **K3 eski-kayıt consent politikası ⬜❓** yeniden-rıza/bulk/erteleme | K3 | ❓ TEYİT/KARAR | T1-A K3 "⏸️EN SON"; S1(KVKK) karar bekliyor |
| :68 | **K4 yaş 18+ doğrulama 🟥** kayıt formunda yaş input yok, birthDate yok | K4 | ⬜ AÇIK | **S1(KVKK) — kod-kanıtı: input YOK**; T1-A K4 ❓; NOT: T1-A madde 3 "18+ öz-beyan KVKK metnine gömülü ✅(#38)" ile KISMİ örtüşme → metin var, form-input yok (nüans) |
| :69 | **K5 veri-sorumlusu+sunucu-konumu 🟨** sorumlu var, hosting konumu YOK | K5 / madde 4 | ✅ YAPILDI (aradan kapandı) | **T1-A madde 4 ✅ (#73 `kvkk/page.tsx` §8 sunucu konumu) + madde 92 Londra/BK** — bu harita "konum YOK" diyor, ARADAN KAPANMIŞ ✅ |
| :70 | **K6 admin server-side guard 🟥** `frontend/src/middleware.ts` YOK (client-side only) | K6 / madde 66 | ⬜ AÇIK | S1(savunma-derinliği, veri-sızıntısı değil); T1-A K6 "⏸️v2" + madde 66 (www→301 middleware yok, KRİTİK) |
| :71-73 | Privacy-center-UI🟥 · DISC-ayrı-rıza🟥 · RLS-lint🟥 · sunucu/altyapı-güvenliği⬜ | madde 40/25(v2)/26(v2) | ⬜ AÇIK | privacy-center=madde 40 (KVKK FE); RLS-lint=madde 26 v2; DISC-ayrı-rıza=madde 25 v2 |
| :80-88 (KÜME3) | Chat/mentör-paneli/platform-katman/**drill-down**/sertifika-pano/lastLoginAt/**foto-upload**/yönetici-atama/havuz | F1/F2/F7/md.7 | ✅ YAPILDI | **eski "FE yok" hepsi artık 🟩 TAM** (aradan kapandı); F1/F2/F7 kod TAM |
| :90 | **SJT/scoring endpoint 🟨** FE çağrısı grep boş → bağla mı sil mi PO | madde 75(T7)/101 | ⬜ AÇIK | karar; T1-A madde 75 (mentör görünürlük opt-in FE) + 101 (SJT/OCEAN eşleştirmede okunmuyor) ile ilişkili |
| :91-92 | Match-persist❓ · **ön-tanımlı davet OTOMATİK onay (KARAR 6)❓** | KARAR 6 / A14 | ❓ TEYİT | Match-persist=A15; oto-onay=T1-A A14 (InvitationTemplate var, tetik yok) |
| :99 | **KARAR 1 sol menü 4-grup 🟥** layout hâlâ 3+Gelişmiş | KARAR 1 / madde 8/md.2 | ✅/⬜ ÇELİŞKİ | **T1-A madde 8 "sol menü 4-grup ✅(çatı #76)"** ↔ bu harita 🟥 "yapılmadı" — **ÇELİŞKİ:** T1-A ✅ diyor, 2026-08-14 harita 🟥 diyor → aradan kapanmış OLABİLİR ama ❓ TEYİT (madde 8 kart-sırası mı menü-grup mu netleşmeli) |
| :100 | **KARAR 2 havuz KART görünümü 🟨** backend `compatibilityReason` var, FE tablo | KARAR 2 / md.5/madde 31 | ⬜ AÇIK | karar-statu 🟨; FE kart yapılmadı |
| :101-102 | **KARAR 3 durum-rozeti 🟥 · KARAR 4 sertifika-rozeti 🟥** render yok | KARAR 3/4 / madde 10/11 | ✅/⬜ ÇELİŞKİ | **T1-A madde 10 "durum rozeti ✅mevcut" + madde 11 "sertifika rozeti ✅(#40)"** ↔ harita 🟥 → aradan kapanmış olabilir, ❓ TEYİT (rozet-türü farkı: kişi-geneli ✅ vs iç-yönetim rozeti 🟥) |
| :103 | **KARAR 5 DISC asimetri 🟨❓** menti→mentör tip gizleme kanıtlanamadı | KARAR 5 / madde 1 | ❓ TEYİT GEREK | **S1(güvenlik/PII) — kod kanıtı YOK → ❓**; DTO role-ayrışması; ≡ pano :49/:142 |
| :104 | **KARAR 7 "neden uyumlu" L1 🟨** FE `RankedMenti` tipinde alan yok | KARAR 7 / madde 19(v2) | ⬜ AÇIK | KARAR 2 ile birlikte; T1-A madde 19 v2 (Katman-2) ile ilişkili |
| :105 | **KARAR 11 DISC baskın+ikincil harf "DI" 🟥** havuzda tek harf | KARAR 11 / madde 12/md.4 | ✅ YAPILDI (aradan kapandı?) | **T1-A madde 12 "DISC çoklu harf DI ✅(#47+#93+#94 `discLetters.ts`)"** ↔ harita 🟥 → **aradan KAPANMIŞ ✅** (canonical yeni PR kanıtı var); harita bayat |
| :106 | **KARAR 12 sektör/etiket havuzu 🟨❓** admin-yönetilir tablo yok (seed var) | KARAR 12 / md.12 | ⬜ AÇIK | seed↔tablo keşif/PO; T1-A'da net numara yok |
| :107 | **KARAR 6 otomatik onay ❓** davet→onay tetiği kodda yok | KARAR 6 / A14 | ❓ TEYİT | ≡ :92; T1-A A14 |
| :108-110 | KARAR 8/9 Katman2/3 🔵 · KARAR 10 sektör-kolonu 🔵 | KARAR 8/9/10 / madde 19/20/21(v2) | 🔵 (bilinçli) | T1-A v2 backlog (19/20/21) |
| :111 | **F4 landing slogan 🟥** page.tsx eski, tam metin hazır | F4 | ⬜ AÇIK | ≡ belge-aksiyon :88; PO onayı |
| :113-114 | ThemeToggle-admin/platform 🟨 · yumuşak-lacivert+Landing-UX 🔵 | madde 5/22(v2) | ⬜/🔵 | toggle=madde 5 (kısmi); UX=madde 22 v2 |
| :121-133 (KÜME5) | STK 13-bulgu: md.1/7/9/8/13 🟩(#62) · md.6🟧 · md.10🟨❓ · md.11❓ · md.2🟥 · md.5🟨 · md.3🔵 · md.4🟥 · md.12🟨❓ | md.1-13 / B1-B13 | ✅/⬜/❓ | md.1/7/9=✅(#62); md.6=kalibrasyon yarım; md.2/4=🟥 (≡KARAR 1/11); ≡ stk-admin-bulgu §6 |
| :126 | **md.6 Algoritma Kalibrasyon 🟧** sayfa var, ağırlık 0.60/0.40 UI yok | md.6/B6 / madde 9a | ✅ YAPILDI (aradan kapandı?) | **T1-A madde 9a "tenant manuel ağırlık PUT weights +/−%5 ✅CANLIDA(#52)" + madde 9 "ağırlık gösterim %60/%40 ✅(#49)"** ↔ harita 🟧 "UI yok" → **aradan KAPANMIŞ ✅** (canonical yeni PR); harita bayat |
| :139-147 (KÜME6) | sektör-skoru🟨 · eşleştirme-birleştir🔵 · super-admin/Taraf-1❓ · VisibilityOptIn-DROP🔵 · retention-nudge🟥 · **staging🟥** · **ortam-temizliği🟥** · onay-maili🟨❓ · öğrenme-uçları❓ · F1🟩 · F2🟩 · **F3-hard-delete🟥** · F4🟥 · **F5-tetikleyici❓** · **F6-hayalet+CSV🟥** · F7🟩 | İŞ7/8/madde16/18/24/27/28/6/F1-F7 | ⬜/🔵/❓/✅ | F1/F2/F7 ✅ aradan kapandı; F3=madde 16 v2; F5=A14; F6=madde 17 v2; staging=madde 27 v2 |
| :141 | **super-admin router + setVisibilityOptIn (Taraf-1) ❓** sil/bağla/ertele PO | madde 86 / A20 | ❓ TEYİT/KARAR | T1-A madde 86 (mentorVisibilityEnabled ölü alan) + A20 (bilinçli terk adayları PO) |
| :150 | **F3 tenant hard-delete 🟥** freeze var, hard-delete endpoint yok (GERİ-ALINAMAZ) | F3 / madde 16(v2) | ⬜ AÇIK | S1(DB/KVKK); T1-A madde 16 v2; NOT: madde 93+39 (96) kullanıcı-anonimleştirme ✅ ama TENANT hard-delete ayrı, açık |
| :160-169 (KÜME7) | chat-test⬜ · foto-volume⬜ · metrik-gözle⬜ · **repo-private⬜** · bekleme-bildirim🟥 · opt-in-7a🟨❓ · iki-aha❓ · push🟧 · .env.backup⬜ · persona-fikirleri❓ | A22/madde 23(v2) | ⬜/✅ | **repo-private = T1-A A22 ✅ 2026-08-25** (aradan kapandı); push=madde 23 v2; kalanı PO-manuel/teyit |
| :181-212 (ÖZET) | Kategori dağılımı + 🟨 10-liste + roadmap-bayat(F1/F2/F7) + 🟥-kümeler + kritik-❓ | NUMARASIZ | 📌 özet | roadmap-bayat = hayalet-tamamlanmış (T1-A H1-H3 ile aynı desen) |
| :211 | **En kritik ❓: KARAR 5 DISC mahremiyet asimetrisi** güvenlik/PII teyidi şart | KARAR 5 | ❓ TEYİT GEREK | S1 — kod kanıtı yok → ❓; en kritik açık güvenlik teyidi |

---

## 6. DEFTER — stk-admin-bulgu-envanteri-2026-08-11.md (63 satır)

> 13 bulgu (B1-B13, B8 üç alt-parçalı). "arka-var-ön-yok" ekseni. #62 sonrası bazıları bağlandı.

| kaynak (dosya:satır) | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| :15 (B1) | **Şifre göster/gizle butonu** — register'da PasswordField var, login+reset'e taşınacak | B1/md.1 | ✅ YAPILDI (aradan kapandı) | **karar-statu :121 md.1 🟩 #62** (`PasswordField` login+register+reset); bu envanter "yapılacak" diyor, KAPANMIŞ |
| :16 (B2) | Sol menü sıralama/gruplama (PRIMARY_NAV 3 + ADVANCED 12) | B2/md.2/KARAR 1 | ⬜/❓ ÇELİŞKİ | ≡ KARAR 1; T1-A madde 8 ✅ ↔ karar-statu 🟥 → ❓ teyit (bkz §5:99) |
| :17 (B3) | Havuz "Sektörler" kolonu hep "—" — backend select ediyor, VERİ boş | B3/md.3/KARAR 10 | 🔵 (veri-girişi) | veri-girişi boşluğu (gösterim değil); canlı-sonrası; T1-A madde 21 v2 (sektör kolonu) |
| :18 (B4) | DISC tek harf — backend vektör var, admin API sadece discType (KVKK maskeli) | B4/md.4/KARAR 11 | ✅ YAPILDI (aradan kapandı?) | ≡ KARAR 11; **T1-A madde 12 çoklu-harf ✅(#47/#93/#94)** → KAPANMIŞ olabilir; ❓ (KVKK maskeleme nüansı) |
| :19 (B6) | **Algoritma Kalibrasyon sayfası boş** — backend zengin (algorithmTuner.ts), FE sadece bildirim-sıklığı | B6/md.6 | ✅ YAPILDI (aradan kapandı?) | **T1-A madde 9/9a ✅(#49/#52) ağırlık UI+PUT** → KAPANMIŞ olabilir; ❓ teyit (NPS-trend/geçmiş grafiği ayrı olabilir) |
| :20 (B7) | **Yönetici atama UI** — endpoint+API-client hazır, promote butonu yok | B7/md.7 | ✅ YAPILDI (aradan kapandı) | **karar-statu md.7 🟩 #62** (`admin/managers/page.tsx:66-124`); KAPANMIŞ |
| :21 (B8a) | "Kuruma özel sorular DISC'i etkilemez" DOĞRU (STK_CUSTOM ayrımı) | B8a | ✅ YAPILDI | doğru-çalışıyor; kod-uyumlu |
| :22 (B8b) | **Yeni soru formu cevap-tipi (şıklı/açık) sormuyor** — answerType alanı YOK, Likert sabit | B8b/md.10 / madde 13 | ⬜ AÇIK | **T1-A madde 13 "soru cevap-tipi ⏸️ERTELENDİ; migration; kapsam belirsiz→PO"** (S1 migr); açık |
| :23 (B8c) | Sorular gösterim + cevap saklama DOĞRU (UserResponse + tenant izolasyon) | B8c | ✅ YAPILDI | doğru-çalışıyor |
| :24-25 (B10/B11) | CORE/DEEPENING form-liste tam · tek-seçenekli dropdown DOĞRU davranış (DISC kilitli) | B10/B11/md.11 | ✅/❓ | B11=md.11 minor UI ❓ (karar-statu); işlev doğru |
| :26 (B12) | **Etiket Yönetimi kuyruğu TAM · "hazır sistem etiketleri" seed'de BULUNAMADI** | B12/md.12/KARAR 12 | ❓ TEYİT GEREK | hazır-etiket-havuzu belirsiz (gizli eksik); ≡ KARAR 12; T1-A'da net numara yok |
| :27 (B13) | Sertifika Konuları GERÇEK içerik (10 konu/~20 senaryo) · "kurum ekleyemez" KODLU · **karar gerekçesi belgesi ZAYIF** | B13/md.13 | ✅/❓ | işlev ✅(#62 md.13); "neden kurum ekleyemez" gerekçe belgesi ❓ TEYİT (kod-yorumu ağırlıklı) |
| :28 (B9) | "CORE/DEEPENING" İngilizce → görünen etiket Türkçeleştir (enum DB'de kalmalı) | B9/md.9 | ✅ YAPILDI (aradan kapandı) | **karar-statu md.9 🟩 #62** (TYPE_LABELS Temel/Derinleştirme); KAPANMIŞ |
| :34-53 (öncelik+tip) | Önce: B7/B9/B1/B4 (S) · B6/B8b (M) · B12/B13/B2/B3/B5 (karar/teyit) | ≡ yukarı | karışık | B7/B9/B1 aradan ✅; B8b açık; B12/B13 ❓ |
| :62 | Belge-senkron notu: "güncelleme gerekmedi (salt-okuma keşif)" | NUMARASIZ | 📌 not | keşif turu, 09/10 güncellenmedi |

---

## 7. DEFTER — unutulmus-niyet-envanteri-2026-08-10.md (122 satır)

> "niyet var, kod hiç/yarım" taraması. 4 kaynak (A belge / B kod-yorum / C yarım-özellik / D strateji-kodlanmamış). K1-K7 kritik.

| kaynak (dosya:satır) | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| :24 (K1) | **Yasal metinler TASLAK** (/kvkk /gizlilik /terms "taslak niteliğinde") | K1 / madde 90 | ⬜ AÇIK (dış) | karar-statu :65 "taslak değil, YAZILI, hukukçu onayı açık"; sayfalar var, hukukçu bekliyor; A17 ile ilişkili |
| :25 (K2) | **OAuth `kvkkConsentAt` NULL** — register/self-serve set ediyor, OAuth etmiyor | K2 / madde 2 | ✅ YAPILDI (aradan kapandı) | **T1-A madde 2 ✅ CANLIDA (#38+#73 `oauthService.ts:112`,`authController.ts:176`)** — bu 2026-08-10 envanter AÇIK, KAPANMIŞ ✅ |
| :26 (K3) | **Eski-kayıt `kvkkConsentAt` NULL — backfill politikası yok** | K3 | ❓ TEYİT/KARAR | S1(KVKK); yeniden-rıza/bulk/erteleme karar; T1-A K3 "⏸️EN SON" |
| :27 (K4) | **Yaş politikası çelişkili** (18+ vs genç+veli) — yaş input yok | K4 | ⬜ AÇIK | S1(KVKK); ≡ karar-statu :68; T1-A K4 ❓; NOT: madde 3 öz-beyan-metni ✅ ama form-input yok |
| :28 (K5) | **Veri sorumlusu + sunucu konumu beyanı YOK** | K5 / madde 4/5 | ✅ YAPILDI (aradan kapandı) | **T1-A madde 4 ✅(#73 §8) + madde 5 ✅(#73 sunucu konumu)** — envanter AÇIK, KAPANMIŞ ✅ (Neon/Hostinger konumu → Londra/BK madde 92) |
| :29 (K6) | **Admin sayfaları sadece client-side guard** — `middleware.ts` yok | K6 / madde 66 | ⬜ AÇIK | S1(savunma-derinliği); API backend-korumalı (veri-sızıntısı DEĞİL); ≡ karar-statu :70; T1-A K6 ⏸️v2 |
| :30 (K7) | **Çift-tenant kimlik testi yetersiz** — tüm okumalar Membership'ten mi doğrulanmadı | K7 | ❓ TEYİT GEREK | S1(kimlik) — kod kanıtı yok → ❓; T1-A'da net numara yok, açık |
| :32-34 | P0 güvenlik (tenant izolasyon/IDOR/deadlock/DISC-math/JSON-guard/Zod) kodlanmış VE testli | NUMARASIZ | ✅ YAPILDI | test dosyaları kanıt; IDOR ✅(`161ae00`) |
| :44 (A) | Tenant plan/limit (freemium) hiç-başlanmadı | NUMARASIZ | ⬜ AÇIK (politika) | ❓ politika/PO; T1-A KÜME1 ⬜ |
| :45 (A) | **Sektör skoru 5-bileşen stub, nötr 50** (imprecise — bkz belge-denetimi düzeltmesi) | madde 14(v2) | ⬜ AÇIK | belge-denetimi :35 "sabit 50 imprecise, gerçek etiket-örtüşme var"; İŞ 7; T1-A madde 14 v2 |
| :46 (A) | RLS lint kuralı (`findUnique` sızıntı tuzağı) hiç-başlanmadı | madde 26(v2) | ⬜ AÇIK | S1(güvenlik-iyileştirme); T1-A madde 26 v2 |
| :47 (A) | DISC/sektör ağırlık admin-ayarlanabilir (0.60/0.40 hardcoded) | madde 9a | ✅ YAPILDI (aradan kapandı) | **T1-A madde 9a ✅ CANLIDA (#52 PUT weights +/−%5)** — envanter "hardcoded" der, KAPANMIŞ ✅ |
| :48 (A) | Onay paneli bildirim maili + `destek@` gerçek kutu | madde 6/84 | ⬜ AÇIK | T1-A madde 6 (🟡 kurum kısmı açık) + 84 (destek@ config'te tanımsız ❓) |
| :49-51 (A) | Landing: yumuşak-lacivert · slogan · UX-paketi · kart · light-tema-toggle · DISC-WCAG · platform-rozet-light · **foto-zorunluluk** | F4/madde 22(v2) | ⬜ AÇIK | slogan=F4; UX=madde 22 v2; foto-zorunlu=karar (foto-upload ✅ ama zorunluluk kararı ❓) |
| :52 (A) | **Eşleşme hesaplama tetikleyicisi** (event-driven mi sayfa-açılınca mı) karar bekliyor | F5 / A14 | ❓ TEYİT/KARAR | ≡ belge-aksiyon :107; T1-A A14 |
| :53 (A) | Yöneticilik-verme akışı (tüm-onaylı liste eksik) · yönetici etiket-ekleme | md.7/md.12 | ✅/⬜ | yöneticilik=md.7 ✅(#62); etiket=md.12 açık |
| :54 (A) | Gelir/sürdürülebilirlik · pilot-kulüp · gerçek-kullanıcı-görüşmeleri | NUMARASIZ | ⬜ AÇIK (iş/strateji) | iş/strateji kararı, kod değil |
| :55 (A) | **Foto Dokploy volume redeploy-sonrası kalıcılık doğrulaması** | NUMARASIZ (PO-manuel) | ⬜ AÇIK (PO) | acil-teknik; T1-A A22 BEKLEYEN (foto volume doğrulama açık); merge ÖNCESİ şart |
| :56-57 (A) | İŞ 2/4/5/6/7/8 · repo-PRIVATE · profil-düzenleme · tema-toggle | İŞ 0-8/A22 | ⬜/✅ | repo-private ✅(A22 2026-08-25); İŞ'ler ≡ belge-denetimi §2 |
| :67 (B) | `notificationService.ts:49` **TODO gerçek push (Expo/FCM)** sabit sent:true | madde 23(v2) | ⬜ AÇIK (bilinçli) | 🟧 push stub (biliniyor, in-app/e-posta idare); T1-A madde 23 v2 |
| :68 (B) | `adminController.ts:450` rematch bildirimi stub (push'a bağlı) | NUMARASIZ | ⬜ AÇIK | push-stub'a bağlı |
| :69 (B) | `matchingInterface.ts:56-90` USER strategy stub + Job Board rehberi | madde 44 / U2 | 🔵 (kasıtlı ileride) | T1-A U2 (`matchingInterface.ts` ⏸️şablon); ölü-kod kategori |
| :70 (B) | `questionController.ts:11` toplu-yanıt endpoint (ileride, FE çağırmıyor) | NUMARASIZ | ⬜ AÇIK | endpoint hazır, FE bağlanmamış |
| :71 (B) | `ContextualFeedbackHost.tsx:58` payload.tags backend şemada yok | NUMARASIZ / F5-C.1 | ⬜ AÇIK | T1-A C bölümü (feedback şema alanları yazılmıyor); ölü-kod |
| :72-73 (B) | `selfServeController.ts:178` mock persona (preview) · `adaptiveTestEngine.ts:138-140` fallback placeholder | NUMARASIZ | ❓ TEYİT | preview-only/normal-akışta-tetiklenmez sanılıyor; teyit |
| :85-88 (C) | Push-stub · sektör-skoru · **DailyQuestionWidget progress** (backend döndürmüyor) · adaptif-fallback | madde 70(T2)/14 | ✅/⬜ | **progress = T1-A madde 70(T2) ✅ (#51 backend + çatı #114 FE guard)** — envanter "döndürmüyor" der, KAPANMIŞ ✅ |
| :90-93 (C) | TEYİT-GEREK (muhtemelen tam): sertifika-motoru · STK-onboarding-3-5 · öğrenme-yolculuğu · conversation | NUMARASIZ | ❓ TEYİT | akış-tam görünüyor; bütüncül inceleme gerek |
| :101 (D) | **Bekleme salonu bildirim izni** ("en kritik") — `Notification.requestPermission` grep boş | NUMARASIZ | ⬜ AÇIK | UX; bekleme salonu var, izin-istemi kodda yok; T1-A'da net numara yok |
| :102 (D) | **Mentör görünürlük opt-in "Ekran 7a"** — backend var, FE opt-in ekranı belirsiz | madde 75(T7) | ⬜ AÇIK | T1-A madde 75 (mentör görünürlük opt-in FE, backend var) |
| :103 (D) | **STK "iki-aha modeli"** (önizleme + gerçek aha) — "canlı veri ile aha" tam değil | A13 | ❓ TEYİT | T1-A A13 (STK iki-aha + persona fikirleri, teyit) |
| :104 (D) | Oyunlaştırılmış DISC/mizaç testi — KODLANMIŞ görünüyor | NUMARASIZ | ✅ YAPILDI | `DiscTestStep.tsx`+`sjt-scorer.ts` Most/Least; muhtemelen tam |
| :105 (D) | **Privacy center UI** (KVKK Md.11 kullanıcı-yüzü) — backend GDPR var, self-servis sayfa belirsiz | madde 40/97 | ⬜ AÇIK | **S1(KVKK)**; T1-A madde 40 (KVKK FE üçlüsü ⬜ backend hazır FE 0) + 97 (FE hesap-kapatma akışı YOK) |
| :106 (D) | **DISC için ayrı açık rıza** (hassas veri) — register'da tek rıza | madde 25(v2)/83 | ⬜ AÇIK | S1(KVKK); T1-A madde 83 (OAuth açık rıza + KVKK/18+ tek kutuda ❓) + madde 25 v2 (DISC ayrı rıza) |

---

## 8. ÖZET — durum dağılımı ve avlanan numarasızlar

### Durum dağılımı (defter kalemleri, ~yaklaşık)
- **✅ YAPILDI (çoğu ARADAN KAPANMIŞ):** ~30 kalem
- **⬜ AÇIK:** ~40 kalem
- **❓ TEYİT GEREK:** ~22 kalem
- **🔵 bilinçli erteleme:** ~7 kalem
- **🗑️ GEÇERSİZ ADAYI (PO kararı, YAPMADIM):** 1 (belge-denetimi 09-DURUM belge-içi çelişki blokları)

### ⭐ "ARADAN KAPANMIŞ ✅" — bu eski denetimlerin en çok yanıldığı yer (canonical yeni PR kanıtlı)
Bu 7 belge 2026-08-10..14 tarihli; canonical'da (T1-A) ARTIK ✅ olan ama bu belgelerde hâlâ AÇIK/🟥/🟧 görünenler:
1. **K2 OAuth `kvkkConsentAt`** — 3 belgede açık (envanter K2 / karar-statu :66 🟧 / belge-aksiyon :265) → **✅ #38+#73** (`oauthService.ts:112`)
2. **K5 sunucu konumu beyanı** — envanter K5 + karar-statu :69 🟨 → **✅ #73** (`kvkk/page.tsx §8`) + Londra/BK (madde 92)
3. **F1 foto upload / F2 platform drill-down / F7 KPI drill-down** — 3+ belgede "FE yok/UNUTULDU/🟥" → **✅ kod TAM** (`avatarController.ts`, `platformTenantController.ts`)
4. **md.1/7/9 STK-admin (şifre-göster/yönetici-atama/CORE-DEEPENING-TR)** — envanter+karar-statu → **✅ #62**
5. **KARAR 11 DISC ikincil harf "DI"** — karar-statu :105 🟥 → **✅ #47+#93+#94** (`discLetters.ts`)
6. **md.6/9a algoritma kalibrasyon ağırlık UI** — karar-statu :126 🟧 → **✅ #49+#52** (ağırlık gösterim + PUT weights)
7. **DailyQuestionWidget progress (madde 70/T2)** — envanter :87 → **✅ #51+#114**
8. **repo PRIVATE (A22)** — 2 belgede ⬜ → **✅ 2026-08-25 PO**
9. **2 IDOR** — 3 belgede "BOZUK/çelişki" → **✅ `161ae00`** (belgelerin İÇİNE çözüm notu işlenmiş)
> **Sonuç:** bu 7 belge esas olarak DONDURULMUŞ eski fotoğraf; "açık" görünen ~30 kalemin yarısı aradan kapanmış.
> Bu, T1-A "hayalet-tamamlanmış" (H1-H3) ve "roadmap bayat" (F1/F2/F7) bulgularını GÜÇLENDİRİR.

### ⭐ HÂLÂ AÇIK — numarası olan ama canonical'da ⬜/❓ kalanlar (öne çıkanlar)
- **K3** eski-kayıt consent backfill politikası (S1 KVKK, karar) · **K4** yaş 18+ form-input (S1, metin var/input yok) ·
  **K6** admin server-side guard (S1 savunma-derinliği) · **K7** çift-tenant kimlik teyidi (S1, kod kanıtı yok → ❓)
- **F3** tenant hard-delete (S1 DB/KVKK, GERİ-ALINAMAZ) · **F4** landing slogan (S2, tam metin hazır) ·
  **F5** eşleşme tetikleyicisi (❓ karar) · **F6** hayalet mod+CSV (madde 17 v2) · **İŞ5** staging · **İŞ1** ortam temizliği
- **KARAR 2/7** havuz kart + neden-uyumlu L1 (🟨 backend var FE yok) · **KARAR 12** etiket havuzu tablo ·
  **B8b/md.10** cevap-tipi (madde 13 ⏸️ERTELENDİ) · **bekleme salonu bildirim izni** · **opt-in 7a (madde 75)** ·
  **privacy center UI (madde 40/97)** · **DISC ayrı rıza (madde 83/25v2)** · **onay maili (madde 6/84)**

### ⭐ NUMARASIZ / düz-metne-gömülü niyetler (bu turun ana avı — T1-A A-serisiyle örtüşen + YENİ)
Çoğu T1-A'nın A1-A23'üyle örtüşüyor; bu 7 belgede EK olarak avlananlar (numara almamış, ⬜/❓):
- **Yumuşak lacivert tema yönelişi** (belge-aksiyon :91) — UNUTULDU, roadmap'te net değil, PO teyit
- **C17 sayfa metinleri merkezileştirme** (belge-aksiyon :193) — dağınık inline string, UNUTULDU (≈madde 47)
- **B11/B12 logout+kullanıcı-kartı "BOZUK"** (belge-aksiyon :191) — muhtemelen eskimiş, teyit
- **"Hazır sistem etiketleri" havuzu belirsiz** (stk-admin B12 :26) — gizli eksik, TEYİT
- **B13 "neden kurum sertifika ekleyemez" karar-gerekçesi belgesi zayıf** (stk-admin :27) — TEYİT
- **Gelir/sürdürülebilirlik modeli · pilot-kulüp · gerçek-kullanıcı-görüşmeleri** (envanter :54) — iş/strateji, karar bekliyor
- **matchingInterface USER-strategy + Job Board** (envanter :69) — kasıtlı-ileride şablon (U2)
- **questionController toplu-yanıt endpoint** (envanter :70) — hazır, FE bağlanmamış
- **ContextualFeedbackHost payload.tags backend şemada yok** (envanter :71) — sessiz eksik
- **super-admin router + Taraf-1 setVisibilityOptIn** sil/bağla/ertele (karar-statu :141) — A20/madde 86 PO kararı

### ⭐ ÇELİŞKİLER (hakem OLMADIM, ikisini de yazdım)
1. **KARAR 1/md.2 sol menü 4-grup:** T1-A madde 8 "✅ çatı #76" ↔ karar-statu :99 🟥 "yapılmadı" → ❓ TEYİT (menü-grup mu kart-sıra mı; aradan kapanmış olabilir ama harita 🟥)
2. **KARAR 3/4 durum+sertifika rozeti:** T1-A madde 10/11 ✅ ↔ karar-statu :101-102 🟥 → ❓ TEYİT (rozet-türü farkı: kişi-geneli ✅ vs iç-yönetim rozeti 🟥)
3. **KARAR 11 DISC ikincil harf:** T1-A madde 12 ✅ ↔ karar-statu :105 🟥 → aradan KAPANMIŞ ✅ (canonical yeni PR kazanır)
4. **09-DURUM belge-içi çelişki blokları** (belge-denetimi :59-62): chat 3-durum/VisibilityOptIn 2-durum/4-rol/platform-tema — eski bloklar silinmemiş → 🗑️ GEÇERSİZ ADAYI (PO kararı, TAŞIMADIM)
5. **elle eşleştirme:** belge-aksiyon :172 "YASAK (bilinçli)" ↔ T1-A madde 76/Ç5 envanter "eksik" → açık PO kararı (K5-soru 8)

### ⚠️ ÖZEL DİKKAT — durum-panosu-2026-08-14 etiket çelişkisi (görev talimatı)
**DOĞRULANDI:** `durum-panosu-2026-08-14.md:3` = `**🔄 YAŞAYAN** ... Son güncelleme: 2026-08-14`. Etiket 🔄 (yaşayan) ama
içerik 2026-08-14'te donmuş (12+ gün, K2/K5/F1/F2/F7 satırları bayat). = **T1-A A11** = KARAR-TAKIP açık **PO kararı**
(📸'ye düşürülmeli). Bu tur **TAŞINMADI/DEĞİŞTİRİLMEDİ** — yalnız doğrulama notu.

### SEVİYE-1 kalemlerde kod-kanıtı durumu (kural gereği ❓ bırakılanlar)
Kod kanıtı OLMADAN ✅ demediğim S1 kalemler: **KARAR 5 DISC menti→mentör tip gizleme** (❓, DTO role-ayrışması kanıtı yok) ·
**K7 çift-tenant kimlik** (❓) · **Match DB persist** (❓, DB'ye bağlanılmadı) · **F5 eşleşme tetikleyicisi** (❓ karar).
Bunlar sonraki kod-doğrulamalı/DB tura kalır (bu tur salt-okuma, DB'ye dokunulmadı).

---

## KAPANIŞ NOTU (GRUP-B3)
- **7/7 belge TAM okundu**, okunmayan 0. Toplam ~120 defter satırı (tekrar eden kararlar tekil kaynak-satırda).
- Bu 7 belge birbirinin üstüne bina edilmiş DONDURULMUŞ eski fotoğraflar (2026-08-10..14); `karar-statu-haritasi` en kapsamlı ham harita, `durum-panosu` onun görsel özeti.
- **En çarpıcı gerçek:** bu eski denetimlerde "açık/🟥/🟧/UNUTULDU" görünen ~9 küme kalem (K2/K5/F1/F2/F7/md.1-7-9/KARAR-11/md.6-9a/progress/repo-private/IDOR) **canonical'da ARADAN KAPANMIŞ ✅** — bu belgeler bayatlamış, T1-A'nın "hayalet-tamamlanmış + roadmap-bayat" bulgusunu güçlendirir.
- **Hâlâ gerçekten açık kritikler:** K3/K4/K6/K7 (KVKK+kimlik, çoğu S1) · F3 tenant-hard-delete · F5 tetikleyici · privacy-center-UI · DISC-ayrı-rıza · bekleme-bildirim-izni · cevap-tipi (madde 13) · staging.
- **En kritik güvenlik ❓ (kod kanıtı yok, ✅ demedim):** KARAR 5 DISC menti→mentör tip gizleme (S1/PII).
- **durum-panosu etiket çelişkisi (A11) DOĞRULANDI**, taşınmadı (PO kararı).
- DB'ye dokunulmadı, kod değiştirilmedi, PR açılmadı, numara doğurulmadı, belge silinmedi/taşınmadı.
