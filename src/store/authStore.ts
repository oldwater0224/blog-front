import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { axiosInstance } from "../api/axios";

interface User {
  // network fetch/XHR 상에서 expired token 발생
  id: string;
  kakaoId: string;
  profileImage: string;
  nickname: string;
  email?: string; // 초기에 없을 수도 있으니 ?: 옵셔널로 지정
}

interface AuthStore {
  isLogin : boolean;
  user : User | null;
  setUserData : (userData:User) => void;
  logout : () => void;
}
export const useAuthStore = create<AuthStore>()(
  devtools(
    immer((set) => ({
      isLogin: false,
      user: null,
      setUserData: (userData) =>
        set((state) => {
          state.isLogin = true;
          state.user = userData;
        }),
        logout : async () => {
          await axiosInstance.post("/auth/logout"); // 로그아웃 api 를 호출해야지만 리프레쉬 토큰이 지워진다.
          set((state) => {
            state.isLogin = false;
            state.user = null;
            sessionStorage.removeItem("access_token");
            // 로그아웃 구현
          })
        }
    }))
  )
);
