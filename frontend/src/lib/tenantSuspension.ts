/**
 * AJ-72 — Askıdaki kurum (platformun dondurduğu ya da reddettiği kurum) için ön yüz sabitleri.
 *
 * Backend askıdaki kurumun üyesine her kurum ucunda 403 + `KURUM_ASKIDA` döner
 * (`backend/src/middleware/tenantSuspension.ts` → `TENANT_SUSPENDED_BODY`). Ön yüz bu kodu
 * tanımıyordu; kullanıcı sayfa sayfa dağınık genel hata görüyordu. Artık merkezi API istemcisi
 * kodu yakalar (`lib/api/client.ts` → `tenantSuspendedCallbackRef`) ve kullanıcı tek bir askı
 * ekranına (`/kurum-askida`) yönlendirilir.
 *
 * Bu modül bağımlılıksızdır (istemci de, sayfa da buradan okur — döngüsel import yok).
 */

/** Backend'in askı yanıtındaki hata kodu (`TENANT_SUSPENDED_BODY.error`). */
export const TENANT_SUSPENDED_ERROR_CODE = 'KURUM_ASKIDA';

/** Askı ekranı. */
export const TENANT_SUSPENDED_PATH = '/kurum-askida';

/**
 * Backend cümlesinin durum kısmı — yöneticiye yalnız bu gösterilir.
 * Neden: backend cümlesinin ikinci yarısı ("Kurum yöneticinizle iletişime geçin.") yöneticinin
 * kendisine yanlış olur. Yöneticiye kime başvuracağını söylemek kuruma görünen yeni metindir
 * (ürün kararı) — karar gelene dek nötr durum cümlesi.
 */
export const TENANT_SUSPENDED_STATUS_TEXT = 'Kurumunuzun hesabı şu an askıda.';

/** Backend cümlesinin yönlendirme kısmı — yalnız üyeye (yönetici olmayan) gösterilir. */
export const TENANT_SUSPENDED_MEMBER_HINT = 'Kurum yöneticinizle iletişime geçin.';

/** Üyenin gördüğü tam cümle = backend'in canlıda döndürdüğü `TENANT_SUSPENDED_BODY.message` AYNEN. */
export const TENANT_SUSPENDED_MEMBER_TEXT = `${TENANT_SUSPENDED_STATUS_TEXT} ${TENANT_SUSPENDED_MEMBER_HINT}`;

