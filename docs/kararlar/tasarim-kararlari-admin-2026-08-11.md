# STK Admin Paneli — Tasarım Kararları (2026-08-11)

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
