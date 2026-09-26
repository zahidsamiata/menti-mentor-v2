> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ).

**Son güncelleme:** 2026-09-26 13:20 UTC · çatı main HEAD `28646d4` · backend main HEAD `7aa8a18`

**Durum:** ÇALIŞIYOR

**Şu an yapılan (2 arka plan ajan, izole worktree'lerde):**
- AN-30 OAuth genişletmesi (`.worktrees/an30` + `.worktrees/an30/backend`) — granüler rıza ekranını OAuth kayıt akışına da taşıyor (aynı PR'lara #142/#320 yeni commit olarak eklenecek).
- GV-08 PR #145 bağımsız incelemesi (`.worktrees/gv08-review`) — anonimleştirme eksik alanları düzeltmesi.

**Son merge'ler (bu turda, en yeniden eskiye):**
| PR | İş | Canlı kontrol |
|---|---|---|
| backend #144 + çatı #321 | K-19/KARAR-7 (toplantı linkini mentör onayda girer) | ok:true, db:up, site 200 |
| çatı #319 + backend #141 | V-16 (`/health.commit`) | ok:true, db:up, site 200 |
| çatı #318 | K-20 (bloksuz mentörde mesaj yolu) | ok:true, db:up, site 200 |
| çatı #317 | U-01 (mentör "gerçekleşmedi" düğmesi) | ok:true, db:up, site 200 |

**Açık PR'lar:**
| PR | İş | CI | İnceleme | Neden açık |
|---|---|---|---|---|
| backend #145 | GV-08 (anonimleştirme eksik alanlar) | bekleniyor | sürüyor (arka plan ajan) | inceleme sonucu bekleniyor |
| backend #143 | PS-A1 (OCEAN ölçek düzeltmesi) | yeşil, mergeable | ONAY (bağımsız) | **PO'nun elle merge etmesi gerekiyor** — izin sınıflandırıcısı "Merge Without Review" ile reddetti |
| backend #142 · çatı #320 | AN-30 (granüler rıza mekanizması, klasik kayıt) | yeşil | ONAY yok, kapsam genişliyor | ⛔ MIGRATION dosyası — ajan asla merge etmez, PO kararı gerekir. OAuth ayağı ekleniyor (bu turda). |
| çatı #110 | ⛔ MERGE ETME işaretli (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**Push edilmemiş iş:** yok

**Engeller:**
- `gh pr merge` iki kez (PS-A1 #143, önceki turda E-3c #313) izin sınıflandırıcısı tarafından "Merge Without Review" gerekçesiyle reddedildi — bağımsız inceleme YAPILMIŞ olsa bile ajan bu PR'ları merge edemiyor.
- ⚠️ **SÜREÇ DERSİ (bu turda yaşandı):** iki bağımsız-inceleme ajanı ana `/home/ajan/menti` checkout'una (izole worktree DEĞİL) dispatch edilmişti; biri lokal test çalıştırmak için branch checkout + stash yaptı, ajanın kendi işiyle çakıştı (00-KUYRUK.md düzenlemem geçici olarak stash'e gitti, kısa süre branch karıştı). Veri kaybı OLMADI (stash'te bulundu, geri alındı) ama bu turdan sonra TÜM inceleme/uygulama ajanları izole worktree'de çalıştırılıyor (`.worktrees/<iş>`). Kural OTONOM-PROMPT.txt'ye eklenmeli (sonraki belge senkron turunda).

**PO'ya sorular:** yok (56 cevapsız karar kartı duruyor, aşağıya bkz.)

**Strateji katmanına not:**
- **PS-A1 (#143) merge için hazır** — CI yeşil, bağımsız inceleme ONAY, `mergeable: MERGEABLE`. Yalnız PO'nun GitHub'dan tıklaması gerekiyor.
- AN-30 kapsamı genişliyor: klasik kayıt BİTTİ, OAuth ayağı bu turda ekleniyor (flag hâlâ varsayılan kapalı). Self-serve kurum kaydı ekranı HÂLÂ kapsam dışı.
- GV-08: KARAR-39'un "yorum ayağı" (MatchFeedback.comment) kasıtlı dışarıda bırakıldı — kart hâlâ cevapsız.
- PO'nun "AN-30 son kalan işlenebilir çıkış blokeri" değerlendirmesiyle ajanın kuyruk okuması bir noktada AYRIŞTI: GV-08, GV-18 ve K-05'in takvim-görünümü ayağı da actionable görünüyordu (KARAR'a bağlı değil). GV-08 bu turda zaten işlendi; GV-18 ve K-05 kalanı sırada.

**Karar kilidi tablosu (etkiye göre, cevapsız 56 karttan en çok iş açanlar — değişmedi):**
| Karar | Konu | Kilitlediği iş sayısı |
|---|---|---|
| KARAR-57 | Mizaç sonucunu hangi test belirlesin | 4 |
| KARAR-45 | Arketip adları: ad↔kod eşlemesi | 4 |
| KARAR-56 | Menti aynı hafta birden fazla mentöre talep gönderebilsin mi | 3 |
| KARAR-39 | Anonimleştirme kapsamı: arketip kopyası + başkasının yorumu | 1 (GV-08 yorum ayağı) |
| KARAR-68 | Persona/panel belgeleri A/B/C | 2 |
| KARAR-65 | "D mentör + S menti" yasağı menti tarafında da mı | 2 |
| KARAR-62 | İlk ölçüm: herkes aynı senaryo mu, kişiye göre mi | 2 |
| KARAR-61 | Eşleşme formülü + arketip motoru aynı anda mı açılsın | 2 |
| KARAR-59 | Persona kişi adları "Kişi Adı Yasağı"na dahil mi | 2 |
| KARAR-55 | Sertifikada geri bildirim ne zaman gösterilsin | 2 |
| KARAR-30 | İsim değişkeni altyapısı — seed sırası | 1 (I-09) |
| KARAR-95 | Kriz bildirimi kanalı (güvenlik, hukuk değil) | 1 (I-18) |

**Sıradaki 5 iş:**
1. GV-08 (#145) incelemesini al, koşullar tamsa merge et + canlı kontrol
2. AN-30 OAuth genişletmesini al, PR'lara ekle, kuyruğu güncelle
3. GV-18 (rıza sürümü kontrolü) veya K-05'in kalan takvim-görünümü ayağını değerlendir
4. Yedek iş havuzuna (K5) düşülmedi — ana kuyrukta hâlâ işlenmemiş 🟡 aile işleri var
5. K1 durma koşulu oluşmadıkça devam
