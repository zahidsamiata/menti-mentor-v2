# 01 — FELSEFE VE ÇALIŞMA TARZI (yeni sohbet önce bunu oku)

~~[ESKİ · 2026-09-24] **📸 DONDURULMUŞ** — oturum devir notu (felsefe / çalışma tarzı; kalıcı referans).~~
⚠️ GÜNCELLEME (2026-09-24): **🔄 YAŞAYAN (kısmen)** — çalışma tarzı referansı; `06-devir-kilavuzu.md` "Rol dağılımı" buraya atıf verir. Bayat satırlar aşağıda üstü çizili; kurallarda çelişkide **`CLAUDE.md` kazanır**. Satır ayrımı kanıtı: `docs/raporlar/kesif/devir-klasoru-envanteri-2026-09-24.md` §"01: satır ayrımı".

> **Amaç:** Bu proje aylardır tek bir çalışma disipliniyle yürüyor. Yeni sohbet, bu disiplini
> ilk turdan uygulasın diye burada topladık. Kaynak: `CLAUDE.md` (kök) + `docs/kararlar/konu/07-calisma-tarzi.md`.
> **Kişi adı yok** — kullanıcıdan "ürün sahihi" / "PO" diye söz edilir.
>
> **⚠️ GÜNCELLEME (2026-08-20) — PO çalışma tarzı ekleri (kalıcı):**
> - **Uzun, otonom turlar tercih edilir** — PC açık bırakılır; iş verilince tek turda kapsamlı ilerlenir, gereksiz durulmaz
>   (karar gerekeni "PO kararı gerekli: …" diye NOT et, devam et). Parça-parça "şunu yap-dur" değil.
> - **Kod/belge SİLME yerine "niyeti anla, kaldığın yerden devam et"** — ölü/yarım kod için varsayılan "sil" DEĞİL;
>   önce neden yazıldığını + neye bağlanacağını bul (çoğu yarım özelliğin parçası). Gerçek terk adayı "❓ PO kararı" işaretlenir.
> - **Belgelerde silme yok** — eskiyi `docs/arsiv/`'e taşı + `⚠️ GÜNCELLEME (tarih)` notu düş (tarihsel iz korunur).
> - ~~[ESKİ · 2026-09-24] **Modlar iki tanedir:** 🔵 PLANLA / 🟢 BYPASS (aşağıdaki §2'de "MANUEL-ONAY" ayrı bir mod gibi yazılmış; pratikte~~
>   ⚠️ GÜNCELLEME (2026-09-24): mod etiketleri artık **🟩 PLANLA / 🟥 BYPASS**; daireler (🟢🟡🔴) kapı anlamındadır — `CLAUDE.md` "MOD ETİKETİ".
>   geri-alınamaz adımda **BYPASS içinde DUR-onay** uygulanır, ayrı etiket kullanılmaz).
> - **Karar-Takip Disiplini (yeni):** her oturum **başında** `00-KARAR-TAKIP.md` okunur + açık maddeler PO'ya hatırlatılır;
>   her BYPASS turu **sonunda** güncellenir. Detay: `CLAUDE.md`.

---

## 1) Kullanıcı kim
- **Ürün sahibi teknik detaya çok hakim değil.** Kararları sade dille açıkla, öneri sun, gerekçelendir.
- Ürün kararı **her zaman ürün sahibinde**. Claude analiz + seçenek sunar, **dürüst pushback** yapar,
  körü körüne onaylamaz. "Haklısınız" deyip yanlışa gitme.

## 2) İki mod (her turun başında MOD bildir)
- ~~[ESKİ · 2026-09-24] **🔵 PLANLA (salt-okuma):** keşif, okuma, analiz. Commit yok, kod yok, DB yok, merge yok.~~
  ⚠️ GÜNCELLEME (2026-09-24): mod adı **🟩 PLANLA** — `CLAUDE.md` "MOD ETİKETİ".
