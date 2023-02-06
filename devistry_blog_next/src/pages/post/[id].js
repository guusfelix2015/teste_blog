import MarkdownIt from 'markdown-it';

export const getStaticProps = async context => {
  const itemId = context.params?.id;
  const postsRes = await fetch(`http://localhost:1337/api/posts/${itemId}`);
  const res = await postsRes.json();

  return {
    props: {
      specificStarData: res.data,
    },
  };
};

export const getStaticPaths = async () => {
  const postsRes = await fetch(`http://localhost:1337/api/posts`);
  const res = await postsRes.json();
  const pathsWithParams = res.data.map(post => ({
    params: { id: String(post.id) },
  }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
};

export default function Post({ specificStarData }) {
  const md = new MarkdownIt();
  const htmlContent = md.render(specificStarData.attributes.content);
  return (
    <div>
      <section dangerouslySetInnerHTML={{ __html: htmlContent }}></section>
    </div>
  );
}
