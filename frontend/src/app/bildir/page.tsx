'use client';

import { useState } from 'react';
import { submitSuspicionReport } from '@/lib/api/platform';

export default function BildirPage() {
  const [form, setForm] = useState({
    tenantName:   '',
    reporterName: '',
    reporterRole: '',
    contact:      '',
    description:  '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await submitSuspicionReport(form);
    setLoading(false);
    if (result.ok) {
      setSubmitted(true);
    } else {
      setError('Bildirim gönderilemedi. Lütfen tekrar deneyin.');
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-sm text-center space-y-4">
          <div className="text-4xl">✅</div>
          <h1 className="text-xl font-bold">Bildiriminiz Alındı</h1>
          <p className="text-sm text-muted-foreground">
            Platform yöneticilerimiz en kısa sürede inceleyecek. İletişim bilginizden sizi haberdar edeceğiz.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Şüpheli Davet Bildirimi</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kurumunuz adına yapılan sahte bir kayıt mı var? Yetkisiz bir davet mi aldınız? Bildirin.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: 'tenantName',   label: 'Kurum Adı',               placeholder: 'Şüphelendiğiniz kurum adı' },
            { name: 'reporterName', label: 'Adınız',                   placeholder: 'Ad Soyad' },
            { name: 'reporterRole', label: 'Göreviniz',                placeholder: 'Ör: Yönetim Kurulu Başkanı' },
            { name: 'contact',      label: 'İletişim (e-posta/tel)',   placeholder: 'size@example.com' },
          ].map(({ name, label, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                placeholder={placeholder}
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">Açıklama</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Ne gördünüz? Davet linki mi aldınız? Kurum kaydı mı var?"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? 'Gönderiliyor…' : 'Bildirimi Gönder'}
          </button>
        </form>
      </div>
    </div>
  );
}
