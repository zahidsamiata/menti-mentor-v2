# Dokploy — Fotoğraf İçin Kalıcı Disk (MERGE ÖNCESİ ŞART)

**Neden:** Backend main'e merge edilince autodeploy tetiklenir. O an kalıcı disk hazır
DEĞİLSE, yüklenen fotoğraflar container'ın geçici (ephemeral) diskine yazılır ve **her
redeploy'da SESSİZCE SİLİNİR**. Bu ayar merge'den ÖNCE panelden yapılmalı.

**Kod gerçeği (doğrulandı):**
- Foto yazılan dizin: `config.upload.dir` = `process.env.UPLOAD_DIR ?? <cwd>/uploads`
  (`backend/src/config.ts:94`). Container'da `cwd = /app` (Dockerfile `WORKDIR /app`),
  yani UPLOAD_DIR verilmezse **`/app/uploads`**.
- `/uploads` bu dizinden statik servis edilir (`backend/src/server.ts:68`), başlangıçta
  klasör oluşturulur (`ensureUploadDir`, `server.ts:140`).
- Container **root-olmayan** kullanıcıyla çalışır: `backend` (uid **1001**) — Dockerfile'dan.
- Şu an docker-compose'da backend için uploads volume'ü **YOK** → risk gerçek.

---

## Dokploy panelinde adım adım (kod/terminal gerekmez)

### 1) Kalıcı volume ekle (backend servisine)
Dokploy → **backend uygulaması** → **Advanced / Volumes** (veya "Mounts") sekmesi → **Add Volume**:
- **Type:** Volume Mount (kalıcı) — *Bind mount değil, named/persistent volume*.
- **Mount Path (container içi):** `/app/uploads`
- **Name / Host path:** Dokploy'un önerdiği kalıcı volume adı (ör. `menti-uploads`).

> Amaç: `/app/uploads` artık redeploy'da silinmeyen kalıcı diske bağlı.

### 2) Environment değişkeni ekle (backend servisine)
Dokploy → backend → **Environment** → ekle:
```
UPLOAD_DIR=/app/uploads
```
(Volume mount'uyla BİREBİR aynı yol. Kod bu değişkeni okur.)

**Ayrıca teyit et (muhtemelen zaten var):**
```
BACKEND_URL=https://api.sivilkapasite.org        # avatarUrl bununla üretilir
```
Frontend tarafında da: `NEXT_PUBLIC_API_URL=https://api.sivilkapasite.org`
(next/image yüklenen fotoğrafı bu origin'den çekecek — yoksa foto görünmez).

### 3) Backend'i yeniden dağıt (redeploy)
Ayarlardan sonra backend'i **Redeploy** et.

---

## ⚠️ EN KRİTİK DOĞRULAMA — yazma izni (uid 1001)
Container root-olmayan `backend` (uid 1001) kullanıcısıyla çalışır. Yeni volume **root
sahipli** gelirse uygulama `/app/uploads` içine YAZAMAZ → foto yine kaydolmaz (bu sefer
sessiz değil, hata log'una düşer).

**Redeploy sonrası test:**
1. Panelden bir kullanıcıyla profil fotoğrafı yükle.
2. Foto görünüyor mu? Görünüyorsa yazma izni tamam.
3. Backend'i **tekrar redeploy et** → **foto hâlâ duruyor mu?** Duruyorsa kalıcılık tamam. ✅
4. Foto yüklenemiyorsa (hata) → volume yazma izni sorunu: Dokploy'da volume'ü uid **1001**
   yazabilecek şekilde ayarla (volume permission / chown 1001) ya da destek ile bu izni ver.

---

## Özet (tek bakış)
| Ayar | Değer |
|---|---|
| Volume mount path | `/app/uploads` (kalıcı) |
| Env | `UPLOAD_DIR=/app/uploads` |
| Env (teyit) | `BACKEND_URL=https://api.sivilkapasite.org` · frontend `NEXT_PUBLIC_API_URL` aynı |
| Sonra | Backend redeploy |
| Doğrula | Foto yükle → redeploy → foto duruyor mu + yazma izni (uid 1001) |

Bu ayar tamamlanmadan merge/autodeploy foto kaybına yol açar.