- ~~[ESKİ · 2026-09-24] **🟢 BYPASS (uygula):** kod yaz / belge yaz → **PR aç, MERGE ETME**. Merge kararı ürün sahibinde.~~
  ⚠️ GÜNCELLEME (2026-09-24): **🟥 BYPASS**; merge kapıya bağlı: 🟢 doğrulama tamsa merge · 🟡 PR aç merge etme · 🔴 karar bekle. Bulut hiçbir kapıda merge edemez — `CLAUDE.md` "MERGE POLİTİKASI".
- **🟠 MANUEL-ONAY:** geri-alınamaz işler (merge, prod deploy, prod DB yazımı, force-push, external
  servise gönderim) → önce **DUR**, onay bekle.

## 3) Model yönlendirme
> ⚠️ GÜNCELLEME (2026-08-28, G9-15): Model isimleri ve "basit iş→hafif model" ilkesi bu bölümden çıkarıldı — seçim belgede sabitlenmez.
- Model seçimi her turun promptunda belirtilir; belgede sabitlenmez.

## 4) Prompt standardı — 8 UNSUR (her kapsamlı prompt 8/8 tam olmalı)
1. **BÜYÜK RESİM** — nereye gidiyoruz, bu adım ne tamamlıyor, sonrası ne.
2. **MOD (en başta)** — PLANLA / BYPASS / MANUEL-ONAY.
3. **DEVSECOPS** — güvenlik kod anında ve katmanlı düşünülür (sonradan yamanmaz). Tenant izolasyonu KRİTİK.
4. **PARALELLİK** — bağımsız/farklı-dosya → paralel alt-ajan; ortak dosya/bağımlı/merge/migration → SIRALI. Şüphede sıralı.
5. **DURAK NOKTALARI** — geri-alınamaz işlerde DUR, onay bekle.
6. **TEYİT NOKTALARI** — "sanırım/muhtemelen" YASAK; dosya/kod/log/sorgu kanıtı. SHA git'ten doğrula.
7. **HATA SENARYOLARI** — olası hatalar + ne araştırılacağı + nasıl çözüleceği (tahmin değil, kök neden).
8. **KAPANIŞ + YOL HARİTASI** — ne oldu, sıradaki adım, güncel durum.

> Mod + önerilen model satırı promptun **en üstünde** olur.

## 5) Üç kırmızı kural (kalıcı — asla ihlal etme)
1. ~~[ESKİ · 2026-09-24] **Canlı = lokal AYNI Neon DB** (`ep-fancy-tooth-ab4u5xhr`, eu-west-2/İrlanda). Lokalde DB'ye yazmak =~~
   canlıyı anında etkilemek. Seed/migration/backfill/DB işleminde **önce onay al**.
   ⚠️ GÜNCELLEME (2026-09-24): eu-west-2 = **Londra/Birleşik Krallık** (madde 92); canlı DB'nin Neon mu docker Postgres mi olduğu tartışmalı → en kötü durumu varsay, yedek zorunlu — `CLAUDE.md` "Ortam / Veritabanı" + "ÇELİŞKİ (2026-09-21)".
2. **Tehlikeli seed VERİ SİLER** — `seed.ts` / `npm run seed` / `prisma db seed` ASLA çalıştırma.
   Güvenli olanlar: `seed-questions.ts`, `seed-learning-journey.ts`, `seed-test-tenant.mjs`.
   > ⚠️ GÜNCELLEME (2026-08-23): `seed-questions.ts` **SİLİNDİ** (backend `5745e0f`). Gerçek güvenli (kod-kanıtlı, yalnız upsert):
   > `seed-certification.ts` · `seed-learning-journey.ts` · `scripts/seed-test-tenant.mjs`. Tehlikeli = `prisma/seed.ts` (toplu deleteMany).
3. ~~[ESKİ · 2026-09-24] **main'e merge = canlıya deploy** (autodeploy açık) → **merge kararı ürün sahibinde**. PR aç, merge etme.~~
   ⚠️ GÜNCELLEME (2026-09-24): merge kapı politikasına bağlı (🟢/🟡/🔴) — `CLAUDE.md` "MERGE POLİTİKASI"; "PR aç, merge etme" yalnız 🟡 kapıda ve bulut oturumunda geçerli.

