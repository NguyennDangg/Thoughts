"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getPosts, deletePost } from "@/lib/api";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
      return;
    }
    loadPosts();
  }, [router]);

  async function loadPosts() {
    const data = await getPosts();
    setPosts(data);
    setLoading(false);
  }

  async function handleDelete(id: number) {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/admin");
    if (!confirm("Delete this thought?")) return;

    try {
      await deletePost(id, token);
      setPosts(posts.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete post");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/admin");
  }

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <main style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <h1>Admin Dashboard</h1>
        <div>
          <Link href="/admin/new" style={{ marginRight: "1rem" }}>
            + New Thought
          </Link>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>

      {posts.length === 0 && <p>No thoughts yet.</p>}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            marginBottom: "1.5rem",
            borderBottom: "1px solid #333",
            paddingBottom: "1rem",
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <time>{new Date(post.createdAt).toLocaleDateString()}</time>
          <br />
          <button
            onClick={() => handleDelete(post.id)}
            style={{ marginTop: "0.5rem" }}
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}
