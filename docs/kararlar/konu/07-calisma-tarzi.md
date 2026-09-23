> 🌡️ ILIK — gerektiğinde okunur (rutin turda değil). Okuma kuralı: OTONOM-PROMPT.txt · Okuma
> TÜR: 🌡️ · SON DOĞRULAMA: ❓ içerik denetlenmedi (başlık 2026-09-23 DA turunda eklendi) · TAZELEME TETİKLEYİCİSİ: ilgili kod ya da karar değişince

# 07 — ÇALIŞMA TARZI VE PROMPT FELSEFESİ
**🔄 YAŞAYAN** (canonical: çalışma tarzı ve prompt felsefesi)
~~[ESKİ · 2026-09-21] **Son güncelleme:** 2026-08-02 · Kaynak: tüm chat'ler (ortak), bugünkü oturum~~
⚠️ **GÜNCELLEME (2026-09-21):** **Son güncelleme: 2026-09-21** — eklenen bölümler: *"Konsey denetimleri"* · *"Karar oturumu biçimi — PO tercihi"*.

> Bu, her Claude Code promptunun ve her çalışma turunun uyması gereken çerçeve.
> Kullanıcı (ürün sahibi) teknik detaya çok hakim değil — kararları sade dille açıkla, öner, gerekçelendir.

## PROMPT STANDARDI (8 UNSUR — her kapsamlı prompt)
1. **BÜYÜK RESİM** — nereye gidiyoruz, bu adım ne tamamlıyor, sonrası ne. Parçayı değil bütünü göster.
2. ~~[ESKİ · 2026-09-10 öncesi] **MOD (en başta)** — PLAN (salt-okuma) / BYPASS (kod yaz, PR aç, MERGE ETME) / MANUEL ONAY (geri-alınamaz işler).~~
   ⚠️ **GÜNCELLEME (2026-09-21):** MOD bildirimi aynen geçerli; BYPASS'ın tanımı değişti — **kod yaz, PR aç, kapısı 🟢 ve doğrulama listesi tamsa MERGE ET** (🟡/🔴 PR'da bekler). — kanıt: `CLAUDE.md:25-45`.
3. **DEVSECOPS** — kod anında, katmanlı (aşağıda şablon). Sonradan yamanmaz. Tenant izolasyonu KRİTİK.
4. **PARALELLİK** — bağımsız/farklı dosya → paralel alt-ajan (tek oturum, ayrı terminal AÇMA). Ortak dosya/bağımlı/merge/migration → sıralı. Şüphede sıralı.
5. **DURAK NOKTALARI** — geri-alınamaz işlerde (merge/deploy/silme/DB-yazımı) DUR, onay bekle.
6. **TEYİT NOKTALARI** — "sanırım/muhtemelen" YASAK, dosya/kod/log/sorgu kanıtı. SHA git'ten doğrula (tahmin etme).
7. **HATA SENARYOLARI** — olası hatalar + ne araştıracağı + nasıl çözeceği. Tahmin değil, kök neden.
8. **KAPANIŞ + YOL HARİTASI** — ne oldu, sıradaki adım, güncel durum.

## GENEL İLKELER
- ~~[ESKİ · 2026-09-10 öncesi] **"PR aç, MERGE ETME"** güvenlik ağı — ürün sahibi en sonda inceler.~~
  ⚠️ **GÜNCELLEME (2026-09-21): doğrusu —** kapıya göre: **🟢 → doğrulama listesi tamsa MERGE ET** · **🟡 → PR aç, merge etme** · **🔴 → KARAR cevapsızsa dokunma.** Bulut oturumu hiçbir kapıda merge edemez. — kanıt: `CLAUDE.md:25-45` · `docs/otonom/00-KUYRUK.md:6-16`.
- **Ürün kararı ürün sahibinde.** Claude analiz+seçenek sunar, dürüst pushback yapar, körü körüne onaylamaz.
- **Aşırı mühendislik/erken optimizasyon YOK.** Gerçek ihtiyaç olmadan özellik yok. Sinyal gelince yap.
- **Kapsamlı/uçtan uca tek prompt** — parça parça "şunu yap dur" değil.
- **DB/prod refleksleri (bu oturumda eklendi):** "Bu kalıcı içerik mi geçici test mi?" + "Bu lokal DB canlıyı etkiler mi?" + "Script'in içinde delete/truncate/mail yan etkisi var mı?" + canlı DB çıkarsa DUR-onay bekle.

