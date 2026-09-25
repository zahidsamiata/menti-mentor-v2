> 🌡️ ILIK — gerektiğinde okunur (rutin turda değil). Okuma kuralı: OTONOM-PROMPT.txt § 0.4
> TÜR: 🌡️ · SON DOĞRULAMA: ❓ içerik denetlenmedi (başlık 2026-09-23 DA turunda eklendi) · TAZELEME TETİKLEYİCİSİ: ilgili kod ya da karar değişince

# STK Admin Paneli — Tasarım Kararları (2026-08-11)
**🔄 YAŞAYAN** (kararlar eklenebilir) · ilişkili keşif: `stk-admin-bulgu-envanteri-2026-08-11.md`
> ⚠️ ÇELİŞKİ (2026-09-23, CS raporu / Ç-07): dosya ADI tarihli (`-2026-08-11` = 📸/dondurulmuş işareti, KURAL 4) ↔ bu ETİKET **🔄 YAŞAYAN**. İki işaret birbirini yalanlıyor. Düzeltme (ad tarihsizleştir VEYA etiket değiştir) = AN-44 kuyruk işi; karar PO'nun.

> **Amaç:** STK admin panelinin tasarım/ürün kararlarını kalıcı olarak arşivlemek. Bu kararlar **bu oturumda
> ürün sahibi tarafından verildi** ve şimdiye dek yalnızca sohbette duruyordu (projenin kronik sorunu: değerli
> karar konuşulur, yazılmaz, unutulur). Bu belge inşa turlarında **kaynak** olsun ve kaybolmasın diye yazıldı.
>
> **Bu tur kod YAZILMADI** — salt karar arşivi. Kararlar iki sınıfta:
> - ✅ **KESİNLEŞTİ** — inşa turlarında olduğu gibi uygulanacak.
> - 🔍 **KEŞİF / KARAR BEKLİYOR** — kod başlamadan önce netleşmesi gereken (vizyon/araştırma) maddeler.
>
> **İlgili belgeler:** bulgu kaynağı `stk-admin-bulgu-envanteri-2026-08-11.md`; iş kuyruğu `10-yol-haritasi.md`
> (bu kararlar ileride ayrı bir turda oraya iş kalemi olarak bağlanabilir — o ürün sahibi kararı, bu turda değil).
> Kişi adı yok.

---

## ✅ KESİNLEŞMİŞ TASARIM KARARLARI (inşa turlarında uygulanacak)

### KARAR 1 — Sol menü gruplaması (bulgu B2)
Mevcut "3 öğe + 'Gelişmiş' başlığı altında 11 öğe" yapısı değişecek. Yeni yapı **4 grup**, sıklığa göre sıralı:

| Grup | Öğeler |
|---|---|
| **Günlük İşler** | Onay · Davet · Bekleme Odası · Eşleşmeler |
| **İnsanlar** | Mentör Havuzu · Menti Havuzu · Yöneticiler |
| **Program & İçerik** | Program · Soru Yönetimi · Sertifika Konuları · Sertifika Sonuç · Öğrenme Yolculuğu |
| **Ayarlar & Kurulum** | Marka · Algoritma · Etiket Yönetimi |

> Not: grup isimleri ve dağılımı ürün sahibi ince ayar yapabilir.

### KARAR 2 — Havuz layout: kart görünümü (bulgu B5)
Yatay tablo → **KART görünümü**. Kart içeriği **bakan kişinin ROLÜNE göre** değişir:

| Bakan rol | Kartta ne görünür |
|---|---|
| **Yönetici** | Kişinin DISC **tipi** + **durum rozeti** (Onaylı/Bekliyor/Pasif) |
| **Mentör → mentiye bakarken** | Mentinin DISC **tipi** + **uyum skoru** |
| **Menti → mentöre bakarken** | **SADECE uyum skoru** — mentörün DISC tipini **GÖRMEZ** |

