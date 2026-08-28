# MENTİMENTOR / SİVİLKAPASİTE — BELGE HARİTASI (INDEX)
**🔄 YAŞAYAN** (canonical: belge haritası) · **Son güncelleme:** 2026-08-23 · **Amaç:** Projenin kalıcı hafızası. Hangi bilgi hangi belgede.

> ⚠️ GÜNCELLEME (2026-08-23): `docs/kararlar/` ve `docs/raporlar/` alt-klasörlere ayrıldı (git mv, içerik değişmedi).
> Bu INDEX yeni ağaca göre yeniden düzenlendi. Canonical taşıyıcılar (00-INDEX · 09-DURUM · 00-KARAR-TAKIP ·
> 10-yol-haritasi · 10-yol-tamamlananlar) `kararlar/` kökünde kaldı. Alt-klasör tanımları aşağıda "Klasör yapısı"nda.

> Bu belgeler, birden fazla sohbetten toplanan kararların konu bazlı derlemesidir.
> Claude Code / yeni Claude chat'i, ihtiyaç duyduğu konunun belgesini okur — hepsini değil.
> Bu sayede context şişmez.
>
> **Belge düzeni kuralları:** `konu/belge-duzeni-rehberi.md` (canonical — 6 kural: canonical/tür/yaşayan-dondurulmuş/adlandırma/INDEX/işaretleme).
> Etiketler: **🔄 YAŞAYAN** (güncel tutulur) · **📸 DONDURULMUŞ** (o günün fotoğrafı, güncellenmez).

## ▶ BURADAN BAŞLA — yeni gelen okuma yolu (6 adım, sırayla)
Yeni katılan biri (ajan dahil) bu 6 belgeyi bu sırayla okursa 15 dakikada tam resmi görür:
1. **`CLAUDE.md`** (repo kökü) — nasıl çalışıyoruz? (mod/onay, güvenlik, DB uyarıları, submodule/merge kuralları)
2. **`docs/kararlar/00-INDEX.md`** (bu belge) — ne nerede? (belge haritası)
3. **`docs/kararlar/09-DURUM.md`** — bugün ne durumdayız? (ŞU AN ne bitti/ne bekliyor · canonical güncel durum)
4. **`docs/kararlar/00-KARAR-TAKIP.md`** — **arkada ne kaldı?** (açık iş + yarım + ölü kod + uygulanmamış karar, tek bakışta · her oturum başında oku)
5. **`docs/kararlar/10-yol-haritasi.md`** — ne yapılacak? (aktif açık işler + v2 backlog · biten işler: `10-yol-tamamlananlar.md`)
6. **`docs/kararlar/oz-denetim/durum-panosu-2026-08-14.md`** — kararlar nerede? (tek-bakışta renkli statü panosu)

Derin gerekçe gerekince: `konu/01–11` numaralı karar belgeleri + ilgili `raporlar/` keşif fotoğrafı.

## Marka/İsim (netleşti 2026-08-02)
- **Sivilkapasite** = ana marka (canlı: sivilkapasite.org).
- **MentiMentor** = alt-ürün / mentörlük eşleştirme modülü (ilk yayına alınan çekirdek).
- **UniClub** = ESKİ/çalışma adı, artık geçersiz. Daha geniş vizyonun eski adıydı.

## 📁 Klasör yapısı (2026-08-02 · 2026-08-19 · 2026-08-23 alt-klasörlendi)
Tüm dokümanlar `docs/` altında toplandı; proje kökü yalnızca gerçek proje dosyalarını tutar
(`CLAUDE.md`, `PROJECT_STATUS.md` [📸 deprecated — güncel durum 09-DURUM], `package.json`, `docker-compose.yml`, `.gitignore`, `.gitmodules`).

Her alt klasör için **"buraya ne girer"** (tek satır):

