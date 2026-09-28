### KARAR-128 · 🔵 EVET/HAYIR — Durum alanlarını (13 alan) veritabanında da "yalnız bilinen seçenekler" yapalım mı? (1 işi açar: AJ-77) [🔵 MIGRATION]
**Şu an ne var:** Kurum kurulum adımı, görüşme sonrası kısa anket cevapları, şikâyet nedeni/durumu, mentörlük anlaşması sıklık/kanal/gündem sahibi, davet şablonu rol/biçimi gibi 13 alan veritabanında serbest metin olarak tutuluyor (5 tablo: Tenant · MeetingCheckIn · UserReport · MentorshipAgreement · InvitationTemplate). Uygulama bugün doğru değerleri yazıyor (her yazma yolu doğrulamadan geçiyor), ama veritabanının kendisi yanlış bir değeri de kabul eder. Kanıt: `docs/raporlar/kod-denetimi/aj77-durum-alanlari-envanter-2026-09-28.md` §1-2 · backend PR #227 (`prisma/migrations/20260928000000_durum_alanlari_enum/migration.sql`) · 7b ONAY https://github.com/zahidsamiata/menti-mentor/pull/227#issuecomment-5865731487.
**Ne değişir:** Bu 13 alan için seçenek listesi tek yerde (şemada) tutulur; veritabanı listede olmayan değeri reddeder. Veri silinmez, değerler aynen dönüştürülür.
**Kullanıcı ne görür:** Hiçbir şey — formlar aynı seçeneklerle çalışır. Kazanç: bir hata ya da elle müdahale yanlış bir değeri kalıcı yazamaz; raporlar ve filtreler bozuk değerle karşılaşmaz.
**Nasıl yapılır (sıra ŞART):** (1) tek seferlik salt-okuma sorguları — rapor §3a (değer dağılımı) ve §3b (listede olmayan değer sayısı) → §3b'de her satır 0 olmalı; değilse merge YOK (migration açılışta hata verir ve backend AÇILMAZ) · (2) tarihli yedek (rapor §6) · (3) merge → Dokploy açılışta migration'ı uygular · (4) canlı kontrol.
**Yedeği alınacak tablolar:** Tenant · MeetingCheckIn · UserReport · MentorshipAgreement · InvitationTemplate → `<tablo>_yedek_YYYYMMDD` + satır sayısı eşitliği (rapor §6). Yedek adı + satır sayısı 02-ILERLEME'ye.
**Geri alınır mı:** Evet — geri alma SQL'i rapor §5'te (alanlar serbest metne döner) + kod revert; veri kaybı yok.
**Migration:** VAR (⛔ merge = canlı DB değişikliği). Tek seferlik DB erişimi gerekiyor (VPS'te yok).
**Seçenekler:**
- **EVET** · Kullanıcı ne görür: hiçbir şey · Kazanç: veri bütünlüğü veritabanı seviyesinde güvence altında; seçenek listesi tek yerde · Kaybedersin: bir kez canlı DB'ye şema değişikliği (sayım + yedekle sınırlı); ileride yeni bir seçenek eklemek küçük bir migration ister · Süre: S (sorgu + yedek + merge) · Geri alınır: evet · Migration: var
- **HAYIR** · Kullanıcı ne görür: hiçbir şey · Kazanç: canlı DB'ye dokunulmaz; yeni seçenek eklemek yalnız kod değişikliği · Kaybedersin: yanlış değer yazımı veritabanında engellenmez; PR kapatılır · Süre: — · Geri alınır: — · Migration: yok
**Benim önerim:** EVET — kullanıcıya görünen etkisi yok, geri alınabilir ve veri kaybı yok; §3b = 0 şartıyla.
**Not (ayrı ürün sorusu, bu karta dahil değil):** `Tenant.plan` (paket) alanı migration'a KONMADI — paket kümesi (FREE/PRO/…) gelir modeli kararına bağlı → KARAR-119.
**Cevap vermezsen:** AJ-77 PR-ACIK kalır; başka iş kilitlenmez.
**İlgili kartlar:** KARAR-35 (§3b ön sayımı salt-okuma DB iznine bağlı) · KARAR-119 (`Tenant.plan` paket alanı bu migration'ın dışında, gelir modeline bağlı)
**CEVAP:**
