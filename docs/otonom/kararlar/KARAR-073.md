### KARAR-73 · Değerlendirme AŞAMA 2/3 (otomatik pasifleştirme) yapılacak mı? (1 iş açar: AN-34) [ÜRÜN KARARI]
> ⭐ Kaynak: CS bilanço denetimi §7 KARAR-B.
**Şu an ne var:** Eşleşme sonrası karşılıklı değerlendirme AŞAMA 1'in kodu canlıda (kalite puanı `TenantMembership.qualityMultiplier`'a yazılıyor — `backend/src/controllers/feedbackController.ts:125-136` → `backend/src/services/scoring.ts:169-180`; yönetici havuzda görüyor — `frontend/src/app/(admin)/admin/mentor-havuzu/page.tsx:179`). Ama puanı besleyen `Feedback` kutusuna hiçbir ekran yazmıyor (KARAR-89), bu yüzden bugün her mentörün puanı nötr başlangıç değerinde (`scoring.ts:126-152`). AŞAMA 2 (eşik-altı mentörün otomatik pasifleşmesi) ve AŞAMA 3 (yeniden-değerlendirme + onay döngüsü) yalnız tasarımda. Kanıt: `konu/degerlendirme-metrik-sistemi-tasarim-2026-08-19.md:175-188`.
**Sorun ne:** Düşük puanlı bir mentör kendiliğinden pasifleşmiyor; yönetici elle müdahale etmezse zayıf eşleşmeler sürer.
**Neden sana soruyorum:** Bir mentörün otomatik (insan onayı olmadan) pasifleştirilmesi, mentörün göreceği/hissedeceği geri-dönülebilir ama hassas bir sonuç — eşiği ve otomasyon derecesini ürün sahibi belirler.
**Seçenekler:**
- **A) Tam otomatik pasifleştirme (eşik 3.1/5):** · Mentör: eşik altına düşünce eşleşme almaz · Kazanç: kalite kendini korur · Kayıp: tek kötü dönem mentörü haksız cezalandırır; 3.1 eşiği dayanaksız (belge itiraf ediyor) · Süre L · Migration VAR (`blocked`/`restrictedUntil`) · Geri alınır: evet (otomasyon kapatılır; pasif kalan mentörün kaçırdığı eşleşmeler geri gelmez)
- **B) Yönetici-önerili (otomatik uyarı, elle onay):** · Mentör: yönetici karar verir · Kazanç: insan denetimi · Kayıp: yönetici iş yükü · Süre M · Migration VAR · Geri alınır: evet
- **C) Şimdilik yapılmasın:** · Kazanç: 0 iş, gerçek veri ~sıfır · Kayıp: kalite döngüsü yarım kalır · Süre 0 · Geri alınır: — · Migration: yok
**Karşılaştırma:** Gerçek değerlendirme verisi ~sıfırken A'nın eşiği kalibre edilemez; B insan denetimiyle güvenli ama iş yükü; C en düşük risk. Veri birikene kadar C→B doğal yol.
**Benim önerim:** C şimdilik, veri birikince B — çünkü 3.1 eşiği bugün ampirik olarak savunulamaz. *(Ürün kararın.)*
**Cevap vermezsen:** AŞAMA 2/3 tasarımı öksüz kalır; kalite döngüsü "yarım özellik" olarak asılı durur (AN-34 kilitli).
**İlgili kartlar:** KARAR-44 (öğrenen kalite verisi pasifleştirme eşiğini besler) · KARAR-89 (kalite puanının kaynağı tek kutu kararına bağlı)
**CEVAP:**

