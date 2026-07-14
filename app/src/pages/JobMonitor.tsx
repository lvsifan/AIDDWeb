import { useMemo, useState } from 'react';
import {
  Search,
  Filter,
  Activity,
  Cpu,
  Server,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Clock,
  PlayCircle,
  Sparkles,
  Timer,
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { jobs, type Job } from '@/lib/data';

type Tab = 'All' | 'Running' | 'Pending' | 'Completed' | 'Failed';

function generateSeries(base: number, amp: number, noise: number, count = 30) {
  return Array.from({ length: count }, (_, i) => ({
    t: i,
    gpu0: +(base + Math.sin(i / 2) * amp + (Math.random() - 0.5) * noise).toFixed(2),
    gpu1: +(base + Math.cos(i / 3) * amp * 0.8 + (Math.random() - 0.5) * noise).toFixed(2),
    gpu2: +(base + Math.sin(i / 1.7 + 1) * amp * 0.9 + (Math.random() - 0.5) * noise).toFixed(2),
    gpu3: +(base + Math.cos(i / 2.4 + 2) * amp * 0.7 + (Math.random() - 0.5) * noise).toFixed(2),
  }));
}

const gpuMemData = generateSeries(22, 4, 1.5);
const gpuTempData = generateSeries(63, 3, 0.8);

const gpuColors = [
  'hsl(217 91% 60%)',
  'hsl(262 83% 65%)',
  'hsl(38 92% 55%)',
  'hsl(190 90% 55%)',
];

function statusIcon(status: Job['status']) {
  if (status === 'Running')   return <PlayCircle className="h-3 w-3" />;
  if (status === 'Pending')   return <Clock className="h-3 w-3" />;
  if (status === 'Completed') return <CheckCircle2 className="h-3 w-3" />;
  if (status === 'Failed')    return <XCircle className="h-3 w-3" />;
  return null;
}

function statusClass(status: Job['status']) {
  return (
    status === 'Running'   ? 'pill-running'   :
    status === 'Pending'   ? 'pill-pending'   :
    status === 'Completed' ? 'pill-completed' :
                             'pill-failed'
  );
}

export default function JobMonitor() {
  const [tab, setTab] = useState<Tab>('All');
  const [query, setQuery] = useState('');

  const tabs: { id: Tab; label: string; count: number }[] = useMemo(() => ([
    { id: 'All',       label: 'All Jobs',   count: jobs.length },
    { id: 'Running',   label: 'Running',    count: jobs.filter((j) => j.status === 'Running').length },
    { id: 'Pending',   label: 'Pending',    count: jobs.filter((j) => j.status === 'Pending').length },
    { id: 'Completed', label: 'Completed',  count: jobs.filter((j) => j.status === 'Completed').length },
    { id: 'Failed',    label: 'Failed',     count: jobs.filter((j) => j.status === 'Failed').length },
  ]), []);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchTab = tab === 'All' ? true : j.status === tab;
      const q = query.trim().toLowerCase();
      const matchQ = q === '' || j.name.toLowerCase().includes(q) || j.id.toLowerCase().includes(q);
      return matchTab && matchQ;
    });
  }, [tab, query]);

  return (
    <>
      <PageHeader
        title={
          <span className="inline-flex items-center gap-2.5">
            HPC Job Monitor
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-medium">
              <span className="live-dot" /> Live
            </span>
          </span>
        }
        description="Real-time overview of compute resources and job activity."
        actions={
          <>
            <Button variant="outline" size="sm" className="border-border/60">
              <Server className="h-3.5 w-3.5" />
              All Clusters
              <ChevronDown className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" className="border-border/60 font-mono">
              10s
              <ChevronDown className="h-3 w-3" />
            </Button>
          </>
        }
      />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <ChartCard
          title="GPU Memory Usage"
          subtitle="Last 15 min"
          unit="GiBs"
          metric="68.7%"
          metricSub="22.0 / 32.0 GiB"
          data={gpuMemData}
          yDomain={[0, 32]}
        />
        <ChartCard
          title="GPU Temperature"
          subtitle="Average"
          unit="°C"
          metric="63.2°C"
          metricSub="All GPUs"
          data={gpuTempData}
          yDomain={[0, 90]}
        />
      </div>

      {/* Jobs panel */}
      <div className="surface-card overflow-hidden">
        {/* Tabs + search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 border-b border-border/60">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    'inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-[12px] font-medium transition-colors whitespace-nowrap',
                    active
                      ? 'gradient-primary-soft text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40',
                  )}
                >
                  {t.label}
                  <span
                    className={cn(
                      'text-[10px] font-mono px-1.5 h-4 rounded inline-flex items-center',
                      active ? 'bg-primary/20 text-primary' : 'bg-secondary/60 text-muted-foreground',
                    )}
                  >
                    {t.count}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jobs..."
                className="pl-8 h-8 text-[12px] bg-secondary/40 border-border/60"
              />
            </div>
            <Button variant="outline" size="sm" className="border-border/60">
              <Filter className="h-3.5 w-3.5" />
              Filters
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <th className="px-4 py-2.5">Job ID</th>
                <th className="px-4 py-2.5">Name</th>
                <th className="px-4 py-2.5">User</th>
                <th className="px-4 py-2.5">Project</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5 w-[180px]">Progress</th>
                <th className="px-4 py-2.5 text-right">GPU / CPU</th>
                <th className="px-4 py-2.5 text-right">Queue</th>
                <th className="px-4 py-2.5 text-right">ETA</th>
                <th className="px-4 py-2.5 text-right pr-4">Start Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((j) => (
                <tr key={j.id} className="border-b border-border/40 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{j.id}</td>
                  <td className="px-4 py-3 text-[13px] font-medium">{j.name}</td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">{j.user}</td>
                  <td className="px-4 py-3 text-[12px]">{j.project}</td>
                  <td className="px-4 py-3">
                    <span className={statusClass(j.status)}>
                      {statusIcon(j.status)}
                      {j.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Progress
                        value={j.progress}
                        className="h-1.5 flex-1"
                        // use gradient for the bar indicator
                      />
                      <span className="text-[11px] font-mono text-muted-foreground w-9 text-right">{j.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-[12px] font-mono text-muted-foreground">{j.gpu}</td>
                  <td className="px-4 py-3 text-right text-[12px] font-mono text-muted-foreground">{j.queue}</td>
                  <td className="px-4 py-3 text-right text-[12px] font-mono text-muted-foreground">{j.eta}</td>
                  <td className="px-4 py-3 text-right text-[12px] font-mono text-muted-foreground pr-4">{j.startTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System status footer */}
      <div className="mt-4 surface-card px-4 py-2.5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px]">
        <SystemItem label="System Time" value="2026-05-12 15:56:12 UTC" icon={Timer} />
        <SystemItem label="Cluster Status" value="Healthy" icon={CheckCircle2} accent="142 71% 45%" />
        <SystemItem label="CPU Utilization" value="68%" icon={Cpu} accent="217 91% 60%" withBar />
        <SystemItem label="GPU Utilization" value="71%" icon={Sparkles} accent="262 83% 58%" withBar />
        <SystemItem label="Active Jobs" value="128 / 512" icon={Activity} accent="38 92% 50%" />
      </div>
    </>
  );
}