- **Ortak öğeler (her rol):** fotoğraf · isim · aksiyon butonu · sertifika rozeti.
- **İş boyutu:** M/L — ayrı inşa turu + keşif gerekli.
- **⚠️ Bağ:** Bulgu **B4** (DISC ikincil/karma gösterim — önceki turda ertelendi, PII/uyum kararı gerekli) **aynı bölgeye** dokunuyor → **birlikte planlanmalı.**

### KARAR 3 — Durum rozeti (Onaylı/Bekliyor/Pasif)
- Yalnızca **YÖNETİCİ** görür. Menti ve mentör **görmez** (iç yönetim bilgisi).
- **Otomatik** belirlenir — yönetici elle atamaz.

### KARAR 4 — Sertifika rozeti
- **HERKES** görür (mentörlerde). Tek durum: **"Sertifikalı ✓"** nişanı.
- Sertifikasız mentörde **rozet yok** (negatif etiketleme yapılmaz).
- Kalite/güven göstergesi; **mahrem veri değil.**

### KARAR 5 — DISC görünürlük kuralı (mahremiyet — KRİTİK)
- **Ham DISC vektörü (yüzde dağılımı) HİÇBİR rolde gösterilmez** — yalnızca tip/arketip.
- Görünürlük **ASİMETRİK ve kasıtlı:**
  - Yönetici → herkesin DISC **tipini** görür.
  - Mentör → mentinin DISC **tipini** görür.
  - Menti → mentörün DISC tipini **GÖRMEZ** (sadece uyum skoru).
- **DevSecOps notu (inşa aşamasında):** Backend, mentiye mentörün DISC bilgisini **yanlışlıkla sızdırmamalı**.
  Bu asimetri **kod düzeyinde titizlikle** uygulanmalı (response DTO'ları role göre ayrışmalı; frontend gizleme
  tek başına yeterli değil). İlgili: backend `CLAUDE.md` PII sınıflandırması (`discType`/`discVector` PII).

### KARAR 7 — "Neden uyumlu" açıklaması · Katman 1 (ŞİMDİ yapılacak)
- Menti ve mentör, uyum skorunun (%) yanında, o skorun **NEDEN yüksek olduğunu** anlatan **zengin ama ham-DISC
  ifşa ETMEYEN** bir açıklama görür (ör. "çalışma tarzınız uyumlu").
- Kör bir sayı yerine **anlamlı, güven veren metin.**
- Havuz kartı işinin (KARAR 2) **parçası.**

### KARAR 11 — DISC gösterim biçimi (baskın + ikincil HARF)
- **ŞİMDİ (uygulanacak):** Havuz kartında/listesinde tek harf yerine **baskın + ikincil tip HARF olarak** gösterilir
  (ör. **"DI"**). **Yüzde dağılımı GÖSTERİLMEZ.** "Tek harf çok keskin, ikili karakter görünsün" ihtiyacını çözer.
- **KARAR 5 ile TAM UYUMLU:** yüzde = ham DISC vektörü → hiçbir rolde gösterilmez; yalnız türetilmiş **harf** görünür.
- **⚠️ Bağ — bulgu B4'ün güvenli çözümü:** B4 (DISC ikincil gösterim) önceki turda "backend'e yeni PII alanı eklemek
  gerekiyor" diye ertelenmişti. İkincil **HARF** (yüzde değil) türetilmiş/az-riskli bir değer olduğundan bu yolla
  **güvenle yapılabilir.** **DevSecOps:** yine de backend ham vektör **sızdırmadan** uygulanmalı — türetilmiş ikincil
  harf ≠ ham yüzde vektörü. (İlgili: `stk-admin-bulgu-envanteri-2026-08-11.md` B4.)
- **🔍 İLERİDE (şimdi YAPILMAYACAK — gelecek entegrasyon adayı, kaybolmasın):** Yüzde dağılımı (ör. "%60 D, %30 I")
  **SADECE yöneticiye** gösterilebilir. KVKK gerekçesi + rıza + ek iş gerektirdiği için ertelendi.
  **Karar:** şimdilik yalnız **harf (seçenek A)**; **yüzde-yöneticiye (seçenek B)** ileri faz.

