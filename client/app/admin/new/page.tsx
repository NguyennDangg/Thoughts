"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPost, uploadImage } from "@/lib/api";

export default function NewThought() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageDescription, setImageDescription] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/admin");
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/admin");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    if (!token) return router.push("/admin");

    try {
      const post = await createPost(title, content, token);
      if (image) {
        await uploadImage(image, imageDescription, post.id, token);
      }
      router.push("/");
    } catch {
      setError("Failed to create post");
    }
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <button onClick={handleLogout} type="button" style={{ float: "right" }}>
        Log out
      </button>
      <h1>New Thought</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          style={{ display: "block", marginBottom: "1rem" }}
        />
        {image && (
          <input
            placeholder="Image description (optional)"
            value={imageDescription}
            onChange={(e) => setImageDescription(e.target.value)}
            style={{ display: "block", marginBottom: "1rem", width: "100%" }}
          />
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Post</button>
      </form>
    </main>
  );
}
