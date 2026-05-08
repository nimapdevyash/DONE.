import type { Route } from "./+types/home";
import { Outlet, Link, useNavigation } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const navigation = useNavigation();
  const isNavigating = navigation.state !== "idle";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Concept 4: Global Pending UI */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50 animate-pulse" />
      )}

      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-black text-slate-900 tracking-tighter"
          >
            DONE<span className="text-blue-600">.</span>
          </Link>

          <Link
            to="/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all active:scale-95"
          >
            + New Task
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-10 px-6">
        <Outlet />
      </main>
    </div>
  );
}