### KARAR 12 — Sektör/etiket havuzu (kesinleşmiş ilke + 🔍 keşif gerektiren uygulama)
- **İLKE (✅ kesinleşti):** Sisteme, hedef kitleye (menti-mentör, STK dünyası) uygun **HAZIR bir başlangıç
  etiket/sektör havuzu** tanımlanır. Kullanıcı profilini doldururken bu havuzdan **SEÇER.** Havuz **kapalı değildir**
  — kullanıcı listede olmayan etiket **ÖNEREBİLİR.** Öneriler **dernek yöneticisi onayından** geçer (mevcut Etiket
  Yönetimi kuyruğu: Bekleyen/Onaylanan/Reddedilen bunu zaten yapıyor).
- **KRİTİK GEREKÇE:** Etiketler yalnızca görsel değil — **EŞLEŞTİRME MOTORUNUN GİRDİSİ.** Uyum skoru etiket
  örtüşmesine bağlı hesaplanır. Bu yüzden **kontrollü/standart havuz ŞART:** serbest metin olursa ("yazılım" vs
  "software" vs "yazılım geliştirme") sistem bunları farklı sanar, **eşleşme bozulur.** Yönetici onayı bu tutarlılığı korur.
- **🔍 KEŞİF GEREK (kod başlamadan):** Başlangıç havuzu **nerede/nasıl** tanımlanacak — seed mi, admin-yönetilir tablo mu?
  Bu, keşifteki bulgu **B12** ("hazır sistem etiketleri şemada/seed'de BULUNAMADI — grep boş") eksiğini kapatır.
  **Çapraz-ref:** B12 (`stk-admin-bulgu-envanteri-2026-08-11.md`) + eşleştirme skorlama (uyum = etiket örtüşme).
  Şema/seed'e dokunacağı için **PO onayı + ayrı tur** gerekir.

---

## 🔍 KEŞİF / KARAR BEKLEYEN (kod başlamadan önce netleşmeli)

### KARAR 6 — Otomatik onay
- Yönetici, bir kişiyi **önden bilgisiyle davet ederse** → o kişi **otomatik ONAYLI** gelir, onay kuyruğuna takılmaz.
- **Dışarıdan kendi başvuran** → **"Bekliyor"** (yönetici onayına düşer).
- **TEYİT GEREK:** Bu davranış kodda halihazırda var mı (`InvitationTemplate` / davet akışı) **keşfedilmeli.**
- **Akraba:** Yol haritasındaki **F6** (hayalet mod + toplu CSV davet) ile ilişkili → **birlikte değerlendirilmeli.**

### KARAR 8 — "Neden uyumlu" · Katman 2 (SONRA)
- Katman 1 (KARAR 7) çalıştıktan, ürün olgunlaştıktan sonra açıklamanın **daha da zenginleştirilmesi/kişiselleştirilmesi.**

### KARAR 9 — Mentör yaklaşım kılavuzu · Katman 3 (VİZYON — büyük, hassas)
- Mentöre, eşleşmeden önce menti hakkında **derin analiz:** nasıl yaklaşılmalı, nasıl iletişim kurulmalı,
  nelerden kaçınılmalı, gelişim alanları.
- **KOD ÖNCESİ ZORUNLU KARARLAR:**
  - (a) Menti bu paylaşıma **açık RIZA** vermeli (KVKK — hassas veriden profil çıkarıp üçüncü kişiye verme).
  - (b) **Mahremiyet çerçevesi** netleşmeli (hangi bilgi paylaşılır/saklanır).
  - (c) Dil **"zayıflık" değil "gelişim alanı"** olmalı.
- Bu bir **ürün + hukuk + etik** kararı; inşa edilmeden önce ürün sahibi netleştirecek.
- **Aşırı mühendislik riski:** canlı-öncesi üründe erken; **vizyon kutusunda** tutulur.

