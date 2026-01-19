import { LoaderFunctionArgs } from "react-router";
import { axiosInstance } from "../../api/axios";
import { requireAuth } from "./auth.loader";

export const fetchOverview = async () => {
  try {
    const { data } = await axiosInstance.get("/posts/overview");
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchPostsDetail = async ({ params }: LoaderFunctionArgs) => {
  try {
    const { data } = await axiosInstance.get(`/posts/${params.id}`);
    const {
      data: { posts: relatedPosts },
    } = await axiosInstance.get(
      // backend 폴더 수정 후 posts를 구조분해 할당
      `/posts?category=${data.category}&limit=3`
    );
    return { post: data, relatedPosts };
  } catch {
    return { post: null, relatedPosts: null };
    // console.error(e);
  }
};

export const fetchPostModify = async ({ params }: LoaderFunctionArgs) => {
  try {
    //requireAuth 처리
    const auth = requireAuth();
    if (auth) return auth;

    const { data } = await axiosInstance.get(`/posts/${params.id}`);
    return data;
  } catch (e) {
    console.error(e);
  }
};

// 게시글 등록 loader
export const fetchPosts = async ({ request }: LoaderFunctionArgs) => {
  try {
    let query = ""; // 쿼리 스트링
    const url = new URL(request.url);
    const sort = url.searchParams.get("sort") ?? "newest"; // views // 쿼리 스트링 값 가져오기
    const category = url.searchParams.get("category") ?? "";
    const page = url.searchParams.get("page") ?? "1";
    const search = url.searchParams.get("search") ?? "";

    // 쿼리스트링 만들기
    if (sort !== "") query += `sort${sort}`;
    if (category !== "") query += `&category${category}`;
    if (page !== "") query += `&page${page}`;
    if (search !== "") query += `&search${search}`;

    // 데이터 불러오기
    const { data } = await axiosInstance.get(`/posts?${query}`);
    return data;
    
  } catch (e) {
    console.error(e);
  }
};
