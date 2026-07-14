import { PlaceholderPage } from './PlaceholderPage';
import { FolderKanban, BarChart3, GitBranch, Key, ScrollText, Settings as Cog } from 'lucide-react';

export function Projects() {
  return <PlaceholderPage title="Projects" description="Browse and manage your research projects." icon={FolderKanban} />;
}
export function Results() {
  return <PlaceholderPage title="Results" description="View and analyze simulation results." icon={BarChart3} />;
}
export function Workflows() {
  return <PlaceholderPage title="Workflows" description="Build and run multi-step computational pipelines." icon={GitBranch} />;
}
export function ApiKeys() {
  return <PlaceholderPage title="API Keys" description="Issue and manage programmatic API access keys." icon={Key} />;
}
export function AuditLogs() {
  return <PlaceholderPage title="Audit Logs" description="View a chronological log of platform activity." icon={ScrollText} />;
}
export function Settings() {
  return <PlaceholderPage title="Settings" description="Configure your workspace and integrations." icon={Cog} />;
}
