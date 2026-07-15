import { useState } from 'react';
import { Search, BookOpen, Code2, Sparkles, GraduationCap, Wrench, ChevronRight, FileText, Hash } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const sections = [
  { id: 'getting-started', label: 'Getting Started',     icon: GraduationCap },
  { id: 'api-docs',        label: 'API Documentation',  icon: Code2        },
  { id: 'sdks',            label: 'SDK Documentation',  icon: Wrench       },
  { id: 'tutorials',       label: 'Tutorials',           icon: Sparkles     },
  { id: 'reference',       label: 'Reference Guides',    icon: BookOpen     },
];

const gettingStarted = [
  { id: 'gs-1', title: 'Introduction to PharmaAIDD', desc: 'Platform overview, core concepts, and architecture', tag: '15 min read' },
  { id: 'gs-2', title: 'Quickstart: Run your first docking',  desc: 'Submit, monitor, and download results in 5 steps',  tag: 'Tutorial'   },
  { id: 'gs-3', title: 'How to install',         desc: 'Steps to register beta SDK from PyPI and npm',         tag: '10 min'     },
  { id: 'gs-4', title: 'User Guide',             desc: 'Comprehensive guide for scientists and admins',         tag: 'Reference' },
  { id: 'gs-5', title: 'Release Notes',          desc: 'What\'s new in v3.2',                                  tag: 'Latest'    },
];

const apiDocs = [
  { id: 'a-1', title: 'Docking API',         desc: 'Submit and manage docking calculations',  tag: 'REST'   },
  { id: 'a-2', title: 'MD Simulation API',   desc: 'Run molecular dynamics simulations',       tag: 'REST'   },
  { id: 'a-3', title: 'ADMET API',           desc: 'Predict ADMET properties from SMILES',    tag: 'REST'   },
  { id: 'a-4', title: 'Datasets API',        desc: 'Upload, list, download datasets',          tag: 'REST'   },
  { id: 'a-5', title: 'Jobs API',            desc: 'Track and manage computational jobs',     tag: 'REST'   },
  { id: 'a-6', title: 'Webhooks',            desc: 'Receive notifications on job events',     tag: 'Events' },
];

const sdks = [
  { id: 's-1', title: 'Python SDK',  desc: 'pip install pharmaaidd',  tag: 'PyPI'    },
  { id: 's-2', title: 'JavaScript SDK', desc: 'npm install @pharmaaidd/sdk', tag: 'npm' },
  { id: 's-3', title: 'R SDK',       desc: 'CRAN release coming Q4',   tag: 'Soon'    },
];

