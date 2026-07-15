// Mock data for the PharmaAIDD platform

// ============================================================
// USERS
// ============================================================
export type User = {
  id: string;
  fullName: string;
  department: string;
  apiKeyStatus: 'Active' | 'Pending' | 'Suspended';
  role: 'Admin' | 'User' | 'Researcher';
  email: string;
  avatarColor: string;
  joined: string;
};

export const users: User[] = [
  { id: 'EMP-10001', fullName: 'Alex Smith',      department: 'Computational Chemistry', apiKeyStatus: 'Active',    role: 'Admin',      email: 'alex.smith@pharmaaidd.com',     avatarColor: '217 91% 60%', joined: '2022-04-12' },
  { id: 'EMP-10002', fullName: 'Priya Patel',     department: 'Data Science',             apiKeyStatus: 'Active',    role: 'User',       email: 'priya.patel@pharmaaidd.com',    avatarColor: '262 83% 58%', joined: '2023-01-08' },
  { id: 'EMP-10003', fullName: 'Michael Johnson', department: 'Machine Learning',         apiKeyStatus: 'Active',    role: 'User',       email: 'michael.j@pharmaaidd.com',      avatarColor: '142 71% 45%', joined: '2022-09-22' },
  { id: 'EMP-10004', fullName: 'Sophie Chen',     department: 'Computational Chemistry', apiKeyStatus: 'Active',    role: 'User',       email: 'sophie.chen@pharmaaidd.com',    avatarColor: '38 92% 50%',  joined: '2023-03-15' },
  { id: 'EMP-10005', fullName: 'David Kim',       department: 'Bioinformatics',           apiKeyStatus: 'Active',    role: 'User',       email: 'david.kim@pharmaaidd.com',      avatarColor: '0 72% 51%',   joined: '2022-11-30' },
  { id: 'EMP-10006', fullName: 'Emma Wilson',     department: 'Research & Development',   apiKeyStatus: 'Active',    role: 'Admin',      email: 'emma.wilson@pharmaaidd.com',    avatarColor: '190 90% 50%', joined: '2021-06-04' },
  { id: 'EMP-10007', fullName: 'James Rodriguez', department: 'Cheminformatics',          apiKeyStatus: 'Active',    role: 'User',       email: 'james.r@pharmaaidd.com',        avatarColor: '320 80% 60%', joined: '2023-07-19' },
  { id: 'EMP-10008', fullName: 'Li Wei',          department: 'Computational Chemistry', apiKeyStatus: 'Pending',   role: 'User',       email: 'li.wei@pharmaaidd.com',         avatarColor: '262 83% 70%', joined: '2024-02-11' },
  { id: 'EMP-10009', fullName: 'Aisha Khan',      department: 'Data Science',             apiKeyStatus: 'Active',    role: 'Researcher', email: 'aisha.khan@pharmaaidd.com',     avatarColor: '174 72% 56%', joined: '2022-08-14' },
  { id: 'EMP-10010', fullName: 'Yuki Tanaka',     department: 'Bioinformatics',           apiKeyStatus: 'Active',    role: 'Researcher', email: 'yuki.tanaka@pharmaaidd.com',    avatarColor: '340 82% 60%', joined: '2023-11-02' },
  { id: 'EMP-10011', fullName: 'Carlos Mendez',   department: 'Cheminformatics',          apiKeyStatus: 'Active',    role: 'User',       email: 'carlos.m@pharmaaidd.com',       avatarColor: '12 80% 60%',  joined: '2024-01-25' },
  { id: 'EMP-10012', fullName: 'Rachel Goldberg', department: 'Research & Development',   apiKeyStatus: 'Active',    role: 'User',       email: 'rachel.g@pharmaaidd.com',       avatarColor: '220 75% 65%', joined: '2023-05-18' },
  { id: 'EMP-10013', fullName: 'Tom Anderson',    department: 'Machine Learning',         apiKeyStatus: 'Suspended', role: 'User',       email: 'tom.a@pharmaaidd.com',          avatarColor: '90 60% 55%',  joined: '2022-03-09' },
  { id: 'EMP-10014', fullName: 'Anna Petrov',     department: 'Computational Chemistry', apiKeyStatus: 'Active',    role: 'Researcher', email: 'anna.p@pharmaaidd.com',         avatarColor: '300 70% 60%', joined: '2023-09-12' },
  { id: 'EMP-10015', fullName: 'Liam Foster',     department: 'Bioinformatics',           apiKeyStatus: 'Pending',   role: 'User',       email: 'liam.f@pharmaaidd.com',         avatarColor: '50 80% 55%',  joined: '2024-04-30' },
];

