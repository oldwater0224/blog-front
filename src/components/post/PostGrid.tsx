import { Link } from "react-router";
import PostCard from "./PostCard";
import PostMainZero from "./PostMainZero";
// import PostMainZero from "./PostMainZero";

export default function PostGrid({

  // TypeError: Cannot read properties of undefined (reading 'length') 를 위해 타입에 옵셔널 처리와 값을 재정의 함
  title = 'Posts' ,
  posts = [] ,
  viewAllPosts = "/posts", 
}: {
  title?: string; // 옵셔널 처리
  posts?: Post[]; // 옵셔널 처리
  viewAllPosts?: string;
}) {
  // return <PostMainZero />;
  if (posts.length === 0) return <PostMainZero title={title} />; // 게시글이 없으면 PostMainZero 컴포넌트 호출
  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <Link
          to={viewAllPosts} // 클릭할 때 마다 viewAllPost 로 이동
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          View All Post
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(
          //  이미지 반복 랜더링
          (post) => (
            <PostCard key={post._id}{...post} />
          )
        )}
      </div>
    </section>
  );
}
