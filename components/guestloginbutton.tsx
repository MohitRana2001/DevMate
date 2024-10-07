"use client";

import { useRouter } from 'next/navigation';

export function GuestLoginButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/guestLoginPage')}
      className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
    >
      Continue as Guest <span aria-hidden="true">→</span>
    </button>
  );
}