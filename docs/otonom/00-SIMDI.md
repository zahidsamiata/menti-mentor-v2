> Bu dosya ANLIK DURUM FOTOĞRAFIDIR — her güncellemede ÜZERİNE YAZILIR, büyümez. Geçmiş `02-ILERLEME.md`'de.
> Okuma kuralı: OTONOM-PROMPT.txt § Bölüm 14 (UZUN ÇALIŞMA KİPİ).

**Son güncelleme:** 2026-09-26 12:55 UTC · çatı main HEAD `85fd4ac` · backend main HEAD `11ed7dc`

**Durum:** ÇALIŞIYOR

**Şu an yapılan:**
- Şerit 1 (arka plan ajan): K-19/KARAR-7 PR'larının (#144 backend, #321 çatı) bağımsız incelemesi sürüyor.
- Şerit 2-3: boşta — sıradaki işe geçilecek (bu güncellemenin hemen ardından).

**Son merge'ler (bu turda, en yeniden eskiye):**
| PR | İş | Canlı kontrol |
|---|---|---|
| çatı #319 + backend #141 | V-16 (`/health.commit`) | ok:true, db:up, site 200 |
| çatı #318 | K-20 (bloksuz mentörde mesaj yolu) | ok:true, db:up, site 200 |
| çatı #317 | U-01 (mentör "gerçekleşmedi" düğmesi) | ok:true, db:up, site 200 |

**Açık PR'lar:**
| PR | İş | CI | İnceleme | Neden açık |
|---|---|---|---|---|
| backend #144 · çatı #321 | K-19/KARAR-7 (toplantı linki mentörde) | yeşil bekleniyor | sürüyor (arka plan ajan) | inceleme sonucu bekleniyor |
| backend #143 | PS-A1 (OCEAN ölçek düzeltmesi) | yeşil, mergeable | ONAY (bağımsız) | **PO'nun elle merge etmesi gerekiyor** — `gh pr merge` izin sınıflandırıcısı "Merge Without Review" ile reddetti |
| backend #142 · çatı #320 | AN-30 (granüler rıza mekanizması) | yeşil (çatı 382/382, backend guard'lı) | yapılmadı | ⛔ MIGRATION dosyası içeriyor — ajan asla merge etmez, PO kararı gerekir |
| çatı #110 | ⛔ MERGE ETME işaretli (analytics/çerez) | — | — | Dokunulmuyor (kalıcı kural) |

**Push edilmemiş iş:** yok

**Engeller:**
- `gh pr merge` iki kez (PS-A1 #143, daha önce E-3c #313'te de) izin sınıflandırıcısı tarafından "Merge Without Review" gerekçesiyle reddedildi — bağımsız inceleme YAPILMIŞ olsa bile ajan bu PR'ları merge edemiyor. Desen: bir GitHub PR yorum incelemesi bu sınıflandırıcı için "review" sayılmıyor olabilir.

**PO'ya sorular:** yok (56 cevapsız karar kartı duruyor, aşağıya bkz.)

**Strateji katmanına not:**
- **PS-A1 (#143) merge için hazır** — CI yeşil, bağımsız inceleme ONAY, `mergeable: MERGEABLE`. Yalnız PO'nun GitHub'dan tıklaması gerekiyor (ajan izin sınıflandırıcısı tarafından engellendi).
- AN-30 (#142/#320) kapsamı BİLEREK dar (yalnız klasik kayıt, flag kapalı) — OAuth + self-serve kapsam dışı, migration nedeniyle merge de PO kararı bekliyor.
- Kurtarma envanteri yapıldı: eski worktree'lerin hiçbirinde kayıp iş yoktu (hepsi zaten merge edilmiş dallardı).

**Karar kilidi tablosu (etkiye göre, cevapsız 56 karttan en çok iş açanlar — değişmedi):**
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
1. K-19 PR'larının (#144/#321) inceleme sonucunu al, koşullar tamsa merge et + pointer bump + canlı kontrol
2. Kuyrukta kalan 🟢/🟡 işlerden dosya çakışmayan bir sonrakini seç (AŞAMA A/B/U/V taranacak)
3. AN-30/PS-A1 için PO'nun elle yapması gerekenleri 03-PO-ELLE-ISLER.md'de görünür tut
4. Yedek iş havuzuna (K5) düşülmedi — ana kuyrukta hâlâ işlenmemiş 🟡 aile işleri var, önce onlar
5. K1 durma koşulu oluşmadıkça devam
