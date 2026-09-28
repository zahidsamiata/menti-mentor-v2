> 🌡️ ILIK — gerektiğinde okunur (rutin turda değil). Okuma kuralı: OTONOM-PROMPT.txt § 0.4
> TÜR: 🌡️ · SON DOĞRULAMA: ❓ içerik denetlenmedi (başlık 2026-09-23 DA turunda eklendi) · TAZELEME TETİKLEYİCİSİ: ilgili kod ya da karar değişince

# 05 — ÖZELLİKLER VE PANELLER
**🔄 YAŞAYAN** (canonical: özellikler ve paneller)
**Son güncelleme:** 2026-08-02 · Kaynak: mail/panel chat'i, psikometri chat'i, bugünkü oturum

## PLATFORM ADMIN PANELİ (mail/panel chat'inde kodlandı)
- **Kapsam B (Orta):** Kurum detayı + Mentörler/Mentiler/Görüşmeler listeleri + DISC dağılımı, MEVCUT veriyle, şema değişikliği YOK. 🟢✅ (kodlandı, merge edilmedi) · doğrulama 09-28: `frontend/src/app/platform/tenants/[id]/page.tsx:27-28` · `frontend/src/app/platform/tenants/[id]/_components/DiscSummary.tsx`
- Mimari C'ye açık (modüler: KpiCards/MembersTable/MeetingsTable/DiscSummary) → ileride grafik/export/aktiflik eklenebilir.
- Tasarım: üstte özet+KPI, altta sekmeler (Üyeler/Görüşmeler/Analizler), Üyeler açık.
- Güvenlik: TAM (audit log + KVKK maskeleme + rate-limit + token domain ayrımı).
- **Veri kaynağı:** mentör/menti sayımı `TenantMembership.role` (User.role DEĞİL — kullanıcı farklı kurumda farklı rolde olabilir). 🔄 (bir ara User.role önerildi, TenantMembership'e çevrildi).
- Görüşmeler = `Meeting` modeli (Match değil), tenantId ile.
- DISC analizi = discType dağılımı, ham profil ASLA.
- Bağlam: backend PR#26 + frontend PR#29, branch feat/platform-panel-deep.

## 5 ADMIN PANELİ (bugünkü oturumda kodlandı — PR #32 / #26)
Backend büyük ölçüde hazırdı, eksik olan UI'dı. Hepsi tenant-izole + KVKK maskeli:
- **A2 Mentör havuzu** ✅ (mevcut endpoint `GET /api/users?role=MENTOR`). · doğrulama 09-28: `frontend/src/app/(admin)/admin/mentor-havuzu/page.tsx`
- **A3 Menti havuzu** ✅ (aynı endpoint). · doğrulama 09-28: `frontend/src/app/(admin)/admin/menti-havuzu/page.tsx`
- **A4 Sertifika sonuç panosu** ✅ (yeni endpoint; TenantMembership certScore/status/attempts). · doğrulama 09-28: `backend/src/routes/adminRoutes.ts:55` · `frontend/src/app/(admin)/admin/sertifika-sonuclari/`
- **A1 Eşleşme paneli** ✅ (Match DB'ye persist ediliyor — scoring.service.ts:137 doğrulandı). · doğrulama 09-28: `backend/src/routes/adminRoutes.ts:54` · `backend/src/services/scoring.service.ts:141`
- **A7 Branding düzenleme** ✅ (logoURL XSS koruması: https-only + güvenli img render). · doğrulama 09-28: `backend/src/services/logoUrl.ts` · `frontend/src/app/(admin)/admin/branding/`

## TAKVİM / FEEDBACK (psikometri chat'i) 🟢✅ · doğrulama 09-28: `frontend/src/components/organisms/MeetingFeedbackCard.tsx` · `backend/prisma/schema.prisma:564,1171-1173`
- **Availability** (haftalık şablon: weekday+HH:mm) + **Meeting** (format ONLINE/IN_PERSON/PHONE, startsAt/endsAt UTC, status).
- **Bağlamsal feedback:** Görüşme endsAt'ı geçince sağ altta MeetingFeedbackCard (2 saatlik pencere; feedbackPrompted çift-tetiklemeyi önler).
- **Kademeli feedback:** Emoji (rapportScore) → Çip (P1-P5) → Açık uç; slider (progressScore); dipte "farklı birini dene" (earlyExit, suçlamasız).
- Bağlam: MeetingContext/MeetingProvider, meetingController. ~~[ESKİ · düzeltildi 2026-08-14] UYARI: timezone bug'ı tespit edildi (UTC vs Europe/Istanbul), düzeltilmedi. ⏳~~ (bkz. alttaki ✅ GÜNCELLEME)
  - **✅ GÜNCELLEME (2026-08-14): DÜZELTİLDİ** — commit `6a30f21` (bookMeeting UTC/Istanbul tutarsızlığı giderildi). Yukarıdaki "düzeltilmedi ⏳" ifadesi BAYAT. · doğrulama 09-28: `backend/src/controllers/meetingController.ts:521`

## ÖĞRENME YOLCULUĞU / OYUNLAŞTIRMA
- Keşif motoru (learningJourney.service.ts, 550 satır): Durum→Seçenek→Outcome+Feedback.
- **Puanlama YOK = BİLİNÇLİ tasarım** (keşif amaçlı, sınav değil). Test bunu doğruluyor.
- 13 aşama (7 mentör + 6 menti). MENTÖR/MENTİ görür, ADMIN göremez (tasarım gereği).
- 2026-08-02 seed'lendi → artık dolu.

## DISC SORU GÖRÜNTÜLEME (A8)
- Yönetici DISC sorularını (silmeden, "ne soruluyor") görebilmeli. Kod sağlam; boş görünmesi veri eksikliğiydi.
- 2026-08-02 global seed → 20 soru yüklendi, artık görünmeli. Kullanıcı teyit edecek. ⏳

## ONBOARDING (psikometri chat'i, tasarım) 🟢
- **Çift-Aha:** "Önizleme Aha" (yönetici demo eşleşme görür) + "Gerçek Aha" (üyeler katılınca ilk gerçek eşleşme).
- **Self-serve** (satışsız): şablon seçimi (Mezun/Gönüllü/Kulüp) ile boş-sayfa korkusu çözülür.
- **Üye akışı:** Davet linki tenantId+rol taşır; kurum logosu/rengiyle karşılama; test sonrası kişiselleştirilmiş mizaç kartı (viral, anonim); bekleme salonunda bildirim izni kritik.

## 4-AKTÖR PANEL TASARIMI (psikometri chat'i, tasarım)
- Super Admin agregat-only (gizlilik sınırı).
- Tenant Admin esnek kural paneli (görüşme limiti 1-5, eşik skoru override, idari kara liste sessiz).
- 4 KPI + Erken Uyarı (Aktif Yolculuklar, Boştaki Kapasite, Eşleşme Süresi, NPS).

## BEKLEYEN İŞLER (detay: 09-DURUM.md)
- ~~[ESKİ · 2026-09-27] Panel PR'ları (#26/#29) merge — kodlandı, test bekliyor.~~ ⚠️ GÜNCELLEME (2026-09-27): backend #26 ve #29 main'e merge edildi — kanıt: backend `git log origin/main` (#26 `dacc171`, #29 `975c03f`) · doğrulama: sahipsiz-kalanlar-2026-09-27
- Sertifika + öğrenme yolculuğu uçtan uca test.
- Onay bildirimi maili (kurum onaylanınca başvurana gidiyor mu belirsiz).
- Yöneticilik verme akışı (A9) — YENİDEN KURGULANACAK, kod öncesi kullanıcıya sorulacak (söz verildi).
- Geri bildirim mekanizması — her sayfada "hata/öneri bildir" → mail (Resend). Takip sistemi şimdilik yok.

## AÇIK SORULAR (bkz. 08)
- Sertifika soru ekleme: yönetici ekleyebilmeli mi, bilinçli kısıt mı? ❓ · 🟨 kısmen — gerekçe taslağı ajan tarafından yazıldı (`docs/kararlar/sertifika-soru-standardi-gerekce-2026-09-21.md`); kalan: PO'nun tek cümle teyidi → 03-PO #18
- DISC/sektör dağılım oranı ayarı (A6): hardcoded, büyük iş, yapılacak mı? ❓
- Arkadaşın başvurusu: canlıdan kaydoldu, panelde görünmedi — çözülmedi (b3 membership backfill ile ilgili olabilir). ⏳
