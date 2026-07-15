import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  FlaskConical,
  Send,
  Briefcase,
  BarChart3,
  GitBranch,
  Users,
  Key,
  ScrollText,
  Settings,
  Database,
  Bell,
  Server,
  FileText,
  Sparkles,
  BookOpen,
  UserCog,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';

type Item = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
};

const primary: Item[] = [
  { to: '/dashboard',  label: 'Dashboard',       icon: LayoutDashboard },
  { to: '/projects',   label: 'Projects',        icon: FolderKanban    },
  { to: '/tools',      label: 'Tool Library',    icon: FlaskConical    },
  { to: '/datasets',   label: 'Datasets',        icon: Database        },
  { to: '/submit',     label: 'Task Submission', icon: Send            },
  { to: '/jobs',       label: 'Jobs',            icon: Briefcase       },
  { to: '/results',    label: 'Results',         icon: BarChart3       },
  { to: '/workflows',  label: 'Workflows',       icon: GitBranch       },
  { to: '/ai',         label: 'AI Assistant',    icon: Sparkles        },
];

const admin: Item[] = [
  { to: '/users',     label: 'Users',          icon: Users     },
  { to: '/team',      label: 'Team',           icon: UserCog   },
  { to: '/apikeys',   label: 'API Keys',       icon: Key       },
  { to: '/admin',     label: 'Admin',          icon: Server    },
  { to: '/cluster',   label: 'Compute Cluster',icon: Server    },
  { to: '/audit',     label: 'Audit Logs',     icon: ScrollText},
  { to: '/reports',   label: 'Reports',        icon: FileText  },
  { to: '/settings',  label: 'Settings',       icon: Settings  },
  { to: '/docs',      label: 'Documentation',  icon: BookOpen  },
  { to: '/notifications', label: 'Notifications', icon: Bell, badge: 3 },
];

function NavSection({ items, label }: { items: Item[]; label?: string }) {
  return (
    <div className="px-2">
      {label && (
        <div className="px-3 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          {label}
        </div>
      )}
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors',
                  isActive
                    ? 'gradient-primary-soft text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn(
                      'h-[15px] w-[15px] shrink-0 transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground/80 group-hover:text-foreground',
                    )}
                  />
                  <span className="truncate flex-1">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full gradient-primary text-white">
                      {item.badge}
                    </span>
                  )}
                  {isActive && item.badge === undefined && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full gradient-primary" />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border/60 bg-sidebar">
      {/* Brand */}
      <div className="h-16 flex items-center px-4 border-b border-border/60">
        <Logo />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-2">
        <NavSection items={primary} />
        <NavSection items={admin} label="Admin" />
      </nav>

      {/* User card */}
      <div className="border-t border-border/60 p-3">
        <NavLink
          to="/settings"
          className="flex items-center gap-2.5 p-2 rounded-md hover:bg-sidebar-accent cursor-pointer transition-colors"
        >
          <div className="h-8 w-8 shrink-0 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-semibold">
            AS
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-medium truncate">Alex Smith</div>
            <div className="text-[11px] text-muted-foreground truncate">Computational Chemist</div>
          </div>
          <Settings className="h-4 w-4 text-muted-foreground/60" />
        </NavLink>
      </div>
    </aside>
  );
}