export default function DocsPage() {
  const [active, setActive] = useState('getting-started');

  return (
    <>
      <PageHeader
        title="Documentation Center"
        description="Find guides, API references, and tutorials."
      />

      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search documentation..." className="pl-9 h-10 bg-secondary/30" />
        </div>
        <Badge variant="outline" className="text-[10px]">v3.2</Badge>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <div className="surface-card p-3 sticky top-3">
            <ul className="space-y-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => setActive(s.id)}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 rounded-md text-[12px] transition-colors',
                      active === s.id ? 'bg-primary/15 text-foreground font-medium' : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground',
                    )}
                  >
                    <s.icon className="h-3.5 w-3.5" /> {s.label}
                    {active === s.id && <ChevronRight className="h-3 w-3 ml-auto" />}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-3 border-t border-border/40">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 px-2 mb-1.5">Resources</div>
              <ul className="space-y-1">
                {['Changelog', 'Roadmap', 'Status', 'Community'].map((r) => (
                  <li key={r}>
                    <a className="block px-3 py-1.5 text-[12px] text-muted-foreground hover:bg-secondary/30 rounded-md cursor-pointer">{r}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-span-9 space-y-3">
          {active === 'getting-started' && (
            <>
              <div className="surface-card p-5">
                <h2 className="text-[18px] font-semibold mb-1">Getting Started</h2>
                <p className="text-[12px] text-muted-foreground">Welcome to PharmaAIDD! These guides will help you get up and running quickly.</p>
              </div>
              {gettingStarted.map((d) => (
                <a key={d.id} className="surface-card p-4 flex items-center gap-3 hover:border-primary/40 transition-colors cursor-pointer group">
                  <div className="h-9 w-9 rounded-md gradient-primary-soft flex items-center justify-center text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold group-hover:text-primary transition-colors">{d.title}</div>
                    <div className="text-[11px] text-muted-foreground">{d.desc}</div>
                  </div>
                  <Badge variant="outline" className="text-[10px] shrink-0">{d.tag}</Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </>
          )}

          {active === 'api-docs' && (
            <>
              <div className="surface-card p-5">
                <h2 className="text-[18px] font-semibold mb-1">API Documentation</h2>
                <p className="text-[12px] text-muted-foreground">RESTful API references with examples in Python, JavaScript, and cURL.</p>
              </div>
              {apiDocs.map((d) => (
                <a key={d.id} className="surface-card p-4 flex items-center gap-3 hover:border-primary/40 transition-colors cursor-pointer group">
                  <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold group-hover:text-primary transition-colors">{d.title}</div>
                    <div className="text-[11px] text-muted-foreground">{d.desc}</div>
                  </div>
                  <Badge variant="outline" className="text-[10px] shrink-0">{d.tag}</Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </>
          )}

          {active === 'sdks' && (
            <>
              <div className="surface-card p-5">
                <h2 className="text-[18px] font-semibold mb-1">SDK Documentation</h2>
                <p className="text-[12px] text-muted-foreground">Official client libraries to integrate PharmaAIDD into your workflow.</p>
              </div>
              {sdks.map((d) => (
                <a key={d.id} className="surface-card p-4 flex items-center gap-3 hover:border-primary/40 transition-colors cursor-pointer group">
                  <div className="h-9 w-9 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <Hash className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold group-hover:text-primary transition-colors">{d.title}</div>
                    <div className="text-[11px] text-muted-foreground font-mono">{d.desc}</div>
                  </div>
                  <Badge variant="outline" className="text-[10px] shrink-0">{d.tag}</Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </>
          )}

          {active === 'tutorials' && (
            <>
              <div className="surface-card p-5">
                <h2 className="text-[18px] font-semibold mb-1">Tutorials</h2>
                <p className="text-[12px] text-muted-foreground">Step-by-step walkthroughs for common workflows.</p>
              </div>
              {['Run a virtual screening campaign', 'Set up an MD simulation pipeline', 'Build and run a custom workflow', 'Use the AI Assistant for analysis'].map((t) => (
                <a key={t} className="surface-card p-4 flex items-center gap-3 hover:border-primary/40 transition-colors cursor-pointer group">
                  <div className="h-9 w-9 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="flex-1 text-[13px] font-semibold group-hover:text-primary transition-colors">{t}</div>
                  <Badge variant="outline" className="text-[10px]">Coming soon</Badge>
                </a>
              ))}
            </>
          )}

          {active === 'reference' && (
            <>
              <div className="surface-card p-5">
                <h2 className="text-[18px] font-semibold mb-1">Reference Guides</h2>
                <p className="text-[12px] text-muted-foreground">Deep dives into specific topics and best practices.</p>
              </div>
              {['Best practices for docking validation', 'Understanding compute credit usage', 'Security and compliance', 'Data retention policies'].map((t) => (
                <a key={t} className="surface-card p-4 flex items-center gap-3 hover:border-primary/40 transition-colors cursor-pointer group">
                  <div className="h-9 w-9 rounded-md bg-secondary/60 flex items-center justify-center">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="flex-1 text-[13px] font-semibold group-hover:text-primary transition-colors">{t}</div>
                  <Badge variant="outline" className="text-[10px]">Draft</Badge>
                </a>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
