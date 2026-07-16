/**
 * Integration Bridge — Portal Side (Parent)
 * ==========================================
 *
 * Runs inside the PharmaAIDD portal when it embeds tool frontends
 * (FlexFit, etc.) in iframes. Provides utilities to:
 *
 *   - Sync theme to all embedded tools
 *   - Navigate an embedded tool to a specific route
 *   - Hand off task data to a tool
 *   - Receive "ready" and "descriptor" messages from tools
 *
 * Usage:
 *   import { initPortalBridge, syncThemeToTools, navigateTool } from '@/lib/integration/portal';
 *   initPortalBridge();  // call once on app boot
 *
 *   // When theme changes:
 *   syncThemeToTools('light');
 *
 *   // When user clicks "open in FlexFit":
 *   navigateTool('flexfit', '/results/abc123');
 */

import {
  PROTOCOL_VERSION,
  isIntegrationMessage,
  isAllowedOrigin,
  type IntegrationMessage,
} from './types';
import { getTheme, setTheme, onThemeChange, type ThemeMode } from '@/lib/theme';

/* ------------------------------------------------------------------ */
/* Tool iframe registry                                               */
/* ------------------------------------------------------------------ */

interface ToolFrame {
  toolType: string;
  iframe: HTMLIFrameElement;
  ready: boolean;
}

const toolFrames = new Map<string, ToolFrame>();

/**
 * Register an embedded tool iframe.
 * Call this when you render an <iframe> for a tool.
 */
export function registerToolFrame(toolType: string, iframe: HTMLIFrameElement): void {
  toolFrames.set(toolType, { toolType, iframe, ready: false });

  // As soon as the iframe loads, sync current theme
  iframe.addEventListener('load', () => {
    syncThemeToTool(toolType, getTheme());
  });
}

/** Unregister a tool iframe (when the iframe is removed). */
export function unregisterToolFrame(toolType: string): void {
  toolFrames.delete(toolType);
}

/* ------------------------------------------------------------------ */
/* Outbound commands (Portal → Tool)                                   */
/* ------------------------------------------------------------------ */

/** Sync theme to a single tool. */
export function syncThemeToTool(toolType: string, mode: ThemeMode): void {
  const frame = toolFrames.get(toolType);
  if (!frame?.iframe.contentWindow) return;
  frame.iframe.contentWindow.postMessage(
    { protocol: PROTOCOL_VERSION, type: 'theme:sync', mode, source: 'portal' },
    '*',
  );
}

/** Sync theme to ALL registered tools. */
export function syncThemeToTools(mode: ThemeMode): void {
  toolFrames.forEach((_, toolType) => syncThemeToTool(toolType, mode));
}

/** Tell a tool to navigate to a path. */
export function navigateTool(toolType: string, path: string): void {
  const frame = toolFrames.get(toolType);
  if (!frame?.iframe.contentWindow) return;
  frame.iframe.contentWindow.postMessage(
    { protocol: PROTOCOL_VERSION, type: 'navigate', path, source: 'portal' },
    '*',
  );
}

/** Hand off a task to a tool (open existing or pre-fill new). */
export function handoffTask(
  toolType: string,
  options: { taskId?: string; prefill?: Record<string, unknown> },
): void {
  const frame = toolFrames.get(toolType);
  if (!frame?.iframe.contentWindow) return;
  frame.iframe.contentWindow.postMessage(
    { protocol: PROTOCOL_VERSION, type: 'task:handoff', ...options, source: 'portal' },
    '*',
  );
}

/* ------------------------------------------------------------------ */
/* Inbound messages (Tool → Portal)                                    */
/* ------------------------------------------------------------------ */

export type ToolReadyCallback = (info: { toolType: string; version: string }) => void;
export type ToolDescriptorCallback = (descriptor: {
  toolType: string;
  toolLabel: string;
  icon: string;
  accentColor: string;
  routes: { path: string; label: string; kind: string }[];
}) => void;
export type ThemeRequestCallback = () => ThemeMode;

let initialised = false;

/**
 * Initialise the portal bridge.
 * Sets up a message listener for tool→portal messages.
 * Also auto-syncs theme to all tools whenever the portal theme changes.
 */
export function initPortalBridge(callbacks?: {
  onToolReady?: ToolReadyCallback;
  onToolDescriptor?: ToolDescriptorCallback;
}): void {
  if (initialised) return;
  initialised = true;

  window.addEventListener('message', (event: MessageEvent) => {
    if (!isAllowedOrigin(event.origin)) return;
    if (!isIntegrationMessage(event.data)) return;

    const msg = event.data as IntegrationMessage;
    if (msg.source !== 'tool') return;

    switch (msg.type) {
      case 'ready':
        // Mark the tool frame as ready
        for (const [toolType, frame] of toolFrames) {
          if (msg.toolType === toolType) {
            frame.ready = true;
            // Immediately sync current theme
            syncThemeToTool(toolType, getTheme());
          }
        }
        callbacks?.onToolReady?.({ toolType: msg.toolType, version: msg.version });
        break;

      case 'tool:descriptor':
        callbacks?.onToolDescriptor?.(msg);
        break;

      case 'theme:request':
        // Tool is asking for the current theme — respond
        syncThemeToTools(getTheme());
        break;

      case 'theme:change':
        // Tool toggled its own theme — portal should follow (and sync other tools)
        setTheme(msg.mode);
        break;
    }
  });

  // When portal theme changes, push to all tools
  onThemeChange((mode) => {
    syncThemeToTools(mode);
  });
}

/* ------------------------------------------------------------------ */
/* Query helpers                                                       */
/* ------------------------------------------------------------------ */

/** Check if a tool is currently embedded and ready. */
export function isToolReady(toolType: string): boolean {
  return toolFrames.get(toolType)?.ready ?? false;
}

/** List all registered tool types. */
export function getRegisteredTools(): string[] {
  return Array.from(toolFrames.keys());
}
