> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ).

**Son güncelleme:** 2026-09-26 12:35 UTC · çatı main HEAD `a98a45e` · backend main HEAD `c2a9682`

**Durum:** ÇALIŞIYOR

**Şu an yapılan (3 şerit):**
- Şerit 1 (arka plan ajan): AN-30 — kayıt ekranı ayrı rıza kutuları mekanizması (backend enum+migration dosyası UYGULANMADI + servis + uç, frontend flag'li bileşen). Kapsam: yalnız klasik kayıt; OAuth + self-serve KAPSAM DIŞI (ayrı iş olarak kalacak).
- Şerit 2 (arka plan ajan): PS-A1 — OCEAN motoru ölçek hatası düzeltmesi + eksik birim testleri (KARAR-10 aşama 1, kullanıcı etkilenmiyor).
- Şerit 3 (ben): V-16 PR'larının CI'ını izliyorum, sıradaki işe geçiyorum.

**Son merge'ler (bu turda):**
| PR | İş | Canlı kontrol |
|---|---|---|
| çatı #317 | U-01 (mentör "gerçekleşmedi" düğmesi) | ok:true, db:up, site 200 |
| çatı #318 | K-20 (bloksuz mentörde mesaj yolu) | ok:true, db:up, site 200 |

**Açık PR'lar:**
| PR | İş | CI | İnceleme | Neden açık |
|---|---|---|---|---|
| backend #141 | V-16 (`/health.commit`) | pending | — | CI bekleniyor, 🟢 gate, bağımsız inceleme gerekmiyor |
| çatı #319 | V-16 (docker-compose GIT_SHA + kuyruk BITTI güncellemeleri) | pending (Backend/FE geçti, Integration+E2E sürüyor) | — | CI bekleniyor |
| çatı #110 | ⛔ MERGE ETME işaretli (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**Push edilmemiş iş:** yok

**Engeller:** yok (bu turda denetleyici reddi / CI kırmızısı yaşanmadı)

**PO'ya sorular:** yok bu turda (mevcut 56 cevapsız karar kartı duruyor, aşağıya bkz.)

**Strateji katmanına not:**
- U-01 ve K-20 canlı kontrolü GET ile doğrulandı (`/health` ok:true/db:up, site 200) — `docs/otonom/00-KUYRUK.md` ilgili satırlarında kanıt var.
- AN-30 kapsamı BİLEREK dar tutuldu (yalnız klasik kayıt ekranı, flag varsayılan KAPALI) — migration + auth/KVKK dosyası olduğu için merge edilmeyecek, PO onayı bekleyecek.

**Karar kilidi tablosu (etkiye göre, cevapsız 56 karttan en çok iş açanlar):**
| Karar | Konu | Kilitlediği iş sayısı |
|---|---|---|
| KARAR-57 | Mizaç sonucunu hangi test belirlesin | 4 |
| KARAR-45 | Arketip adları: ad↔kod eşlemesi | 4 |
| KARAR-56 | Menti aynı hafta birden fazla mentöre talep gönderebilsin mi | 3 |
| KARAR-68 | Persona/panel belgeleri A/B/C | 2 |
| KARAR-65 | "D mentör + S menti" yasağı menti tarafında da mı | 2 |
| KARAR-62 | İlk ölçüm: herkes aynı senaryo mu, kişiye göre mi | 2 |
| KARAR-61 | Eşleşme formülü + arketip motoru aynı anda mı açılsın | 2 |
| KARAR-59 | Persona kişi adları "Kişi Adı Yasağı"na dahil mi | 2 |
| KARAR-55 | Sertifikada geri bildirim ne zaman gösterilsin | 2 |
| KARAR-30 | İsim değişkeni altyapısı — seed sırası | 1 (I-09) |
| KARAR-95 | Kriz bildirimi kanalı (güvenlik, hukuk değil) | 1 (I-18) |
| KARAR-64 | Kullanıcıya görünen ad: mizaç/karakter/kişilik | 1 |

**Sıradaki 5 iş:**
1. V-16 PR'larını CI yeşil olunca merge et + canlı kontrol
2. AN-30 agent'ının PR'larını al, kuyruğa işle (PR-ACIK, migration → merge yok)
3. PS-A1 agent'ının PR'ını al, bağımsız inceleme başlat, kuyruğa işle
4. Kuyrukta kalan 🟢/🟡 işlerden dosya çakışmayan bir sonrakini seç (K5 yedek havuzuna düşülmedi, ana kuyrukta hâlâ 🟡 aile işleri var)
5. K1 durma koşulu oluşmadıkça devam
