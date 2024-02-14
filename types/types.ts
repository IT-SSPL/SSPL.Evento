export interface IUser {
  id: string;
  name: string;
  surname: string;
  role: string;
  email: string;
  description: string;
  phone: string;
  image_path: string;
  room: string;
}

export interface IModule {
  name: string;
  path: string;
}