// ============================================================
// TOOLS
// ============================================================
export type Tool = {
  id: string;
  name: string;
  version: string;
  description: string;
  category: string;
  type: 'Software' | 'Web App' | 'Pipeline';
  status: 'Available' | 'Request Access' | 'Beta';
  installStatus: 'Install' | 'Modeling' | 'Dynamics' | 'ML Models' | 'Cheminformatics' | 'Active';
  iconBg: string;
  iconChar: string;
  popular?: boolean;
};

export const tools: Tool[] = [
  { id: 'autodock-vina',  name: 'AutoDock Vina',     version: 'v1.2.5',   description: 'Molecular docking for predicting ligand-receptor binding modes.', category: 'Docking',           type: 'Software', status: 'Available',     installStatus: 'Install',         iconBg: '217 91% 60%',  iconChar: '🔗', popular: true },
  { id: 'gromacs',        name: 'GROMACS',           version: 'v2023.4',  description: 'Molecular dynamics simulation package for biomolecules.',         category: 'Molecular Dynamics', type: 'Software', status: 'Available',     installStatus: 'Dynamics',        iconBg: '262 83% 58%',  iconChar: '🧬', popular: true },
  { id: 'schrodinger',    name: 'Schrödinger Suite', version: 'v2024-1',  description: 'Comprehensive suite for modeling and simulation.',                category: 'Quantum Chemistry',  type: 'Software', status: 'Request Access', installStatus: 'Modeling',        iconBg: '38 92% 50%',   iconChar: 'S',  popular: true },
  { id: 'moe',            name: 'MOE',               version: 'v2023.08', description: 'Drug discovery platform for molecular modeling and design.',     category: 'Pharmacology',      type: 'Software', status: 'Request Access', installStatus: 'Modeling',        iconBg: '142 71% 45%',  iconChar: '🐁', popular: true },
  { id: 'deepchem',       name: 'DeepChem',          version: 'v2.7.1',   description: 'Deep learning models for drug discovery and chemistry.',         category: 'ADMET',             type: 'Web App',  status: 'Available',     installStatus: 'ML Models',       iconBg: '190 90% 50%',  iconChar: '🧪' },
  { id: 'swissadme',      name: 'SwissADME',         version: 'v1.1.1',   description: 'ADME prediction for drug-likeness evaluation.',                  category: 'ADMET',             type: 'Web App',  status: 'Available',     installStatus: 'Active',          iconBg: '0 72% 51%',    iconChar: '☁️' },
  { id: 'amber',          name: 'AMBER',             version: 'v22.0',    description: 'Assisted Model Building with Energy Refinement.',                 category: 'Molecular Dynamics', type: 'Software', status: 'Available',     installStatus: 'Dynamics',        iconBg: '38 92% 60%',   iconChar: 'A'  },
  { id: 'rdkit',          name: 'RDKit',             version: 'v2023.09.1', description: 'Open-source cheminformatics and machine learning package.',    category: 'Cheminformatics',   type: 'Software', status: 'Available',     installStatus: 'Cheminformatics', iconBg: '262 83% 70%',  iconChar: '⚛️' },
];

export const toolCategories = [
  { name: 'All Tools',           count: 28 },
  { name: 'Docking',             count: 6  },
  { name: 'Molecular Dynamics',  count: 5  },
  { name: 'Quantum Chemistry',   count: 4  },
  { name: 'Pharmacology',        count: 3  },
  { name: 'ADMET',               count: 4  },
  { name: 'ML Models',           count: 3  },
  { name: 'Cheminformatics',     count: 3  },
];

// ============================================================
// JOBS
// ============================================================
export type Job = {
  id: string;
  name: string;
  user: string;
  project: string;
  status: 'Running' | 'Pending' | 'Completed' | 'Failed';
  progress: number;
  gpu: string;
  queue: string;
  eta: string;
  startTime: string;
  type: string;
  cpuUtil?: number;
};

