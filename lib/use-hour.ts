'use client';

import { useSyncExternalStore } from 'react';

// Re-read every minute so open/closed labels stay right on a page left open.
const subscribe = (cb: () => void) => { const t = setInterval(cb, 60_000); return () => clearInterval(t); };
const clientHour = () => new Date().getHours();
const serverHour = () => null;

/**
 * Current hour in the visitor's timezone, or null during prerender and hydration.
 * Server and first client render agree (null), then React swaps in the real hour.
 */
export const useHour = () => useSyncExternalStore(subscribe, clientHour, serverHour);
