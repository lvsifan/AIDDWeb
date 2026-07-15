import { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Mail, Check } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { users } from '@/lib/data';
import { cn } from '@/lib/utils';

type Tab = 'all' | 'active' | 'pending' | 'inactive';

const tabs: { id: Tab; label: string }[] = [
  { id: 'all',      label: 'All Members' },
  { id: 'active',   label: 'Active'      },
  { id: 'pending',  label: 'Pending'     },
  { id: 'inactive', label: 'Inactive'    },
];

const initials = (name: string) => name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

export default function TeamPage() {
  const [tab, setTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');

  let filtered = users;
  if (tab === 'active')   filtered = users.filter((u) => u.apiKeyStatus === 'Active');
  if (tab === 'pending')  filtered = users.filter((u) => u.apiKeyStatus === 'Pending');
  if (tab === 'inactive') filtered = users.filter((u) => u.apiKeyStatus === 'Suspended');
  if (search)             filtered = filtered.filter((u) => u.fullName.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <PageHeader
        title="Team Management"
        description="Manage team members and their permissions."
        actions={
          <Button size="sm" className="gradient-primary text-white border-0 hover:opacity-90">
            <Plus className="h-3.5 w-3.5" /> Invite Member
          </Button>
        }
      />

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search members..."
            className="pl-9 h-9 bg-secondary/30"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-3.5 w-3.5" /> Filters
        </Button>
      </div>

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
              {t.label} <span className="text-muted-foreground/60 text-[10px] ml-1">({t.id === 'all' ? users.length : users.filter((u) => u.apiKeyStatus === (t.id === 'active' ? 'Active' : t.id === 'pending' ? 'Pending' : 'Suspended')).length})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="surface-card p-0 overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-muted-foreground/70 border-b border-border/60 bg-secondary/30">
              <th className="text-left font-medium py-2.5 pl-3">Name</th>
              <th className="text-left font-medium py-2.5">Email</th>
              <th className="text-left font-medium py-2.5">Department</th>
              <th className="text-left font-medium py-2.5">Role</th>
              <th className="text-left font-medium py-2.5">Status</th>
              <th className="text-right font-medium py-2.5 pr-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-border/40 hover:bg-secondary/20">
                <td className="py-2.5 pl-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="h-7 w-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold"
                      style={{ background: `hsl(${u.avatarColor})` }}
                    >
                      {initials(u.fullName)}
                    </div>
                    <div>
                      <div className="font-medium">{u.fullName}</div>
                      <div className="text-[10px] text-muted-foreground">{u.id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-2.5 text-muted-foreground">{u.email}</td>
                <td className="py-2.5 text-muted-foreground">{u.department}</td>
                <td className="py-2.5">
                  <span className={cn('pill', u.role === 'Admin' && 'pill-completed', u.role === 'Researcher' && 'pill-running', u.role === 'User' && 'pill-pending')}>
                    {u.role}
                  </span>
                </td>
                <td className="py-2.5">
                  <span className={cn(
                    'pill',
                    u.apiKeyStatus === 'Active'    && 'pill-completed',
                    u.apiKeyStatus === 'Pending'   && 'pill-pending',
                    u.apiKeyStatus === 'Suspended' && 'pill-failed',
                  )}>
                    {u.apiKeyStatus === 'Active' && <Check className="h-3 w-3" />}
                    {u.apiKeyStatus}
                  </span>
                </td>
                <td className="py-2.5 pr-3 text-right">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Mail className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreVertical className="h-3.5 w-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-3 py-2.5 text-[11px] text-muted-foreground border-t border-border/40 flex items-center justify-between">
          <span>Showing {filtered.length} of {users.length} members</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-6 text-[10px]">‹</Button>
            <Button variant="default" size="sm" className="h-6 text-[10px] gradient-primary text-white border-0">1</Button>
            <Button variant="outline" size="sm" className="h-6 text-[10px]">2</Button>
            <Button variant="outline" size="sm" className="h-6 text-[10px]">›</Button>
          </div>
        </div>
      </div>
    </>
  );
}
