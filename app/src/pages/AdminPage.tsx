import {
  Users,
  Cpu,
  Activity,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { adminStats } from '@/lib/data';

function Donut({ value, accent, size = 90, stroke = 8 }: { value: number; accent: string; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`hsl(${accent})`} strokeWidth={stroke} strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[14px] font-semibold" style={{ color: `hsl(${accent})` }}>
        {value}%
      </div>
    </div>
  );
}

function BarChart({ data, max }: { data: number[]; max: number }) {
  return (
    <div className="flex items-end gap-[2px] h-16">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm transition-all"
          style={{
            height: `${(v / max) * 100}%`,
            background: i >= data.length - 7
              ? 'linear-gradient(180deg, hsl(217 91% 60%) 0%, hsl(262 83% 58%) 100%)'
              : 'hsl(217 91% 60% / 0.5)',
          }}
          title={`${v}`}
        />
      ))}
    </div>
  );
}

function UsageBar({ value, total, unit, label, accent }: { value: number; total: number; unit: string; label: string; accent: string }) {
  const pct = (value / total) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value.toLocaleString()} / {total.toLocaleString()} {unit}</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, hsl(${accent}), hsl(${accent} / 0.6))` }} />
      </div>
    </div>
  );
}

export default function AdminPage() {
  const dailyMax = Math.max(...adminStats.dailyJobs);

  return (
    <>
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            <span>Admin Dashboard</span>
            <span className="text-[10px] gradient-primary text-white px-2 py-0.5 rounded-full">ADMIN</span>
          </span>
        }
        description="System overview and platform management."
      />

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {[
          { label: 'Total Users',     value: adminStats.totalUsers.toString(),  sub: `${adminStats.activeUsers} active`, icon: Users,     accent: '217 91% 60%'  },
          { label: 'Active Jobs',     value: adminStats.activeJobs.toString(),  sub: `${adminStats.totalJobs.toLocaleString()} total`, icon: Cpu, accent: '142 71% 45%'  },
          { label: 'Compute Resources', value: '36', sub: 'GPU nodes', icon: Activity, accent: '38 92% 50%' },
          { label: 'System Health',   value: `${adminStats.systemHealth}%`,    sub: 'All systems operational', icon: CheckCircle2, accent: '142 71% 45%' },
        ].map((s) => (
          <div key={s.label} className="surface-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: `hsl(${s.accent} / 0.15)`, color: `hsl(${s.accent})` }}>
                <s.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="text-[20px] font-semibold tracking-tight leading-none">{s.value}</div>
            <div className="text-[11px] text-muted-foreground mt-1.5">{s.label}</div>
            <div className="text-[10px] text-emerald-400 mt-1.5 inline-flex items-center gap-1">
              <TrendingUp className="h-2.5 w-2.5" /> {s.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-4">
        {/* Storage */}
        <div className="surface-card p-4 lg:col-span-1">
          <h3 className="text-[13px] font-semibold mb-3">Storage</h3>
          <UsageBar label="Total Used" value={adminStats.storage.used} total={adminStats.storage.total} unit={adminStats.storage.unit} accent="217 91% 60%" />
          <div className="mt-4">
            <Donut value={(adminStats.storage.used / adminStats.storage.total) * 100} accent="217 91% 60%" />
            <div className="text-center text-[11px] text-muted-foreground mt-2">of total capacity</div>
          </div>
        </div>

        {/* Job Statistics */}
        <div className="surface-card p-4 lg:col-span-2">
          <h3 className="text-[13px] font-semibold mb-3">Job Statistics <span className="text-muted-foreground/70 font-normal text-[10px]">(This month)</span></h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="p-2.5 rounded-md bg-secondary/30">
              <div className="text-[10px] text-muted-foreground">Total Jobs</div>
              <div className="text-[18px] font-semibold">1,248</div>
            </div>
            <div className="p-2.5 rounded-md bg-secondary/30">
              <div className="text-[10px] text-muted-foreground">Average Daily</div>
              <div className="text-[18px] font-semibold">156</div>
            </div>
          </div>
          <BarChart data={adminStats.dailyJobs} max={dailyMax} />
          <div className="flex justify-between text-[9px] text-muted-foreground mt-1.5">
            <span>Day 1</span><span>Day 8</span><span>Day 16</span><span>Day 24</span>
          </div>
        </div>

        {/* License Usage */}
        <div className="surface-card p-4 lg:col-span-1">
          <h3 className="text-[13px] font-semibold mb-3">License Usage</h3>
          <div className="flex justify-center">
            <Donut value={adminStats.licenseUsage.used} accent="38 92% 50%" size={120} stroke={10} />
          </div>
          <div className="text-center text-[11px] mt-2">
            <span className="font-semibold text-[15px]">64</span> / 100 Seats
          </div>
          <div className="text-[10px] text-muted-foreground text-center mt-1">36 seats available</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Top Experiments */}
        <div className="surface-card p-4">
          <h3 className="text-[13px] font-semibold mb-3">Top Experiments by Usage</h3>
          <div className="space-y-2.5">
            {adminStats.topExperiments.map((e, i) => (
              <div key={e.name} className="flex items-center gap-3">
                <div className="w-5 text-[10px] text-muted-foreground font-mono">#{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-[11px] mb-0.5">
                    <span className="font-medium">{e.name}</span>
                    <span className="text-muted-foreground">{e.usage} credits</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(e.usage / adminStats.topExperiments[0].usage) * 100}%`,
                        background: i === 0 ? 'hsl(38 92% 50%)' : i === 1 ? 'hsl(217 91% 60%)' : i === 2 ? 'hsl(262 83% 58%)' : 'hsl(142 71% 45%)',
                      }}
                    />
                  </div>
                </div>
                <span className="pill pill-pending text-[9px]">{e.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Departments */}
        <div className="surface-card p-4">
          <h3 className="text-[13px] font-semibold mb-3">Top Departments by Usage</h3>
          <div className="space-y-2.5">
            {adminStats.topDepartments.map((d, i) => (
              <div key={d.name} className="flex items-center gap-3">
                <div className="w-5 text-[10px] text-muted-foreground font-mono">#{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-[11px] mb-0.5">
                    <span className="font-medium">{d.name}</span>
                    <span className="text-muted-foreground">{d.usage.toLocaleString()} credits</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(d.usage / adminStats.topDepartments[0].usage) * 100}%`,
                        background: 'linear-gradient(90deg, hsl(217 91% 60%), hsl(262 83% 58%))',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