## DEVSECOPS KATMAN ŞABLONU (işin yüzeyine göre ölçekle)
- **K0 Tehdit yüzeyi:** ne açılıyor, kim erişebilir, hangi veri.
- **K1 Kimlik:** auth doğrulanmış mı, token/aud geçerli mi.
- **K2 Yetki:** rol bazlı, en az yetki.
- **K3 Tenant izolasyonu (KRİTİK):** her sorgu tenant filtreli, başka kurum verisi ASLA.
- **K4 IDOR:** id ile erişimde kaynak kullanıcının mı.
- **K5 Girdi/dayanıklılık:** Zod validation, injection/XSS, boş/undefined'a savunma.
- **K6 Rate-limit:** login/davet/rapor gibi hassas uçlarda.
- **K7 KVKK maskeleme:** email f***@, DISC HAM profil ASLA (sadece tip).
- **K8 Secret hijyeni:** log/response/commit'e sızmasın, fail-safe.
- **K9 Audit log:** hassas veri erişimi/değişimi loglansın.
- **K10 Hata sızıntısı:** stack/DB/dosya yolu kullanıcıya gösterme.
- Geçerli olmayan katmanı "bu iş için yüzey yok" diye BİLİNÇLİ ele, atlama.

## MODEL / ARAÇ
- ~~[ESKİ · düzeltildi 2026-08-28] Claude Code'da standart model (Sonnet 4.6 Default) yeterli; ücretli 1M context modu gerekmez.~~
  ⚠️ GÜNCELLEME (2026-08-28, G9-15): Model/context seçimi belgede sabitlenmez — her turun promptunda belirtilir. (Bu, CLAUDE.md ↔ 07 "model tercihi" yumuşak çelişkisini de kapatır: BÇ5/E12.)
- Doküman terminale prompt içine yapıştırılmaz — `.md` dosyası olarak projeye konup referansla verilir (token tasarrufu + kodla birlikte inceleme).
- Context dolunca (`100% context used`) → `/clear` ile temiz oturum + docs/ belgelerini okut.

