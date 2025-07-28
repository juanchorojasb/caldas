'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthRedirect() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoaded) return;

    // Si hay usuario autenticado
    if (user) {
      const userCreated = new Date(user.createdAt!);
      const now = new Date();
      const timeDiff = now.getTime() - userCreated.getTime();
      const minutesDiff = timeDiff / (1000 * 60);
      const hasCompletedOnboarding = user.publicMetadata?.plan;

      // Si es usuario nuevo sin plan y no está ya en onboarding
      if (minutesDiff < 10 && !hasCompletedOnboarding && !pathname.startsWith('/onboarding')) {
        console.log('🔄 Redirigiendo usuario nuevo a planes...');
        router.push('/onboarding/planes');
        return;
      }

      // Si usuario completó programa y está en raíz, ir a dashboard
      if (hasCompletedOnboarding && pathname === '/') {
        router.push('/dashboard');
        return;
      }
    }
  }, [isLoaded, user, router, pathname]);

  return null;
}
