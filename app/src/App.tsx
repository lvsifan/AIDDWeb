import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import Dashboard       from '@/pages/Dashboard';
import UserManagement  from '@/pages/UserManagement';
import ToolLibrary     from '@/pages/ToolLibrary';
import TaskSubmission  from '@/pages/TaskSubmission';
import JobMonitor      from '@/pages/JobMonitor';
import { Projects, Results, Workflows, ApiKeys, AuditLogs, Settings } from '@/pages/MiscPages';
import './App.css';

function App() {
  return (
    <HashRouter>
      <AppShell>
        <Routes>
          <Route path="/"          element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects"  element={<Projects />} />
          <Route path="/tools"     element={<ToolLibrary />} />
          <Route path="/submit"    element={<TaskSubmission />} />
          <Route path="/jobs"      element={<JobMonitor />} />
          <Route path="/results"   element={<Results />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/users"     element={<UserManagement />} />
          <Route path="/apikeys"   element={<ApiKeys />} />
          <Route path="/audit"     element={<AuditLogs />} />
          <Route path="/settings"  element={<Settings />} />
          <Route path="*"          element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AppShell>
    </HashRouter>
  );
}

export default App;