export const jobs: Job[] = [
  { id: '#989234', name: 'Docking_Batch_0427',     user: 'aamith',  project: 'Oncology',      type: 'Docking',   status: 'Running',   progress: 72, gpu: '2 / 32', queue: 'gpu-d100', eta: '02:18:42', startTime: '10:37:21', cpuUtil: 78 },
  { id: '#989233', name: 'MD_Simulation_0427',     user: 'ekise',   project: 'CNS',           type: 'MD',         status: 'Running',   progress: 48, gpu: '8 / 64', queue: 'gpu-d100', eta: '01:07:33', startTime: '10:28:10', cpuUtil: 92 },
  { id: '#989232', name: 'Binding_Affinity_0426',  user: 'lwang',   project: 'Metabolism',    type: 'Docking',   status: 'Running',   progress: 81, gpu: '1 / 16', queue: 'gpu-v100', eta: '00:05:12', startTime: '14:55:36', cpuUtil: 65 },
  { id: '#989231', name: 'Pharmacophore_Screen',   user: 'enchen',  project: 'Infectious',    type: 'Virtual Screening', status: 'Pending', progress: 0,  gpu: '- / -',  queue: 'cpu-d100', eta: '02:14:57', startTime: '-',         cpuUtil: 0  },
  { id: '#989230', name: 'Free_Energy_MMBSA',      user: 'aamith',  project: 'Oncology',      type: 'MD',         status: 'Running',   progress: 26, gpu: '2 / 32', queue: 'gpu-d100', eta: '02:33:19', startTime: '08:45:02', cpuUtil: 54 },
  { id: '#989229', name: 'Ligand_Preparation',     user: 'rpatel',  project: 'CNS',           type: 'Prep',      status: 'Pending',   progress: 0,  gpu: '- / -',  queue: 'cpu-sh14', eta: '00:00:00', startTime: '-',         cpuUtil: 0  },
  { id: '#989228', name: 'ADMET_Property_Logp',    user: 'mjohnson',project: 'ADMET',         type: 'ADMET',      status: 'Running',   progress: 95, gpu: '1 / 8',  queue: 'gpu-d100', eta: '00:00:22', startTime: '10:23:11', cpuUtil: 88 },
  { id: '#989227', name: 'Docking_Virtual_Screen', user: 'lwang',   project: 'Metabolism',    type: 'Docking',   status: 'Running',   progress: 63, gpu: '2 / 32', queue: 'gpu-d100', eta: '00:30:44', startTime: '10:16:05', cpuUtil: 71 },
  { id: '#989226', name: 'ADMET_Predictive',       user: 'mchen',   project: 'Infectious',    type: 'ADMET',      status: 'Completed', progress: 100,gpu: '2 / 8',  queue: 'cpu-ph14', eta: '00:00:00', startTime: '10:10:05', cpuUtil: 0  },
  { id: '#989225', name: 'Trajectory_Analysis',    user: 'rpatel',  project: 'Oncology',      type: 'Analysis',  status: 'Failed',    progress: 8,  gpu: '1 / 16', queue: 'cpu-v100', eta: '00:00:00', startTime: '14:12:45', cpuUtil: 12 },
  { id: '#989224', name: 'Binding_Affinity_0425',  user: 'jli',     project: 'Inflammation',  type: 'Docking',   status: 'Completed', progress: 100,gpu: '2 / 32', queue: 'gpu-d100', eta: '00:00:00', startTime: '08:00:11', cpuUtil: 0  },
  { id: '#989223', name: 'ADMET_Screen_All',       user: 'mjohnson',project: 'ADMET',         type: 'ADMET',      status: 'Completed', progress: 100,gpu: '1 / 8',  queue: 'gpu-d100', eta: '00:00:00', startTime: '07:45:33', cpuUtil: 0  },
];

// ============================================================
// PROJECTS
// ============================================================
export type Project = {
  id: string;
  name: string;
  type: string;
  members: number;
  owner: string;
  progress: number;
  updated: string;
  status: 'Active' | 'In Progress' | 'Completed' | 'On Hold';
  shared?: boolean;
  archived?: boolean;
  mine?: boolean;
};

