# 06 — DEVİR KILAVUZU (yeni sohbet: ilk ne yap)

**📸 DONDURULMUŞ** — oturum devir kılavuzu (prosedür; kalıcı referans).

> **Amaç:** Bağlam devri sonrası yeni sohbetin **hatasız kaldığı yerden** devam etmesi. Bu klasördeki
> 6 belge senin hafızan — ama **PR numaraları/SHA'lar devir anına aittir, git'ten doğrula** (bağlam
> dolduğu için hafızaya güvenme; bu projenin "SHA tahmin etme, doğrula" kuralı).
>
> **⚠️ GÜNCELLEME (2026-08-14):** Bu kılavuz + 01–06 seti 2026-08-11 fotoğrafıdır. **Önce
> `docs/devir/07-oturum-gunlugu.md`'yi oku** (en güncel durum + tam bekleyen liste). Güncel git değerleri:
> çatı main `0aaeac7` (#64), backend `afc2769` (senkron), açık PR **#65** (belge temizliği). Aşağıdaki
> "devir anındaki değerler (çatı `da6a138`)" 2026-08-11'e aittir — git'ten doğrula.
>
> **⚠️ GÜNCELLEME (2026-08-20) — YENİ DEVİR DÜZENİ:** Artık **her oturum için AYRI dosya AÇILMAZ.** Tüm oturum
> kapanışları tek yaşayan günlüğe eklenir: **`docs/devir/07-oturum-gunlugu.md`** (eski `07`+`08` orada birleşti; `08`
> arşive taşındı). Yeni sohbetin ilk okuması: **`01-felsefe` → `07-oturum-gunlugu` (en alttaki en güncel bölüm) →
> `09-DURUM.md` → `00-KARAR-TAKIP.md`**, sonra git'ten doğrula. Sıradaki işler: `10-yol-haritasi.md` + `00-KARAR-TAKIP.md` B.4.

---

## İLK TUR — ne yapmalısın (sırayla)

1. **Bu klasörü oku:** `docs/devir/01`→`06`. Önce **01-felsefe** (çalışma disiplini), sonra **02-proje-durumu**.
2. **Güncel durumu belgeden oku:** `docs/kararlar/09-DURUM.md` + `docs/kararlar/10-yol-haritasi.md`
   (bu iki belge her zaman "şu an" + "sıradaki işler"in canonical kaynağı; devir belgeleri onların özeti).
3. **Git'ten DOĞRULA (hafızaya/PR no'lara güvenme):**
   ```bash
   git fetch origin                       # önce fetch (lokal main geride olabilir)
   git log --oneline -5 origin/main       # çatı main nerede
   gh pr list --state open                # çatı açık PR (beklenen: sıfır)
   cd backend && git fetch origin && git log --oneline -3 origin/main && gh pr list --state open
   git submodule status                   # pointer backend main ile senkron mu
   ```
   Devir anındaki değerler (eskiyebilir): çatı main `da6a138`, backend main `afc2769`, açık PR **sıfır**.
   **Farklıysa** araya iş girmiş → 09-DURUM'u ve git'i esas al, bu devir belgelerini değil.
4. **Sıradaki işe başla** (öncelik sırası — ürün sahibi değiştirebilir):
   - **🔴 KVKK iş paketi** (`03-kvkk-is-paketi.md`) — canlı öncesi yasal blocker. K2 (OAuth consent) en somut kod işi.
   - **🔴 13 STK admin bulgusu** (`04-13-admin-bulgusu.md`) — ilk adım keşif (S/M/L henüz yapılmadı).
   - İkisi paralel iki kuyruk; **ürün sahibine hangisiyle başlayalım diye sor** ya da onun yönlendirmesini bekle.

---

## Her turda uygulanacak sabitler (01'den özet)
- **MOD + model** satırı promptun başında. PLANLA (salt-okuma) / BYPASS (PR aç, merge etme) / MANUEL-ONAY (geri-alınamaz).
- **Kanıt iste, "sanırım" yasak.** SHA/PR git'ten doğrula.
- **Üç kırmızı kural:** canlı=lokal aynı Neon (DB'ye yazma = onay) · tehlikeli seed asla · merge kararı PO'da (PR aç, merge etme).
- **Submodule sırası:** backend push → çatı `git add backend` → çatı commit → çatı push (ara commit yok).
- **Push öncesi `npm run verify`;** lokal entegrasyon testi guard'la durursa yeşil sanma → asıl kanıt CI.
- **Kişi adı yok** ("ürün sahibi"). Kullanıcıya görünen metin Türkçe.
- **İş bitince `09-DURUM.md` güncelle** (belge hijyeni; eskiyi silme, arşivle/⚠️ GÜNCELLEME).

---

## Bu 6 belge — hangisini ne zaman kullan

| Belge | Ne zaman |
|---|---|
| **01-felsefe-ve-calisma-tarzi** | Her sohbet başında (nasıl çalışılır: mod, model, kırmızı kurallar, 8-unsur) |
| **02-proje-durumu** | "Ne canlıda / ne tamamlandı / repo yapısı" — mevcut durumu anlamak için |
| **03-kvkk-is-paketi** | Sıradaki kritik iş; KVKK/yasal açıkları ele alırken |
| **04-13-admin-bulgusu** | STK admin panel işlerine geçince (keşif + önceliklendirme) |
| **05-bekleyen-kararlar-ve-manuel** | "Bu karar bekliyor mu / PO manuel mi / unutulmuş niyet mi" bakarken |
| **06-devir-kilavuzu** | Bu belge — ilk tur yol haritası + doğrulama komutları |

---

## Kaynak belgeler (devir belgeleri bunlardan sentezlendi — daha derin kanıt için)
- `docs/kararlar/09-DURUM.md` — canonical "şu an".
- `docs/kararlar/10-yol-haritasi.md` — canonical "sıradaki işler".
- `docs/kararlar/04-guvenlik-ve-kvkk.md` — güvenlik/KVKK ayrıntı.
- `docs/kararlar/unutulmus-niyet-envanteri-2026-08-10.md` — dosya:satır kanıtlı niyet listesi.
- `docs/kararlar/belge-denetimi-2026-08-10.md` — 09/10'un gerçekle kıyas denetimi.
- `docs/kararlar/chat-v1-teslim.md` — chat mimarisi/güvenlik ayrıntı.
- `docs/kararlar/dokploy-foto-volume-talimati.md` — foto volume manuel adımlar.
- `docs/kararlar/07-calisma-tarzi.md` + kök `CLAUDE.md` — çalışma disiplini canonical.
- `docs/arsiv/` — tarihsel geçmiş (eski İŞ 0-8 planı, strateji denetimi).

> **Altın kural:** Bu devir belgeleri **rehber**; çelişki görürsen **09-DURUM + git gerçeği** kazanır.
> Devir belgeleri 2026-08-11 anının fotoğrafıdır.
