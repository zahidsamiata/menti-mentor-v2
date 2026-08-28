# İçerik Dökümü — Öğrenme Yolculuğu (2026-08-15)

**📸 DONDURULMUŞ (2026-08-15)** — kaynak: `backend/prisma/seed-learning-journey.ts` + canlı DB salt-okuma sayımı.

> 🗄️ **ARŞİV (2026-08-28, G9-08/16):** BAYAT döküm — `docs/raporlar/icerik/`'ten `docs/arsiv/icerik/`'e taşındı. Güncel kod-kanıtlı kaynak: [`tam-soru-dokumu-2026-08-26.md`](../../raporlar/icerik/tam-soru-dokumu-2026-08-26.md) (öğrenme=13).

> ⚠️ **GÜNCELLEME (2026-08-26):** Güncel kod-kanıtlı döküm: [`bolumler/04-ogrenme-kurumozel.md`](../../raporlar/icerik/bolumler/04-ogrenme-kurumozel.md) + [`tam-soru-dokumu-2026-08-26.md`](../../raporlar/icerik/tam-soru-dokumu-2026-08-26.md). Kod = **13 aşama** (puan yok, timestamp).

> Oyunlaştırılmış keşif akışının **tüm aşamaları + seçenekler + geri bildirimler** tam metin.

## Kaynak & tutarlılık
- **Kod kaynağı:** `seed-learning-journey.ts:39-499` — Mentör 7 + Menti 6 = **13 aşama**, `tenantId=null` (global, kilitli).
- **Canlı DB (salt-okuma):** MENTOR 7 + MENTI 6 = **13** → kod ile birebir tutuyor. ✅
- **Mekanik:** durum → 3-4 seçenek → seçim → tepki+neden (feedback). Sonuç: `correct/warn/wrong`. **Puanlama/geçme-kalma YOK** — bilinçli "keşif" (sınav değil). Sertifikasyondan tamamen ayrı.
- **DISC-tipine-özel "mentiye yaklaşım" içeriği:** ❌ YOK — aşamalar genel rol becerisi öğretir (mentör: güven/geri bildirim/sınır; menti: sorumluluk/iletişim). Menti "Zeynep"/mentör "Deniz" sabit kurgu; DISC tipine göre dallanma yok.

---

## MENTÖR YOLCULUĞU (7 aşama)

### 1. Tanışma — *Güven kurma, yargılamadan dinleme*
Durum: İlk mentin Zeynep'le tanışıyorsun, gergin, sesi titrek. İlk sözün ne olur?
- **✓ a (correct):** "Merhaba Zeynep, tanıştığımıza sevindim — hiç acele yok, önce biraz sohbet edelim mi?" → Güven en başta kurulur; ilk dakikalar ilişkinin tonunu belirler.
- **⚠ b (warn):** "Merhaba. Hedeflerini konuşalım, ne başarmak istiyorsun?" → Erken; önce insan, sonra iş.
- **✗ c (wrong):** "Ben şunları yaptım, sana çok faydam olur." → Odak mentide olmalı, seni anlatmak değil.

### 2. Rolün sınırı — *Koçluk vs söyleme, bağımsızlık*
Durum: "Staj başvurum reddedildi, ne yapmalıyım?" Çözümü biliyorsun. Ne yaparsın?
- **✓ a:** "Sence neden reddedilmiş olabilir? Hangi seçeneklerin var?" → En güçlü öğrenme mentinin kendi çözümüne ulaşması.
- **⚠ b:** "Ben olsam şunu yapardım — sen ne düşünüyorsun?" → Menti fikrini 'doğru cevap' sanır; sıra ters.
- **✗ c:** "Şunu şunu yap, olur biter." → Bağımlılık yaratır.

### 3. Zor an (geri bildirim) — *Yapıcı geri bildirim, şefkatli dürüstlük*
Durum: Zeynep heyecanla proje fikri sunuyor ama ciddi kusur var, özgüveni kırılgan. Ne yaparsın?
- **✓ a:** Önce gerçek güçlü yanı, sonra kusuru soru olarak açarsın. → Dürüstlük + şefkat.
- **⚠ b:** "Güzel ama şurada sıkıntı var, merak etme herkes yapar." → Geçiştirici.
- **✗ c:** "Harika fikir, aynen devam et!" → Sahte övgü, zararlı.
- **✗ d:** "Bu çalışmaz, baştan yanlış kurmuşsun." → Nasıl söylediğin önemli; ilişkiyi koparır.

### 4. Mesafe & sınır — *Sağlıklı sınır, rol netliği*
Durum: Zeynep günün her saati, gece yarısı bile mesaj atıyor, bu seni yoruyor. Ne yaparsın?
- **✓ a:** "Sana değer veriyorum; en iyi desteği şu saatlerde verebilirim." → Sağlıklı sınır ilişkiyi korur.
- **⚠ b:** İdare edersin, yorulsan da cevap verirsin. → Söylenmeyen sınır ikinizi de yıpratır.
- **✗ c:** Aniden uzaklaşır, mesajları görmezden gelirsin. → Terk edilmişlik hissi.

