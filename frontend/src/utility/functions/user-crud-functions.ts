import axios from "axios";
import {
  RegistrationFormFieldsType,
  LogInFormFieldsType,
  updateUserFormFieldsType,
} from "../type-aliasing/user-type-aliasing";
const baseUrl = "http://localhost:4000/api/v1/";

export async function fetchAuthor(authorID: number) {
  const url = baseUrl + "author/" + authorID;
  const response = await axios.get(url);
  return {
    userID: authorID,
    username: response.data[0].username,
    useremail: response.data[0].useremail,
  };
}

export async function fetchUser(accessToken: string) {
  const url = baseUrl + "user";
  const response = await axios.get(url, {
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
      "authorization": accessToken,
    },
  });
  return {
    userID: response.data[0].userID,
    username: response.data[0].username,
    useremail: response.data[0].useremail,
  };
}

export async function signUp(body: RegistrationFormFieldsType) {
  const url = baseUrl + "register";
  const response = axios.post(url, body, {
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response;
}
export async function logIn(body: LogInFormFieldsType) {
  const url = baseUrl + "login";
  const response = axios.post(url, body, {
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response;
}

export async function deleteUser(token: string) {
  const url = baseUrl + "user";
  const response = await axios.delete(url, {
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
      "authorization": token,
    },
  });
  return response;
}

export async function updateUser(
  token: string,
  body: updateUserFormFieldsType
) {
  const url = baseUrl + "user";
  const response = await axios.patch(url, body, {
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
      "authorization": token,
    },
  });
  return response;
}