```
docs/
├── kararlar/                 → konu bazlı karar/durum belgeleri (canonical hafıza)
│   │                           buraya ne girer: yaşayan canonical taşıyıcılar (00-INDEX · 09-DURUM ·
│   │                           00-KARAR-TAKIP · 10-yol-haritasi · 10-yol-tamamlananlar) kökte durur
│   ├── konu/                 → konu bazlı kalıcı karar belgeleri (01–11 + tasarım/rehber/teslim)
│   │                           buraya ne girer: "şu konuda ne karar verdik" — vizyon, mimari, güvenlik,
│   │                           tasarım, çalışma tarzı, DISC/yaşam-döngüsü, belge-düzeni rehberi
│   └── oz-denetim/           → belgelerin/kararların KENDİ iç denetimi (öz-denetim)
│                               buraya ne girer: belge hijyeni, karar-statü haritası, unutulmuş-niyet
│                               envanteri, durum panosu — "kararlarımız gerçekle uyumlu mu?" fotoğrafı
├── raporlar/                 → bir-kerelik keşif/teşhis/analiz çıktıları (📸 tarihli, dondurulmuş)
│   ├── kesif/                → keşif/teşhis fotoğrafları (repo denetimi, backend envanteri, kapasite,
│   │                           rakip/tema/katılım analizi, teşhis, admin panel tasarımı, belge-mimarisi)
│   ├── kod-denetimi/         → kodun/ürünün GERÇEĞE karşı denetimi (envanter ↔ kod, strateji ↔ kod,
│   │                           kapsamlı denetim, eksik analizi) — "belge ne diyor, kod ne yapıyor?"
│   ├── panel/                → platform ↔ tenant admin panel envanteri + strateji (kardeş çiftler)
│   ├── persona/              → menti/mentör/yönetici persona + sevdirme/metrik belgeleri
│   └── icerik/               → test/değerlendirme içerik arşivi (DISC/SJT/sertifika/öğrenme yolculuğu soru dökümü)
├── devir/                    → oturum devir notları (01–06 set 📸 + 07-oturum-gunlugu 🔄 yaşayan)
└── arsiv/                    → eskimiş/örtüşen/kopya belgeler (silinmedi, tarihsel iz için saklandı)
```

## Belgeler — `docs/kararlar/` (kök · canonical taşıyıcılar 🔄)
| Belge | İçerik | Ne zaman okunur |
|---|---|---|
| `00-CIKIS-PLANI.md` | **Canlı çıkış önceliği** (K0-K5 sınıflandırma + tur planı); "kullanıcı almaya başlamak için ne gerekli" | Çıkış planlaması / öncelik kararı |
| `09-DURUM.md` | ŞU AN ne bitti/ne bekliyor (sık güncellenir) | Oturum başında |
| `00-KARAR-TAKIP.md` | **NE KALDI:** açık iş + yarım + ölü kod + uygulanmamış karar tek bakışta (🔄 canonical takip; kanıtlı, kod-doğrulamalı) | **Her oturum başında** (arkada ne kaldı) |
| `10-yol-haritasi.md` | Aktif iş kuyruğu: üstte açık-işler hızlı-index · v1 (numaralı) · v2 backlog (14-28) | Sıradaki iş kararı |
| `10-yol-tamamlananlar.md` | Biten v1 işlerinin kaydı (özet + PR/tarih; detay 09-DURUM) — 🔄 `10-yol-haritasi`'nın **refakat belgesi**. Alt-klasöre indirilmedi: ayrılırsa "ne kaldı ↔ ne bitti" ikilisi kopar, aynı kök seviyede durması gerek (referans sayısı düşük — 3 — ama canonical bağ güçlü). | "ne bitti" bakışı |
| `dokploy-foto-volume-talimati.md` | Dokploy foto volume kurulum talimatı | 📸 Deploy/foto volume işi |

