import type { Route } from "./+types/home";
import { Outlet, Link, useNavigation } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Done. | Task Manager" },
    { name: "description", content: "Manage your tasks with React Router v7" },
  ];
}

export default function Home() {
  const navigation = useNavigation();

  /**
   * navigation.state can be:
   * - "idle": Doing nothing.
   * - "loading": Fetching data for a new route (via Link or redirect).
   * - "submitting": Sending data via a Form POST.
   */
  const isNavigating = navigation.state !== "idle";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* PROGRESS BAR
          We place this outside the conditional rendering of the layout
          so the layout NEVER unmounts. This stops the black flash.
      */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-blue-100 overflow-hidden">
          <div
            className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)] animate-progress-bar"
            style={{
              width: "100%",
              animation: "progress 2s ease-in-out infinite",
            }}
          />
        </div>
      )}

      {/* HEADER: Always visible, providing a stable UI "anchor" */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-black text-slate-900 tracking-tighter hover:opacity-80 transition-opacity"
          >
            DONE<span className="text-blue-600">.</span>
          </Link>

          <Link
            to="/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all active:scale-95 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Task
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT:
          Instead of disappearing, we dim the content slightly during navigation.
          This gives immediate feedback without the jarring white/black flash.
      */}
      <main
        className={`max-w-4xl mx-auto py-10 px-6 transition-opacity duration-300 ${
          isNavigating ? "opacity-40 pointer-events-none" : "opacity-100"
        }`}
      >
        <Outlet />
      </main>

      {/* Adding basic keyframe for the progress bar directly in style tag for simplicity */}
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(-30%); }
          100% { transform: translateX(0%); }
        }
        .animate-progress-bar {
          animation: progress 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
