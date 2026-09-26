'use client';

/**
 * GranularConsentForm — AN-30 / KARAR-34: kayıt ekranında AYRI AYRI rıza kutuları.
 *
 * KARAR-34 SORU 1 (cevaplandı): tek birleşik onay kutusu yerine ZORUNLU (kayıt için hepsi
 * gerekli) ve İSTEĞE BAĞLI (onaylanmasa da kayıt tamamlanır) iki grup ayrı ayrı gösterilir.
 * Backend karşılığı: `backend/src/services/consentService.ts`
 * (MANDATORY_/OPTIONAL_SIGNUP_CONSENT_TYPES + recordGranularSignupConsent).
 *
 * ⚠️ KARAR-80 M17 (2026-09-25): metinler YER TUTUCUDUR — avukat onaylı gerçek KVKK metni
 * gelmeden bu ekran canlıda GERÇEK kullanıcıya açılmaz (bkz. `NEXT_PUBLIC_GRANULAR_CONSENT_ENABLED`
 * flag'i, varsayılan kapalı — `_RegisterContent.tsx`). Her madde metninin başında bu yüzden
 * `[YER TUTUCU — avukat onayı bekliyor]` etiketi durur; kimse bunu resmi metin sanmamalı.
 *
 * Kontrollü bileşen (controlled): state PARENT'ta tutulur, bu bileşen yalnız `value`'yu
 * gösterir ve değişiklikte `onChange` ile tam yeni state'i döner (diğer form alanlarıyla
 * aynı desen — bkz. _RegisterContent.tsx `kvkkConsent` state'i).
 */

import type { GranularConsentPayload } from '@/lib/api/auth';

export interface GranularConsentValue {
  // ── Zorunlu grup (KARAR-34) ──────────────────────────────────────────────
  // AN-30 7b: 18 yaş beyanı + KVKK Aydınlatma Metni (/kvkk) + açık rıza. Eski tek kutunun
  // (K4, PO kararı: 18+ beyanı KVKK onayına gömülü) BİREBİR anlamını taşır; API'ye granüler
  // grubun içinde değil `kvkkConsent` alanı olarak gider (backend AYDINLATMA + ACIK_RIZA yazar).
  ageAndNotice: boolean;
  discMatching: boolean;
  foreignStorage: boolean;
  dataProcessing: boolean;
  anonymizedImprovement: boolean;
  // ── İsteğe bağlı grup (KARAR-34) ─────────────────────────────────────────
  crossTenantSharing: boolean;
  oceanProfiling: boolean;
}

export const EMPTY_GRANULAR_CONSENT: GranularConsentValue = {
  ageAndNotice: false,
  discMatching: false,
  foreignStorage: false,
  dataProcessing: false,
  anonymizedImprovement: false,
  crossTenantSharing: false,
  oceanProfiling: false,
};

/** Zorunlu grubun TAMAMI işaretlenmiş mi? (isteğe bağlılar bu sonucu etkilemez). */
export function isGranularConsentValid(value: GranularConsentValue): boolean {
  return (
    value.ageAndNotice &&
    value.discMatching &&
    value.foreignStorage &&
    value.dataProcessing &&
    value.anonymizedImprovement
  );
}

/**
 * Formun değerini API gövdesine çevirir. Zorunlu grubun TAMAMI işaretli değilse `null` döner —
 * böylece gövde sabit `true` değil GERÇEK kutulardan türer (işaretlenmemiş bir madde asla
 * "onaylandı" diye gönderilemez).
 */
export function toGranularConsentPayload(
  value: GranularConsentValue,
): { kvkkConsent: true; granularConsent: GranularConsentPayload } | null {
  if (
    !value.ageAndNotice ||
    !value.discMatching ||
    !value.foreignStorage ||
    !value.dataProcessing ||
    !value.anonymizedImprovement
  ) {
    return null;
  }
  return {
    kvkkConsent: value.ageAndNotice,
    granularConsent: {
      discMatching: value.discMatching,
      foreignStorage: value.foreignStorage,
      dataProcessing: value.dataProcessing,
      anonymizedImprovement: value.anonymizedImprovement,
      crossTenantSharing: value.crossTenantSharing,
      oceanProfiling: value.oceanProfiling,
    },
  };
}

const PLACEHOLDER_TAG = '[YER TUTUCU — avukat onayı bekliyor]';

interface ConsentItem {
  key: keyof GranularConsentValue;
  title: string;
  description: string;
}

