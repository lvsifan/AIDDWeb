import { useState } from 'react';
import { Search, Filter, Download, Calendar, Globe } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auditLogs } from '@/lib/data';
import { cn } from '@/lib/utils';

const actionColor: Record<string, string> = {
  Login: 'pill-completed',
  'Job Submitted': 'pill-running',
  'API Key Created': 'pill-pending',
  'Dataset Downloaded': 'pill-pending',
  'Permission Changed': 'pill-running',
  'Dataset Updated': 'pill-running',
  'Credit Purchase': 'pill-completed',
  'Login Failed': 'pill-failed',
  'Settings Updated': 'pill-pending',
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState('');

  const filtered = search
    ? auditLogs.filter((l) =>
        l.user.toLowerCase().includes(search.toLowerCase()) ||
        l.action.toLowerCase().includes(search.toLowerCase()) ||
        l.resource.toLowerCase().includes(search.toLowerCase()),
      )
    : auditLogs;

  return (
    <>
      <PageHeader
        title="Audit Logs"
        description="Review all login attempts and security events."
        actions={
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        }
      />

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search logs..."
            className="pl-9 h-9 bg-secondary/30"
          />
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="h-3.5 w-3.5" /> Date Range
        </Button>
        <Button variant="outline" size="sm">
          <Filter className="h-3.5 w-3.5" /> Filters
        </Button>
      </div>

      <div className="surface-card p-0 overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-muted-foreground/70 border-b border-border/60 bg-secondary/30">
              <th className="text-left font-medium py-2.5 pl-3">Timestamp</th>
              <th className="text-left font-medium py-2.5">User</th>
              <th className="text-left font-medium py-2.5">Action</th>
              <th className="text-left font-medium py-2.5">Resource</th>
              <th className="text-left font-medium py-2.5">IP Address</th>
              <th className="text-left font-medium py-2.5 pr-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-b border-border/40 hover:bg-secondary/20">
                <td className="py-2.5 pl-3 font-mono text-[11px] text-muted-foreground">{l.timestamp}</td>
                <td className="py-2.5 font-medium">{l.user}</td>
                <td className="py-2.5">
                  <span className={cn('pill', actionColor[l.action] || 'pill-pending')}>
                    {l.action}
                  </span>
                </td>
                <td className="py-2.5 text-muted-foreground">{l.resource}</td>
                <td className="py-2.5 font-mono text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Globe className="h-2.5 w-2.5" /> {l.ip}
                  </span>
                </td>
                <td className="py-2.5 pr-3 text-muted-foreground">{l.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-3 py-2.5 text-[11px] text-muted-foreground border-t border-border/40 flex items-center justify-between">
          <span>Showing {filtered.length} of {auditLogs.length} logs</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-6 text-[10px]">‹</Button>
            <Button variant="default" size="sm" className="h-6 text-[10px] gradient-primary text-white border-0">1</Button>
            <Button variant="outline" size="sm" className="h-6 text-[10px]">2</Button>
            <Button variant="outline" size="sm" className="h-6 text-[10px]">3</Button>
            <Button variant="outline" size="sm" className="h-6 text-[10px]">›</Button>
          </div>
        </div>
      </div>
    </>
  );
}
