/**
 * Cross-Site Integration Contracts
 * =================================
 *
 * Defines the message protocol between the PharmaAIDD portal (parent)
 * and tool frontends like FlexFit (child, typically in an iframe).
 *
 * When the portal embeds a tool frontend, it uses postMessage to:
 *   1. Sync theme (dark/light) across all embedded tools
 *   2. Navigate the tool to a specific route (e.g., open a task)
 *   3. Hand off task data (pre-fill a submission form)
 *   4. Know when the tool is ready
 *
 * Protocol versioning: increment PROTOCOL_VERSION on breaking changes.
 * Both sides must check `protocol` before acting on a message.
 *
 * Security: always validate `event.origin` against an allowlist.
 */

export const PROTOCOL_VERSION = 1;

export type IntegrationMessage =
  | ThemeSyncMessage
  | ThemeChangeMessage
  | NavigateMessage
  | TaskHandoffMessage
  | ReadyMessage
  | ToolDescriptorMessage
  | ThemeRequestMessage;

/** Parent → Child: sync theme */
export interface ThemeSyncMessage {
  protocol: typeof PROTOCOL_VERSION;
  type: 'theme:sync';
  mode: 'dark' | 'light';
  source: 'portal';
}

/** Child → Parent: my theme changed (portal should sync other tools) */
export interface ThemeChangeMessage {
  protocol: typeof PROTOCOL_VERSION;
  type: 'theme:change';
  mode: 'dark' | 'light';
  source: 'tool';
}

/** Child → Parent: request current theme (on boot, before parent syncs) */
export interface ThemeRequestMessage {
  protocol: typeof PROTOCOL_VERSION;
  type: 'theme:request';
  source: 'tool';
}

/** Parent → Child: navigate to a route */
export interface NavigateMessage {
  protocol: typeof PROTOCOL_VERSION;
  type: 'navigate';
  path: string;
  source: 'portal';
}

/** Parent → Child: hand off task data */
export interface TaskHandoffMessage {
  protocol: typeof PROTOCOL_VERSION;
  type: 'task:handoff';
  taskId?: string;
  prefill?: Record<string, unknown>;
  source: 'portal';
}

/** Child → Parent: tool is ready */
export interface ReadyMessage {
  protocol: typeof PROTOCOL_VERSION;
  type: 'ready';
  toolType: string;
  version: string;
  source: 'tool';
}

/** Child → Parent: tool describes itself */
export interface ToolDescriptorMessage {
  protocol: typeof PROTOCOL_VERSION;
  type: 'tool:descriptor';
  toolType: string;
  toolLabel: string;
  icon: string;
  accentColor: string;
  routes: ToolRoute[];
  source: 'tool';
}

export interface ToolRoute {
  path: string;
  label: string;
  kind: 'submit' | 'monitor' | 'results' | 'settings';
}

export interface ToolDescriptor {
  toolType: string;
  toolLabel: string;
  icon: string;
  accentColor: string;
  routes: ToolRoute[];
  entryUrl?: string;
}

export function isIntegrationMessage(data: unknown): data is IntegrationMessage {
  if (typeof data !== 'object' || data === null) return false;
  const msg = data as Record<string, unknown>;
  return (
    typeof msg.protocol === 'number' &&
    typeof msg.type === 'string' &&
    typeof msg.source === 'string' &&
    msg.protocol === PROTOCOL_VERSION
  );
}

export const ALLOWED_ORIGINS = [
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5180',
  'http://localhost:5173',
  'http://localhost:5180',
];

export function isAllowedOrigin(origin: string): boolean {
  return ALLOWED_ORIGINS.includes(origin);
}
