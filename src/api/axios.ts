import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL , // "http://localhost:4000"
  withCredentials: true, // 쿠키 기반 인증에서는 반드시 필요한 속성 , true 여야만 요청.
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token"); // 정상적으로 요청이 들어갈 때 토큰입력("accessToken")
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization  = `Bearer ${token}`; // "문자열로 된것 백틱으로 수정해서 malformed 에러는 수정 됐지만 expired 문제는 아직 남았다."
    }
    return config;
    //session storage 에 access token 이 있다면 매번 요청을 보낼 때 마다 Authorization 에 토큰값을 보내라 라는 의미
  },
  (error) => Promise.reject(error)
); // 요청 전에 항상 이 코드를 실행시킨다.

// 응답에 대한 interceptor
// 토큰 재발급 로직
let retry = false; // 토큰이 계속 재발급 되면 안되기 때문에 
axiosInstance.interceptors.response.use(response => response , async(error) => {
  
  const originalRequest = error.config; // 요청이 실패했을 당시에 config 설정값 변수에 저장
  if(error.response && error.response.status === 401 && !retry){
    retry = true;// 토큰이 계속 재발급 되면 안되기 때문에
    try{
      const res = await axiosInstance.post("/auth/refresh");
      if(!res.data.accessToken) throw new Error("Access token is missing");
      retry = false; // 토큰이 계속 재발급 되면 안되기 때문에
      sessionStorage.setItem("access_token" , res.data.accessToken);
      return axiosInstance(originalRequest);
    }catch(refreshError){
      sessionStorage.removeItem("access_token");
      await axiosInstance.post("/auth/logout");
      return Promise.reject(refreshError);
    }
  }
})
