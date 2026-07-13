'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { apiClient } from '@/lib/api/client';

type Role   = 'MENTI' | 'MENTOR';
type Format = 'EMAIL' | 'WHATSAPP';

// ─── Sabit varsayılan metinler ────────────────────────────────────────────────

const DEFAULT_TEMPLATES: Record<Role, Record<Format, string>> = {
  MENTI: {
    EMAIL: `Konu: {KurumAdı} — deneyimli bir mezunla tanışmaya ne dersin?

Merhaba,

{DavetEdenAd} ({DavetEdenGörev}, {KurumAdı}) seni mentörlük programına davet etti.

**Bu nedir?**
{KurumAdı} bünyesindeki deneyimli isimlerle — senden önce aynı yollardan geçmiş abi ve ablalarla — tanışma ve kendi seçeceğin biriyle eşleşme imkânı sunuyoruz. Kimi seçeceğine sen karar veriyorsun.

**Ne kazanırsın?**
Kariyerinde, hedeflerinde, "bundan sonra ne yapmalıyım" sorusunda yol almış birinin deneyimini dinlersin. Kitaplardan öğrenilmeyen, yaşayarak bilinen şeyler — bir kuşaktan diğerine aktarılan bilgi.

**Ne kadar zamanını alır?**
Tamamen size kalmış. Görüşme sıklığını sen ve eşleştiğin kişi birlikte belirliyorsunuz.

**"Ne konuşacağımı bilmiyorum" diyorsan:**
Bu bir sınav değil, bir sohbet. İlk görüşme tanışmaktan ibaret — kim olduğunuzu, neler yaptığınızı paylaşırsınız. Deneyim aktarımı zaten kendiliğinden gelir.

**Neden kısa bir test var?**
Karakterine ve çalışma tarzına uygun kişileri sana önerebilmemiz için. Mizaç uyumu, sohbetin gerçekten verimli geçmesini sağlıyor. 5 dakika sürüyor.

[Programa Katıl] {Link}

Bu daveti tanımıyor musun? Bildir: {ŞüpheLinki}`,
    WHATSAPP: `Selam! 👋

{DavetEdenAd} seni *{KurumAdı} mentörlük programına* davet etti.

Kısaca: senden önce aynı yollardan geçmiş, deneyimli isimlerle tanışma ve *kendi seçeceğin biriyle* eşleşme imkânı.

🤝 Kimi seçeceğine sen karar veriyorsun.
🎯 Kısa bir mizaç testi var — karakterine uygun kişileri önerebilmemiz için.
💬 İlk görüşme sadece tanışma. Sınav değil, sohbet.
⏱️ Görüşme sıklığını siz belirliyorsunuz.

👉 {Link}`,
  },
  MENTOR: {
    EMAIL: `Konu: {KurumAdı} — biriktirdiklerinizi aktarmaya ne dersiniz?

Merhaba,

{DavetEdenAd} ({DavetEdenGörev}, {KurumAdı}) sizi mentörlük programına mentor olarak davet etti.

**Neden siz?**
Bugün bulunduğunuz noktaya bakan ve sizin bir zamanlar sorduğunuz soruları soran gençler var. Yıllar içinde biriktirdiğiniz deneyim — hangi hataları yaptığınız, neyi keşke daha erken bilseydiniz — onlar için hâlâ bilinmeyen şeyler.

**Bu bir sosyal sorumluluk çalışması.**
Sizden faydalanmak isteyen, sizi dinlemeye hazır bir kuşak var. Bildiklerinizi doğru kanala aktarmak, belki de birinin yolunu değiştirmek — yaptığınız katkı bu.

**Ne kadar zamanınızı alır?**
Haftada yarım saat ayırmanız bile yeterli. Sıklığı siz ve eşleştiğiniz kişi birlikte belirliyorsunuz.

**"Yeterince deneyimli miyim?" diyorsanız:**
Kimse sizden uzman olmanızı beklemiyor. Kendi yolunuzu anlatmanız, karşılaştığınız durumları paylaşmanız yeterli. En değerli şey teori değil, yaşanmışlık.

**Kiminle eşleşeceksiniz?**
Kısa bir mizaç değerlendirmesi yapıyoruz — böylece daha rahat iletişim kurabileceğiniz, anlattıklarınızın gerçekten karşılık bulacağı kişilerle eşleşme imkânı doğuyor. Kimi kabul edeceğinize siz karar veriyorsunuz.

[Mentor Olarak Katıl] {Link}

Bu daveti tanımıyor musunuz? Bildir: {ŞüpheLinki}`,
    WHATSAPP: `Merhaba 👋

{DavetEdenAd}, sizi *{KurumAdı} mentörlük programına* mentor olarak davet etti.

Bugün bulunduğunuz noktaya bakan, sizin bir zamanlar sorduğunuz soruları soran gençler var. Biriktirdiklerinizi aktarmak için bir imkân.

🤝 Sosyal sorumluluk — sizden faydalanmak isteyen bir kuşak var.
⏱️ Haftada yarım saat bile yeterli. Sıklığı siz belirliyorsunuz.
💡 Uzman olmanıza gerek yok — kendi yolunuzu anlatmanız yeterli.
🎯 Mizaç uyumuna göre, daha rahat iletişim kuracağınız kişilerle eşleşme imkânı.

👉 {Link}`,
  },
};

