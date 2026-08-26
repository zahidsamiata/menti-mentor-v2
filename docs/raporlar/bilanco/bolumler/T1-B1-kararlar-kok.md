# BELGE BİLANÇOSU — TUR 1 / GRUP B1 (kararlar/ kök geri kalanı)

**📸 DONDURULMUŞ** (bilanço bölümü — 2026-08-26) · Tur 1/4 · Referans: `T1-A-canonical.md`

> Grup A'da sayılan 6 canonical taşıyıcı + `00-INDEX` dışında, `docs/kararlar/` kökünde kalan tek belge:
> `dokploy-foto-volume-talimati.md`. (`00-INDEX.md` Grup A'da sayıldı — burada tekrar edilmez.)

## 0. OKUMA İLERLEME TABLOSU

| belge | satır | okundu | bulunan kalem |
|---|:---:|:---:|:---:|
| `dokploy-foto-volume-talimati.md` | 71 | ✅ TAM | 6 kalem (1 ana iş + 5 alt-adım/doğrulama) |

**Grup B1 toplam: 1/1 belge TAM okundu. Okunmayan: 0.**

## 1. DEFTER

| kaynak (dosya:satır) | kalem | numara | durum | not/kanıt |
|---|---|---|:---:|---|
| `dokploy-foto-volume-talimati.md:1-6` | Dokploy `/app/uploads` **kalıcı volume** kurulmadan merge/autodeploy foto kaybına yol açar (canlı-öncesi ŞART) | NUMARASIZ (=çıkış-planı **K1 foto-volume** + T1-A **A22** + 10-yol E-kuyruğu:232) | ⬜ AÇIK (PO-manuel/K4) | Kod gerçeği doğrulanmış (`config.ts:94`, `server.ts:68,140`); docker-compose'da uploads volume YOK → risk gerçek. Kalibrasyon: PO işi, kod değil |
| `:29-34` | `UPLOAD_DIR=/app/uploads` env eklenecek (volume mount ile birebir aynı yol) | NUMARASIZ (alt-adım) | ⬜ AÇIK (PO-manuel) | `config.upload.dir` bu env'i okur |
| `:36-41` | `BACKEND_URL=https://api.sivilkapasite.org` + frontend `NEXT_PUBLIC_API_URL` teyit (avatarUrl/next-image origin) | NUMARASIZ (teyit adımı) | ❓ TEYİT GEREK | "muhtemelen zaten var" — PO panelden teyit edecek |
| `:48-58` | ⚠️ EN KRİTİK: volume **root-sahipli** gelirse uid **1001** yazamaz → foto kaydolmaz; chown 1001 / volume-permission gerekir | NUMARASIZ (doğrulama) | ⬜ AÇIK (PO-manuel) | Container root-olmayan `backend` uid 1001 (Dockerfile) |
| `:53-58` | Redeploy sonrası test: foto yükle → tekrar redeploy → foto duruyor mu (kalıcılık) + yazma izni | NUMARASIZ (=09-DURUM BEKLEYEN "foto volume doğrulama" A22) | ⬜ AÇIK (PO-manuel) | `09-DURUM.md:318` BEKLEYEN listesinde de var |
| `:2` | Üst-etiket: klasör yeri TEYİT "bkz. temizlik haritası" | NUMARASIZ (belge-hijyen) | ❓ TEYİT GEREK | belge `kararlar/` kökünde; INDEX'te 📸 olarak listeli (`00-INDEX:68`) |

## 2. ÇAPRAZ KONTROL SONUCU
- **Numaralı envanterde karşılığı:** Doğrudan numara YOK; canonical'da **çıkış-planı K1** (`00-CIKIS-PLANI.md:47`) + **10-yol E-kuyruğu** (`10-yol-haritasi.md:232`) + **T1-A A22** + **09-DURUM:318 BEKLEYEN** olarak takipte. Tutarlı, kayıp yok.
- **NUMARASIZ niyet:** Tümü PO-manuel operasyon adımı (kod değil) — T1-A A6 "CANLI ÖNCESİ DENETİM LİSTESİ"nin foto-volume ayağıyla örtüşür.
- **Çelişki:** Yok.
- **Hayalet-tamamlanmış:** Yok (henüz yapılmadı; PO'nun canlı-öncesi yapması gereken açık iş).

## KAPANIŞ NOTU (B1)
- 1/1 belge TAM okundu. 6 kalem (hepsi tek bir açık PO-manuel işin adımları: **foto volume kalıcılığı**).
- Yeni NUMARASIZ niyet YOK (mevcut takiple örtüşüyor). Çelişki YOK.
- SEVİYE-1 kalem yok (altyapı/operasyon). DB'ye dokunulmadı, kod değiştirilmedi.
