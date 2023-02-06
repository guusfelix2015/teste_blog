import Link from 'next/link';

export const getStaticProps = async () => {
  const postsRes = await fetch(`http://localhost:1337/api/posts`);
  const res = await postsRes.json();

  console.log(res.data);

  return {
    props: {
      posts: res.data,
    },
  };
};

export default function Home({ posts }) {
  console.log(posts);
  return (
    <>
      <h1>
        {posts.map(post => (
          <div key={post.id}>
            <h1>{post.id}</h1>
            <Link href={`/post/${post.id}`}>Ler post</Link>
          </div>
        ))}
      </h1>
    </>
  );
}
