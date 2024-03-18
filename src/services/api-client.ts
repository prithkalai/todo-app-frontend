import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/todos/",
});

class APIclient {
  constructor() {
    AxiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("authToken");

        if (token) {
          config.headers["x-auth-token"] = token;
        } else {
          console.error("Token Not found");
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get = () => {
    return AxiosInstance.get("");
  };

  create = (data: string) => {
    return AxiosInstance.post("", {
      data: data,
    });
  };

  delete = (id: string) => {
    return AxiosInstance.delete(`${id}`);
  };

  update = (id: string, data: string) => {
    return AxiosInstance.put(`${id}`, {
      data: data,
    });
  };

  userInfo = () => {
    return AxiosInstance.get("http://localhost:3000/api/users/me", {
      baseURL: "",
    });
  };
}

export default new APIclient();
