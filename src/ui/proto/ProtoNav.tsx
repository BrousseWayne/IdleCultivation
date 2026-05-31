import { Link, useLocation } from "react-router";

const PROTOS = [
  { path: "/proto/scene", label: "Scene" },
  { path: "/proto/overworld", label: "Overworld" },
  { path: "/proto/rail", label: "Rail" },
  { path: "/proto/combined-bar", label: "Bar+Scene" },
  { path: "/proto/combined-map", label: "Plots+Scene" },
  { path: "/proto/dialogue", label: "Dialogue" },
  { path: "/proto/stream-right", label: "Stream→Right" },
  { path: "/proto/stream-bottom", label: "Stream→Bottom" },
  { path: "/proto/stream-inline", label: "Explore=Stream" },
  { path: "/proto/graph", label: "Graph+Scene+Stream" },
  { path: "/proto/seam", label: "Seam Lab" },
];

export function ProtoNav() {
  const { pathname } = useLocation();
  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[9999] flex flex-wrap justify-center gap-1 px-2 py-1.5 rounded-lg bg-black/90 border border-slate-700/60 backdrop-blur-sm shadow-lg max-w-[96vw]">
      {PROTOS.map((p) => (
        <Link
          key={p.path}
          to={p.path}
          className={`px-2.5 py-1 rounded text-[11px] font-mono whitespace-nowrap transition-colors ${
            pathname === p.path
              ? "bg-accent-cinnabar/20 text-accent-cinnabar"
              : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          }`}
        >
          {p.label}
        </Link>
      ))}
    </div>
  );
}

export function ProtoFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProtoNav />
      <div className="pt-12">{children}</div>
    </>
  );
}
