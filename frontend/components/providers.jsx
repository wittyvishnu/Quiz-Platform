'use client';

import { SidebarProvider } from '@/components/ui/sidebar';

export default function Providers({ children }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
