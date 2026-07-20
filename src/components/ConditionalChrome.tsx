'use client';
import { usePathname } from 'next/navigation';

export default function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith('/guide')) return null;
  return <>{children}</>;
}
