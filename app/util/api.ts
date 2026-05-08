type fetchPrams = {
  url: string;
  options?: {
    method?: "GET" | "PUT" | "PATCH" | "POST" | "DELETE";
    headers?: {
      accept: "application/json";
      "content-type"?: "application/json";
    };
    body?: string;
  };
};

export async function getAll({
  url,
  options = {
    method: "GET",
    headers: { accept: "application/json" },
  },
}: fetchPrams) {
  const response = await fetch(url, options);
  return response.json();
}

export async function remove({
  url,
  options = {
    method: "DELETE",
    headers: { accept: "application/json" },
  },
}: fetchPrams) {
  const response = await fetch(url, options);
  return response.json();
}

export async function toggle({
  url,
  options = {
    method: "PATCH",
    headers: { accept: "application/json" },
  },
}: fetchPrams) {
  const response = await fetch(url, options);
  return response.json();
}

export async function edit({
  url,
  options = {
    method: "PATCH",
    headers: { accept: "application/json" },
    body: "{}",
  },
}: fetchPrams) {
  const response = await fetch(url, options);
  return response.json();
}

export async function create({
  url,
  options = {
    method: "POST",
    headers: { accept: "application/json" },
    body: "{}",
  },
}: fetchPrams) {
  const response = await fetch(url, options);
  return response.json();
}
