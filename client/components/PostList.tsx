import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: any[] }) {
  if (posts.length === 0) return <p>No thoughts yet.</p>;
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
