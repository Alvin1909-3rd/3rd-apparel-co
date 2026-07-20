'use client';
import { useState, useEffect, useCallback } from 'react';

export interface LedgerProgress {
  onboardingSeen: boolean;
  clearedModules: string[];
  redFlagsChecked: number[];
  securityChecked: number[];
  theme: 'dark' | 'light';
}

const STORAGE_KEY = 'ledger_v1';

const DEFAULT: LedgerProgress = {
  onboardingSeen: false,
  clearedModules: [],
  redFlagsChecked: [],
  securityChecked: [],
  theme: 'dark',
};

function load(): LedgerProgress {
  if (typeof window === 'undefined') return { ...DEFAULT };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : { ...DEFAULT };
  } catch {
    return { ...DEFAULT };
  }
}

export function useLedgerProgress() {
  const [progress, setProgress] = useState<LedgerProgress>(DEFAULT);

  useEffect(() => {
    setProgress(load());
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch {}
  }, [progress]);

  const markOnboardingSeen = useCallback(() => {
    setProgress(p => ({ ...p, onboardingSeen: true }));
  }, []);

  const toggleModule = useCallback((id: string) => {
    setProgress(p => ({
      ...p,
      clearedModules: p.clearedModules.includes(id)
        ? p.clearedModules.filter(m => m !== id)
        : [...p.clearedModules, id],
    }));
  }, []);

  const toggleRedFlag = useCallback((index: number) => {
    setProgress(p => ({
      ...p,
      redFlagsChecked: p.redFlagsChecked.includes(index)
        ? p.redFlagsChecked.filter(i => i !== index)
        : [...p.redFlagsChecked, index],
    }));
  }, []);

  const toggleSecurity = useCallback((index: number) => {
    setProgress(p => ({
      ...p,
      securityChecked: p.securityChecked.includes(index)
        ? p.securityChecked.filter(i => i !== index)
        : [...p.securityChecked, index],
    }));
  }, []);

  const setTheme = useCallback((theme: 'dark' | 'light') => {
    setProgress(p => ({ ...p, theme }));
  }, []);

  return { progress, markOnboardingSeen, toggleModule, toggleRedFlag, toggleSecurity, setTheme };
}
