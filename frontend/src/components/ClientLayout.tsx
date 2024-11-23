'use client';

import Layout from './Layout';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}