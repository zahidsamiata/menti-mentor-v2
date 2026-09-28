### KARAR-92 · Mentör "menti hazırlıksızdı" derse oryantasyon kilidi devreye girsin mi? (1 iş açar) [ÜRÜN KARARI]
> ⭐ Kaynak: `docs/raporlar/kesif/geri-bildirim-envanteri-2026-09-25.md`.
**Şu an ne var:** Menti için bir "oryantasyon kilidi" var (hazırlıksız menti önce oryantasyonu tamamlasın diye). Ama kilit, hiç dolmayan `Feedback` kutusuna bağlı olduğu için hiçbir zaman tetiklenmiyor (`backend/src/controllers/feedbackController.ts:138-148`, hazırlık puanı ≤ 2). Mentör check-in'de "menti hazırlıklı mıydı" sorusunu cevaplıyor (`backend/prisma/schema.prisma:599`); bu cevap yalnız görüşmeler sayfasında gösteriliyor (`frontend/src/components/organisms/MeetingCheckInReadout.tsx:138-140`), kilide bağlı değil. Kilit tetiklense bile: menti panelinde uyarı çıkar ve anlaşmalar yüklenmez (`frontend/src/app/(dashboard)/menti/page.tsx:48-53,171-180`); sunucu yalnız eski `POST /api/meetings` ucunda reddediyor (`backend/src/controllers/meetingController.ts:182-191,220`), canlı randevu ucu `/book` (`:465`) kilidi kontrol etmiyor (KARAR-40).
**Sorun ne:** Kilit ya bağlanmalı ya da bilinçli olarak kapalı tutulmalı. Bugün "var gibi görünüp çalışmıyor."
**Neden sana soruyorum:** Kilit açılırsa menti bir sonraki görüşmeden önce engellenir; bu, kullanıcıyı doğrudan etkileyen bir yetki kararı.
**Seçenekler:**
- **A) Evet, mentörün "hazırlıksızdı" cevabı kilidi tetiklesin** · Kullanıcı ne görür: menti bir sonraki randevudan önce oryantasyonu tamamlamaya yönlendirilir · Kazanç: kalite · **Ne kaybedersin:** tek bir olumsuz cevap mentiyi engeller (haksız olabilir) · Süre S · Migration yok · Geri alınır: evet
- **B) Evet ama ancak 2 ardışık "hazırlıksız" cevapta** · Kazanç: haksız kilit riski azalır · **Ne kaybedersin:** ilk sorunda müdahale gecikir · Süre S · Kullanıcı ne görür: menti ancak iki ardışık olumsuz cevaptan sonra oryantasyona yönlendirilir · Geri alınır: evet · Migration: yok
- **C) Hayır, kilit kapalı kalsın; bilgi yalnız yöneticiye gitsin** · Kazanç: menti engellenmez · **Ne kaybedersin:** kilidin amacı gerçekleşmez · Kullanıcı ne görür: menti için değişiklik yok; yönetici hazırlık cevabını görür · Süre S · Geri alınır: evet · Migration: yok
**Karşılaştırma:** A katı, B dengeli, C yumuşak.
**Benim önerim:** B — tek cevapla kilit haksız olabilir. *(Bu senin ürün kararın, önerime güvenme.)*
**Cevap vermezsen:** kilit çalışmamaya devam eder.
**İlgili kartlar:** KARAR-13 (kilidi elle kaldırma butonu) · KARAR-40 (kilidi uygulayan tek uç eski POST /api/meetings — V-15) · KARAR-89 (hazırlık cevabı hangi kutudan okunur) — birlikte cevaplanması önerilir: KARAR-92 + KARAR-40
**CEVAP:**

---

