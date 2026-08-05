# 08 — AÇIK SORULAR VE KARARA BAĞLANMAYANLAR
**Son güncelleme:** 2026-08-02 · Kaynak: tüm chat'ler

> Bunlar HENÜZ karara bağlanmamış konular. Karar verildikçe ilgili belgeye taşınır + buradan silinir.

## 🔴 HUKUKİ / KVKK (canlı-öncesi kritik)
- **Yaş politikası:** 18+ mı, gençler de mi (veli izni)? Kullanıcı "öyle bir gündemim yok, hukuki sorun olmayacak şekilde her şey olabilir" dedi = NET KARAR YOK. ÇELİŞKİ: Mevcut Kullanım Koşulları "18+" diyor ama ürün genç menti hedefliyor. ❓
- **Veri sorumlusu kimliği:** Şahıs / şirket / dernek? Kullanıcı "bilmiyorum, anlamadım" dedi. ❓
- **Sunucu konumu beyanı:** Resend=Ireland (netleşti). Neon=? Hostinger=? — yurt dışı aktarım beyanı için gerekli. ❓
- **Yasal metin incelemesi:** /kvkk, /terms, /gizlilik taslak var; üretim öncesi hukukçu şart (DISC = hassas veriye yakın). ⏳

## 🟡 ÜRÜN / VİZYON
- **Gelir/sürdürülebilirlik modeli:** Hangi kanal (sponsor premium / kurumsal partnerlik / hibe / bağış)? MVP sonrası. Prensip: yük kulüplerde değil. ❓
- **Pilot kulüp/üniversite:** MVP hangi pilotla test edilecek? ❓
- **İsim detayı:** Sivilkapasite ana marka netleşti; alt-ürün adlandırması (MentiMentor mu başka mı) ince detay. 🟡
- **Modül önceliklendirme onayı:** Viral/panel/metrik özellikleri "ürün gerçek kullanıcı kazanınca" ertelendi ama kullanıcı bu sırayı açıkça onaylamadı. ⚪

## 🟡 ALGORİTMA / TEKNİK
- **Sektör ağırlıkları (30/25/25/15/5) nihai mi?** Kullanıcı "reçete harika" dedi ama tek tek onaylamadı. ❓
- **Eşleşme hesaplama tetikleyicisi:** Event-driven mi, sayfa-açılınca mı? "Aha anı" buna bağlı. ❓
- **Baraj "0 puan" kuralı kapsamı:** Tüm sorularda mı, sadece isRedLine'da mı? (şu an sadece isRedLine kodlandı) ❓
- **Format enum uyumsuzluğu:** frontend "online" vs Prisma "ONLINE" — potansiyel bug, doğrulanmadı. ❓
- ~~**timezone bug'ı (bookMeeting):** UTC vs Europe/Istanbul — gerçek bug mu, doğrulanacak.~~ ✅ ÇÖZÜLDÜ (2026-08-02, backend `6a30f21`) — bkz. 09-DURUM.
- **Çarpan vs hard-gate yumuşaması:** P5 ile hard-gate'in ileride yumuşaması (muhafazakâr vs vizyoner) karara bağlanmadı. ❓

## 🟡 ÖZELLİK / PANEL
- **Yöneticilik verme akışı (A9):** YENİDEN KURGULANACAK — kod öncesi kullanıcıya sorulacak (söz verildi). Şu an: promote-admin var, max 3 admin, "tüm onaylı kullanıcı listesi" eksik. ❓
- **Sertifika soru ekleme:** Yönetici ekleyebilmeli mi, yoksa bilinçli kısıt mı? ❓
- **DISC/sektör dağılım oranı ayarı (A6):** Hardcoded; istenirse BÜYÜK iş (migration+endpoint+UI). Yapılacak mı? ❓
- **Etiket ekleme:** Yönetici doğrudan etiket ekleyebilmeli mi (öneri beklemeden)? 🟡 (kullanıcı istedi, kod durumu belirsiz)
- **Arkadaşın başvurusu:** Canlıdan kaydoldu, "inceleniyor" gördü ama panelde "bekleyen yok". Çözülmedi. GERÇEK KİŞİ bekliyor. b3 membership backfill ile ilgili olabilir. ⏳
- **Onay bildirimi maili:** Kurum onaylanınca/reddedilince başvurana mail gidiyor mu? ❓

## 🟡 ALTYAPI
- **AnsweredFollowup tablosu:** profile-completeness servisi varsayıyor; yoksa profileSource'a düşüyor. ❓ (opsiyonel)
- **İzole test DB kalıcı:** .env.test'e kalıcı TEST_DATABASE_URL tam oturmadı. ⏳
- **Next.js sürüm çelişkisi:** Bazı belgelerde 14.2.35, package.json'da 15.5.20. Güncel: 15.5.20. (çözüldü ama eski belgeler karışık)

## 🟡 KART TASARIMI / FOTOĞRAF (2026-08-02 geç oturum)
- **Fotoğraf ne zaman ZORUNLU olacak?** Şu an opsiyonel (altyapı hazır). Zorunluluk tarihi/koşulu belirsiz. ❓
- **Kart DISC gösterimi:** harf mi (D/I/S/C), renk mi, kelime/arketip mi? Kart tasarımında karara bağlanacak. ❓
- **Sayfa başına kart sayısı:** 15 / 18 / 20 — kesin sayı? ❓
- **DISC renk TON kararı (light):** hâlâ açık (bkz. 06 D22) — kart rozetini de etkiler. ❓

## 🟡 RETENTION / YÖNETİCİ PANELİ (2026-08-02 geç oturum)
- **Yönetici paneli çekirdek metrikleri:** hangi anlamlı veriler gösterilecek? Retention turunda Zahid seçecek. ❓
- **(İdeal) Gerçek kulüp/dernek yöneticileriyle görüşme:** persona taslağını doğrulamak için. ⚪
- Referans: docs/raporlar/yonetici-persona-ve-metrikler.md (⚠️ henüz docs/raporlar'a eklenmedi — kullanıcı yükleyecek).

## KARAR VERİLDİKÇE
Bir soru karara bağlanınca: ilgili konu belgesine (01-07) taşı, buradan sil, 09-DURUM.md'yi güncelle.
