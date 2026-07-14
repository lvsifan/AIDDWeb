import { useMemo, useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  KeyRound,
  ShieldCheck,
  Pencil,
  Trash2,
  Users as UsersIcon,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { users, type User } from '@/lib/data';

type StatusFilter = 'All' | 'Active' | 'Pending';

function StatusPill({ status }: { status: User['apiKeyStatus'] }) {
  if (status === 'Active') {
    return (
      <span className="pill-active">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Active
      </span>
    );
  }
  if (status === 'Pending') {
    return (
      <span className="pill-pending">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Pending
      </span>
    );
  }
  return (
    <span className="pill-failed">
      <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
      {status}
    </span>
  );
}

function RolePill({ role }: { role: User['role'] }) {
  const isAdmin = role === 'Admin';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium border',
        isAdmin
          ? 'border-primary/40 bg-primary/10 text-primary'
          : 'border-border bg-secondary/40 text-muted-foreground',
      )}
    >
      {isAdmin ? <ShieldCheck className="h-3 w-3" /> : <KeyRound className="h-3 w-3" />}
      {role}
    </span>
  );
}

function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');
  return (
    <div
      className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-white text-[11px] font-semibold"
      style={{ background: `hsl(${color})` }}
    >
      {initials}
    </div>
  );
}

export default function UserManagement() {
  const [filter, setFilter] = useState<StatusFilter>('All');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchStatus = filter === 'All' ? true : u.apiKeyStatus === filter;
      const q = query.trim().toLowerCase();
      const matchQuery =
        q === '' ||
        u.fullName.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [filter, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  const counts = useMemo(
    () => ({
      All: users.length,
      Active: users.filter((u) => u.apiKeyStatus === 'Active').length,
      Pending: users.filter((u) => u.apiKeyStatus === 'Pending').length,
    }),
    [],
  );

  return (
    <>
      <PageHeader
        title="User Management"
        description="Manage platform users, roles, and access permissions."
        actions={
          <Button className="gradient-primary text-white border-0 hover:opacity-90">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        }
      />

      {/* Stat row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <StatCard label="Total Users"   value={String(users.length)}  icon={UsersIcon} accent="217 91% 60%" />
        <StatCard label="Active"        value={String(counts.Active)} icon={ShieldCheck} accent="142 71% 45%" />
        <StatCard label="Pending"       value={String(counts.Pending)} icon={KeyRound}   accent="38 92% 50%"  />
        <StatCard label="Departments"   value="8"                      icon={Filter}     accent="262 83% 58%" />
      </div>

      <div className="surface-card overflow-hidden">
        {/* Search + tabs */}
        <div className="p-4 border-b border-border/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative md:max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or employee ID..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 h-9 bg-secondary/40 border-border/60"
              />
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">Status</span>
              <div className="flex items-center p-0.5 rounded-md bg-secondary/50 border border-border/60">
                {(['All', 'Active', 'Pending'] as StatusFilter[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setFilter(s);
                      setPage(1);
                    }}
                    className={cn(
                      'px-3 h-7 text-xs font-medium rounded transition-colors',
                      filter === s
                        ? 'gradient-primary text-white'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <span className="text-xs text-muted-foreground hidden md:inline">
                Total Users: <span className="text-foreground font-medium">{users.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Employee ID</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Full Name</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Department</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">API Key Status</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Role</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((u) => (
              <TableRow key={u.id} className="hover:bg-secondary/30">
                <TableCell className="font-mono text-xs text-muted-foreground">{u.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar name={u.fullName} color={u.avatarColor} />
                    <div className="min-w-0">
                      <div className="text-[13px] font-medium truncate">{u.fullName}</div>
                      <div className="text-[11px] text-muted-foreground truncate">{u.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-[13px]">{u.department}</TableCell>
                <TableCell><StatusPill status={u.apiKeyStatus} /></TableCell>
                <TableCell><RolePill role={u.role} /></TableCell>
                <TableCell className="text-right pr-4">
                  <div className="inline-flex items-center gap-1">
                    <Button size="icon-sm" variant="ghost" aria-label="Edit">
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="icon-sm" variant="ghost" aria-label="Delete" className="hover:text-rose-400">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border/60 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select className="h-7 rounded border border-border/60 bg-secondary/40 px-2 text-foreground text-xs">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <span>
              {filtered.length === 0 ? 0 : start + 1}-{Math.min(start + pageSize, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <Button size="icon-sm" variant="ghost" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} aria-label="Previous">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Badge variant="secondary" className="bg-primary/15 text-primary border-0 font-mono">
                {page}
              </Badge>
              <Button size="icon-sm" variant="ghost" disabled={page === pageCount} onClick={() => setPage((p) => Math.min(pageCount, p + 1))} aria-label="Next">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}) {
  return (
    <div className="surface-card p-4 flex items-center gap-3">
      <div
        className="h-9 w-9 rounded-lg flex items-center justify-center"
        style={{ background: `hsl(${accent} / 0.18)`, color: `hsl(${accent})` }}
      >
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="leading-tight">
        <div className="text-[20px] font-semibold tracking-tight">{value}</div>
        <div className="text-[11px] text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
