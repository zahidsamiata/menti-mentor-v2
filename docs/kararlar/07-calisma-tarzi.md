# 07 — ÇALIŞMA TARZI VE PROMPT FELSEFESİ
**🔄 YAŞAYAN** (canonical: çalışma tarzı ve prompt felsefesi)
**Son güncelleme:** 2026-08-02 · Kaynak: tüm chat'ler (ortak), bugünkü oturum

> Bu, her Claude Code promptunun ve her çalışma turunun uyması gereken çerçeve.
> Kullanıcı (ürün sahibi) teknik detaya çok hakim değil — kararları sade dille açıkla, öner, gerekçelendir.

## PROMPT STANDARDI (8 UNSUR — her kapsamlı prompt)
1. **BÜYÜK RESİM** — nereye gidiyoruz, bu adım ne tamamlıyor, sonrası ne. Parçayı değil bütünü göster.
2. **MOD (en başta)** — PLAN (salt-okuma) / BYPASS (kod yaz, PR aç, MERGE ETME) / MANUEL ONAY (geri-alınamaz işler).
3. **DEVSECOPS** — kod anında, katmanlı (aşağıda şablon). Sonradan yamanmaz. Tenant izolasyonu KRİTİK.
4. **PARALELLİK** — bağımsız/farklı dosya → paralel alt-ajan (tek oturum, ayrı terminal AÇMA). Ortak dosya/bağımlı/merge/migration → sıralı. Şüphede sıralı.
5. **DURAK NOKTALARI** — geri-alınamaz işlerde (merge/deploy/silme/DB-yazımı) DUR, onay bekle.
6. **TEYİT NOKTALARI** — "sanırım/muhtemelen" YASAK, dosya/kod/log/sorgu kanıtı. SHA git'ten doğrula (tahmin etme).
7. **HATA SENARYOLARI** — olası hatalar + ne araştıracağı + nasıl çözeceği. Tahmin değil, kök neden.
8. **KAPANIŞ + YOL HARİTASI** — ne oldu, sıradaki adım, güncel durum.

## GENEL İLKELER
- **"PR aç, MERGE ETME"** güvenlik ağı — ürün sahibi en sonda inceler.
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
- Claude Code'da standart model (Sonnet 4.6 Default) yeterli; ücretli 1M context modu gerekmez.
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
