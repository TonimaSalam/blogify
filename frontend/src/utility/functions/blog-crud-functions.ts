import axios from "axios";
import { BlogFormFieldsType } from "../type-aliasing/blog-type-aliasing";

const baseUrl = "http://localhost:4000/api/v1/blog/";

export async function fetchNumberOfBlogs() {
  const url = baseUrl + "blog-count";
  const response = await axios.get(url);
  return response.data.noOfBlogs;
}

export async function fetchNumberOfMyBlogs(userID: number) {
  const url = baseUrl + "blog-count/" + userID;
  const response = await axios.get(url);
  return response.data.noOfBlogs;
}

export async function fetchBlogs() {
  const response = await axios.get(baseUrl);
  return response.data;
}

export async function fetchMyBlogs(token: string) {
  const url = baseUrl + "author/my-blogs";
  const response = await axios.get(url, {
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
      "authorization": token,
    },
  });
  return response.data;
}

export async function fetchAuthorsBlogs(authorID: number) {
  const url = baseUrl + "author/" + authorID;
  const response = await axios.get(url);
  return response.data;
}

export async function fetchPaginatedBlogs(pageNo: number) {
  const url = baseUrl + "5/" + pageNo;
  const response = await axios.get(url);
  return response.data;
}

export async function fetchMyPaginatedBlogs(pageNo: number, token: string) {
  const url = baseUrl + "author/my-blogs/5/" + pageNo;
  const response = await axios.get(url, {
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
      "authorization": token,
    },
  });
  return response.data;
}

export async function createBlog(formData: BlogFormFieldsType, token: string) {
  const response = await axios.post(baseUrl, formData, {
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
      "authorization": token,
    },
  });
  return response;
}

export async function updateBlog(
  blogID: number,
  formData: BlogFormFieldsType,
  token: string
) {
  const url = baseUrl + blogID;
  const response = await axios.patch(url, formData, {
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
      "authorization": token,
    },
  });
  return response;
}

export async function deleteBlog(blogID: number, token: string) {
  const url = baseUrl + blogID;
  const response = await axios.delete(url, {
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
      "authorization": token,
    },
  });
  return response;
}
