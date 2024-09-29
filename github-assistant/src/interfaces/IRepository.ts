import { IUser } from "./IUser";

export interface IRepository {
    id: string;
    name: string;
    description: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    url: string;
    owner: IUser;
  }
  