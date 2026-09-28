### KARAR-109 · Mentörlük anlaşması taslağını kim başlatabilsin? (1 işi açar: E-3 "anlaşma taslağı")  [ÜRÜN KARARI]
> ⭐ Kaynak: E-3 BAĞLA kovası ayıklaması (2026-09-27, salt-okuma; `docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md`).

**Şu an ne var:** Menti mevcut bir anlaşmayı görüp onaylayabiliyor, yenileyebiliyor ya da bitirebiliyor (`frontend/src/app/(dashboard)/menti/agreement/[id]/page.tsx:26-51`). Anlaşmayı elle BAŞLATAN "taslak oluştur" ekranı ise hiçbir yerde yok. Sunucuda uç hazır (`POST /api/agreements`, `backend/src/controllers/agreementController.ts:43`), ön yüzde istemci fonksiyonu tanımlı ama hiçbir ekrandan çağrılmıyor (`frontend/src/lib/api/agreements.ts:47-48`). Bu uç anlaşma oluşturmanın TEK yolu (`backend/src/controllers/agreementController.ts:88` tek oluşturma noktası); yani bugün ürün içinden hiç anlaşma oluşmuyor ve menti panelindeki "Karar Ver" bağlantısı (`frontend/src/app/(dashboard)/menti/page.tsx:195`) yalnız doğrudan uç çağrısıyla oluşmuş bir anlaşmada görünür. Uç bugün mentörden de mentiden de (ve yöneticiden) taslak kabul ediyor (`agreementController.ts:54-57`).
**Sorun ne:** Taraflar anlaşmanın içeriğini (hedefler, sıklık, süre) kendileri yazıp öneremiyor; kimin önereceği belirlenmediği için ekran yapılamıyor.
**Neden sana soruyorum:** Mentörlük ilişkisinde çerçeveyi kimin önerdiği (mentör mü, menti mi, ikisi de mi) ürünün ilişki modelini belirleyen bir tercih.
**Seçenekler:**
- **A) Mentör önerir, menti onaylar** — Kullanıcı: mentör eşleşmeden sonra "anlaşma taslağı hazırla" düğmesi görür, menti bugünkü onay ekranına düşer · Kazanç: deneyimli taraf çerçeveyi kurar, menti üzerinde yük yok · Kayıp: menti kendi hedeflerini baştan yazamaz (yalnız onaylar ya da reddeder) · Süre M · Geri alınır · Migration yok (uç hazır).
- **B) İki taraf da önerebilir, diğeri onaylar** — Kullanıcı: iki panelde de düğme · Kazanç: esneklik, menti inisiyatif alabilir · Kayıp: iki taslak çakışabilir; "kimin taslağı geçerli" kuralı gerekir · Süre M-L · Geri alınır · Migration muhtemelen yok.
- **C) Şimdilik yapılmasın** (bugünkü gibi ürün içinden anlaşma oluşmaz) — Kullanıcı: değişiklik yok · Kazanç: iş yok · Kayıp: taraflar anlaşma içeriğini şekillendiremez; menti onay/yenileme/bitirme ekranı fiilen boş kalır · Süre — · Geri alınır · Migration yok.
**Karşılaştırma:** Basit ve rolleri net bir akış istiyorsan A; mentinin sesini baştan duyurmak istiyorsan B; ilk kurumlarla canlıya çıkış önceliğiyse C.
**Benim önerim:** A — en az karmaşıklıkla anlaşma içeriğini açar; menti onay adımında söz hakkını korur.
**Cevap vermezsen:** E-3'ün "anlaşma taslağı" alt kalemi bekler; başka iş kilitlenmez.
**İlgili kartlar:** KARAR-97 (ilişki başlangıcında mentörün kabul/ret yetkisi)
**CEVAP:**

