import { ImageSourcePropType } from "react-native";

export interface ICardItem {
  name: string;
  description: string;
  language: string;
  star: number;
  fork: number;
}

export interface IUser {
  id: string;
  username: string | null;
  fullname?: string | null;
  email?: string | null;
  socialType: string;
  creationDate?: number;
  photo?: string | null;
}

export interface ICategory {
  name: string;
  icon: ImageSourcePropType;
}

export interface Transaction {
  name: string;
  date: number;
  value: number;
}
