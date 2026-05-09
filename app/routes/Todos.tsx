import * as Api from "~/util/api";
import type { Route } from "./+types/Todos";
import { Link } from "react-router";
import { useFetcher } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const apiUrl = new URL("https://api.freeapi.app/api/v1/todos");

  const completeState = url.searchParams.get("complete");
  const search = url.searchParams.get("query");

  console.log("request: ", request.url);
  console.log("apiUrl", apiUrl.toString());

  if (completeState === "true" || completeState === "false")
    apiUrl.searchParams.set("complete", String(completeState));

  if (search) apiUrl.searchParams.set("query", String(search));

  const response = await Api.getAll({ url: apiUrl.toString() });
  // console.log("Response.data: ", response);
  return response.data;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const intent = formData.get("intent");
  const id = formData.get("id");

  if (intent === "toggle") {
    await Api.toggle({
      url: `https://api.freeapi.app/api/v1/todos/toggle/status/${id}`,
    });
  } else {
    await Api.remove({
      url: `https://api.freeapi.app/api/v1/todos/${id}`,
    });
  }
  return;
}

type todo = {
  title: string;
  _id: string;
  isComplete: boolean;
};

export default function Todos({ loaderData = [] }: Route.ComponentProps) {
  const fetcher = useFetcher();
  const todos = fetcher.data ?? loaderData ?? [];

  return (
    <div className="max-w-2xl mx-auto py-10 px-6 min-h-screen font-sans">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            My Tasks
          </h2>
          <p className="text-gray-500 text-sm mt-1">Manage your daily goals</p>
        </div>
        <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm">
          {todos.length} {todos.length === 1 ? "Task" : "Tasks"}
        </span>
      </div>

      {/* FILTER & SEARCH BAR */}
      <fetcher.Form
        method="get"
        className="flex flex-col sm:flex-row gap-3 mb-10 p-2 bg-white rounded-2xl border border-gray-200 shadow-sm"
      >
        <div className="relative flex-1">
          <input
            name="query"
            placeholder="Search tasks..."
            className="w-full pl-4 pr-10 py-3 bg-transparent text-sm outline-none focus:ring-0"
          />
        </div>

        <div className="h-8 w-[1px] bg-gray-200 hidden sm:block self-center" />

        <select
          name="complete"
          onChange={(e) => fetcher.submit(e.currentTarget.form)}
          className="bg-transparent px-4 py-3 text-sm font-medium text-gray-600 outline-none cursor-pointer hover:text-blue-600 transition-colors"
        >
          <option value="">All Status</option>
          <option value="true">Completed</option>
          <option value="false">Pending</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95"
        >
          Search
        </button>
      </fetcher.Form>

      {/* TODO LIST */}
      {todos.length === 0 ? (
        <div className="text-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="text-4xl mb-4">🎉</div>
          <p className="text-gray-500 font-medium">All caught up!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {todos.map((todo: any) => (
            <li
              key={todo._id}
              className="group flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-blue-200"
            >
              <div className="flex items-center flex-1">
                {/* Status Icon */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    todo.isComplete
                      ? "bg-green-500 border-green-500"
                      : "border-gray-200"
                  }`}
                >
                  {todo.isComplete && (
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={4}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                <Link
                  to={`/${todo._id}`}
                  className={`ml-4 text-sm font-semibold transition-all ${
                    todo.isComplete
                      ? "text-gray-400 line-through"
                      : "text-gray-700 group-hover:text-blue-600"
                  }`}
                >
                  {todo.title}
                </Link>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <fetcher.Form method="post">
                  <input type="hidden" name="id" value={todo._id} />
                  <button
                    type="submit"
                    name="intent"
                    id={todo._id}
                    value="toggle"
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      todo.isComplete
                        ? "text-orange-600 bg-orange-50 hover:bg-orange-100"
                        : "text-green-600 bg-green-50 hover:bg-green-100"
                    }`}
                  >
                    {todo.isComplete ? "Undo" : "Done"}
                  </button>

                  <button
                    type="submit"
                    name="intent"
                    id={todo._id}
                    value="remove"
                    className="ml-2 px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </fetcher.Form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
