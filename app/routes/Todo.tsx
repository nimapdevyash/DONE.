import * as Api from "~/util/api";
import type { Route } from "./+types/Todo";
import { Form } from "react-router";
import { redirect } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const { todoId } = params;
  const response = await Api.getAll({
    url: `https://api.freeapi.app/api/v1/todos/${todoId}`,
  });
  console.log("response: ", response);
  return response.data;
}

export async function action({ request, params }: Route.ActionArgs) {
  const data = await request.formData();
  const intent = data.get("intent");

  switch (intent) {
    case "delete": {
      await Api.remove({
        url: `https://api.freeapi.app/api/v1/todos/${params.todoId}`,
      });

      return redirect("/");
    }
    case "toggle": {
      await Api.toggle({
        url: `https://api.freeapi.app/api/v1/todos/toggle/status/${params.todoId}`,
      });

      return redirect("/");
    }
    default: {
      await Api.edit({
        url: `https://api.freeapi.app/api/v1/todos/${params.todoId}`,
        options: {
          body: JSON.stringify({
            title: data.get("title"),
            description: data.get("description"),
          }),
          method: "PATCH",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
        },
      });

      return redirect("/");
    }
  }
}

export default function Todo({ loaderData }: Route.ComponentProps) {
  // Always good to handle the case where loaderData might be null
  if (!loaderData) return <div>Loading task...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <Form method="post" className="space-y-4">
        {/* Title Group */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-600">Title:</label>
          <input
            type="text"
            name="title"
            defaultValue={loaderData.title}
            className="p-2 border rounded-md border-gray-300 text-black focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Description Group */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-600">
            Description:
          </label>
          <textarea
            name="description"
            defaultValue={loaderData.description}
            className="p-2 border rounded-md border-gray-300 text-black min-h-[100px]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <button
            name="intent"
            value="update"
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
          >
            UPDATE
          </button>

          <button
            name="intent"
            value="toggle"
            className="px-4 py-2 border border-red-200 text-yellow-600 rounded-lg hover:bg-red-50 font-bold"
          >
            {loaderData.isComplete ? "UNDONE" : "DONE"}
          </button>

          <button
            name="intent"
            value="delete"
            className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-bold"
          >
            DELETE
          </button>
        </div>
      </Form>
    </div>
  );
}
