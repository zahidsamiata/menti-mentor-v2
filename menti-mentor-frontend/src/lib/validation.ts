/**
 * Zod validasyon şemaları — backend şemalarıyla senkronize tutulmalı.
 * Değişiklik yapılacaksa: authController.ts RegisterSchema ve LoginSchema'ya bakın.
 */

import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(1, 'Şifre zorunlu'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
