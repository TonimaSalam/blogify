import { useState, createContext } from "react";
import { userType } from "../utility/type-aliasing/user-type-aliasing";
import { blogType } from "../utility/type-aliasing/blog-type-aliasing";
import { AppContextType } from "../utility/type-aliasing/app-type-aliasing";
import { appContextDefaultValues } from "../utility/default-values/app-context-default-value";

type AppContextProviderProps = {
  children: React.ReactNode;
};
export const AppContext = createContext<AppContextType>(appContextDefaultValues);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, setState] = useState<string>(
    window.localStorage.getItem("state") || "Home0"
  );
  const [token, setToken] = useState<string>(
    window.localStorage.getItem("token") || ""
  );
  const storedPageNo = window.localStorage.getItem("pageNo");
  const [pageNo, setPageNo] = useState<number>(
    storedPageNo ? parseInt(storedPageNo) : 1
  );

  const storedNumberOfPages = window.localStorage.getItem("numberOfPages");
  const [numberOfPages, setNumberOfPages] = useState<number>(
    storedNumberOfPages ? parseInt(storedNumberOfPages) : 1
  );

  const storedUser = window.localStorage.getItem("user");
  const [user, setUser] = useState<userType | null>(
    storedUser ? JSON.parse(storedUser) : null
  );
  const storedAuthor = window.localStorage.getItem("author");
  const [author, setAuthor] = useState<userType | null>(
    storedAuthor ? JSON.parse(storedAuthor) : null
  );

  const storedBlog = window.localStorage.getItem("blog");
  const [blog, setBlog] = useState<blogType | null>(
    storedBlog ? JSON.parse(storedBlog) : null
  );

  const storedBlogs = window.localStorage.getItem("blogs");
  const [blogs, setBlogs] = useState<blogType[] | []>(
    storedBlogs ? JSON.parse(storedBlogs) : []
  );
  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        token,
        setToken,
        pageNo,
        setPageNo,
        numberOfPages,
        setNumberOfPages,
        user,
        setUser,
        author,
        setAuthor,
        blog,
        setBlog,
        blogs,
        setBlogs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
