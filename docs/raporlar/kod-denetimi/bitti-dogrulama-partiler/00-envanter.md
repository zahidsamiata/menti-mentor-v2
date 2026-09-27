# BITTI son doğrulama — ENVANTER (A.1) · 2026-09-27

Kaynak: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` + `docs/otonom/00-KUYRUK.md` @ çatı `191a256`. Seçim: tablo satırının **Durum** hücresinde (üstü çizili `~~…~~` kısım atılarak) `BITTI` geçen satırlar; Durum'u `→` ile başlayan (katlanmış) satırlar hariç. Ek: aktif kuyrukta Durum'u BITTI olmayan ama Not'unda alt kalem için `BITTI` yazan 4 birim (E-3b · E-3d · E-3e · GV-12).

**Sayım:** 205 satır (arşiv 200 + aktif 5) · 204 benzersiz kimlik (`K-20` iki AYRI işte kullanılmış: arşiv :51 belge senkronu = K-20a, :172 bloksuz mentör = K-20b — ikisi de ayrı doğrulandı) · + 4 alt kalem = **209 doğrulama birimi**. Kısmen/onay-bekliyor notlu: V-16 · YN-13 · AN-10 (Durum'da "kısmen") + IC-10 · AN-05 ("metin yazıldı — onay bekliyor") + GV-12 (Durum ATLANDI(karar), notta BITTI).

**Ön sayımla fark:** strateji ön sayımı arşivde ~199 → bu sayım 200 satır / 199 kimlik (tutarlı). Aktif kuyrukta ön sayım 9 (AN-05, AN-10, E-3, GV-12, GV-17, IC-10, V-16, Y-11, YN-13) → Durum hücresine göre 5 (AN-05, AN-10, IC-10, V-16, YN-13). Fark: E-3 (Durum BEKLIYOR; alt kalemler E-3b/d/e notta BITTI → 3 ayrı birim olarak eklendi) · GV-12 (Durum ATLANDI(karar); notta "BITTI (doc-senkron)" → eklendi) · GV-17 (Durum BEKLIYOR; notta geçen "K-12 (BITTI)" başka işe atıf — K-12 arşivde ayrıca doğrulanıyor) · Y-11 (Durum BEKLIYOR; satırda BITTI/bitti ifadesi bulunamadı — `grep -io bitti` boş). PO haftalık sayımı 233: bu envanterle birebir eşlenemedi — ❓ TEYİT (PO sayımının yöntemi repoda yazılı değil). Bilinen fark kaynakları: (i) aynı satıra katlanmış ek kapanışlar (satırda kimlik olarak geçen ama kendi satırı olmayan: AN-10b · F-28b · KR-19b · K-05b); (ii) **kuyrukta hiç satırı olmayan merge edilmiş işler** — 00-SIMDI "Son merge'ler"de geçen Y1-B9 (#165/#344) · Y1-B9b (#166/#345) · Y1-B9c (#167/#346) · Y3b (#170/#352) · K5-Y3 (#169/#351): arşivde ve aktif kuyrukta satır kimliği olarak 0 eşleşme (`grep "^| *<id> *|"`); (iii) PR-AÇIK/🟡 satırlarda kod kısmı merge edilmiş işler (F-05 kod kısmı #183/#367). (ii) ve (iii) bu doğrulamanın kapsamı DIŞINDA (Durum=BITTI satırı yok) — raporda ayrıca listelenir.

Risk sınıfı: R1 = auth/yetki · kurum izolasyonu · KVKK/rıza · matching/skorlama (OTONOM-PROMPT 7b hassas dosya) · R2 = kullanıcıya görünen davranış/ekran · R3 = belge/altyapı/test-only. Dağılım: **R1 63 · R2 96 · R3 50**. Mutasyon kapsamı: R1'in tamamı (63) + R2'den rastgele 15 (tohum 20260927): AJ-06 · AN-39 · F-04 · F-15 · F-22 · F-27 · F-33 · I-04 · IC-02 · KR-12 · P-12 · U-01 · U-07 · V-07 · Y-06.

| # | Birim | Risk | Kaynak satır | PR (satırda geçen) | Kısmen | Mutasyon | Parti | Başlık (kısa) |
|---|---|---|---|---|---|---|---|---|
| 1 | GV-01 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:16` | #87 |  | evet | 01 | ⛔ Puanlama geri bildiriminde kimlik istemciden alınıyor — bir kullanıcı tanımadığı iki kişinin mentörlük ilişk |
| 2 | GV-02 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:17` | #87 |  | evet | 01 | ⛔ Görüşme değerlendirmesine sahiplik kapısı yok — herkes başkasının görüşmesine puan yazabiliyor. Hedef mentör |
| 3 | I-02 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:23` | — |  |  | 05 | madde 141 — karakter kartı üç sorudan ÖNCE gösteriliyor, karar tersini söylüyor. Kullanıcı ödül anını form dol |
| 4 | I-03 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:24` | — |  |  | 05 | madde 150 — sınavı geçemeyen zayıf konusunu ÖĞRENMİYOR. Sonuç ekranı yalnız sayı basıyor ("Pekiştirilecek konu |
| 5 | I-06 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:25` | — |  |  | 05 | madde 160 — iptal edilmiş karar hâlâ geçerli görünüyor. "İsimler unisex, karşı taraf isimsiz" kararı iptal edi |
| 6 | K-01 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:31` | #176 |  |  | 05 | Submodule pointer re-bump. Çatı main'deki backend pointer `02129fe`, backend main HEAD `1304790`. İçerik aynı, |
| 7 | K-02 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:32` | #179 |  |  | 05 | /disc-test boş sayfa. "DISC Testini Güncelle" → sayfa yükleme iskeletinde takılıyor. Üç şıktan hangisi: istek  |
| 8 | K-03 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:33` | #191 |  |  | 05 | Müsaitlik çoklu aralık. Pzt + Cuma eklenince yalnız Cuma kalıyor. Backend diziyi olduğu gibi yazıyor (meetingC |
| 9 | K-04 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:34` | #229 #85 |  |  | 05 | Fotoğraf yükleme sunucu hatası. ÖNCE `docs/kararlar/dokploy-foto-volume-talimati.md` oku. Kod mu (dizin/izin/h |
| 10 | K-07 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:35` | #177 |  |  | 05 | Şık harfleri. Şıklar karıştırılıyor, A/B/C/D harfleri orijinal sıraya yapışık kalıyor. Karıştırmadan SONRA yen |
| 11 | K-09 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:36` | #178 |  |  | 05 | Menti panelinde sabit sıfır kartlar. Gerçek veriye bağla; veri kaynağı yoksa kartı kaldır. Hangisi yapıldı → N |
| 12 | K-11 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:37` | #230 |  |  | 05 | Tenant-admin şikayet inceleme paneli. `GET/PATCH /admin/reports` var, UI yok → şikayet döngüsü kapanmıyor. Lis |
| 13 | K-12 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:38` | #220 |  | evet | 01 | KVKK insan-okunur veri özeti. Mevcut `/users/me/data-export` çıktısını okunur sayfada göster (ham JSON değil). |
| 14 | E-1 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:44` | — |  |  | 05 | NİYET ARKEOLOJİSİ (salt-okuma, sınırsız paralel alt-ajan). Her kalem için: (1) ne yapıyor, (2) neden yazılmış  |
| 15 | E-2 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:45` | — |  |  | 05 | TRİYAJ. E-1 çıktısındaki her kalemi dört kovadan birine koy: BAĞLA (gerçek ürün boşluğu, kullanıcıya değer) ·  |
| 16 | K-20a | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:51` | #180 |  |  | 05 | Belge senkronu — TEK commit, EN SON. 09-DURUM (yeni bölüm en üste) · 00-KARAR-TAKIP (yalnız bu turda değişenle |
| 17 | F-06 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:57` | #215 #81 |  |  | 05 | Denetim izi hata yakalama (G1-14). Kalibrasyon audit yazımı `void logger.info('AUDIT',...)` (fire-and-forget)  |
| 18 | F-10 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:58` | — |  |  | 05 | Havuz kartı FE (G4-01). Backend rol-ayrımlı select ~%90 hazır; menti-yönü havuz kartı FE tasarımı yok (B10.3). |
| 19 | F-13 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:59` | — |  |  | 05 | Sertifika soru-ekleme gerekçe belgesi (G3-05). Kısıt kodda ✅ (kurum sertifika sorusu ekleyemez); "neden" gerek |
| 20 | F-15 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:60` | #228 |  | evet | 05 | Bekleme anı (G4-22+G4-23). Bekleyen mentiye öğrenme+DISC+umut sinyali ("N kişi bekliyor, mentörler geliyor") i |
| 21 | F-16 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:61` | #228 |  |  | 05 | Menti özgüven sunumu (G4-24). DISC sonucu tüm rollere ortak; menti-özel "güçlü yanların" tonu yok. |
| 22 | F-19 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:62` | #231 |  |  | 05 | Proaktif kırmızı uyarı (G4-31). `pairSignal` GREEN/YELLOW/RED var ama ikili-görüşme sağlığı için; yöneticiyi h |
| 23 | F-20 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:63` | #218 |  |  | 05 | Bildirim izni (G5-04). Bekleme salonunda `Notification.requestPermission` istemi hiç yok. |
| 24 | F-22 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:64` | #226 |  | evet | 05 | Görüşme-tamamlama paylaşım kartı (G4-39). "Görüşme tamamladım 🎉" paylaşılabilir kutlama kartı yok (DISC sonuç  |
| 25 | F-25 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:65` | #227 #84 |  |  | 06 | Mail gerçek probe (G4-14). Sistem sağlığı mail göstergesi yalnız config-var'a bakıyor; gerçek gönderim testi y |
| 26 | F-26 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:66` | — |  |  | 06 | `.env.example` eksik değişken (G4-17). `PLATFORM_ADMIN_EMAIL` örnek env dosyasında yok. |
| 27 | F-27 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:67` | #229 #86 |  | evet | 06 | N+1 konuşma listesi (G6-01). `listConversations` her konuşma için ayrı count+findFirst; pagination yok. |
| 28 | F-29 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:68` | #219 |  |  | 06 | SEO teknik paketi (G7-03). sitemap/robots/metadataBase/OG-image yok; `lang="tr"` (tr-TR değil). |
| 29 | F-30 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:69` | #206 |  |  | 06 | Bayat yorum temizliği (G10-22). `LoginForm.tsx:7` "Sprint 14'te tam entegrasyon" bayat yorumu. |
| 30 | P-00 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:75` | #192 #73 |  | evet | 01 | ⭐ GÜVENLİK: k-anonimlik eşiği yalnız FRONTEND'de. `GET /api/users/mentor-count` ham sayıyı koşulsuz dönüyor; N |
| 31 | P-01 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:76` | #190 |  |  | 06 | Menti mentörünün adını göremiyor. "Görüşmelerim"de tarih+durum var, kiminle görüşeceği YOK. |
| 32 | P-02 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:77` | #211 |  |  | 06 | "Gönderilen Talepler" kartı sayfa yenilenince sıfırlanıyor. Dün 5 talep gönderen bugün "0" görüyor. |
| 33 | P-03 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:78` | #209 |  |  | 06 | DISC "özgüven aşısı" tek seferlik — panelde/testte rapel yok. Kayıt sonrası arketip+güçlü yön kartı bir daha g |
| 34 | P-07 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:79` | #214 |  |  | 06 | Küçük başarı/kilometre taşı kutlaması yok. Menti 1. ve 10. görüşmede aynı jenerik "🎉 Teşekkürler". "İlk görüşm |
| 35 | P-09 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:80` | #210 |  |  | 06 | Mentör boş paneli kayıp + mesaj boş durumu menti ağzıyla. Yeni mentör: 4× "—" + kaybolan talep kartı + çıplak  |
| 36 | P-10 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:81` | #89 |  |  | 06 | Mentör bildirim/e-posta ulaşmıyor. Talep tetikleyicisi var ama push STUB; canlı booking yolu (`/meetings/book` |
| 37 | P-11 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:82` | #222 #223 #82 |  |  | 06 | Emek "kaç saat" görünmüyor. "Kaç menti/görüşme" var, "kaç saat mentörlük" yok; "bu dönem" çerçevesi yok, dört  |
| 38 | P-12 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:83` | #222 #223 #82 |  | evet | 06 | Sertifika rozeti kalıcı değil. Sertifikalı mentör ertesi gün panelde hâlâ "Sertifikaya başla →" görüyor. |
| 39 | P-13 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:84` | #222 #223 #82 |  |  | 06 | "Şu an kime mentörlük yapıyorum" listesi panelde yok. "Aktif Mentilerim" yalnız sayı; menti listeleyen bileşen |
| 40 | P-14 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:85` | #216 |  |  | 06 | Mentöre takdir/teşekkür cümlesi yok. "Kendi etkim" tamamen sayısal; emeği anlatan tek cümle yok (tek olumlu dö |
| 41 | U-02 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:91` | #201 |  |  | 06 | Toplantı linki hiçbir ekranda görünmüyor. `locationUrl/locationText/phoneNumber` 3 alana yazılıyor, 0 yerde re |
| 42 | U-03 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:92` | #204 |  |  | 06 | Davet ekranı sessiz + kurum adı boş. `/admin/invite`'ta `setMsg` tanımlı ama hiç çağrılmıyor (403'ler görünmez |
| 43 | U-04 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:93` | #224 |  |  | 06 | Kurum onay/ret durumu uygulama-içinde sessiz. Bekleme ekranı e-posta sözü veriyor ama bildirim bayrağı kapalı  |
| 44 | U-05 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:94` | — |  |  | 06 | Yeni kurum başvurusunda platform admin'e bildirim yok. `selfServeRegister` gövdesinde 0 bildirim çağrısı → PO  |
| 45 | U-07 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:95` | #202 |  | evet | 06 | LOCAL PENDING kullanıcı `/pending-approval`'da kendi e-postasını boş görüyor (token yok → `user` null). |
| 46 | U-09 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:96` | #203 |  |  | 06 | Sıfır-kullanıcılı admin panelinde "davet et" yönlendirmesi yok + yanıltıcı metin. `approvals` boş durumu "🎉 Tü |
| 47 | U-10 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:97` | #13 #210 #221 |  |  | 07 | 4 ekranda boş-durum hiç ele alınmamış: `admin/questions`, `admin/certification`, mentör toplantı talepleri kar |
| 48 | U-11 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:98` | #205 |  |  | 07 | Davet süresi üç yerde üç farklı: ekran "90 gün", panel "30 gün", kod 30 gün; `INVITATION_TOKEN_EXPIRY` ölü aya |
| 49 | U-14 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:99` | #18 #212 |  |  | 07 | Süresi dolmuş davet/sıfırlama ekranlarında "yeni link iste" düğmesi yok (REJECTED akışında var — şablon hazır) |
| 50 | U-16 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:100` | #20 #223 #83 |  |  | 07 | `emailService.send()` başarı/başarısızlık bilgisini çağırana hiç vermiyor → iki yanlış rapor: `feedbackControl |
| 51 | V-01 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:106` | #227 #84 |  |  | 07 | `SMTP_HOST` boşsa/hatalıysa tüm mailler sessizce atılıyor — çağıran katman `void`/`.catch`, dönüş değeri kontr |
| 52 | V-02 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:107` | #227 #84 |  |  | 07 | 500'ler + süreç çöküşü teşhis edilemiyor — hata kaydında endpoint/kullanıcı/kurum yok (E1); `uncaughtException |
| 53 | V-03 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:108` | #76 |  | evet | 01 | 🔴 IDOR: `POST /api/mentors/:mentorId/visibility-optin` sahiplik kontrolü yok — başkası adına opt-in yazılabili |
| 54 | V-04 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:109` | #10 #77 |  |  | 07 | 🔴 `/health` DB'ye bakmıyor ama Docker healthcheck onu kullanıyor + frontend `depends_on: service_healthy` → ya |
| 55 | V-07 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:110` | #11 #16 #79 |  | evet | 07 | `POST /api/meetings/reminders/send` sınırsız toplu mail — görüşme başına 2 mail, batch/cooldown yok → kurum sp |
| 56 | V-08 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:111` | #13 #17 #225 |  |  | 07 | `BACKEND_URL` backend'e geçirilmiyor → `backendBaseUrl = FRONTEND_URL` olur → avatar public URL'leri + KVKK zo |
| 57 | V-09 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:112` | #15 #19 |  |  | 07 | CLAUDE.md "kasıtlı public uç" listesi kodla uyuşmuyor — listede olmayan 11 public uç (+`/uploads`). Özellikle  |
| 58 | V-10 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:113` | #16 #20 #78 |  | evet | 01 | `GET /api/users/:id/export` rate limitsiz — ikizi `/me/data-export` 5/dk korunuyor; `:id`'ye kendi ID'sini yaz |
| 59 | V-11 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:114` | #17 #227 #84 |  |  | 07 | `CRON_ENABLED=false` yazılırsa 8 iş sessizce durur (varsayılan AÇIK ✅) — KVKK imhası, anlaşma yenileme, geri b |
| 60 | V-12 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:115` | #197 #20 #22 |  |  | 07 | 🔴 Frontend'de sıfır gözlemlenebilirlik — error boundary 0, `not-found.tsx` 0 → React render hatası = beyaz ekr |
| 61 | V-13 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:116` | #26 #80 |  | evet | 01 | `POST /api/tags/suggest` `requireTenant`sız mount → her zaman 401 (fail-closed ölü uç). |
| 62 | V-14 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:117` | #227 #28 #84 |  |  | 07 | `.dockerignore` migration `.sql`'lerini eliyor ama `Dockerfile` `migrate deploy` çalıştırıyor → boş DB'ye kurt |
| 63 | Y-01 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:123` | #248 #88 |  | evet | 01 | `ALLOWED_ORIGINS` boşluk toleransı yok. `.split(',')` trim etmiyor → env'de virgülden sonra boşluk varsa o ori |
| 64 | Y-06 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:124` | — |  | evet | 07 | madde 58 — Footer yalnız ana sayfada; yasal linkler ÖLÜ METİN. "Gizlilik Politikası"/"Kullanım Koşulları" `<sp |
| 65 | IC-02 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:130` | — |  | evet | 07 | Davet şablonunda tek cümlede iki yazım ("mentörlük … mentor"). Yöneticinin kopyalayıp kurum DIŞINA gönderdiği  |
| 66 | IC-04 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:131` | — |  |  | 07 | Sertifika sonuç ekranı YANLIŞ SEBEP gösteriyor. Backend 4 eleme sebebi döndürüyor, ekran yalnız 1'ini tanıyor. |
| 67 | KR-01 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:139` | #267 #91 |  |  | 07 | ⛔ Veri silen seed komutuna koruma (rapor C1). Ayrıntı public repoda yazılmaz; tehlikenin genel tanımı `CLAUDE. |
| 68 | KR-02 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:140` | #268 #92 |  | evet | 01 | Sayfa yenilenince (F5) oturum düşüyor (rapor A1). Sessiz yenileme kullanıcı bilgisini yüklemiyor. |
| 69 | KR-03 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:141` | #268 #92 |  |  | 07 | Kurum markası (logo/renk) giriş yapmış kullanıcıda yüklenmiyor (rapor A2). Frontend yalnız platform yöneticisi |
| 70 | KR-04 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:142` | #269 #96 |  | evet | 01 | Psikometrik ön izleme ucunda kurum kapsamı hatalı (rapor B4). Ayrıntı rapora kapanışta eklenir. |
| 71 | KR-06 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:143` | #103 #276 |  |  | 07 | Profil kaydı LinkedIn/Instagram bağlantılarını siliyor (rapor A3). Profil yüklenirken iki alan gelmiyor, kayıt |
| 72 | KR-07 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:144` | #133 |  | evet | 01 | Ağırlık ayarı 0-10 memnuniyet puanını 0-100 eşikleriyle yorumluyor (rapor A4). |
| 73 | KR-09 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:145` | #275 #282 |  |  | 07 | Platform panelinde ret penceresinde "İptal" de kurumu reddediyor (rapor A6). |
| 74 | KR-10 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:146` | #271 |  |  | 07 | Müsaitlik ekranı yükleme hatasından sonra kaydedilirse blokları siliyor (rapor A7). |
| 75 | KR-12 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:147` | #270 |  | evet | 08 | Randevu ekranında müsaitlik uyarısı 3 saat kayık (rapor A9). Kontrol UTC ile, backend İstanbul saatiyle. |
| 76 | KR-13 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:148` | #105 #283 |  |  | 08 | `cron-probe` betiği test veritabanı koruması olmadan gerçek temizlik çalıştırıyor (rapor C2). |
| 77 | KR-14 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:149` | #150 #329 |  |  | 08 | Test veritabanı koruması aynı canlı DB'nin farklı adresiyle atlanabiliyor (rapor C3). |
| 78 | KR-15 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:150` | #277 |  |  | 08 | Uçtan uca test koruması lokalde yalnız uyarı veriyor (rapor C4). |
| 79 | KR-16 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:151` | #161 #341 |  |  | 08 | Prisma CLI canlı imajda yok; her açılışta sürümsüz indiriliyor (rapor C5). |
| 80 | KR-17 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:152` | #108 #289 |  |  | 08 | Aynı saate iki randevu onaylanabiliyor (rapor D2). |
| 81 | KR-18 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:153` | #104 #283 |  |  | 08 | Yenilenen anlaşma "aktif" listesinden düşüyor (rapor D3). |
| 82 | KR-19 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:154` | #149 #168 #327 #348 |  | evet | 01 | Yöneticinin koyduğu çift engeli tek yönde uygulanıyor (rapor D4). |
| 83 | KR-21 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:155` | #154 #336 |  |  | 08 | Kurumun seçtiği rapor sıklığı okunmuyor, ayar hep haftalık çalışıyor (rapor D6). |
| 84 | KR-22 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:156` | #330 |  |  | 08 | `verify.sh` CI ile birebir aynı değil (rapor D7). |
| 85 | KR-23 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:157` | #124 #272 #306 |  |  | 08 | Kurum kaydında "kurulum tamamlandı" işareti ayrı istekle yazılıyor (KARAR-81 boşluğu). Kayıt başarılı olup işa |
| 86 | I-04 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:163` | #264 #90 |  | evet | 08 | madde 149 — sınavda 4 kritik konu garantisi TASARLANMIŞ mekanizmayla değil, tesadüfen sağlanıyor. Çekim/örnekl |
| 87 | I-05 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:164` | #264 #278 #90 |  |  | 08 | madde 156 — görüşme sıklığı yalnız anlaşma sayfasında. Profilde ve bekleme metninde görünmüyor. |
| 88 | I-07 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:165` | #264 #90 |  |  | 08 | madde 157 — yanlış yapılan konu tekrar sınavda MUTLAKA gelmiyor. Ağırlıklı öne alma var, zorunluluk ve "diğer  |
| 89 | K-05 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:171` | #316 #322 #350 |  |  | 08 | Menti randevu — migration'sız yarısı. Müsaitlik formdan ÖNCE gösterilsin; menti serbest tarih yerine mevcut ar |
| 90 | K-20b | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:172` | #316 #318 |  |  | 08 | Bloksuz mentörde backend HER randevu talebini reddediyor, frontend "gönderebilirsiniz" diyor — davranış uyuşma |
| 91 | K-06 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:173` | #288 |  |  | 08 | Öğrenme yolculuğu — diğer şıkların açıklaması. Şu an yalnız seçilenin açıklaması görünüyor. |
| 92 | K-08 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:174` | #115 #290 |  |  | 08 | Sosyal alan doğrulaması. LinkedIn alanına YouTube linki kaydedilebiliyor. FE+BE platform doğrulaması (`/api/us |
| 93 | K-10 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:175` | #287 |  |  | 08 | Dark mode kontrast. Test 3.4'teki okunmayan alanlar. Palet tutarlılığı TEKNİK karar, sorma. |
| 94 | K-14 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:181` | #269 #97 |  | evet | 01 | S19 sunucu sertleştirme — kod tarafı. helmet · rate-limit · CORS · body-limit · güvenlik başlıkları. Altyapı k |
| 95 | K-19 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:187` | #144 #321 |  | evet | 01 | Kalan ürün kararları uygulaması: menti mentör listesi · toplantı linki kimde. Her biri ayrı PR. |
| 96 | F-04 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:193` | #102 #272 #276 #314 |  | evet | 08 | logoUrl XSS guard (G1-23). Logo URL çıplak `z.string().url()`; host/MIME allowlist + CSP yok. `javascript:`/ve |
| 97 | F-18 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:194` | #163 #342 |  | evet | 01 | Yönetici/sponsor rapor export (G4-30). Kuruma/sponsora PDF/Excel/CSV KPI raporu yok (KVKK kişi-JSON export'und |
| 98 | F-21 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:195` | #305 |  |  | 08 | Erişilebilirlik paketi (G7-01+02+09). aria/role/klavye (Likert radiogroup, modal role=dialog yok) + DISC kontr |
| 99 | F-23 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:196` | #132 |  | evet | 01 | adminSettings izolasyon deseni (G4-05). Controller-içi elle `tenantId` filtresi; merkezî tenant-izolasyon dese |
| 100 | F-28 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:197` | #311 #349 |  |  | 08 | Sayfa metni merkezileştirme (G6-05). `registerMessages.ts`+`threeQuestionsText.ts` özel modüller var; genel sa |
| 101 | F-32 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:198` | #310 |  |  | 09 | Sekme geçiş yavaşlığı (G8-13). İstemci önbelleği/prefetch katmanı yok; her sekmede yeniden fetch. |
| 102 | F-33 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:199` | #285 |  | evet | 09 | Dashboard sol-alt kullanıcı kartı (G8-14). Admin panelde var; menti/mentör dashboard'unda sağ-üst bar, sol-alt |
| 103 | P-16 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:205` | #106 #283 |  | evet | 02 | mentor-count sayımı `User.role` üzerinden. Kural "kurum-içi sayım kaynağı `TenantMembership.role`" diyor. Çok  |
| 104 | U-01 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:211` | #140 #317 |  | evet | 09 | `SCHEDULED → COMPLETED` geçişi yok. UI yok, cron yok → check-in + feedback (değerlendirme) hiç açılmıyor; ürün |
| 105 | U-06 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:212` | #101 #273 |  | evet | 02 | Davetli kullanıcı OAuth (Google) ile gelirse APPROVED olmuyor. PENDING'de sessiz kalır; mentör/menti ekranında |
| 106 | U-08 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:213` | #11 #273 #99 |  | evet | 02 | Onay kapısı yalnız `GET /api/users`'ta; `mentor-matches` PENDING'e açık. `requireApproved` benzeri middleware  |
| 107 | U-19 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:214` | #146 #19 #24 #323 |  | evet | 02 | Profil tamamlanma kapısı yok: boş profilli mentör havuzda görünüyor; `computeProfileCompleteness` ve `mentorVi |
| 108 | V-05 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:220` | #100 #14 #273 |  | evet | 02 | k-anonimlik KPI/analytics/health-metrics uçlarında YOK — `applyKAnonymity` yalnız `mentor-count`'ta; `GET /api |
| 109 | V-06 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:221` | #10 #15 #273 #98 |  | evet | 02 | Fallback JWT secret kaynak koda gömülü (`config.ts:16`); tek koruma `NODE_ENV==='production'`. Set değilse 7 k |
| 110 | Y-02 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:227` | #156 #338 |  | evet | 02 | Platform okuma uçlarında denetim izi yok — 4 uç. Bekleyen kurum PII'sine, loglara, kurum listesine ve şüphe bi |
| 111 | Y-03 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:228` | #123 #303 |  |  | 09 | madde 47 — Zod doğrulama bloğu 30 controller'da kopyalanmış. Her uç kendi hata biçimini elle yazıyor; biçim ka |
| 112 | Y-04 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:229` | #117 #298 |  |  | 09 | madde 48 kalanı — üç liste ucu sayfalamasız. `requestController` · `feedbackLogController` · `clubController`  |
| 113 | Y-08 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:230` | #294 |  |  | 09 | madde 53 — dashboard/admin/platform arama motoruna kapalı sayılmıyor. `robots.txt` tarama önerisidir, indeksle |
| 114 | Y-09 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:231` | #297 |  |  | 09 | madde 51+52 — site simgesi Next.js varsayılanı; paylaşım GÖRSELİ yok ve OG yalnız ana sayfada. |
| 115 | Y-10 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:232` | #303 |  |  | 09 | madde 62 — JSON-LD yapısal veri yok. |
| 116 | Y-13 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:233` | #307 |  |  | 09 | madde 54 — sitemap elle yazılmış. Yeni public sayfa eklenince sitemap'te çıkmaz. |
| 117 | Y-16 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:234` | #286 |  |  | 09 | madde 127 — etiket önerme ekranda YOK. Backend ucu çalışıyor, çağıran yok. |
| 118 | GV-03 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:240` | #107 #284 #289 |  |  | 09 | ⛔ Görüşme bağlantısı doğrulanmıyor — karşı tarafın tarayıcısında kod çalıştırılabiliyor. Kurban ekranda yalnız |
| 119 | GV-04 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:241` | #269 #93 |  | evet | 02 | ⛔ Görüşme check-in notları kurum içinde herkese açık. İlişkinin en mahrem serbest-metin verisi (1000 karakterl |
| 120 | GV-05 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:242` | #269 #95 |  | evet | 02 | ⛔ Mentör, başka bir mentör adına geri bildirim yazabiliyor ve kurumun eşleştirme öğrenmesini zehirleyebiliyor. |
| 121 | GV-06 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:243` | #269 #94 |  | evet | 02 | ⛔ Menti, başka bir mentinin adına görüşme talebi yaratabiliyor. Kurbanın haftalık görüşme hakkı doldurulur ve  |
| 122 | GV-07 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:244` | #128 #308 |  | evet | 02 | ⛔ Başarısız platform girişinde yazılan e-posta adresi kalıcı sistem günlüğüne düşüyor. Yanlış kutuya e-posta y |
| 123 | GV-08 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:245` | #143 #145 #313 #329 |  | evet | 02 | Anonimleştirme 6 tabloyu ve 4 alanı atlıyor — psikometrik arketip ve serbest yorumlar geride kalıyor. Kişiye " |
| 124 | GV-09b | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:246` | #315 |  |  | 09 | KVKK aydınlatma sayfası yanlış ÜLKE adı yazıyor (olgu düzeltmesi). Sayfa "İrlanda (AB)" diyor; gerçek sunucu k |
| 125 | GV-10 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:247` | #138 |  | evet | 02 | Çıkış yapan, rolü düşürülen ve reddedilen kullanıcının erişimi bir saate kadar sürüyor. Reddedilen kullanıcı,  |
| 126 | GV-11 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:248` | #132 |  | evet | 02 | Üyeliği kapatılmış yönetici kurum ayarlarını hâlâ değiştirebiliyor. Görüşme limiti, minimum eşleşme skoru ve ü |
| 127 | GV-13 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:249` | #137 |  | evet | 02 | Yenileme anahtarı veritabanında açık metin tutuluyor. Veritabanı kopyası sızarsa tüm aktif oturumlar doğrudan  |
| 128 | GV-14 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:250` | #129 #308 |  | evet | 02 | Davet bağlantısı sunucu günlüğüne düşüyor. Günlüğe erişen herkes geçerli davet linki toplayabiliyor. |
| 129 | GV-15 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:251` | #130 #308 |  |  | 09 | E-postaların gövdesi kaçış yapılmadan kuruluyor. Adına HTML koyan bir kullanıcı, yöneticinin gelen kutusundaki |
| 130 | GV-16 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:252` | #116 #298 |  | evet | 03 | Profil fotoğrafındaki konum bilgisi herkese açık servis ediliyor. Telefonla çekilmiş fotoğraftaki GPS etiketi  |
| 131 | GV-18 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:253` | #147 #16 #324 |  | evet | 03 | Rıza sürümü kaydediliyor ama hiç kontrol edilmiyor. Aydınlatma metni güncellenirse eski sürüme onay vermiş kul |
| 132 | GV-19 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:254` | #152 #335 |  | evet | 03 | Oturum içi şifre değiştirme yok ve şifre karmaşıklık kuralı yok. Kullanıcı şifresini değiştirmek için e-posta  |
| 133 | GV-20 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:255` | #116 #298 |  |  | 09 | Yüklenen görselin çözünürlük sınırı yok. Tek bir yükleme ön yüz sunucusunun belleğini tüketebiliyor. |
| 134 | GV-21 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:256` | #111 #289 |  | evet | 03 | `/api/auth` altına eklenecek yeni adres sessizce OAuth'a düşüyor. Bugün sorun yok ama bir sonraki geliştirici  |
| 135 | GV-22 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:257` | #109 #289 |  |  | 09 | Yükleme boyutu ayarı yanlış yazılırsa sınır sessizce kalkıyor. Operatörün tek yazım hatası sınırsız yüklemeye  |
| 136 | GV-23 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:258` | #110 #289 |  | evet | 03 | Hesap kapatmada oturum çerezi diğer beş çağrıyla tutarsız temizleniyor. Bugün çalışıyor, ancak çerez ayarları  |
| 137 | GV-24 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:259` | #125 #306 |  | evet | 03 | ⚠️ Onaylanmamış kullanıcı, liste ekranının kapısını tek tek atlayabiliyor. Herkes onaylanmamış/reddedilmiş üye |
| 138 | GV-25 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:260` | #126 #306 |  | evet | 03 | ⚠️ Kullanıcı başkasının kişiselleştirilmiş mentör sıralamasını isteyebiliyor. Kimin kiminle ne kadar uyumlu gö |
| 139 | PS-01 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:266` | #136 |  | evet | 03 | Aday sorgularında `orderBy` yok → sıralama tekrarlanabilir değil, 500'den sonrası sessizce kesiliyor. Determin |
| 140 | PS-02 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:267` | #139 |  | evet | 03 | ⛔ CANLI SESSİZ HATA — onboarding vektörü `confidence`'sız yazılıyor. Vektör eşleştirmede tamamen yok sayılıyor |
| 141 | PS-05 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:268` | #280 |  |  | 09 | Yöneticinin "Başarı oranı" KPI kartı daima boş ve bunu söylemiyor — `—` gösteriyor, "veri yok" demiyor. |
| 142 | PS-06 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:269` | #134 |  | evet | 03 | `dimensionalTotal` cache'inde tenant filtresi yok → başka kurumun soruları paydaya giriyor, `confidence` olmas |
| 143 | PS-07 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:270` | #120 #122 #302 |  | evet | 03 | Eşleştirmenin ANLAMINI test eden test yok — iki aday arasında beklenen sıralamayı assert eden tek test bile yo |
| 144 | PS-08 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:271` | #119 |  | evet | 03 | İki "anlamlılık" testi de KOŞULLU — boş listede sessizce yeşil geçiyor (vacuous). |
| 145 | PS-09 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:272` | #153 #336 |  | evet | 03 | `scoring.test-cases.ts` — formülün en iyi koruması `npm test`'in DIŞINDA. vitest kapsamına alınmalı. |
| 146 | PS-10 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:273` | #333 |  | evet | 03 | Menti "uygun mentor yok" mesajında kendi profilini suçluyor — "kurumda hiç mentör yok" ile "eşleşen yok" ayrım |
| 147 | PS-11 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:274` | #274 |  |  | 09 | `/onboarding` adım 2 boş soru listesinde SONSUZ SPINNER + ilerleme yüzdesi `NaN`. |
| 148 | PS-A1 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:275` | #143 #313 #329 |  | evet | 03 | ⭐ KARAR-10 · AŞAMA 1 — ÖLÇEK HATASINI DÜZELT + TEST YAZ. `UserProfile.discD/I/S/C` 0-1 yazılıyor, `discToOcean |
| 149 | IC-01 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:281` | #331 |  |  | 09 | Mentör panelindeki 4 İngilizce DISC etiketi Türkçeleşsin — ve 5 ayrı DISC sözlüğü tek kaynağa insin. 2026-09-0 |
| 150 | IC-03 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:282` | #121 #292 #295 #298 |  |  | 09 | 12 ham-enum render noktası mevcut sözlüklerden geçsin (rol · etiket durumu · görüşme formatı · sertifika durum |
| 151 | IC-05 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:283` | #114 #118 #290 |  |  | 09 | Backend'e global Türkçe Zod `errorMap`. ~75 mesajsız kısıt bugün İngilizce varsayılan basıyor. |
| 152 | IC-06 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:284` | #309 |  | evet | 03 | Giriş hatası hesabın varlığını sızdırıyor. |
| 153 | IC-07 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:285` | #118 #291 |  |  | 09 | 20 jenerik hata mesajının 5'inde backend'in gerçek hatası tamamen yutuluyor. |
| 154 | IC-09 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:286` | #293 |  |  | 10 | Kuruma gönderilen düzeltme şablonlarının tonu suçlayıcı. 5 metin emir kipinde, e-postayla kullanıcıya gidiyor. |
| 155 | IC-11 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:287` | #158 #338 |  |  | 10 | Terim birleştirme: randevu ↔ toplantı ↔ görüşme. Aynı `Meeting` kaydı dört farklı adla anılıyor. |
| 156 | IC-12 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:288` | #159 #341 |  |  | 10 | İçerik belgeleri hijyeni — `bolumler/` 5 belge indekse · 3 zayıf durum etiketi · bayat `backend/` yolları · fa |
| 157 | YN-09 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:294` | #304 |  |  | 10 | 1.000+ karakterlik satırlar AZALMADI, ARTTI — `00-KARAR-TAKIP.md` 30→33, `00-KUYRUK.md` 2→5; en uzunu `00-KARA |
| 158 | YN-10 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:295` | #304 |  |  | 10 | `CLAUDE.md:<satır>` atıfları satır numarasına dayanıyor — bölme bugün numaraları kaydırdı. Yaşayan belgelerde  |
| 159 | YN-11 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:296` | — |  |  | 10 | `raporlar/` 91 dosyadan 5'i hiç etiketsiz, 3'ü zayıf etiketli (KURAL 3 ihlali). En yanıltıcısı `bilanco/bilanc |
| 160 | YN-12 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:297` | — |  |  | 10 | İndeks adı 4 ayrı kalıpta yaşıyor (`00-INDEX.md` · `00-INDEKS.md` · `00-icerik-index.md` · `00-KART-INDEKSI.md |
| 161 | YN-15 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:298` | #328 |  |  | 10 | 🟡 kapısının üç istisnası `CLAUDE.md`'de yok. `OTONOM-PROMPT.txt` ve `00-KUYRUK.md:14-19` üç istisnayı (migrati |
| 162 | AN-01 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:304` | #279 |  |  | 10 | Sertifika "Ceza veya bekleme yok" metnini gerçek kurala uydur (2 başarısızda 24s bekleme var). |
| 163 | AN-07 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:305` | #171 #353 |  | evet | 04 | Eşleştirme `take:500` + cache (canlı-sonrası performans). |
| 164 | AN-09 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:306` | #155 #335 |  |  | 10 | Suspicion raporu mail göndermiyor (MVP ~4-6s) + NotificationService stub kararı. |
| 165 | AN-11 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:307` | #113 #290 |  |  | 10 | Backend bayat yorumlar: `certification.service.ts:69` ("88 şık"),`:92` ("3 ile") · `onboardingController.ts:20 |
| 166 | AN-15 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:308` | #190 |  |  | 10 | Menti randevu kartında mentörünün adını görebilsin (`meetings/page.tsx:31`). |
| 167 | AN-17 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:309` | #209 #281 |  |  | 10 | DISC arketip kartı (superPower/strengths) panelde/profilde de render edilsin (BY-4). |
| 168 | AN-18 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:310` | #201 |  |  | 10 | Toplantı linki bir ekranda görünsün (K8). |
| 169 | AN-28 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:311` | #146 #323 #325 |  |  | 10 | Mentörün dört hâli gösterimi: meşgul/boş mentör listede soluk/şeffaf; randevu düğmesi ①②③④ mantığına göre açık |
| 170 | AN-32 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:312` | #296 |  |  | 10 | ⭐ GERÇEK KULLANICI GÖRÜŞME KILAVUZU hazırla: persona-panel raporundaki 10 sınanmamış varsayımdan geçmiş-davran |
| 171 | AN-35 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:313` | #300 |  |  | 10 | STK admin paneli 8 kararını tek tek statüle (✅/⬜) ve açık olanları kuyruğa bağla. |
| 172 | AN-39 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:314` | #112 #290 |  | evet | 10 | user-reports sayfalama (`take:200` → limit/offset) (G4-16). |
| 173 | AN-43 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:315` | — |  |  | 10 | Dondurma notları uygula: bilanco-po-ozet etiketsiz + ONCELIK damga + 📸 G-kart durum-notu (CS §5). |
| 174 | AN-44 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:316` | — |  |  | 10 | `tasarim-kararlari-admin` ad tarihsizleştir (Ç-07 KURAL 4) + `08-acik-sorular` çift-kaynak çöz (Ç-09 tek-kayna |
| 175 | AN-47 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:317` | #301 |  |  | 10 | ⭐ Geri bildirim/kalite modelleri ENVANTERİ (keşif). Dört kopuk model tek tabloya: her biri hangi alanları taşı |
| 176 | AN-48 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:318` | #301 |  |  | 11 | ⭐ Görüşme sonrası SORU İÇERİĞİNİ gözden geçir (öneri üret, uygulama değil). "Beğendin mi" tarzı memnuniyet sor |
| 177 | AN-53 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:319` | — |  |  | 11 | ⭐ G1..G11 kartlarındaki TÜM açık kalemleri KODDA doğrula (önce SAY, ~134 bekleniyor). Her kalem için üç sonuçt |
| 178 | AN-54 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:320` | — |  |  | 11 | ⭐ Silme protokolü — gerekçesi bulunamayan alan/kalem TARAMASI. Şemada ve kodda GEREKÇESİ BULUNAMAYAN başka kal |
| 179 | YN-01 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:326` | — |  |  | 11 | ⭐ CLAUDE.md bölme KADEME 1 diskte uygulanmış ama COMMIT EDİLMEMİŞ + pay yalnız 258 karakter. `git status` → `  |
| 180 | YN-14 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:327` | — |  |  | 11 | Kalan kural birleştirmeleri ≈4.494 karakter — yeni kural YOK, hiçbir kural kaldırılmadan. Bölme B.4-1/2/8'i za |
| 181 | P-05 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:333` | #162 #340 |  |  | 11 | Ret tamamen çıplak — menti "İptal Edildi" kırmızı rozetinden öğreniyor. Bildirim/e-posta/gerekçe/alternatif yo |
| 182 | AJ-02 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:339` | #156 #172 #357 |  | evet | 04 | `GET /api/system-logs` iz bırakmıyor ve `meta` alanını maskesiz döndürüyor — komşu `/api/platform/logs` ikisin |
| 183 | AJ-01 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:345` | #173 #358 |  | evet | 04 | Kurum-içi rol sayımları hâlâ `User.role`'den yapılıyor (kural: `TenantMembership.role`) — KPI rol dağılımı, tu |
| 184 | AJ-06 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:346` | #174 #358 |  | evet | 11 | F-27 kalanı: mesaj listesinde her konuşma için ayrı sorgu (N+1) sürüyor. |
| 185 | AJ-07 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:352` | #359 |  |  | 11 | F-21 kalanı: bütünsel erişilebilirlik (WCAG 2.1 AA) denetimi hiç yapılmadı; açık temada DISC renkleri kontrast |
| 186 | AJ-03 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:358` | #175 #360 |  | evet | 04 | Çıkış yapınca erişim anahtarı 1 saate kadar geçerli kalıyor — logout yalnız yenileme anahtarını siliyor. |
| 187 | AJ-04 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:364` | #169 #176 #361 |  | evet | 04 | Taranan 179 uçtan 134'ünde kurum izolasyonu / başkasının kaydı (IDOR) negatif testi yoktu; K5-Y3 (#169) 10'unu |
| 188 | AJ-12 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:365` | #176 #178 #361 |  |  | 11 | Mentör görüşme reddi, gövdesiz istekte 500 veriyor — komşu onay ucu boş gövdeyi karşılıyor, ret ucu karşılamıy |
| 189 | AJ-08 | R3 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:371` | #177 #362 |  |  | 11 | Sertifika içeriğini güvenle yükleyen komut yok — yalnız veri silen `npm run seed` var. |
| 190 | PS-A4 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:377` | #180 #364 |  | evet | 04 | ⭐ KARAR-6 ek(1) — menti kendisine UYGUN OLMAYAN mentörü görmesin: alt uyum eşiği. Bugün menti tarafında hiçbir |
| 191 | AJ-05 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:383` | #179 #363 |  |  | 11 | F-04 kalanı: logo adresinde yalnız https zorunlu; alan adı/dosya türü sınırı yok, ön yüz CSP'si yalnız "rapor" |
| 192 | AJ-09 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:384` | #181 #365 |  | evet | 04 | Kimlik çerezi yardımcısı iki dosyada kopya; kişisel veri seçimi 29 yerde elle yazılmış. |
| 193 | F-24 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:390` | #182 #366 |  | evet | 04 | Platform tek-kullanıcı drill-down (G4-08). `/tenants/:id/users/:userId` platform detay ucu yok. |
| 194 | AJ-13 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:396` | #169 #176 #184 #368 |  | evet | 04 | Negatif test kovası 2. parti: kurum izolasyonu / IDOR testi olmayan kalan ~104 uçtan sonraki 25 (AJ-04 devamı) |
| 195 | IC-08 | R2 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:402` | #151 #332 |  |  | 11 | Onay bekleyen kullanıcıya "düzeltme notu" uygulama içinde hiç gösterilmiyor. |
| 196 | AJ-15 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:408` | #169 #176 #184 #188 #373 |  | evet | 04 | Negatif test kovası 3. parti: kurum izolasyonu / IDOR testi olmayan kalan uçlardan sonraki 20 (AJ-13 devamı). |
| 197 | AJ-16 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:414` | #169 #176 #184 #188 #190 #375 |  | evet | 04 | Negatif test kovası 4. parti: kalan ~73 uçtan sonraki 20 (AJ-15 devamı). |
| 198 | AJ-17 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:415` | #190 #191 #375 |  | evet | 04 | Kurum yöneticisi, TÜM kurumları etkileyen veri temizliğini ve eşleştirme kalibrasyonunu elle tetikleyebiliyor. |
| 199 | AJ-18 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:421` | #169 #176 #184 #188 #190 #192 #376 |  | evet | 04 | Negatif test kovası 5. parti: kalan ~53 uçtan sonraki 20 (AJ-16 devamı). |
| 200 | AJ-19 | R1 | `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:427` | #169 #176 #184 #188 #190 #192 #193 #377 |  | evet | 04 | Negatif test kovası son parti: raporun kalan tüm uçları (~34) (AJ-18 devamı). |
| 201 | V-16 | R3 | `docs/otonom/00-KUYRUK.md:303` | — | evet |  | 11 | `/health`'in `version` alanı sabit `"0.1.0"` — canlıdaki gerçek kodu göstermiyor. `process.env.npm_package_ver |
| 202 | IC-10 | R3 | `docs/otonom/00-KUYRUK.md:394` | — | evet |  | 11 | madde 139'un eksik yarısı: 4 menti "şimdilik" varyantı YAZILSIN. Bugün yalnız mentör tarafı yazılı (4/8). |
| 203 | YN-13 | R3 | `docs/otonom/00-KUYRUK.md:417` | #334 | evet |  | 11 | Kişi adı yasağı kendi dosyasında ihlal ediliyor. Kural `CLAUDE.md § Kişi Adı Yasağı` *"Hiçbir kod/yorum/commit |
| 204 | AN-05 | R3 | `docs/otonom/00-KUYRUK.md:434` | — | evet |  | 11 | Menti "şimdilik" 4 varyantı + eşleşme detay 15/16 kombinasyon metnini yaz. |
| 205 | AN-10 | R2 | `docs/otonom/00-KUYRUK.md:437` | #339 #347 | evet |  | 11 | Terim tutarsızlığı: §5'teki 31 nokta (mizaç/karakter/kişilik · mentor/mentör · görüşme/toplantı/randevu). |
| 206 | E-3b | R2 | `docs/otonom/00-KUYRUK.md:210` | — |  |  | 11 | E-3 alt kalemi (notta BITTI) |
| 207 | E-3d | R2 | `docs/otonom/00-KUYRUK.md:210` | — |  |  | 11 | E-3 alt kalemi (notta BITTI) |
| 208 | E-3e | R2 | `docs/otonom/00-KUYRUK.md:210` | — |  |  | 11 | E-3 alt kalemi (notta BITTI) |
| 209 | GV-12 | R1 | `docs/otonom/00-KUYRUK.md:356` | #131 #312 | evet | evet | 04 | Kurum kaydında e-posta enumeration |
