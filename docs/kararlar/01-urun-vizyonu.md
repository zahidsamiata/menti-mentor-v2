# 01 — ÜRÜN VİZYONU
**🔄 YAŞAYAN** (canonical: ürün vizyonu)
**Son güncelleme:** 2026-08-02 · Kaynak: PRD/isim chat'i, strateji chat'i, psikometri chat'i, mail/panel chat'i

## NE?
**MentiMentor** — dernek/STK/üniversite kulüpleri için **DISC davranış modeline dayalı** mentör-menti eşleştirme platformu. Multi-tenant (çok kiracılı) B2B2C.
- **Marka:** Sivilkapasite (ana marka, sivilkapasite.org), MentiMentor (mentörlük alt-ürünü/modülü).
- **Ana iddia:** Eşleştirme sadece sektöre değil, **DISC kişilik uyumuna** göre. Rakiplerin (Chronus/MentorcliQ/Mentorloop/Qooper — kurumsal, ~5000$+) yapmadığı mizaç eşleştirmesi.
- **Farklılaşma:** mizaç + anti-toksik eşleşme + opt-in gizlilik (bu üçlü tek savunulabilir fark).

## KİME?
STK / vakıf / üniversite kulüpleri / dernekler. Karar verici = **yönetici** (platformu benimseyecek kişi). Mentör/menti davetle gelir.

## İŞ MODELİ — FİYATLANDIRMA (çelişki çözüldü 2026-08-02)
- **Duruş:** Şimdilik **tamamen ücretsiz**, ileride **premium** (freemium modeli). 🟢
- Kulüplerden/kurumlardan başlangıçta ücret alınmaz. Ölçeklenip vazgeçilmez olunca premium/kapasite-bazlı ücretlendirme.
- **Çekirdek** (eşleştirme, üye sayısı, görüşme) sonsuza dek ücretsiz kalır.
- **Premium** (white-label, derin analitik, ROI raporu, entegrasyonlar) baştan "kilitli görünür" tutulur.
- **Teknik prensip:** Tenant seviyesinde plan/limit altyapısı (`Tenant.plan`, `Tenant.limits`, bugün herkes `FREE_UNLIMITED`) bugünden kodlanmalı — ileride limit getirmek kod değil konfig değişikliği olsun. ⏳ (uygulanmadı)
- **Gerekçe:** "Bugün ücretsiz olanı yarın geri almak" zor; premium baştan görünür-kilitli olmalı. Veri sonradan değerli olsun diye altyapı bugünden.

## MODÜL EKLEME SIRASI (vizyon)
1. Mentörlük (MentiMentor — ilk yayına alınan çekirdek) → 2. Kurumsal hafıza → 3. Sponsorluk → 4. Yetkinlik belgelendirme → 5. Kurumlar arası ağ → 6. Etkinlik + raporlama.
- Gerekçe: Ağ/veri modülleri ancak kritik kütlede değer üretir. Önce her gün kullanılacak çekirdek fayda.

## SOSYAL GİRİŞİM KİMLİĞİ
- **Erasmus DEĞİL** (iptal edildi 🔄). Kâr amacı gütmeyen sosyal girişim olarak kendileri (vibe coding) yapıp tüm kulüplere/derneklere açacak.
- Kapsayıcılık ana ilke — yük kulüplerde/kurumlarda değil.

## AÇIK SORULAR (detay: 08-acik-sorular.md)
- Gelir/sürdürülebilirlik modeli hangi kanal (sponsor premium / kurumsal partnerlik / hibe / bağış)? ❓ MVP sonrası.
- Pilot kulüp/üniversite hangisi? ❓
- İsmin kesin kapsamı (Sivilkapasite ana marka olarak netleşti ama alt-ürün adlandırması detayı). 🟡

## ÇELİŞKİ NOTLARI
- "UniClub" eski çatı ismiydi — artık geçersiz, Sivilkapasite'ye dönüldü.
- Erasmus çerçevesiyle üretilmiş eski içerik (varsa) güncel değil.