export const projects: Project[] = [
  { id: 'P-001', name: 'Alzheimer_Drug_Discovery', type: 'Inflammation', members: 4, owner: 'Dr. Emily Watson', progress: 78, updated: '2 days ago', status: 'In Progress', mine: true },
  { id: 'P-002', name: 'Oncology_Biomarker',       type: 'Oncology',      members: 6, owner: 'Dr. Alex Smith',   progress: 45, updated: '4 days ago', status: 'In Progress', shared: true },
  { id: 'P-003', name: 'GPCR4_Ligand_Screening',   type: 'GPCR',          members: 2, owner: 'Dr. James Rodriguez', progress: 89, updated: '6 days ago', status: 'Active' },
  { id: 'P-004', name: 'Antiviral_Compound_Library', type: 'Antiviral', members: 7, owner: 'Dr. David Kim',     progress: 60, updated: '1 day ago',  status: 'Active' },
  { id: 'P-005', name: 'Kinase_Inhibitor_Design',  type: 'Oncology',      members: 3, owner: 'Dr. Emma Wilson',   progress: 92, updated: '3 days ago', status: 'Completed', mine: true },
  { id: 'P-006', name: 'Autoimmune_Screening',     type: 'Autoimmune',    members: 5, owner: 'Dr. Anna Petrov',   progress: 30, updated: '1 week ago', status: 'In Progress', shared: true },
  { id: 'P-007', name: 'Trajectory_Analysis_0426', type: 'MD Analysis',   members: 2, owner: 'Dr. Carlos Mendez', progress: 55, updated: '2 weeks ago', status: 'Active' },
  { id: 'P-008', name: 'ChE_Lead_Optimization',   type: 'Cheminformatics', members: 3, owner: 'Dr. Yuki Tanaka',  progress: 78, updated: '5 days ago', status: 'In Progress' },
  { id: 'P-009', name: 'SARS_CoV_2_Protease',      type: 'Antiviral',     members: 6, owner: 'Dr. Sophie Chen',   progress: 100,updated: '1 month ago', status: 'Completed', archived: true },
  { id: 'P-010', name: 'Diabetes_TargetID',        type: 'Metabolic',     members: 4, owner: 'Dr. Liam Foster',   progress: 12, updated: '3 days ago', status: 'On Hold' },
];

// ============================================================
// DATASETS
// ============================================================
export type Dataset = {
  id: string;
  name: string;
  type: 'Protein' | 'Compound' | 'Custom';
  size: string;
  owner: string;
  updated: string;
  format: string;
  records: number;
};

export const datasets: Dataset[] = [
  { id: 'D-001', name: 'PDBbind_v2024',     type: 'Protein',  size: '18.7 GB',  owner: 'Alex Kim',      updated: '2026-07-10', format: 'PDB',    records: 23450 },
  { id: 'D-002', name: 'ZINC22_Subset',     type: 'Compound', size: '42.3 GB',  owner: 'Priya Patel',   updated: '2026-07-09', format: 'SDF',    records: 1420000 },
  { id: 'D-003', name: 'ChEMBL_30',         type: 'Compound', size: '8.2 GB',   owner: 'David Kim',     updated: '2026-07-08', format: 'SDF',    records: 2413668 },
  { id: 'D-004', name: 'BindingDB_All',     type: 'Compound', size: '12.4 GB',  owner: 'Sophie Chen',   updated: '2026-07-08', format: 'SDF',    records: 2803129 },
  { id: 'D-005', name: 'AlphaFold_DB',      type: 'Protein',  size: '32.4 GB',  owner: 'Aisha Khan',    updated: '2026-07-05', format: 'PDB',    records: 214000000 },
  { id: 'D-006', name: 'Enamine_Real',      type: 'Compound', size: '24.6 GB',  owner: 'Emma Wilson',   updated: '2026-07-04', format: 'SDF',    records: 33857000 },
  { id: 'D-007', name: 'Virtual_Library_01',type: 'Custom',   size: '2.1 GB',   owner: 'Yuki Tanaka',   updated: '2026-07-03', format: 'CSV',    records: 52480 },
  { id: 'D-008', name: 'Kinase_Inhibitors',  type: 'Custom',   size: '896 MB',   owner: 'Anna Petrov',   updated: '2026-07-02', format: 'SDF',    records: 14280 },
];

// ============================================================
// NOTIFICATIONS
// ============================================================
export type Notification = {
  id: string;
  type: 'Job' | 'System' | 'Security' | 'Storage' | 'Credits' | 'Team' | 'API';
  title: string;
  body: string;
  time: string;
  read: boolean;
};