### KARAR 10 — Sektör kolonu (bulgu B3)
- **Canlı-SONRASINA ertelendi.**
- Sorun tablo/gösterim değil, **VERİ GİRİŞİ boşluğu** (kullanıcılar sektör etiketlerini doldurmamış). **Blocker değil.**
- Not: profil/onboarding formunda sektör alanını **belirginleştirmek** ileride ele alınmalı.

---

## Özet
- **Kesinleşmiş (uygulanacak):** 8 karar — KARAR 1, 2, 3, 4, 5, 7, **11**, **12** (ilke).
  - KARAR 11 & 12'nin ayrıca **🔍 ileri-faz / keşif alt-notları** var (yüzde-yöneticiye; havuzun nerede tanımlanacağı).
- **Keşif/karar bekleyen (vizyon/araştırma):** 4 karar — KARAR 6, 8, 9, 10.
- **Çapraz bağlar:**
  - KARAR 2 ↔ bulgu B4 (birlikte planla); **KARAR 11 = B4'ün güvenli çözümü** (ikincil harf, yüzde değil).
  - KARAR 6 ↔ yol haritası F6 (birlikte değerlendir).
  - **KARAR 12 ↔ bulgu B12** (hazır etiket havuzu eksiği) + **eşleştirme skorlama** (uyum = etiket örtüşme).
  - KARAR 5, 9, 11, 12 ↔ **KVKK/PII** (backend `CLAUDE.md`) — DISC/veri sızıntı frenleri.

---

## Statü (2026-09-25, AN-35)
> Yukarıdaki gövde DEĞİŞTİRİLMEDİ; bu bölüm yalnız kod gerçeğiyle statü ekler. Kuyruk kaynağı: `docs/otonom/00-KUYRUK.md` (AN-35).
> Kod kanıtı: çatı `origin/main` @ `802f5cd`; backend satırları submodule pointer'ı `a958faf` üzerinden.
> Kapsam: 12 kararın hepsi (8 kesinleşmiş + 4 keşif). Lejant: ✅ uygulanmış · 🟡 kısmen · ⬜ uygulanmamış.
> ⚠️ Önerilen satırlar kuyruğa EKLENMEDİ — kuyruğa alma PO/kuyruk sahibinin işi.

