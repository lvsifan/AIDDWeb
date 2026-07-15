import { useState } from 'react';
import { Search, Plus, Filter, Database, MoreVertical, Download, Box } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { datasets } from '@/lib/data';
import { cn } from '@/lib/utils';

type Tab = 'all' | 'protein' | 'compound' | 'mine';

const tabs: { id: Tab; label: string }[] = [
  { id: 'all',      label: 'All Datasets'       },
  { id: 'protein',  label: 'Protein Library'    },
  { id: 'compound', label: 'Compound Library'   },
  { id: 'mine',     label: 'My Datasets'        },
];

const typeBadge: Record<string, string> = {
  Protein:  'pill-running',
  Compound: 'pill-completed',
  Custom:   'pill-pending',
};

// Simple 3D-looking protein blob
function ProteinPreview() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg bg-gradient-to-br from-[#0a1428] via-[#0a1f3a] to-[#0a0e2a]">
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <defs>
          <radialGradient id="protein-blob" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(217 70% 60%)" stopOpacity="0.7" />
            <stop offset="40%" stopColor="hsl(217 60% 45%)" stopOpacity="0.5" />
            <stop offset="80%" stopColor="hsl(217 50% 30%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(217 50% 20%)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="protein-blob2" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(190 80% 60%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(190 60% 30%)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Multiple blobs for complex shape */}
        <ellipse cx="200" cy="150" rx="160" ry="110" fill="url(#protein-blob)" />
        <ellipse cx="120" cy="120" rx="70" ry="60" fill="url(#protein-blob2)" />
        <ellipse cx="280" cy="170" rx="80" ry="65" fill="url(#protein-blob2)" />
        <ellipse cx="180" cy="220" rx="50" ry="40" fill="url(#protein-blob2)" />
        <ellipse cx="280" cy="100" rx="40" ry="35" fill="url(#protein-blob2)" />
        {/* Helix lines suggesting secondary structure */}
        <g stroke="hsl(217 90% 75%)" strokeWidth="1" fill="none" opacity="0.5">
          <path d="M 100 100 Q 130 80 160 100 T 220 100" />
          <path d="M 200 200 Q 230 180 260 200 T 320 200" />
          <path d="M 150 150 L 250 150" />
          <path d="M 130 80 L 130 220" strokeDasharray="3 3" />
          <path d="M 270 80 L 270 220" strokeDasharray="3 3" />
        </g>
        {/* Active site marker */}
        <circle cx="200" cy="150" r="14" fill="none" stroke="hsl(38 92% 60%)" strokeWidth="1.5" className="animate-pulse" />
        <circle cx="200" cy="150" r="22" fill="none" stroke="hsl(38 92% 60%)" strokeWidth="1" opacity="0.4" className="animate-pulse" />
      </svg>
      <div className="absolute top-2 right-2 text-[9px] text-muted-foreground bg-black/40 px-2 py-1 rounded font-mono">
        1.8 Å resolution
      </div>
      <div className="absolute bottom-2 left-2 text-[9px] text-muted-foreground bg-black/40 px-2 py-1 rounded">
        Active site
      </div>
    </div>
  );
}

export default function DatasetsPage() {
  const [tab, setTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(datasets[0]);

  let filtered = datasets;
  if (tab === 'protein')  filtered = datasets.filter((d) => d.type === 'Protein');
  if (tab === 'compound') filtered = datasets.filter((d) => d.type === 'Compound');
  if (tab === 'mine')     filtered = datasets.slice(0, 5);
  if (search)             filtered = filtered.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <PageHeader
        title="Dataset Management"
        description="Manage and explore your datasets for drug discovery research."
        actions={
          <Button size="sm" className="gradient-primary text-white border-0 hover:opacity-90">
            <Plus className="h-3.5 w-3.5" /> Upload Dataset
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search datasets..."
                className="pl-9 h-9 bg-secondary/30"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-3.5 w-3.5" /> Filters
            </Button>
          </div>

          <div className="border-b border-border/60 mb-3">
            <div className="flex gap-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    'px-3.5 py-2 text-[12px] font-medium border-b-2 transition-colors',
                    tab === t.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="surface-card p-0 overflow-hidden">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-muted-foreground/70 border-b border-border/60 bg-secondary/30">
                  <th className="text-left font-medium py-2.5 pl-3">Name</th>
                  <th className="text-left font-medium py-2.5">Type</th>
                  <th className="text-left font-medium py-2.5">Size</th>
                  <th className="text-left font-medium py-2.5">Owner</th>
                  <th className="text-left font-medium py-2.5">Updated</th>
                  <th className="text-right font-medium py-2.5 pr-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr
                    key={d.id}
                    onClick={() => setSelected(d)}
                    className={cn(
                      'border-b border-border/40 cursor-pointer hover:bg-secondary/20',
                      selected.id === d.id && 'bg-primary/5',
                    )}
                  >
                    <td className="py-2.5 pl-3 font-medium">{d.name}</td>
                    <td className="py-2.5"><span className={typeBadge[d.type] || 'pill'}>{d.type}</span></td>
                    <td className="py-2.5 text-muted-foreground">{d.size}</td>
                    <td className="py-2.5 text-muted-foreground">{d.owner}</td>
                    <td className="py-2.5 text-muted-foreground">{d.updated}</td>
                    <td className="py-2.5 pr-3 text-right">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Preview pane */}
        <div className="lg:col-span-1">
          <div className="surface-card p-4 sticky top-3">
            <h3 className="text-[13px] font-semibold mb-2">Preview</h3>
            <div className="h-48 rounded-md overflow-hidden mb-3">
              <ProteinPreview />
            </div>
            <h4 className="text-[14px] font-semibold mb-2">{selected.name}</h4>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium">{selected.type}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Format</span><span className="font-mono">{selected.format}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Records</span><span className="font-medium">{selected.records.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Size</span><span className="font-medium">{selected.size}</span></div>
            </div>
            <div className="mt-3 flex flex-col gap-1.5">
              <Button size="sm" variant="outline" className="w-full">
                <Box className="h-3.5 w-3.5" /> View 3D Structure
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                <Database className="h-3.5 w-3.5" /> Use in Workflow
              </Button>
              <Button size="sm" className="w-full gradient-primary text-white border-0">
                <Download className="h-3.5 w-3.5" /> Download Dataset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