export const notifications: Notification[] = [
  { id: 'N-001', type: 'Job',      title: 'Job Completed',                 body: 'Binding_Affinity_0426 has completed successfully. 5 results ready for review.',                          time: '15 min ago', read: false },
  { id: 'N-002', type: 'Security', title: 'New Login from Chrome on Mac',  body: 'A new login was detected from 192.168.1.42 (San Francisco, CA).',                                       time: '1 hour ago', read: false },
  { id: 'N-003', type: 'Storage',  title: 'Storage Quota 80%',             body: 'You have used 102 GB of your 128 GB quota. Consider archiving old datasets.',                            time: '2 hours ago', read: false },
  { id: 'N-004', type: 'Credits',  title: 'Credit Balance Low',            body: 'Your credit balance is below 20% (1,580 credits remaining). Top up to avoid job interruption.',          time: '3 hours ago', read: true  },
  { id: 'N-005', type: 'Team',     title: 'New Member Invited',            body: 'Yuki Tanaka accepted your invitation to join Oncology_Biomarker project.',                              time: '5 hours ago', read: true  },
  { id: 'N-006', type: 'API',      title: 'API Key Expiring Soon',         body: 'Your Production Key will expire in 7 days. Generate a new one to avoid service disruption.',              time: 'Yesterday',  read: true  },
  { id: 'N-007', type: 'System',   title: 'System Update',                 body: 'PharmaAIDD will undergo scheduled maintenance on July 18, 02:00-04:00 UTC. Service may be briefly interrupted.', time: '2 days ago', read: true },
];

// ============================================================
// AUDIT LOGS
// ============================================================
export type AuditLog = {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ip: string;
  details: string;
};

export const auditLogs: AuditLog[] = [
  { id: 'L-001', timestamp: '2026-07-15 12:30:15', user: 'Alex Kim',       action: 'Login',              resource: '-',                     ip: '192.168.1.100', details: 'Successful login from Chrome on macOS' },
  { id: 'L-002', timestamp: '2026-07-15 12:28:42', user: 'Alex Kim',       action: 'Job Submitted',      resource: 'Docking_Batch_0427',     ip: '192.168.1.100', details: 'Submitted to GPU queue gpu-d100' },
  { id: 'L-003', timestamp: '2026-07-15 11:05:28', user: 'Michael Johnson', action: 'API Key Created',    resource: 'API Key',                ip: '192.168.1.105', details: 'New API key created with read-write scope' },
  { id: 'L-004', timestamp: '2026-07-15 10:45:12', user: 'David Kim',      action: 'Dataset Downloaded',  resource: 'PDBbind_v2024',          ip: '192.168.1.110', details: 'Downloaded 18.7 GB' },
  { id: 'L-005', timestamp: '2026-07-15 09:32:18', user: 'Sophie Chen',    action: 'Permission Changed', resource: 'Project: OncoLead_01',   ip: '192.168.1.115', details: 'Granted Researcher role to Emma Wilson' },
  { id: 'L-006', timestamp: '2026-07-15 09:15:55', user: 'Emma Wilson',    action: 'Dataset Updated',     resource: 'ChEMBL_30',              ip: '192.168.1.120', details: 'Created new revision v1.4' },
  { id: 'L-007', timestamp: '2026-07-15 08:50:00', user: 'James Rodriguez',action: 'Credit Purchase',     resource: 'Billing',                ip: '192.168.1.130', details: 'Purchased 50,000 credits ($2,000)' },
  { id: 'L-008', timestamp: '2026-07-15 08:32:11', user: 'Anna Petrov',    action: 'Login Failed',        resource: '-',                      ip: '203.0.113.42',  details: 'Invalid credentials' },
  { id: 'L-009', timestamp: '2026-07-15 08:30:14', user: 'Anna Petrov',    action: 'Login',               resource: '-',                      ip: '192.168.1.140', details: 'Successful login from Firefox on Windows' },
  { id: 'L-010', timestamp: '2026-07-15 07:55:22', user: 'Alex Kim',       action: 'Settings Updated',    resource: 'User Settings',          ip: '192.168.1.100', details: 'Updated notification preferences' },
];

// ============================================================
// GPU CLUSTER NODES
// ============================================================
export type GPUNode = {
  id: string;
  host: string;
  gpu: string;
  cpu: number;     // %
  util: number;    // %
  mem: number;     // %
  temp: number;    // °C
  power: number;   // W
  jobs: number;
  status: 'Healthy' | 'Warning' | 'Down';
};

