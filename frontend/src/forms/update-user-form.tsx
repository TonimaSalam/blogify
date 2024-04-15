import { SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import { passwordValidator } from "../utility/validator";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../utility/functions/user-crud-functions";
import {
  updateUserFormFieldsType,
  toastObj,
} from "../utility/type-aliasing/user-type-aliasing";
import { toast } from "react-toastify";

const UpdateUserForm = () => {
  const navigate = useNavigate();
  const { setState, token, setToken } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateUserFormFieldsType>();
  const onSubmit: SubmitHandler<updateUserFormFieldsType> = (data) => {
    console.log(data);
    updateUser(token, data)
      .then((response) => {
        toast.success(response.data, toastObj);
        setState("Home0");
        setToken("");
        navigate("/");
      })
      .catch((error) => toast.error(error.response.data, toastObj));
  };
  return (
    <div className="mt-48 mb-6 flex flex-col h-1/2 w-1/4 p-8 bg-[#E8C872] mx-auto rounded-md">
      <u className=" mt-4 text-4xl  text-slate-800 flex items-center justify-center">
        Update User
      </u>
      <div>
        <form
          className="mt-4 flex flex-col mb-16 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-4 text-xl  text-slate-800 mb-2">New Password : </div>
          <input
            className="h-9 rounded-md p-2"
            {...register("newPassword", {
              validate: (value) => {
                const msg: string | null = passwordValidator(value);
                if (msg) return msg;
              },
            })}
            type="password"
          ></input>
          {errors.newPassword && (
            <div className="text-red-700">{errors.newPassword.message}</div>
          )}
          <div className="mt-4 text-xl  text-slate-800 mb-2">Old Password : </div>
          <input
            className="h-9 rounded-md p-2"
            {...register("oldPassword")}
            type="password"
          ></input>
          <button
            className="mt-6 mb-5 mx-auto w-1/3 h-12 bg-slate-800 text-cyan-50 rounded-md"
            type="submit"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserForm;