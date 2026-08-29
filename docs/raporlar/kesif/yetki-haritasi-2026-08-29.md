# YETKİ HARİTASI — Tüm Endpoint'lerin Yetki Denetimi (FAZ 3b-1)

**📸 DONDURULMUŞ** · 2026-08-29 · salt-okuma denetim (kod/DB değişmedi) · Kaynak: backend `src/routes/*` + controller/servisler baştan-sona okundu

> **⭐ KALICI REFERANS:** Yeni endpoint yazan HERKES önce buradaki **"§B — RLS ne YAPAR / ne YAPMAZ"** bölümünü okusun. Ürünün tek yapısal vaadi *"bir dernek diğerinin verisini görmez"*; bu vaat merkezi RLS + **elle** sahiplik kontrollerinin BİRLİKTE çalışmasına bağlı. Neyin otomatik, neyin elle olduğunu bilmeden yazılan uç açık bırakır.

---

## §A — Özet (TAM SAYILAR)
- **Route dosyası:** 23 · **Endpoint:** 187
- Kategori dağılımı:

| Sınıf | Sayı | Anlam |
|---|:---:|---|
| 🟢 TAM | ~167 | kimlik + (rol) + tenant/sahiplik var |
| 🔵 PUBLIC-KASITLI | ~14 | kayıt/giriş/token/davet/unsubscribe/şüphe-bildirimi |
| 🟡 KISMİ | **6** | kimlik var, **tenant-İÇİ** sahiplik/rol eksik (cross-tenant DEĞİL) |
| 🔴 AÇIK (cross-tenant) | **0** | "dernek A dernek B'yi görür" breach YOK |
| ❓ | ~0 | çelişkili hücreler koddan çözüldü |

> **Ana sonuç:** Yapısal vaat (cross-tenant izolasyon) **sağlam** — 0 cross-tenant açık. Bulunan 6 açık **tenant-İÇİ peer maruziyeti** (bir menti başka mentinin verisini görebiliyor). Vaadi bitirmez ama gerçek yetki boşluğudur → 3b-2'de kapatıldı.

---

## §B — ⭐ Tenant izolasyonu NASIL çalışır: RLS ne YAPAR / ne YAPMAZ
Kaynak: `src/db.ts` (`$extends` RLS) + `src/middleware/tenant.ts` (`requireTenant` + `runWithTenant`).

**OTOMATİK (merkezi RLS — controller unutsa bile korur):**
- `requireTenant` → `runWithTenant(tenantId)` bağlamında,
- **yalnız `TENANT_SCOPED` modeller** {User, VisibilityOptIn, MatchRequest, FeedbackLog, MatchCombinationScore, Meeting, Feedback, JobListing, Club, ClubMembership, PendingTag, TenantMembership, Match, AvailabilityBlock},
- **yalnız READ_OPS** {findMany, findFirst, count, aggregate, groupBy},
- otomatik `where.tenantId` enjekte edilir (`db.ts:60-64`). **Cross-tenant READ sızıntısı bu yüzden yok.**

**ELLE (RLS DOKUNMAZ → tenantId/sahiplik kodda yazılmalı; unutma riski YAPISAL):**
1. **`findUnique`** — bilinçli hariç (`db.ts:41-43`); PK/unique ile çalışır, tenantId enjekte edilmez. → sonrasında `tenantId` teyidi ELLE (doğru örnek: `feedbackController.ts:116`).
2. **TÜM yazmalar** — create/update/delete/updateMany/deleteMany RLS'e girmez. → `data`/`where`'e tenantId ELLE.
3. **Scope-DIŞI modeller** — Conversation, Message, Consent, Tenant, Question, UserProfile, MentorFilter, SuspicionReport… RLS listesinde yok. → tenantId/katılımcı/sahiplik ELLE (Conversation için katılımcı = `sideOf/canAccess`, tenant değil — bilinçli).
4. **`requireTenant` KULLANMAYAN rotalar** — platform (`requirePlatformAdmin`), selfServe/adminSettings (`extractAdminPayload` + `payload.tenantId===params.id`) → RLS bağlamı yok, tenant sınırı tamamen ELLE.

> **Kural (yeni endpoint):** READ + scoped-model + requireTenant ise otomatik güvenli. `findUnique`, herhangi bir **yazma**, scope-dışı model, veya `:id`/gövde parametreli **sahiplik** gerektiren uç ise → ELLE tenantId + gerekirse `requireSelfOrAdmin`.

---

