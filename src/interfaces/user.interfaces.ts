import { Model } from "mongoose";

//=================address interface========================
export interface IAddress {
  city: string;
  street: string;
  zip: number;
}

//=================note interface========================
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  role: "user" | "admin";
  address: IAddress
}

//instance methods
export interface UserInstanceMethods{
  hasPassword(password: string): Promise<string>
}

//static methods
export interface UserStaticMethods extends Model<IUser>{
  hasPassword(password: string): Promise<string>
}

