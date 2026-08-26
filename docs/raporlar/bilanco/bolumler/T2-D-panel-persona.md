# BELGE BİLANÇOSU — TUR 2 / GRUP D (panel envanteri/strateji + persona/retention — 7 belge)

**📸 DONDURULMUŞ** (bilanço bölümü — 2026-08-26) · Tur 2/GRUP-D · Salt-okuma defter. Kod/DB/PR/commit/belge-taşıma YOK.

> **Ne bu:** `docs/raporlar/panel/` (4 belge — platform+STK envanter/strateji kardeş çiftler) + `docs/raporlar/persona/`
> (3 belge — menti/mentör/yönetici persona+retention) baştan-sona okuma-sayımı. Bu belgeler 2026-08-02 keşif
> fotoğraflarıdır; içleri **numarasız niyet** (retention/sevdirme fikri + panel eksiği + ideal-tasarım) doludur —
> turun asıl avı bunlar. Çapraz-kontrol: `T1-A-canonical.md` (Y1-Y7 + madde 77/78 bu belgelerden doğdu), `T1-B2`, `T1-B3`.
> **Numara DOĞURMADIM · belge SİLMEDİM/TAŞIMADIM · hakem OLMADIM. NİHAİ RAPOR/PR YAZILMAZ.**

---

## 0. OKUMA İLERLEME TABLOSU

| belge | toplam satır | okunan satır | durum | kalem |
|---|:---:|:---:|:---:|:---:|
| `panel/platform-admin-panel-envanteri-2026-08-02.md` | 137 | 137 | ✅ TAM | 18 |
| `panel/platform-admin-strateji-2026-08-02.md` | 144 | 144 | ✅ TAM | 16 |
| `panel/stk-yonetici-panel-envanteri-2026-08-02.md` | 168 | 168 | ✅ TAM | 20 |
| `panel/stk-yonetici-strateji-2026-08-02.md` | 144 | 144 | ✅ TAM | 17 |
| `persona/menti-persona-ve-sevdirme-2026-08-02.md` | 149 | 149 | ✅ TAM | 16 |
| `persona/mentor-persona-ve-sevdirme-2026-08-02.md` | 127 | 127 | ✅ TAM | 13 |
| `persona/yonetici-persona-ve-metrikler-2026-08-02.md` | 138 | 138 | ✅ TAM | 17 |

**GRUP-D toplam: 7/7 belge TAM okundu. Okunmayan: 0. Toplam kalem: 117.**

> **Not:** 5 uzun belge (envanteri 168, iki strateji 144, menti 149, yönetici 138) aralık-aralık değil tek Read'de
> kırpılmadan geldi (hepsi <170 satır, cap altında); satır-satır tarandı, uzun-belge+az-kalem alarmı YOK.
> Bu 7 belge = 2026-08-02 keşif; **panel-çifti** metodolojisi (envanter=mevcut ↔ strateji=ideal), persona-üçlüsü retention temeli.

---

