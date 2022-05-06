export interface UserCreate {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