## §C — 6 🟡 KISMİ açık (hepsi tenant-İÇİ) → 3b-2'de KAPATILDI
| # | Endpoint | Ne eksikti | Kötüye kullanım | dosya:satır (denetim anı) | 3b-2 fix |
|---|---|---|---|---|---|
| Y1 | `GET /api/requests` | zorunlu sahiplik filtresi yok (`requesterUserId` opsiyonel) | menti, diğer mentilerin talep mesajlarını (PII) okur | `requestController.ts:89-100` | non-admin `OR[requester/target=self]` |
| Y2 | `GET /api/meetings` | zorunlu katılımcı filtresi yok | üye, tarafı olmadığı görüşme meta+skorlarını görür | `meetingController.ts:228-242` | non-admin `OR[mentor/menti=self]` |
| Y3 | `GET /mentors/:mentorId/filter` | `requireSelfOrAdmin` yok | mentör A, B'nin filtre tercihlerini okur | `mentorFilterController.ts:19-25` | `requireSelfOrAdmin('mentorId')` |
| Y4 | `PUT /mentors/:mentorId/filter` | `requireSelfOrAdmin` yok (yazma) | mentör A, B'nin filtresini değiştirir (sabotaj) | `mentorFilterController.ts:43-49` | `requireSelfOrAdmin('mentorId')` |
| Y5 | `POST /scoring/compute-profile` | `userId`+`role` gövdeden, self/admin yok | üye, başkasının OCEAN/archetype/**rol**'ünü ezer (servis `user:{tenantId}` → cross-tenant değil) | `sjtScoringController.ts:48-60` | self/admin guard + role token'dan |
| Y6 | `POST /questions` (`tenantScoped:false`) | tenant admin global soru (tenantId:null) yaratıyor | tüm kurumların havuzuna içerik enjekte | `questionController.ts:131-135` | daima tenant'a sınırlı |

**Örüntü:** (a) "listele-hepsini" GET'leri (`requireAuth`+opsiyonel filtre) = Y1,Y2 · (b) `:id`/gövde parametreli `requireSelfOrAdmin` eksik = Y3,Y4,Y5 · (c) global-yazma yetkisi platform yerine tenant admininde = Y6. Hiçbiri cross-tenant değil (RLS okuma tarafını kesiyor); boşluk **tenant-içi sahiplik** katmanında.

---

## §D — Bilinen iki bulgunun yeniden değerlendirmesi
- **G1-23 (logoUrl guard yok):** 🗑️ **GEÇERSİZ.** logoUrl 3 yazma yolunun üçünde de admin + kendi-tenant guard'ı VAR: `selfServeController.ts:~388` (`payload.tenantId!==tenantId→403`), `tenantController.ts` (`requirePlatformAdmin`), adminSettings deseni. Açık ya kapanmış ya yanlış tanımlanmış.
- **G1-04 (SuspicionReport tenantId eksik):** yeniden tanım — **tenant-izolasyon açığı DEĞİL.** Model tenantId taşımıyor (`schema.prisma:1172-1184`) ama create **kasıtlı public** (hesap-öncesi sahte-kurum ihbarı), read **yalnız platform admin** (`requirePlatformAdmin`) → tenant-scoped okuma yolu yok, cross-tenant sızma yok. tenantId'siz olması **tasarım** (ihbar edilen kurum gerçek olmayabilir). (İstenirse spam sertleştirme ayrı UX işi.)

## §E — Platform vs Tenant admin ayrımı → SAĞLAM
- **Platform:** `requirePlatformAdmin` (`platformAuth.ts`) — `platform_token` cookie, JWT `isPlatformAdmin && aud==='platform'`. Tüm kurumları görür (RLS yok — doğru).
- **Tenant admin:** `requireTenant` + `requireRole('ADMIN')` — tek tenant, RLS aktif.
- **Karışma yok:** `aud` claim ayrımı + `tenant.ts:66` cross-tenant token reddi → tenant token'ı platform ucunda geçersiz. selfServe/adminSettings 3. desen (`extractAdminPayload` + `payload.tenantId===params.id`) tutarlı.

## §F — Ajan-yanılgıları kaydı (3 paralel Explore ajanı taslak üretti; elle düzeltildi)
Denetim 3 ajanla hızlandırıldı; ajan çıktısındaki her çelişki/"görülmedi" kaynaktan doğrulandı:
- `GET /feedback-logs/:id` → ajan "🔴 rol yok" dedi; GERÇEK: `feedbackLogController.ts:154-159` MENTI→403, MENTOR≠sahip→403. **🟢.**
- `PATCH /users/:id/self-profile` → ajan "🟡"; GERÇEK: `userController.ts:393-398` self/admin var. **🟢.**
- `POST /suspicion-reports` → ajan "🔴"; GERÇEK: public-create + platform-only-read, tenant verisi değil. **🔵.**
- Conversation `:id/*` → ajan "🟡 findUnique"; GERÇEK: `sideOf/canAccess` katılımcı kontrolü her uçta. **🟢.**
- `PATCH /meetings/:id`, approve, reject, feedback-prompted → ajan "❓"; GERÇEK: ownership/participant guard'lı (`meetingController.ts:270-273,535,564,635`). **🟢.**

> **Ders:** Paralel ajan denetimi hızlı ama **her 🔴/🟡 iddiası kaynaktan (dosya:satır) doğrulanmalı** — ajanlar fonksiyon gövdesini kısmi okuyup guard'ı kaçırdı. Bu belgedeki tüm sınıflar elle-doğrulanmıştır.
