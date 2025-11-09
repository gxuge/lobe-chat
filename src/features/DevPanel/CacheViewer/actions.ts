'use server';

import type { NextCacheFileData } from './schema';

// Server Action that can be called from client components
export async function refreshCacheFiles(): Promise<NextCacheFileData[]> {
  // Dynamic import to avoid loading node:fs in client bundle
  const { getCacheFiles } = await import('./getCacheEntries');
  return getCacheFiles();
}