export default function InvitePage() {
  const { user, accessToken } = useAuth();

  const [role, setRole]               = useState<Role>('MENTI');
  const [format, setFormat]           = useState<Format>('EMAIL');
  const [invitedByName, setInvitedByName]   = useState(user?.fullName ?? '');
  const [invitedByTitle, setInvitedByTitle] = useState('');
  const [content, setContent]         = useState('');
  const [inviteLink, setInviteLink]   = useState('');
  const [loadingLink, setLoadingLink] = useState(false);
  const [saved, setSaved]             = useState(false);
  const [copied, setCopied]           = useState(false);
  const [msg, setMsg]                 = useState<string | null>(null);

  // Şablonu yükle: DB'deki kayıtlı metin varsa onu kullan, yoksa default
  useEffect(() => {
    if (!user?.tenantId || !accessToken) return;

    void (async () => {
      const result = await apiClient<{ items: { role: string; format: string; content: string }[] }>(
        `/api/tenants/${user.tenantId}/invitation-templates`,
        { token: accessToken, tenantId: user.tenantId },
      );
      if (result.ok) {
        const saved = result.data.items.find((t) => t.role === role && t.format === format);
        setContent(saved?.content ?? DEFAULT_TEMPLATES[role][format]);
      } else {
        setContent(DEFAULT_TEMPLATES[role][format]);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, format, user?.tenantId, accessToken]);

  async function generateLink() {
    if (!user?.tenantId || !accessToken) return;
    setLoadingLink(true);
    const result = await apiClient<{ invitationLink: string }>(
      `/api/tenants/${user.tenantId}/invitations`,
      {
        method: 'POST',
        token: accessToken,
        body: { role, invitedByName, invitedByTitle },
      },
    );
    setLoadingLink(false);
    if (result.ok) setInviteLink(result.data.invitationLink);
  }

  async function saveTemplate() {
    if (!user?.tenantId || !accessToken) return;
    const result = await apiClient(
      `/api/tenants/${user.tenantId}/invitation-templates`,
      {
        method: 'PUT',
        token: accessToken,
        body: { role, format, content },
      },
    );
    if (result.ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  }

  function resetToDefault() {
    setContent(DEFAULT_TEMPLATES[role][format]);
  }

  // Yer tutucuları doldur ve panoya kopyala
  async function copyText() {
    const suspicionLink = `${window.location.origin}/bildir`;
    const filled = content
      .replace(/{KurumAdı}/g, user?.fullName ? '' : 'Kurumunuz')
      .replace(/{DavetEdenAd}/g, invitedByName || '{DavetEdenAd}')
      .replace(/{DavetEdenGörev}/g, invitedByTitle || '{DavetEdenGörev}')
      .replace(/{Link}/g, inviteLink || '{Link — önce oluştur}')
      .replace(/{ŞüpheLinki}/g, suspicionLink);

    await navigator.clipboard.writeText(filled);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-2xl font-bold">Davet Metni Oluştur</h1>
      <p className="text-sm text-muted-foreground">
        Aşağıdaki metni düzenleyip kopyalayın, kendi e-posta veya WhatsApp mesajınızdan gönderin.
      </p>

      {/* Rol + Format seçimi */}
      <div className="flex flex-wrap gap-3">
        {(['MENTI', 'MENTOR'] as Role[]).map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              role === r ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'
            }`}
          >
            {r === 'MENTI' ? 'Menti Daveti' : 'Mentor Daveti'}
          </button>
        ))}
        {(['EMAIL', 'WHATSAPP'] as Format[]).map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              format === f ? 'bg-secondary text-secondary-foreground border-secondary' : 'border-border hover:bg-accent'
            }`}
          >
            {f === 'EMAIL' ? 'E-posta' : 'WhatsApp'}
          </button>
        ))}
      </div>

      {/* Davet eden bilgisi */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Davet Eden Ad</label>
          <input
            value={invitedByName}
            onChange={(e) => setInvitedByName(e.target.value)}
            placeholder="Adınız Soyadınız"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Görev / Unvan</label>
          <input
            value={invitedByTitle}
            onChange={(e) => setInvitedByTitle(e.target.value)}
            placeholder="Başkan, Koordinatör…"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Davet linki */}
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Davet Linki (30 gün geçerli)</label>
          <input
            value={inviteLink}
            readOnly
            placeholder="Oluştur butonuna basın"
            className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={generateLink}
          disabled={loadingLink}
          className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
        >
          {loadingLink ? 'Oluşturuluyor…' : 'Oluştur'}
        </button>
      </div>

      {/* Metin editörü */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Davet Metni</label>
          <button onClick={resetToDefault} className="text-xs text-muted-foreground hover:text-foreground">
            Varsayılana sıfırla
          </button>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={18}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>

      {msg && <p className="text-sm text-red-500">{msg}</p>}

      {/* Aksiyonlar */}
      <div className="flex gap-3">
        <button
          onClick={copyText}
          disabled={!inviteLink}
          className="flex-1 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-40"
        >
          {copied ? '✓ Kopyalandı' : 'Metni Kopyala'}
        </button>
        <button
          onClick={saveTemplate}
          className="rounded-lg border border-border hover:bg-accent px-4 py-2.5 text-sm font-medium transition-colors"
        >
          {saved ? '✓ Kaydedildi' : 'Şablonu Kaydet'}
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        Metin düzenlenir ve kaydedilirse, bir sonraki girişte bu metin görünür. Linki oluşturduktan sonra kopyala.
      </p>
    </div>
  );
}
