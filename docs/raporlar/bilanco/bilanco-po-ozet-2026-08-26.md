# BELGE BİLANÇOSU — ÜRÜN SAHİBİ ÖZETİ

**2026-08-26** · Sade özet (teknik detay için: `belge-bilancosu-2026-08-26.md` + `karar-defteri-2026-08-26.md`)

> Tüm proje belgeleri (71 belge, 10.473 satır) baştan sona okundu. İçlerindeki her karar, iş ve fikir çıkarıldı,
> koda bakılarak "yapıldı mı" doğrulandı, tekrarlar birleştirildi. Sonuç: **≈259 benzersiz kalem** (⚠️ 2026-08-27 düzeltme: bu özette geçen eski "196" YANLIŞTI — gerçek tekil ≈259; bkz. `kararlar/00-KATLAMA-IZI-2026-08-27.md`).
> Bu özet, "arkada ne kaldı, ne için başlanmıştı, nerede durdu" sorusunun kısa cevabıdır.

---

## 1. ARKADA KAÇ İŞ KALDI

| Durum | Sayı | Ne demek |
|---|:---:|---|
| ✅ Yapıldı (canlıda) | 58 | Bitmiş, kodda doğrulandı |
| 🟡 Yarım | 22 | Bir kısmı yapıldı, bir kısmı eksik |
| ⬜ Açık | 66 | Hiç başlanmadı |
| ❓ Teyit/karar gerek | 32 | Senin kararın veya bir kontrol bekliyor |
| 🔵 Bilinçli ertelendi | 5 | Sonraya (v2) bırakıldı |
| 🗑️ Geçersiz olabilir | 12 | Eskimiş/gereksiz görünüyor — kararı sende |
| 📌 Kalıcı kural | 1 | Çalışma kuralı (iş değil) |
| **Toplam** | **196** | |

**Eyleme muhtaç iş: 120** (yarım + açık + teyit). İyi haber: 58'i zaten yapılmış ve birçoğu "açık sanılıyordu" (§5).

---

## 2. EN ÇOK İŞ HANGİ ALANDA BEKLİYOR (çoktan aza)

| Alan | Açık+yarım+teyit | Not |
|---|:---:|---|
| Güvenlik / KVKK | ~30 | En yoğun alan; çoğu canlı-öncesi kritik (silme, çerez, hukuki metin) |
| Altyapı / senin yapacakların | ~25 | Foto-volume, mail-env, sunucu güvenliği, canlı testler |
| Kullanıcıyı sevdirme (menti/mentör) | ~18 | Bekleme anı, ret yumuşatma, kutlama, mentör takdiri — hiç kodlanmadı |
| İçerik / sorular | ~14 | Sorular felsefesi, DISC-yaklaşım içeriği, sertifika bankası |
| Ölü/yarım kod | ~15 | Yazılmış ama bağlanmamış özellikler (silinsin mi bağlansın mı) |
| Yönetici paneli inceliği | ~10 | Rapor indirme, proaktif uyarı, tek-kişi detayı |

---

## 3. YARIM KALAN İŞLER — neden durdu?

### A) Senin kararını bekliyor
- **68 sorunun ve eşleştirme tablosunun incelenmesi** — sana sunulan iki dosyada (soru inceleme + eşleşme uyum) hiçbir işaret koymamışsın; hepsi boş bekliyor. **Bu en büyük bekleyen iş.**
  `[ ] PO notu: `
- **Silme mi anonimleştirme mi bitti** ama: kulüp modülü, feedback-logs, bazı yazılmış-ama-bağlanmamış ekranlar "kalsın mı silinsin mi" senin kararını bekliyor.
  `[ ] PO notu: `
- **Manuel eşleştirme:** bir belge "yönetici elle eşleştirsin (eksik)" diyor, diğeri "elle eşleştirme YASAK" diyor. Hangisi geçerli?
  `[ ] PO notu: `
