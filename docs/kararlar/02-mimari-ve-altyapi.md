# 02 — MİMARİ VE ALTYAPI
**🔄 YAŞAYAN** (canonical: mimari ve altyapı)
**Son güncelleme:** 2026-08-02 · Kaynak: PRD/repo-inceleme chat'i, mail/panel chat'i, bugünkü oturum

## 🔴🔴 EN KRİTİK GERÇEK — CANLI = LOKAL AYNI DB
- **Canlı ve lokal AYNI Neon veritabanını paylaşıyor:** `ep-fancy-tooth-ab4u5xhr-pooler.eu-west-2.aws.neon.tech`
- Dokploy canlı backend DATABASE_URL = lokal backend DATABASE_URL = **birebir aynı** (NODE_ENV=production). Ekran görüntüleriyle 2026-08-02'de KESİNLEŞTİ.
- **SONUÇ:** Lokalde DB'ye yazılan HER ŞEY canlıyı da anında etkiler. Seed/migration/DB işlemlerinde MUTLAKA hatırla, onay al.
- Test branch (izole, farklı): `ep-polished-darkness` — ama 31 Tem 2026'da auto-delete oldu. Artık yok.

## 🔴 TEHLİKELİ SEED UYARISI
- `seed.ts` / `npm run seed` / `prisma db seed` → global soruları + test kullanıcılarını **SİLER**, 200 kullanıcı oluşturur. **ASLA çalıştırma.**
- **Güvenli** olanlar (sadece upsert, silme yok): `seed-questions.ts`, `seed-learning-journey.ts`, `seed-test-tenant.mjs`.

## NEON MIGRATION KURALI
- `IF NOT EXISTS` + `db execute` + `migrate resolve` kullan.
- `db push` / `migrate dev` **YASAK** (prod'u bozabilir).
- NODE_ENV=production'da reset guard tetiklenmez (prod DB güvende) — ama NODE_ENV yanlışsa reset guard DB silebilir, deploy öncesi teyit et.

## STACK
- **Monorepo:** Çatı repo (frontend) + backend ayrı repoda **git submodule**. Repo: zahidsamiata/menti-mentor-v2.
- **Backend:** TypeScript + Express 5 + Prisma ORM. ~18.000 satır, 117 dosya, 144 endpoint, 31 migration, 60+ model.
- **Frontend:** Next.js **15.5.20** (dikkat: bazı eski belgelerde 14.2.35 yazıyor — çelişki, güncel olan 15.5.20; **✅ 2026-08-14 `frontend/package.json` ile doğrulandı**), React 18, Tailwind, Radix UI. ~14.600 satır, 37 sayfa, 30 bileşen.
- **DB:** PostgreSQL — **Neon (serverless)**. VPS'te DEĞİL.
- **Test:** Vitest + Supertest, 169 test bloğu.

## DEPLOY
- **Dokploy** üzerinden (Hostinger sunucu). Canlı: sivilkapasite.org + api.sivilkapasite.org.
- **Autodeploy AÇIK:** main'e push → otomatik deploy. Ama env değişikliği otomatik yansımaz — manuel redeploy şart.
- **Submodule/merge koreografisi:** Önce backend PR → çatı pointer bump → çatı PR. Sıra önemli.
- Domain: sivilkapasite.org (Hostinger, aktif, 2027-07-20'ye kadar).

## MAIL ALTYAPISI (mail chat'inde çözüldü)
- **Resend** (Gmail SMTP kırıktı — App Password 20 Tem iptal olmuştu). Domain sivilkapasite.org doğrulandı (DKIM+SPF+DMARC), region Ireland/eu-west-1.
- `@test.local` bounce guard: sahte/test adreslere mail gitmez.
- Resend key rotasyonu yapıldı (eski açığa çıkan key silindi, yeni: mentimentor-prod-v2).

## BARINDIRMA KARARI (çelişki çözüldü)
- Eski "VPS mi PaaS mi" tartışması AŞILDI. Şu an: **Neon (DB) + Dokploy (deploy)** canlıda çalışıyor.
- **Neon'da kalıyor** (VPS'e taşınmayacak): otomatik yedek/point-in-time restore, ayrılık ilkesi (uygulama-DB ayrı), maliyet sıfır.
- Eski belgelerde "KVM 2 VPS", ".org.tr", "PaaS öner" gibi maddeler → asistan önerisiydi, artık geçersiz/aşıldı.

## TEKNİK RİSKLER (detay: 04-guvenlik-ve-kvkk.md)
- JSON alanları (limits, blockedPairs) şemasız → her okumada `Array.isArray()` guard.
- Neon connection pool kopabilir/cold-start → try/catch + retry.
- Rate limiter in-memory → çok instance'ta Redis'e taşınmalı.
- `certified/qualityMultiplier` UserProfile→TenantMembership'e taşındı; eski kod eski yerden okuyor olabilir (sessiz yanlış sonuç riski).

## TEST HESAPLARI (lokal geliştirme)
- Şifre (hepsi): `TestPanel!2026` · Kurum slug: `test-panel-demo`
- admin@test.local · mentor1@test.local (D), mentor2@test.local (I) · menti1@test.local (S), menti2@test.local (C)
- Dev portları: backend :3000, frontend :3001
- Global içerik: 20 DISC sorusu + 13 öğrenme aşaması (2026-08-02 seed'lendi). Mevcut veri: 3 kurum / 7 kullanıcı / 3 görüşme.
