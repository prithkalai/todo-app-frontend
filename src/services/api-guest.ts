import axios from "axios";

const SignupInstance = axios.create({
  baseURL: "http://localhost:3000/api/users/",
});

const LoginInstance = axios.create({
  baseURL: "http://localhost:3000/api/login/",
});

class APIguest {
  login = (email: string, password: string) => {
    return LoginInstance.post("", {
      email: email,
      password: password,
    });
  };

  signup = (name: string, email: string, password: string) => {
    return SignupInstance.post("", {
      name: name,
      email: email,
      password: password,
    });
  };
}

export default new APIguest();
