/**
 * Zod validasyon şemaları — backend şemalarıyla senkronize tutulmalı.
 * Değişiklik yapılacaksa: authController.ts RegisterSchema ve LoginSchema'ya bakın.
 */

import { z } from 'zod';

// ─── Şifre kuralı (GV-19) ─────────────────────────────────────────────────────
// backend src/services/passwordPolicy.ts ile BİREBİR aynı: 8-128 karakter, en az bir harf
// (Türkçe dahil) + en az bir rakam. Yalnız şifre BELİRLENİRKEN uygulanır — girişte değil.
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;

export const PASSWORD_MESSAGES = {
  TOO_SHORT: `Şifre en az ${PASSWORD_MIN_LENGTH} karakter olmalı`,
  TOO_LONG: `Şifre en fazla ${PASSWORD_MAX_LENGTH} karakter olabilir`,
  NEEDS_LETTER: 'Şifre en az bir harf içermeli',
  NEEDS_DIGIT: 'Şifre en az bir rakam içermeli',
} as const;

/** Formlarda şifre alanının altında gösterilen kural ipucu. */
export const PASSWORD_RULE_HINT = `En az ${PASSWORD_MIN_LENGTH} karakter; en az bir harf ve bir rakam içermeli.`;

export const passwordRule = z
  .string()
  .min(PASSWORD_MIN_LENGTH, PASSWORD_MESSAGES.TOO_SHORT)
  .max(PASSWORD_MAX_LENGTH, PASSWORD_MESSAGES.TOO_LONG)
  .regex(/\p{L}/u, PASSWORD_MESSAGES.NEEDS_LETTER)
  .regex(/\d/, PASSWORD_MESSAGES.NEEDS_DIGIT);

/**
 * useFormState kullanmayan formlar (kayıt, kurum kaydı) için: ilk kural ihlalinin mesajı,
 * geçerliyse undefined.
 */
export function passwordRuleError(password: string): string | undefined {
  const parsed = passwordRule.safeParse(password);
  return parsed.success ? undefined : parsed.error.issues[0]?.message;
}

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(1, 'Şifre zorunlu'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// authController.ts ForgotPasswordSchema ile senkron.
export const forgotPasswordSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// authController.ts ResetPasswordSchema ile senkron (password = passwordRule, GV-19).
// confirmPassword yalnızca frontend UX kontrolü — backend token + password bekler.
export const resetPasswordSchema = z
  .object({
    password: passwordRule,
    confirmPassword: z.string().min(1, 'Şifre tekrarı zorunlu'),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: 'Şifreler eşleşmiyor',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

// GV-19: oturum içi şifre değiştirme — backend ChangePasswordSchema ile senkron.
// confirmNewPassword yalnız frontend UX kontrolü; backend { currentPassword, newPassword } bekler.
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Mevcut şifre zorunlu'),
    newPassword: passwordRule,
    confirmNewPassword: z.string().min(1, 'Yeni şifre tekrarı zorunlu'),
  })
  .refine((v) => v.newPassword === v.confirmNewPassword, {
    message: 'Şifreler eşleşmiyor',
    path: ['confirmNewPassword'],
  })
  .refine((v) => v.newPassword !== v.currentPassword, {
    message: 'Yeni şifre mevcut şifrenizden farklı olmalı',
    path: ['newPassword'],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
