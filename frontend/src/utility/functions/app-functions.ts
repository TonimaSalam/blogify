import { blogType } from "../type-aliasing/blog-type-aliasing";
import {
  fetchNumberOfBlogs,
  fetchNumberOfMyBlogs,
  fetchBlogs,
  fetchMyBlogs,
  fetchPaginatedBlogs,
  fetchMyPaginatedBlogs,
} from "./blog-crud-functions";
export const tellMyStateAccordingPath = (path: string): string => {
  if (path === "/") {
    return "Home0";
  } else if (path === "/user") {
    return "Home";
  } else if (path === "/user/profile") {
    return "Profile";
  } else if (path === "/register") return "Sign Up";
  else if (path === "/login") return "Log In";
};

export const tellMeNumberOfPages = async (
  state: string,
  userID?: number
): Promise<number> => {
  const response: number =
    state === "Profile" && userID
      ? await fetchNumberOfMyBlogs(userID)
      : await fetchNumberOfBlogs();
  return Math.ceil(response / 5);
};

export const blogsAccordingState = async (
  state: string,
  token?: string
): Promise<blogType[] | []> => {
  const data: blogType[] | [] =
    state === "Profile" && token
      ? await fetchMyBlogs(token)
      : await fetchBlogs();
  return data;
};

export const paginatedBlogsAccordingState = async (
  state: string,
  pageNo: number,
  token?: string
): Promise<blogType[] | []> => {
  const data: blogType[] | [] =
    state === "Profile" && token
      ? await fetchMyPaginatedBlogs(pageNo,token)
      : await fetchPaginatedBlogs(pageNo);
  return data;
};
