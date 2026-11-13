export const DEFAULT_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5551989221831";

/**
 * Normalizes a phone number by stripping out all non-digit characters.
 */
export function sanitizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Generates an official WhatsApp click-to-chat URL (`wa.me`).
 *
 * @param message Pre-filled message for the chat (will be URI encoded).
 * @param phoneNumber Optional override for the target WhatsApp phone number.
 */
export function generateWhatsAppUrl(
  message?: string,
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER
): string {
  const cleanPhone = sanitizePhoneNumber(phoneNumber);

  if (!message || message.trim() === "") {
    return `https://wa.me/${cleanPhone}`;
  }

  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
