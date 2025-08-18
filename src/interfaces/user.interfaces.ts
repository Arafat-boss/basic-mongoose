export interface IAddress {
  city: string;
  street: string;
  zip: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  role: "user" | "admin";
  address: IAddress
}

export interface UserInstanceMethods{
  hasPassword(password: string): Promise<string>
}

