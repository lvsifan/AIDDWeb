import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { getTheme, toggleTheme, onThemeChange, type ThemeMode } from '@/lib/theme';
import { cn } from '@/lib/utils';

/**
 * Premium theme toggle — animated sun/moon transition.
 *
 * Shared between PharmaAIDD portal and FlexFit tool.
 * When both sites are on the same domain, localStorage keeps them in sync.
 * When cross-origin (iframe), the integration bridge handles sync via postMessage.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<ThemeMode>(getTheme());

  useEffect(() => {
    return onThemeChange(setTheme);
  }, []);

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => toggleTheme()}
      className={cn(
        'relative inline-flex items-center justify-center h-9 w-9 rounded-md',
        'text-muted-foreground hover:text-foreground hover:bg-secondary/60',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        className,
      )}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <Sun
        className={cn(
          'absolute h-[18px] w-[18px] transition-all duration-300',
          isDark
            ? 'rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100',
        )}
      />
      <Moon
        className={cn(
          'absolute h-[18px] w-[18px] transition-all duration-300',
          isDark
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0',
        )}
      />
    </button>
  );
}
