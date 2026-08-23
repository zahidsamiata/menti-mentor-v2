# Katılım Modeli — Mevcut Durum Notu (İŞ 5, kod yazılmadı)
**📸 DONDURULMUŞ (2026-08-02)** — o günün keşif fotoğrafı, güncellenmez; güncel durum: `09-DURUM.md`

**Tarih:** 2026-08-02
**Bağlam:** Retention turu (İŞ 1-4) sırasında çıkan İŞ 5 — ürün sahibinin "hayalet mod + ön-tanımlı
davet" fikri BÜYÜK, AYRI bir tur olacak. Bu turda SADECE mevcut davet+approve akışının bunu ne
kadar karşıladığı NOT edildi. **Kod yazılmadı.** Her bulgu dosya:satır kanıtlı.

---

## Mevcut durum

### ✅ Ön-tanımlı davet MESAJI var
- `InvitationTemplate` modeli (`schema.prisma:1127-1141`): `tenantId`, `role` (MENTOR|MENTI),
  `format` (EMAIL|WHATSAPP), `content`. `@@unique([tenantId, role, format])`.
- Yönetici `/admin/invite` sayfasında rol+format bazlı davet metnini özelleştirir
  (`GET/PUT /api/tenants/:id/invitation-templates`).

### ✅ Davet linki (stateless, imzalı token) var
- `GET /api/invitations/:token/join` → `joinViaInvitation` (`selfServeController.ts:580`).
- Token imzalı JWT (`verifyInvitationToken`) — **ayrı Invitation DB kaydı YOK**, stateless.
- Kullanıcı linke tıklayıp **kaydolunca User oluşur** (önceden değil).

### ✅ Yönetici elle üye ekleyebilir
- `POST /api/users` (`createUser`, `requireRole('ADMIN')`, `userRoutes.ts:30`) → üye `PENDING` başlar.
- Bu, "ön-tanımlı üye"ye en yakın mevcut mekanizma (yönetici bir kişiyi elle sisteme ekler).

### ❌ "Hayalet mod" YOK
- Kişi katılmadan önce sistemde **pasif/görünmez hesap olarak durup** eşleştirmeye/istatistiğe
  girmesi, sonra kişinin kendini "aktive" etmesi akışı YOK.
- Şemada `isGhost` / `ghostMode` / placeholder-user gibi bir kavram yok. Davet = token;
  User yalnızca gerçek kayıt/join anında yaratılır.

### ❌ Toplu davet / toplu ön-oluşturma YOK
- Bulk import (CSV vb.) veya toplu pre-create endpoint'i yok.

---

## Sonuç
Mevcut akış **"davet mesajı (şablon) + imzalı link + yöneticinin elle üye eklemesi"** üçlüsünü
karşılıyor. Ancak ürün sahibinin kastettiği **"hayalet mod"** — yönetici kişileri önceden sisteme koyar,
onlar pasif dururken program planlaması/eşleştirme/istatistik için sayılır, kişi sonradan aktive
olur — **YOK.** Bu, ayrı bir tur (**hayalet-mod / davet turu**) olarak ele alınmalı.

**Bu turda karar/kod alınmadı** — yalnızca zemin netleştirildi.
