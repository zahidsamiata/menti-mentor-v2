### KARAR-134 · 🔵 EVET/HAYIR — kimsenin kullanmadığı 7 yedek sunucu ucu ve 1 ekran parçası kapatılsın mı (karantina)? (1 işi açar: E-4)  [🔵 KARANTİNA]
**Kullanıcı ne görür:** Hiçbir değişiklik görmez. Bu 7 ucu hiçbir ekran çağırmıyor. Her birinin işini bugün başka bir uç yapıyor ve ekranlar zaten o ucu kullanıyor:
- kurumu askıya alma/açma → platform panelindeki "Dondur/Aktifleştir" (`/api/platform/tenants/:id/freeze`, `/activate`)
- onay bekleyen kurumlar listesi → platform panelindeki liste (`/api/platform/tenants/pending`)
- sistem kayıtları → platform panelindeki kayıtlar (`/api/platform/logs`)
- kurum listesi ve kurum ayrıntısı → platform paneli (`/api/platform/tenants`, `/:id/overview`)
- LinkedIn/Instagram bağlantısı düzenleme → profil sayfası (`/api/users/me/profile`)
- çiftin "verimsizlik" sinyali → yönetici eşleşmeler sayfasındaki "Risk" sütunu
- kullanılmayan randevu bileşeni (`MeetingScheduler`) → mentör müsaitlik sayfası + menti randevu sayfası işi kendi içinde yapıyor

**Ne değişir:** Bu 7 uç çağrılırsa artık "kullanımdan kaldırıldı" (410) yanıtı verir ve her çağrı sistem kayıtlarına yazılır (platform paneli › Sistem kayıtları, "Karantinadaki uç çağrıldı"). Kod SİLİNMEZ; yerinde durur. Ekran bileşeni yalnız "kullanma" notuyla işaretlenir. Giriş yapmamış biri eskisi gibi "giriş gerekli" alır — güvenlik kapıları değişmez. Neden: senin KARAR-11 cevabın (A — "önce karantina, bir tur bekle, sonra sil"). Tam liste, her birinin neden yazıldığı ve eski kodun tamamı: `docs/arsiv/silinenler-2026-09-10.md`.
**Geri alınır mı:** Evet, iki yoldan. (1) Kod değişmeden: sunucu ayarına `QUARANTINE_REOPEN=<uç adı>` eklenirse o uç bir yeniden dağıtımla (Dokploy ayarı değişince) geri açılır. (2) Kalıcı: tek commit geri alınır (`git -C backend revert 0c8a97d`; ön yüz işaretleri için arşivdeki tek satırlık komut).
**Yedeği alınacak tablo:** YOK — veri değişmiyor, veritabanı yapısı değişmiyor.
**Durum:** backend PR (dal `otonom/E-4-karantina-20260928`) + çatı PR (aynı dal: arşiv belgesi + ön yüz işaretleri + bu kart). Silme DEĞİL: gerçek silme bir tur sonra ayrı iştir (E-5) ve senin İKİNCİ onayını ister.
**EVET** → ajan iki PR'ı merge eder, pointer'ı taşır, canlı kontrol yapar. Bir tur boyunca sistem kayıtlarına bakılır: bu uçlara hiç çağrı gelmezse E-5'te silme için ikinci onayın sorulur.
**HAYIR** → PR'lar kapatılır, gerekçe `02-ILERLEME.md`'ye; 7 uç açık kalır.
**Ne kaybedersin:** EVET → bu 7 uca doğrudan istek atan (ekran dışı) bir araç ya da betik varsa çalışmayı bırakır; kayıtlarda görünür ve ayarla tek adımda geri açılır. HAYIR → her denetimde "bu eksik özellik mi?" yanlış alarmı sürer, kullanılmayan ama açık duran 7 uç güvenlik yüzeyi olarak kalır, E-5 (silme) başlayamaz; hazır iki PR kapanır.
**Benim önerim:** yok — karantina, silme protokolü gereği senin tek "EVET"ine bağlı bir adım; teknik olarak hazır.
**Cevap vermezsen:** E-4 PR-ACIK bekler, E-5 başlayamaz; kullanıcıya etkisi yok.

**Ayrıca (ayrı soru, bu karar olmadan da yanıtlanabilir):** iki ucun **neden yazıldığı hiçbir belgede yok** — silme protokolü gereği bunlar karantinaya bile alınmadı: `PATCH /api/users/:id/self-profile` (bir kişinin "kendini tanıt" bilgisini numarasıyla güncelleme; işi bugün profil sayfası yapıyor) ve `POST /api/users/:id/temperament-test` (eski mizaç testi; işi bugün DISC testi yapıyor). Bunların da bir sonraki karantina turuna alınmasını istiyorsan CEVAP'a "+ iki uç" yaz; istemiyorsan açık kalırlar.
**İlgili kartlar:** KARAR-11 (cevaplı: A — bu kartın dayanağı) · KARAR-107 (ayrı karantina: `interactionStyle`) · KARAR-40 (eski randevu ucu — bu pakete KATILMADI, kendi kararını bekliyor)
**CEVAP:**
