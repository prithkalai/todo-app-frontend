import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://todo-app-backend-production-1bc4.up.railway.app/api/todos/",
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
    return AxiosInstance.put(`/update/${id}`, {
      data: data,
    });
  };

  complete = (id: string, completed: boolean) => {
    return AxiosInstance.put(`/complete/${id}`, {
      data: completed,
    });
  };

  userInfo = () => {
    return AxiosInstance.get(
      "https://todo-app-backend-production-1bc4.up.railway.app/api/users/me",
      {
        baseURL: "",
      }
    );
  };
}

export default new APIclient();
