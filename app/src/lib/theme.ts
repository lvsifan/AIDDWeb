/**
 * Shared theme controller — used by both PharmaAIDD portal and FlexFit tool.
 *
 * Design principle: both sites use the SAME localStorage key so that when
 * they're served from the same domain (future integration), theme stays in
 * sync automatically. When cross-origin (iframe), the integration bridge
 * takes over via postMessage.
 *
 * Contract for future integration:
 *   - localStorage key:  "pharmaaidd:theme"
 *   - values:            "dark" | "light"
 *   - default:           "dark"
 *   - CSS class on <html>: ".light" (absence = dark)
 *   - Event:             "pharmaaidd:theme-change" on window
 */

export type ThemeMode = 'dark' | 'light';

const STORAGE_KEY = 'pharmaaidd:theme';
const THEME_EVENT = 'pharmaaidd:theme-change';

/** Read persisted theme, defaulting to 'dark'. */
export function getTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* SSR or privacy mode — fall through to default */
  }
  return 'dark';
}

/** Apply theme class to <html> and persist. */
export function setTheme(mode: ThemeMode): void {
  const root = document.documentElement;
  if (mode === 'light') {
    root.classList.add('light');
  } else {
    root.classList.remove('light');
  }
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* ignore quota / privacy errors */
  }
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: { mode } }));
}

/** Flip between dark and light. Returns the new mode. */
export function toggleTheme(): ThemeMode {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

/**
 * Initialise theme on app boot.
 * Call this BEFORE React renders (in main.tsx, before createRoot).
 * Reads localStorage and applies the class to prevent FOUC.
 */
export function initTheme(): ThemeMode {
  const mode = getTheme();
  const root = document.documentElement;
  if (mode === 'light') {
    root.classList.add('light');
  } else {
    root.classList.remove('light');
  }
  return mode;
}

/** Subscribe to theme changes (for React state sync). Returns unsubscribe. */
export function onThemeChange(callback: (mode: ThemeMode) => void): () => void {
  const handler = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    if (detail?.mode) callback(detail.mode);
  };
  window.addEventListener(THEME_EVENT, handler);
  return () => window.removeEventListener(THEME_EVENT, handler);
}

export { STORAGE_KEY as THEME_STORAGE_KEY, THEME_EVENT as THEME_CHANGE_EVENT };
