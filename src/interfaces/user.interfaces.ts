export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  role: "user" | "admin";
  address: IAddress
}

export interface IAddress {
  city: string;
  street: string;
  zip: number;
}
