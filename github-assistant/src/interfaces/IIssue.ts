import { IUser } from "./IUser";

export interface IIssue {
    id: string;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    user: IUser;
  }
  