## Belgeler — `docs/kararlar/konu/` (konu bazlı karar belgeleri)
| Belge | İçerik | Ne zaman okunur |
|---|---|---|
| `01-urun-vizyonu.md` | Ne, kime, iş modeli, fiyatlandırma, modül sırası | Ürün kararı, yön |
| `02-mimari-ve-altyapi.md` | Stack, Neon=canlı DB, deploy, seed/migration kuralları | DB/deploy/altyapı işi |
| `03-psikometri-ve-algoritma.md` | DISC/OCEAN, arketipler, eşleşme formülü, SJT, sertifikasyon | Eşleştirme/skorlama işi |
| `04-guvenlik-ve-kvkk.md` | Tenant izolasyonu, IDOR, P0/P1 riskler, KVKK, sunucu güvenliği | Güvenlik/KVKK işi |
| `05-ozellikler-ve-paneller.md` | Paneller, admin akışları, takvim/feedback, sertifika | Özellik/panel işi |
| `06-tasarim-ux.md` | Tema, landing, tipografi, onboarding, UX | Tasarım/UX işi |
| `07-calisma-tarzi.md` | Prompt felsefesi, DevSecOps şablonu, kurallar | Her prompt öncesi |
| `08-acik-sorular.md` | Karara bağlanmamışlar (yaş, veri sorumlusu vb.) | Karar gerektiğinde |
| `11-tasarim-kararlari-yasam-dongusu-ve-disc.md` | Yaşam döngüsü + DISC gösterim kararları (KARAR 1 DISC çoklu harf/#12 · KARAR 2 ghost red/2a · KARAR 3 kullanıcı çıkarma/2b · KARAR 4 FE tam Türkçe) | #12 / 2a / 2b işine başlarken |
| `belge-duzeni-rehberi.md` | Belge düzeni 6 kuralı (canonical) | 🔄 YAŞAYAN · her belge işinde |
| `tasarim-kararlari-admin-2026-08-11.md` | STK admin tasarım kararları (12 karar; menü, kart, DISC mahremiyet, etiket havuzu) | 🔄 YAŞAYAN (kararlar eklenebilir) |
| `chat-v1-teslim.md` | Chat v1 teslim: mimari/güvenlik ayrıntı + bilinen sınırlar | 📸 DONDURULMUŞ (chat işi) |
| `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` | #7 eşleşme-sonrası değerlendirme + metrik takip + otomatik pasifleştirme + yeniden değerlendirme + periyodik hatırlatma vizyonu; VİZYON ↔ KOD GERÇEĞİ ayrı; 3 aşamalı plan | 🔄 YAŞAYAN (#7 inşasına başlarken) |
| `degerlendirme-sistemi-tasarim-2026-08-27.md` | Değerlendirme + eşleştirme sistemi tasarım belgesi (16 bölüm, iki tur): DISC→Big Five model kararı, metafor arketipler, Likert→senaryo ölçme + çekirdek 12 senaryo, derinleşme, sertifika, eşleştirme algoritması (%45/30/25), üç soru veri boşluğu, süreç/göç/kalibrasyon; Bölüm 16 KALEM LİSTESİ | 🔄 YAŞAYAN (kalemler 00-KARAR-TAKIP'e girecek) |
| `kvkk-metinleri/` (klasör) | ⚠️ **TASLAK** KVKK belge paketi (9 md belge + kapak) — envantere dayalı. **Avukata sunum:** `KVKK-BELGE-PAKETI-2026-08-25.docx` (profesyonel tek dosya; md=canonical, docx=türev — `README.md` + üretici `scripts/kvkk-docx-gen.py`) | ⚠️ TASLAK (hukukçu onayı öncesi) |

## Öz-denetim — `docs/kararlar/oz-denetim/` (belgelerin/kararların iç denetimi)
> "Kararlarımız gerçekle uyumlu mu, belge düzeni sağlıklı mı?" fotoğrafları. Farklı kapsam/tarih — birleştirilmez, çapraz referanslıdır.

| Belge | İçerik | Tür |
|---|---|---|
| `durum-panosu-2026-08-14.md` | Kararların tek-bakışta renkli statü panosu (92 karar; 🟨 az-işle-kazanç öne çıkarılmış) | 🔄 YAŞAYAN (statü panosu) |
| `karar-statu-haritasi-2026-08-14.md` | ~72 kararın 3-boyutlu (plan/kod/çelişki) renkli statü haritası | 📸 DONDURULMUŞ (statü haritası) |
| `belge-aksiyon-denetimi-2026-08-11.md` | 34 belgedeki kararlar gerçekle kıyas (YAPILDI/UNUTULDU/…) | 📸 DONDURULMUŞ (denetim) |
| `belge-denetimi-2026-08-10.md` | 09/10'un gerçekle kıyas denetimi | 📸 DONDURULMUŞ (denetim) |
| `belge-temizlik-haritasi-2026-08-14.md` | 44 belgenin 6-kural taraması (etiket/INDEX/gruplama/bayat haritası) | 📸 DONDURULMUŞ (keşif) |
| `unutulmus-niyet-envanteri-2026-08-10.md` | Dosya:satır kanıtlı unutulmuş niyet envanteri | 📸 DONDURULMUŞ |
| `stk-admin-bulgu-envanteri-2026-08-11.md` | STK admin 13-bulgu keşfi (backend hazır mı / S-M-L) | 📸 DONDURULMUŞ (keşif) |

## Devir belgeleri — `docs/devir/` (2026-08-11 seti + yaşayan oturum günlüğü)
> **⚠️ YENİ DÜZEN (2026-08-20):** Artık her oturum için ayrı dosya AÇILMAZ. Tüm oturum kapanışları tek yaşayan günlüğe
> (`07-oturum-gunlugu.md`) tarih başlıklı bölümler halinde eklenir. Eski `07`+`08` orada birleşti; `08` arsiv/'e taşındı (silinmedi).

| Klasör | İçerik | Tür |
|---|---|---|
| `docs/devir/01–06` | Kontrol katmanı devir seti (felsefe · proje durumu · KVKK · 13-bulgu · bekleyen kararlar · devir kılavuzu). 2026-08-20'de tarihli GÜNCELLEME notlarıyla tazelendi | 📸 DONDURULMUŞ (2026-08-11) + ⚠️ güncelleme notları |
| `docs/devir/07-oturum-gunlugu.md` | **Yaşayan oturum günlüğü** — 2026-08-14 · 2026-08-15 · 2026-08-20 oturum kapanışları + SIRADAKİ İŞ SIRASI + çalışma tarzı. Yeni oturumlar buraya eklenir | 🔄 YAŞAYAN |

> **Canonical eşleşmesi (Kural 1 — devir belgeleri özet/kopyadır, güncel bilgi kararlar/'da):**
> `01`→`konu/07-calisma-tarzi` · `02`→`09-DURUM` · `03`→`konu/04-guvenlik-ve-kvkk` · `04`→`10-yol-haritasi` (A) + `oz-denetim/stk-admin-bulgu-envanteri` · `05`→**`00-KARAR-TAKIP`** + `09-DURUM` · `06`→kendisi (devir prosedürü) · `07-oturum-gunlugu`→`09-DURUM` + `00-KARAR-TAKIP` (özet).

## Raporlar — `docs/raporlar/` (📸 DONDURULMUŞ — keşif/denetim fotoğrafları)
> Bir-kerelik keşif/analiz çıktıları; güncellenmez. Güncel durum daima `09-DURUM.md`'de.
> Konu kümelerine göre alt-klasörlü (kardeş belgeler birlikte okunur).

### `raporlar/kod-denetimi/` — kod/ürün ↔ gerçek denetimi
| Belge | İçerik |
|---|---|
| `tam-belge-taramasi-2026-08-23.md` | 42 içerik belgesi tam okuma + kod çapraz-kontrol (7 paralel ajan); 13 yeni kayıp madde + 3 güvenlik → 00-KARAR-TAKIP Bölüm F |
| `yarim-is-niyet-envanteri-2026-08-23.md` | Yarım-iş/bağlanmamış-kod niyet arkeolojisi (5 paralel ajan); "~14 FE'siz özellik" → 9 doğrulandı → 00-KARAR-TAKIP C.2 |
| `kvkk-veri-aktarim-envanteri-2026-08-25.md` | KVKK kod-kanıtlı veri-aktarım envanteri (barındırma/3.taraf/çerez/veri/saklama/rıza/çelişki); KVKK belge paketinin ön koşulu + 8 hukukçu sorusu |
| `proje-analizi-kapsamli-denetim-2026-08-22.md` | Kapsamlı proje denetimi (madde 38-66 kaynağı) |
| `strateji-gercek-denetimi-2026-08-20.md` | 6 strateji belgesi ↔ kod, 85 madde |
| `tam-envanter-gercek-durum-2026-08-19.md` | Tam envanter — belge niyeti ↔ kod gerçeği |
| `degerlendirme-test-soru-envanteri-2026-08-15.md` | 6 değerlendirme sistemi + yönetici yetki/görünürlük + soru/cevap envanteri (#78) |
| `eksikler-derinlestirilmis-2026-08-15.md` | 7 eksik derin analiz (DISC-yaklaşım 3 seçenek, sertifika 5→20, admin düzenleme UI vb.) (#79) |

### `raporlar/icerik/` — test/değerlendirme içerik arşivi
| Belge | İçerik |
|---|---|
| **`tam-soru-dokumu-2026-08-26.md`** (+ `bolumler/01-05`) ⭐ GÜNCEL | **Kod-kanıtlı TAM döküm** (DISC 32 · SJT 3 · sertifika 20 · öğrenme 13) + puanlama/felsefe analizi + #31 kanıt + sayı çelişkileri + CORE-eşiği + ⏳ canlı-teyit kuyruğu |
| **`sorular-po-inceleme-2026-08-26.md`** + **`eslesme-uyum-po-inceleme-2026-08-26.md`** ⭐ PO | Ürün sahibi işaretleme dosyaları: 68 soru + eşleştirme uyum tablosu (sade, jargonsuz, `[ ] PO notu`) |
| `00-icerik-index.md` + `disc-sorulari` · `sjt-sorulari` · `sertifika-senaryolari` · `ogrenme-yolculugu` · `stk-custom-sorular` (hepsi 2026-08-15) ⚠️ BAYAT | Eski döküm — silinmiş `seed-questions.ts`'e dayanır (⚠️ GÜNCELLEME notlu). Güncel için üstteki 2026-08-26 dökümü |

### `raporlar/kesif/` — keşif/teşhis fotoğrafları (2026-08-02 + 2026-08-19)
| Belge | İçerik |
|---|---|
| `teshis-raporu-2026-08-02.md` | Niyet vs mevcut-kod envanteri, merge runbook, KVKK, güvenlik |
| `admin-panelleri-tasarim-2026-08-02.md` | 6 admin panelinin keşif + tasarım kartları |
| `depo-denetimi-2026-08-02.md` | Repo hijyeni (boş/artık/yanlış-yerleşim/isimlendirme) |
| `hayalet-backend-2026-08-02.md` | Yarım bağlı / ölü / kırık kod envanteri |
| `kart-havuz-backend-envanteri-2026-08-02.md` | Kart/havuz/uyum/niyet-mektubu/foto backend envanteri |
| `kapasite-analizi-2026-08-02.md` | Ölçeklenme/performans önlem raporu |
| `katilim-modeli-mevcut-durum-notu-2026-08-02.md` | Katılım/davet modeli mevcut durum (İŞ 5) |
| `mentor-karti-rakip-analizi-2026-08-02.md` | Menti kart tasarımı rakip analizi |
| `tema-durum-ve-landing-maliyeti-2026-08-02.md` | Tema durumu + landing maliyeti |
| `belge-mimarisi-ve-merge-cozumu-onerileri-2026-08-19.md` | Belge mimarisi + merge-çakışma çözüm önerileri |

### `raporlar/persona/` — persona üçlüsü (birlikte okunur — menti/mentör/yönetici)
| Belge | İçerik |
|---|---|
| `menti-persona-ve-sevdirme-2026-08-02.md` | Menti personası + onboarding/retention |
| `mentor-persona-ve-sevdirme-2026-08-02.md` | Mentör personası + retention |
| `yonetici-persona-ve-metrikler-2026-08-02.md` | Yönetici personası + metrik taslağı |

### `raporlar/panel/` — panel envanteri + strateji (kardeş çiftler: platform ↔ tenant)
| Belge | İçerik |
|---|---|
| `platform-admin-panel-envanteri-2026-08-02.md` | Platform admin paneli mevcut-durum envanteri |
| `stk-yonetici-panel-envanteri-2026-08-02.md` | STK yönetici (tenant admin) paneli envanteri |
| `platform-admin-strateji-2026-08-02.md` | Platform admin paneli ideal hâli |
| `stk-yonetici-strateji-2026-08-02.md` | STK yönetici paneli ideal hâli |

## Belge bilançosu — `docs/raporlar/bilanco/` (📸 4-tur sayım, 2026-08-26)
> Tüm docs 4 turda baştan-sona okundu; her karar/iş/niyet çıkarılıp kod gerçeğiyle çaprazlandı ve tekilleştirildi (**≈259 benzersiz kalem** — ⚠️ 2026-08-27 düzeltme: eski "196" yanlıştı, bkz. `../raporlar/bilanco/kararlar/00-KATLAMA-IZI-2026-08-27.md`).

| Belge | İçerik |
|---|---|
| `belge-bilancosu-2026-08-26.md` | ⭐ NİHAİ RAPOR: toplam sayım + kayıp kalemler (numara adayı) + hayalet-tamamlanmışlar + çelişkiler + tutulmamış sözler + KURAL 8 sağlık notu + PO soruları |
| `karar-defteri-2026-08-26.md` | ⭐ Benzersiz (tekilleştirilmiş) kalemler, kaynak-belgeye göre gruplu, dosya:satır kanıtlı (⚠️ başlık "196" yazar; gerçek tekil ≈259 — `kararlar/00-KATLAMA-IZI-2026-08-27.md`) |
| `kararlar/00-SAYIM-2026-08-27.md` + `00-KATLAMA-IZI-2026-08-27.md` | KONU-bazlı sayım + ikiz katlama izi (259 tekil); Tur-5b karar dosyalarının tabanı |
| `bilanco-po-ozet-2026-08-26.md` | ⭐ Ürün sahibi özeti (sade Türkçe, `[ ] PO notu` satırlı — arkada ne kaldı) |
| `tekrar-onleme-2026-08-26.md` | Kök-neden teşhisi + KURAL 9-12 önerisi (PO onayına; yürürlükte DEĞİL) |
| `bolumler/T1..T4-*.md` (16 dosya) | Ham tur-tur bölüm defterleri (tarihsel iz) |

## Arşiv — `docs/arsiv/`
| Belge | Neden arşivde |
|---|---|
| `SOHBET-KARAR-OZETI-devir.md` | Eski devir/özet belgesi — güncel karar konu/01–10'da |
| `strateji-ve-guvenlik-denetimi.md` | Eski strateji/güvenlik denetimi — güncel güvenlik konu/04'te |
| `09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md` | 09-DURUM + 10-yol-haritası'nın 2026-08-10 öncesi tam hâli (tarihsel) |
| `09-DURUM-gecmis-katmanlar-2026-08-19.md` | 09-DURUM başlığından taşınan istiflenmiş tarih/SHA/PR katmanları (2026-08-19 sadeleştirmesi) |
| `09-DURUM-tamamlanan-isler-arsiv-2026-08-19.md` | 09-DURUM'dan taşınan eski kapanmış oturum kayıtları (2026-08-11 + 2026-08-14) |
| `yol-haritasi-kopya-kayitlar-2026-08-19.md` | 10-yol'da iki kez listelenen madde 30-34 kopyalarının taşındığı yer (asıl v1-D'de) |
| `08-oturum-2026-08-15.md` | Eski devir oturum belgesi; içeriği `devir/07-oturum-gunlugu.md`'ye taşındı (2026-08-20 birleşimi). Tarihsel iz için saklandı |

## ⚠️ En kritik iki gerçek (her zaman hatırla)
1. **Canlı ve lokal AYNI Neon DB'sini paylaşıyor** (`ep-fancy-tooth-ab4u5xhr`). Lokalde DB'ye yazmak = canlıyı etkilemek. Detay: `konu/02-mimari-ve-altyapi.md`.
2. **Tehlikeli `seed.ts`/`npm run seed`/`prisma db seed` veri SİLER** — asla çalıştırma. Detay: `konu/02-mimari-ve-altyapi.md`.

## Kaynak sohbetler (bu belgeler nereden derlendi)
- **Psikometri/algoritma chat'i** → DISC/OCEAN/SJT/sertifikasyon tasarımı (konu/03).
- **Strateji/güvenlik chat'i** → P0/P1 güvenlik riskleri, fiyatlandırma prensibi (konu/04, konu/01).
- **PRD/isim/VPS chat'i** → vizyon, isim, barındırma tartışması (konu/01, konu/02).
- **Mail/panel chat'i** → Resend, platform panel, DB operasyonları (konu/02, konu/05).
- **Bugünkü oturum (2026-08-02)** → tema, teşhis, 5 admin paneli, global seed (konu/05, konu/06, 09).

## Çelişki-çözüm kaydı (2026-08-02)
- **Fiyatlandırma:** "ücretsiz" vs "freemium" → ÇÖZÜLDÜ: şimdilik tamamen ücretsiz, ileride premium (freemium). Aynı şeyin iki aşaması.
- **İsim:** UniClub/MentiMentor/Sivilkapasite → ÇÖZÜLDÜ: Sivilkapasite ana marka, MentiMentor alt-ürün, UniClub geçersiz.
- **Erasmus:** İptal edildi, sosyal girişime dönüldü. Erasmus varsayımlı eski içerik geçersiz.
- **Barındırma:** Eski "VPS mi PaaS mi" tartışması AŞILDI → Neon (DB) + Dokploy (deploy) canlıda çalışıyor.
- **certified/qualityMultiplier konumu:** UserProfile → TenantMembership'e taşındı; eski kod eski yerden okuyor olabilir (teknik risk, bkz. konu/04).
