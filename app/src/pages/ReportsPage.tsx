import { useState } from 'react';
import { Search, Plus, Filter, FileText, Download, MoreVertical, Loader2, CheckCircle2, Edit } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { reports } from '@/lib/data';
import { cn } from '@/lib/utils';

const typeColor: Record<string, string> = {
  Docking:        'pill-running',
  ADMET:          'pill-completed',
  MD:             'pill-pending',
  'Virtual Screen': 'pill-pending',
  Analysis:       'pill-running',
};

const statusIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  Completed: CheckCircle2,
  Running:   Loader2,
  Draft:     Edit,
};

export default function ReportsPage() {
  const [search, setSearch] = useState('');

  const filtered = search
    ? reports.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.relatedTo.toLowerCase().includes(search.toLowerCase()) ||
        r.project.toLowerCase().includes(search.toLowerCase()) ||
        r.createdBy.toLowerCase().includes(search.toLowerCase()),
      )
    : reports;

  return (
    <>
      <PageHeader
        title="Report Center"
        description="Generate and manage experiment reports."
        actions={
          <Button size="sm" className="gradient-primary text-white border-0 hover:opacity-90">
            <Plus className="h-3.5 w-3.5" /> New Report
          </Button>
        }
      />

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reports..."
            className="pl-9 h-9 bg-secondary/30"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-3.5 w-3.5" /> Filters
        </Button>
      </div>

      <div className="space-y-2.5">
        {filtered.map((r) => {
          const StatusIcon = statusIcon[r.status];
          return (
            <div key={r.id} className="surface-card p-3.5 flex items-center gap-3 hover:border-primary/30 transition-colors">
              <div
                className={cn(
                  'h-10 w-10 rounded-lg flex items-center justify-center shrink-0',
                  r.status === 'Completed' && 'bg-emerald-500/15 text-emerald-400',
                  r.status === 'Running'   && 'bg-blue-500/15 text-blue-400',
                  r.status === 'Draft'     && 'bg-amber-500/15 text-amber-400',
                )}
              >
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[13px] font-semibold truncate">{r.title}</h3>
                  <span className={cn('pill text-[9px]', typeColor[r.type] || 'pill')}>{r.type}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1">
                  <span>Related: <span className="text-foreground/80">{r.relatedTo}</span></span>
                  <span>·</span>
                  <span>Project: <span className="text-foreground/80">{r.project}</span></span>
                  <span>·</span>
                  <span>By: <span className="text-foreground/80">{r.createdBy}</span></span>
                  <span>·</span>
                  <span className="font-mono">{r.createdAt}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={cn(
                  'pill',
                  r.status === 'Completed' && 'pill-completed',
                  r.status === 'Running'   && 'pill-running',
                  r.status === 'Draft'     && 'pill-pending',
                )}>
                  <StatusIcon className={cn('h-3 w-3', r.status === 'Running' && 'animate-spin')} />
                  {r.status}
                </span>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Download className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