export const gpuNodes: GPUNode[] = [
  { id: 'gpu-node-01', host: 'hpc-001', gpu: 'A100',  cpu: 78, util: 78, mem: 45, temp: 65, power: 280, jobs: 4, status: 'Healthy' },
  { id: 'gpu-node-02', host: 'hpc-001', gpu: 'A100',  cpu: 32, util: 45, mem: 78, temp: 52, power: 220, jobs: 6, status: 'Healthy' },
  { id: 'gpu-node-03', host: 'hpc-002', gpu: 'A100',  cpu: 91, util: 91, mem: 62, temp: 72, power: 350, jobs: 2, status: 'Healthy' },
  { id: 'gpu-node-04', host: 'hpc-002', gpu: 'H100',  cpu: 56, util: 56, mem: 88, temp: 68, power: 410, jobs: 3, status: 'Healthy' },
  { id: 'gpu-node-05', host: 'hpc-003', gpu: 'H100',  cpu: 100,util: 100,mem: 94, temp: 82, power: 620, jobs: 8, status: 'Warning' },
  { id: 'gpu-node-06', host: 'hpc-003', gpu: 'H100',  cpu: 23, util: 23, mem: 35, temp: 41, power: 150, jobs: 1, status: 'Healthy' },
  { id: 'gpu-node-07', host: 'hpc-004', gpu: 'V100',  cpu: 67, util: 67, mem: 52, temp: 58, power: 240, jobs: 5, status: 'Healthy' },
  { id: 'gpu-node-08', host: 'hpc-004', gpu: 'V100',  cpu: 0,  util: 0,  mem: 0,  temp: 28, power: 12,  jobs: 0, status: 'Down'    },
  { id: 'gpu-node-09', host: 'hpc-005', gpu: 'A100',  cpu: 89, util: 89, mem: 71, temp: 71, power: 380, jobs: 7, status: 'Healthy' },
  { id: 'gpu-node-10', host: 'hpc-005', gpu: 'A100',  cpu: 12, util: 12, mem: 8,  temp: 32, power: 80,  jobs: 0, status: 'Healthy' },
];

// ============================================================
// REPORTS
// ============================================================
export type Report = {
  id: string;
  title: string;
  type: string;
  project: string;
  relatedTo: string;
  createdBy: string;
  createdAt: string;
  status: 'Draft' | 'Completed' | 'Running';
};

export const reports: Report[] = [
  { id: 'R-001', title: 'Docking_Summary_Report.pdf',    type: 'Docking', relatedTo: 'Docking_Batch_0427',     project: 'Oncology',      createdBy: 'Alex Kim',       createdAt: '2026-07-14 14:30', status: 'Completed' },
  { id: 'R-002', title: 'ADMET_Report_v3.pdf',           type: 'ADMET',   relatedTo: 'ADMET_Predictive_v3',     project: 'ADMET',          createdBy: 'Emma Wilson',    createdAt: '2026-07-14 11:00', status: 'Completed' },
  { id: 'R-003', title: 'MD_Simulation_Report.pdf',      type: 'MD',      relatedTo: 'MD_Simulation_0427',      project: 'CNS',            createdBy: 'Yuki Tanaka',    createdAt: '2026-07-14 08:20', status: 'Completed' },
  { id: 'R-004', title: 'Binding_Affinity_Report.pdf',   type: 'Docking', relatedTo: 'Binding_Affinity_0426',   project: 'Metabolism',     createdBy: 'Anna Petrov',    createdAt: '2026-07-13 16:45', status: 'Running'   },
  { id: 'R-005', title: 'Pharmacophore_Analysis.pdf',    type: 'Virtual Screen', relatedTo: 'Pharmacophore_Screen', project: 'Infectious',     createdBy: 'David Kim',      createdAt: '2026-07-13 09:15', status: 'Draft'     },
  { id: 'R-006', title: 'Free_Energy_Report.pdf',        type: 'MD',      relatedTo: 'Free_Energy_MMBSA',       project: 'Oncology',       createdBy: 'Sophie Chen',    createdAt: '2026-07-12 13:00', status: 'Completed' },
  { id: 'R-007', title: 'Trajectory_Analysis.pdf',       type: 'Analysis',relatedTo: 'Trajectory_Analysis_0426',project: 'Oncology',      createdBy: 'Carlos Mendez',  createdAt: '2026-07-12 10:30', status: 'Completed' },
];

