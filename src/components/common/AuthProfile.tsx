import { useState } from "react";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useRevalidator } from "react-router";

export default function AuthProfile() {
  const {revalidate} = useRevalidator(); //로그아웃 시에 페이지 튕겨내기
  const logout = useAuthStore((state) => state.logout)
  const user = useAuthStore((state) => state.user);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center space-x-2"
        >
          <img
            src={user?.profileImage}
              // `https://gravatar.com/avatar/${Math.random()
              // .toString(36)
              // .substring(2)}?d=identicon` (기본값)
            className="w-8 h-8 rounded-full border-2 border-blue-500"
          />
        </button>

        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg py-1 z-50">
            <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700">
              <p className="text-sm font-medium">{user?.nickname}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
            <button
              onClick={async () => {
                await logout();
                setIsUserMenuOpen(false);
                revalidate(); // 로그아웃 페이지 튕겨내기
              }}
              className="flex items-center w-full px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </>
  );
}
