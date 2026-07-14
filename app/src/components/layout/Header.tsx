import { Search, Bell, HelpCircle, Menu, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Logo } from '@/components/Logo';

type HeaderProps = {
  onMenuClick?: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 flex items-center gap-4 border-b border-border/60 bg-background/80 backdrop-blur px-4 md:px-6">
      {/* Mobile menu */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden -ml-2"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile-only logo */}
      <div className="md:hidden">
        <Logo size={26} />
      </div>

      {/* Search */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools, categories, or keywords..."
            className="pl-9 pr-12 h-10 bg-secondary/40 border-border/60 focus-visible:bg-secondary/60"
          />
          <kbd className="hidden sm:inline-flex absolute right-3 top-1/2 -translate-y-1/2 h-5 items-center rounded border border-border/60 bg-background/60 px-1.5 text-[10px] font-mono text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <Button variant="ghost" size="icon" aria-label="Help">
          <HelpCircle className="h-4.5 w-4.5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="h-4.5 w-4.5" />
              <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px] flex items-center justify-center gradient-primary text-white border-0">
                2
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <span className="text-[10px] text-muted-foreground font-normal">2 new</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-0.5 py-2.5">
              <div className="text-[13px] font-medium">Job #989234 is running</div>
              <div className="text-[11px] text-muted-foreground">Docking_Batch_0427 — 72% complete</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-0.5 py-2.5">
              <div className="text-[13px] font-medium">New API key issued</div>
              <div className="text-[11px] text-muted-foreground">For Li Wei (EMP-10008)</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-4.5 w-4.5" />
        </Button>

        <div className="h-8 w-px bg-border/60 mx-1" />

        <button className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-md hover:bg-secondary/60 transition-colors">
          <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-semibold">
            AS
          </div>
          <div className="hidden lg:flex flex-col items-start leading-tight">
            <span className="text-[13px] font-medium">Alex Smith</span>
            <span className="text-[10px] text-muted-foreground">Admin</span>
          </div>
        </button>
      </div>
    </header>
  );
}
