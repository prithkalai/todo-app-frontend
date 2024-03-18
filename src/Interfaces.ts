export interface Todo {
  _id: string;
  data: string;
  completed: boolean;
}

export interface Login {
  email: string;
  password: string;
}

export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface CustomError {
  state: Boolean;
  message: String;
}
