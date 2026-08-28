# BİLANÇO KARAR DOSYASI — G4b: Retention / persona / sevdirme + mentör-menti akış

**📸 DONDURULMUŞ** · 2026-08-27 · Kaynak: `00-SAYIM-2026-08-27.md` (c/G4) + `karar-defteri-2026-08-26.md` (GRUP 5)

> **Ne bu:** G4 (Panel & akış) ikiye bölündü. **Bu dosya = G4b** (retention / persona / sevdirme deneyimi + mentör-menti akışı: bekleme anı, ret yumuşatma, mentör takdiri, büyüme kanalları, paylaşım kartları). STK-admin + Platform paneli kartları **G4a-panel-akis.md**'de. Her kalem tek karar kartı; PO tek tek işaretler. Salt-okuma + kod-teyit; kod/DB/PR değiştirilmedi.

---

## MUTABAKAT (dosya başı)

- **Tur-5a beyanı G4 toplam:** 59 (ana tablo dağılımı: ✅20 · 🟡9 · ⬜22 · ❓5 · 🔵3 · 🗑️0).
- **Bu bölünme:** G4a = 40 kalem · G4b = 19 kalem → **40 + 19 = 59 ✓** (beyan TUTTU).
- **Bu dosyada (G4b) 19 kalem:**
  - Kart yazılan (🟡/⬜/❓): **18** (G4-22..G4-39)
  - ✅ kart-YOK (dosya sonu listede): **1**
  - 18 + 1 = 19 ✓
- **G4b durum dağılımı:** ✅ 1 · 🟡 5 · ⬜ 12 · ❓ 1 · 🔵 0 · 🗑️ 0
- **Numara sürekliliği:** G4a G4-01..G4-21 → G4b G4-22..G4-39 (kesintisiz). NOT: "Bekleme salonu bildirim izni" karar-defteri GRUP-5'te anılsa da sayım onu **G5**'e attı → burada kart almadı (bu yüzden G4b numarası G4-39'da biter, G4-40 yok).
- **PO okuma süresi (bu dosya):** ~18 kart × ~1.25 dk ≈ **22 dk**.
- **Kod-teyidi:** absans iddiaları (bekleme sinyali, EXPORT, mentör-kapasite, şablon-ekran, mentör servisleri) grep'lendi. **1 nüans çürüme** aşağıda [G4-35]'te (org-onboarding şablonu VAR `Step2Template.tsx`, ama member-persona ekranı yok — kısmi).

**DURUM kodları:** ✅ YAPILDI · 🟡 YARIM · ⬜ AÇIK · ❓ TEYİT GEREK

---

## KARTLAR — Menti tarafı (bekleme / özgüven / ret)

> **TEREDDÜT ÇİFTİ (1):** [G4-22] "Menti bekleme-anı" ↔ [G4-23] "Umut sinyali/sosyal-kanıt" — ikisi de Y1, aynı bekleme ekranını besler ama AYRI karar; katlanmadı, çapraz-not düşüldü.

---
**[G4-22] Menti "bekleme anı" deneyimi**
Ne: Mentör kıtlığında bekleyen menti sessizce kaybolmasın; bekleme süresi öğrenme + DISC-derinleşme + umut sinyaliyle anlamlı kılınsın.
Neden başlanmıştı: Terk (churn) önleme — mentör bulunana kadar mentiyi elde tutma.
Nerede durdu: DURUŞ SEBEBİ YOK. LearningJourneyCard bekleme ekranına konumlandırılmamış (`menti/page.tsx` yalnız `!needsDiscTest` durumunu işliyor).
Bugünkü durum: ⬜
Etkisi: En kırılgan an; kötü yönetilirse erken terk.
İş boyu: M
Kaynak: karar-defteri GRUP-5 · Numara: Y1
⚠️ ilişkili: [G4-23] (umut sinyali — aynı bekleme ekranının parçası, ayrı karar)

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-23] Umut sinyali / sosyal-kanıt ("12 kişi bekliyor, mentörler geliyor")**
Ne: Bekleyen mentiye sistemin canlı olduğunu hissettiren statik/dinamik mesaj — "12 kişi bekliyor, mentörler geliyor" gibi bir umut/sosyal-kanıt sinyali.
Neden başlanmıştı: Bekleme anında umutsuzluğu kırma (retention).
Nerede durdu: DURUŞ SEBEBİ YOK. `menti/page.tsx` grep boş — böyle bir mesaj yok.
Bugünkü durum: ⬜
Etkisi: Bekleme boşluğunu psikolojik olarak doldurur.
İş boyu: S
Kaynak: karar-defteri GRUP-5 · Numara: Y1
⚠️ bilanço yanılmış değil: kod-teyit → `menti/page.tsx`'te "bekliyor/sosyal-kanıt" 0 eşleşme (doğrulandı).
⚠️ ilişkili: [G4-22] (bekleme anı deneyimi — kapsayıcı, ayrı karar)

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-24] Menti P1 DISC "özgüven aşısı" sunumu ("değerlisin")**
Ne: Mentiye kendi DISC sonucunu "değerlisin/güçlü yanların" tonuyla, özgüven veren özel bir sunumla göstermek (menti-yönüne özgü).
Neden başlanmıştı: Menti motivasyonu/özgüveni — sevdirme deneyimi.
Nerede durdu: DURUŞ SEBEBİ YOK. Menti-yönü özel sunum yok.
Bugünkü durum: ⬜
Etkisi: İlk deneyimi olumlu bağlar (aha anı).
İş boyu: S
Kaynak: karar-defteri GRUP-5 · Numara: NUMARASIZ

[ ] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-25] Reddi yumuşat + küçük başarı kutlaması**
Ne: Mentör "hayır" dediğinde mentiyi kırmadan yumuşatmak ("dolu, işte 3 alternatif") + küçük başarılarda kutlama (konfeti sadece DISC-aha'da var).
Neden başlanmıştı: Reddin morali bozmasını önleme + olumlu pekiştirme.
Nerede durdu: DURUŞ SEBEBİ YOK. Mentör→menti ret akışı yok; konfeti yalnız DISC-aha'da.
Bugünkü durum: ⬜
Etkisi: Ret anındaki terk riskini azaltır.
İş boyu: M
Kaynak: karar-defteri GRUP-5 · Numara: Y2

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

## KARTLAR — Mentör tarafı (takdir / kapasite / filtre)

> **TEREDDÜT ÇİFTİ (2):** [G4-26] "Mentör emeği rozet-çeşit" (md.78) ↔ [G4-28] "Mentör kendi-etkim yuvası" (md.78) — ikisi de md.78, biri DIŞARI görünen takdir/rozet, biri MENTÖRE görünen kendi-etki istatistiği; katlanmadı, çapraz-not düşüldü.

---
**[G4-26] Mentör emeğini görünür kıl (takdir/rozet çeşitliliği)**
Ne: Mentörün emeğini dışarıya görünür kılan çeşitli rozetler: "5 görüşme", "yılın mentörü", "12 saat" gibi. Şu an yalnız tek sertifika rozeti var (`certification/page.tsx`), "toplam saat" / rozet-çeşit yok.
Neden başlanmıştı: Mentör motivasyonu + takdir (retention).
Nerede durdu: PO kararı bekliyor.
Bugünkü durum: ⬜
Etkisi: Mentör bağlılığı ve gönüllü sürdürülebilirliği.
İş boyu: M
Kaynak: karar-defteri GRUP-5 · Numara: md.78 (T10)/Y5-akraba
⚠️ ilişkili: [G4-28] (mentör kendi-etkim yuvası — md.78'in içe-bakan yüzü, ayrı karar)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-27] Mentör kapasite sınırı (kaç menti)**
Ne: Bir mentörün aynı anda kaç mentiye bakabileceğini sınırlayan mentör-bazlı kapasite alanı. Şu an yalnız tenant-bazlı `maxMeetingsPerWeek` var; mentör-bazlı alan yok.
Neden başlanmıştı: Mentörü aşırı yüklemekten koruma.
Nerede durdu: PO + canlı-sonrası.
Bugünkü durum: ⬜
Etkisi: Aşırı yüklenmiş mentör = kalite düşüşü ve tükenmişlik.
İş boyu: S
Kaynak: karar-defteri GRUP-5 · Numara: Y5
⚠️ bilanço yanılmış değil: kod-teyit → `schema.prisma`'da mentör-bazlı kapasite alanı yok, yalnız `Tenant.maxMeetingsPerWeek` (doğrulandı).

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-28] Mentör "kendi etkim" yuvası (etki istatistiği + takdir)**
Ne: Mentörün kendi etkisini gördüğü panel: NPS var (`mentorMetricsController.ts`) ama "toplam saat" gibi etki istatistikleri eksik.
Neden başlanmıştı: Mentöre "fark yarattığını" hissettirme (retention).
Nerede durdu: NPS bağlandı; toplam-saat/etki eksik → yarım.
Bugünkü durum: 🟡
Etkisi: Mentör içsel motivasyonu.
İş boyu: S
Kaynak: karar-defteri GRUP-5 · Numara: md.78
⚠️ bilanço yanılmış değil: kod-teyit → `mentorMetricsController.ts` VAR (doğrulandı).
⚠️ ilişkili: [G4-26] (mentör emeği rozet-çeşit — md.78'in dışa-bakan yüzü, ayrı karar)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-29] Mentör sektör filtresi (kendi alanından menti)**
Ne: Mentörün kendi sektöründen menti filtreleyebilmesi. Şu an filtre var (`mentorFilterController.ts`) ama minCompatibilityScore/blockedDisc üzerinden — SEKTÖR bazlı değil.
Neden başlanmıştı: Mentörün alanına uygun menti bulması.
Nerede durdu: Filtre altyapısı var, sektör boyutu eksik → yarım.
Bugünkü durum: 🟡
Etkisi: Sektör-uyumlu eşleşme kolaylığı.
İş boyu: S
Kaynak: karar-defteri GRUP-5 · Numara: NUMARASIZ
⚠️ bilanço yanılmış değil: kod-teyit → `mentorFilterController.ts` VAR (doğrulandı).

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

## KARTLAR — Yönetici tarafı (rapor / uyarı / trend)

---
**[G4-30] Yönetici rapor EXPORT (PDF/Excel/CSV) + oran**
Ne: Yöneticinin sponsora/kuruma sunabileceği rapor dışa aktarımı (PDF/Excel/CSV) + onboarding/DISC-tamamlama oranları.
Neden başlanmıştı: Persona B/C (sponsor/yönetici) için kanıt sunma — canlı-öncesi kritik.
Nerede durdu: DURUŞ SEBEBİ YOK. Export 0 dosya; "sponsora sun" kanıtı yok.
Bugünkü durum: ⬜
Etkisi: Sponsor/kurum ikna sürecinin ana aracı.
İş boyu: M
Kaynak: karar-defteri GRUP-5 · Numara: Y3
⚠️ bilanço yanılmış değil: kod-teyit → PDF/CSV/xlsx export 0 dosya (doğrulandı).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-31] Proaktif kırmızı uyarı (harekete geçir)**
Ne: Panelin nötr sayı ("15 menti bekliyor") yerine yöneticiyi harekete geçiren eşik-tabanlı kırmızı uyarı vermesi. `pairSignal.service.ts`'te GREEN/YELLOW/RED var ama eşik-tabanlı alarm/ivme-oku yok.
Neden başlanmıştı: Yöneticiyi pasif izleyiciden aktif müdahaleye taşıma.
Nerede durdu: DURUŞ SEBEBİ YOK. Renk sinyali var, aksiyon-tetikleyen alarm yok.
Bugünkü durum: 🟡 (⬜)
Etkisi: Bekleyen mentiler zamanında görülüp müdahale edilir.
İş boyu: S
Kaynak: karar-defteri GRUP-5 · Numara: Y4
⚠️ bilanço yanılmış değil: kod-teyit → `pairSignal.service.ts` VAR (doğrulandı).

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-32] STK aktif-üye oran / görüşme-ivme / haftalık-trend (zaman serisi)**
Ne: Yöneticiye aktif-üye ORANI, görüşme ivmesi, haftalık trend gibi zaman-serisi KPI'lar. `retentionMetrics.service.ts`'te pasif sayı var ama oran/ivme/trend KPI kartı yok.
Neden başlanmıştı: Yöneticinin programın gidişatını görebilmesi.
Nerede durdu: Pasif metrik var; zaman-serisi katmanı yok → yarım.
Bugünkü durum: 🟡
Etkisi: Program büyüyor mu duruyor mu görünür.
İş boyu: M
Kaynak: karar-defteri GRUP-5 · Numara: Y3/Y7
⚠️ bilanço yanılmış değil: kod-teyit → `retentionMetrics.service.ts` VAR (doğrulandı).

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-33] Çift-aha modeli / yönetici-önizleme-demo**
Ne: Yöneticiye "davet etmeden önce sistem böyle eşleştiriyor" diye gösteren önizleme-demo ekranı (ilk "aha" anını üye davetinden önce yaşatmak).
Neden başlanmıştı: Yöneticiyi erken ikna — davet öncesi değer gösterimi.
Nerede durdu: KODLANMADI (teyit edildi; önizleme-demo ekranı grep'te yok).
Bugünkü durum: ⬜
Etkisi: Yönetici onboarding'inde erken ikna kaldıracı.
İş boyu: M
Kaynak: karar-defteri GRUP-5 · Numara: A13
⚠️ ilişkili: [G4-34] (iki-aha modeli — wizard tarafı)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-34] STK "iki-aha modeli" (önizleme aha + gerçek aha)**
Ne: Önce önizleme "aha" sonra gerçek-veri "aha" ile iki kademeli ikna. Onboarding wizard var ama canlı-veri-aha tam değil.
Neden başlanmıştı: İki aşamalı değer gösterimiyle ikna derinleştirme.
Nerede durdu: Wizard var; canlı-veri aha eksik → teyit gerek.
Bugünkü durum: ❓
Etkisi: Onboarding ikna gücü.
İş boyu: M
Kaynak: karar-defteri GRUP-5 · Numara: A13
⚠️ ilişkili: [G4-33] (yönetici-önizleme-demo — önizleme aha tarafı)

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

