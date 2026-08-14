# 04 — GÜVENLİK VE KVKK
**🔄 YAŞAYAN** (canonical: güvenlik ve KVKK)
**Son güncelleme:** 2026-08-02 · Kaynak: strateji/güvenlik chat'i, repo-inceleme chat'i, mail/panel chat'i, bugünkü teşhis

> UYARI: Bazı güvenlik maddeleri "kod görülmeden" yazılmış hipotezlerdi (strateji chat'i).
> Bugünkü teşhis (docs/teshis-raporu-2026-08-02.md) bazılarını gerçek kodda doğruladı.
> Her maddenin "doğrulandı mı" durumuna dikkat.

## AYRIM (önce bunu bil)
- **Kod/uygulama güvenliği (DevSecOps):** Aşağıdaki tenant/IDOR/KVKK maddeleri. Kod anında uygulanır.
- **Sunucu/altyapı güvenliği:** VPS/Dokploy/firewall/SSH/SSL/yedek. AYRI iş, HİÇ ele alınmadı, kendi turu olmalı.

## 🔴 P0 — ÇIKIŞI DURDURAN RİSKLER

### Multi-tenant izolasyonu
- **X-Tenant-Id header'ına tek başına GÜVENİLMEZ** (istemci kontrollü). Her zaman JWT/oturum membership'iyle çapraz-doğrulanmalı; çelişki/eksiklikte reddet (403), varsayılana düşme.
- **Her kaynak sorgusu (userId+tenantId) veya (id+tenantId) ile filtrelenmeli** — `findUnique({id})` değil `findFirst({id, tenantId})`.
- **Mevcut koruma (repo-inceleme'de görüldü):** 5 katmanlı requireTenant (header + JWT + çelişki 403 + üyelik + AsyncLocalStorage RLS). Prisma RLS extension okuma sorgularına otomatik tenantId filtresi ekliyor.
- **UYARI:** RLS extension `findUnique`'i filtrelemiyor — şu an bilinçli+manuel kontrollü ama gelecekte sessiz sızıntı tuzağı. Lint kuralı önerildi.

### Çift-tenant kimlik karışması (Gizli Risk)
- Bir kullanıcı A'da mentör B'de menti olabildiği için profil/rol/sertifika okumaları `(userId, tenantId)` çiftiyle yapılmalı.
- **certified/qualityMultiplier UserProfile→TenantMembership'e taşındı** — eski kod hâlâ UserProfile'dan okuyorsa sessiz yanlış sonuç. Doğrulanmalı.

### Eşleştirme deadlock
- Boş havuzda motor çökmemeli → `{ items: [], fallbackLevel }` dönmeli. Boş sonuç geçerli durum. (Bkz. 03-psikometri fallback.)

## 🔴 BUGÜNKÜ TEŞHİSTE BULUNAN 2 YENİ IDOR (canlı öncesi kritik)
- `/mentors/:mentorId/candidates` — başka mentörün aday listesi görülebiliyor.
- `/requests/:id` — başka kullanıcının match request'i görülebiliyor.
- Durum: ⏳ DÜZELTİLMEDİ. Küçük fix ama canlı-kritik.
- **✅ GÜNCELLEME (2026-08-14):** Kod incelemesi (salt-okuma keşif) bu 2 endpoint'in **tenant izolasyonu + sahiplik kontrolü ile KORUMALI** olduğunu KANITLADI — **IDOR açığı YOK**. İlgili endpoint'ler (mentör aday listesi, talep detayı) çift katmanlı korumalı: tenant filtresi + sahiplik/ADMIN kontrolü, null-auth 401 ile reddedilir. Düzeltme commit `161ae00`. Kanıt: `matchingController.ts:45-52`, `requestController.ts:116-121`. Yukarıdaki "⏳ DÜZELTİLMEDİ" satırı BAYAT.

## 🟡 P1 — ÖNEMLİ AMA ÇIKIŞI DURDURMAZ
- **DISC matematik edge-case:** `calculateDiscResult`'ta sıfıra bölme/NaN guard (`hits>0`, `Number.isFinite`); `deriveArchetype` asla undefined dönmemeli. "Varsayılana düşen profil oranı" izlenmeli.
- **JSON alan guard'ları:** Prisma `Json` alanları (limits, blockedPairs) okunurken `Array.isArray`/Zod parse; bozuksa güvenli varsayılana düş.
- **Kural paneli hardening:** Sayısal ayarlar sunucuda clamp; blockedPairs Zod ile (self-block reddi, dizi tavanı); tenantId asla payload'dan alınmamalı.
- **Next.js tenant cache zehirlenmesi:** Tenant değişiminde queryKey'e tenantId dahil, agresif invalidate.

## KVKK
- **DISC ham profil ASLA gösterilmez:** discVector/selfProfile/temperamentJson response'a dönmez. Sadece discType (tip D/I/S/C) veya arketip adı. 🟢 (panelde uygulandı)
- **Super Admin / platform admin agregat-only:** Bireysel eşleşme/mizaç/mesaj görememeli, sadece agregat metrik. DTO whitelisting + k-anonimlik (küçük grupta metrik gizle).
- **Audit log:** Hassas veri erişimi/değişimi loglanır (KVKK Md.12). Append-only, iş verisi değiştirmez. Örnek: VIEW_TENANT_MEMBERS. 🟢 (çalışıyor)
- **KVKK/GDPR servisi (repo'da var):** Anonimleştirme, silme, dışa aktarma, otomatik temizlik; consent tenant+user, Zod zorunlu.
- **Bloklama sessiz olmalı** (bloklanana bildirim gitmez).

## 🔴 KVKK CANLI-ÖNCESİ BLOCKER'LARI (kod ama önce KARAR gerekiyor)
- Privacy center UI, DISC için ayrı rıza, Meeting/Feedback FK nullable, 18+ yaş doğrulama.
- Bunlar açık sorulara bağlı (bkz. 08): yaş politikası, veri sorumlusu kimliği, sunucu konumu beyanı.

## 🔴 SUNUCU/ALTYAPI GÜVENLİĞİ (HİÇ ELE ALINMADI)
- Dokploy HTTP+açık = kritik. Firewall, SSH sertleştirme, SSL, yedekleme.
- Gerçek kişisel veri gelmeden yapılması önemli. Kendi turu olmalı. Prompt hazır (bir chat'te), gönderilip gönderilmediği belirsiz.
- Depoları PRIVATE yapma (GitHub, ticari SaaS). ⏳

## SECRET HİJYENİ
- Prod admin key: d0aeef3c... 64-hane, güçlü. Rotasyon opsiyonel/ileride.
- Resend key rotasyonu yapıldı (bkz. 02-mimari).
- SHA tahmin etme dersi: asistan bir kez yanlış SHA verdi, Claude Code git'ten doğrulayıp yakaladı → "tahmin etme, doğrula" kuralı.

## ÖNCELİK SIRASI (production öncesi, asistan tavsiyesi)
- P0 = tenant izolasyonu + çift-tenant kimlik + eşleşme deadlock + 2 yeni IDOR.
- P1 = DISC edge-case + JSON guard + kural hardening.
- P2 = bildirim/likidite/cache.
- NOT: Kullanıcı bu önceliklendirmeyi henüz tek tek onaylamadı.
