### KARAR-107 · 🔵 EVET/HAYIR — dondurulmuş "çalışma tarzı" alanının (`interactionStyle`) yazılması kapatılsın mı? (1 işi açar: AN-12)  [🔵 KARANTİNA]
**Kullanıcı ne görür:** Hiçbir değişiklik görmez. Bu alan artık hiçbir ekranda sorulmuyor (2026-08-30'dan beri); yalnız sunucunun 3 kayıt yolu hâlâ kabul ediyordu.
**Ne değişir:** Sunucu, bu alanı kaydetmeyi bırakır (profil güncelleme, kullanıcı oluşturma, profil tamamlama). Veritabanındaki mevcut değerler SİLİNMEZ ve okunmaya devam eder; tablo yapısı değişmez. Neden: senin 2026-08-29 kararın — "interactionStyle DONDURULUR … hiçbir yere yazılmaz" (`docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:574-586`); bugün aynı işi `supportApproach` alanı yapıyor. Eşleştirmedeki ilgili +10 puanlık bonus zaten fiilen çalışmıyor (menti tarafı hiç toplanmıyor) — dokunulmadı.
**Geri alınır mı:** Evet — tek commit geri alınır (`git -C backend revert 11bbb84` + merge commit'i); değişiklik öncesi kodun tamamı `docs/arsiv/silinenler-2026-09-27.md`'de.
**Yedeği alınacak tablo:** YOK — veri değişmiyor, migration yok.
**Durum:** backend #186 (7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/186#issuecomment-5854917286, CI yeşil) · arşiv belgesi çatı #370 (7b 2. tur ONAY https://github.com/zahidsamiata/menti-mentor-v2/pull/370#issuecomment-5854997208 — kırpılmamış tam kod, çalışır geri alma komutu). Silme DEĞİL: gerçek silme ayrıca PO'nun ikinci onayını ister (🔴).
**EVET** → ajan backend #186 + #370'i merge eder, pointer'ı taşır, canlı kontrol yapar.
**HAYIR** → PR'lar kapatılır, gerekçe `02-ILERLEME.md`'ye; alan 3 yolda yazılabilir kalır.
**Cevap vermezsen:** AN-12 PR-ACIK bekler; kullanıcıya etkisi yok.
**CEVAP:**

