# 04 — STK ADMİN PANELİ: 13 BULGU (yol haritası A — öncelik yüksek)

> **Amaç:** Ürün sahibinin STK admin panelini test edip çıkardığı 13 bulguyu tek yerde tutmak.
> Kaynak: `10-yol-haritasi.md` (A bölümü, 13 madde tam metin). **İlk adım PLANLA keşfi:**
> her madde için "backend hazır mı / iş boyu S/M/L".
>
> **⚠️ DÜRÜSTLÜK:** Gerçek kod keşfi (S/M/L) **henüz yapılmadı** — bu, sıradaki işin ilk adımı.
> Aşağıdaki backend-hazırlık notları yalnızca yol haritasındaki ipuçlarına dayanır; kesin S/M/L ve
> "backend hazır mı" **keşifle doğrulanacak**. "keşif" işaretli maddeler açıkça doğrulama bekliyor.

---

## 13 bulgu — tam liste + ön değerlendirme

| # | Bulgu | Tür | Backend ipucu (yol haritası) | Ön tahmin* |
|---|---|---|---|---|
| 1 | Giriş ekranı **şifre göster/gizle** butonu yok (+ kayıt + şifre-sıfırlama ekranları) | Frontend | Salt-UI, backend gerekmez | **S** (ucuz kazanım) |
| 2 | Admin **sol menü** sıralama/gruplama gözden geçir | Tasarım kararı | — | Karar (PO) |
| 3 | Havuz tablosu **"Sektörler" kolonu** — çoklu değer nasıl gösterilecek | Frontend + karar | Veri var, gösterim kararı | S-M (keşif) |
| 4 | **DISC gösterimi tek harf** — ikincil/karma tip backend'de tutuluyor mu | Keşif + Frontend | İkincil/karma tip backend'de var mı → **keşif** | S (gösterim) / keşif |
| 5 | Havuz sayfası **layout** | Tasarım kararı | — | Karar (PO) |
| 6 | **Algoritma Kalibrasyon Merkezi çok boş** — sayfa ne göstermeli | Frontend + karar | Ağırlıklar backend'de VAR ama **hardcoded 0.60/0.40** (`05-ozellikler:57`, `08:29`); admin-ayarlanabilir değil | M (keşif) |
| 7 | **Yöneticiler sayfası** işlevi belirsiz | Frontend + keşif | Atama/çıkarma backend'de var: `promote-admin`/`demote-admin`, **max 3** | M (keşif) |
| 8 | **Soru Yönetimi:** ifadelerin puanlama/cevap-tipi görünmüyor | Keşif + Frontend | Puanlama/cevap-tipi backend'de nasıl tutuluyor → **keşif** | M (keşif) |
| 9 | **CORE/DEEPENING İngilizce** — Türkçeleştir | Keşif + Frontend | Enum mu görünüm mü → **keşif** (enum ise DB değeri, dikkat) | S (görünümse) / keşif |
| 10 | Yeni soru formu **cevap tipi (şıklı/açık uçlu) seçimi yok** | Frontend + backend? | Backend cevap-tipi destekliyor mu → keşif (8 ile bağlı) | M (keşif) |
| 11 | Yeni soru formunda **tek seçenekli gereksiz dropdown** | Frontend | Salt-UI temizlik | **S** (ucuz kazanım) |
| 12 | **Etiket Yönetimi:** hazır sistem etiketleri nerede tanımlı | Keşif (teyit) | Sayfa amacı doğru; sistem etiketlerinin tanım yeri → **teyit** | S (keşif) |
| 13 | **Sertifika Konuları:** içerik/senaryo görünmüyor + "kurum ekleyemez" gerekçesi | Keşif + Frontend | `topic1-5` **placeholder mı gerçek mi** → keşif | M (keşif) |

\* Ön tahmin = keşif öncesi kaba tahmin. **Gerçek efor keşifle netleşir.**

---

## Kategori önerisi (keşif sonrası önceliklendirmek için)

### 🟢 Ucuz kazanımlar (muhtemelen S, hızlı değer)
- **#1** şifre göster/gizle (salt-UI, üç ekran).
- **#11** gereksiz dropdown temizliği (salt-UI).
- **#9** CORE/DEEPENING Türkçeleştirme — **ama** enum mu görünüm mü keşfet: enum ise DB/kod değeri,
  körlemesine değiştirme (kırılabilir); sadece görünen etiketse güvenli.
- **#4** DISC ikincil/karma gösterim — backend veriyi tutuyorsa gösterim işi (keşif şart).

### 🟡 Orta işler (M, keşif + kod)
- **#6** Algoritma Kalibrasyon sayfası — ağırlıklar hardcoded `0.60/0.40`; sayfa ne göstermeli/ayarlanabilir mi (karar + kod).
- **#7** Yöneticiler sayfası — `promote/demote-admin` (max 3) backend var; sayfa işlevini netleştir.
- **#8 + #10** Soru cevap-tipi (şıklı/açık uçlu) — backend modeli keşfet, sonra form + gösterim.
- **#13** Sertifika konuları — `topic1-5` placeholder mı gerçek mi keşfet.

### 🔵 Tasarım kararı bekleyen (PO)
- **#2** sol menü sıralama/gruplama · **#5** havuz layout · **#3** sektör kolonu gösterim biçimi.

---

## Nasıl başlanmalı
1. **MOD: PLANLA (keşif).** Model: Sonnet yeterli (çoğu UI/keşif), enum/DB riskli maddede Opus.
2. Admin panel frontend'i + ilgili backend controller'ları oku; her madde için "backend hazır mı /
   S-M-L" tablosunu **gerçek kodla** doldur.
3. Sonra ürün sahibi öncelik versin (ucuz kazanımlar önce mi, yoksa belirli bir sayfa mı).
4. Kod turunda **PR aç, MERGE ETME.** Enum/DB değeri değişecekse (#9 riski) → önce onay.

> ⚠️ **#9 tuzağı:** CORE/DEEPENING bir Prisma enum değeriyse, değeri değiştirmek DB'ye dokunur ve
> mevcut kayıtları kırar. Önce "enum mu, salt görünüm etiketi mi" kanıtla. Belirsizse DUR.
> KVKK paketi (03) ile bu paket paralel iki kuyruk; öncelik sırasını ürün sahibi belirler.