- **Çıkışta Google Analytics olacak mı?** Evet dersen çerez izni bandı + analytics canlı-öncesi zorunlu olur.
  `[ ] PO notu: `

### B) Başka işe bağlı (bloke)
- **Kurum onay/ret maili** → mail gönderimi kapalı; sen `destek@` + sunucu ayarını yapınca açılır.
  `[ ] PO notu: `
- **Sertifika bankası (5→20 soru)** → güvenli bir "seed çalıştırma" yolu yok; önce o yazılmalı, sonra senin onayınla canlıya.
  `[ ] PO notu: `
- **DISC-yaklaşım içeriği (#31) ve DISC derinleşme kurgusu** → önce "içerik felsefesi keşfi" bitmeli.
  `[ ] PO notu: `

### C) Bilinçli ertelendi (v2)
- Sektör skorunu canlıya bağlama, eşleştirmeleri birleştirme, gerçek push bildirim, staging ortamı — hepsi "önce test ortamı" gerektiriyor, sonraya bırakıldı.
  `[ ] PO notu: `

### D) ⭐ SEBEP YAZILMAMIŞ (neden durduğu belli değil — en çok bunları merak edersin)
- **Y1-Y7 retention işleri** (bekleme anı, ret yumuşatma, kutlama, rapor indirme, proaktif uyarı, mentör kapasitesi) — 20 Ağustos'ta "yapılacak" denmiş, hiç başlanmamış, neden bırakıldığı yazılı değil.
  `[ ] PO notu: `
- **Menti bekleme salonunda bildirim izni** — "en kritik UX" denmiş, iz yok.
  `[ ] PO notu: `
- **Platform'da tek bir kullanıcının detayına inme** — üye listesi var, kişiye tıklanamıyor; neden yapılmadığı yazılı değil.
  `[ ] PO notu: `
- **Menti/mentör tarafını "sevdirme" deneyimi** — yalnız yönetici tarafı yapılmış; menti/mentör onboarding'i neden atlandığı belli değil.
  `[ ] PO notu: `

---

## 4. ⭐ VERİLİP TUTULMAMIŞ SÖZLER

> Bir oturumda "sonraki sefer yapacağız" denip sonra unutulan işler. 15 sözün 11'i sonraki oturumlarda hiç devralınmamış.

- **Kurum maili açılacaktı** (20 Ağustos) — hâlâ kapalı.
  `[ ] PO notu: `
- **Y1-Y7 retention işleri yapılacaktı** (20 Ağustos) — hiçbiri yapılmadı.
  `[ ] PO notu: `
- **Canlı veritabanındaki soru sayıları teyit edilecekti** (DISC/SJT/sertifika kod ile canlı tutuyor mu) — hiç bakılmadı.
  `[ ] PO notu: `
- **KVKK metinleri avukata gidip sonlanacaktı** — hukukçu onayı + senin dolduracağın alanlar bekliyor.
  `[ ] PO notu: `
- **Soru cevap tipi (#13) yapılacaktı** — defalarca ertelendi.
  `[ ] PO notu: `
- **Belge düzeni baştan toparlanacaktı (~68 belge)** — kısmen yapıldı (bu bilanço onun parçası), tamamı değil.
  `[ ] PO notu: `

---

## 5. UNUTULMUŞ ERKEN NİYETLER (ilk aylardan)

> Projenin ilk aylarında "yapacağız/olsun" denip bugünkü listelerde izi kalmamış fikirler. Hâlâ istiyor musun, yoksa vazgeçildi mi?

- **Sunucu güvenliği** (Dokploy HTTPS, firewall, SSH, SSL, yedekleme) — hiç ele alınmadı, canlıdan önce önemli.
  `[ ] PO notu: `
- **Mentör, menti ile görüşme kararı verirken menti'nin ilk mesajını görsün** — altyapı hazır, ekran yapılmamış.
  `[ ] PO notu: `
- **Kayıttan sonra kullanıcı bilgisini/fotoğrafını düzenleyebiliyor mu** — hiç kontrol edilmemiş.
  `[ ] PO notu: `
- **Ücretli/ücretsiz (freemium) altyapısı** — şemada var, mantığı yazılmamış.
  `[ ] PO notu: `
- **Kayıtta "Mezun/Gönüllü/Kulüp" şablon seçimi** — "terk oranını en çok düşüren ekran" denmiş, yapılmamış.
  `[ ] PO notu: `
- **Kurumların birbirini görebildiği "sosyal kanıt" / paylaşılabilir kurum etki kartı** — büyüme fikri, iz yok.
  `[ ] PO notu: `

---

## 6. İYİ HABER — "açık sanılan ama aslında YAPILMIŞ" işler

Belgeler "eksik/yok" diyordu ama kodda tamamlanmış (koda bakıp doğruladık):

- Platform panelinde kurumdan üyeye inme ekranı ✅
- Yönetici KPI'dan kişiye inme ✅
- Son giriş / son aktiflik takibi (retention temeli) ✅ — belge "hiç yok, en kritik" diyordu
- Pasif üyeye elle hatırlatma (nudge) ✅
- Sol menü gruplaması, durum rozeti, sertifika rozeti, DISC çift-harf ✅ — eski denetim "hiç yok" diyordu
- Fotoğraf yükleme + havuzda görünmesi ✅
- 3 güvenlik açığı (şifre sızıntısı, KVKK silme, şikayet-eden gizliliği) ✅ canlıda
- Sektör skoru motoru yazılmış (yalnız canlıya bağlanması kalmış) ✅
- İlk aylardaki güvenlik denetiminin bulduğu ciddi açıkların hepsi kapanmış ✅

**Özet:** Ürün, belgelerin gösterdiğinden daha ileride. Belgeler kodun gerisinde kalmış.

---

## 7. NUMARA ADAYLARI → ✅ NUMARALANDI (104-124)

**⚠️ GÜNCELLEME (2026-08-26):** Bu işler artık `00-KARAR-TAKIP` Bölüm F.6'da **104-124** numaralarıyla takipte. Numara yalnızca "izlenebilirlik" içindir — **hiçbirine öncelik verilmedi** (hepsi "⬜ AÇIK — PO önceliklendirmedi"). Örnekler: bekleme-bildirim izni, "Bildir" geri-bildirim akışı, onboarding şablon-seçimi, menti/mentör sevdirme, freemium altyapısı, sunucu sertleştirme, `backend/CLAUDE.md` düzeltmesi, PROJECT_STATUS arşivleme.

> Sıralamak istediğinde: hangi numaraları önce yapmak istediğini söyle — o zaman `10-yol-haritasi`'na öncelik sırasıyla girerler.
`[ ] PO notu: (öncelik vermek istediğin numaralar) `

---

## 8. BİR DAHA YAŞANMASIN — kısa teşhis

Bu karışıklık neden oldu? **İki yapısal boşluk:**
1. **Bir bulgu numara almadan kalınca izi kayboluyordu** (raporlarda kalıp takip listesine geçmiyordu — ~175 kalem böyle).
2. **Bir oturumda verilen söz, sonraki oturum açılışında okunmuyordu** (15 sözün 11'i unutuldu).

Çözüm önerisi (4 kural, detay `tekrar-onleme-2026-08-26.md`): raporlar kalem listesiyle bitsin · "yapıldı" kod kanıtı olmadan yazılmasın · sözler tek yere yazılıp oturum BAŞINDA okunsun · yaşayan belgeler eskiyince "bayat" işaretlensin. **Hiçbiri henüz uygulanmadı — senin onayını bekliyor.**
`[ ] PO notu: (kuralları onaylıyorum / şunlar değişsin / gerek yok) `