### 5. Kriz anı (rolün ötesi) — *Kriz yönetimi, rolün sınırı (red-line)*
Durum: Zeynep sessizleşiyor, gözleri doluyor: "hiçbir şey anlamlı gelmiyor, çok yoruldum." Ne yaparsın?
- **✓ a:** Yargılamadan dinler, profesyonel desteğe (okul psikoloğu/uzman) yönlendirirsin. → Mentör terapist değil.
- **⚠ b:** Sadece dinlersin, orada bırakırsın. → Destek iyi ama yönlendirme eksik.
- **✗ c:** "Boş ver, herkesin kötü günü olur, geçer!" → Hissi hafife alır.
- **✗ d:** "Bu benim alanım değil" deyip geçersin. → En kırılgan anında yalnız bırakır.

### 6. Gönüllülük ruhu — *Gönüllü motivasyonu, anlam* (STK-özel)
Durum: Zeynep yorgun: "Karşılığında bir şey almıyorum, neden uğraşıyorum bilmiyorum." Ne yaparsın?
- **✓ a:** "Geçen ay etkinliğin 40 kişiye ulaştı... seni buraya getiren his neydi?" → Anlam/etki tükenmişliğin panzehiri.
- **⚠ b:** "Biraz dinlen, sonra devam edersin." → Anlam kaybı konuşulmazsa aynı yere döner.
- **✗ c:** "Herkes böyle hisseder, geçer." → Küçümser.
- **✗ d:** "Gönüllülük bu, istemiyorsan bırakabilirsin." → Emeği değersizleştirir.

### 7. Denge (okul/gönüllülük) — *Gerçek hayatla gönüllülük dengesi* (STK-özel)
Durum: Zeynep sınav döneminde görevleri aksatıyor, proje aksıyor. Ne yaparsın?
- **✓ a:** "Şu an okulun önceliğin; görevleri sınavdan sonrasına birlikte planlayalım mı?" → Esneklik bağlılığı artırır.
- **⚠ b:** "Tamam, sonra konuşuruz" (hiç karışmazsın). → Proje boşlukta kalır.
- **✗ c:** "Söz vermiştin, yine de yapman lazım." → Kopma noktası.

---

## MENTİ YOLCULUĞU (6 aşama)

### 1. Tanışma — *Mentörden ne beklenir/beklenmez*
Durum: İlk mentörün Deniz'le tanışıyorsun. İçinden ne bekliyorsun?
- **✓ a:** "Bana yol göstersin, ama adımları ben atacağım." → Mentör pusuladır, taşıyıcı değil.
- **⚠ b:** "Umarım her şeyi halleder, bana iş bulur." → Hayal kırıklığı kaçınılmaz.
- **✗ c:** "Herhalde çok bir şey değişmez, öylesine bakayım." → Düşük beklenti = az kazanım.

### 2. Sorumluluk — *Menti kendi gelişiminin öznesi*
Durum: Deniz bir öneride bulundu, görüşme bitti. Ne yaparsın?
- **✓ a:** Öneriyi denersin, sonucu not alır, sonraki görüşmeye getirirsin. → Sahiplenen menti en hızlı büyür.
- **⚠ b:** "Bir dahaki görüşmede detaylandırır" deyip bir şey yapmazsın. → İlerleme olmaz.
- **✗ c:** Öneriyi bir kenara bırakırsın. → İlişki söner.

### 3. Açık iletişim — *Sağlıklı iletişim, savunmasız açıklık*
Durum: Deniz bir şey anlattı, tam anlamadın; aptalca görünmekten çekiniyorsun. Ne yaparsın?
- **✓ a:** "Şu kısmı tam yakalayamadım, biraz daha açar mısın?" → Soru sormak en hızlı öğrenme.
- **⚠ b:** Anlamış gibi yaparsın. → Boşluk büyür.
- **⚠ c:** Kendi kendine çözmeye çalışırsın. → Sormak zaman kazandırır.

### 4. Sınır & saygı — *Sağlıklı sınır, karşılıklılık*
Durum: Deniz'den çok şey ister oldun; bir gün cevabı gecikiyor. Ne düşünürsün?
- **✓ a:** "Deniz'in de kendi hayatı var, gerçekçi olmam lazım." → Karşılıklı saygı ilişkiyi uzatır.
- **✗ b:** "Demek bana değer vermiyor." → İlişkiyi zehirler.
- **⚠ c:** "Belki net olmadım, daha çok yazayım." → Sınır zorlamak yıpratır.

### 5. Süreklilik — *Bağlılık, erken kopmayı önleme*
Durum: Yoğunlaştın, bir buluşmayı habersiz kaçırdın. Ne yaparsın?
- **✓ a:** Deniz'e yazıp durumu açıklar, yeni zaman ayarlarsın. → Dürüst iletişim aksaklığı güce çevirir.
- **✗ b:** Habersiz kaybolursun. → İlişki sessizce kopar.
- **⚠ c:** Bahane üretirsin. → Güven zedelenir.

### 6. Aidiyet — *Topluluğa aidiyet* (STK-özel)
Durum: Kendini 'dışarıdan biri' gibi hissediyorsun, etkinliklere katılmıyorsun. Ne yaparsın?
- **✓ a:** Küçük de olsa bir etkinliğe katılır, topluluğa katkı denersin. → Aidiyet katılımla kurulur.
- **⚠ b:** "Ben sadece Deniz'le çalışayım yeter." → Fırsatları kaçırır.
- **✗ c:** "Beni çağırırlarsa giderim." → Pasiflik yalnızlaştırır.

---
*Not: Öğrenme yolculuğu içeriği zengin ve canlıda tam (13/13). Eksik olan, bu keşif akışına DISC-tipine-göre uyarlama katmanı (bkz. eksikler raporu).*
