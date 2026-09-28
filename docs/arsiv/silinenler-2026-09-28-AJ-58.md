# Değiştirilenler arşivi — 2026-09-28 · AJ-58 (geri bildirim hatırlatma cron'u)

> CLAUDE.md § SİLME PROTOKOLÜ adım 4. Hiçbir dosya/fonksiyon SİLİNMEDİ; aşağıdaki döngü gövdesi davranış
> değiştirecek biçimde düzenlendi. Backend dalı `otonom/AJ-58-hatirlatma-basarisiz-eposta-20260928`
> (PR zahidsamiata/menti-mentor#228). Kuyruk: `docs/otonom/00-KUYRUK.md` AJ-58.

### 1. `backend/src/services/cronScheduler.ts` — `runFeedbackReminderCron` döngü gövdesi

- **Son commit (eski hâl):** `a272546` (backend main `07d71a2` itibarıyla aynı)
- **Neden yazılmıştı:** "feat(İş 3): feedback hatırlatıcısı otomatik cron (09:00 UTC)" — tamamlanmış ve geri bildirimi
  girilmemiş toplantılar için iki tarafa tek seferlik hatırlatma; `.catch(() => null)` bir tarafın hatası cron'u
  düşürmesin diye konmuştu.
- **Neden değişti:** e-posta sonucu (`Promise<boolean>`) yok sayılıyordu → mail hiçbir tarafa gitmese de
  `feedbackPrompted: true` yazılıp "gönderildi" sayılıyor, toplantı bir daha denenmiyordu. Artık iki taraf da
  başarısızsa bayrak yazılmaz/sayılmaz (U-16 taslak kurum cron'u deseni); en az biri gittiyse eski davranış.
  Hata yutma korunuyor (`.catch(() => false)`), cron yine düşmez.
- **Eski hâl (aynen, satır 270-275):**
  ```ts
      for (const m of pendingMeetings) {
        await sendFeedbackReminderEmail({ toEmail: m.mentor.email, recipientName: m.mentor.fullName, meetingId: m.id, scheduledAt: m.startsAt }).catch(() => null);
        await sendFeedbackReminderEmail({ toEmail: m.menti.email,  recipientName: m.menti.fullName,  meetingId: m.id, scheduledAt: m.startsAt }).catch(() => null);
        await prisma.meeting.update({ where: { id: m.id }, data: { feedbackPrompted: true } });
        sent++;
      }
  ```
- **Geri alma:** backend'de `git revert <AJ-58 merge commit>` ya da `git checkout 07d71a2 -- src/services/cronScheduler.ts`.
