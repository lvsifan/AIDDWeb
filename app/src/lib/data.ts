// Mock data for the PharmaAIDD platform

export type User = {
  id: string;
  fullName: string;
  department: string;
  apiKeyStatus: 'Active' | 'Pending' | 'Suspended';
  role: 'Admin' | 'User' | 'Researcher';
  email: string;
  avatarColor: string;
};

export const users: User[] = [
  { id: 'EMP-10001', fullName: 'Alex Smith',     department: 'Computational Chemistry', apiKeyStatus: 'Active',  role: 'Admin',      email: 'alex.smith@pharmaaidd.com',     avatarColor: '217 91% 60%' },
  { id: 'EMP-10002', fullName: 'Priya Patel',    department: 'Data Science',             apiKeyStatus: 'Active',  role: 'User',       email: 'priya.patel@pharmaaidd.com',    avatarColor: '262 83% 58%' },
  { id: 'EMP-10003', fullName: 'Michael Johnson',department: 'Machine Learning',         apiKeyStatus: 'Active',  role: 'User',       email: 'michael.j@pharmaaidd.com',      avatarColor: '142 71% 45%' },
  { id: 'EMP-10004', fullName: 'Sophie Chen',    department: 'Computational Chemistry', apiKeyStatus: 'Active',  role: 'User',       email: 'sophie.chen@pharmaaidd.com',    avatarColor: '38 92% 50%'  },
  { id: 'EMP-10005', fullName: 'David Kim',      department: 'Bioinformatics',           apiKeyStatus: 'Active',  role: 'User',       email: 'david.kim@pharmaaidd.com',      avatarColor: '0 72% 51%'   },
  { id: 'EMP-10006', fullName: 'Emma Wilson',    department: 'Research & Development',   apiKeyStatus: 'Active',  role: 'Admin',      email: 'emma.wilson@pharmaaidd.com',    avatarColor: '190 90% 50%'  },
  { id: 'EMP-10007', fullName: 'James Rodriguez',department: 'Cheminformatics',          apiKeyStatus: 'Active',  role: 'User',       email: 'james.r@pharmaaidd.com',        avatarColor: '320 80% 60%'  },
  { id: 'EMP-10008', fullName: 'Li Wei',         department: 'Computational Chemistry', apiKeyStatus: 'Pending', role: 'User',       email: 'li.wei@pharmaaidd.com',         avatarColor: '262 83% 70%'  },
];

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
  { id: 'autodock-vina',  name: 'AutoDock Vina',     version: 'v1.2.5', description: 'Molecular docking for predicting ligand-receptor binding modes.', category: 'Docking',           type: 'Software', status: 'Available',     installStatus: 'Install',         iconBg: '217 91% 60%',  iconChar: '🔗', popular: true },
  { id: 'gromacs',        name: 'GROMACS',           version: 'v2023.4', description: 'Molecular dynamics simulation package for biomolecules.',         category: 'Molecular Dynamics', type: 'Software', status: 'Available',     installStatus: 'Dynamics',        iconBg: '262 83% 58%',  iconChar: '🧬', popular: true },
  { id: 'schrodinger',    name: 'Schrödinger Suite', version: 'v2024-1', description: 'Comprehensive suite for modeling and simulation.',                category: 'Quantum Chemistry',  type: 'Software', status: 'Request Access', installStatus: 'Modeling',        iconBg: '38 92% 50%',   iconChar: 'S',  popular: true },
  { id: 'moe',            name: 'MOE',               version: 'v2023.08', description: 'Drug discovery platform for molecular modeling and design.',     category: 'Pharmacology',      type: 'Software', status: 'Request Access', installStatus: 'Modeling',        iconBg: '142 71% 45%',  iconChar: '🐁', popular: true },
  { id: 'deepchem',       name: 'DeepChem',          version: 'v2.7.1',  description: 'Deep learning models for drug discovery and chemistry.',         category: 'ADMET',             type: 'Web App',  status: 'Available',     installStatus: 'ML Models',       iconBg: '190 90% 50%',  iconChar: '🧪' },
  { id: 'swissadme',      name: 'SwissADME',         version: 'v1.1.1',  description: 'ADME prediction for drug-likeness evaluation.',                  category: 'ADMET',             type: 'Web App',  status: 'Available',     installStatus: 'Active',          iconBg: '0 72% 51%',    iconChar: '☁️' },
  { id: 'amber',          name: 'AMBER',             version: 'v22.0',   description: 'Assisted Model Building with Energy Refinement.',                 category: 'Molecular Dynamics', type: 'Software', status: 'Available',     installStatus: 'Dynamics',        iconBg: '38 92% 60%',   iconChar: 'A'  },
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

