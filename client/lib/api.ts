const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getPosts() {
  const res = await fetch(`${API_URL}/posts`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function getPost(id: string) {
  const res = await fetch(`${API_URL}/posts/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json(); // { access_token }
}

export async function createPost(
  title: string,
  content: string,
  token: string,
) {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

export async function uploadImage(
  file: File,
  description: string,
  thoughtId: number,
  token: string,
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("description", description);
  formData.append("thoughtId", String(thoughtId));

  const res = await fetch(`${API_URL}/images/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload image");
  return res.json();
}

export async function deletePost(id: number, token: string) {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete post");
}
