import { useState } from 'react';
import { Check, Bell, Briefcase, Shield, Database, CreditCard, Users, Key, Settings as SettingsIcon } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { notifications } from '@/lib/data';
import { cn } from '@/lib/utils';

type Tab = 'all' | 'unread' | 'job' | 'system' | 'security';

const tabs: { id: Tab; label: string }[] = [
  { id: 'all',      label: 'All'        },
  { id: 'unread',   label: 'Unread'     },
  { id: 'job',      label: 'Jobs'       },
  { id: 'system',   label: 'System'     },
  { id: 'security', label: 'Security'   },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Job:      Briefcase,
  System:   SettingsIcon,
  Security: Shield,
  Storage:  Database,
  Credits:  CreditCard,
  Team:     Users,
  API:      Key,
};

const iconColor: Record<string, string> = {
  Job:      'hsl(217 91% 60%)',
  System:   'hsl(262 83% 58%)',
  Security: 'hsl(0 72% 51%)',
  Storage:  'hsl(38 92% 50%)',
  Credits:  'hsl(190 90% 50%)',
  Team:     'hsl(142 71% 45%)',
  API:      'hsl(320 80% 60%)',
};

export default function NotificationsPage() {
  const [tab, setTab] = useState<Tab>('all');
  const [readState, setReadState] = useState<Record<string, boolean>>(
    Object.fromEntries(notifications.map((n) => [n.id, n.read])),
  );

  let filtered = notifications.map((n) => ({ ...n, read: readState[n.id] }));
  if (tab === 'unread')   filtered = filtered.filter((n) => !n.read);
  if (tab === 'job')      filtered = filtered.filter((n) => n.type === 'Job');
  if (tab === 'system')   filtered = filtered.filter((n) => n.type === 'System' || n.type === 'Storage' || n.type === 'Credits');
  if (tab === 'security') filtered = filtered.filter((n) => n.type === 'Security' || n.type === 'API');

  const unreadCount = Object.values(readState).filter((v) => !v).length;

  const markAll = () => {
    const next: Record<string, boolean> = {};
    Object.keys(readState).forEach((k) => (next[k] = true));
    setReadState(next);
  };

  return (
    <>
      <PageHeader
        title="Notification Center"
        description="Stay updated with relevant alerts and notifications."
        actions={
          <Button variant="outline" size="sm" onClick={markAll} disabled={unreadCount === 0}>
            <Check className="h-3.5 w-3.5" /> Mark all as read
          </Button>
        }
      />

      <div className="border-b border-border/60 mb-4">
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'px-4 py-2 text-[12px] font-medium border-b-2 transition-colors',
                tab === t.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {t.label}
              {t.id === 'unread' && unreadCount > 0 && (
                <span className="ml-1.5 text-[10px] gradient-primary text-white px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 max-w-3xl">
        {filtered.length === 0 && (
          <div className="surface-card p-12 text-center text-muted-foreground">
            <Bell className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <div className="text-[13px]">No notifications here</div>
          </div>
        )}
        {filtered.map((n) => {
          const Icon = iconMap[n.type] || Bell;
          return (
            <div
              key={n.id}
              onClick={() => setReadState({ ...readState, [n.id]: true })}
              className={cn(
                'surface-card p-4 flex items-start gap-3 cursor-pointer transition-colors',
                !n.read && 'border-primary/30 bg-primary/5',
              )}
            >
              <div
                className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center"
                style={{ background: `${iconColor[n.type]}26`, color: iconColor[n.type] }}
              >
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[13px] font-semibold">{n.title}</h3>
                  {!n.read && <span className="h-1.5 w-1.5 rounded-full gradient-primary" />}
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">{n.body}</p>
                <div className="text-[10px] text-muted-foreground/70 mt-1.5">{n.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
