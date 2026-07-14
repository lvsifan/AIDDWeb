import { Link } from 'react-router-dom';
import {
  Briefcase,
  FlaskConical,
  Send,
  Activity,
  TrendingUp,
  Cpu,
  Sparkles,
  ArrowUpRight,
  Plus,
  CheckCircle2,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Active Projects',   value: '24',    delta: '+3 this week', accent: '217 91% 60%',  icon: Briefcase },
  { label: 'Tools Installed',   value: '128',   delta: '+5 this month', accent: '262 83% 58%',  icon: FlaskConical },
  { label: 'Jobs Running',      value: '37',    delta: '12 queued',     accent: '142 71% 45%',  icon: Activity },
  { label: 'Compute Credits',   value: '8,420', delta: '−210 today',    accent: '38 92% 50%',   icon: Cpu },
];

const quickLinks = [
  { to: '/tools',  label: 'Browse Tool Library', icon: FlaskConical, accent: '217 91% 60%' },
  { to: '/submit', label: 'Submit a New Task',   icon: Send,         accent: '262 83% 58%' },
  { to: '/jobs',   label: 'Monitor HPC Jobs',    icon: Activity,     accent: '142 71% 45%' },
];

const recent = [
  { id: '#989234', name: 'Docking_Batch_0427',  project: 'Oncology',  status: 'Running',   when: '10:37' },
  { id: '#989233', name: 'MD_Simulation_0427', project: 'CNS',       status: 'Running',   when: '10:28' },
  { id: '#989228', name: 'ADMET_LogP',         project: 'ADMET',     status: 'Completed', when: '10:23' },
  { id: '#989225', name: 'Trajectory_Analysis',project: 'Oncology',  status: 'Failed',    when: '14:12' },
];

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title={
          <span>
            Welcome back, <span className="gradient-text">Alex</span>
          </span>
        }
        description="Here's a quick look at what's happening across your drug discovery pipelines today."
        actions={
          <Button asChild className="gradient-primary text-white border-0 hover:opacity-90">
            <Link to="/submit"><Plus className="h-4 w-4" /> New Task</Link>
          </Button>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="surface-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ background: `hsl(${s.accent} / 0.15)`, color: `hsl(${s.accent})` }}
              >
                <s.icon className="h-4 w-4" />
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            </div>
            <div className="text-[22px] font-semibold tracking-tight leading-none">{s.value}</div>
            <div className="text-[11px] text-muted-foreground mt-1.5">{s.label}</div>
            <div className="text-[10px] text-emerald-400 mt-1.5 inline-flex items-center gap-1">
              <TrendingUp className="h-2.5 w-2.5" />
              {s.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Quick links */}
        <div className="surface-card p-5 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-[14px] font-semibold">Quick Actions</h2>
          </div>
          <div className="space-y-2">
            {quickLinks.map((q) => (
              <Link
                key={q.to}
                to={q.to}
                className="group flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-secondary/20 hover:bg-secondary/40 transition-colors"
              >
                <div
                  className="h-8 w-8 rounded-md flex items-center justify-center"
                  style={{ background: `hsl(${q.accent} / 0.15)`, color: `hsl(${q.accent})` }}
                >
                  <q.icon className="h-4 w-4" />
                </div>
                <span className="text-[13px] font-medium flex-1">{q.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent jobs */}
        <div className="surface-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-semibold">Recent Job Activity</h2>
            <Link to="/jobs" className="text-[11px] text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-2">
            {recent.map((r) => (
              <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-md hover:bg-secondary/30 transition-colors">
                <div className="font-mono text-[11px] text-muted-foreground w-16">{r.id}</div>
                <div className="text-[13px] font-medium flex-1 truncate">{r.name}</div>
                <div className="text-[11px] text-muted-foreground hidden md:block">{r.project}</div>
                <span
                  className={cn(
                    r.status === 'Running'   && 'pill-running',
                    r.status === 'Completed' && 'pill-completed',
                    r.status === 'Failed'    && 'pill-failed',
                    r.status === 'Pending'   && 'pill-pending',
                  )}
                >
                  {r.status === 'Completed' && <CheckCircle2 className="h-3 w-3" />}
                  {r.status}
                </span>
                <div className="text-[11px] font-mono text-muted-foreground w-12 text-right">{r.when}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
