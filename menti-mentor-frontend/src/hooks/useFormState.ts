/**
 * Generic form state hook — Zod şeması ile type-safe validasyon.
 *
 * Tasarım kararı: react-hook-form yerine minimal custom hook tercih edildi.
 * Tek sorumluluk: alan değerleri, hata mesajları ve submit durumunu yönetir.
 * Zod, submit anında tam doğrulama yapar; alan bazlı hata güncellenir.
 */

import { useState, useCallback, type ChangeEvent } from 'react';
import { type ZodSchema, type ZodIssue } from 'zod';

export interface FormState<T extends Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  serverError: string | null;
}

export interface UseFormStateReturn<T extends Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  serverError: string | null;
  /** Input onChange handler — name özelliği zorunlu */
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  /** Programatik değer setter */
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  /** Form submit: Zod ile doğrula, başarılıysa onSubmit'i çağır */
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => (e: React.FormEvent) => void;
  setServerError: (msg: string | null) => void;
}

export function useFormState<T extends Record<string, unknown>>(
  schema: ZodSchema<T>,
  initialValues: T,
): UseFormStateReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Kullanıcı yazmaya başlayınca alan hatasını temizle
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError(null);
  }, []);

  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => Promise<void>) =>
      async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError(null);

        const result = schema.safeParse(values);
        if (!result.success) {
          const fieldErrors: Partial<Record<keyof T, string>> = {};
          result.error.issues.forEach((issue: ZodIssue) => {
            const field = issue.path[0] as keyof T;
            if (field && !fieldErrors[field]) {
              fieldErrors[field] = issue.message;
            }
          });
          setErrors(fieldErrors);
          return;
        }

        setIsSubmitting(true);
        try {
          await onSubmit(result.data);
        } finally {
          setIsSubmitting(false);
        }
      },
    [schema, values],
  );

  return { values, errors, isSubmitting, serverError, handleChange, setValue, handleSubmit, setServerError };
}
