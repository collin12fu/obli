// AboutLinks Component

'use client';

import { useRouter } from 'next/navigation';

export default function AboutLinks() {
  const router = useRouter();

  return (
    <div className="flex justify-center gap-6 pt-4">
      <button
        onClick={() => router.push('/about')}
        className="text-sm text-white hover:underline hover:text-accent transition"
      >
        About Obli
      </button>
      <button
        onClick={() => router.push('/creators')}
        className="text-sm text-white hover:underline hover:text-accent transition"
      >
        About Creators
      </button>
    </div>
  );
}