const MANDATORY_ITEMS: ConsentItem[] = [
  {
    key: 'discMatching',
    title: 'DISC eşleştirme',
    description: 'Kişilik profiliniz (DISC), mentör/menti eşleştirmesinde kullanılacaktır.',
  },
  {
    key: 'foreignStorage',
    title: 'Yurt dışında saklama',
    description: 'Verileriniz yurt dışında bulunan sunucularda saklanacaktır.',
  },
  {
    key: 'dataProcessing',
    title: 'Veri işleme',
    description: 'Kişisel verileriniz platform hizmetlerini sunmak amacıyla işlenecektir.',
  },
  {
    key: 'anonymizedImprovement',
    title: 'Anonim iyileştirme',
    description: 'Kimliğinizden arındırılmış verileriniz, platformu iyileştirmek için kullanılabilir.',
  },
];

const OPTIONAL_ITEMS: ConsentItem[] = [
  {
    key: 'crossTenantSharing',
    title: 'Kurumlar arası paylaşım (isteğe bağlı)',
    description: 'Profiliniz, kayıtlı olduğunuz kurum dışındaki kurumlarla da eşleştirme amacıyla paylaşılabilir.',
  },
  {
    key: 'oceanProfiling',
    title: 'OCEAN kişilik profili (isteğe bağlı)',
    description: 'OCEAN (Beş Faktör) kişilik testi sonuçlarınız, ek eşleştirme/analiz amacıyla işlenebilir.',
  },
];

interface ConsentCheckboxProps {
  item: ConsentItem;
  checked: boolean;
  onToggle: (key: keyof GranularConsentValue, checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
}

function ConsentCheckbox({ item, checked, onToggle, disabled, required }: ConsentCheckboxProps) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onToggle(item.key, e.target.checked)}
        disabled={disabled}
        aria-required={required}
        className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
      />
      <span className="text-xs text-muted-foreground leading-relaxed">
        <span className="block text-[10px] font-medium uppercase tracking-wide text-amber-600 dark:text-amber-400">
          {PLACEHOLDER_TAG}
        </span>
        <strong className="text-foreground">{item.title}{required ? ' (Zorunlu)' : ''}:</strong>{' '}
        {item.description}
      </span>
    </label>
  );
}

/** 18 yaş beyanı + Aydınlatma Metni bağlantısı — eski tek kutunun metniyle aynı anlam. */
function AgeAndNoticeCheckbox({
  checked,
  onToggle,
  disabled,
}: {
  checked: boolean;
  onToggle: (key: keyof GranularConsentValue, checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onToggle('ageAndNotice', e.target.checked)}
        disabled={disabled}
        aria-required
        className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
      />
      <span className="text-xs text-muted-foreground leading-relaxed">
        <span className="block text-[10px] font-medium uppercase tracking-wide text-amber-600 dark:text-amber-400">
          {PLACEHOLDER_TAG}
        </span>
        <strong className="text-foreground">18 yaşından büyük olduğumu beyan ederim</strong> ve{' '}
        <a href="/kvkk" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80">
          KVKK Aydınlatma Metni
        </a>
        {'’'}ni okuyup kişisel verilerimin işlenmesine açık rıza veriyorum. (Zorunlu)
      </span>
    </label>
  );
}

interface GranularConsentFormProps {
  value: GranularConsentValue;
  onChange: (value: GranularConsentValue) => void;
  disabled?: boolean;
}

export function GranularConsentForm({ value, onChange, disabled }: GranularConsentFormProps) {
  const handleToggle = (key: keyof GranularConsentValue, checked: boolean) => {
    onChange({ ...value, [key]: checked });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2.5">
        <p className="text-xs font-semibold text-foreground">Zorunlu onaylar</p>
        <AgeAndNoticeCheckbox checked={value.ageAndNotice} onToggle={handleToggle} disabled={disabled} />
        {MANDATORY_ITEMS.map((item) => (
          <ConsentCheckbox
            key={item.key}
            item={item}
            checked={value[item.key]}
            onToggle={handleToggle}
            disabled={disabled}
            required
          />
        ))}
      </div>

      <div className="space-y-2.5 border-t border-border pt-3">
        <p className="text-xs font-semibold text-foreground">İsteğe bağlı onaylar</p>
        {OPTIONAL_ITEMS.map((item) => (
          <ConsentCheckbox
            key={item.key}
            item={item}
            checked={value[item.key]}
            onToggle={handleToggle}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
