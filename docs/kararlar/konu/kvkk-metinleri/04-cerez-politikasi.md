> ⚠️ TASLAK (2026-08-25) — HUKUKÇU ONAYI OLMADAN YAYINLANMAZ.
> Kaynak: `../../../raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md` (envanter C-3, kod gerçeği). Sıfırdan yazıldı.

# Çerez Politikası

Bu politika, platformun kullandığı çerezleri ve benzeri istemci-tarafı depolamayı **kod gerçeğine göre** açıklar.

## Şu an kullanılan çerezler (zorunlu / işlevsel — rıza gerektirmez)
| Ad | Amaç | Tür | Ömür | Özellikler |
|---|---|---|---|---|
| `mm_refresh` | Oturumun güvenli şekilde sürdürülmesi (oturum yenileme) | Zorunlu (oturum) | 7 gün | HttpOnly · (üretimde) Secure · SameSite=strict |
| `platform_token` | Platform yöneticisi oturumu | Zorunlu (oturum) | 1 saat | HttpOnly · (üretimde) Secure · SameSite=strict · yalnız `/api/platform` |

> Bu çerezler hizmetin çalışması için **zorunludur**; olmadan giriş yapılamaz. [HUKUKÇU KARARI 6: zorunlu/işlevsel çerezler için rıza gerekmediği teyidi.]

## Çerez olmayan istemci-tarafı depolama (bilgilendirme)
- **Erişim jetonu:** tarayıcı belleğinde (localStorage/cookie DEĞİL) tutulur, sekme kapanınca kaybolur.
- **Tema tercihi (`mm-theme`)** ve **seçili kurum (`X-Tenant-Id`)**: tarayıcı `localStorage`'ında saklanır (işlevsel, kişiyi tanımlamaz).

## Kullanılmayan çerezler (dürüst beyan)
- **Reklam çerezi:** YOK.
- **Analitik/izleme çerezi (Google Analytics, Clarity vb.):** **ŞU AN AKTİF DEĞİL.**

## ⏳ İleride aktifleşecek analitik çerezleri (henüz yürürlükte değil)
> Bu bölüm **bugün geçerli değildir**; analitik altyapı (izleme) devreye alınırsa (ilgili değişiklik onaylanıp yayınlanırsa) güncellenecektir.
- Aktifleştiğinde eklenecek çerezler (örn. GA4/Clarity: `_ga`, `_gid`, `_clck` benzeri) **izleme/analitik** sınıfındadır ve **açık rıza gerektirir**.
- O aşamada: analitik çerezleri **rıza verilene kadar çalıştırılmaz** (Consent Mode benzeri), çerez-izni bandı sunulur, tercih saklanır.
- [HUKUKÇU KARARI 6-devam: analitik çerezleri için gereken rıza mekanizması.] *(Bu iş `00-KARAR-TAKIP` madde 67 + analitik #56/#110 ile bağlıdır ve şu an merge-kilitlidir.)*

## Çerezleri yönetme
Tarayıcı ayarlarından çerezleri silebilir/engelleyebilirsiniz; ancak **zorunlu oturum çerezleri** engellenirse platforma giriş yapılamaz.
