### KARAR-56 · Menti aynı hafta birden fazla mentöre görüşme talebi gönderebilsin mi?  (3 işi açar)  [ÜRÜN KARARI]
**Şu an ne var:** Haftalık görüşme sınırına (varsayılan 2) onay BEKLEYEN talepler de sayılıyor. Menti'nin aynı 7 günlük döneme düşen 2 bekleyen/onaylı görüşmesi varsa 3.'yü gönderemez, sistem hata (409, "Bu hafta için görüşme limitinize ulaştınız.") döner. Dönem, talebin gönderildiği gün değil görüşmenin başlangıç saatine göre hesaplanıyor. Kanıt: `backend/src/controllers/meetingController.ts:99-104` (sayılan durumlar: PENDING dahil) · `:130-146` (hafta kovası) · `:233-235`, `:571-573` (409) · varsayılan 2: `backend/prisma/schema.prisma:200`.
**Sorun ne:** Menti yolculuğu tasarımı "menti istediği kadar başvurur; kim dönerse onunla başlar, sıklık dolduysa diğeri sonraki haftaya kalır" diyor ve bekleme metni "birden fazla başvuru normaldir" yazıyor (`menti-yolculugu:304-310,324-326`). Bugünkü kodla bu metin yanlış olur.
**Neden sana soruyorum:** Kullanıcının ne yapabileceği (kaç talep) bir ürün kararı; mentörlerin gelen kutusu da etkilenir.
**Seçenekler:**
· **A — Bugünkü hal: bekleyen talepler sınıra sayılır.** Kullanıcı ne görür: 2 bekleyen talepten sonra yeni talep gönderemez. Ne kazanırsın: mentör gelen kutusu şişmez. **Ne kaybedersin:** yanıt vermeyen mentör menti'yi bir hafta kilitler; tasarım metni değişmeli. Süre S · geri alınır ✅ · migration yok
· **B — Yalnız onaylanan görüşmeler sayılır, talep serbest.** Kullanıcı ne görür: istediği kadar talep gönderir; onaylar sınıra ulaşınca kalanlar sonraki haftaya. Ne kazanırsın: tasarımla uyumlu, bekleme ölü zamanı yok. **Ne kaybedersin:** mentörler reddedilecek/eskiyecek talep görür; 3/7 gün zamanlayıcısı (md.154) daha kritik olur. Süre M · geri alınır ✅ · migration yok
· **C — Bekleyen talep için ayrı, daha yüksek sınır (örn. 3).** Kullanıcı ne görür: onaylı görüşme sınırından ayrı, bekleyen talepler için daha geniş bir sınır; o da dolunca yeni talep gönderemez. Ne kazanırsın: ara yol. **Ne kaybedersin:** iki sayaç = kullanıcıya anlatması zor. Süre M · geri alınır ✅ · migration yok
**Karşılaştırma:** Mentör tarafı az ve yavaşsa A korur; menti kaybı önemliyse B. C ancak ölçüm verisi varsa anlamlı.
**Benim önerim:** B — bekleme/ret akışının (md.154/155) tüm metinleri bu varsayımla yazıldı. Bu senin ürün kararın, önerime güvenme.
**Cevap vermezsen:** I-10 (bekleme zamanlayıcısı), I-16 (ret), I-05 (sıklık gösterimi) metinleri kodla çelişik kalır; AN-21 (`00-KUYRUK-KARAR-BEKLEYEN.md` § KARAR-56) bekler.
**İlgili kartlar:** KARAR-53 (cevaplı; mentörün 4 hâli, müsaitlik ve talep davranışı) · KARAR-98 (yanıtsız talepte hatırlatma/eskalasyon; B seçilirse daha kritik)
**CEVAP:**

---

