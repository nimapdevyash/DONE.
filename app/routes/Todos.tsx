import * as Api from "~/util/api";
import type { Route } from "./+types/Todos";
import { Link } from "react-router";

export async function loader() {
  const response = await Api.getAll({
    url: "https://api.freeapi.app/api/v1/todos",
  });
  return response.data;
}

type todo = {
  title: string;
  _id: string;
  isComplete: boolean;
};

export default function Todos({ loaderData = [] }: Route.ComponentProps) {
  // Defensive check: FreeAPI sometimes returns data wrapped differently
  // Ensure we have an array to map over
  const todos = Array.isArray(loaderData) ? loaderData : [];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          My Tasks
        </h2>
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {todos.length} Total
        </span>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500">No tasks found. Time to relax!</p>
        </div>
      ) : (
        <ul className="grid gap-3">
          {todos.map((todo: todo) => (
            <li key={todo._id} className="group">
              <Link
                to={`/${todo._id}`}
                className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {/* Visual indicator for completion */}
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center transition-colors ${
                    todo.isComplete
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300 group-hover:border-blue-400"
                  }`}
                >
                  {todo.isComplete && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                <span
                  className={`text-sm font-medium transition-colors ${
                    todo.isComplete
                      ? "text-gray-400 line-through"
                      : "text-gray-700 group-hover:text-blue-600"
                  }`}
                >
                  {todo.title}
                </span>

                {/* Right Arrow (Visible on Hover) */}
                <svg
                  className="ml-auto w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
