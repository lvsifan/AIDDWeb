import { useRef, useState, useEffect } from 'react';
import {
  Save,
  Check,
  Play,
  Download,
  Search,
  Plus,
  MoreVertical,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  ChevronDown,
  Settings2,
  Sparkles,
  Cpu,
  Layers,
  GitBranch,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { workflowNodeLibrary } from '@/lib/data';
import { cn } from '@/lib/utils';

type NodeId = string;

type PositionedNode = {
  id: string;
  type: 'input' | 'process' | 'analysis' | 'output';
  label: string;
  status: 'Ready' | 'Configured' | 'Error' | 'Idle';
  icon: string;
  x: number;
  y: number;
};

type Connection = {
  from: NodeId;
  to: NodeId;
};

const initialNodes: PositionedNode[] = [
  { id: 'n1', type: 'input',   label: 'Load Protein',  status: 'Ready',      icon: 'P', x: 80,  y: 80  },
  { id: 'n2', type: 'input',   label: 'Load Ligand',   status: 'Ready',      icon: 'L', x: 80,  y: 230 },
  { id: 'n3', type: 'process', label: 'Minimization',  status: 'Configured', icon: 'M', x: 280, y: 130 },
  { id: 'n4', type: 'process', label: 'Docking',       status: 'Ready',      icon: 'D', x: 480, y: 80  },
  { id: 'n5', type: 'process', label: 'MD Setup',      status: 'Configured', icon: 'S', x: 480, y: 240 },
  { id: 'n6', type: 'analysis',label: 'Binding Affinity', status: 'Ready',   icon: 'B', x: 680, y: 80  },
  { id: 'n7', type: 'analysis',label: 'ADMET (Other)', status: 'Ready',      icon: 'A', x: 880, y: 80  },
  { id: 'n8', type: 'output',  label: 'Export Results',status: 'Ready',      icon: 'E', x: 1080,y: 80  },
  { id: 'n9', type: 'analysis',label: 'QSAR Model',    status: 'Ready',      icon: 'Q', x: 880, y: 240 },
  { id: 'n10',type: 'output',  label: 'Generate Report',status: 'Ready',     icon: 'R', x: 1080,y: 240 },
];

const initialConnections: Connection[] = [
  { from: 'n1', to: 'n3' },
  { from: 'n2', to: 'n3' },
  { from: 'n3', to: 'n4' },
  { from: 'n4', to: 'n6' },
  { from: 'n6', to: 'n7' },
  { from: 'n7', to: 'n8' },
  { from: 'n4', to: 'n5' },
  { from: 'n5', to: 'n9' },
  { from: 'n9', to: 'n10' },
];

const typeColor: Record<string, string> = {
  input:    'hsl(217 91% 60%)',
  process:  'hsl(142 71% 45%)',
  analysis: 'hsl(38 92% 50%)',
  output:   'hsl(262 83% 58%)',
};

function WorkflowNode({ node, selected, onMouseDown }: {
  node: PositionedNode;
  selected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}) {
  const color = typeColor[node.type];
  return (
    <div
      onMouseDown={onMouseDown}
      className={cn(
        'absolute select-none rounded-lg border bg-card shadow-md cursor-grab active:cursor-grabbing',
        'w-[180px] p-2.5',
        selected ? 'border-primary ring-2 ring-primary/40 shadow-lg' : 'border-border/60',
      )}
      style={{ left: node.x, top: node.y, borderLeft: `3px solid ${color}` }}
    >
      <div className="flex items-center gap-2 mb-1">
        <div
          className="h-7 w-7 rounded-md flex items-center justify-center text-white text-[11px] font-semibold"
          style={{ background: color }}
        >
          {node.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-semibold truncate">{node.label}</div>
          <div className="text-[10px] text-muted-foreground flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: node.status === 'Configured' ? 'hsl(142 71% 45%)' : 'hsl(38 92% 50%)' }} />
            {node.status}
          </div>
        </div>
        <MoreVertical className="h-3.5 w-3.5 text-muted-foreground/60" />
      </div>
    </div>
  );
}

function Connector({ from, to, nodes }: { from: NodeId; to: NodeId; nodes: PositionedNode[] }) {
  const a = nodes.find((n) => n.id === from);
  const b = nodes.find((n) => n.id === to);
  if (!a || !b) return null;
  const x1 = a.x + 180;
  const y1 = a.y + 24;
  const x2 = b.x;
  const y2 = b.y + 24;
  const dx = Math.max(40, (x2 - x1) / 2);
  return (
    <path
      d={`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`}
      fill="none"
      stroke="hsl(217 91% 60%)"
      strokeWidth="1.8"
      strokeLinecap="round"
      markerEnd="url(#arrow)"
      className="pointer-events-none"
    />
  );
}

const propertySections = [
  {
    id: 'general',
    title: 'General',
    icon: Settings2,
    fields: [
      { label: 'Node ID', value: 'docking-node-1' },
      { label: 'Type', value: 'Docking' },
    ],
  },
  {
    id: 'parameters',
    title: 'Parameters',
    icon: Cpu,
    fields: [
      { label: 'Search Algorithm', value: 'Genetic Algorithm' },
      { label: 'Exhaustiveness', value: 16 },
      { label: 'Number of Modes', value: 10 },
      { label: 'Energy Range (kcal/mol)', value: 3 },
      { label: 'Grid Box Size (Å)', value: '20.0 × 20.0 × 20.0' },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced Options',
    icon: Layers,
    fields: [
      { label: 'CPU Cores', value: 8 },
      { label: 'GPU Acceleration', value: 'Enabled' },
      { label: 'Memory Limit (GB)', value: 32 },
    ],
  },
];

export default function WorkflowsPage() {
  const [nodes, setNodes] = useState<PositionedNode[]>(initialNodes);
  const [selectedId, setSelectedId] = useState<string>('n4');
  const [zoom, setZoom] = useState(0.85);
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedId(id);
    const node = nodes.find((n) => n.id === id);
    if (!node || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    dragRef.current = {
      id,
      offsetX: (e.clientX - rect.left) / zoom - node.x,
      offsetY: (e.clientY - rect.top) / zoom - node.y,
    };
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom - dragRef.current.offsetX;
      const y = (e.clientY - rect.top) / zoom - dragRef.current.offsetY;
      setNodes((prev) => prev.map((n) => (n.id === dragRef.current!.id ? { ...n, x, y } : n)));
    };
    const onUp = () => { dragRef.current = null; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [zoom]);

  const selected = nodes.find((n) => n.id === selectedId);

  return (
    <>
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            <span>Workflow Orchestration</span>
            <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-primary/30 text-primary bg-primary/10 gap-1">
              <GitBranch className="h-2.5 w-2.5" /> ADMET_Screening_Pipeline_v3
            </Badge>
            <Badge variant="outline" className="text-[10px] px-2 py-0.5 text-muted-foreground">
              v3.2.1
            </Badge>
          </span>
        }
        description="Design and manage your drug discovery pipelines."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Plus className="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" size="sm">
              <Save className="h-3.5 w-3.5" /> Save
            </Button>
            <Button variant="outline" size="sm">
              <Check className="h-3.5 w-3.5" /> Validate
            </Button>
            <Button size="sm" className="gradient-primary text-white border-0 hover:opacity-90">
              <Play className="h-3.5 w-3.5" /> Run
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-12 gap-3 h-[calc(100vh-220px)] min-h-[560px]">
        {/* Left: Node library */}
        <div className="surface-card p-3 col-span-3 overflow-y-auto">
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="pl-8 h-8 text-[12px] bg-secondary/30"
            />
          </div>
          {(['input', 'process', 'analysis', 'output'] as const).map((cat) => (
            <div key={cat} className="mb-3">
              <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/70 px-2 py-1">
                {cat === 'input' ? 'Input' : cat === 'process' ? 'Processing' : cat === 'analysis' ? 'Analysis' : 'Output'}
              </div>
              <div className="space-y-1">
                {workflowNodeLibrary[cat].map((n) => {
                  if (search && !n.label.toLowerCase().includes(search.toLowerCase())) return null;
                  return (
                    <div
                      key={n.id}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary/40 cursor-grab border border-transparent hover:border-border/40 transition-colors"
                      draggable
                    >
                      <div
                        className="h-6 w-6 rounded flex items-center justify-center text-white text-[10px] font-semibold"
                        style={{ background: typeColor[cat] }}
                      >
                        {n.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-medium truncate">{n.label}</div>
                      </div>
                      <MoreVertical className="h-3 w-3 text-muted-foreground/40" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Center: Canvas */}
        <div className="surface-card col-span-6 p-0 overflow-hidden relative">
          <div
            ref={canvasRef}
            className="relative w-full h-full overflow-auto bg-[radial-gradient(circle,hsl(var(--border))_1px,transparent_1px)] [background-size:18px_18px]"
            style={{ background: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px) 0 0 / 20px 20px, hsl(var(--card))' }}
          >
            <svg className="absolute inset-0 w-[2400px] h-[1800px] pointer-events-none" style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(217 91% 60%)" />
                </marker>
              </defs>
              {initialConnections.map((c, i) => (
                <Connector key={i} from={c.from} to={c.to} nodes={nodes} />
              ))}
            </svg>
            <div style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}>
              {nodes.map((n) => (
                <WorkflowNode
                  key={n.id}
                  node={n}
                  selected={n.id === selectedId}
                  onMouseDown={handleMouseDown(n.id)}
                />
              ))}
            </div>

            {/* Empty slot to drop a new node */}
            <div
              className="absolute w-[180px] h-[60px] rounded-lg border-2 border-dashed border-border/60 bg-secondary/20 flex items-center justify-center text-muted-foreground/40"
              style={{ left: 280, top: 290, transform: `scale(${zoom})`, transformOrigin: '0 0' }}
            >
              <Plus className="h-5 w-5" />
            </div>
          </div>

          {/* Canvas controls */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 surface-card p-1">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setZoom((z) => Math.min(2, z + 0.1))}><ZoomIn className="h-3 w-3" /></Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setZoom((z) => Math.max(0.3, z - 0.1))}><ZoomOut className="h-3 w-3" /></Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setZoom(1)}><Maximize2 className="h-3 w-3" /></Button>
            <div className="text-[10px] font-mono px-2 text-muted-foreground">{Math.round(zoom * 100)}%</div>
          </div>
        </div>

        {/* Right: Node properties */}
        <div className="surface-card p-3 col-span-3 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[12px] font-semibold">Node Properties</h3>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>

          {selected && (
            <div className="flex items-center gap-2 p-2.5 rounded-md gradient-primary-soft border border-primary/20 mb-4">
              <div
                className="h-9 w-9 rounded-md flex items-center justify-center text-white text-[12px] font-semibold"
                style={{ background: typeColor[selected.type] }}
              >
                {selected.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold truncate">{selected.label}</div>
                <div className="text-[10px] text-muted-foreground capitalize">{selected.type}</div>
              </div>
              <Badge variant="outline" className="text-[9px] border-emerald-500/30 text-emerald-400 bg-emerald-500/10">Ready</Badge>
            </div>
          )}

          {propertySections.map((sec) => {
            const isCollapsed = collapsed[sec.id];
            return (
              <div key={sec.id} className="mb-3 border border-border/40 rounded-md">
                <button
                  onClick={() => setCollapsed({ ...collapsed, [sec.id]: !isCollapsed })}
                  className="w-full flex items-center gap-2 px-2.5 py-2 text-[11px] font-semibold"
                >
                  <sec.icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="flex-1 text-left">{sec.title}</span>
                  <ChevronDown className={cn('h-3.5 w-3.5 text-muted-foreground transition-transform', isCollapsed && '-rotate-90')} />
                </button>
                {!isCollapsed && (
                  <div className="px-2.5 pb-2.5 space-y-2">
                    <div className="text-[10px] text-muted-foreground/80 mb-1">
                      {sec.id === 'general' && 'Basic information about the node'}
                      {sec.id === 'parameters' && 'Configure the docking algorithm and search parameters'}
                      {sec.id === 'advanced' && 'Resource allocation and runtime options'}
                    </div>
                    {sec.fields.map((f) => (
                      <div key={f.label}>
                        <label className="text-[10px] text-muted-foreground">{f.label}</label>
                        <Input
                          defaultValue={String(f.value)}
                          className="h-7 mt-1 text-[11px] bg-secondary/30"
                        />
                      </div>
                    ))}
                    {sec.id === 'parameters' && (
                      <Button size="sm" variant="outline" className="w-full text-[11px] mt-2">
                        <Sparkles className="h-3 w-3" /> Auto-optimize
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
