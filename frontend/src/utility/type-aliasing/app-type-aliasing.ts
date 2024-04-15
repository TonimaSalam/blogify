import { userType } from "./user-type-aliasing";
import { blogType } from "./blog-type-aliasing";

export type AppContextType = {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    pageNo: number;
    setPageNo: React.Dispatch<React.SetStateAction<number>>;
    numberOfPages: number;
    setNumberOfPages: React.Dispatch<React.SetStateAction<number>>;
    user: userType | null;
    setUser: React.Dispatch<React.SetStateAction<userType | null>>;
    author: userType | null;
    setAuthor: React.Dispatch<React.SetStateAction<userType | null>>;
    blog: blogType | null;
    setBlog: React.Dispatch<React.SetStateAction<blogType | null>>;
    blogs: [] | blogType[];
    setBlogs: React.Dispatch<React.SetStateAction<[] | blogType[]>>;
  };

  export const toastObj = {
    autoClose: 1000
  }

  export const boxClass = ["m-2 text-2xl h-full","m-1 text-3xl text-cyan-500 h-full cursor-pointer"]