// ============================================================
// API KEYS
// ============================================================
export type ApiKey = {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
  status: 'Active' | 'Pending' | 'Revoked';
};

export const apiKeys: ApiKey[] = [
  { id: 'K-001', name: 'Production Key',         key: 'pka_live_4Gc...zT9v', createdAt: '2025-05-01', lastUsed: '2 min ago',  status: 'Active'  },
  { id: 'K-002', name: 'Analysis Key',           key: 'pka_live_3Re...c8K1', createdAt: '2025-04-16', lastUsed: '1 hour ago', status: 'Active'  },
  { id: 'K-003', name: 'Dev Key',                key: 'pka_test_9Yu...m2Lp', createdAt: '2025-03-22', lastUsed: '3 days ago', status: 'Pending' },
  { id: 'K-004', name: 'Backup',                 key: 'pka_live_8Wr...4n0q', createdAt: '2025-02-11', lastUsed: '10 days ago',status: 'Active'  },
];

// ============================================================
// CREDITS USAGE (last 30 days)
// ============================================================
export const creditUsage30d = [
  320, 410, 380, 290, 250, 380, 520, 610, 480, 540, 460, 380,
  300, 450, 590, 480, 520, 440, 380, 320, 280, 410, 530, 470,
  380, 420, 480, 540, 460, 580,
];

// ============================================================
// BINDING AFFINITY ANALYSIS (Results page)
// ============================================================
export const bindingAffinity = {
  jobId: 'Docking_Batch_0427',
  ligand: 'Methylphenidate',
  smiles: 'CN(C)...CC(=O)O',
  bindingAffinity: -9.2,
  unit: 'kcal/mol',
  rmsd: 1.2,
  ligandEfficiency: 0.45,
  target: 'Dopamine Transporter (DAT)',
  totalPoses: 5,
  bestPose: 1,
};

export const rmsdSeries = [
  1.0, 1.2, 1.1, 1.3, 1.2, 1.4, 1.3, 1.2, 1.1, 1.0,
  0.9, 1.1, 1.2, 1.3, 1.2, 1.1, 1.0, 1.2, 1.3, 1.4,
];

export const interactionFingerprint = [
  { residue: 'ASP79',  type: 'H-Bond',  p1: 0.8, p2: 0.5, p3: 0.0, p4: 0.0, p5: 0.0 },
  { residue: 'TYR156', type: 'π-Stack', p1: 0.0, p2: 0.0, p3: 0.0, p4: 0.9, p5: 0.7 },
  { residue: 'PHE320', type: 'Hydrophobic', p1: 0.0, p2: 0.0, p3: 0.6, p4: 0.0, p5: 0.0 },
  { residue: 'ASP79',  type: 'Salt Br', p1: 0.0, p2: 0.9, p3: 0.0, p4: 0.0, p5: 0.0 },
  { residue: 'ALA77',  type: 'H-Bond',  p1: 0.0, p2: 0.0, p3: 0.0, p4: 0.0, p5: 0.0 },
  { residue: 'TRP84',  type: 'Hydrophobic', p1: 0.6, p2: 0.0, p3: 0.0, p4: 0.0, p5: 0.0 },
  { residue: 'SER201', type: 'H-Bond',  p1: 0.0, p2: 0.0, p3: 0.0, p4: 0.0, p5: 0.7 },
];

export const dockingPoses = [
  { id: 1, score: -9.2, rmsdLb: 1.2, interactions: 12, cluster: 45 },
  { id: 2, score: -8.7, rmsdLb: 2.3, interactions:  9, cluster: 23 },
  { id: 3, score: -8.1, rmsdLb: 3.1, interactions:  7, cluster: 15 },
  { id: 4, score: -7.6, rmsdLb: 4.2, interactions:  6, cluster: 10 },
  { id: 5, score: -7.2, rmsdLb: 5.0, interactions:  5, cluster:  7 },
];

// ============================================================
// AI ASSISTANT CONVERSATIONS
// ============================================================
export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  time: string;
};

