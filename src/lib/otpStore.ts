// lib/otpStore.ts

const otpStore = new Map<string, string>();

export function getStoredOTP(email: string) {
  return otpStore.get(email);
}

export function setStoredOTP(email: string, otp: string) {
  otpStore.set(email, otp);
}

export function deleteStoredOTP(email: string) {
  otpStore.delete(email);
}
