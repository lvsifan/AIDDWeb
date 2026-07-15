import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import Dashboard       from '@/pages/Dashboard';
import UserManagement  from '@/pages/UserManagement';
import ToolLibrary     from '@/pages/ToolLibrary';
import TaskSubmission  from '@/pages/TaskSubmission';
import JobMonitor      from '@/pages/JobMonitor';
import ProjectsPage    from '@/pages/ProjectsPage';
import ResultsPage     from '@/pages/ResultsPage';
import WorkflowsPage   from '@/pages/WorkflowsPage';
import DatasetsPage    from '@/pages/DatasetsPage';
import TeamPage        from '@/pages/TeamPage';
import AuditLogsPage   from '@/pages/AuditLogsPage';
import SettingsPage    from '@/pages/SettingsPage';
import NotificationsPage from '@/pages/NotificationsPage';
import AdminPage       from '@/pages/AdminPage';
import ClusterPage     from '@/pages/ClusterPage';
import ReportsPage     from '@/pages/ReportsPage';
import AIPage          from '@/pages/AIPage';
import DocsPage        from '@/pages/DocsPage';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { Key } from 'lucide-react';
import './App.css';

function App() {
  return (
    <HashRouter>
      <AppShell>
        <Routes>
          <Route path="/"          element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects"  element={<ProjectsPage />} />
          <Route path="/tools"     element={<ToolLibrary />} />
          <Route path="/datasets"  element={<DatasetsPage />} />
          <Route path="/submit"    element={<TaskSubmission />} />
          <Route path="/jobs"      element={<JobMonitor />} />
          <Route path="/results"   element={<ResultsPage />} />
          <Route path="/workflows" element={<WorkflowsPage />} />
          <Route path="/ai"        element={<AIPage />} />
          <Route path="/users"     element={<UserManagement />} />
          <Route path="/team"      element={<TeamPage />} />
          <Route path="/apikeys"   element={<PlaceholderPage title="API Keys" description="Issue and manage programmatic API access keys." icon={Key} />} />
          <Route path="/admin"     element={<AdminPage />} />
          <Route path="/cluster"   element={<ClusterPage />} />
          <Route path="/audit"     element={<AuditLogsPage />} />
          <Route path="/reports"   element={<ReportsPage />} />
          <Route path="/settings"  element={<SettingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/docs"      element={<DocsPage />} />
          <Route path="*"          element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AppShell>
    </HashRouter>
  );
}

export default App;
