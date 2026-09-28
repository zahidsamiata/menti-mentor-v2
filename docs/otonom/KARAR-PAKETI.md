> TÜR: 🌡️ ILIK — rutin turda okunmaz; PO toplu karar oturumunda okur. 01-KARARLAR indeksinden bağlantılıdır. Tazeleme: toplu cevap turundan önce (sayılar indeks + KİLİT HARİTASI'ndan yeniden alınır).
> **Nasıl kullanılır:** her satırın sonundaki boş sütuna yalnız **harf** (A/B/C… · 🔵 kartlarda EVET/HAYIR · S5/teyit listesinde "onayla/hayır") yaz. Cevaplar strateji katmanı üzerinden **PO NOTU** olarak ajana gelir; ajan onları kart dosyalarının `**CEVAP:**` satırına işler. Ayrıntı gerekirse "Kart" sütunundaki dosyayı aç (`docs/otonom/kararlar/KARAR-NNN.md`).
> Bu paket **cevap vermez, karar yazmaz**; "öneri" sütunu kartın kendi önerisidir. Kuruma görünen / KVKK / hukuki metinlerin içeriği burada yok — yalnız seçenek tarifi.

# KARAR PAKETİ — tek oturumda toplu cevap için (2026-09-28)

**Kısaltmalar:** ⛔ÇB = çıkış blokeri (canlıya çıkışı tek başına engeller) · 🛡️ güvenlik · 🔒 KVKK (kişisel veri) · ⚖️ hukuk/avukat · 🗄️ veritabanı değişikliği (migration = tablo/alan yapısı değişir) · 🌱 seed (canlıya toplu içerik yazma) · "ayak" = işin yalnız bir parçası bu karara bağlı. Geri alınır: ✅ kolay · ⚠️ zor/kısmen · ❌ geri alınmaz.

---

## ℹ️ BİLGİ — karar değil (2026-09-28)
- **AJ-86 · Açılış sayfası (landing) görünüm paketi yapılıyor (T5):** ziyaretçi açılış sayfasını siyah yerine yumuşak lacivert zeminde görecek; açık temayı seçen ziyaretçide landing de açık olacak; bilgi (i) ipuçları metnin üstüne binmeyecek ve okunur olacak; demo kartında hiç etiket seçilmezse uyum %52 yerine %0 gösterecek. Landing METNİ değişmez. Dayanak: 2026-09-28 PO görevi T5'i sıraya koydu (belgede eski "canlı-sonrası" zamanlama notu vardı — `docs/kararlar/konu/06-tasarim-ux.md:10`); yön G7-13 "yumuşak lacivert". Beğenmezsen: tek PR geri alınır.

## (e) İLK 10 KARAR — bununla açılan iş sayısı

Seçim ölçüsü: kilitlediği iş sayısı (güncel indeks + `00-KUYRUK.md` § 🔴 KİLİT HARİTASI), eşitlikte risk (can güvenliği > KVKK > ürün).

| Sıra | Kart | Soru | Açtığı işler | Tam açılan | Ek kararla açılan |
|---|---|---|---|---|---|
| 1 | KARAR-64 | Ekranda "mizaç" mı, "karakter" mi, "kişilik" mi yazsın? | I-01, I-11, AN-50, AN-51, AN-10 (ayak) | 5 | — |
| 2 | KARAR-46 | Sertifikaya hangi içerik sürümü gitsin? | F-14, P-99, AN-03 ⛔ÇB, K-16 | 3 | K-16 (+KARAR-3, 4) |
| 3 | KARAR-57 | Kişilik sonucunu hangi test belirlesin? | F-09, PS-03, I-12 | 3 | — |
| 4 | KARAR-45 | Arketip adları hangi koda bağlansın? | IC-14, IC-10 (ayak), AN-05 (ayak) | 3 | — |
| 5 | KARAR-89 | Görüşme değerlendirmesi tek kutuda mı toplansın? | KR-08, AJ-49, AN-49 | 2 | AN-49 (+KARAR-67) |
| 6 | KARAR-58 | Eski DISC'ten yeni Big Five'a geçiş nasıl? | PS-A2, PS-A3, AN-04 | 2 | AN-04 (+KARAR-62) |
| 7 | KARAR-95 | Kendine zarar ifadesinde kim haberdar olsun? (can güvenliği) | I-18, IC-13 | 2 | — |
| 8 | KARAR-72 | Sessiz/kalıcı red ("ghost") özelliği olsun mu? (KVKK+hukuk) | KR-20, AN-33 | 2 | — |
| 9 | KARAR-110 | Kırık periyodik anket yeni anket altyapısına katılsın mı? | AJ-14, AJ-49 (89 ile ortak) | 1 (kartın A önerisi seçilirse KARAR-106'ya EVET de gerekir) | — |
| 10 | KARAR-44 | Resmî memnuniyet ölçüsü + algoritma öğrensin mi? | F-08, AJ-38 | 1 | AJ-38 (+KARAR-12) |

**Bu 10 kararla 24 iş tamamen açılır; 4 iş daha (K-16, AN-49, AN-04, AJ-38) birer ek kararla açılır (KARAR-3+4, 67, 62, 12) → toplam 28 iş.**
⚠️ Sayıya girmeyen ama önce cevaplanması önerilen: **KARAR-101** — canlıda açık güvenlik boşluğu (onay bekleyen kişi Google/LinkedIn ile oturum alıyor, `oauthService.ts:116-117,153`); PR'ı hazır ama çakışmalı. **KARAR-82…85** — her biri tek bir ⛔ çıkış blokerini açar.

---

## (a) AÇIK KARTLARIN TAMAMI (108 = 99 soru + 9 🔵 EVET/HAYIR)

### a1 · Güvenlik / KVKK / çıkış blokeri (40) — açtığı iş sayısına göre

| No | Soru | Öneri (kartın) | Açtığı işler | Geri al. | Risk | Kart | PO seçimi (→ PO NOTU) |
|---|---|---|---|---|---|---|---|
| 101 | Onay bekleyen kişi girip yalnız "Bekleme Odası"nı görsün mü? | B — açık kapanır, bekleme odası korunur | Y1-B8 (PR #164/#343, çakışmalı; kuyrukta satırı yok) | ✅ | 🛡️ canlıda açık | [kart](kararlar/KARAR-101.md) | |
| 46 | Sertifikaya 22 senaryoluk yeni içerik tam taşınsın mı? | A — en olgun içerik; 3 ve 4 önce | F-14, P-99, AN-03, K-16 | ✅ (yedekle) | ⛔ÇB · 🌱 | [kart](kararlar/KARAR-046.md) | |
| 95 | Kendine zarar ifadesinde kim haberdar olsun? | C — yönetici bildirimi + yardım ekranı, ikisi de ucuz | I-18, IC-13 | ✅ | 🛡️ can | [kart](kararlar/KARAR-095.md) | |
| 72 | Uygunsuz kişiyi sessiz ve kalıcı reddetme olsun mu? | B — yok, bugünkü şeffaf red kalsın | KR-20, AN-33 | ✅ | 🔒 ⚖️ | [kart](kararlar/KARAR-072.md) | |
| 110 | Periyodik anket AN-52 anket altyapısına katılsın mı? | A — KARAR-106 EVET'ine bağlı | AJ-14, AJ-49 | ✅ | 🔒 | [kart](kararlar/KARAR-110.md) | |
| 82 | Davet bağlantısı iptal edilebilir olsun mu? | B — iptal edilebilir toplu link | U-12 | ✅ 🗄️ | ⛔ÇB 🛡️ | [kart](kararlar/KARAR-082.md) | |
| 83 | Rolü kim, nasıl değiştirir? | B — yalnız düşürme hatası düzelsin | U-13 | ✅ | ⛔ÇB 🛡️ | [kart](kararlar/KARAR-083.md) | |
| 84 | E-posta çalışmazsa şifre sıfırlamayı kim yapsın? | B — yalnız platform yöneticisi | U-15 | ✅ | ⛔ÇB 🛡️ | [kart](kararlar/KARAR-084.md) | |
| 85 | Yeni ortamda DISC soru havuzu nasıl dolsun? | A — silmeyen ayrı betik | U-17 | ✅ | ⛔ÇB 🌱 | [kart](kararlar/KARAR-085.md) | |
| 5 | Öğrenme yolculuğu içeriği canlıya yazılsın mı? | B — önce PO okur | K-18 | ✅ (yedekle) | ⛔ÇB (koşullu) 🌱 | [kart](kararlar/KARAR-005.md) | |
| 3 | Kriz senaryosunda yasal iddia yerine "kurum politikası" metni mi? | A — avukat gelince tek satır | K-16 (+46, 4) | ✅ | ⛔ÇB (dolaylı) ⚖️ | [kart](kararlar/KARAR-003.md) | |
| 4 | Kriz şıkkında destek kaynağı ne yazsın? | A şimdi (sabit metin), B sonra | K-16 (+46, 3) | ✅ | ⛔ÇB (dolaylı) 🛡️ | [kart](kararlar/KARAR-004.md) | |
| 94 | "Verilerimi indir" eksikliği çıkış blokeri sayılsın mı? | A — bloker olsun | GV-17 | ✅ | 🔒 ⛔ÇB adayı | [kart](kararlar/KARAR-094.md) | |
| 19 | Kurum silme + eski rıza + denetim izi ne zaman? | C şimdi, B aday | F-07 | ❌ (kurum silme) | 🔒 | [kart](kararlar/KARAR-019.md) | |
| 38 | Aydınlatma metni: Birleşik Krallık'a aktarım ek rıza ister mi? | C→A — avukata sor, sonra metni uydur | GV-09 | ✅ | 🔒 ⚖️ | [kart](kararlar/KARAR-038.md) | |
| 40 | Eski randevu ucu karantinaya, kilit yeni uca taşınsın mı? | A şimdi (yapıldı), B sonra | V-15 | ✅ | 🛡️ | [kart](kararlar/KARAR-040.md) | |
| 74 | Kurum kalıcı olarak silinebilsin mi? | A — çift onay + tarihli yedek | AN-37 | ❌ 🗄️ | 🔒 | [kart](kararlar/KARAR-074.md) | |
| 79 | Bakım işlerini elle kim tetiklesin? | A — yalnız platform | KR-05 | ✅ | 🛡️ | [kart](kararlar/KARAR-079.md) | |
| 87 | Birden çok platform yöneticisi olacak mı? | A — tek hesap kalsın | AN-38 | ✅ | 🛡️ | [kart](kararlar/KARAR-087.md) | |
| 93 | Kurumdan çıkarılanın kişilik verisi 30 gün sonra silinsin mi? | B şimdi (silmesiz), silme ayrı | Y-14 | ❌ (silme) | 🔒 | [kart](kararlar/KARAR-093.md) | |
| 102 | Kayıttan sonra e-posta doğrulaması zorunlu olsun mu? | C — şimdi hayır, ilk kurumdan önce evet | GV-12 | ✅ | 🛡️ 🔒 | [kart](kararlar/KARAR-102.md) | |
| 105 | Kurumlar arası anonim karşılaştırma izni kimde? | C şimdi, sonra A | AN-31 | ✅ (A/B 🗄️) | 🔒 | [kart](kararlar/KARAR-105.md) | |
| 112 | Kurum logosu hangi adreslerden gösterilsin (izleme pikseli)? | A şimdilik, C ayrı iş | AJ-22 (ayak) | ✅ | 🛡️ 🔒 | [kart](kararlar/KARAR-112.md) | |
| 47 | Kodla çelişen 2 metin hemen düzelsin, gerisi avukata mı? | B | AN-41 (ayak) | ✅ | 🔒 ⚖️ | [kart](kararlar/KARAR-047.md) | |
| 67 | Kurum yöneticisi mentinin serbest notunu görsün mü? | A — yalnız toplu + durum | AN-49 (ayak, +89) | ✅ | 🔒 | [kart](kararlar/KARAR-067.md) | |
| 75 | Yasal metinlerde kişi adı mı, kurum/unvan mı? | B + avukat teyidi | AN-41 (ayak) | ✅ | 🔒 ⚖️ | [kart](kararlar/KARAR-075.md) | |
| 25 | Veritabanı yedeği nereye yazılsın? | öneri yok (A ya da B + geri yükleme provası) | G1-28 (kuyrukta değil) | ✅ | ⛔ÇB 🔒 | [kart](kararlar/KARAR-025.md) | |
| 8 | Kod depoları gizli (private) yapılsın mı? | B — otonom turlar bitince | — (PO eli) | ✅ | 🛡️ | [kart](kararlar/KARAR-008.md) | |
| 13 | Yöneticiye "eşleştirmeyi yenile/kilit kaldır" düğmesi? | B — yalnız güvenli ikisi | — | ✅ | 🛡️ | [kart](kararlar/KARAR-013.md) | |
| 14 | Yönetici kullanıcı verisini indir/anonimleştir/sil yapabilsin mi? | B — kalıcı silme yok | — | ❌ (anonim.) | 🔒 | [kart](kararlar/KARAR-014.md) | |
| 31 | Kriz bildirimi + 18 yaş altı (kalan: yalnız yaş) | öneri yok — avukat | — (kriz ayağı 95'e geçti) | ✅ | 🔒 🛡️ ⚖️ | [kart](kararlar/KARAR-031.md) | |
| 39 | Hesap kapanınca başkası hakkındaki yorum silinsin mi? | B — yorum kalır, taahhüt metni netleşir | — | ✅ | 🔒 | [kart](kararlar/KARAR-039.md) | |
| 59 | Senaryo/persona kurgu adları kişi adı yasağına girer mi? | öneri yok (kural yorumu) | — | ✅ | 🔒 | [kart](kararlar/KARAR-059.md) | |
| 60 | Kullanıcı kendi kişilik yüzdesini görsün mü? | A — görmez, yalnız arketip | — | ✅ | 🔒 | [kart](kararlar/KARAR-060.md) | |
| 71 | Kırılgan gençte hangi tutundurma teknikleri serbest? | öneri yok — ruh sağlığı uzmanı | — | ✅ | 🛡️ etik | [kart](kararlar/KARAR-071.md) | |
| 86 | Platform üye listesinde kişi bazında DISC görünsün mü? | A — gösterilmesin | — | ✅ | 🔒 | [kart](kararlar/KARAR-086.md) | |
| 91 | Görüşme değerlendirmeleri ne kadar saklansın? | C — dışa aktarıma ekle, süre avukatla | — | ✅ | 🔒 ⚖️ | [kart](kararlar/KARAR-091.md) | |
| 118 | Ayrı deneme (staging) ortamı kurulsun mu? | B — yalnız ayrı Neon dalı | — | ✅ | 🛡️ veri | [kart](kararlar/KARAR-118.md) | |
| 120 | Pasif üyelere otomatik hatırlatma e-postası gitsin mi? | B — sistem listeler, yönetici gönderir | — | ✅ | 🔒 | [kart](kararlar/KARAR-120.md) | |
| 126 | Az yanıtlı ilk ayda "NPS düştü" önerisi çıkmasın mı? | B | — | ✅ | 🔒 | [kart](kararlar/KARAR-126.md) | |

### a2 · Ürün / veri (48) — açtığı iş sayısına göre

| No | Soru | Öneri (kartın) | Açtığı işler | Geri al. | Risk | Kart | PO seçimi (→ PO NOTU) |
|---|---|---|---|---|---|---|---|
| 64 | Ekranda "mizaç", "karakter" ya da "kişilik"? | C — kişilik | I-01, I-11, AN-50, AN-51, AN-10 (ayak) | ✅ | ürün | [kart](kararlar/KARAR-064.md) | |
| 89 | Değerlendirmenin tek kutusu MeetingCheckIn mi olsun? | B — KARAR-77 ile birlikte oku | KR-08, AJ-49, AN-49 | ✅ 🗄️ | veri | [kart](kararlar/KARAR-089.md) | |
| 57 | Kişilik sonucunu tek test mi belirlesin? | A — 32 soruluk test esas | F-09, PS-03, I-12 | ✅ | ürün | [kart](kararlar/KARAR-057.md) | |
| 58 | Yeni kişilik bankasına geçiş: kesme mi, paralel mi? | öneri yok (yedek zorunlu) | PS-A2, AN-04, PS-A3 | ❌ (A) 🗄️ | veri | [kart](kararlar/KARAR-058.md) | |
| 45 | Yeni 8 arketip adı eski adların yerini alsın mı? | C — çakışan 2 ad yeniden adlanır | IC-14, IC-10 (ayak), AN-05 (ayak) | ✅ | ürün | [kart](kararlar/KARAR-045.md) | |
| 12 | Görüşme geri bildirimi iç analiz aracı mı olsun? | A — KARAR-44 ile tek cevap | AJ-38, AJ-99 (olası) | ✅ | ürün | [kart](kararlar/KARAR-012.md) | |
| 36 | 3 yarım teknik kalem: karantina mı, tamamla mı? | (a)(b) B, (c) A | Y-18, AJ-10 | ✅ | veri | [kart](kararlar/KARAR-036.md) | |
| 44 | Tek resmî memnuniyet ölçüsü + insan onaylı öğrenme? | B | F-08, AJ-38 | ✅ | ürün | [kart](kararlar/KARAR-044.md) | |
| 61 | Yeni puan formülü kişilik motoruyla aynı anda mı? | B — iki adım | F-11 (+65), AJ-92 | ✅ | ürün (eşleştirme) | [kart](kararlar/KARAR-061.md) | |
| 88 | Hakkımızda/İletişim sayfaları + WhatsApp düğmesi? | A — iki sayfa, yalnız e-posta | Y-07, Y-11 | ✅ | kuruma görünen | [kart](kararlar/KARAR-088.md) | |
| 103 | Eski planlardaki 13 özellikten hangileri yapılsın? | B — 4 küçük, şemasız özellik | AJ-11, AJ-78 (ayak) | ✅ | ürün | [kart](kararlar/KARAR-103.md) | |
| 2 | Profile tek serbest bağlantı alanı eklensin mi? | A | K-17 | ✅ 🗄️ | ürün | [kart](kararlar/KARAR-002.md) | |
| 15 | Çok kuruma üye kişi kurum değiştirebilsin mi? | B — yalnız çok üyeliği olana | AJ-10 (+36) | ✅ | ürün | [kart](kararlar/KARAR-015.md) | |
| 21 | Kurum sorularına şıklı cevap tipi eklensin mi? | A — Likert + çoktan seçmeli | F-12 | ⚠️ 🗄️ | ürün | [kart](kararlar/KARAR-021.md) | |
| 30 | İsim değişkeni içerik seed'inden önce mi? | A — içerik canlıya bir kez yazılır | I-09 | ✅ | 🌱 sıra | [kart](kararlar/KARAR-030.md) | |
| 41 | Mentöre kontenjan konsun mu? | C — skorda yumuşak yük dengesi | P-15 | ✅ | ürün | [kart](kararlar/KARAR-041.md) | |
| 48 | Sonuç ekranı dili koşullu dile dönsün mü? | A | AN-20 | ✅ | ürün | [kart](kararlar/KARAR-048.md) | |
| 54 | Kart havuzu 5 tasarım sorusu (mizaç, etiket, sayfa, filtre, menti kartı) | öneri yok (görsel tercih) | AJ-90 (ayak) | ✅ | ürün | [kart](kararlar/KARAR-054.md) | |
| 56 | Bekleyen talepler yeni talebi engellesin mi? | B — yalnız onaylılar sayılır | AN-21 | ✅ | ürün | [kart](kararlar/KARAR-056.md) | |
| 62 | İlk ölçümde herkes aynı soruları mı çözsün? | C — şimdilik 15 sabit | AN-04 (+58) | ✅ | ürün | [kart](kararlar/KARAR-062.md) | |
| 65 | "D mentör + S menti" yasağı menti tarafında da olsun mu? | B — 61 ile birlikte | F-11 (+61) | ✅ | ürün (eşleştirme) | [kart](kararlar/KARAR-065.md) | |
| 73 | Düşük puanlı mentör otomatik pasifleşsin mi? | C şimdi, veri birikince B | AN-34 | ✅ (A/B 🗄️) | ürün | [kart](kararlar/KARAR-073.md) | |
| 76 | Gerekçesiz `verifiedBy` alanı ne olsun? | B — karantina | AN-08 | ✅ | veri (silme prot.) | [kart](kararlar/KARAR-076.md) | |
| 78 | Ölü dönemlik anket sayfası ne olsun? | B — karantina (110 ile aynı soru) | KR-11 | ✅ | ürün | [kart](kararlar/KARAR-078.md) | |
| 109 | Mentörlük anlaşması taslağını kim başlatsın? | A — mentör önerir, menti onaylar | E-3 (ayak) | ✅ | ürün | [kart](kararlar/KARAR-109.md) | |
| 113 | Sertifika sınavı tüm konular mı, 4+4 çekim mi? | B — hepsi, baraj %80 | AJ-34 | ✅ | ürün | [kart](kararlar/KARAR-113.md) | |
| 127 | Sertifikadan önce 4 kısa "Mini Akademi" modülü? | A — yapılmaz, belge düzeltilir | AJ-101 (ayak) | ✅ | ürün | [kart](kararlar/KARAR-127.md) | |
| 9 | Kulüp ekranı ve iş ilanları yapılsın mı? | B — sonraya ertele | — | ✅ | ürün | [kart](kararlar/KARAR-009.md) | |
| 16 | Yönetici mentör görünürlüğünü onaylasın mı? | B — yalnız görünürlük onayı | — | ✅ | ürün | [kart](kararlar/KARAR-016.md) | |
| 17 | Kurum yöneticisine davetsiz önizleme ekranı? | C — şimdilik yok | — | ✅ | ürün | [kart](kararlar/KARAR-017.md) | |
| 26 | İki eski yedek tablo silinsin mi? | öneri yok (teyitliyse A) | — | ❌ (A) | veri | [kart](kararlar/KARAR-026.md) | |
| 42 | DISC testi yeniden alınabilsin mi? | B — üzerine yaz | — | ⚠️ (eski profil gelmez) | veri | [kart](kararlar/KARAR-042.md) | |
| 43 | Menti, mentörün eleyeceği eşleşmeyi görsün mü? | C — iki yönlü filtre | — | ✅ | ürün | [kart](kararlar/KARAR-043.md) | |
| 55 | Sertifikada şık açıklaması ne zaman gösterilsin? | B — sınav sonunda | — | ✅ | ürün | [kart](kararlar/KARAR-055.md) | |
| 63 | Arketip sabit eşikle mi, "en yüksek boyut" kuralıyla mı? | A | — | ✅ | ürün | [kart](kararlar/KARAR-063.md) | |
| 90 | Görüşme sonrası yeni davranış soruları eklensin mi? | A şimdi, gerisi 89 paketinde | — | ✅ | ürün | [kart](kararlar/KARAR-090.md) | |
| 92 | "Hazırlıksızdı" cevabı menti'yi kilitlesin mi? | B — 2 ardışık cevapta | — | ✅ | ürün | [kart](kararlar/KARAR-092.md) | |
| 104 | Uyumlu mentörler kapalıysa baraj altındakiler gösterilsin mi? | A | — | ✅ | ürün | [kart](kararlar/KARAR-104.md) | |
| 108 | Eşit puanda hangi DISC tipi öne? | A — her yerde D>I>S>C | — | ✅ | ürün | [kart](kararlar/KARAR-108.md) | |
| 114 | Tarayıcı bildirimi gerçekten gönderilsin mi? | A — bugünkü gibi | — | ✅ | ürün | [kart](kararlar/KARAR-114.md) | |
| 115 | "Kurumunu Kur" sayfası arama motorunda görünsün mü? | A — şimdilik görünmesin | — | ✅ | ürün | [kart](kararlar/KARAR-115.md) | |
| 117 | "Dönemin mentörü" takdiri olsun mu? | A — şimdilik yok | — | ✅ | ürün | [kart](kararlar/KARAR-117.md) | |
| 119 | Gelir kanalı: abonelik, sponsor ya da ertele? | C — ilk kurumdan sonra | — (103 md.3/7'yi etkiler) | ✅ | ürün | [kart](kararlar/KARAR-119.md) | |
| 121 | Kişilik testi cevap biçimi karma olsun mu? | C — Big Five geçişine kadar dokunma | — | ✅ | ürün | [kart](kararlar/KARAR-121.md) | |
| 122 | Derinleşme soruları sınırsız yeniden cevaplansın mı? | B — 30 günde bir | — | ✅ | ürün | [kart](kararlar/KARAR-122.md) | |
| 123 | Kayıtta 3 soruyu atlayana sonradan sorulsun mu? | A | — | ✅ | ürün | [kart](kararlar/KARAR-123.md) | |
| 125 | Kullanıcı kendi kurumunu platforma önerebilsin mi? | A — şimdilik yok | — | ✅ | ürün | [kart](kararlar/KARAR-125.md) | |
| 129 | Askıdaki kurumun yöneticisi ne görsün, kime başvursun? | A — platform iletişim adresi (adres seçimi PO'nun) | — (AJ-72'ye küçük ek iş) | ✅ | kuruma görünen | [kart](kararlar/KARAR-129.md) | |

### a3 · Bilgi / belge yönetimi (11)

| No | Soru | Öneri (kartın) | Açtığı işler | Geri al. | Kart | PO seçimi (→ PO NOTU) |
|---|---|---|---|---|---|---|
| 50 | Kurallara "geçersizleşme koşulu" zorunlu olsun mu? | A şimdi, C sonra | YN-04, YN-05 | ✅ | [kart](kararlar/KARAR-050.md) | |
| 51 | Ölü ama "yaşayan" damgalı belgeler dondurulsun mu? | A | YN-06 | ✅ | [kart](kararlar/KARAR-051.md) | |
| 52 | Rehberde iki kez duran KURAL 8 birleştirilsin mi? | B | YN-02 | ✅ | [kart](kararlar/KARAR-052.md) | |
| 37 | Donmuş belgedeki madde 103 açık mı kapalı mı? | B | md.103 (kuyrukta satırı yok) | ✅ | [kart](kararlar/KARAR-037.md) | |
| 35 | Ajan canlı veritabanında yalnız sayım yapabilsin mi? | A — kişisel veri dönmez | — (111 ve 128'in ön sayımı için gerekli) | ✅ | [kart](kararlar/KARAR-035.md) | |
| 28 | Kullanılmayan LLM ortam değişkenleri silinsin mi? | A — arşivle, sil | — | ✅ | [kart](kararlar/KARAR-028.md) | |
| 49 | Devir belgelerindeki bayat satırlar | B — kalan 2 satırı damgala | — | ✅ | [kart](kararlar/KARAR-049.md) | |
| 68 | Donmuş persona belgeleri nasıl güncellensin? | B tetikleyicili (o zamana kadar C) | — | ✅ | [kart](kararlar/KARAR-068.md) | |
| 100 | Gerekçesiz `SJT_ENRICHED` değeri kalsın mı? | A | — | ✅ | [kart](kararlar/KARAR-100.md) | |
| 124 | Platform panelinde sayı kişi mi, üyelik mi? | C — ikisi yan yana | — | ✅ | [kart](kararlar/KARAR-124.md) | |
| 18 | (karar değil — PO'nun elle işleri listesi) | 03-PO-ELLE-ISLER'e taşınsın | — | — | [kart](kararlar/KARAR-018.md) | |

### a4 · 🔵 EVET/HAYIR kartları (9) — PR durumu 2026-09-28 `gh pr view` ile tazelendi

Hepsi "tarihli yedek + tek seferlik veritabanı erişimi" ister. EVET gelse de veritabanı erişimi yoksa merge edilmez.

| No | Ne değişir | Açtığı iş | PR (backend · çatı) | Durum | Yedek | Kart | EVET/HAYIR |
|---|---|---|---|---|---|---|---|
| 107 | Donmuş "çalışma tarzı" alanının yazılması kapanır (kullanıcı etkisi yok) | AN-12 | #186 · #370 | ✅ MERGEABLE | gerekmez | [kart](kararlar/KARAR-107.md) | |
| 106 | Ürün-içi anket için yeni tablo (mevcut veri etkilenmez) | AN-52 | #185 · — | ✅ MERGEABLE | gerekmez | [kart](kararlar/KARAR-106.md) | |
| 111 | Müsaitliğe görüşme türü + süre (mevcutlar Online · 60 dk olur) | K-15 | #189 · #374 | ✅ MERGEABLE | `AvailabilityBlock` + önce sayım | [kart](kararlar/KARAR-111.md) | |
| 116 | Eski kişilik kartlarındaki ham test puanları temizlenir | AJ-50 | #212 (veri) · — (kod kısmı #194 merge edildi) | ✅ MERGEABLE | `User.discResultCard` (30 gün) | [kart](kararlar/KARAR-116.md) | |
| 99 | İki soru metnindeki yazım hatası canlıda düzelir (2 satır) | AN-02 | #160 · — | ✅ MERGEABLE | `Question` + `SjtQuestion` (etkilenen 2 satır) | [kart](kararlar/KARAR-099.md) | |
| 128 | 13 durum alanı yalnız bilinen değerleri kabul eder | AJ-77 | #227 ✅ · #420 ⚠️ | ⚠️ çatı CONFLICTING — **önce güncelleme gerekir** | 5 tablo + önce sayım = 0 | [kart](kararlar/KARAR-128.md) | |
| 97 | Mentör mesaj talebini reddedebilir (1 yeni alan) | U-18, E-3 (ayak) | #148 · #326 | ⚠️ ikisi CONFLICTING — **önce güncelleme gerekir** | `Conversation` (98 ile tek yedek) | [kart](kararlar/KARAR-097.md) | |
| 98 | Yanıtsız mentöre 3/7/10. gün hatırlatma + yöneticiye bildirim (3 alan) | AN-26 | #157 · #337 | ⚠️ ikisi CONFLICTING — **önce güncelleme gerekir** (+ alt soru: bildirim kime) | `Conversation` | [kart](kararlar/KARAR-098.md) | |
| 96 | Kayıtta 6 ayrı rıza türü (ekran bayrakla kapalı) — ⛔ÇB | AN-30 | #142 ✅ · #320 ⚠️ | ⚠️ çatı CONFLICTING — **önce güncelleme gerekir** | rıza tabloları (türler pratikte kalıcı) | [kart](kararlar/KARAR-096.md) | |

"Önce güncelleme gerekir" = EVET gelirse ajan dalı güncel ana dala taşır, testleri ve bağımsız incelemeyi yeniler, sonra yedek + merge.

---

## (c) BİRLİKTE VERİLMESİ GEREKENLER (16 grup)

| Grup | Kartlar | Neden birlikte | Önerilen sıra |
|---|---|---|---|
| G1 Sertifika içeriği | 3, 4, 46, 113, 55 (+30, 5, 127) | K-16 zinciri 3+4+46 olmadan açılmaz; 46=A konu sayısını 8→9'a çıkarır, 113'ün barajını etkiler | 3 → 4 → 46 → 113 → 55 → 30 → 5 |
| G2 Seed sırası + kurgu adlar | 59, 30, 5 | 59'un cevabı 30'daki isim değişkenine gerek olup olmadığını belirler (öğrenme içeriğinde gömülü adlar var, yer tutucu yok) | 59 → 30 → 5 |
| G3 Değerlendirme kutuları | 89, (77 cevabı), 110≡78, 106, 90, 92, 91, 44+12, 73, 67 | 77=A ile 89=B aynı sonuca farklı yoldan gider; 78 ile 110 aynı sayfa; 110, 106'ya bağlı | 89 → 110 → 106 → 90 → 92 → 91 → 44+12 → 73 → 67 |
| G4 Kişilik ölçümü | 57, 58, 62, 121, 63, 108, 42+122 | 57 olmadan 58/62 tasarlanamaz; 42 ve 122 aynı "profil değişebilir mi" sorusu | 57 → 58 → 62 → 121 → 63 → 108 → 42+122 |
| G5 Eşleştirme formülü | 61+65, 43, 41, 104, 123 | 65 kendi kartında "61 ile birlikte" diyor; 123 yalnız yeni formülde değer taşır | 61+65 → 43 → 41 → 104 → 123 |
| G6 Ad ve vaat dili | 64, 45, 48, 60, 54 | Aynı ekranları değiştirir; 64, KARAR-66'nın uygulanmasını (AN-50) da açar | 64 → 45 → 48 → 60 → 54 |
| G7 Yetki/erişim blokerleri | 101, 82, 83, 85, 84, 102 | Dördü ⛔ÇB; 84 ve 102 e-postanın güvenilirliğine bağlı; 101 açık boşluk | 101 → 82 → 83 → 85 → 84 → 102 |
| G8 Avukat paketi | 47, 38, 3, 4, 31 (yaş), 75, 91, 120, 96 | Kart 47 tek avukat görüşmesi istiyor; 47-B'nin iki maddesi avukatsız düzelir | 47 → diğerleri tek listede |
| G9 KVKK hakları | 74 (=19a), 19 (b,c), 14, 93, 94, 39, 86, 116 | "Kimin verisi, kim siler/indirir" tek politika; kurum silme iki kartta soruluyor | 74 → 19 → 14 → 93 → 94 → 39 → 86 → 116 |
| G10 Bakım düğmeleri | 79, 13, 16 | 79 "13 ile birlikte" diyor; kodda bugün B var | 79 → 13 → 16 |
| G11 Oryantasyon kilidi | 92, 40 | Kilit bugün hiç tetiklenmiyor; 92 cevapsızken kilidi taşımak işe yaramaz | 92 → 40 |
| G12 🔵 paketi | 107, 106, 128, 111, 116, 99, 97+98, 96 | Tek veritabanı oturumu + tarihli yedek | mergeable olanlar → güncellenince 97+98 (tek yedek) → 96 |
| G13 Altyapı/veritabanı | 35, 118, 25, 26≡36(c), 36(a,b) | Önkoşul: hangi veritabanı canlı (03-PO ADIM 0); 26 ile 36(c) aynı iki tablo | ADIM 0 → 35 → 118 → 25 → 26/36(c) → 36(a,b) |
| G14 Belge yönetimi | 50, 52, 51, 49, 37, 68 | Tek "donmuş/yaşayan belge" politikası | 50 → 52 → 51 → 49 → 37 → 68 |
| G15 Büyüme/eski özellikler | 119, 103 (+17, 125, 117, 114, 121), 9, 105, 115, 127, 109 | 17/125/117/114/121, 103'ün alt maddeleriyle aynı; 119, 103 md.3/7'yi belirler | 119 → 103 → 9 → 105 → 115 → 127 → 109 |
| G16 Kriz/etik | 95, 31 (yaş), 71 | Kriz kanalı 95'e geçti; 31'de yalnız yaş kaldı | 95 → 31 → 71 |

---

## ÇAPRAZ BAĞLAR, "⚪ GEREKSİZ OLABİLİR" ADAYLARI, CEVAP ↔ KOD ÇELİŞKİLERİ

### Çapraz bağlar
- **KARAR-101 ↔ AJ-20 / AJ-59:** AJ-20 (onaysız hesap sıralama ucundan 403) ve AJ-59 (OAuth ile gelen kurum yöneticisinin yönlendirmesi) BITTI — açığın iki komşu yolu kapandı; asıl açık (onay bekleyenin OAuth ile oturum alması) duruyor, çözüm biçimi 101'de.
- **KARAR-46 ↔ 113 ↔ madde 164:** kritik konu eşiği `>= 2` kodda (`backend/src/services/certification.service.ts:66-78`); yeni 88 şık bu eşiğe göre yazıldı. 46=A konu sayısını artırır, 113 barajın neye göre hesaplandığını belirler → üçü tutarlı olmalı.
- **KARAR-103 ↔ 119:** gelir kanalı (119) 103'ün md.3 ve md.7'sini belirler; 17, 114, 117, 121, 125 de 103'ün alt maddeleriyle aynı özellik.
- **KARAR-77 ↔ 89:** 77=A ("her taraf kendi kaydı") verildi; 89=B aynı sonuca başka tabloyla, migration'sız ulaşıyor. İkisi birlikte netleşmeli.
- **KARAR-78 ≡ 110** (aynı sayfa) · **KARAR-26 ≡ 36(c)** (aynı iki tablo) · **KARAR-19(a) ≡ 74** · **KARAR-42 ↔ 122** · **KARAR-12 ↔ 44** · **KARAR-61 ↔ 65** · **KARAR-35 → 111 / 128** (ön sayım izni).

### ⚪ Gereksiz olabilir (kapatma PO'nun; kanıt analizden)
| Kart | Neden | Kanıt |
|---|---|---|
| 18 | Karar değil, 03-PO-ELLE-ISLER ile mükerrer | kart biçiminde değil |
| 26 | KARAR-36(c) ile aynı soru | iki kart aynı iki yedek tabloyu soruyor |
| 31 | Kriz ayağı KARAR-95'e geçti; yalnız yaş kaldı (47 avukat paketine girebilir) | I-18'in kapısı 95 |
| 37 | Belgesi (00-KARAR-TAKIP) donduruldu, madde 103'ün kuyrukta satırı yok | kilit haritasında iş yok |
| 49 | B fiilen uygulandı (devir/01 ve devir/06 2026-09-24'te düzeltildi) | commit 0c01c97, 6d64e23 |
| 78 | KARAR-110 ile aynı sayfa (KR-11 ile AJ-14 aynı iş) | — |
Daraltılmalı/kümelenmeli (12): 9, 12, 17, 19, 40, 79, 110, 114, 117, 121, 122, 125.

### Cevaplı kartlarda cevap ↔ kod çelişkisi (CEVAP'lara dokunulmadı; 2026-09-28 main'de yeniden bakıldı)
| Kart · cevap | Durum | Kanıt |
|---|---|---|
| 23 · ret maili YOK | ÇELİŞİYOR — ret için bildirim çağrısı duruyor; tek fren gönderim bayrağı, bayrak açılınca ret maili gider (DK-02) | `platformController.ts:375` · `tenantNotifications.ts:69-78` |
| 66 · "yönlendirme" dili | ÇELİŞİYOR — sonuç ekranı hâlâ "eşleştirileceksin"; AN-50 KARAR-64'e kilitli | `ResultStep.tsx:100` |
| 33 · dondur + sebep + 30 gün | Uygulanmadı — kişiyi platform genelinde kapatan uç duruyor; KARAR-93 bekliyor | `adminController.ts:735-781` |
| 22 · nazik ret | Kısmen — metin doğru ama push ile gidiyor, push sahte (gönderilmeden "gönderildi" döner) | `notificationService.ts:48-55` |
| 27 · Sentry | Uygulanmadı — yorum hâlâ "ayrı PO kararı" diyor (bayat) | `frontend/src/app/error.tsx:11` |
| 77 · her taraf kendi kaydı | Uygulanmadı — `Feedback.meetingId` hâlâ tekil; 89 ile birlikte netleşmeli | `schema.prisma:623` |
Kodla uyumlu: 81, 6, 7, 20, 32, 10 · uygulanmamış ama çelişmeyen: 1, 24.

---

## (d) SAHİPSİZ KALANLAR — S5 "geçersiz" (14) + teyit (7)

Kaynak: `docs/raporlar/kod-denetimi/sahipsiz-kalanlar-2026-09-27.md` §7-§9. "Onayla" = kalem kapanır · "hayır" = açık kalır.

| # | Kalem | Neden geçersiz | Kanıt | Ajan notu | PO |
|---|---|---|---|---|---|
| S1 | Madde 155 ret: sebep gizli + alternatif aynı ekranda | Alternatifi KARAR-22=B kaldırdı | `notificationService.ts:75-84` + test | Push sahte, metin menti'ye ulaşmıyor (103 md.11) | |
| S2 | Y2 ret yumuşatma (3 alternatif) | Aynı (22=B) | aynı | S1'in notu geçerli | |
| S3 | Y2 küçük başarı kutlaması | F-22 + AJ-23 ile kapandı | `ShareButtons.tsx` + test | — | |
| S4 | DISC renk tonu PO onayı bekliyor | Renk teknik karar; kontrast AJ-07 ile düzeldi | `DiscBadge.tsx:11-12,20` | — | |
| S5 | DISC renk tonu (08-acik-sorular) | S4 ile aynı | aynı | S4'ün tekrarı | |
| S6 | M9→155 ret metni | S1 ile aynı | aynı | S1'in tekrarı | |
| S7 | Anomali tespiti v2 + alarm | PO v1'i yeterli saydı | `abuseDetection.service.ts` | — | |
| S8 | Modül sırası vizyonu | PO ertelendi dedi; iş değil strateji | G11-01 PO notu | — | |
| S9 | 2 panel envanteri kodla denetlenmedi | Kalemler g-kart doğrulamasında bakıldı; kalanı 103'te | envanter başlıkları | — | |
| S10 | Modül önceliklendirme onayı | KARAR-69 + tek kuyruk ile yürüyor | arşiv KARAR-69 | — | |
| S11 | Bir başvuru "inceleniyor" ama panelde yok | Tek seferlik operasyonel not; bekleyen listesi kodda | `platformRoutes.ts:49` | — | |
| S12 | DISC renk tonu (06-tasarim-ux) | S4 ile aynı belge satırı, çift sayılmış | `DiscBadge.tsx:20` | S4'ün tekrarı | |
| S13 | Kalite çarpanı çift uygulanıyor | Hata yok, bir kez uygulanıyor | `scoring.ts:109` | — | |
| S14 | Şüphe bildiriminde kurum kimliği yok | Herkese açık oluşturma + yalnız platform okuması tasarım gereği | `suspicionController.ts:21` · `platformController.ts:447,477` | — | |

| # | Teyit kalemi | Ajan önerisi | Kanıt | PO |
|---|---|---|---|---|
| T1 | İçerik/soru felsefesi keşfi | Kapandı sayılabilir (çıktısı KARAR-54…71) | içerik raporları 2026-09-23 | |
| T2 | Menti/mentör "sevdirme" deneyimi | Kapandı sayılabilir (etik ayağı KARAR-71'de) | G4-36 | |
| T3 | Ana sayfa alt sloganı | Açık kalmalı — KARAR-47 ④ ile birlikte | `HeroSection.tsx:34,41` | |
| T4 | `.env.backup-anaDB` dosyasını sil | Yalnız PO teyit eder (dosya PO makinesinde) | ajan diskinde yok | |
| T5 | Mentör karar ekranında mentinin ilk mesajı | Kapandı sayılabilir — zaten görünüyor | `mentor/page.tsx:298-300` | |
| T6 | Öğrenme ↔ sertifika içerik örtüşmesi | Açık kalmalı — 46 ve 5 cevaplanınca bakılır | tasarım belgesi :402-412 | |
| T7 | Eski kayıtlarda sektör boşluğu | Kod kapandı; sayım canlı veritabanı ister (KARAR-35) | `ProfileStep.tsx:90` | |

---

## (f) KODLA ÇELİŞEN KART İDDİALARI — "kartta düzeltilecek" (ana ajanın işi; cevap değil)

| Kart | Kartın iddiası | Bugünkü gerçek |
|---|---|---|
| 38 | Sunucu "İrlanda (AB)" yazıyor | `kvkk/page.tsx:96` artık "Londra (Birleşik Krallık)"; kalan soru GDPR ifadesi + aktarım |
| 40 | Eski randevu ucunda sahiplik kontrolü yok | Var (GV-06), `meetingController.ts:199-203`; kalan: kilit yalnız eski uçta |
| 42 | 3 düğme test vaat ediyor, çıkışsız döngü | Döngü kapandı (PS-10); vaat eden 2 düğme kaldı (`mentor/page.tsx:178`, `profile/page.tsx:233`) |
| 49 | Devir belgelerinde bayat "merge etme" satırları | 2026-09-24'te düzeltildi (0c01c97, 6d64e23) |
| 67 | Değerlendirmede sahiplik kontrolsüz okuma | GV-04 ile kapandı; soru (yönetici notu görür mü) geçerli |
| 79 | Tetikleme yetkisi hatalı | AJ-17 ile B zaten kodda (`adminController.ts:599-620`) |
| 96 · 97 · 98 | "PR'lar ana dalla temiz birleşiyor" | Bugün çatı (ve 97/98'de backend) PR'ları CONFLICTING |
| 101 | Y1-B8 işi açar | Açık doğrulandı ama PR'lar çakışmalı ve kuyrukta Y1-B8 satırı yok |
| (+) 128 | — | Çatı #420 bu turda CONFLICTING oldu (analizde mergeable) |
| (+) indeks | KARAR-95 satırının durum sütunu "öneri A" diyor | Kartın önerisi **C** (`KARAR-095.md`) — indeks düzeltilmeli |

Kısmen bayat (satır kayması vb.): 5, 9, 25, 28, 39, 51, 57, 99. Canlı veritabanı/ekran ister ("teyit"): 3, 26, 35, 54, 60, 72.
Kuyrukla uyuşmazlık: 35 "5+ iş" diyor, kilitli iş 0 · 91 ve 92 "1 iş" diyor, kuyrukta satır yok · 72'ye bağlı KR-20 aslında karardan bağımsız bir hata.

---

**Kaynaklar:** analiz 2026-09-28 (taban çatı `03da006` · backend `07d71a2`; ajan çalışma dosyaları — repoda yok, bulgular bu pakette) · güncel sayılar çatı `origin/main 6e24fde` · backend `f5ba23b`: `docs/otonom/01-KARARLAR.md` indeksi (108 açık), `00-KUYRUK.md` § 🔴 KİLİT HARİTASI, `00-KUYRUK-KARAR-BEKLEYEN.md` · PR durumları `gh pr view --json mergeable` (2026-09-28).
