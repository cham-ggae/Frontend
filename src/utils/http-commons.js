import axios from "axios";

// const BASE_URL = "http://112.150.251.179:8080/";
// const BASE_URL = "http://localhost:8090";
const BASE_URL = process.env.NEXT_PUBLIC_ADDR;

// local vue api axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  withCredentials: true,
});

// — Request 인터셉터: 매 요청마다 Authorization 헤더 갱신
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// — Response 인터셉터: 401 → refresh → 재시도
api.interceptors.response.use(
  (res) => res,

  (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 첫 401이면 refresh 시도
      if (isRefreshing) {
        // 이미 refresh 중이면 대기
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        // 직접 axios.post로 호출해서 인터셉터 무한 루프 방지
        axios
          .post(`${BASE_URL}/refresh`, {}, { withCredentials: true })
          .then((resp) => {
            // 서버가 { accessToken: "새토큰" } 형태로 반환한다고 가정
            const newToken = resp.data.accessToken;
            localStorage.setItem("accessToken", newToken);

            processQueue(null, newToken);
            // 원 요청에 새로운 토큰 붙여서 재시도
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
