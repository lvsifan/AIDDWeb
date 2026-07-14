import type { LucideIcon } from 'lucide-react';
import { Construction } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  description: string;
  icon: LucideIcon;
  backTo?: string;
  backLabel?: string;
};

export function PlaceholderPage({ title, description, icon: Icon, backTo = '/dashboard', backLabel = 'Back to Dashboard' }: Props) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <div className="surface-card p-12 text-center">
        <div className="mx-auto h-14 w-14 rounded-xl gradient-primary-soft flex items-center justify-center text-primary mb-4">
          <Icon className="h-6 w-6" />
        </div>
        <h2 className="text-[15px] font-semibold mb-1">Coming soon</h2>
        <p className="text-[12px] text-muted-foreground max-w-sm mx-auto mb-5">
          This section is part of the broader PharmaAIDD platform and will be available in a future release.
        </p>
        <Button asChild variant="outline" className="border-border/60">
          <Link to={backTo}>{backLabel}</Link>
        </Button>
      </div>
    </>
  );
}

export function ComingSoonPage({ title, description, icon }: { title: string; description: string; icon: LucideIcon }) {
  return <PlaceholderPage title={title} description={description} icon={icon} />;
}

export const Construction_ = Construction;