## HAFIZA SİSTEMİ (bu oturumda kuruldu)
- **CLAUDE.md** = değişmeyen çekirdek kurallar (KISA, şişirilmez). Claude Code her açılışta otomatik okur.
- **docs/*.md** = durum + geçmiş + kararlar (bu belgeler). Gerektiğinde okunur.
- **MASTER devir belgesi** = yeni Claude CHAT'i için. Ürün sahibi yeni chat açınca yükler.
- Her önemli oturum sonunda docs güncellenir.

## DOKÜMAN TONU (dış paydaş — hoca/abi/ortak)
- Saygılı, danışan konumunda 'siz' dili. Karar dayatan değil, görüş isteyen ton.
- Kısa tut (9 sayfa yerine ~3 sayfa) — kişi uzun okumayabilir.

## KANITLANMIŞ DERSLER
- **SHA tahmin etme:** Asistan yanlış SHA verdi, Claude Code git'ten doğrulayıp yakaladı, prod çökmesini önledi. → "tahmin etme, doğrula."
- **Önce teşhis, kod değilse uğraşma:** Platform panel bug'ı kod değil JWT_SECRET değişimiydi; re-login çözdü. Kullanıcının "önce teşhis" yaklaşımı doğru çıktı.
- **Teşhis hipotezini doğrula:** B10 yavaşlık teşhisi ("stable ref") kod okununca çürüdü; kör düzeltme yapılmadı.

---

## Konsey denetimleri (2026-09-21)

> ⚠️ Bu bölüm **yeni bir KURAL değildir** — çalışma tarzı kaydıdır. `CLAUDE.md`'ye **EKLENMEDİ**
> (dosya 34.742 karakter, 35.000 hedefinin hemen altında; büyütmemek bilinçli).

**Konsey nedir:** Ürünün bir yüzünü tek bir soruyla denetleyen **salt-okuma bulut turu**. Her konseyin
**tek bir sorusu** vardır ve rapor o soruya cevap verir.

### Yedi konsey ve sorusu

| Konsey | Sorusu |
|---|---|
| 🚀 **Canlıya Çıkış** | Bugün gerçek bir kurum alabilir miyiz? |
| 🔐 **Güvenlik ve KVKK** | Kullanıcı erişmemesi gereken veriye ulaşabilir mi? |
| ⚙️ **Operasyon** | Bir şey bozulunca haberimiz olur mu, veri geri döner mi? |
| 🧠 **Psikometri ve Eşleştirme** | Eşleştirme gerçekten İYİ mi? |
| 📚 **İçerik** | Yazılan içerik kullanıcıya ulaşıyor mu, doğru mu? |
| 👥 **Kullanıcı Deneyimi** | Menti, mentör, yönetici takılmadan ilerleyebiliyor mu? |
| 🗂️ **Yönetişim** | Kararlarımız, kurallarımız, belgelerimiz hâlâ doğru mu? |

### Sıklık

| Konsey | Ne zaman |
|---|---|
| 🚀 Canlıya Çıkış | **Her turda** — kuyruktaki `⛔ ÇIKIŞ BLOKERİ` filtresi olarak |
| 🔐 Güvenlik · ⚙️ Operasyon · 🗂️ Yönetişim | **Haftada bir** |
| 👥 UX · 📚 İçerik | **Büyük değişiklikten sonra** |
| 🧠 Psikometri | **Eşleştirme her değiştiğinde** |

### ⭐ KURAL — Konsey BELGE ÜRETMEZ, KUYRUĞU BESLER

- Konsey **salt-okuma bulut turu** olarak çalışır.
- Raporu **📸 DONDURULMUŞ**'tur — bulguları işlendikten sonra güncellenmez.
- **Tek işi:** hazır **kuyruk satırı** + **numarasız karar kartı** üretmektir.
- ⛔ **Paralel konseyler ortak dosyaya YAZMAZ.** Bulguları **tek bir uygulama turu** işler.
  *(Gerekçe: dört konsey aynı anda `00-KUYRUK.md`'ye yazsaydı dördü de çakışırdı —
  `CLAUDE.md` § Koşullu Paralellik: paylaşılan durum dosyalarına yazım SIRALIDIR.)*
- ⛔ Konsey **numara VERMEZ** — kuyruk satırı öneki ve karar kartı numarası uygulama turunda verilir.

### İlk çalışma — 2026-09-21

**O gün koşan dört konsey:** 🧠 Psikometri · 🔐 Güvenlik ve KVKK · 📚 İçerik · 🗂️ Yönetişim.
Raporlar: `docs/raporlar/kesif/konsey-*-2026-09-21.md` (dört dosya, hepsi 📸).
Bulguları **tek uygulama turunda** (BC) işlendi: **65 kuyruk satırı + 33 not + 15 karar kartı + 8 PO kalemi.**

**Diğer üçü o hafta zaten çalışmıştı:**
🚀 Canlıya Çıkış → `raporlar/kesif/devir-analizi-2026-09-21.md` §11 ·
⚙️ Operasyon → `raporlar/kesif/operasyonel-hazirlik-2026-09-19.md` ·
👥 UX → panel ve uçtan-uca denetimleri (kuyrukta **AŞAMA P** ve **AŞAMA U**).

---

## Karar oturumu biçimi — PO tercihi (2026-09-21)

Karar oturumlarında (strateji katmanı ↔ PO) **her karar için** şunlar verilir:

- **bugün ne oluyor**
- **neden sorun**
- her seçenekte **KULLANICI ne yaşar**
- **ne kazanılır / NE KAYBEDİLİR**
- **başka hangi kararla bağlantılı**

⛔ Kısa **"(öneri)"** etiketi **YETMEZ** — PO doğru karar verebilmek için **bağlamı ister**.
*(PO, 2026-09-21)*

> ⚠️ Bu, `CLAUDE.md` § "Karar kartı biçimi"ndeki şablonla **çelişmez, onu pekiştirir**: kart zaten
> *"Ne kaybedersin ASLA boş kalmaz"* diyor. Buradaki ek, **sohbet ortamındaki** karar sunumunun da
> aynı ayrıntıyı taşıması gerektiğidir.

