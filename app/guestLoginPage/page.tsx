"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function GuestLoginPage() {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn('credentials', { name, callbackUrl: '/browse' });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <button 
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Continue as Guest
        </button>
      </form>
    </div>
  );
}