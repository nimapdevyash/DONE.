import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/home.tsx", [
    index("./routes/Todos.tsx"),
    route("/new", "./routes/CreateTodo.tsx"),
    route("/:todoId", "./routes/Todo.tsx"),
  ]),
] satisfies RouteConfig;
