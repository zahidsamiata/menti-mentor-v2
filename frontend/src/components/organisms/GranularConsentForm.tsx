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

export interface GranularConsentValue {
  // ── Zorunlu grup (KARAR-34) ──────────────────────────────────────────────
  discMatching: boolean;
  foreignStorage: boolean;
  dataProcessing: boolean;
  anonymizedImprovement: boolean;
  // ── İsteğe bağlı grup (KARAR-34) ─────────────────────────────────────────
  crossTenantSharing: boolean;
  oceanProfiling: boolean;
}

export const EMPTY_GRANULAR_CONSENT: GranularConsentValue = {
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
    value.discMatching &&
    value.foreignStorage &&
    value.dataProcessing &&
    value.anonymizedImprovement
  );
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
