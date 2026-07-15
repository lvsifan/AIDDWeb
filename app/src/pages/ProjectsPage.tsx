import { useState } from 'react';
import { Search, Plus, Filter, Users, Calendar, FolderKanban, MoreVertical } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';

type Tab = 'all' | 'mine' | 'shared' | 'archived';

const tabs: { id: Tab; label: string }[] = [
  { id: 'all',      label: 'All Projects'    },
  { id: 'mine',     label: 'My Projects'     },
  { id: 'shared',   label: 'Shared With Me'  },
  { id: 'archived', label: 'Archived'        },
];

const projectColor = [
  'hsl(217 91% 60%)',
  'hsl(262 83% 58%)',
  'hsl(142 71% 45%)',
  'hsl(38 92% 50%)',
  'hsl(190 90% 50%)',
  'hsl(0 72% 51%)',
];

export default function ProjectsPage() {
  const [tab, setTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');

  let filtered = projects;
  if (tab === 'mine')     filtered = projects.filter((p) => p.mine);
  if (tab === 'shared')   filtered = projects.filter((p) => p.shared);
  if (tab === 'archived') filtered = projects.filter((p) => p.archived);
  if (search)             filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <PageHeader
        title="Project Management"
        description="Organize and manage your drug discovery projects."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-3.5 w-3.5" /> Filters
            </Button>
            <Button size="sm" className="gradient-primary text-white border-0 hover:opacity-90">
              <Plus className="h-3.5 w-3.5" /> New Project
            </Button>
          </div>
        }
      />

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="pl-9 h-9 bg-secondary/30"
          />
        </div>
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
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((p, i) => {
          const color = projectColor[i % projectColor.length];
          return (
            <div key={p.id} className="surface-card p-4 hover:border-primary/40 transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-2">
                <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: `${color}26`, color }}>
                  <FolderKanban className="h-[18px] w-[18px]" />
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
              </div>
              <h3 className="text-[14px] font-semibold truncate mb-1">{p.name}</h3>
              <div className="text-[11px] text-muted-foreground mb-3">{p.type}</div>

              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Members</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{p.members}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Owner</span>
                  <span className="truncate max-w-[60%] text-right">{p.owner}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Updated</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{p.updated}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border/40">
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{p.progress}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${p.progress}%`,
                      background: p.progress === 100 ? 'hsl(142 71% 45%)' : `linear-gradient(90deg, ${color}, hsl(262 83% 58%))`,
                    }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className={cn(
                    'pill',
                    p.status === 'Active'      && 'pill-running',
                    p.status === 'In Progress' && 'pill-running',
                    p.status === 'Completed'   && 'pill-completed',
                    p.status === 'On Hold'     && 'pill-pending',
                  )}>
                    {p.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
