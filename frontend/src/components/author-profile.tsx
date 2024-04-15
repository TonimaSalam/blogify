import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContextProvider";
import userIcon from "../assets/user.png";
import { fetchAuthorsBlogs } from "../utility/functions/blog-crud-functions";
import Blog from "./blog";
import { blogType } from "../utility/type-aliasing/blog-type-aliasing";

const AuthorProfileInfo = () => {
  const { author, blogs, setBlogs } = useContext(AppContext);
  useEffect(() => {
    fetchAuthorsBlogs(author.userID).then((response) => setBlogs(response))
      .catch((error)=>{console.log(error.response.data)});
  }, []);

  return (
    <div className="w-full pt-36 pb-28 flex flex-col justify-center items-center">
      <div className="flex flex-row mt-10 mb-10">
        <img
          className=" ml-10 h-56 w-56 shadow-md rounded-full"
          src={userIcon}
        ></img>
        <div className="flex flex-col ml-14 mr-14 mt-36">
          <div className=" text-4xl text-slate-800">{author?.username}</div>
          <div> user email : {author?.useremail}</div>
        </div>
      </div>
      {blogs &&
          blogs.map((blog: blogType, index: number) => (
            <div className="w-4/6 m-10 p-10 shadow-2xl  " key={index}>
              <Blog blog={blog} index={index}></Blog>
            </div>
          ))}
    </div>
  );
};
export default AuthorProfileInfo;
