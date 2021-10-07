export interface IUserRegistration {
  name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name: string;
  password: string;
}

export interface ITaskCreate {
  title: string;
  done?: boolean;
  userId: string;
}

export interface ITaskUpdate {
  title?: string;
  done?: boolean;
}
