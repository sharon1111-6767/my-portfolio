import { useEffect, useState } from 'react';
import { SITE_META } from '../data/portfolioData';

export type ResumeStatus = 'checking' | 'available' | 'unavailable';

export function useResumeAvailable(): ResumeStatus {
  const [status, setStatus] = useState<ResumeStatus>('checking');

  useEffect(() => {
    let active = true;

    async function checkResume() {
      try {
        const response = await fetch(SITE_META.resumePath, {
          method: 'HEAD',
          cache: 'no-store',
        });

        const contentType = response.headers.get('content-type') || '';
        const isPdf = response.ok && contentType.toLowerCase().includes('application/pdf');

        if (active) {
          setStatus(isPdf ? 'available' : 'unavailable');
        }
      } catch {
        if (active) {
          setStatus('unavailable');
        }
      }
    }

    checkResume();

    return () => {
      active = false;
    };
  }, []);

  return status;
}
