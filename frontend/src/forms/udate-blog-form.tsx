import { SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { BlogFormFieldsType } from "../utility/type-aliasing/blog-type-aliasing";
import { updateBlog } from "../utility/functions/blog-crud-functions";
import { toastObj } from "../utility/type-aliasing/user-type-aliasing";
import { toast } from "react-toastify";

const UpdateBlogForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { blog, token, state,user,pageNo } = useContext(AppContext);
  const queryKey = state==="Profile"? "MyBlogs-" + user?.userID  : "AllBlogs" ;
   const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogFormFieldsType>();

  const onSubmit: SubmitHandler<BlogFormFieldsType> = (data) => {
    console.log(data);
    updateBlog(blog.blogID, data, token)
      .then(() => {
        toast.success("Blog update successful.", toastObj);
        queryClient.invalidateQueries([`${queryKey}-${pageNo}`,state,pageNo]);
        state === "Profile" ? navigate("/user/profile") : navigate("/user");
      })
      .catch((error) => toast.error(error.response.data, toastObj));
  };
  return (
    <div className="mt-48 mb-6 flex flex-col h-1/2 w-1/4 p-8 bg-[#E8C872] mx-auto rounded-md">
      <u className=" mt-4 text-4xl  text-slate-800 flex items-center justify-center">
        Update Blog
      </u>
      <div>
        <form
          className="mt-4 flex flex-col mb-16 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-4 text-xl  text-slate-800 mb-2">Title : </div>
          <input
            className="h-9 rounded-md p-2"
            {...register("title", {
              required: "Title is required.",
            })}
            onChange={(event) => setValue("title", event.target.value)}
            defaultValue={blog?.title}
          ></input>
          {errors.title && (
            <div className="text-red-700">{errors.title.message}</div>
          )}
          <div className="mt-4 text-xl  text-slate-800 mb-2">Content : </div>
          <textarea
            className="h-36 rounded-md p-2"
            {...register("content", {
              required: "Content is required.",
            })}
            onChange={(event) => setValue("content", event.target.value)}
            defaultValue={blog?.content}
          ></textarea>
          {errors.content && (
            <div className="text-red-700">{errors.content.message}</div>
          )}
          <button
            className="mt-6 mb-5 mx-auto w-1/3 h-12 bg-slate-800 text-cyan-50 rounded-md"
            type="submit"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlogForm;
