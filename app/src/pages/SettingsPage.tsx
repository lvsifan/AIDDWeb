import { useState } from 'react';
import {
  Save,
  Plus,
  Copy,
  Trash2,
  Key,
  CreditCard,
  Bell,
  Globe,
  User,
  Sparkles,
  Activity,
  Eye,
  EyeOff,
  Edit,
  Check,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { apiKeys, creditUsage30d } from '@/lib/data';
import { cn } from '@/lib/utils';

type Tab = 'profile' | 'security' | 'preferences' | 'billing';

const tabs: { id: Tab; label: string }[] = [
  { id: 'profile',     label: 'Profile'           },
  { id: 'security',    label: 'Security & API Keys' },
  { id: 'preferences', label: 'Preferences'       },
  { id: 'billing',     label: 'Billing & Usage'   },
];

const preferencesSections = [
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'language',      label: 'Language & Region', icon: Globe },
  { id: 'accessibility', label: 'Accessibility', icon: Eye },
  { id: 'privacy',       label: 'Privacy', icon: User },
];

const billingHistory = [
  { id: 'INV-2026-071', date: '2026-07-01', amount: '$2,000.00', credits: '50,000', status: 'Paid' },
  { id: 'INV-2026-060', date: '2026-06-01', amount: '$1,200.00', credits: '30,000', status: 'Paid' },
  { id: 'INV-2026-050', date: '2026-05-01', amount: '$1,500.00', credits: '40,000', status: 'Paid' },
  { id: 'INV-2026-040', date: '2026-04-01', amount: '$800.00',   credits: '20,000', status: 'Paid' },
];

const notificationSettings = [
  { id: 'job-complete',   label: 'Job Completion',     desc: 'Notify me when a submitted job finishes',            enabled: true  },
  { id: 'job-failed',     label: 'Job Failures',       desc: 'Notify me when a job fails or is interrupted',       enabled: true  },
  { id: 'weekly-report',  label: 'Weekly Summary',     desc: 'Get a weekly digest of activity and credit usage',   enabled: true  },
  { id: 'team-invites',   label: 'Team Invitations',   desc: 'When someone invites me to a project',               enabled: true  },
  { id: 'security',       label: 'Security Alerts',    desc: 'Login attempts, API key changes',                    enabled: true  },
  { id: 'product-updates',label: 'Product Updates',    desc: 'New features, maintenance, downtime notifications',  enabled: false },
];

