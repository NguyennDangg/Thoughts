import { getPosts } from "@/lib/api";
import PostList from "@/components/PostList";

export default async function Home() {
  const posts = await getPosts();
  return (
    <main style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Thoughts</h1>
      <PostList posts={posts} />
    </main>
  );
}
