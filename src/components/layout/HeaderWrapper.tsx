'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function HeaderWrapper() {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith('/auth');

  if (isAuthPage) return null;

  return <Header />;
}