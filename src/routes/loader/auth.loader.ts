import { redirect } from "react-router";
import { axiosInstance } from "../../api/axios";
import { useAuthStore } from "../../store/authStore";

export const fetchUserData = async () => {
  try {
    const user = useAuthStore.getState().user;
    const accessToken = sessionStorage.getItem("access_token");
    
    // 새로고침
    if (!user && accessToken) {
      
      const { data } = await axiosInstance.get("/auth/me");
      const setUserData = useAuthStore.getState().setUserData;
      setUserData(data);
    }
  } catch (e) {
    console.error(e);
  }
};


export const requireAuth = () => {// 도메인 수동 입력시 로그인화면 접근 불가 (인증된 사용자만 접근)
  const token = sessionStorage.getItem("access_token") // (인증된 사용자인지 확인)
  if(!token){
    return redirect("/auth/login") // 토근이 없다면 로그인 페이지로 이동
  }

} 

export const redirectIfAuth = () => { // 로그인 하지 않은 사용자만 접근하게
const token = sessionStorage.getItem("access_token")
 if(token){
    return redirect("/") // 메인 페이지로 이동
}
}