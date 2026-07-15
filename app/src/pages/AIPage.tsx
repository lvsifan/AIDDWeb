import { useState } from 'react';
import {
  Plus,
  Paperclip,
  Box,
  Send,
  ThumbsUp,
  ThumbsDown,
  Copy,
  MoreHorizontal,
  Sparkles,
  Activity,
  Zap,
  FileText,
  FlaskConical,
  GitBranch,
  Database,
  ChevronDown,
  Bell,
  HelpCircle,
  Atom,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { aiConversations } from '@/lib/data';
import { cn } from '@/lib/utils';

const quickActions = [
  { label: 'New Docking Task',  icon: FlaskConical, accent: '217 91% 60%' },
  { label: 'Upload Dataset',    icon: Database,     accent: '262 83% 58%' },
  { label: 'Build Workflow',    icon: GitBranch,    accent: '142 71% 45%' },
  { label: 'AI Assistant',      icon: Sparkles,     accent: '38 92% 50%' },
];

const examples = [
  { label: 'Analyze docking results',   icon: Activity },
  { label: 'Explain ADMET properties',  icon: FlaskConical },
  { label: 'Summarize a paper',          icon: FileText },
  { label: 'Suggest next steps',         icon: Sparkles },
  { label: 'Build a workflow',           icon: GitBranch },
  { label: 'Protein structure analysis', icon: Atom },
];

const relatedFiles = [
  { name: 'docking_results_oncolead_01.csv', size: '24 KB' },
  { name: 'compound_20_structure.sdf',      size: '12 KB' },
  { name: 'compound_15_structure.sdf',      size: '12 KB' },
];

const suggestedSteps = [
  { label: 'Run MD simulation for compound 20',           icon: Activity },
  { label: 'Evaluate ADMET properties',                   icon: FlaskConical },
  { label: 'Generate binding pose 2D interaction diagram', icon: Box },
  { label: 'Compare with top 10 similar compounds',       icon: Sparkles },
];

function MiniTrend({ color }: { color: string }) {
  // Simple up-trending line
  const points = [
    [0, 60], [10, 55], [20, 58], [30, 45], [40, 48], [50, 35],
    [60, 38], [70, 28], [80, 32], [90, 18], [100, 22],
  ];
  return (
    <svg viewBox="0 0 100 70" className="w-full h-12">
      <polyline
        points={points.map((p) => p.join(',')).join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={`0,70 ${points.map((p) => p.join(',')).join(' ')} 100,70`}
        fill={color}
        opacity="0.15"
      />
    </svg>
  );
}

function MiniBars({ color }: { color: string }) {
  const heights = [12, 18, 25, 22, 30, 28, 35, 40, 38, 45, 50, 48];
  return (
    <svg viewBox="0 0 100 60" className="w-full h-12">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 8 + 2}
          y={60 - h}
          width="6"
          height={h}
          rx="1"
          fill={color}
          opacity={0.5 + (i / heights.length) * 0.5}
        />
      ))}
    </svg>
  );
}

