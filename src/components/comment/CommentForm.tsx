import { Send } from "lucide-react";
import { Dispatch, SetStateAction, startTransition, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../api/axios";

export default function CommentForm({
  addOptimisticComments,
  setComments,
}: {
  addOptimisticComments: (action: Comment) => void;
  setComments: Dispatch<SetStateAction<Comment[]>>;
}) {
  const params = useParams(); // 고유한 id 값 가져오기
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [text, setText] = useState("");
  const handleFocus = () => {
    if (!user) navigate("/auth/login");
  };
  const handleCommentAdd = async () => {
    addOptimisticComments({
      // 낙관적 업데이트를 통한  댓글 처리
      author: {
        _id: Date.now().toString(),
        profileImage: user?.profileImage,
        nickname: user?.nickname,
      },
      content: text,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    } as Comment);
    try {
      if (!text.trim()) return;
      const { data } = await axiosInstance.post(
        `/posts/${params.id}/comments`,
        {
          content: text, // content 속성을 반드시 포함해야 한다.
        }
      );
      setText("");
      startTransition(() => {
        setComments((comments) => [...comments, data]);
      });
      // console.log(data);
    } catch (e) {
      alert(e instanceof Error ? e.message : "unknown error");
    }
  };

  return (
    <form action={handleCommentAdd} className="mt-4">
      <div className="flex gap-4">
        {user && ( // 유저가 있을 때만 보여줌.
          <img
            src={user.profileImage}
            alt={user.nickname}
            className="w-10 h-10 rounded-full"
          />
        )}
        <div className="flex-1">
          <textarea
            placeholder={"Write a comment..."}
            className="w-full bg-slate-800 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={handleFocus} // 로그인 하지 않았다면 로그인 페이지로 이동.
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400
              disabled: cursor-not-allowed"
              disabled={!user} // user 가 없다면 버튼 disabled
            >
              <Send className="w-4 h-4" />
              Comment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
