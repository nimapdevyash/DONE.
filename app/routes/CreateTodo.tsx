import * as Api from "~/util/api";
import type { Route } from "./+types/Todo";
import { Form } from "react-router";
import { redirect } from "react-router";

export async function action({ request, params }: Route.ActionArgs) {
  const data = await request.formData();

  await Api.create({
    url: "https://api.freeapi.app/api/v1/todos/",
    options: {
      body: JSON.stringify({
        title: data.get("title"),
        description: data.get("description"),
      }),
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
    },
  });

  return redirect("/");
}

export default function Todo({}: Route.ComponentProps) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <Form method="post" className="space-y-4">
        {/* Title Group */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-600">Title:</label>
          <input
            type="text"
            name="title"
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
            className="p-2 border rounded-md border-gray-300 text-black min-h-[100px]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <button
            name="intent"
            value="submit"
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
          >
            SUBMIT
          </button>
        </div>
      </Form>
    </div>
  );
}
