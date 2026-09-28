### KARAR-90 · Görüşme sonrası sorulara hangi yeni sorular eklensin? (AN-48 önerileri; 1 iş açar) [ÜRÜN KARARI]
> ⭐ Kaynak: `docs/raporlar/kesif/geri-bildirim-envanteri-2026-09-25.md` §AN-48 (11 öneri: Ö1-Ö11).
**Şu an ne var:** Görüşme sonrası soruların çoğu memnuniyet ölçüyor ("beğendin mi" türü). "Hedefinize ne kadar yaklaştınız?" puanı kaydediliyor (`backend/prisma/schema.prisma:595`); 2026-09-27'den (E-3e) beri yalnız görüşmeler sayfasında yazana ve yöneticiye gösteriliyor (`frontend/src/components/organisms/MeetingCheckInReadout.tsx:135`), hiçbir analiz ya da raporda kullanılmıyor. Check-in soruları: `schema.prisma:593-606`. "Geçen sefer konuştuğun adımı attın mı / sonraki adımın ne" gibi davranış sorusu hiç yok.
**Sorun ne:** Memnuniyet sorusu zayıf sinyaldir; programın işe yarayıp yaramadığını göstermez.
**Neden sana soruyorum:** Kullanıcıya sorulacak soru metni ve sayısı ürün kararı; bir kısmı yeni alan (migration) ister.
**Seçenekler:**
- **A) Yalnız migrationsız öneriler (Ö3, Ö4, Ö6, Ö7, Ö9, Ö11)** · Kazanç: hemen yapılabilir · **Ne kaybedersin:** en güçlü davranış soruları (Ö1, Ö2, Ö5, Ö8) dışarıda kalır · Süre S · Migration yok · Kullanıcı ne görür: görüşme sonrası formda birkaç yeni soru · Geri alınır: evet
- **B) Hepsi — migration'lı olanlar KARAR-89 migration'ıyla aynı pakette** · Kazanç: tek seferde tam set · **Ne kaybedersin:** KARAR-89'a bağlanır; form uzar (tamamlama oranı düşebilir) · Süre M · Migration VAR · Kullanıcı ne görür: daha uzun, davranış sorularını da içeren tek form · Geri alınır: kısmen (yeni alanlara yazılan veri kalır)
- **C) Şimdilik değişiklik yok; önce kullanıcı görüşmeleri (AN-32 kılavuzu)** · Kazanç: sorular gerçek kullanıcıyla sınanır · **Ne kaybedersin:** zayıf sinyal sürer · Kullanıcı ne görür: değişiklik yok · Süre 0 · Geri alınır: — · Migration: yok
**Karşılaştırma:** A hızlı ama eksik. B tam ama KARAR-89'a bağlı. C daha fazla öğrenir ama bekletir.
**Benim önerim:** A şimdi, gerisi B ile KARAR-89 paketinde. *(Soru metni senin kararın.)*
**Cevap vermezsen:** AN-48 önerileri uygulanmaz.
**İlgili kartlar:** KARAR-12 (yeni soruların verisi analiz kaydına akar mı) · KARAR-70 (cevaplı; C'deki kullanıcı görüşmesi kararı) · KARAR-89 (B paketi: migration'lı sorular onun migration'ına biner) — birlikte cevaplanması önerilir: KARAR-90 + KARAR-89
**CEVAP:**

