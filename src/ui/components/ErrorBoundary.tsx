import { Component, type ReactNode } from "react";
import { SaveManager } from "@/game/services/SaveManager";

// The one class in the codebase: React error boundaries require one — there
// is no hook equivalent. Its job is protecting the player's save when the UI
// dies: the game stores usually survive a render crash, so the save can still
// be exported from here.

export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  downloadSave = () => {
    try {
      const blob = new Blob([SaveManager.exportSave()], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `cultivation-save-${Date.now()}.json`;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (exportError) {
      console.error("[ErrorBoundary] save export failed:", exportError);
    }
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="dark h-screen bg-background text-foreground flex items-center justify-center p-8">
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <p className="text-xs text-ink-2 font-mono uppercase tracking-widest">
              The Heavens stumbled
            </p>
            <p className="text-ink-2 text-sm leading-relaxed">
              Something in the interface broke. Your life is most likely intact — save it
              before reloading, just in case.
            </p>
          </div>

          <pre className="text-xs text-accent-cinnabar bg-panel border border-line rounded-md p-3 overflow-auto max-h-40 whitespace-pre-wrap">
            {String(this.state.error)}
          </pre>

          <div className="flex gap-3">
            <button
              onClick={this.downloadSave}
              className="px-4 py-2 border border-accent-jade/40 text-accent-jade text-sm rounded-md hover:bg-accent-jade/10 transition-colors"
            >
              Download save
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-line-2 text-ink-2 text-sm rounded-md hover:bg-panel-2 transition-colors"
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    );
  }
}
