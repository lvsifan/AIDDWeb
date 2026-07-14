import { useMemo, useState } from 'react';
import {
  Search,
  Play,
  Lock,
  CheckCircle2,
  Sparkles,
  FlaskConical,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { tools, toolCategories, type Tool } from '@/lib/data';

type Sort = 'Popularity' | 'Name' | 'Recent';

function ToolIcon({ bg, char, name }: { bg: string; char: string; name: string }) {
  return (
    <div
      className="h-11 w-11 rounded-xl flex items-center justify-center text-white text-[18px] font-semibold shrink-0 shadow-md"
      style={{ background: `hsl(${bg})` }}
      aria-hidden
    >
      {char.length === 1 ? char : <FlaskConical className="h-5 w-5" />}
      <span className="sr-only">{name}</span>
    </div>
  );
}

function InstallStatusTag({ status }: { status: Tool['installStatus'] }) {
  const colors: Record<Tool['installStatus'], string> = {
    'Install':         'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    'Modeling':        'bg-amber-500/15 text-amber-300 border-amber-500/30',
    'Dynamics':        'bg-sky-500/15 text-sky-300 border-sky-500/30',
    'ML Models':       'bg-rose-500/15 text-rose-300 border-rose-500/30',
    'Cheminformatics': 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    'Active':          'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  };
  return (
    <span className={cn('inline-flex items-center px-1.5 h-4 rounded text-[10px] font-medium border', colors[status])}>
      {status}
    </span>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const available = tool.status === 'Available';
  return (
    <div className="surface-card p-4 flex flex-col gap-3 hover:border-primary/40 transition-colors group">
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 min-w-0">
          <ToolIcon bg={tool.iconBg} char={tool.iconChar} name={tool.name} />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-[14px] font-semibold truncate">{tool.name}</h3>
              {tool.popular && (
                <Sparkles className="h-3 w-3 text-amber-400 shrink-0" aria-label="Popular" />
              )}
            </div>
            <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{tool.version}</div>
          </div>
        </div>
        <button className="text-muted-foreground/60 hover:text-foreground p-1 -m-1" aria-label="More">
          <MoreVertical className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Description */}
      <p className="text-[12px] text-muted-foreground line-clamp-2 leading-relaxed">
        {tool.description}
      </p>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <InstallStatusTag status={tool.installStatus} />
        {available ? (
          <Button size="sm" className="h-7 px-3 text-[12px] gradient-primary text-white border-0 hover:opacity-90">
            <Play className="h-3 w-3 fill-current" />
            Launch
          </Button>
        ) : (
          <Button size="sm" variant="outline" className="h-7 px-3 text-[12px] border-border/60 hover:bg-secondary/60">
            <Lock className="h-3 w-3" />
            Request Access
          </Button>
        )}
      </div>
    </div>
  );
}

export default function ToolLibrary() {
  const [category, setCategory] = useState('All Tools');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [sort] = useState<Sort>('Popularity');
  const pageSize = 8;

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const matchCat = category === 'All Tools' ? true : t.category === category;
      const q = query.trim().toLowerCase();
      const matchQ = q === '' || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [category, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  return (
    <>
      <PageHeader
        title="CADD Tool Library"
        description="Discover and access industry-leading computational chemistry and AI-driven drug discovery tools."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-5">
        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              className="pl-8 h-8 text-[12px] bg-secondary/40 border-border/60"
            />
          </div>

          {/* Categories */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">
              Categories
            </div>
            <ul className="space-y-0.5">
              {toolCategories.map((c) => {
                const active = category === c.name;
                return (
                  <li key={c.name}>
                    <button
                      onClick={() => { setCategory(c.name); setPage(1); }}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-1.5 rounded-md text-[13px] transition-colors',
                        active
                          ? 'gradient-primary-soft text-foreground font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40',
                      )}
                    >
                      <span className="truncate">{c.name}</span>
                      <span className={cn('text-[11px] font-mono', active ? 'text-primary' : 'text-muted-foreground/70')}>
                        {c.count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Filters */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">
              Filters
            </div>
            <div className="px-3 py-2 space-y-2.5 text-[12px]">
              <FilterRow label="Availability" />
              <div className="space-y-1.5 pl-1">
                <CheckRow label="Available" count={22} checked />
                <CheckRow label="Request Access" count={6} checked />
              </div>
            </div>
          </div>

          {/* Type */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">
              Type
            </div>
            <div className="space-y-1.5 px-1">
              <CheckRow label="Software" count={24} checked />
              <CheckRow label="Web App" count={3} />
              <CheckRow label="Pipeline" count={1} />
            </div>
          </div>
        </aside>

        {/* Main grid */}
        <div>
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filtered.length === 0 ? 0 : start + 1}</span>-
              <span className="text-foreground font-medium">{Math.min(start + pageSize, filtered.length)}</span> of{' '}
              <span className="text-foreground font-medium">{filtered.length}</span> tools
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Sort by:</span>
              <button className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md bg-secondary/50 border border-border/60 text-foreground">
                <span>{sort}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Cards */}
          {visible.length === 0 ? (
            <div className="surface-card p-12 text-center text-muted-foreground text-sm">
              No tools match the current filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
              {visible.map((t) => (
                <ToolCard key={t.id} tool={t} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-end gap-1 text-xs">
            <Button size="icon-sm" variant="ghost" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} aria-label="Previous">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={cn(
                  'h-7 w-7 rounded-md text-xs font-medium transition-colors',
                  page === i + 1
                    ? 'gradient-primary text-white'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40',
                )}
              >
                {i + 1}
              </button>
            ))}
            <Button size="icon-sm" variant="ghost" disabled={page === pageCount} onClick={() => setPage((p) => Math.min(pageCount, p + 1))} aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function FilterRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{label}</span>
      <ChevronDown className="h-3 w-3" />
    </div>
  );
}

function CheckRow({ label, count, checked }: { label: string; count: number; checked?: boolean }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
        <span
          className={cn(
            'h-3.5 w-3.5 rounded border flex items-center justify-center transition-colors',
            checked
              ? 'gradient-primary border-transparent text-white'
              : 'border-border/80 bg-secondary/30',
          )}
        >
          {checked && <CheckCircle2 className="h-2.5 w-2.5" />}
        </span>
        <span className="text-[12px]">{label}</span>
      </span>
      <span className="text-[11px] text-muted-foreground/70 font-mono">{count}</span>
    </label>
  );
}