## 6) Tarz kuralları
- **Kanıt iste, "sanırım" yasak** — durumu git'ten/koddan/log'dan DOĞRULA, hafızadan varsayma.
  SHA/commit/branch tahmin etme (bir kez yanlış SHA verildi, git'ten doğrulama prod çökmesini önledi).
- **Duraklar hasar-önleme frenidir** — geri-alınamaz adımda dur; hızdan önce doğruluk/güvenlik.
- **Kişi adı yasağı (kalıcı):** hiçbir kod/yorum/commit/PR/belgeye kişi adı yazma. Nötr terim ("ürün sahibi"/"PO").
- **Dil:** kullanıcıya görünen her metin **Türkçe**; kod iç mekaniği (değişken/fonksiyon/commit/error-code) İngilizce.
- **Aşırı mühendislik/erken optimizasyon YOK** — gerçek ihtiyaç olmadan özellik yok.
- **Kapsamlı/uçtan uca tek prompt** — parça parça "şunu yap dur" değil; iş verilince tek turda ilerle,
  karar gerekeni "kullanıcı kararı gerekli: …" diye NOT et, gereksiz durma.

## 7) Push öncesi ZORUNLU
- Her push öncesi `npm run verify` (= CI ile birebir: backend tsc + tsc-test + eslint + frontend tsc +
  vitest + build + entegrasyon). Yeşil değilse push yok.
- **verify ↔ CI farkı:** lokalde `TEST_DATABASE_URL` YOKSA entegrasyon testleri guard'la DURUR (canlı
  Neon'a truncate atmaz) → lokal yeşil sanma; **asıl kanıt CI'da**.
- Testi/CI'ı **yeşil GÖSTERME** — gerçek durumu ver.

## 8) Branch akışı + submodule (DOĞRUDAN main'E PUSH YOK)
- Her iş feature branch'te: `git checkout -b feat/xxx` → PR → CI iki repoda yeşil → merge (PO).
- **Submodule sırası (ASLA bozma):** backend commit → backend push → çatı `git add backend` →
  çatı commit → çatı push. Backend push ile pointer güncellemesi arasında ara commit/push OLMAZ.
- CI kontrolü **iki repoda**: `gh run list` hem backend hem çatı.

## 9) Hata felsefesi — panik yok
1. Önce sorunu **ARAŞTIR + KANITLA** (teşhis + kanıt).
2. Sonra çözüm + risk değerlendir.
3. Net ve düşük riskliyse çöz; belirsizse **DUR ve sor**.
- Panikle deneme-yanılma düzeltme YAPMA. (Ders: bir bug kod değil `JWT_SECRET` değişimiydi, re-login çözdü —
  "önce teşhis" doğru çıktı.)

## 10) Belge eş-zamanlılığı (belge hijyeni — kalıcı kural)
- ~~[ESKİ · 2026-09-24] Her iş tamamlanınca aynı tur/commit içinde `docs/kararlar/09-DURUM.md` güncellenir.~~
  ⚠️ GÜNCELLEME (2026-09-24): otonom turda belge senkronu **kuyruğun sonunda tek sefer** yapılır; aktif iş kaynağı `00-KUYRUK.md` — `CLAUDE.md` "Belge senkronu — SONA, tek sefer" + "AKTİF İŞ KAYNAĞI TEKTİR".
- **Belge düzeltme deseni:** eski/yanlış kararı SİLME; üstüne `⚠️ GÜNCELLEME (tarih): …` ekle veya
  `docs/arsiv/` altına taşı — tarihsel iz korunur.
- `git fetch origin` ÖNCE: main durumu (ahead/behind, merge oldu mu) kontrol edilecekse önce fetch;
  lokal main geride kalabilir.

> ~~[ESKİ · 2026-09-24] Bu belgeyi okuduktan sonra **02-proje-durumu** ile devam et; iş seçimi için **06-devir-kilavuzu**'na bak.~~
> ⚠️ GÜNCELLEME (2026-09-24): giriş belgesi `06-devir-kilavuzu.md`; `02-proje-durumu` 📸 donduruldu (güncel: `docs/kararlar/09-DURUM.md` + `docs/otonom/02-ILERLEME.md`).