function Sparkline({ data, accent }: { data: number[]; accent: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 320;
  const h = 80;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * (h - 8) - 4;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20">
      <defs>
        <linearGradient id="usage-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`hsl(${accent})`} stopOpacity="0.3" />
          <stop offset="100%" stopColor={`hsl(${accent})`} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={`0,${h} ${pts} ${w},${h}`}
        fill="url(#usage-gradient)"
        stroke="none"
      />
      <polyline
        points={pts}
        fill="none"
        stroke={`hsl(${accent})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('profile');
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});

  return (
    <>
      <PageHeader
        title="Personal Account & Settings"
        description="Manage your profile, API keys, preferences, and billing information."
      />

      <div className="flex items-center gap-4 mb-5">
        <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center text-white text-[22px] font-semibold">
          AK
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-[18px] font-semibold">Alex Kim</h2>
            <Badge variant="outline" className="text-[10px] border-primary/30 text-primary bg-primary/10">
              Principal Investigator
            </Badge>
          </div>
          <p className="text-[12px] text-muted-foreground">Computational Chemistry</p>
        </div>
        <div className="flex items-center gap-5 text-right">
          <div>
            <div className="text-[18px] font-semibold gradient-text">24</div>
            <div className="text-[10px] text-muted-foreground">Projects</div>
          </div>
          <div>
            <div className="text-[18px] font-semibold gradient-text">8,420</div>
            <div className="text-[10px] text-muted-foreground">Credits</div>
          </div>
          <div>
            <div className="text-[18px] font-semibold gradient-text">2023</div>
            <div className="text-[10px] text-muted-foreground">Member since</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border/60 mb-5">
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors',
                tab === t.id
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="surface-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold">Profile Information</h3>
              <Button variant="ghost" size="sm" className="text-primary">
                <Edit className="h-3.5 w-3.5" /> Edit
              </Button>
            </div>
            <div className="space-y-3.5">
              {[
                { label: 'Full Name', value: 'Alex Kim' },
                { label: 'Email',     value: 'alex.kim@pharmaaidd.com' },
                { label: 'Department',value: 'Computational Chemistry' },
                { label: 'Position',  value: 'Principal Investigator' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground/70">{f.label}</label>
                  <Input defaultValue={f.value} className="mt-1 bg-secondary/30" />
                </div>
              ))}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Bio</label>
                <textarea
                  defaultValue="Principal Investigator focused on AI-driven drug discovery, computational chemistry, and molecular dynamics simulations."
                  className="mt-1 w-full min-h-20 bg-secondary/30 border border-border/60 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
              </div>
              <Button className="gradient-primary text-white border-0 hover:opacity-90">
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="surface-card p-5">
              <h3 className="text-[14px] font-semibold mb-3">Account Status</h3>
              <div className="space-y-2.5 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account Type</span>
                  <Badge className="gradient-primary text-white border-0">Pro</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Storage Used</span>
                  <span>42% of 128 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Two-Factor Auth</span>
                  <span className="text-emerald-400 inline-flex items-center gap-1"><Check className="h-3 w-3" /> Enabled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email Verified</span>
                  <span className="text-emerald-400 inline-flex items-center gap-1"><Check className="h-3 w-3" /> Verified</span>
                </div>
              </div>
            </div>
            <div className="surface-card p-5">
              <h3 className="text-[14px] font-semibold mb-2">Quick Stats</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 rounded-md bg-secondary/30">
                  <div className="text-[18px] font-semibold gradient-text">156</div>
                  <div className="text-[10px] text-muted-foreground">Datasets</div>
                </div>
                <div className="text-center p-2 rounded-md bg-secondary/30">
                  <div className="text-[18px] font-semibold gradient-text">42</div>
                  <div className="text-[10px] text-muted-foreground">Workflows</div>
                </div>
                <div className="text-center p-2 rounded-md bg-secondary/30">
                  <div className="text-[18px] font-semibold gradient-text">1.2K</div>
                  <div className="text-[10px] text-muted-foreground">Jobs Run</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="surface-card p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold">API Keys</h3>
              <Button size="sm" className="gradient-primary text-white border-0 hover:opacity-90">
                <Plus className="h-3.5 w-3.5" /> Generate New API Key
              </Button>
            </div>
            <div className="space-y-2.5">
              {apiKeys.map((k) => {
                const isRevealed = showKey[k.id];
                return (
                  <div key={k.id} className="p-3 rounded-lg border border-border/60 bg-secondary/20 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-md flex items-center justify-center bg-primary/15 text-primary">
                      <Key className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium">{k.name}</div>
                      <div className="text-[11px] text-muted-foreground font-mono truncate">
                        {isRevealed ? k.key : k.key.replace(/.+/, '••••••••••••••••••••••••••••••••')}
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-muted-foreground hidden md:block">
                      <div>Created {k.createdAt}</div>
                      <div>Last used {k.lastUsed}</div>
                    </div>
                    <Badge
                      className={cn(
                        'border-0',
                        k.status === 'Active'  && 'bg-emerald-500/20 text-emerald-400',
                        k.status === 'Pending' && 'bg-amber-500/20 text-amber-400',
                        k.status === 'Revoked' && 'bg-red-500/20 text-red-400',
                      )}
                    >
                      {k.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowKey({ ...showKey, [k.id]: !isRevealed })}>
                      {isRevealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-300">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="surface-card p-5">
              <h3 className="text-[14px] font-semibold mb-3">Two-Factor Auth</h3>
              <div className="flex items-center gap-2 text-emerald-400 text-[12px] mb-3">
                <Check className="h-4 w-4" /> Active (Authenticator App)
              </div>
              <p className="text-[11px] text-muted-foreground mb-3">You use an authenticator app for 2FA. Your last code was used 2 hours ago.</p>
              <Button variant="outline" size="sm" className="w-full">Manage 2FA</Button>
            </div>
            <div className="surface-card p-5">
              <h3 className="text-[14px] font-semibold mb-3">Active Sessions</h3>
              <div className="space-y-2.5 text-[12px]">
                <div className="flex items-start gap-2">
                  <Activity className="h-3.5 w-3.5 text-emerald-400 mt-0.5" />
                  <div className="flex-1">
                    <div>Chrome on macOS</div>
                    <div className="text-[10px] text-muted-foreground">San Francisco, CA · Current session</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Activity className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div>Firefox on Windows</div>
                    <div className="text-[10px] text-muted-foreground">New York, NY · 2 days ago</div>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3 text-red-400">Sign Out All Devices</Button>
            </div>
          </div>
        </div>
      )}

      {tab === 'preferences' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="surface-card p-5 lg:col-span-1">
            <h3 className="text-[14px] font-semibold mb-3">Categories</h3>
            <ul className="space-y-1">
              {preferencesSections.map((s, i) => (
                <li key={s.id}>
                  <button
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[12px] transition-colors',
                      i === 0 ? 'bg-secondary/40 text-foreground' : 'text-muted-foreground hover:bg-secondary/30',
                    )}
                  >
                    <s.icon className="h-3.5 w-3.5" /> {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-card p-5 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-4 w-4 text-primary" />
              <h3 className="text-[14px] font-semibold">Notifications</h3>
            </div>
            <div className="space-y-3">
              {notificationSettings.map((n) => (
                <div key={n.id} className="flex items-center justify-between p-3 rounded-lg border border-border/40">
                  <div className="flex-1">
                    <div className="text-[13px] font-medium">{n.label}</div>
                    <div className="text-[11px] text-muted-foreground">{n.desc}</div>
                  </div>
                  <button
                    onClick={() => {}}
                    className={cn(
                      'h-6 w-11 rounded-full transition-colors relative',
                      n.enabled ? 'gradient-primary' : 'bg-secondary',
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all',
                        n.enabled ? 'left-5' : 'left-0.5',
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'billing' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="surface-card p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[14px] font-semibold">Usage Overview</h3>
              <span className="text-[10px] text-muted-foreground">Last 30 days</span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-3">Compute Credits Usage (Last 30 Days)</p>
            <div className="flex items-end gap-2 mb-3">
              <div className="text-[28px] font-semibold gradient-text">8,420 <span className="text-[14px] text-muted-foreground font-normal">/ 20,000</span></div>
              <div className="text-[10px] text-muted-foreground pb-1">42%</div>
            </div>
            <Sparkline data={creditUsage30d} accent="262 83% 68%" />
            <div className="grid grid-cols-3 gap-3 mt-4 text-center text-[12px]">
              <div className="p-2.5 rounded-md bg-secondary/30">
                <div className="text-[16px] font-semibold">8,420</div>
                <div className="text-[10px] text-muted-foreground">Used</div>
              </div>
              <div className="p-2.5 rounded-md bg-secondary/30">
                <div className="text-[16px] font-semibold">11,580</div>
                <div className="text-[10px] text-muted-foreground">Remaining</div>
              </div>
              <div className="p-2.5 rounded-md bg-secondary/30">
                <div className="text-[16px] font-semibold">Jun 1, 2026</div>
                <div className="text-[10px] text-muted-foreground">Resets on</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="surface-card p-5">
              <h3 className="text-[14px] font-semibold mb-3">Current Plan</h3>
              <div className="p-3 rounded-md gradient-primary-soft border border-primary/20 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-[14px] font-semibold">Pro Annual</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">$24,000/year · 240,000 credits</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <CreditCard className="h-3.5 w-3.5" /> Manage Plan
              </Button>
            </div>
            <div className="surface-card p-5">
              <h3 className="text-[14px] font-semibold mb-3">Payment Method</h3>
              <div className="text-[12px] mb-3">
                <div>Visa ending in •••• 4242</div>
                <div className="text-[10px] text-muted-foreground">Expires 12/2027</div>
              </div>
              <Button variant="outline" size="sm" className="w-full">Update Card</Button>
            </div>
          </div>

          <div className="surface-card p-5 lg:col-span-3">
            <h3 className="text-[14px] font-semibold mb-3">Billing History</h3>
            <table className="w-full text-[12px]">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-muted-foreground/70 border-b border-border/60">
                  <th className="text-left font-medium py-2">Invoice</th>
                  <th className="text-left font-medium py-2">Date</th>
                  <th className="text-left font-medium py-2">Credits</th>
                  <th className="text-left font-medium py-2">Amount</th>
                  <th className="text-left font-medium py-2">Status</th>
                  <th className="text-right font-medium py-2 pr-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((b) => (
                  <tr key={b.id} className="border-b border-border/40">
                    <td className="py-2.5 font-mono text-[11px]">{b.id}</td>
                    <td className="py-2.5">{b.date}</td>
                    <td className="py-2.5">{b.credits}</td>
                    <td className="py-2.5 font-medium">{b.amount}</td>
                    <td className="py-2.5"><span className="pill-completed">{b.status}</span></td>
                    <td className="py-2.5 pr-2 text-right">
                      <Button variant="ghost" size="sm" className="h-7 text-[11px]">Download</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