function ChartCard({
  title,
  subtitle,
  unit,
  metric,
  metricSub,
  data,
  yDomain,
}: {
  title: string;
  subtitle: string;
  unit: string;
  metric: string;
  metricSub: string;
  data: { t: number; gpu0: number; gpu1: number; gpu2: number; gpu3: number }[];
  yDomain: [number, number];
}) {
  return (
    <div className="surface-card p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[12px] text-muted-foreground">{title}</div>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <div className="text-[22px] font-semibold tracking-tight gradient-text">{metric}</div>
            <div className="text-[10px] text-muted-foreground">{unit}</div>
          </div>
          <div className="text-[10px] text-muted-foreground mt-0.5">{metricSub}</div>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ background: gpuColors[0] }} /> GPU-0</span>
          <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ background: gpuColors[1] }} /> GPU-1</span>
          <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ background: gpuColors[2] }} /> GPU-2</span>
          <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ background: gpuColors[3] }} /> GPU-3</span>
        </div>
      </div>

      <div className="h-[140px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
            <defs>
              {gpuColors.map((c, i) => (
                <linearGradient key={i} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={c} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 22%)" vertical={false} />
            <XAxis dataKey="t" hide />
            <YAxis
              domain={yDomain}
              tick={{ fill: 'hsl(215 20% 65%)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={28}
            />
            <Tooltip
              cursor={{ stroke: 'hsl(222 30% 30%)', strokeWidth: 1 }}
              contentStyle={{
                background: 'hsl(222 41% 9%)',
                border: '1px solid hsl(222 30% 22%)',
                borderRadius: 8,
                fontSize: 11,
                color: 'hsl(210 40% 98%)',
              }}
            />
            {gpuColors.map((c, i) => (
              <Area
                key={i}
                type="monotone"
                dataKey={`gpu${i}`}
                stroke={c}
                strokeWidth={1.5}
                fill={`url(#grad-${i})`}
                isAnimationActive={false}
                dot={false}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-1 text-[10px] text-muted-foreground text-right">{subtitle}</div>
    </div>
  );
}

function SystemItem({
  label,
  value,
  icon: Icon,
  accent,
  withBar,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent?: string;
  withBar?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon
        className="h-3.5 w-3.5"
        style={accent ? { color: `hsl(${accent})` } : undefined}
      />
      <span className="text-muted-foreground">{label}:</span>
      <span className="text-foreground font-medium font-mono">{value}</span>
      {withBar && (
        <div className="hidden md:block w-16 h-1 rounded-full bg-secondary/60 overflow-hidden">
          <div className="h-full gradient-primary" style={{ width: value }} />
        </div>
      )}
    </div>
  );
}