function MoleculeThumb({ highlight }: { highlight?: boolean }) {
  return (
    <div className={cn('relative w-full h-32 rounded-md overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a1a2e]', highlight && 'ring-2 ring-primary/40')}>
      <svg viewBox="0 0 200 130" className="w-full h-full">
        <defs>
          <radialGradient id="mini-bg" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(262 50% 30%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(262 50% 20%)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="65" rx="90" ry="55" fill="url(#mini-bg)" />
        <g stroke="hsl(0 0% 80%)" strokeWidth="1.5" fill="none" opacity="0.85">
          <line x1="60" y1="65" x2="90" y2="50" />
          <line x1="90" y1="50" x2="120" y2="65" />
          <line x1="120" y1="65" x2="150" y2="50" />
          <line x1="150" y1="50" x2="150" y2="85" />
          <line x1="150" y1="85" x2="120" y2="100" />
          <line x1="120" y1="100" x2="90" y2="85" />
          <line x1="90" y1="85" x2="60" y2="65" />
          <line x1="60" y1="65" x2="50" y2="40" />
        </g>
        <g>
          <circle cx="60" cy="65" r="6" fill="hsl(0 0% 95%)" />
          <circle cx="90" cy="50" r="6" fill="hsl(0 0% 95%)" />
          <circle cx="120" cy="65" r="6" fill="hsl(0 0% 95%)" />
          <circle cx="150" cy="50" r="6" fill="hsl(0 0% 95%)" />
          <circle cx="150" cy="85" r="6" fill="hsl(217 90% 65%)" />
          <circle cx="120" cy="100" r="6" fill="hsl(0 0% 95%)" />
          <circle cx="90" cy="85" r="6" fill="hsl(0 0% 95%)" />
          <circle cx="50" cy="40" r="5" fill="hsl(0 75% 60%)" />
        </g>
      </svg>
    </div>
  );
}

export default function AIPage() {
  const [selectedConvo, setSelectedConvo] = useState(aiConversations[0].id);

  return (
    <>
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            <span>AI Assistant</span>
            <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-primary/30 text-primary bg-primary/10">Beta</Badge>
          </span>
        }
        description="Your AI research assistant for drug discovery."
        actions={
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-border/60 bg-secondary/30 text-[12px]">
              <span className="text-muted-foreground">Model</span>
              <span className="font-medium">PharmaAIDD-LLM v2.1</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>
            <Button size="sm" className="gradient-primary text-white border-0 hover:opacity-90">
              <Plus className="h-3.5 w-3.5" /> New Chat
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-0.5 -right-0.5 h-3.5 min-w-3.5 px-1 text-[8px] flex items-center justify-center gradient-primary text-white border-0">1</Badge>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><HelpCircle className="h-4 w-4" /></Button>
          </div>
        }
      />

      <div className="grid grid-cols-12 gap-3 h-[calc(100vh-220px)] min-h-[640px]">
        {/* Left: Conversations + Examples + Quick Actions */}
        <div className="surface-card p-3 col-span-3 overflow-y-auto space-y-4">
          {/* New conversation */}
          <Button className="w-full gradient-primary text-white border-0 hover:opacity-90 justify-between">
            <span>New Conversation</span>
            <Plus className="h-4 w-4" />
          </Button>

          {/* Conversation list */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2 px-1">Today</div>
            <div className="space-y-1">
              {aiConversations.filter((c) => c.date === 'today').map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedConvo(c.id)}
                  className={cn(
                    'w-full text-left p-2 rounded-md transition-colors',
                    selectedConvo === c.id ? 'bg-primary/15 text-foreground border border-primary/20' : 'hover:bg-secondary/40',
                  )}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="text-[12px] font-medium truncate flex-1">{c.title}</div>
                    <span className="text-[9px] text-muted-foreground ml-1 shrink-0">{c.time}</span>
                  </div>
                  {selectedConvo === c.id && (
                    <div className="text-[10px] text-muted-foreground truncate">{c.preview}</div>
                  )}
                </button>
              ))}
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2 mt-3 px-1">Previous 7 Days</div>
            <div className="space-y-1">
              {aiConversations.filter((c) => c.date === 'previous').map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedConvo(c.id)}
                  className={cn(
                    'w-full text-left p-2 rounded-md transition-colors',
                    selectedConvo === c.id ? 'bg-primary/15 text-foreground border border-primary/20' : 'hover:bg-secondary/40',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[12px] truncate flex-1">{c.title}</div>
                    <span className="text-[9px] text-muted-foreground ml-1 shrink-0">{c.time}</span>
                  </div>
                </button>
              ))}
            </div>
            <button className="text-[11px] text-primary mt-2 ml-1 hover:underline">View all history →</button>
          </div>

          {/* Examples */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2 px-1">Examples</div>
            <div className="space-y-1">
              {examples.map((e) => (
                <button key={e.label} className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-secondary/40 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
                  <e.icon className="h-3.5 w-3.5" /> {e.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions + Credits */}
          <div className="space-y-2">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 px-1">Quick Actions</div>
            {quickActions.map((q) => (
              <button
                key={q.label}
                className="w-full flex items-center gap-2.5 p-2 rounded-md border border-border/40 hover:bg-secondary/30 transition-colors"
              >
                <div
                  className="h-7 w-7 rounded-md flex items-center justify-center"
                  style={{ background: `hsl(${q.accent} / 0.15)`, color: `hsl(${q.accent})` }}
                >
                  <q.icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-[12px] font-medium">{q.label}</span>
              </button>
            ))}
          </div>

          <div className="p-3 rounded-md gradient-primary-soft border border-primary/20">
            <div className="text-[10px] text-muted-foreground">Credits</div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[18px] font-semibold gradient-text">8,420</span>
              <span className="text-[10px] text-muted-foreground">expires on Jun 1, 2025</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full gradient-primary" style={{ width: '42%' }} />
            </div>
            <div className="text-[9px] text-muted-foreground mt-0.5">42% used</div>
          </div>
        </div>

        {/* Center: Chat thread */}
        <div className="surface-card col-span-6 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* User message */}
            <div className="flex justify-end gap-2.5">
              <div className="max-w-[80%]">
                <div className="px-4 py-2.5 rounded-2xl rounded-tr-sm gradient-primary text-white text-[13px]">
                  Analyze the docking results of compound 20 from project OncoLead_01. Why does it have a better binding affinity than compound 15?
                </div>
                <div className="text-[10px] text-muted-foreground text-right mt-1">10:24 AM</div>
              </div>
              <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-white text-[11px] font-semibold shrink-0">AK</div>
            </div>

            {/* AI response */}
            <div className="flex gap-2.5">
              <div className="h-8 w-8 rounded-md gradient-primary flex items-center justify-center text-white shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1 max-w-[90%]">
                <div className="text-[13px] leading-relaxed text-foreground/90 space-y-2.5">
                  <p>I've analyzed the results of compound 20 and compound 15 from project OncoLead_01. Here's a detailed comparison and analysis.</p>

                  <h4 className="text-[14px] font-semibold text-foreground mt-3">1. Binding Affinity Comparison</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[12px] my-2 surface-card">
                      <thead>
                        <tr className="border-b border-border/60 text-[10px] uppercase tracking-wider text-muted-foreground/70">
                          <th className="text-left font-medium py-2 pl-3">Compound</th>
                          <th className="text-left font-medium py-2">Binding Affinity (kcal/mol)</th>
                          <th className="text-left font-medium py-2">ΔG (kcal/mol)</th>
                          <th className="text-left font-medium py-2">Ki (nM)</th>
                          <th className="text-left font-medium py-2 pr-3">Rank</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/40 text-primary">
                          <td className="py-2 pl-3 font-medium">Compound 20</td>
                          <td className="py-2 font-mono">-9.2</td>
                          <td className="py-2 font-mono">-9.1</td>
                          <td className="py-2 font-mono">18.7</td>
                          <td className="py-2 pr-3 font-bold">1</td>
                        </tr>
                        <tr>
                          <td className="py-2 pl-3 font-medium">Compound 15</td>
                          <td className="py-2 font-mono">-7.6</td>
                          <td className="py-2 font-mono">-7.5</td>
                          <td className="py-2 font-mono">85.3</td>
                          <td className="py-2 pr-3 font-bold">4</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="text-[14px] font-semibold text-foreground mt-3">2. Key Interaction Differences</h4>
                  <ul className="space-y-1 list-disc pl-5">
                    <li><strong>Compound 20</strong> forms 3 hydrogen bonds with key residues (GLU205, ASP102, SER201), while compound 15 forms only 1.</li>
                    <li><strong>Compound 20</strong> has additional π-π stacking interaction with PHE200.</li>
                    <li>Better hydrophobic complementarity in the binding pocket.</li>
                    <li>Lower desolvation penalty for compound 20.</li>
                  </ul>

                  <h4 className="text-[14px] font-semibold text-foreground mt-3">3. Visualization</h4>
                  <div className="grid grid-cols-2 gap-3 my-2">
                    <div>
                      <MoleculeThumb highlight />
                      <div className="text-[10px] text-center text-muted-foreground mt-1">Compound 20 (Binding Affinity: -9.2 kcal/mol)</div>
                    </div>
                    <div>
                      <MoleculeThumb />
                      <div className="text-[10px] text-center text-muted-foreground mt-1">Compound 15 (Binding Affinity: -7.6 kcal/mol)</div>
                    </div>
                  </div>
                  <p>These factors contribute to the stronger binding affinity of compound 20 compared to compound 15.</p>
                </div>

                <div className="flex items-center gap-1 mt-3">
                  <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6"><ThumbsUp className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6"><ThumbsDown className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal className="h-3 w-3" /></Button>
                </div>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-border/60 p-3 bg-background/30">
            <div className="flex items-center gap-2 mb-2 text-[11px] text-muted-foreground">
              <Button variant="ghost" size="sm" className="h-7"><Paperclip className="h-3 w-3" /> Attach File</Button>
              <Button variant="ghost" size="sm" className="h-7"><Box className="h-3 w-3" /> Add Context</Button>
              <Button variant="ghost" size="sm" className="h-7"><Zap className="h-3 w-3" /> Tools</Button>
            </div>
            <div className="flex items-end gap-2">
              <textarea
                placeholder="Ask anything about your data, results, or workflows..."
                rows={1}
                className="flex-1 px-3 py-2.5 bg-secondary/30 border border-border/60 rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none max-h-32"
              />
              <Button size="icon" className="h-10 w-10 gradient-primary text-white border-0 hover:opacity-90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-[10px] text-muted-foreground text-center mt-2">
              PharmaAIDD AI can make mistakes. Verify important information. <a className="text-primary hover:underline" href="#">Learn more</a>
            </div>
          </div>
        </div>

        {/* Right: Context + Files + Insights + Next Steps */}
        <div className="col-span-3 space-y-3 overflow-y-auto">
          {/* Context */}
          <div className="surface-card p-3.5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[12px] font-semibold">Context</h3>
              <a className="text-[10px] text-primary hover:underline cursor-pointer">View All</a>
            </div>
            <p className="text-[10px] text-muted-foreground mb-2">Auto-detected from your message</p>
            <div className="space-y-1.5">
              {[
                { label: 'Project',  value: 'OncoLead_01',           icon: FileText,  accent: '217 91% 60%' },
                { label: 'Results',  value: 'Docking_Batch_0427',    icon: Box,       accent: '262 83% 58%' },
                { label: 'Compounds',value: 'Compound 20, Compound 15', icon: FlaskConical, accent: '38 92% 50%' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-2 p-1.5 rounded-md hover:bg-secondary/30">
                  <div className="h-6 w-6 rounded flex items-center justify-center" style={{ background: `hsl(${c.accent} / 0.15)`, color: `hsl(${c.accent})` }}>
                    <c.icon className="h-3 w-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] text-muted-foreground">{c.label}</div>
                    <div className="text-[11px] font-medium truncate">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Files */}
          <div className="surface-card p-3.5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[12px] font-semibold">Related Files</h3>
              <a className="text-[10px] text-primary hover:underline cursor-pointer">3 files</a>
            </div>
            <div className="space-y-1.5">
              {relatedFiles.map((f) => (
                <div key={f.name} className="flex items-center gap-2 p-1.5 rounded-md hover:bg-secondary/30 cursor-pointer">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-medium truncate">{f.name}</div>
                    <div className="text-[9px] text-muted-foreground">{f.size}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="surface-card p-3.5">
            <h3 className="text-[12px] font-semibold mb-1">AI Insights</h3>
            <p className="text-[10px] text-muted-foreground mb-2">Generated insights for this analysis</p>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="rounded-md bg-secondary/30 p-2">
                <div className="text-[9px] text-muted-foreground leading-tight">Binding Affinity Improvement</div>
                <div className="text-[16px] font-semibold gradient-text my-1">21.1%</div>
                <div className="text-[8px] text-muted-foreground">vs Compound 15</div>
                <MiniTrend color="hsl(142 71% 55%)" />
              </div>
              <div className="rounded-md bg-secondary/30 p-2">
                <div className="text-[9px] text-muted-foreground leading-tight">Hydrogen Bonds (Compound 20)</div>
                <div className="text-[16px] font-semibold text-primary my-1">3</div>
                <div className="text-[8px] text-muted-foreground">vs 1</div>
                <MiniBars color="hsl(217 91% 60%)" />
              </div>
              <div className="rounded-md bg-secondary/30 p-2">
                <div className="text-[9px] text-muted-foreground leading-tight">Estimated Ki (Compound 20)</div>
                <div className="text-[16px] font-semibold text-emerald-400 my-1">18.7 nM</div>
                <div className="text-[8px] text-muted-foreground">vs 85.3 nM</div>
                <MiniTrend color="hsl(190 90% 50%)" />
              </div>
            </div>
          </div>

          {/* Suggested Next Steps */}
          <div className="surface-card p-3.5">
            <h3 className="text-[12px] font-semibold mb-2">Suggested Next Steps</h3>
            <div className="space-y-1">
              {suggestedSteps.map((s, i) => (
                <button key={i} className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-secondary/30 text-[12px] text-foreground/80 hover:text-foreground transition-colors">
                  <s.icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="flex-1 text-left truncate">{s.label}</span>
                  <span className="text-muted-foreground">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div className="surface-card p-3.5">
            <h3 className="text-[12px] font-semibold mb-1">Feedback</h3>
            <p className="text-[10px] text-muted-foreground mb-2">Is this response helpful?</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex-1 h-7 text-[11px]">
                <ThumbsUp className="h-3 w-3" /> Yes
              </Button>
              <Button variant="outline" size="sm" className="flex-1 h-7 text-[11px]">
                <ThumbsDown className="h-3 w-3" /> No
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
