import { useState } from 'react';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Play,
  Filter,
  CheckCircle2,
  TrendingUp,
  Box,
  Sparkles,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import {
  bindingAffinity,
  rmsdSeries,
  interactionFingerprint,
  dockingPoses,
} from '@/lib/data';
import { cn } from '@/lib/utils';

type ResultTab = 'poses' | 'admet' | 'trajectory';

const admetProperties = [
  { name: 'Molecular Weight',       value: '337.4', unit: 'g/mol',  range: '150-500',   pass: true  },
  { name: 'LogP',                    value: '2.81',  unit: '',        range: '−2 to 5',   pass: true  },
  { name: 'H-Bond Donors',           value: '1',     unit: '',        range: '≤ 5',       pass: true  },
  { name: 'H-Bond Acceptors',        value: '4',     unit: '',        range: '≤ 10',      pass: true  },
  { name: 'TPSA',                    value: '38.3',  unit: 'Ų',      range: '≤ 140',     pass: true  },
  { name: 'Rotatable Bonds',         value: '5',     unit: '',        range: '≤ 10',      pass: true  },
  { name: 'Aromatic Rings',          value: '2',     unit: '',        range: '≤ 4',       pass: true  },
  { name: 'GI Absorption',           value: 'High',  unit: '',        range: 'High',      pass: true  },
  { name: 'BBB Permeant',            value: 'Yes',   unit: '',        range: '—',         pass: true  },
  { name: 'CYP2D6 Inhibitor',         value: 'No',    unit: '',        range: '—',         pass: true  },
  { name: 'Hepatotoxicity',           value: 'Low',   unit: '',        range: 'Low',       pass: true  },
  { name: 'AMES Toxicity',            value: 'Negative', unit: '',    range: '—',         pass: true  },
];

// Procedural 3D molecular viewer
function Molecule3DViewer() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a1a2e]">
      {/* Deep gradient bg with star field */}
      <div className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(262 60% 25%) 0%, transparent 60%), radial-gradient(ellipse at 30% 40%, hsl(217 60% 25%) 0%, transparent 50%)',
        }}
      />
      {/* Stars */}
      {Array.from({ length: 80 }).map((_, i) => {
        const left = (i * 17 + 7) % 100;
        const top  = (i * 23 + 11) % 100;
        const size = (i % 4) + 1;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, opacity: 0.2 + (i % 5) * 0.15 }}
          />
        );
      })}

      {/* Protein blob (background) */}
      <svg viewBox="0 0 600 400" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="protein-grad" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(262 70% 50%)" stopOpacity="0.4" />
            <stop offset="60%" stopColor="hsl(262 50% 30%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(262 50% 20%)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="protein-grad2" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(217 70% 50%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(217 50% 20%)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="300" cy="200" rx="220" ry="160" fill="url(#protein-grad)" />
        <ellipse cx="200" cy="170" rx="120" ry="100" fill="url(#protein-grad2)" />
        <ellipse cx="400" cy="240" rx="110" ry="90" fill="url(#protein-grad2)" />
      </svg>

      {/* Molecule structure (center) */}
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="atom-c" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(0 0% 95%)" />
            <stop offset="100%" stopColor="hsl(0 0% 60%)" />
          </radialGradient>
          <radialGradient id="atom-o" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(0 75% 60%)" />
            <stop offset="100%" stopColor="hsl(0 75% 35%)" />
          </radialGradient>
          <radialGradient id="atom-n" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(217 90% 65%)" />
            <stop offset="100%" stopColor="hsl(217 90% 40%)" />
          </radialGradient>
          <radialGradient id="atom-h" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(0 0% 100%)" />
            <stop offset="100%" stopColor="hsl(0 0% 75%)" />
          </radialGradient>
        </defs>

        {/* Bonds */}
        <g stroke="hsl(0 0% 75%)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85">
          <line x1="200" y1="150" x2="240" y2="120" />
          <line x1="240" y1="120" x2="280" y2="150" />
          <line x1="280" y1="150" x2="320" y2="120" />
          <line x1="320" y1="120" x2="320" y2="180" />
          <line x1="320" y1="180" x2="280" y2="210" />
          <line x1="280" y1="210" x2="240" y2="180" />
          <line x1="240" y1="180" x2="200" y2="150" />
          <line x1="200" y1="150" x2="160" y2="180" />
          <line x1="160" y1="180" x2="160" y2="240" />
          <line x1="200" y1="150" x2="180" y2="100" />
          <line x1="240" y1="120" x2="220" y2="70" />
        </g>

        {/* Atoms */}
        <g>
          <circle cx="200" cy="150" r="14" fill="url(#atom-c)" />
          <circle cx="240" cy="120" r="14" fill="url(#atom-c)" />
          <circle cx="280" cy="150" r="14" fill="url(#atom-c)" />
          <circle cx="320" cy="120" r="14" fill="url(#atom-c)" />
          <circle cx="320" cy="180" r="14" fill="url(#atom-n)" />
          <circle cx="280" cy="210" r="14" fill="url(#atom-c)" />
          <circle cx="240" cy="180" r="14" fill="url(#atom-c)" />
          <circle cx="160" cy="180" r="14" fill="url(#atom-o)" />
          <circle cx="160" cy="240" r="11" fill="url(#atom-h)" />
          <circle cx="180" cy="100" r="11" fill="url(#atom-h)" />
          <circle cx="220" cy="70"  r="11" fill="url(#atom-h)" />
        </g>

        {/* Glow effect on highlight atoms */}
        <circle cx="320" cy="180" r="22" fill="none" stroke="hsl(38 92% 60%)" strokeWidth="1.5" opacity="0.6" className="animate-pulse" />
        <circle cx="160" cy="180" r="22" fill="none" stroke="hsl(38 92% 60%)" strokeWidth="1.5" opacity="0.6" className="animate-pulse" />
      </svg>

      {/* Coordinates axis indicator */}
      <div className="absolute bottom-3 left-3 flex items-end gap-2 text-[9px] text-muted-foreground">
        <div className="flex flex-col items-center">
          <div className="w-1 h-1 rounded-full bg-red-500" />
          <span className="text-red-400">X</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-1 h-1 rounded-full bg-green-500" />
          <span className="text-green-400">Y</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-1 h-1 rounded-full bg-blue-500" />
          <span className="text-blue-400">Z</span>
        </div>
      </div>

      {/* Hint label */}
      <div className="absolute top-3 left-3 text-[10px] text-muted-foreground bg-black/30 px-2 py-1 rounded">
        Drag to rotate · Scroll to zoom
      </div>
    </div>
  );
}