| Karar | Kısa ad | Statü | Kanıt (kod) | Kuyruk karşılığı / önerilen satır |
|---|---|---|---|---|
| 1 | Sol menü 4 grup | ✅ | `frontend/src/app/(admin)/layout.tsx:30-62` — Günlük İşler · İnsanlar · Program & İçerik · Ayarlar & Kurulum; öğeler karardakiyle aynı (+ "Şikayetler" Günlük İşler'e eklenmiş, `:36`) | — (kapalı) |
| 2 | Havuz kart görünümü (role göre içerik) | 🟡 | **Menti→mentör:** kart VAR, yalnız uyum % + gerekçe (`frontend/src/app/(dashboard)/menti/page.tsx:304-335`). **Yönetici havuzları:** hâlâ TABLO (`(admin)/admin/mentor-havuzu/page.tsx:82-95`, `menti-havuzu/page.tsx:82`). **Mentör→menti:** aday listesi var ama mentinin DISC **tipi** gösterilmiyor (`(dashboard)/mentor/page.tsx:477-496`; backend DTO'da DISC tipi yok, `backend/src/controllers/matchingController.ts:10-16`) | Kısmi bağ: `P-04` (mentörün uyum yüzdesi, 🔴 KARAR-80/M5). **Önerilen Ö1 + Ö2** (aşağıda) |
| 3 | Durum rozeti (Onaylı/Bekliyor/Pasif, yalnız yönetici, otomatik) | 🟡 | Rozet yalnız yönetici havuzunda, `approvalStatus`'tan otomatik türetiliyor (`mentor-havuzu/page.tsx:24-28, 136-163`); menti/mentör ekranlarında yok. **Eksik:** "Pasif" durumu gösterilmiyor — backend `isActive` alanını zaten döndürüyor (`backend/src/controllers/adminController.ts:263`) ama rozet okumuyor; kararda olmayan "Reddedildi" var | **Önerilen Ö3** |
| 4 | Sertifika rozeti (herkes görür, yalnız pozitif) | 🟡 | Yönetici havuzunda VAR, sertifikasızda etiket yok (`mentor-havuzu/page.tsx:165-171`); mentör kendi panelinde görüyor (`(dashboard)/mentor/page.tsx:183-191`). **Eksik:** mentinin gördüğü mentör kartında rozet YOK — menti DTO'sunda `isCertified` alanı yok (`matchingController.ts:98-111`) | **Önerilen Ö4** |
| 5 | DISC görünürlük asimetrisi + ham vektör yok | ✅ | Menti DTO'su role göre ayrı, DISC tipi/skoru dönmüyor (`matchingController.ts:94-111, 136-137`); yönetici yalnız türetilmiş harf görür, ham vektör yanıta konmaz (`adminController.ts:292-296`). Not: kişinin KENDİ sonucu kendisine yüzdeyle gösteriliyor (`app/onboarding/_steps/ResultStep.tsx:70`) — karar başkasını görmekle ilgili, çelişki sayılmadı | — (kapalı) |
| 6 | Davetli otomatik onaylı, başvuran bekler | ✅ | `backend/src/controllers/authController.ts:160-172` (geçerli davet token'ı → APPROVED, yoksa PENDING) · OAuth aynı kural `backend/src/services/oauth/oauthService.ts:111` | — (kapalı; kuyruk not satırı `00-KUYRUK.md:280` "davetli=onaylı tetiği" ile teyit). F6 (hayalet mod + CSV) ayrı konu, bu statüye dahil değil |
| 7 | "Neden uyumlu" Katman 1 | ✅ | Backend gerekçe üretir, DISC harfi sızdırmaz (`matchingController.ts:10-16, 98-110`); menti kartında "Neden uyumlu:" (`menti/page.tsx:332-335`), mentör aday listesinde (`mentor/page.tsx:487-489`). Sınır: gerekçe 3 kalıp cümleden oluşuyor ("Ortak sektör ve ilgi alanları" / "İletişim tarzları uyumlu" / "Genel profil uyumu") — zenginleştirme KARAR 8'in konusu | — (kapalı) |
| 8 | "Neden uyumlu" Katman 2 (SONRA) | ⬜ | Kodda yok (bilinçli: "Katman 1 olgunlaşınca") | Satır önerilmez — vizyon; KARAR 7 canlıda geri bildirim toplayınca yeniden değerlendirilir |
| 9 | Mentör yaklaşım kılavuzu Katman 3 (VİZYON) | ⬜ | Kodda yok (bilinçli: rıza + mahremiyet + dil kararı önkoşul) | Satır önerilmez — ürün+hukuk+etik kararı PO'da; kod öncesi karar kartı gerekir |
| 10 | Sektör kolonu (canlı-sonrasına ertelenmişti) | ✅ | Sektör kolonu yönetici mentör havuzunda VAR (`mentor-havuzu/page.tsx:90, 122-134`); onboarding'de sektör seçimi ZORUNLU (`app/onboarding/_steps/ProfileStep.tsx:89, 113-116`) → "veri girişi boşluğu" notu da karşılanmış | — (kapalı) |
| 11 | DISC baskın+ikincil HARF (yüzde yok) | ✅ | Türetim `backend/src/services/discLetters.ts` → `adminController.ts:296`, `authController.ts:283`; gösterim `components/atoms/DiscBadge.tsx` (`mentor-havuzu/page.tsx:119-121`, `menti-havuzu/page.tsx:119`, menti paneli `menti/page.tsx:261`). Alt not "yüzde yalnız yöneticiye" (seçenek B) ⬜ — karar gereği bilinçli ileri faz | — (kapalı). Seçenek B için satır önerilmez (KVKK + rıza kararı önkoşul) |
| 12 | Hazır sektör/etiket havuzu + öneri→yönetici onayı | 🟡 | **Var:** öneri → yönetici onay kuyruğu (`frontend/src/components/molecules/SectorTagSuggest.tsx:10-17`, profil `(dashboard)/profile/page.tsx:354`; yönetici uçları `backend/src/routes/adminRoutes.ts:63-66`); onboarding'de sabit 13'lük sektör listesinden seçim (`ProfileStep.tsx:12-16`). **Eksik:** (a) tek, yönetilebilir başlangıç havuzu yok — liste frontend'e gömülü, tehlikeli `prisma/seed.ts:199-210`'daki `SECTOR_POOL` ile FARKLI; (b) profil ekranında havuzdan etiket SEÇME yok (yalnız öneri); (c) onaylanan öneri ortak havuza değil yalnız önerenin profiline ekleniyor (`SectorTagSuggest.tsx:15`) | Kuyruk not satırı `00-KUYRUK.md:279` G3-19'u ✅ sayıyor — kod gerçeğine göre yalnız öneri/onay ayağı kapalı. **Önerilen Ö5** |

**Sayım:** ✅ 6 (1, 5, 6, 7, 10, 11) · 🟡 4 (2, 3, 4, 12) · ⬜ 2 (8, 9 — ikisi de bilinçli ertelenmiş vizyon). Kuyruğa bağlı açık karar: yalnız KARAR 2 (kısmen, `P-04` üzerinden).

### Önerilen kuyruk satırları (EKLENMEDİ — kuyruk sahibi karar verir)
| Öneri | İş | Kapı önerisi | Bitti ölçütü (kullanıcı ne görür) | Not |
|---|---|---|---|---|
| Ö1 | **Yönetici mentör/menti havuzunu tablodan KART görünümüne çevir** (KARAR 2): fotoğraf · isim · DISC harfi · durum rozeti · sertifika rozeti · aksiyon | 🟢 (yalnız frontend, 2 sayfa) | Yönetici havuz sayfalarında kişileri kart olarak görüyor | Kalite puanı, öğrenme yolculuğu, onay izi gibi tablo sütunları kartta nereye gider — teknik/düzen kararı, sorulmaz |
| Ö2 | **Mentör aday listesinde mentinin DISC harfini göster** (KARAR 2 + 5: mentör→menti tipi görür) — menti DTO'su değil, mentör DTO'su (`buildPublicItem`) türetilmiş harf alır, ham vektör yok | 🟡 (eşleştirme dosyasına dokunur) | Mentör aday kartında menti için "DI" gibi harf görüyor | `P-04` (uyum yüzdesi) ile aynı ekran → birlikte yapılabilir |
| Ö3 | **Durum rozetine "Pasif" ekle** (KARAR 3) — `isActive=false` olan kişi "Pasif" rozetiyle görünür | 🟢 (yalnız frontend; alan backend'de zaten var) | Yönetici havuzda pasifleştirilmiş kişiyi "Pasif" rozetiyle ayırt ediyor | "Reddedildi" rozeti karardaki üçlüde yok — kalsın mı, KARAR 3'ün ince ayarı (düşük önem) |
| Ö4 | **Menti'nin gördüğü mentör kartına "Sertifikalı ✓" rozeti** (KARAR 4) — menti DTO'suna `isCertified` eklenir | 🟡 (eşleştirme denetleyicisine dokunur) | Menti, sertifikalı mentörün kartında rozeti görüyor; sertifikasızda hiçbir şey yok | Sertifika mahrem veri değil (KARAR 4) → KVKK kararı gerekmez |
| Ö5 | **Başlangıç sektör/etiket havuzunun tek kaynağı + profilde havuzdan seçim** (KARAR 12 + B12) | 🔴 (karar kartı gerekir: havuz kodda sabit liste mi, yönetici-yönetilir tablo mu → ikincisi şema değişikliği) | Kullanıcı profilinde sektörünü hazır listeden seçiyor; onaylanan öneri herkesin listesine giriyor | Onboarding listesi ile `seed.ts` havuzu uyumsuz; eşleştirme etiket örtüşmesine dayandığı için tek kaynak şart (KARAR 12 gerekçesi) |