## KARTLAR — Sevdirme / büyüme kanalları

> **NOT (kapsam):** "Bekleme salonu bildirim izni (`Notification.requestPermission`)" kalemi karar-defteri GRUP-5'te anılsa da Tur-5a sayımı onu **G5 (Bildirim/mail)** grubuna atadı → bu dosyada kart ALMAZ, G5 karar dosyasında işlenir.

---
**[G4-35] Onboarding şablon-seçim ekranı (Mezun/Gönüllü/Kulüp)**
Ne: Kullanıcıyı "Mezun/Gönüllü/Kulüp" gibi personaya yönlendiren, "terk-oranını en-çok-düşüren ekran" olarak anılan member-onboarding şablon-seçimi.
Neden başlanmıştı: Persona-bazlı onboarding = terk oranını en çok düşüren ekran.
Nerede durdu: DURUŞ SEBEBİ YOK (member-tarafı).
Bugünkü durum: ⬜
Etkisi: İlk deneyim yönlendirmesi = en yüksek retention etkili ekran.
İş boyu: M
Kaynak: karar-defteri GRUP-5 · Numara: NUMARASIZ
⚠️ bilanço yanılmış (nüans/kısmi): eski="grep: şablon-seçim ekranı yok" → kod gerçeği: **STK-org onboarding'inde `Step2Template.tsx` VAR** ve tam MEZUN/KULUP/GONULLU şablonlarını sunuyor. ANCAK bu, kurumun program-şablonu seçimidir; bilançodaki kalem **member/menti-persona** yönlendirmesidir — o yön hâlâ yok. Yani absans kısmen çürüdü (bitişik org-şablonu mevcut), member-persona ekranı ⬜ olarak durur.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-36] Menti/mentör tarafı retention "sevdirme" deneyimi (persona-temelli)**
Ne: Persona-temelli, onboarding-aha içeren "sevdirme" deneyimi — şimdiye dek yalnız STK-yönetici dilimi yapıldı; menti/mentör tarafında iz yok.
Neden başlanmıştı: Her rol için ayrı sevdirme/aha akışı (retention).
Nerede durdu: Yönetici dilimi ✅; menti/mentör dilimi hiç başlanmadı.
Bugünkü durum: ⬜
Etkisi: Menti/mentör tarafı retention'ın ana boşluğu.
İş boyu: L
Kaynak: karar-defteri GRUP-5 · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-37] Kurumlar-arası "sosyal kanıt" duvarı + paylaşılabilir "Etki kartı"**
Ne: Kurumların birbirini gördüğü kamuya-açık sosyal-kanıt duvarı + paylaşılabilir kurum "Etki kartı" (B2B2C viral büyüme).
Neden başlanmıştı: Kurumlar-arası sosyal kanıtla viral büyüme kanalı.
Nerede durdu: grep: kamuya-açık kurum-duvarı/etki-kartı FE yok.
Bugünkü durum: ⬜
Etkisi: Organik/viral kurum kazanımı.
İş boyu: L
Kaynak: karar-defteri GRUP-5 · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-38] Mentör/menti-kaynaklı "ters çekim" bottom-up büyüme kanalı**
Ne: Bireysel mentör/mentilerin kendi kurumlarını sisteme çekmesi (bottom-up/ters çekim). Multi-tenant altyapı hazır ama bir büyüme kanalına çevrilmemiş.
Neden başlanmıştı: Bottom-up büyüme (bireyler kurumları getirir).
Nerede durdu: Altyapı hazır, kanala çevrilmedi.
Bugünkü durum: ⬜
Etkisi: İkinci organik büyüme kanalı.
İş boyu: L
Kaynak: karar-defteri GRUP-5 · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G4-39] "Görüşme tamamladım 🎉" paylaşım kartı**
Ne: DISC sonuç paylaşım kartından ayrı, tamamlanan görüşme için paylaşılabilir bir kutlama/paylaşım kartı.
Neden başlanmıştı: Başarı paylaşımı → organik görünürlük + pekiştirme.
Nerede durdu: DISC-kartı var; görüşme-paylaşım kartı grep'te yok → yarım.
Bugünkü durum: 🟡
Etkisi: Kullanıcı başarısını dışarı taşır (viral + motivasyon).
İş boyu: S
Kaynak: karar-defteri GRUP-5 · Numara: NUMARASIZ

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

## Bu grupta zaten yapılmışlar (✅ — kart YOK)

- ✅ DISC sonuç paylaşım kartı (LinkedIn/WhatsApp, tüm rollere, rol-gate yok) — `ResultStep.tsx` [NUMARASIZ]

*(1 ✅ kalem.)*
