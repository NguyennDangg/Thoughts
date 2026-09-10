export default function PostCard({ post }: { post: any }) {
  return (
    <article style={{ marginBottom: "2rem" }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.images?.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            margin: "1rem 0",
          }}
        >
          {post.images.map((img: any) => (
            <img
              key={img.id}
              src={`http://localhost:3000${img.url}`}
              alt={img.description || ""}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          ))}
        </div>
      )}
      <time>{new Date(post.createdAt).toLocaleDateString()}</time>
    </article>
  );
}
