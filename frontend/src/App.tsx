import React, { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContextProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./components/home-page";
import LogInForm from "./forms/login-form";
import RegistrationForm from "./forms/registration-form";
import UpdateUserForm from "./forms/update-user-form";
import CreateBlogForm from "./forms/create-blog-form";
import UpdateBlogForm from "./forms/udate-blog-form";
import BlogDetails from "./components/blog-details";
import AuthorProfileInfo from "./components/author-profile";

const queryClient = new QueryClient();
function App() {
  const { state, token, pageNo, numberOfPages, user, author, blog, blogs } =
    useContext(AppContext);
  useEffect(() => {
    window.localStorage.setItem("state", state);
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("pageNo", pageNo.toString());
    window.localStorage.setItem("numberOfPages", numberOfPages.toString());
    window.localStorage.setItem("user", JSON.stringify(user));
    window.localStorage.setItem("author", JSON.stringify(author));
    window.localStorage.setItem("blog", JSON.stringify(blog));
    window.localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [state, token, pageNo, numberOfPages, user, author, blog, blogs]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Header></Header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<HomePage />} />
            <Route path="/user/profile" element={<HomePage />} />
            <Route
              path="/user/update"
              element={<UpdateUserForm />}
            />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LogInForm />} />
            <Route path="/blog/" element={<CreateBlogForm />} />
            <Route
              path="/blog/update"
              element={<UpdateBlogForm />}
            />
            <Route path="/blog/details" element={<BlogDetails />} />
            <Route path="/author" element={<AuthorProfileInfo />} />
          </Routes>
          <Footer></Footer>
        </Router>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
