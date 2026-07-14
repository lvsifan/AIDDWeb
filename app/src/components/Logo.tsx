import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  size?: number;
  showText?: boolean;
  collapsed?: boolean;
};

export function Logo({ className, size = 28, showText = true, collapsed = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div
        className="relative shrink-0"
        style={{ width: size, height: size }}
        aria-hidden
      >
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(217 91% 65%)" />
              <stop offset="100%" stopColor="hsl(262 83% 65%)" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="28" height="28" rx="7" fill="url(#logo-gradient)" />
          <path
            d="M11 9.5a4.5 4.5 0 0 1 4.5 4.5v.5a4.5 4.5 0 0 1 4.5-4.5h.5v3.2a4.5 4.5 0 0 1-4.5 4.5h-.5v.8a4.5 4.5 0 0 1-4.5 4.5h-.5v-3.2A4.5 4.5 0 0 1 14.5 15V14a4.5 4.5 0 0 1-4.5-4.5V9.5h.5z"
            fill="white"
            fillOpacity="0.95"
          />
          <circle cx="22.5" cy="9.5" r="1.4" fill="white" fillOpacity="0.9" />
        </svg>
      </div>
      {showText && !collapsed && (
        <div className="leading-tight">
          <div className="text-[15px] font-semibold tracking-tight">PharmaAIDD</div>
          <div className="text-[10px] text-muted-foreground">AI-Driven Drug Discovery</div>
        </div>
      )}
    </div>
  );
}
