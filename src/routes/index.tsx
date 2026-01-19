import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Default from "./layouts/Default";
import PostCreate from "./pages/posts/PostCreate";
import Login from "./pages/auth/Login";
import Posts from "./pages/posts/Posts";
import PostRead from "./pages/posts/PostRead";
import NotFoundPage from "./pages/NotFound";
import Kakao from "./pages/auth/callback/Kakao";
import Signup from "./pages/auth/Signup";
import EmailLogin from "./pages/auth/EmailLogin";
import {
  fetchUserData,
  redirectIfAuth,
  requireAuth,
} from "./loader/auth.loader";
import FullLoading from "../components/common/FullLoading";
import ErrorState from "../components/common/ErrorState";
import { fetchOverview, fetchPostModify, fetchPosts, fetchPostsDetail } from "./loader/postLoader";

const router = createBrowserRouter([
  {
    Component: Default,
    loader: fetchUserData,
    HydrateFallback: FullLoading, // 기다리는 동안 보여줄 컴포넌트
    errorElement: <ErrorState />,
    children: [
      {
        path: "",
        loader: fetchOverview,
        Component: Home,
      },
      {
        path: "/posts",
        loader : fetchPosts , 
        Component: Posts,
      },
      {
        path: "/create-post",
        loader: requireAuth,
        Component: PostCreate,
      },
      {
        path: "/edit/:id",
        loader: fetchPostModify, // loader 속성은 한개만 사용 가능하기 때문에 하나로 통합(requireAuth)
        Component: PostCreate,
      },
      {
        path: "/post/:id",
        loader: fetchPostsDetail,
        Component: PostRead,
      },
      {
        path: "/auth/login",
        loader: redirectIfAuth,
        Component: Login,
      },
      {
        path: "/auth/email-login",
        loader: redirectIfAuth,
        Component: EmailLogin,
      },
      {
        path: "/auth/signup", // 일반 회원가입
        loader: redirectIfAuth,
        Component: Signup,
      },
      {
        path: "/auth/callback/kakao",
        loader: redirectIfAuth,
        Component: Kakao,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);

export default function Route() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
