'use client';

/**
 * Kurum yasal bilgileri — /admin/yasal-bilgiler (AN-36 / G1-12).
 *
 * Kurum yöneticisi KVKK veri işleyen sözleşmesi için gereken resmî kimlik bilgilerini
 * (unvan, adres, KEP, MERSİS, vergi dairesi/no) görür ve düzenler.
 *
 * Kapsam: YALNIZ alanlar. Sözleşme metni ve "imzala" akışı bu sayfada YOK — metin avukat onayı
 * bekliyor (AN-36 PR "kalan" bölümü).
 *
 * Yetki: backend GET/PATCH `/api/tenants/:id/legal-info` yalnız kurumun aktif ADMIN'ine açık
 * (`authenticateTenantAdminForParam`). Bu sayfa `(admin)/layout.tsx` ADMIN gating'i altında —
 * komşu admin sayfalarıyla aynı desen; ön yüz gizlemesi güvenlik değildir, kapı backend'dedir.
 */

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import { tenantLegalInfoApi, type TenantLegalInfo } from '@/lib/api/tenantLegalInfo';
import { LEGAL_FIELDS, LEGAL_INFO_TEXT, validateLegalField, type LegalFieldKey } from '@/lib/tenantLegalInfo';
import { UI_TEXT } from '@/lib/uiText';

type FormValues = Record<LegalFieldKey, string>;

const EMPTY_FORM: FormValues = {
  legalName: '', legalAddress: '', kepAddress: '', mersisNo: '', taxOffice: '', taxNumber: '',
};

function toForm(info: TenantLegalInfo): FormValues {
  return {
    legalName:    info.legalName ?? '',
    legalAddress: info.legalAddress ?? '',
    kepAddress:   info.kepAddress ?? '',
    mersisNo:     info.mersisNo ?? '',
    taxOffice:    info.taxOffice ?? '',
    taxNumber:    info.taxNumber ?? '',
  };
}

export default function LegalInfoPage() {
  const api = useApiClient();
  const { user } = useAuth();
  const tenantId = user?.tenantId;

  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (!tenantId) return;
    let cancelled = false;
    void tenantLegalInfoApi.get(api, tenantId).then((result) => {
      if (cancelled) return;
      if (result.ok) {
        setValues(toForm(result.data.legalInfo));
        setUpdatedAt(result.data.legalInfo.legalInfoUpdatedAt);
      } else {
        setAlert({ type: 'error', message: LEGAL_INFO_TEXT.loadError });
      }
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [api, tenantId]);

  const errors = Object.fromEntries(
    LEGAL_FIELDS.map((f) => [f.key, validateLegalField(f.key, values[f.key])]),
  ) as Record<LegalFieldKey, string | null>;
  const hasErrors = Object.values(errors).some(Boolean);
  const canSave = !loading && !saving && !hasErrors;

  async function handleSave() {
    setAlert(null);
    if (hasErrors) return;
    if (!tenantId) {
      setAlert({ type: 'error', message: LEGAL_INFO_TEXT.sessionMissing });
      return;
    }

    setSaving(true);
    // Tüm alanlar gönderilir; boş alan backend'de null'a çevrilir (kayıtlı değeri temizler).
    const result = await tenantLegalInfoApi.update(api, tenantId, values);
    setSaving(false);

    if (result.ok) {
      setValues(toForm(result.data.legalInfo));
      setUpdatedAt(result.data.legalInfo.legalInfoUpdatedAt);
      setAlert({ type: 'success', message: LEGAL_INFO_TEXT.saved });
    } else {
      setAlert({ type: 'error', message: result.error.message ?? LEGAL_INFO_TEXT.saveError });
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">{LEGAL_INFO_TEXT.pageTitle}</h1>
        <p className="text-sm text-muted-foreground">{LEGAL_INFO_TEXT.pageDescription}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{LEGAL_INFO_TEXT.cardTitle}</CardTitle>
          <CardDescription>{LEGAL_INFO_TEXT.cardDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {LEGAL_FIELDS.map((field) => {
            const id = `legal-${field.key}`;
            const error = errors[field.key];
            const common = {
              id,
              value: values[field.key],
              placeholder: field.placeholder,
              maxLength: field.maxLength,
              disabled: loading,
              'aria-invalid': Boolean(error),
            };
            return (
              <div key={field.key} className="space-y-1.5">
                <label htmlFor={id} className="text-sm font-medium text-foreground">{field.label}</label>
                {field.multiline ? (
                  <textarea
                    {...common}
                    rows={3}
                    onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                  />
                ) : (
                  <Input
                    {...common}
                    inputMode={field.inputMode}
                    onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  />
                )}
                {error ? (
                  <p className="text-xs text-destructive">{error}</p>
                ) : field.hint ? (
                  <p className="text-xs text-muted-foreground">{field.hint}</p>
                ) : null}
              </div>
            );
          })}

          {updatedAt && (
            <p className="text-xs text-muted-foreground">
              {LEGAL_INFO_TEXT.lastUpdated}: {new Date(updatedAt).toLocaleString('tr-TR')}
            </p>
          )}

          {alert && <AlertMessage type={alert.type} message={alert.message} />}

          <div className="flex justify-end">
            <Button type="button" onClick={handleSave} disabled={!canSave}>
              {saving ? UI_TEXT.status.saving : UI_TEXT.actions.save}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
