import { useState } from 'react';
import {
  Beaker,
  UploadCloud,
  Cpu,
  Save,
  ChevronLeft,
  Send,
  Check,
  X,
  FileText,
  CloudUpload,
  Sparkles,
  Database,
  Briefcase,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Step = 1 | 2 | 3;

const stepDefs = [
  { id: 1, title: 'Select Target',  icon: Beaker,    subtitle: 'Choose a protein structure for your simulation' },
  { id: 2, title: 'Upload Compound', icon: UploadCloud, subtitle: 'Upload your ligand library files' },
  { id: 3, title: 'Compute Resources', icon: Cpu,    subtitle: 'Choose resources and estimated runtime' },
] as const;

const proteinOptions = [
  { id: 'egfr',     name: 'EGFR Kinase Domain', pdb: 'PDB: 1M17', desc: 'Atomic resolution 2.20 Å · 686 Residues' },
  { id: 'bcl2',     name: 'Bcl-2 Apoptosis Regulator', pdb: 'PDB: 4LXD', desc: 'Atomic resolution 1.85 Å · 195 Residues' },
  { id: 'cyp3a4',   name: 'Cytochrome P450 3A4', pdb: 'PDB: 1TQN', desc: 'Atomic resolution 2.05 Å · 480 Residues' },
  { id: 'hivprot',  name: 'HIV-1 Protease',     pdb: 'PDB: 1HVR', desc: 'Atomic resolution 1.80 Å · 198 Residues' },
];

const uploadedFile = { name: 'compounds_library.sdf', size: '2.5 MB' };

export default function TaskSubmission() {
  const [step, setStep] = useState<Step>(1);
  const [proteinSource, setProteinSource] = useState<'mine' | 'public'>('mine');
  const [selectedProtein, setSelectedProtein] = useState('egfr');
  const [dragOver, setDragOver] = useState(false);
  const [cpu, setCpu] = useState(16);
  const [memory, setMemory] = useState(64);

  return (
    <>
      <PageHeader
        title="Task Submission"
        description="Configure and submit your molecular docking or molecular dynamics simulation."
        actions={
          <Button variant="outline" size="sm" className="border-border/60">
            <Save className="h-3.5 w-3.5" />
            Save as Template
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
        {/* Stepper */}
        <ol className="surface-card p-4 space-y-1 self-start">
          {stepDefs.map((s) => {
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => setStep(s.id as Step)}
                  className={cn(
                    'w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors',
                    isActive ? 'gradient-primary-soft' : 'hover:bg-secondary/30',
                  )}
                >
                  <div
                    className={cn(
                      'h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-xs font-semibold border',
                      isDone
                        ? 'gradient-primary text-white border-transparent'
                        : isActive
                          ? 'border-primary text-primary'
                          : 'border-border text-muted-foreground',
                    )}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5" /> : s.id}
                  </div>
                  <div className="min-w-0">
                    <div className={cn('text-[13px] font-medium', isActive ? 'text-foreground' : 'text-muted-foreground')}>
                      {s.title}
                    </div>
                    <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                      {s.subtitle}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Step content */}
        <div className="space-y-4">
          {step === 1 && (
            <div className="surface-card p-5 space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-md gradient-primary-soft flex items-center justify-center text-primary">
                  <Beaker className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-[15px] font-semibold">Select Target Protein</h2>
                  <p className="text-[12px] text-muted-foreground">Choose a protein structure from your projects or the public database.</p>
                </div>
              </div>

              {/* Source radios */}
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Protein Source</div>
                <div className="inline-flex p-0.5 rounded-md bg-secondary/50 border border-border/60 text-xs">
                  {([
                    { v: 'mine',  label: 'My Projects',    icon: Briefcase },
                    { v: 'public', label: 'Public Database', icon: Database },
                  ] as const).map((opt) => {
                    const active = proteinSource === opt.v;
                    return (
                      <button
                        key={opt.v}
                        onClick={() => setProteinSource(opt.v)}
                        className={cn(
                          'inline-flex items-center gap-1.5 h-7 px-3 rounded transition-colors',
                          active ? 'gradient-primary text-white' : 'text-muted-foreground hover:text-foreground',
                        )}
                      >
                        <opt.icon className="h-3 w-3" />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selector */}
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Select Protein *</div>
                <div className="relative">
                  <select
                    value={selectedProtein}
                    onChange={(e) => setSelectedProtein(e.target.value)}
                    className="w-full h-10 appearance-none rounded-md border border-border/60 bg-secondary/40 px-3 pr-9 text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    {proteinOptions.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} — {p.pdb}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">▾</span>
                </div>
              </div>

              {/* Selected preview */}
              {(() => {
                const p = proteinOptions.find((x) => x.id === selectedProtein)!;
                return (
                  <div className="rounded-lg border border-border/60 bg-secondary/30 p-4 flex items-start gap-3">
                    <div className="h-12 w-12 rounded-md gradient-primary-soft flex items-center justify-center text-primary">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[14px] font-semibold">{p.name}</h3>
                        <span className="pill-running">{p.pdb}</span>
                      </div>
                      <div className="text-[12px] text-muted-foreground mt-1">{p.desc}</div>
                    </div>
                    <Button size="icon-sm" variant="ghost" aria-label="Remove" className="hover:text-rose-400">
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                );
              })()}
            </div>
          )}

          {step === 2 && (
            <div className="surface-card p-5 space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-md gradient-primary-soft flex items-center justify-center text-primary">
                  <UploadCloud className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-[15px] font-semibold">Upload Compound Library</h2>
                  <p className="text-[12px] text-muted-foreground">Upload your ligand library in .sdf or .mol2 format.</p>
                </div>
              </div>

              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Library Files</div>

              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
                className={cn(
                  'rounded-lg border-2 border-dashed p-10 text-center transition-colors',
                  dragOver ? 'border-primary bg-primary/5' : 'border-border/80 bg-secondary/20',
                )}
              >
                <CloudUpload className="h-10 w-10 mx-auto text-muted-foreground/60 mb-3" />
                <div className="text-[14px] font-medium">Drag & drop your file here</div>
                <div className="text-[12px] text-muted-foreground mt-1">
                  or <span className="text-primary font-medium cursor-pointer">click to browse</span>
                </div>
                <div className="text-[10px] text-muted-foreground mt-3">
                  Supported formats: .sdf, .mol2 · Max file size: 200 MB
                </div>
              </div>

              {/* File list */}
              <div className="rounded-lg border border-border/60 bg-secondary/20 p-3 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md gradient-primary-soft flex items-center justify-center text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium truncate">{uploadedFile.name}</div>
                    <div className="text-[11px] text-muted-foreground">{uploadedFile.size}</div>
                  </div>
                  <span className="pill-active">
                    <Check className="h-3 w-3" />
                    Ready
                  </span>
                  <Button size="icon-sm" variant="ghost" aria-label="Remove" className="hover:text-rose-400">
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="surface-card p-5 space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-md gradient-primary-soft flex items-center justify-center text-primary">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-[15px] font-semibold">Compute Resources</h2>
                  <p className="text-[12px] text-muted-foreground">Choose resources and estimated runtime for your job.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResourceSlider
                  label="CPU Cores"
                  value={cpu}
                  onChange={setCpu}
                  min={1}
                  max={128}
                  step={1}
                  marks={[{ v: 1, l: '1' }, { v: 8, l: '8' }, { v: 16, l: '16' }, { v: 32, l: '32' }, { v: 64, l: '64' }, { v: 128, l: '128+' }]}
                />
                <ResourceSlider
                  label="Memory (GB)"
                  value={memory}
                  onChange={setMemory}
                  min={1}
                  max={256}
                  step={1}
                  marks={[{ v: 1, l: '1' }, { v: 8, l: '8' }, { v: 16, l: '16' }, { v: 32, l: '32' }, { v: 64, l: '64' }, { v: 256, l: '256+' }]}
                />
              </div>

              <div className="rounded-lg border border-border/60 bg-secondary/20 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">Resource Summary</div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <SummaryStat label="CPU Cores" value={cpu}        accent="217 91% 60%" />
                  <SummaryStat label="Memory"     value={`${memory} GB`} accent="262 83% 58%" />
                  <SummaryStat label="Estimated Cost" value="12 Credits" accent="142 71% 45%" />
                </div>
              </div>
            </div>
          )}

          {/* Footer actions */}
          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" className="text-muted-foreground">
              Cancel
            </Button>
            <div className="flex items-center gap-2">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep((s) => (s - 1) as Step)} className="border-border/60">
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Previous
                </Button>
              )}
              {step < 3 ? (
                <Button onClick={() => setStep((s) => (s + 1) as Step)} className="gradient-primary text-white border-0 hover:opacity-90">
                  Next
                </Button>
              ) : (
                <Button className="gradient-primary text-white border-0 hover:opacity-90">
                  <Send className="h-3.5 w-3.5" />
                  Submit Job
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ResourceSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  marks,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  marks: { v: number; l: string }[];
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="rounded-lg border border-border/60 bg-secondary/20 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[12px] text-muted-foreground">{label}</div>
        <div className="text-[15px] font-semibold gradient-text">{value}</div>
      </div>

      {/* Custom slider track */}
      <div className="relative h-2 rounded-full bg-secondary/70 mb-3">
        <div
          className="absolute inset-y-0 left-0 rounded-full gradient-primary"
          style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute -top-1.5 h-5 w-5 rounded-full gradient-primary border-2 border-background shadow-md pointer-events-none"
          style={{ left: `calc(${Math.max(0, Math.min(100, pct))}% - 10px)` }}
        />
      </div>

      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
        {marks.map((m) => (
          <span key={m.v}>{m.l}</span>
        ))}
      </div>
    </div>
  );
}

function SummaryStat({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  return (
    <div>
      <div className="text-[18px] font-semibold" style={{ color: `hsl(${accent})` }}>{value}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}
