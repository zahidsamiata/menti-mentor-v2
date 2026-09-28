### KARAR-9 · Kulüp modülü ve İş İlanları  [ÜRÜN KARARI]
**Şu an ne var:** İkisinin de backend'i tam yazılmış (Kulüp: kurum içi kulüp, 7 uç + 2 tablo; İş İlanları: 4 uç + 1 tablo). Ekranı yok; kullanıcıya görünen tek iz, kurum KPI panelindeki "Aktif İş İlanları" sayısı. Belgelerde "canlı PO niyeti" diye işaretli ama aylardır yapılmamış. "Kulüp tipi kurum" sorusu ayrıca KARAR-34 cevabıyla (topluluk lideri modeli, AN-29) çözüldü; bu kart yalnız kurum içi kulüp ekranını ve iş ilanları ekranını soruyor. Kanıt: `backend/src/routes/clubRoutes.ts:20-40` · `backend/src/routes/jobListingRoutes.ts:15-24` · `backend/prisma/schema.prisma:663,699,718` · `frontend/src/app/(admin)/admin/kpi/page.tsx:106`.
**Sorun ne:** Yazılmış kod kullanıcıya hiç ulaşmıyor. Ya bitirilmeli ya da açıkça ertelenmeli — ortada durması hem kafa karıştırıyor hem bakım maliyeti yaratıyor.
**Neden sana soruyorum:** Yeni bir özelliğin var olup olmayacağı kararı.
**Seçenekler:**
**A) Kulüp FE'yi kuyruğa ekle** · Kullanıcı: kulüp oluşturur/katılır · Kazanç: STK/kurum paketinde anlatacak bir şey olur · Kayıp: çekirdek akış (eşleş→randevu→görüş) hâlâ pürüzlü, dikkat dağılır · Süre: L · Geri alınır: evet · Migration: yok (tablolar hazır)
**B) İkisini de v2'ye ertele** · Kullanıcı: değişiklik yok · Kazanç: tüm emek çekirdek akışa gider · Kayıp: yazılmış kod raflarda beklemeye devam eder · Süre: yok · Geri alınır: evet · Migration: yok
**C) Yalnız iş ilanları** · Kullanıcı: ilan listesi görür · Kazanç: kulüpten küçük iş, kurumlar için görünür değer · Kayıp: yine çekirdek dışı · Süre: M · Geri alınır: evet · Migration: yok (tablo hazır)
**Karşılaştırma:** Yakında bir kuruma demo/satış yapacaksan ve kulüp o konuşmanın parçasıysa A. Önce ürünün ana akışının kusursuz çalışmasını istiyorsan B. C ikisinin ortası ama iş ilanlarının kime yarayacağı belgelerde net değil.
**Benim önerim:** B — üç bug hâlâ kullanıcıyı durduruyorken yeni modül açmak erken.
**Cevap vermezsen:** Kuyruğa eklenmez, yani B uygulanmış olur.
**İlgili kartlar:** KARAR-34 (cevaplı; kulüp tipi kurumu topluluk lideri modeli çözdü) · KARAR-103 (aynı soru: planlanmış ama ekranı olmayan özellik)
⚠️ AĞUSTOS SİNYALİ (2026-08-27, KISMİ — A/B/C DEĞİL): Kulüp-tipi kurum **çıkış blokeri olarak AKTİF edilecek** (`00-PO-KARARLARI-2026-08-27.md:52` G1-13) ama kulüp MODÜLÜ FE'si ⏸️ şimdilik-almada (`:79`/`:105` G10-12 — "aktif kararı verildi, iş sırasına alınmadı"). İş ilanları ağustosta hiç geçmiyor. Yani "kulüp kavramı aktif" ama "FE yap/ertele" (bu kartın A/B) hâlâ açık. PO teyit ederse CEVAP'a yazılabilir.
**CEVAP:**

---

