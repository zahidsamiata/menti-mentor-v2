### KARAR-28 · Ölü LLM/OpenAI ortam değişkenleri silinsin mi? (0 işi açar — SİLME PROTOKOLÜ)  [ÜRÜN KARARI · SİLME PROTOKOLÜ]
**Şu an ne var:** `LLM_PROVIDER` / `OPENAI_API_KEY` / `OPENAI_MODEL` `config.ts`'te okunuyor ama **hiçbir yerde kullanılmıyor** (ice-breaker/LLM yolu koddan silinmiş). Bu tur `.env.example`'da OPENAI_* ölü işaretlendi, LLM_PROVIDER eklenmedi. Kanıt: `backend/src/config.ts:121-125` (`config.llm`; kod içinde okuyan yok) · `backend/.env.example:46-52`, W §D.3.
**Sorun ne:** Ölü değişkenler `.env.example`'da sır (API anahtarı) koymaya davet ediyor (yanıltıcı). Ama silme protokolü gereği "kullanılmıyor" tek başına silme gerekçesi değil.
**Neden sana soruyorum:** `config.ts` alanlarının ve `.env.example` satırlarının SİLİNMESİ = kod silme → SİLME PROTOKOLÜ PO kararı gerektirir. Niyet: ileride LLM (ice-breaker) geri gelecek mi?
**Seçenekler:**
**A) Sil (config alanları + .env.example satırları; önce arşiv belgesine yaz)** · Ne kazanırsın: yanıltıcı ölü env gider, sır ifşa daveti biter · Ne kaybedersin: LLM geri gelirse küçük iskele yeniden yazılır · Süre S · Geri alınır (arşivden) · Migration yok · Kullanıcı ne görür: değişiklik yok (iç ayar)
**B) Bırak ama ölü-işaretli (bugünkü durum)** · Ne kazanırsın: iş yok, iskele durur · Ne kaybedersin: yanıltıcı satırlar kalır · Süre yok · Geri alınır: evet · Migration yok · Kullanıcı ne görür: değişiklik yok
**C) Canlandır (LLM/ice-breaker yolunu geri getir)** · Ne kazanırsın: ice-breaker özelliği · Ne kaybedersin: büyük iş + LLM maliyeti + KVKK (prompt'a giden veri) · Süre L · Migration yok · Geri alınır: evet (özellik kapatılabilir) · Kullanıcı ne görür: eşleşmede yapay zekâ ile üretilmiş tanışma önerisi
**Karşılaştırma:** LLM planın yoksa A (temiz, arşivli). Kararı ertelemek istiyorsan B (bugünkü ölü-işaret yeterince uyarıyor). Yakında ice-breaker düşünüyorsan C.
**Benim önerim:** A — LLM yolu bilinçli kaldırılmış, ölü env yanıltıcı; arşivleyerek silmek temiz. (İleride LLM planın varsa B.)
**Cevap vermezsen:** OPENAI_*/LLM_PROVIDER ölü-işaretli kalır — zararsız ama dağınık.
**İlgili kartlar:** KARAR-11 (cevaplı A: silme politikası karantina → bekle → sil)
**CEVAP:**

---