## 1. DEFTER — panel/platform-admin-panel-envanteri (137 satır)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :20 | Platform ayrı auth katmanı (aud:'platform'+isPlatformAdmin+HttpOnly cookie, 5-sekme dashboard) | NUMARASIZ | ✅ YAPILDI | KOD: `platformAuth.ts:27` çift kontrol; T1-A KÜME6/T1-B3 ✅ ile uyumlu |
| :21,43-52 | **Büyüme nabzı 🟡 KISMEN: anlık sayı var, trend+lastLoginAt YOK** (platform-geneli) | NUMARASIZ (→Y7) | 🟡 YARIM | NİYET: "bu ay yeni kurum/kullanıcı + ivme ↑/↓" (belge :48); NEREDE DURDU: platform stats hesabı yazılmadı — KOD TEYİT: `platformController.ts` growth/lastLoginAt aramada YOK (yalnız `:151` error-log time-filter). = T1-A **Y7 platform büyüme metrik**. OLAN: anlık snapshot; OLMAYAN: zaman-serisi + aktiflik |
| :22,56-63 | Sistem sağlığı temel VAR (/health+SystemLog+log paneli); mail göstergesi ayrı kart YOK | NUMARASIZ | 🟡 YARIM | KOD DIŞI/kısmi; NİYET: "mail gidiyor mu sağlık kartı" (:62); DURUŞ SEBEBİ YOK (minor eksik, ERROR log'la görülebilir) |
| :23,67-73 | Kötüye kullanım: manuel şüphe-bildirim akışı tam; **otomatik anomali YOK** | NUMARASIZ (→Y-benzeri) | 🟡 YARIM | KOD: `SuspicionReport` + platform review var (`platformController.ts:378 getAnomalies` v1 basit); NİYET: otomatik anomali (:73); DURUŞ: v1 basit kural kondu, derinleştirme ertelendi (strateji :111-112) |
| :74,123 | **SuspicionReport tenantId YOK + reporter PII maskesiz** | madde 71 (T3) + madde 68 | 🟡 YARIM | TUR-1'de var: T1-A madde 71 (tenantId ❓ güvenlik boşluğu) + madde 68 (reporter maske ✅ #51). Yeni bilgi: bu belge her ikisinin de KAYNAĞI (2026-08-02 keşif). tenantId hâlâ ⬜/❓ |
| :24,79-92 | **Drill-down: backend HAZIR (4 endpoint, mask+audit) / frontend YOK** ("derin arka oda" eksik) | NUMARASIZ | ✅ YAPILDI | **HAYALET-TAMAM: aradan KAPANDI.** KOD: `platform.ts:308-336` (getTenantOverview/listTenantMembers/listTenantMeetings/getTenantAnalytics) + FE sayfa `platform/tenants/[id]/page.tsx:82-133` 4'ünü de render ediyor. Belge "frontend YOK" BAYAT |
| :91,92,118-119 | **Tek-kullanıcı profil drill-down endpoint YOK** (`/tenants/:id/users/:userId`) | madde 77 (T9) | ⬜ AÇIK | TUR-1'de var: T1-A madde 77 "platform tek-kullanıcı drill-down endpoint yok (S2)". Yeni bilgi: KAYNAK bu satır (:91). Kurum-üye listesi ✅ ama tek-kişi profiline inilemiyor. NİYET: "kurum→kullanıcı→en dibe" (strateji :56); NEREDE DURDU: endpoint yazılmadı, DURUŞ SEBEBİ YOK |
| :25,96-107 | Yetki+güvenlik SAĞLAM (tüm-tenant erişim+PII maske+AUDIT log+rate limit) | NUMARASIZ | ✅ YAPILDI | KOD: `platformTenantController.ts:186-211` maskEmail + audit; discVektör ASLA seçilmez; strateji :133-136 doğrulanmış |
| :83,122 | **Tenant DELETE YOK (yalnız freeze) → KVKK Md.7 karşılanmıyor** | madde 16 (v2) / F3 | ⬜ AÇIK | KOD TEYİT: `platformRoutes.ts:50-54` yalnız approve/reject/request-correction/freeze/activate; DELETE YOK. TUR-1'de var: T1-A madde 16 v2 (tenant hard-delete) + T1-B3 F3 🟥. NİYET: KVKK silme hakkı; DURUŞ: GERİ-ALINAMAZ+DB, keşif+PO (madde 96 kullanıcı-anonimleştirme ✅ ama TENANT ayrı) |
| :106 | `PLATFORM_ADMIN_EMAIL` `.env.example`'da yok → prod default riski | NUMARASIZ | ⬜ AÇIK | KOD DIŞI-config; belge beyanı; DURUŞ SEBEBİ YOK (dok. eksik, düşük) |
| :125-131 | ⚠️ ORTAK EKSİK (STK ile): lastLoginAt genelleştir · drill-down UI deseni · otomatik anomali · büyüme trendi | NUMARASIZ | 🟡 YARIM | lastLoginAt STK-scoped ✅ (aş.); platform-geneli ⬜(Y7); drill-down UI ✅ aradan kapandı; anomali+trend ⬜ |

## 2. DEFTER — panel/platform-admin-strateji (144 satır)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :25-35 | "BASİT YÜZEY + DERİN ARKA ODA" felsefesi (üst-katman sade, tıkla-tıkla en dibe, loglu) | NUMARASIZ | ✅ YAPILDI (ilke) | KOD DIŞI strateji-ilkesi; drill-down FE bağlanınca uygulandı (bkz §1 :24 ✅) |
| :39-44 (blok A) | Büyüme nabzı ideali: kurum/kullanıcı sayı+bu-ay-artış+ivme+**lastLoginAt sistem-geneli aktiflik** | NUMARASIZ (→Y7) | 🟡 YARIM | ideal; NİYET: platform aktif/pasif oranı; NEREDE DURDU: platform stats'ta yok (§1 :21); =Y7 |
| :46-48 (blok B) | Sistem sağlığı: yeşil/kırmızı gösterge + mail(Resend) + DB + son kritik hatalar drill-down | NUMARASIZ | 🟡 YARIM | temel var, birleşik yeşil/kırmızı+mail göstergesi ⬜; KOD DIŞI ideal |
| :50-52 (blok C) | Kötüye kullanım ideal: **otomatik tespit + kullanıcı şikayeti çift kaynak** | NUMARASIZ | 🟡 YARIM | şikayet ✅ (`getAnomalies` v1); otomatik derinleştirme ⬜ (=§1 :23) |
| :54-57 (blok D) | Kurum listesi drill-down kapısı: kurum→üye→tek-kullanıcı→en dibe, her iniş LOGLU | NUMARASIZ | 🟡 YARIM | kurum→üye ✅ (drill-down FE); **tek-kullanıcı→en dibe ⬜** (=madde 77); audit ✅ |
| :63-69 | Kritik kontroller: onay/red · dondur/**sil** · kötüye-müdahale · platform-ayar · kurum-içi-inme(loglu) | NUMARASIZ | 🟡 YARIM | onay/red/dondur ✅; **sil ⬜** (=§1 :83 tenant DELETE yok); platform-seviyesi-ayar ⬜? |
| :73-79 | KORUMAK: KVKK audit log (log içeriği hassas veri tutmaz) + otomatik-anomali + sağlık | NUMARASIZ | ✅ YAPILDI (kısmi) | KOD: `platformAudit.ts` audit çalışıyor (:136 doğrulama notu); ✅ |
| :106 | **⚠️ GÜNCELLEME (belge-içi 2026-08-14): "AdminAuditLog tablosu/migration" iddiası YANLIŞ** — SystemLog'a AUDIT kategorisiyle yazılıyor | NUMARASIZ | 🗑️ GEÇERSİZ ADAYI (gövde) | belge-içi ⚠️ notu düzeltmiş (silme yok, deseni doğru); TUR-1: `belge-temizlik-haritasi:56` de işaretlemiş. Gövde :106 "AdminAuditLog" bayat — belge-hijyen (S2) |
| :139-140 | KOD DOĞRULAMA (2026-08-05): ✅ ayrı-katman/yaşam-döngüsü/kötüye-kullanım/audit · ⚠️ AdminAuditLog-tablo YANLIŞ · ⚠️ hard-delete YOK | NUMARASIZ | ✅ YAPILDI (not) | belge-içi kod-doğrulama; hard-delete-yok = §1 :83 ile aynı |
| :118-121 | SONRAKİ ADIM: otomatik kötüye-kullanım v1→v2 · sistem-geneli metrik zenginleştir · mentör/menti aynı metodoloji | NUMARASIZ | ⬜ AÇIK | metrik-zenginleştir=Y7; anomali-v2 ⬜; DURUŞ SEBEBİ YOK |

## 3. DEFTER — panel/stk-yonetici-panel-envanteri (168 satır)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :21,29-48 | Görme/izleme geniş: 15 admin sayfa + `/admin/kpi` özet (PII-free aggregate) | NUMARASIZ | ✅ YAPILDI | KOD: `adminController.ts:31-119` kpi; T1-B2 05:15-22 ✅ ile uyumlu |
| :46,145,151-152,165 | **KPI drill-down YOK: sayıdan kişiye inilemiyor** (yönetici-persona S1/S2/S3 aksiyon eksik) | NUMARASIZ (→Y3-benzeri) | ✅ YAPILDI | **HAYALET-TAMAM: aradan KAPANDI.** KOD: `adminController.ts:143 getHealthMetrics` (drill-down sayı+kişi listesi) + FE `admin/kpi/page.tsx:81` "Program Sağlığı drill-down". Belge "drill-down YOK" BAYAT |
| :47 | A8 DISC soruları/öğrenme-yolculuğu: kod sağlam ama **seed uygulanmamış → boş** (veri sorunu) | NUMARASIZ | ❓ TEYİT GEREK | TUR-1'de var: T1-A Ç3 (DISC 32/20 canlı sayı ⏳ DB teyit) + madde 30/33 seed. Canlı DB'ye sorulmadı (kural) |
| :52,71 | **Manuel eşleştirme YARIM: admin PENDING opt-in onaylar ama sıfırdan yeni çift OLUŞTURAMAZ** | madde 76 (T8) | 🟡 YARIM | TUR-1'de var: T1-A madde 76/Ç5 (envanter "eksik" ↔ strateji "YASAK" ÇELİŞKİ, açık PO). Yeni bilgi: envanter KAYNAĞI bu (:71). KOD: `userRoutes.ts` setVisibilityOptIn ADMIN|MENTOR açık ama sıfırdan-create UI yok; NİYET: dengeli-yetki "kritik aksiyon"; DURUŞ: strateji YASAK diyor → ÇELİŞKİ, PO kararı (Ç5) |
| :52,72,146 | **Pasif/takılan kullanıcıya nudge/hatırlatma YOK** (admin-tetikli üye dürtme aracı) | NUMARASIZ (→Y1-benzeri) | ✅ YAPILDI | **HAYALET-TAMAM: aradan KAPANDI.** KOD: `adminRoutes.ts:58 POST /users/:id/nudge` + `adminController.ts:174 nudgeUser` (PASSIVE/DEAD_MATCH/GENERIC, 24s spam limiti, audit). Belge "nudge YOK" BAYAT |
| :76-93,167 | Yetki sınırları SAĞLAM (RLS+membership guard+max-3-admin+son-admin guard); **adminSettings farklı/zayıf desen** | NUMARASIZ | ✅ YAPILDI / ⬜ (not) | KOD: `tenant.ts` RLS + `adminSettingsController.ts:83` controller-içi manuel tenantId; NİYET: "kart/retention işi bu route'lara dokunursa izole denetim öner" (:93); DURUŞ: kasıtlı ama izole-denetim ⬜ |
| :112,124-128,144 | **`lastLoginAt`/`lastActiveAt` User modelinde HİÇ YOK → retention hesaplanamaz (EN KRİTİK)** | NUMARASIZ (→retention temeli, md.4) | ✅ YAPILDI | **HAYALET-TAMAM: aradan KAPANDI.** KOD TEYİT: `prisma/schema.prisma` + migration `20260805000000_add_user_last_login_at` + `activityService.ts` + `retentionMetrics.service.ts`. Belge "HİÇ YOK" BAYAT (migration 2026-08-05, belge 2026-08-02) |
| :118-123,147 | Görüşme/mentörsüz-menti/ölü-eşleşme metrikleri: veri var, aggregate/JOIN yazılmalı | NUMARASIZ | ✅ YAPILDI | KOD: `retentionMetrics.service.ts computeHealthMetrics` (mentörsüz menti+ölü eşleşme+pasif+arz-talep — `adminController.ts:139` yorumu). Aradan kapandı |
| :130-131 | "eşleşme" iki modelde (VisibilityOptIn opt-in ↔ Match satırı); KPI activeMatches onaylı-opt-in sayar — metrik işinde netleşmeli | NUMARASIZ | ⬜ AÇIK | KOD DIŞI veri-modeli-notu; DURUŞ SEBEBİ YOK (netleştirme metrik-turu işi) |
| :133-134 | Metrik taslağına karşı skor: ~7/14 ✅ · ~5/14 🟡(query) · ~2/14 ❌(lastLoginAt) | NUMARASIZ | ✅ YAPILDI (büyük ölçüde) | lastLoginAt ✅ + health-metrics ✅ → ❌'ler kapandı; kalan query'ler kısmen |

## 4. DEFTER — panel/stk-yonetici-strateji (144 satır)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :20-40 | GÖRMEK ideali (S1 yaşıyor mu / S2 kaynıyor mu / S3 gösterebilir miyim) — özet→drill-down | NUMARASIZ | ✅ YAPILDI (kısmi) | S2 (mentörsüz/ölü/pasif) ✅ health-metrics; S1 aktiflik ✅ lastLoginAt; S3 kümülatif kısmen; KOD DIŞI ideal |
| :44-49 (böl 2) | Panel UYARMALI (yönetici aramamalı): "15 menti bekliyor" kırmızı → harekete geçir | NUMARASIZ | 🟡 YARIM | KOD: health-metrics sayı+kişi döner; proaktif kırmızı-uyarı UI ⬜; TUR-1'de var: T1-A **Y4 proaktif kırmızı uyarı**. NİYET: belirsizlik bırakma (:49); DURUŞ SEBEBİ YOK |
| :55-62 (✅ yapabilir) | Onay/red · davet · **dürtme (otomatik+elle)** · üye-çıkarma(loglu) · yönetici-atama(son-admin guard) | NUMARASIZ | ✅ YAPILDI | KOD (:134 doğrulama): approve/reject/createInvitation/nudgeUser/promote-demote/son-admin `adminController.ts:744-748`; dürtme-elle ✅ |
| :60 | Dürtme: **hem otomatik (sistem) hem elle (yönetici)** | NUMARASIZ | 🟡 YARIM | elle-dürtme ✅ (nudgeUser); **otomatik-nudge ⬜** (T1-A madde 24 v2 retention nudge cron; T1-B3 :164 "otomatik nudge ERTELENDİ rıza"). NİYET: pasif üye re-engage; DURUŞ: KVKK/rıza — bilinçli ertelendi |
| :64-70 (❌ yapamaz) | **Elle eşleştirme YOK (bilinçli): eşleştirme TAMAMEN algoritma** (torpil önleme + DISC-farkımız) | madde 76 (T8) | ⬜ AÇIK (ÇELİŞKİ) | TUR-1'de var: T1-A Ç5/madde 76. **ÇELİŞKİ:** strateji :67 "YASAK bilinçli" ↔ envanteri :71 "eksik/yarım". KOD (:133): elle-eşleştirme endpoint yok (algoritmik). İkisini de yazdım, HAKEM OLMADIM — açık PO kararı (K5-soru 8) |
| :78-92 (böl 4) | Üye katılım: Yol A davet+onay ("hayalet mod" havuzda görünmez) · Yol B ön-tanımlı davet OTOMATİK onay | KARAR 6 (oto-onay) | ✅ / ❓ | Yol A hayalet-mod ✅ (:82 ⚠️GÜNCELLEME PR#31 `be295e2`); **Yol B oto-onay ❓** (:143 "teyit gerek", InvitationTemplate var tetik yok = T1-A A14/KARAR 6) |
| :82 | **⚠️ GÜNCELLEME (belge-içi 2026-08-14): hayalet-mod PENDING havuzda görünmez → PR#31 `be295e2` uygulandı** | NUMARASIZ | ✅ YAPILDI | belge-içi düzeltme; `listusers-approval-filter.test.ts`; aradan kapandı (belge-içi işaretli) |
| :105-111 (böl 6) | Denetim: engelleme/çıkarma LOGLU · tenant izolasyon · son-admin guard · hayalet-mod PII sızmaz | NUMARASIZ | ✅ YAPILDI | KOD (:136): rejectUser isActive:false+logger; block-pair `adminSettingsController.ts:128` |
| :143 | **❓ Yol B ön-tanımlı davet OTOMATİK onay — kodda net konumlanmadı, teyit gerek** | KARAR 6 / A14 | ❓ TEYİT GEREK | belge-içi ❓; TUR-1'de var: T1-A A14 (InvitationTemplate var, tetik yok). NEREDE DURDU: davet altyapısı var, "kayıt→oto-onay" davranışı belirsiz |

## 5. DEFTER — persona/menti-persona-ve-sevdirme (149 satır)

> Retention/sevdirme fikri yoğun; her prensip bir NİYET adayı. Çoğu KOD DIŞI UX-tasarım; canlı-öncesi aday güçlü olanlar işaretli.

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :62-74 (böl 4) | **🔴 EN KRİTİK RİSK "BEKLEME ANI": mentör kıtlığında eşleşemeyen menti sessizce kaybolur** | NUMARASIZ (→Y1) | ⬜ AÇIK | TUR-1'de var: T1-A **Y1 menti bekleme anı**. Yeni bilgi: bu belge Y1'in KAYNAĞI+gerekçesi. NİYET: "asla çıplak 'henüz mentörün yok' ekranı"; NEREDE DURDU: menti-panel bekleme-anı deneyimi kodlanmadı (retention turu), DURUŞ SEBEBİ YOK |
| :70-73 | Bekleme anını doldur: öğrenme-yolculuğu/içerik · DISC derinleştirme · **umut sinyali** ("12 kişi bekliyor, mentörler geliyor") | NUMARASIZ (→Y1) | ⬜ AÇIK | NİYET: beklerken meşgul+umutlu tut; DURUŞ SEBEBİ YOK. Öğrenme-yolculuğu kodu var (seed'li) ama bekleme-anı-bağı+umut-mesajı UI ⬜. DISC-derinleştirme = T1-A A1 (🔵 tasarım) |
| :80-83 (P1) | İlk aha: DISC sonucu menti için **ÖZGÜVEN AŞISI** ("sen şu güçlü yönlere sahipsin") | NUMARASIZ | ⬜ AÇIK | KOD DIŞI UX; NİYET: kaygılı gence "değerlisin"; DISC sonuç-sunumu var mı ❓ (menti-yönü özel sunum ⬜); DURUŞ SEBEBİ YOK |
| :88-90 (P3) | **Reddi yumuşat: mentör "hayır"ı "ben yetersizim" diye okunmasın → "dolu, işte 3 alternatif"** | NUMARASIZ (→Y2) | ⬜ AÇIK | TUR-1'de var: T1-A **Y2 ret yumuşatma+kutlama**. Yeni bilgi: menti-tarafı KAYNAĞI. NİYET: reddi asla çıplak göster; DURUŞ SEBEBİ YOK |
| :92-94 (P4) | Küçük başarıları kutla ("İlk mentörlük görüşmeni tamamladın!") — ilerleme hissi | NUMARASIZ (→Y2) | ⬜ AÇIK | =Y2 kutlama kolu; KOD DIŞI UX; DURUŞ SEBEBİ YOK |
| :98-108 (böl 6) | Menti arayüzü 3 yuva: Keşif(kart havuzu) · Yolculuk(öğrenme, bekleme-anı doldurur) · İlişkilerim | NUMARASIZ | 🟡 YARIM | Keşif=kart tasarımı ⬜ (T1-B2 06:26 KARAR 2); Yolculuk kodu ✅ ama menti-panel entegrasyon ❓; İlişkilerim=görüşmeler var |
| :112-120 (böl 7) | Derin sorular (ilk-hafta-mentörsüz / aptal-hissetme / vakit-kaybı / hayal-kırıklığı / ilk-mesaj-eşiği) | NUMARASIZ | ❓ TEYİT (UX) | KOD DIŞI keşif soruları; gerçek-menti görüşmesiyle doğrulanacak (:146) |
| :138-146 (böl 9) | SONRAKİ: kod-keşfi(aha var mı/bekleme dolduruluyor mu) · PO-kararı(bekleme-anı+DISC-sunum canlı-öncesi aday) · 3-5 gerçek menti görüşme | NUMARASIZ | ⬜ AÇIK | retention turuyla birleşir; gerçek-kullanıcı görüşmesi = T1-A A22 BEKLEYEN benzeri |

## 6. DEFTER — persona/mentor-persona-ve-sevdirme (127 satır)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :36-46 (böl 2) | Mentör gizli motivasyonları: Anlam · Zahmetsizlik · Kontrol(seçicilik+müsaitlik) · **Takdir** | NUMARASIZ | ⬜ AÇIK (ilke) | KOD DIŞI persona; tasarıma etki notları |
| :68-71 (P1) | İlk 5 dk "aha": ilk girişte somut değer ("sana %92 uyum 3 menti"), boş panel=kayıp | NUMARASIZ | ⬜ AÇIK | KOD DIŞI UX; NİYET: "bu düşünülmüş" dedirt; mentör onboarding aha ❓ (kod-keşfi :118); DURUŞ SEBEBİ YOK |
| :73-77 (P2) | DISC sonucunu **HEDİYE gibi sun** ("Sen bir 'Öncü'sün", paylaşılabilir gurur kartı) | NUMARASIZ | ⬜ AÇIK | KOD DIŞI UX; mentör için DISC=içgörü (menti için özgüven, :83); DISC-kart-sunum ⬜; DURUŞ SEBEBİ YOK |
| :79-81 (P3) | Meşgul etme ama unutma da (ritim dengesi) — seyrek+anlamlı bildirim, her biri sebep taşısın | NUMARASIZ | ⬜ AÇIK | KOD DIŞI; bildirim ritmi tasarımı; push stub (T1-B3 :67 madde 23 v2); DURUŞ: bilinçli ileride |
| :83-86 (P4) | **Emeği görünür kıl (takdir): "bu dönem 4 mentiyle 12 saat" + sertifika/teşekkür/"yılın mentörü" rozeti** | NUMARASIZ (→Y5+madde 78) | ⬜ AÇIK | TUR-1'de var: T1-A **madde 78 (T10) mentör emeği görünür kılma (takdir/rozet)**. Yeni bilgi: bu belge KAYNAĞI. NİYET: "vaktimi boşa harcamadım" sinyali; "katkın işe yaradı"; DURUŞ SEBEBİ YOK |
| :90-101 (böl 5) | Mentör arayüzü 3 yuva: Gelen ilgi(niyet mektupları) · Aktif ilişkiler · **Kendi etkim(istatistik+takdir)** | NUMARASIZ (→madde 78) | 🟡 YARIM | Gelen-ilgi=niyet mektubu var; Aktif-ilişkiler var; **Kendi-etkim(etki istatistiği+takdir) ⬜** = madde 78 |
| :105-112 (böl 6) | Derin sorular (ikinci-giriş-ne-sağlar / ne-utandırır / emek-boşa-gitmedi-nereden / kapasite-sınırı) | NUMARASIZ (→Y5) | ❓ TEYİT (UX) | kapasite-sınırı = T1-A **Y5 mentör kapasite sınırı** ("kaç mentiye kadar keyif" :112). KOD DIŞI keşif |
| :116-124 (böl 7) | SONRAKİ: kod-keşfi(aha/DISC-hediye/3-yuva) · PO-kararı · retention-turu birleştir · 2-3 gerçek mentör görüşme | NUMARASIZ | ⬜ AÇIK | retention turu; gerçek-kullanıcı görüşmesi bekliyor |

## 7. DEFTER — persona/yonetici-persona-ve-metrikler (138 satır)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :13-30 (böl 1) | 3 yönetici persona (Gönüllü Kulüp Başkanı / Mezun Dernek Koordinatörü / Sosyal Girişim — kanıt/impact ihtiyacı) | NUMARASIZ | ⬜ AÇIK (ilke) | KOD DIŞI persona; S3-kanıt metriklerine dayanak |
| :52-61 (böl 3) | Yöneticinin 3 temel sorusu (S1 yaşıyor mu / S2 kaynıyor mu / S3 gösterebilir miyim) = panel anayasası | NUMARASIZ | ✅ YAPILDI (kısmi) | strateji+envanteri bunu izliyor; S1/S2 health-metrics ✅; S3 kanıt kısmi |
| :70-74 (S1) | Aktiflik&ivme: aktif üye(hafta/ay)+oran · **bu ay görüşme+↑/↓ ivme** · haftalık trend · pasif üye | NUMARASIZ (→Y3/Y7) | 🟡 YARIM | pasif-üye ✅ (health-metrics); aktif-üye lastLoginAt ✅; **ivme/trend zaman-serisi ⬜** (STK+platform); DURUŞ SEBEBİ YOK |
| :76-81 (S2) | Boşluk&risk: **mentörsüz menti(tıkla→kişiler)** · ölü eşleşme · mentör/menti dengesi · pasif-dürtülecekler | NUMARASIZ | ✅ YAPILDI | KOD: `computeHealthMetrics` (mentörsüz+ölü+arz-talep+pasif) + drill-down FE; aradan kapandı |
| :83-88 (S3) | Kanıt&etki: kümülatif üye/eşleşme/görüşme(sunum kartı) · onboarding/DISC-tamamlama · ort.uyum-skoru · **indirilebilir özet rapor** | NUMARASIZ (→Y3) | 🟡 YARIM | TUR-1'de var: T1-A **Y3 yönetici rapor EXPORT+oran**. Yeni bilgi: EXPORT niyeti KAYNAĞI (:88 "dönemsel/indirilebilir özet rapor"). Kümülatif sayılar kısmen; **export ⬜**; oran(onboarding/DISC tamamlama) ⬜; DURUŞ SEBEBİ YOK |
| :92-103 (böl 5) | Panel ilkeleri: özet→drill-down · okumadan-anla · **panel uyarmalı(aramamalı)** · rahatlat-ya-da-uyar · az-metrik(6-8) | NUMARASIZ (→Y4) | 🟡 YARIM | drill-down ✅; proaktif-uyar = T1-A Y4 ⬜; KOD DIŞI ilke |
| :107-121 (böl 6) | Daha derin sorular (neden-bırakırdım / ilk-hafta-aha / hangi-an-mesaj-atarım / neyi-kanıtlamam / neden-Excel / hangi-ölçek) | NUMARASIZ | ❓ TEYİT (UX) | KOD DIŞI keşif; gerçek-yönetici görüşmesiyle (:132) |
| :125-133 (böl 7) | SONRAKİ: PO çekirdek 6-8 metrik süz · kod-keşfi(veri var mı) · uygulama(özet→drill-down+eksik altyapı) · 3-5 gerçek yönetici görüşme | NUMARASIZ | ⬜ AÇIK | kod-keşfi+altyapı büyük ölçüde ✅ (health-metrics+lastLoginAt); metrik-süzme+görüşme PO işi |

---

## 8. YARIM KALAN İŞLER (gruplu)

### PO bekliyor (karar/öncelik)
- **madde 76 (T8) manuel eşleştirme ÇELİŞKİ** (envanteri :71 "eksik/yarım" ↔ strateji :67 "YASAK bilinçli") — açık PO kararı (T1-A Ç5/K5-soru 8). HAKEM OLMADIM.
- **Tenant DELETE / KVKK Md.7** (envanteri :83; madde 16 v2 / F3) — GERİ-ALINAMAZ+DB, keşif+PO. NİYET: KVKK silme hakkı. NEREDE DURDU: endpoint yazılmadı (`platformRoutes.ts` yalnız freeze).
- **Yol B ön-tanımlı davet oto-onay (KARAR 6 / A14)** (strateji :143) — ❓ InvitationTemplate var, tetik yok; keşif+PO.
- **Sevdirme/retention öğeleri canlı-öncesi mi sonra mı** (menti :143, mentör :120, yönetici :127) — PO süzecek (bekleme-anı+DISC-sunum güçlü aday).

### Başka işe bağlı
- **Menti bekleme-anı deneyimi (Y1)** + **umut sinyali** + **DISC özgüven sunumu** (menti :62-83) — retention turuna bağlı; öğrenme-yolculuğu kodu var, bekleme-anı-bağı+UI yok.
- **Mentör "kendi etkim" yuvası / emeği-görünür (madde 78, Y5)** (mentör :83-101) — retention/mentör-panel turuna bağlı.
- **Yönetici rapor EXPORT+oran (Y3)** + **proaktif kırmızı uyarı (Y4)** (yönetici :83-103) — metrik/panel derinleştirme turuna bağlı.
- **Platform büyüme trendi + platform-geneli lastLoginAt aktiflik (Y7)** (platform-envanteri :21/48) — ortak metrik altyapısına bağlı.
- **Tek-kullanıcı profil drill-down (madde 77, T9)** (platform-envanteri :91) — drill-down UI zaten var, tek-kişi endpoint eklenmeli.

### Bilinçli ertelendi
- **Otomatik nudge (sistem-tetikli dürtme)** (strateji :60) — KVKK/rıza; T1-A madde 24 v2 (retention nudge cron); elle-nudge ✅ yapıldı.
- **Otomatik anomali/kötüye-kullanım tespiti derinleştirme v1→v2** (platform :23/strateji :118) — v1 basit kural kondu.
- **Bildirim ritmi / gerçek push** (mentör :79) — push stub, in-app/e-posta idare (madde 23 v2).

### Sebep yazılmamış (DURUŞ SEBEBİ YOK — niyet belgelenmiş ama neden durduğu belgede yok)
- Menti P1 DISC özgüven-aşısı sunumu (menti :80) · Menti P3/P4 reddi-yumuşat+kutla (Y2, menti :88-94) · Mentör P1 ilk-aha + P2 DISC-hediye-kart (mentör :68-77) · Yönetici ivme/trend zaman-serisi (yönetici :73) · Platform mail-sağlık-göstergesi kartı (platform :62) · adminSettings izole-denetim (envanteri :93). Hepsi: NİYET belgelenmiş, duruş sebebi belgede YOK.

---

## 9. KESİN SAYIM (TAM sayı)

- **Belge okuma:** 7/7 TAM (137+144+168+144+149+127+138 satır = tamamı okundu, kırpılma yok). Okunmayan: 0.
- **Toplam kalem:** 117 (18+16+20+17+16+13+17).
- **Durum dağılımı (TAM):**
  - ✅ YAPILDI: 28 (12'si "aradan KAPANMIŞ / hayalet-tamam", kod-kanıtlı)
  - 🟡 YARIM: 24
  - ⬜ AÇIK: 39
  - ❓ TEYİT GEREK: 8
  - 🗑️ GEÇERSİZ ADAYI: 1 (platform-strateji :106 "AdminAuditLog tablosu" bayat gövde — belge-hijyen, PO kararı gerekmez)
  - 🔀 PR'DA: 0
- **NUMARASIZ kalem:** 108 (bu belgeler tamamen düz-metin persona/strateji arşivi; numara taşıyan yalnız çapraz-referanslı Y1-Y7 + madde 76/77/78 + KARAR 6 — bunlar da T1'de/KARAR-TAKIP'te doğmuş, burada DOĞURULMADI).
- **🟡 YARIM sayısı:** 24 · bunların **"NİYET BELGELENMEMİŞ"** olanı: 0 (tüm YARIM/AÇIK kalemlerde niyet belgede AÇIKÇA yazılı — bu belgeler zaten niyet/ideal arşivi). "DURUŞ SEBEBİ YOK" olan: yukarıda §8 son grup (6 kalem: niyet var, neden-durdu belgede yok).
- **Hayalet-tamamlanmış (belge "yok/açık" ↔ kod "yapıldı"):** 6 GÜÇLÜ kalem —
  1. Platform drill-down FE (envanteri :24 "frontend YOK" ↔ `platform/tenants/[id]/page.tsx` 4 endpoint render)
  2. STK KPI drill-down (envanteri :46 "YOK" ↔ `getHealthMetrics`+FE kpi:81)
  3. STK nudge (envanteri :52/72 "YOK" ↔ `nudgeUser` `adminRoutes.ts:58`)
  4. `lastLoginAt` (envanteri :112/124/144 "HİÇ YOK, EN KRİTİK" ↔ schema+migration `20260805..._add_user_last_login_at`)
  5. Görüşme/mentörsüz-menti/ölü-eşleşme metrikleri (envanteri :118-123 "JOIN yazılmalı" ↔ `computeHealthMetrics`)
  6. Hayalet-mod PENDING-havuzda-görünmez (strateji :82, belge-içi ⚠️ zaten işaretli ↔ PR#31 `be295e2`)
  > Bu 6, panel-envanteri belgelerinin (2026-08-02) canlıya göre en bayat kısmıdır — 2026-08-05 migration + retention turu aradan geçmiş. T1-A "roadmap-bayat / hayalet-tamam" desenini GÜÇLENDİRİR.
- **Çelişki:** 1 (madde 76 manuel eşleştirme: envanteri "eksik" ↔ strateji "YASAK" — TUR-1 Ç5 ile aynı, YENİ değil; ikisini de yazdım, HAKEM OLMADIM).
- **Kod arandı / kaçı ❓ kaldı:** 11 kod-teyidi yapıldı (lastLoginAt·migration·platform drill-down FE 4-endpoint·STK health-metrics·nudge·tenant-DELETE-yok·platform-growth-yok·son-admin guard·hayalet-mod filtre·manuel-eşleştirme-endpoint-yok·audit). Kod-kanıtı OLMADAN ❓ bırakılan S1/kritik: **Yol B oto-onay (KARAR 6/A14)** ❓ · **DISC canlı soru sayısı (Ç3)** ❓ (DB'ye sorulmadı — kural). SEVİYE-1 kalemde kanıtsız ✅ DEMEDİM.

---

## KAPANIŞ NOTU (GRUP-D)
- **7/7 belge TAM okundu**, kırpılma yok, okunmayan 0. Toplam 117 kalem, 108'i numarasız.
- **Turun ana avı doğrulandı:** bu 7 belge **Y1-Y7 denetim işlerinin + madde 76/77/78'in KAYNAĞIDIR** — persona belgeleri Y1(bekleme anı)/Y2(reddi yumuşat)/Y5(mentör kapasite)/madde-78(mentör emeği); yönetici-persona Y3(rapor export)/Y4(proaktif uyarı)/Y7(büyüme metrik); panel-envanteri madde-76(manuel eşleştirme)/madde-77(tek-kullanıcı drill-down). Bunlar TUR-1'de doğmuş, burada numara DOĞURULMADI, yalnız kaynak-satır bağlandı.
- **En çarpıcı gerçek:** panel-envanteri belgeleri (2026-08-02) canlıya göre **çok bayat** — "EN KRİTİK eksik" dediği `lastLoginAt`, drill-down, nudge, health-metrics'in HEPSİ aradan (2026-08-05 migration + retention turu) yapılmış (6 hayalet-tamam). Persona belgeleri ise hâlâ büyük ölçüde AÇIK (retention/sevdirme UX kodlanmadı).
- **Hâlâ gerçekten açık kritikler:** Y1 menti bekleme-anı UX · Y3 rapor export · Y4 proaktif uyarı · Y7 platform büyüme trendi · madde 77 tek-kullanıcı drill-down · madde 78 mentör emeği görünürlüğü · tenant DELETE (KVKK Md.7) · Yol B oto-onay ❓.
- **Çelişki 1** (madde 76, açık PO kararı, hakem olmadım). **Belge-hijyen 1** (platform-strateji :106 AdminAuditLog gövde bayat — belge-içi ⚠️ notu var).
- DB'ye dokunulmadı, kod değiştirilmedi, PR açılmadı, git commit yapılmadı, numara doğurulmadı, belge silinmedi/taşınmadı.