export type Job = {
  id: string;
  name: string;
  user: string;
  project: string;
  status: 'Running' | 'Pending' | 'Completed' | 'Failed';
  progress: number;        // 0-100
  gpu: string;             // e.g. "2 / 32"
  queue: string;           // e.g. "gpu-d100"
  eta: string;             // e.g. "02:18:42"
  startTime: string;       // HH:MM:SS
};

export const jobs: Job[] = [
  { id: '#989234', name: 'Docking_Batch_0427',     user: 'aamith', project: 'Oncology',       status: 'Running',   progress: 72, gpu: '2 / 32', queue: 'gpu-d100', eta: '02:18:42', startTime: '10:37:21' },
  { id: '#989233', name: 'MD_Simulation_0427',    user: 'ekise',  project: 'CNS',            status: 'Running',   progress: 48, gpu: '8 / 64', queue: 'gpu-d100', eta: '01:07:33', startTime: '10:28:10' },
  { id: '#989232', name: 'Binding_Affinity_0426', user: 'lwang',  project: 'Metabolism',     status: 'Running',   progress: 81, gpu: '1 / 16', queue: 'gpu-v100', eta: '00:05:12', startTime: '14:55:36' },
  { id: '#989231', name: 'Pharmacophore_Screen',  user: 'enchen', project: 'Infectious',     status: 'Running',   progress: 0,  gpu: '- / -',  queue: 'cpu-d100', eta: '02:14:57', startTime: '-'         },
  { id: '#989230', name: 'Free_Energy_MMBSA',     user: 'aamith', project: 'Oncology',       status: 'Running',   progress: 26, gpu: '2 / 32', queue: 'gpu-d100', eta: '02:33:19', startTime: '08:45:02' },
  { id: '#989229', name: 'Ligand_Preparation',    user: 'rpatel', project: 'CNS',            status: 'Pending',   progress: 0,  gpu: '- / -',  queue: 'cpu-sh14', eta: '00:00:00', startTime: '-'         },
  { id: '#989228', name: 'ADMET_Property_Logp',   user: 'mjohnson', project: 'ADMET',         status: 'Running',   progress: 95, gpu: '1 / 8',  queue: 'gpu-d100', eta: '00:00:22', startTime: '10:23:11' },
  { id: '#989227', name: 'Docking_Virtual_Screen', user: 'lwang',  project: 'Metabolism',     status: 'Running',   progress: 63, gpu: '2 / 32', queue: 'gpu-d100', eta: '00:30:44', startTime: '10:16:05' },
  { id: '#989226', name: 'ADMET_Predictive',      user: 'mchen',  project: 'Infectious',     status: 'Completed', progress: 100,gpu: '2 / 8',  queue: 'cpu-ph14', eta: '00:00:00', startTime: '10:10:05' },
  { id: '#989225', name: 'Trajectory_Analysis',   user: 'rpatel', project: 'Oncology',       status: 'Failed',    progress: 8,  gpu: '1 / 16', queue: 'cpu-v100', eta: '00:00:00', startTime: '14:12:45' },
];