function MiniSparkline({ data, color, height = 24 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 100;
  const h = height;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ResultsPage() {
  const [tab, setTab] = useState<ResultTab>('poses');

  return (
    <>
      <PageHeader
        title={
          <span className="flex items-center gap-2.5 text-[16px]">
            <span className="text-muted-foreground/70">Results</span>
            <span className="text-muted-foreground/40">/</span>
            <span>Docking_Batch_0427</span>
            <span className="text-muted-foreground/40">/</span>
            <span>Binding Affinity Analysis</span>
          </span>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5" /> Download Report
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-3.5 w-3.5" /> Actions
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        {/* 3D viewer */}
        <div className="surface-card p-2 lg:col-span-2">
          <div className="h-[360px] rounded-md overflow-hidden">
            <Molecule3DViewer />
          </div>
          <div className="flex items-center justify-center gap-1 py-2">
            <Button variant="ghost" size="icon" className="h-7 w-7"><RotateCcw className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7"><ZoomIn className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7"><ZoomOut className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7"><Maximize2 className="h-3.5 w-3.5" /></Button>
            <div className="mx-2 h-4 w-px bg-border" />
            <Button variant="ghost" size="icon" className="h-7 w-7"><Play className="h-3.5 w-3.5" /></Button>
          </div>
        </div>

        {/* Summary card */}
        <div className="surface-card p-4 lg:col-span-1">
          <h3 className="text-[13px] font-semibold mb-3">Summary</h3>

          <div className="mb-3 pb-3 border-b border-border/40">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-1">Binding Affinity</div>
            <div className="text-[24px] font-bold gradient-text leading-none">−9.2 <span className="text-[11px] text-muted-foreground font-normal">kcal/mol</span></div>
            <div className="text-[10px] text-emerald-400 mt-1 inline-flex items-center gap-1">
              <TrendingUp className="h-2.5 w-2.5" /> 11% better than baseline
            </div>
          </div>

          <div className="mb-3 pb-3 border-b border-border/40">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-1">RMSD</div>
            <div className="text-[18px] font-semibold text-primary leading-none">1.2 <span className="text-[10px] text-muted-foreground font-normal">Å</span></div>
            <MiniSparkline data={rmsdSeries} color="hsl(217 91% 60%)" />
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-1">Ligand Efficiency</div>
            <div className="text-[18px] font-semibold text-emerald-400 leading-none">0.45</div>
            <MiniSparkline data={[0.3, 0.4, 0.35, 0.42, 0.45, 0.5, 0.45, 0.48, 0.45]} color="hsl(142 71% 45%)" />
          </div>
        </div>

        {/* Interaction fingerprint heatmap */}
        <div className="surface-card p-4 lg:col-span-1">
          <h3 className="text-[13px] font-semibold mb-3">Interaction Fingerprint</h3>
          <div className="grid grid-cols-5 gap-[2px] text-[9px] mb-1.5">
            {['P1', 'P2', 'P3', 'P4', 'P5'].map((p) => (
              <div key={p} className="text-center text-muted-foreground">{p}</div>
            ))}
          </div>
          <div className="space-y-[2px]">
            {interactionFingerprint.map((row, i) => (
              <div key={i} className="grid grid-cols-[60px_1fr] gap-1.5 items-center">
                <div className="text-[9px] text-muted-foreground truncate">{row.residue}</div>
                <div className="grid grid-cols-5 gap-[2px]">
                  {[row.p1, row.p2, row.p3, row.p4, row.p5].map((v, j) => (
                    <div
                      key={j}
                      className="aspect-square rounded-sm transition-all hover:ring-1 hover:ring-white/40"
                      style={{
                        background: v > 0
                          ? `hsl(${217 + j * 8} ${80 - j * 5}% ${45 + v * 15}% / ${0.3 + v * 0.65})`
                          : 'hsl(var(--secondary))',
                      }}
                      title={`${row.residue} - ${row.type}: ${v}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-border/40 text-[9px] text-muted-foreground">
            H-Bond · π-Stack · Hydrophobic · Salt Br
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        {/* Docking poses table */}
        <div className="surface-card p-4 lg:col-span-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              {(['poses', 'admet', 'trajectory'] as ResultTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    'text-[13px] font-medium pb-2 border-b-2 transition-colors',
                    tab === t ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t === 'poses' ? 'Docking Poses (Table)' : t === 'admet' ? 'ADMET Properties' : 'Simulation Trajectory'}
                </button>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Export Image
            </Button>
          </div>

          {tab === 'poses' && (
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-muted-foreground/70 border-b border-border/60">
                    <th className="text-left font-medium py-2 pl-2">Pose ID</th>
                    <th className="text-left font-medium py-2">Score (kcal/mol)</th>
                    <th className="text-left font-medium py-2">RMSD (Å)</th>
                    <th className="text-left font-medium py-2">Interactions</th>
                    <th className="text-left font-medium py-2">Cluster Size</th>
                    <th className="text-right font-medium py-2 pr-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dockingPoses.map((p) => (
                    <tr key={p.id} className="border-b border-border/40 hover:bg-secondary/20">
                      <td className="py-2.5 pl-2 font-medium">Pose {p.id}</td>
                      <td className="py-2.5 font-mono">{p.score.toFixed(1)}</td>
                      <td className="py-2.5 font-mono">{p.rmsdLb.toFixed(1)}</td>
                      <td className="py-2.5">{p.interactions}</td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 rounded-full bg-secondary overflow-hidden">
                            <div className="h-full gradient-primary" style={{ width: `${p.cluster}%` }} />
                          </div>
                          <span className="text-[10px] text-muted-foreground">{p.cluster}%</span>
                        </div>
                      </td>
                      <td className="py-2.5 pr-2 text-right">
                        <Button variant="outline" size="sm" className="h-6 text-[10px]">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'admet' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {admetProperties.map((a) => (
                <div key={a.name} className="p-2.5 rounded-md border border-border/40 bg-secondary/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-muted-foreground/80">{a.name}</span>
                    {a.pass && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                  </div>
                  <div className="text-[14px] font-semibold">{a.value}<span className="text-[10px] text-muted-foreground font-normal ml-1">{a.unit}</span></div>
                  <div className="text-[9px] text-muted-foreground/60">Range: {a.range}</div>
                </div>
              ))}
            </div>
          )}

          {tab === 'trajectory' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { label: 'Total Frames',     value: '10,000' },
                  { label: 'Time / Frame',     value: '2.0 fs' },
                  { label: 'Total Time',       value: '20 ps' },
                  { label: 'Avg Temperature',  value: '298.15 K' },
                ].map((s) => (
                  <div key={s.label} className="p-2.5 rounded-md border border-border/40 bg-secondary/20">
                    <div className="text-[10px] text-muted-foreground">{s.label}</div>
                    <div className="text-[14px] font-semibold">{s.value}</div>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-md border border-border/40 bg-secondary/20 h-32 flex items-end gap-1">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: `${20 + Math.abs(Math.sin(i * 0.4) * 50) + (i % 7) * 3}%`,
                      background: 'linear-gradient(180deg, hsl(217 91% 60% / 0.7), hsl(217 91% 60% / 0.3))',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ligand Information card */}
        <div className="surface-card p-4 lg:col-span-1">
          <h3 className="text-[13px] font-semibold mb-3">Ligand Information</h3>
          <div className="space-y-2 text-[11px]">
            <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{bindingAffinity.ligand}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">SMILES</span><span className="font-mono text-[10px]">{bindingAffinity.smiles}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Target</span><span className="text-right max-w-[60%]">{bindingAffinity.target}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">HBA / HBD</span><span>4 / 1</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">TPSA</span><span>38.3 Ų</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">LogP</span><span>2.81</span></div>
          </div>

          <div className="mt-4 pt-3 border-t border-border/40">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-2">2D Structure</div>
            <div className="aspect-square w-full rounded-md border border-border/40 bg-secondary/20 flex items-center justify-center">
              <Box className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <div className="text-[9px] text-center text-muted-foreground/60 mt-1">Methylphenidate</div>
          </div>
        </div>
      </div>
    </>
  );
}
