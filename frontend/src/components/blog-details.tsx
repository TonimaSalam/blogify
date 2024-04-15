import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { fetchAuthor } from "../utility/functions/user-crud-functions";
import { deleteBlog } from "../utility/functions/blog-crud-functions";
import { toastObj } from "../utility/type-aliasing/user-type-aliasing";
import { toast } from "react-toastify";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import ConfirmationBlock from "./confirmation-block";
import GoBack from "./go-back";

const BlogDetails = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const { blog, author, setAuthor, user, token, state, setState,pageNo } =
    useContext(AppContext);
  const queryKey = state==="Profile"? "MyBlogs-" + user?.userID  : "AllBlogs" ;
  useEffect(() => {
    fetchAuthor(blog!.userID).then((data) => setAuthor(data));
  }, []);

  const editMyBlog = () => navigate("/blog/update");
  const deleteMyBlog = () => {
    if (isDelete) {
      deleteBlog(blog!.blogID, token)
        .then(() => {
          toast.success("blog delete successful.", toastObj);
          queryClient.invalidateQueries([`${queryKey}-${pageNo}`,state,pageNo]);
          state === "Profile"? navigate("/user/profile") : navigate("/user");
        })
        .catch((error) => toast.error(error.response.data, toastObj));
    } else setIsDelete(true);
  };
  const keepBlog = () => setIsDelete(false);
  const viewAuthor = () => {
    navigate("/author");
    setState("Author");
  };

  return (
    <div className="mt-[15%] mb-[15%] flex flex-col w-4/6 p-10 shadow-2xl mx-auto">
      <div className="flex flex-row">
        <div className="text-4xl text-slate-800 mb-2">{blog?.title}</div>
        {!isDelete && user?.userID === author?.userID && (
          <div className="flex flex-row top-0 left-0">
            <img
              className="mt-4 ml-2 h-6 w-6 shadow-md cursor-pointer"
              src={editIcon}
              onClick={editMyBlog}
            ></img>
            <img
              className="mt-4 ml-2 h-6 w-6 shadow-md cursor-pointer"
              src={deleteIcon}
              onClick={deleteMyBlog}
            ></img>
          </div>
        )}
      </div>
      {author?.userID != user?.userID && (
        <div className="pb-4">
          A blog by
          <u
            className="pl-2 text-slate-800 text-2xl cursor-pointer"
            onClick={viewAuthor}
          >
            {author?.username}
          </u>
        </div>
      )}
      {isDelete && (
        <ConfirmationBlock
          option="blog"
          handleDeleteOnClick={deleteMyBlog}
          handleKeepOnClick={keepBlog}
        ></ConfirmationBlock>
      )}
      <div>{blog?.content}</div>
      {state != " Author" && <GoBack></GoBack>}
    </div>
  );
};

export default BlogDetails;
