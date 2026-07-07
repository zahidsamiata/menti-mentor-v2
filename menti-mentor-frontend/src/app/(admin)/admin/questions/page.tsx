'use client';

import { useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { questionsApi, type Question } from '@/lib/api/questions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';

const DISC_COLORS: Record<string, string> = {
  D: 'text-red-500', I: 'text-yellow-500', S: 'text-green-500', C: 'text-blue-500', GENERAL: 'text-gray-400',
};

export default function QuestionsPage() {
  const api = useApiClient();

  const { data, isLoading, error, refetch } = useQuery(
    () => questionsApi.list(api),
    [api],
  );

  const [actionError, setActionError] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Question | null>(null);

  // Yeni soru formu
  const [showAddForm, setShowAddForm] = useState(false);
  const [newText, setNewText] = useState('');
  const [newDimension, setNewDimension] = useState<string>('GENERAL');
  const [newType, setNewType] = useState<string>('CORE');
  const [adding, setAdding] = useState(false);

  async function handleHide(q: Question) {
    setLoadingId(q.id);
    setActionError(null);
    const result = await questionsApi.hide(api, q.id);
    setLoadingId(null);
    if (result.ok) refetch();
    else setActionError((result as { ok: false; error: { message?: string } }).error.message ?? 'Hata');
  }

  async function handleDelete(q: Question) {
    setLoadingId(q.id);
    setActionError(null);
    const result = await questionsApi.delete(api, q.id);
    setConfirmDelete(null);
    setLoadingId(null);
    if (result.ok) refetch();
    else setActionError((result as { ok: false; error: { message?: string } }).error.message ?? 'Hata');
  }

  async function handleAdd() {
    if (!newText.trim()) return;
    setAdding(true);
    const result = await questionsApi.create(api, {
      text: newText.trim(),
      discDimension: newDimension,
      type: newType,
      tenantScoped: true,
    });
    setAdding(false);
    if (result.ok) {
      setNewText(''); setShowAddForm(false); refetch();
    } else {
      setActionError((result as { ok: false; error: { message?: string } }).error.message ?? 'Hata');
    }
  }

  const globalQuestions  = data?.items.filter((q) => q.tenantId === null) ?? [];
  const tenantQuestions  = data?.items.filter((q) => q.tenantId !== null) ?? [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Soru Yönetimi</h1>
          <p className="text-sm text-muted-foreground">
            Global sorular kilitlidir (gizlenebilir). Kuruma özel sorular ekleyip yönetebilirsiniz.
          </p>
        </div>
        <Button size="sm" onClick={() => setShowAddForm((v) => !v)}>
          {showAddForm ? 'Vazgeç' : '+ Yeni Soru'}
        </Button>
      </div>

      {actionError && <AlertMessage type="error" message={actionError} />}
      {error && <AlertMessage type="error" message={error} />}

      {/* Yeni Soru Formu */}
      {showAddForm && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <textarea
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={3}
              placeholder="Soru metnini yazın (kurumunuza özel, DISC skoruna katılmaz)..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <div className="flex gap-3 items-center">
              <select
                className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm"
                value={newDimension}
                onChange={(e) => setNewDimension(e.target.value)}
              >
                <option value="GENERAL">Genel (bilgi amaçlı)</option>
                <option value="D">D — Dominant</option>
                <option value="I">I — Influential</option>
                <option value="S">S — Steady</option>
                <option value="C">C — Conscientious</option>
              </select>
              <select
                className="rounded-lg border border-border bg-background px-2 py-1.5 text-sm"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              >
                <option value="CORE">CORE</option>
                <option value="DEEPENING">DEEPENING</option>
              </select>
              <Button size="sm" onClick={handleAdd} disabled={adding || !newText.trim()}>
                {adding ? 'Ekleniyor…' : 'Ekle'}
              </Button>
              <p className="text-xs text-muted-foreground">
                * Kuruma özel sorular profil zenginleştirme içindir, DISC skorunu etkilemez
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-2">{[1,2,3].map((i) => <div key={i} className="h-14 animate-pulse rounded-xl bg-muted" />)}</div>
      ) : (
        <>
          {/* Global (Kilitli) Sorular */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Global Sorular</CardTitle>
                <Badge variant="secondary" className="text-xs">🔒 Kilitli — sadece gizlenebilir</Badge>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-border">
              {globalQuestions.map((q) => (
                <div key={q.id} className="flex items-start justify-between gap-3 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{q.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-bold ${DISC_COLORS[q.discDimension]}`}>{q.discDimension}</span>
                      <Badge variant="secondary" className="text-xs">{q.type}</Badge>
                      <span className="text-xs text-muted-foreground">sıra: {q.order}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0 text-xs"
                    disabled={loadingId === q.id}
                    onClick={() => handleHide(q)}
                  >
                    {loadingId === q.id ? '…' : 'Gizle'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Kuruma Özel Sorular */}
          {tenantQuestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Kuruma Özel Sorular</CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-border">
                {tenantQuestions.map((q) => (
                  <div key={q.id} className="flex items-start justify-between gap-3 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{q.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-bold ${DISC_COLORS[q.discDimension]}`}>{q.discDimension}</span>
                        <Badge variant="secondary" className="text-xs">{q.type}</Badge>
                        <Badge variant="brand" className="text-xs">Özel</Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="shrink-0 text-xs text-destructive border-destructive/40"
                      disabled={loadingId === q.id}
                      onClick={() => setConfirmDelete(q)}
                    >
                      Sil
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}

      <ConfirmDialog
        open={confirmDelete !== null}
        title="Soruyu Sil"
        description={confirmDelete ? `"${confirmDelete.text.slice(0, 60)}…" sorusu kalıcı olarak silinecek.` : ''}
        confirmLabel="Sil"
        variant="danger"
        isLoading={loadingId === confirmDelete?.id}
        onConfirm={() => confirmDelete && handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
