import { Link } from 'react-router-dom';
import {
  Briefcase,
  Database,
  Cpu,
  HardDrive,
  CircleDot,
  Play,
  FlaskConical,
  Atom,
  Beaker,
  Workflow,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { jobs, creditUsage30d } from '@/lib/data';
import { cn } from '@/lib/utils';

const quickStats = [
  { label: 'Projects',          value: '24',     delta: '+12% vs last month', icon: Briefcase, accent: '217 91% 60%' },
  { label: 'Active Datasets',   value: '156',    delta: '+8 this month',      icon: Database,  accent: '262 83% 58%' },
  { label: 'Compute Credits',   value: '8,420',  delta: '−12% this month',    icon: Cpu,       accent: '38 92% 50%'  },
  { label: 'Storage Used',      value: '3.1 TB', delta: '42% of quota',        icon: HardDrive, accent: '142 71% 45%' },
];

const computeResources = [
  { label: 'GPU Utilization', value: 68, accent: '217 91% 60%' },
  { label: 'CPU Utilization', value: 42, accent: '142 71% 45%' },
  { label: 'Memory Usage',    value: 62, accent: '262 83% 58%' },
  { label: 'Active Jobs',     value: 32, accent: '38 92% 50%', isJobs: true },
];

const quickLaunch = [
  { to: '/submit', label: 'Docking',       icon: FlaskConical, accent: '217 91% 60%' },
  { to: '/submit', label: 'MD Simulation', icon: Atom,         accent: '262 83% 58%' },
  { to: '/submit', label: 'ADMET Prediction', icon: Beaker,    accent: '142 71% 45%' },
  { to: '/workflows', label: 'Mol Workflow', icon: Workflow,  accent: '38 92% 50%' },
];

function Donut({ value, accent }: { value: number; accent: string }) {
  const size = 96;
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`hsl(${accent})`}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center text-[16px] font-semibold"
        style={{ color: `hsl(${accent})` }}
      >
        {value}%
      </div>
    </div>
  );
}

export default function Dashboard() {
  const recent = jobs.slice(0, 8);
  const max = Math.max(...creditUsage30d);

  return (
    <>
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            <span>Dashboard <span className="text-muted-foreground/70 font-normal text-[18px]">(Overview)</span></span>
            <Badge variant="outline" className="text-[10px] px-2 py-0.5 gap-1 border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
              <CircleDot className="h-2.5 w-2.5 animate-pulse" /> Cluster Status: Healthy
            </Badge>
          </span>
        }
        description="Welcome back, Alex! Here's what's happening with your research today."
        actions={
          <Button asChild className="gradient-primary text-white border-0 hover:opacity-90">
            <Link to="/submit"><Play className="h-4 w-4" /> Quick Launch</Link>
          </Button>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {quickStats.map((s) => (
          <div key={s.label} className="surface-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div
                className="h-9 w-9 rounded-lg flex items-center justify-center"
                style={{ background: `hsl(${s.accent} / 0.15)`, color: `hsl(${s.accent})` }}
              >
                <s.icon className="h-[18px] w-[18px]" />
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40" />
            </div>
            <div className="text-[26px] font-semibold tracking-tight leading-none mb-1">{s.value}</div>
            <div className="text-[12px] text-muted-foreground">{s.label}</div>
            <div className="text-[10px] text-emerald-400 mt-2 inline-flex items-center gap-1">
              <TrendingUp className="h-2.5 w-2.5" /> {s.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Compute Resources + Recent Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">
        {/* Compute Resources */}
        <div className="surface-card p-5 lg:col-span-1">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[14px] font-semibold">Compute Resources</h2>
            <Link to="/cluster" className="text-[11px] text-primary hover:underline">Details</Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-5">
            {computeResources.map((r) => (
              <div key={r.label} className="flex flex-col items-center gap-2">
                <Donut value={r.value} accent={r.accent} />
                <div className="text-[12px] font-medium text-center">{r.label}</div>
                {r.isJobs && <div className="text-[10px] text-muted-foreground -mt-1">32 Running Now</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Jobs table */}
        <div className="surface-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-semibold">Recent Jobs</h2>
            <Link to="/jobs" className="text-[11px] text-primary hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-muted-foreground/70 border-b border-border/60">
                  <th className="text-left font-medium py-2 pl-2">Job ID</th>
                  <th className="text-left font-medium py-2">Name</th>
                  <th className="text-left font-medium py-2">Type</th>
                  <th className="text-left font-medium py-2">Status</th>
                  <th className="text-left font-medium py-2">CPU</th>
                  <th className="text-right font-medium py-2 pr-2">ETA</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((j) => (
                  <tr key={j.id} className="border-b border-border/40 hover:bg-secondary/20 transition-colors">
                    <td className="py-2 pl-2 font-mono text-[11px] text-muted-foreground">{j.id}</td>
                    <td className="py-2 font-medium">{j.name}</td>
                    <td className="py-2 text-muted-foreground">{j.type}</td>
                    <td className="py-2">
                      <span
                        className={cn(
                          j.status === 'Running'   && 'pill-running',
                          j.status === 'Completed' && 'pill-completed',
                          j.status === 'Failed'    && 'pill-failed',
                          j.status === 'Pending'   && 'pill-pending',
                        )}
                      >
                        {j.status}
                      </span>
                    </td>
                    <td className="py-2 text-muted-foreground">{j.cpuUtil ? `${j.cpuUtil}%` : '—'}</td>
                    <td className="py-2 pr-2 text-right font-mono text-muted-foreground">{j.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Credits Usage + Quick Launch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">
        {/* Credits Usage bar chart */}
        <div className="surface-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[14px] font-semibold">Credits Usage <span className="text-muted-foreground/70 font-normal text-[11px]">(hourly)</span></h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">Apr 24 — Jul 1, 2026</p>
            </div>
            <div className="text-right">
              <div className="text-[20px] font-semibold gradient-text">8,420 <span className="text-[12px] text-muted-foreground font-normal">/ 20,000</span></div>
              <div className="text-[10px] text-muted-foreground">42% used</div>
            </div>
          </div>
          <div className="flex items-end gap-[3px] h-32">
            {creditUsage30d.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm transition-all hover:opacity-80"
                style={{
                  height: `${(v / max) * 100}%`,
                  background: i >= creditUsage30d.length - 5
                    ? 'linear-gradient(180deg, hsl(262 83% 68%) 0%, hsl(217 91% 60%) 100%)'
                    : 'linear-gradient(180deg, hsl(217 91% 60% / 0.7) 0%, hsl(217 91% 60% / 0.3) 100%)',
                }}
                title={`${v} credits`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
            <span>Apr 24</span><span>Apr 27</span><span>Apr 30</span><span>May 3</span><span>May 6</span>
            <span>May 9</span><span>May 12</span><span>May 15</span><span>May 18</span><span>May 21</span>
          </div>
        </div>

        {/* Quick Launch */}
        <div className="surface-card p-5 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-semibold">Quick Launch</h2>
            <span className="text-[10px] text-muted-foreground">4 shortcuts</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {quickLaunch.map((q) => (
              <Link
                key={q.label}
                to={q.to}
                className="group flex flex-col items-center gap-2 p-3.5 rounded-lg border border-border/60 bg-secondary/20 hover:bg-secondary/40 transition-colors"
              >
                <div
                  className="h-9 w-9 rounded-md flex items-center justify-center"
                  style={{ background: `hsl(${q.accent} / 0.15)`, color: `hsl(${q.accent})` }}
                >
                  <q.icon className="h-[18px] w-[18px]" />
                </div>
                <span className="text-[11px] font-medium text-center leading-tight">{q.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
