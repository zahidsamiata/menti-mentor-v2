> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · TAZELEME TETİKLEYİCİSİ: KALICI — iş BITTI olunca satır AYNEN eklenir (OTONOM-PROMPT 5c-a)

# 00-KUYRUK — BİTTİ İŞLER ARŞİVİ (2026-10)

Kaynak: `docs/otonom/00-KUYRUK.md`'den BITTI olunca aynı commit'te taşınan satırlar (önceki ay: `00-KUYRUK-bitti-2026-09.md`).

## ⭐ AŞAMA PN — PO NOTU 2026-10-21 KARARLARININ AÇTIĞI İŞLER (öne alındı · 2026-10-27)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| U-12 | Ş0 | **Davet token'ı e-postaya bağlı değil, tek kullanımlık değil, iptal edilemez, 30 gün geçerli.** NEDEN: davet bağlantısı sızarsa yabancı biri kalıcı üye olabiliyor (e-postaya bağlı değil, iptal edilemez, 30 gün). | 🟢 (+7b) | Yeni üretilen toplu davet bağlantısı 7 gün sonra geçersiz (A ayağı) | BITTI | ⛔ **ÇIKIŞ BLOKERİ (T1)** — davet token'ı e-postaya bağlı değil, iptal edilemez, 30 gün — link sızarsa yabancı kalıcı üye olur = X §10#16. Kanıt: `selfServeController.ts:562-572`. Efor M ⚠️ = güvenlik konseyi §2.C.3, ek bulgu: token modelinden BAĞIMSIZ bir sızıntı kanalı var — davet JWT'si URL path'inde taşınıyor (`invitationRoutes.ts:13`) ve `requestLogger.ts:22-23` `originalUrl`'i olduğu gibi stdout'a basıyor → log'a erişen herkes geçerli davet token'ı toplar. Bu kanal ayrı ve daha ucuz kapanır → **GV-14** olarak ayrı satır açıldı; U-12 kartı beklerken GV-14 ilerleyebilir. · aile: Y-E · geçmiş: bkz. arsiv/00-KUYRUK-gecmis.md § U-12 (2026-09-28, AJ-68) · ⭐ **PO NOTU 2026-10-21 → kuyruğa döndü 2026-10-27 (öne alındı, § AŞAMA PN):** KARAR-82 ✅ A + B + C. Bu satır = **A ayağı** (süre 30g → 7g, `selfServeController.ts:561` `expiresIn`, sabit config'e). B → **U-12B** (🔵), C → **U-12C** (🔵, SMTP teyidi sonrası). Negatif test: 7 günü geçmiş token ile katılım reddedilir. Eski bölüm: § AŞAMA U. · ✅ **BITTI 2026-10-27** — PR backend #312 (merge d7080e9) + çatı #490 (merge 3004219) · 7b ONAY (iki PR'da yorum) · testler: `tests/u12-davet-7-gun.unit.test.ts` (5) + `tests/u12-davet-join-7-gun.test.ts` (2, CI'da koştu) · mutasyon: yaş kontrolü geri alınınca 'NEGATİF: 8 günlük davet…' KIRMIZI (yerel) · CANLIDA BAK: yönetici davet ekranında 'Davet Linki (7 gün geçerli)'; 7 günü geçmiş bağlantı 'Davet linki geçersiz veya süresi dolmuş' der · kalan: iptal → U-12B, kişiye özel → U-12C |