export const aiConversations = [
  { id: 'C-1', title: 'Analyze docking results of compound 20', preview: 'Why does it have a better binding affinity than compound 15?', time: '10:24 AM', date: 'today' },
  { id: 'C-2', title: 'Explain ADMET prediction for ZINC_00012345',  preview: 'What are the key drug-likeness concerns?',           time: '09:15 AM', date: 'today' },
  { id: 'C-3', title: 'Suggest workflow for kinase inhibitors',     preview: 'Recommend a pipeline for hit identification',     time: 'Yesterday', date: 'previous' },
  { id: 'C-4', title: 'Compare 3 docking poses',                    preview: 'Which pose shows the strongest interaction?',     time: 'May 20',    date: 'previous' },
  { id: 'C-5', title: 'Generate pharmacophore model',               preview: 'Create a common feature hypothesis',              time: 'May 19',    date: 'previous' },
  { id: 'C-6', title: 'Summarize MD simulation trajectory',         preview: 'Key conformational changes during simulation',  time: 'May 18',    date: 'previous' },
  { id: 'C-7', title: 'Interpret binding affinity trends',          preview: 'Trends across compound series',                   time: 'May 17',    date: 'previous' },
];

export const aiQuickActions = [
  { label: 'New Docking Task',  icon: 'Docking' },
  { label: 'Upload Dataset',    icon: 'Upload'  },
  { label: 'Build Workflow',    icon: 'Workflow' },
  { label: 'AI Assistant',      icon: 'Sparkle' },
];

// ============================================================
// ADMIN DASHBOARD STATS
// ============================================================
export const adminStats = {
  totalUsers: 128,
  activeUsers: 96,
  totalProjects: 36,
  storage: { used: 120, total: 200, unit: 'TB' },
  systemHealth: 99.9,
  activeJobs: 144,
  totalJobs: 1216,
  creditUsage: 3.07,
  creditUnit: 'M',
  dailyJobs: [124, 138, 152, 168, 142, 178, 188, 156, 162, 174, 198, 212, 234, 218, 232, 256, 248, 262, 244, 256, 272, 288, 312, 296],
  topExperiments: [
    { name: 'COVID_Main_Protease',     usage: 1240, type: 'MD' },
    { name: 'Oncology_Biomarker',      usage:  982, type: 'Docking' },
    { name: 'Alzheimer_Screening',     usage:  876, type: 'Virtual Screen' },
    { name: 'ADMET_Property_Logp',     usage:  812, type: 'ADMET' },
    { name: 'Antiviral_Library_Scan',  usage:  756, type: 'Docking' },
  ],
  topDepartments: [
    { name: 'Computational Chemistry', usage: 4520 },
    { name: 'Data Science',            usage: 3180 },
    { name: 'Bioinformatics',          usage: 2840 },
    { name: 'Cheminformatics',         usage: 1960 },
    { name: 'Research & Development',  usage: 1640 },
  ],
  licenseUsage: { used: 64, total: 100, unit: 'Seats' },
};

// ============================================================
// WORKFLOW NODES
// ============================================================
export type WorkflowNode = {
  id: string;
  type: 'input' | 'process' | 'analysis' | 'output';
  label: string;
  status: 'Ready' | 'Configured' | 'Error' | 'Idle';
  icon: string;
};

export const workflowNodeLibrary = {
  input: [
    { id: 'load-protein', type: 'input', label: 'Load Protein',  status: 'Ready', icon: 'P' },
    { id: 'load-ligand',  type: 'input', label: 'Load Ligand',   status: 'Ready', icon: 'L' },
  ],
  process: [
    { id: 'minimization', type: 'process', label: 'Minimization', status: 'Configured', icon: 'M' },
    { id: 'docking',      type: 'process', label: 'Docking',      status: 'Ready',       icon: 'D' },
    { id: 'md-setup',     type: 'process', label: 'MD Setup',     status: 'Configured', icon: 'S' },
  ],
  analysis: [
    { id: 'binding-affinity', type: 'analysis', label: 'Binding Affinity', status: 'Ready', icon: 'B' },
    { id: 'admet',            type: 'analysis', label: 'ADMET Prediction', status: 'Ready', icon: 'A' },
    { id: 'qsar',             type: 'analysis', label: 'QSAR Model',       status: 'Ready', icon: 'Q' },
  ],
  output: [
    { id: 'export-results', type: 'output', label: 'Export Results', status: 'Ready', icon: 'E' },
    { id: 'generate-report',type: 'output', label: 'Generate Report',status: 'Ready', icon: 'R' },
  ],
};
