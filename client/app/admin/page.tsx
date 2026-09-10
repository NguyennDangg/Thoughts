"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const { access_token } = await login(username, password);
      localStorage.setItem("token", access_token);
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid username or password");
    }
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: "1rem", width: "100%" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Log in</button>
      </form>
    </main>
  );
}
