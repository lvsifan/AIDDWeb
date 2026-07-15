import { Search, Filter, Server, Cpu, Activity, Zap } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { gpuNodes } from '@/lib/data';
import { cn } from '@/lib/utils';

function MiniChart({ value }: { value: number }) {
  return (
    <div className="flex items-end gap-[1.5px] h-6 w-20">
      {Array.from({ length: 16 }).map((_, i) => {
        const seed = (i * 13 + 7) % 7;
        const v = Math.min(100, value * 0.6 + seed * 6);
        return (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${v}%`,
              background: value > 80 ? 'hsl(0 72% 51%)' : value > 50 ? 'hsl(38 92% 50%)' : 'hsl(142 71% 45%)',
            }}
          />
        );
      })}
    </div>
  );
}

function ProgressBar({ value, accent, label }: { value: number; accent: string; label?: string }) {
  return (
    <div>
      {label && <div className="flex justify-between text-[9px] mb-0.5"><span className="text-muted-foreground">{label}</span><span>{value}%</span></div>}
      <div className="h-1.5 w-16 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${value}%`,
            background: `hsl(${accent})`,
          }}
        />
      </div>
    </div>
  );
}

export default function ClusterPage() {
  const totalUtil = Math.round(gpuNodes.reduce((s, n) => s + n.util, 0) / gpuNodes.length);
  const activeNodes = gpuNodes.filter((n) => n.status === 'Healthy').length;

  return (
    <>
      <PageHeader
        title="Compute Cluster"
        description="Monitor and manage GPU/CPU cluster nodes."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-3.5 w-3.5" /> Filters
            </Button>
          </div>
        }
      />

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {[
          { label: 'Total Nodes',    value: gpuNodes.length.toString(),                sub: `${activeNodes} healthy`,   icon: Server,  accent: '217 91% 60%' },
          { label: 'Avg Utilization', value: `${totalUtil}%`,                          sub: 'Across all nodes',          icon: Activity,accent: '142 71% 45%' },
          { label: 'Total CPU',      value: '640',                                     sub: '5120 cores',                icon: Cpu,     accent: '262 83% 58%' },
          { label: 'Total GPU',      value: '40',                                      sub: 'A100/H100/V100',            icon: Zap,     accent: '38 92% 50%'  },
        ].map((s) => (
          <div key={s.label} className="surface-card p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <div className="h-7 w-7 rounded-md flex items-center justify-center" style={{ background: `hsl(${s.accent} / 0.15)`, color: `hsl(${s.accent})` }}>
                <s.icon className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="text-[18px] font-semibold tracking-tight leading-none">{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{s.label}</div>
            <div className="text-[9px] text-emerald-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search nodes..." className="pl-9 h-9 bg-secondary/30" />
        </div>
      </div>

      <div className="surface-card p-0 overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-muted-foreground/70 border-b border-border/60 bg-secondary/30">
              <th className="text-left font-medium py-2.5 pl-3">Node ID</th>
              <th className="text-left font-medium py-2.5">Host</th>
              <th className="text-left font-medium py-2.5">GPU</th>
              <th className="text-left font-medium py-2.5">CPU</th>
              <th className="text-left font-medium py-2.5">Utilization</th>
              <th className="text-left font-medium py-2.5">Memory</th>
              <th className="text-left font-medium py-2.5">Temp</th>
              <th className="text-left font-medium py-2.5">Power</th>
              <th className="text-left font-medium py-2.5">Running Jobs</th>
              <th className="text-left font-medium py-2.5 pr-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {gpuNodes.map((n) => (
              <tr key={n.id} className="border-b border-border/40 hover:bg-secondary/20">
                <td className="py-2.5 pl-3 font-mono text-[11px] font-medium">{n.id}</td>
                <td className="py-2.5 text-muted-foreground">{n.host}</td>
                <td className="py-2.5">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary/50 text-[10px] font-semibold">
                    {n.gpu}
                  </span>
                </td>
                <td className="py-2.5"><ProgressBar value={n.cpu} accent="217 91% 60%" /></td>
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <ProgressBar value={n.util} accent={n.util > 80 ? '0 72% 51%' : n.util > 50 ? '38 92% 50%' : '142 71% 45%'} />
                    <MiniChart value={n.util} />
                  </div>
                </td>
                <td className="py-2.5"><ProgressBar value={n.mem} accent="262 83% 58%" /></td>
                <td className="py-2.5">
                  <span className={cn(
                    'font-mono text-[11px]',
                    n.temp > 75 ? 'text-red-400' : n.temp > 60 ? 'text-amber-400' : 'text-emerald-400',
                  )}>
                    {n.temp}°C
                  </span>
                </td>
                <td className="py-2.5 font-mono text-[11px]">{n.power} W</td>
                <td className="py-2.5 font-medium">{n.jobs}</td>
                <td className="py-2.5 pr-3">
                  <span className={cn(
                    'pill',
                    n.status === 'Healthy' && 'pill-completed',
                    n.status === 'Warning' && 'pill-pending',
                    n.status === 'Down'    && 'pill-failed',
                  )}>
                    {n.status === 'Healthy' && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                    {n.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-3 py-2.5 text-[11px] text-muted-foreground border-t border-border/40 flex items-center justify-between">
          <span>Showing {gpuNodes.length} of {gpuNodes.length} nodes</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Healthy</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />Warning</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-red-400" />Down</span>
          </div>
        </div>
      </div>
    </>
  );
}
