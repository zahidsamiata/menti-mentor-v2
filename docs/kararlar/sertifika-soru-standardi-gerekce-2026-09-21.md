# Sertifika Soruları Neden Platform-Global? (Kurum kendi sorusunu ekleyemez)

📸 DONDURULMUŞ · Oluşturma: 2026-09-21 · Kaynak: F-13 (=G3-05) · Karar-gerekçe belgesi

> **Amaç:** Kod, kurumların (tenant) sertifika sorusu **eklemesini engelliyor** — ama "neden" belgesi
> zayıftı. Bu belge o kısıtın gerekçesini kalıcı olarak kaydeder ki ileride biri "kısıt bug mı?" diye
> yanlış yorumlayıp kaldırmasın.

## Kod gerçeği (kanıt)

- Sertifika soruları **global**dir: `certification.service.ts` soruları `prisma.certificationQuestion.findMany({ where: { isActive: true, topic } })` ile çeker — **`tenantId` YOK** (`:129` civarı, `setCertificationTopic`).
- Kurumun yapabildiği tek şey: bir **konuyu (topic) açıp kapatmak** — `getDisabledTopics()` / `setCertificationTopic()` (`certification.service.ts:76-137`). Konu kapatma bile korumalı: red-line konu kapatılamaz (`RED_LINE_LOCKED`), toplam açık konu `CERT_CONFIG.minActiveTopics` altına düşürülemez (`MIN_TOPICS`).
- Yani kurum: sorunun **içeriğini** değiştiremez, **yeni soru ekleyemez**, yalnız hangi konuların sınavda çıkacağını (sınırlar dâhilinde) seçer.

## Neden böyle tasarlandı (gerekçe)

1. **"Sertifikalı mentör" karşılaştırılabilir bir kalite sinyalidir.** Sertifika bir kurumdan diğerine
   aynı anlama gelmeli. Her kurum kendi sorusunu eklerse "sertifikalı" etiketi kurumdan kuruma farklı bir
   çıtayı gösterir → etiket güvenilirliğini yitirir (bir kurumda 3 kolay soru, ötekinde 22 zorlu senaryo).
2. **Ortak havuz / kurumlar arası eşleşme.** Paylaşımlı havuzda (isSharedPoolActive) bir kurumun mentörü
   başka kuruma görünebilir. Sertifika ortak bir standartsa bu güven taşınabilir; kuruma özel sorularla
   taşınamaz.
3. **İçerik kalite güvencesi + kötüye kullanım.** Serbest soru ekleme; hatalı, yanlı ya da kişisel-veri
   sızdıran sorulara kapı açar. Soru bankası merkezî tutulunca içerik tek elden gözden geçirilir
   (`docs/raporlar/icerik/sertifika-oturum*`), red-line konular korunur.
4. **Esneklik yine var — ama güvenli eksende.** Kurum ihtiyacına göre **konu açıp kapatabiliyor**
   (min/red-line sınırları içinde). Bu, "kurum hiç söz sahibi değil" olmadığını, sözün **standardı bozmayan**
   bir eksende verildiğini gösterir.

## Bu bir kısıt mı, eksik mi?

**Kısıt — bilinçli.** "Kurum sertifika sorusu ekleyemiyor" bir eksik özellik DEĞİL, tasarım kararıdır.
Değiştirilecekse (ör. kuruma-özel ek modül), bu bir **ürün + kalite kararıdır** (yeni KARAR kartı gerektirir),
teknik bir düzeltme değil. Bugünkü davranış korunur.

## İlgili

- Sertifika içeriği finalize (22 senaryo/88 şık): `docs/raporlar/icerik/sertifika-oturum1/2/3-*-2026-09-08.md` — seed'e taşıma önkoşulu P-99 / K-16 (`00-KUYRUK.md`).
- Sertifika durumu tek kaynak = `TenantMembership` (bkz. `backend/CLAUDE.md` + P-12).
