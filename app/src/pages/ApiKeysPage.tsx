import { useMemo, useState } from 'react';
import {
  Plus,
  Copy,
  Check,
  Eye,
  EyeOff,
  Trash2,
  Key,
  Search,
  Filter,
  ShieldCheck,
  ShieldAlert,
  Clock,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { apiKeys as seedKeys, type ApiKey } from '@/lib/data';
import { cn } from '@/lib/utils';

type Tab = 'all' | 'Active' | 'Pending' | 'Revoked';

const tabs: { id: Tab; label: string }[] = [
  { id: 'all',    label: 'All Keys' },
  { id: 'Active', label: 'Active'   },
  { id: 'Pending', label: 'Pending'  },
  { id: 'Revoked', label: 'Revoked'  },
];

function maskKey(key: string) {
  // keep the prefix, hide the middle, show the last 4 chars
  const prefixMatch = key.match(/^(pka_live_|pka_test_)/);
  const prefix = prefixMatch ? prefixMatch[0] : '';
  const rest = key.slice(prefix.length);
  if (rest.length <= 4) return key;
  return `${prefix}${'•'.repeat(Math.max(rest.length - 4, 4))}${rest.slice(-4)}`;
}

function randomKey() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < 22; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `pka_live_${s}`;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(seedKeys);
  const [tab, setTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = keys;
    if (tab !== 'all') list = list.filter((k) => k.status === tab);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((k) => k.name.toLowerCase().includes(q) || k.key.toLowerCase().includes(q));
    }
    return list;
  }, [keys, tab, search]);

  const activeCount = keys.filter((k) => k.status === 'Active').length;
  const totalCount = keys.length;

  const copy = (k: ApiKey) => {
    navigator.clipboard?.writeText(k.key).catch(() => {});
    setCopied(k.id);
    setTimeout(() => setCopied((c) => (c === k.id ? null : c)), 1500);
  };

  const revoke = (id: string) => {
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, status: 'Revoked' } : k)));
    setRevealed((r) => ({ ...r, [id]: false }));
  };

  const generate = () => {
    const id = `K-${String(keys.length + 1).padStart(3, '0')}`;
    const newKey: ApiKey = {
      id,
      name: `New Key ${keys.length + 1}`,
      key: randomKey(),
      createdAt: new Date().toISOString().slice(0, 10),
      lastUsed: 'Never',
      status: 'Pending',
    };
    setKeys((prev) => [newKey, ...prev]);
    setTab('all');
    setRevealed((r) => ({ ...r, [id]: true }));
  };

  return (
    <>
      <PageHeader
        title="API Keys"
        description="Issue and manage programmatic API access keys for your account."
        actions={
          <Button size="sm" className="gradient-primary text-white border-0 hover:opacity-90" onClick={generate}>
            <Plus className="h-3.5 w-3.5" /> Generate New Key
          </Button>
        }
      />

      {/* Stat strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        <div className="surface-card p-3.5">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Total Keys</div>
          <div className="text-[22px] font-semibold mt-0.5">{totalCount}</div>
        </div>
        <div className="surface-card p-3.5">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Active</div>
          <div className="text-[22px] font-semibold mt-0.5 text-emerald-400">{activeCount}</div>
        </div>
        <div className="surface-card p-3.5 col-span-2 sm:col-span-1">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70">Revoked</div>
          <div className="text-[22px] font-semibold mt-0.5 text-rose-400">{totalCount - activeCount - keys.filter((k) => k.status === 'Pending').length}</div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keys by name..."
            className="pl-9 h-9 bg-secondary/30"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-3.5 w-3.5" /> Filters
        </Button>
      </div>

      <div className="border-b border-border/60 mb-4">
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'px-4 py-2 text-[12px] font-medium border-b-2 transition-colors',
                tab === t.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {t.label}
              {t.id !== 'all' && (
                <span className="text-muted-foreground/60 text-[10px] ml-1">
                  ({keys.filter((k) => k.status === t.id).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="surface-card p-12 text-center text-muted-foreground">
          <Key className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <div className="text-[13px]">No API keys found</div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((k) => {
            const isRevealed = revealed[k.id];
            const isCopied = copied === k.id;
            return (
              <div
                key={k.id}
                className={cn(
                  'surface-card p-3.5 flex items-center gap-3 transition-colors',
                  k.status === 'Revoked' && 'opacity-60',
                )}
              >
                <div
                  className={cn(
                    'h-10 w-10 rounded-lg flex items-center justify-center shrink-0',
                    k.status === 'Active'  && 'bg-emerald-500/15 text-emerald-400',
                    k.status === 'Pending' && 'bg-amber-500/15 text-amber-400',
                    k.status === 'Revoked' && 'bg-rose-500/15 text-rose-400',
                  )}
                >
                  <Key className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[13px] font-semibold truncate">{k.name}</h3>
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-[9px] shrink-0',
                        k.status === 'Active'  && 'text-emerald-400 border-emerald-400/40',
                        k.status === 'Pending' && 'text-amber-400 border-amber-400/40',
                        k.status === 'Revoked' && 'text-rose-400 border-rose-400/40',
                      )}
                    >
                      {k.status === 'Active' && <ShieldCheck className="h-2.5 w-2.5 mr-1" />}
                      {k.status === 'Revoked' && <ShieldAlert className="h-2.5 w-2.5 mr-1" />}
                      {k.status}
                    </Badge>
                  </div>
                  <div className="font-mono text-[11px] text-muted-foreground mt-1 flex items-center gap-2">
                    <span className="truncate">{isRevealed ? k.key : maskKey(k.key)}</span>
                    <button
                      onClick={() => setRevealed((r) => ({ ...r, [k.id]: !r[k.id] }))}
                      className="shrink-0 text-muted-foreground/70 hover:text-foreground transition-colors"
                      aria-label={isRevealed ? 'Hide key' : 'Show key'}
                    >
                      {isRevealed ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground/70 mt-1">
                    <span>Created {k.createdAt}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" /> {k.lastUsed}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copy(k)}
                    aria-label="Copy key"
                  >
                    {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </Button>
                  {k.status !== 'Revoked' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                      onClick={() => revoke(k.id)}
                      aria-label="Revoke key"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-[11px] text-muted-foreground/60 mt-4 flex items-center gap-1.5">
        <ShieldAlert className="h-3.5 w-3.5" />
        Treat API keys like passwords. Revoked keys cannot be restored — generate a new one instead.
      </p>
    </>
  );
}
