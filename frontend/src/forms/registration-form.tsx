import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContextProvider";
import {
  usernameValidator,
  emailValidator,
  passwordValidator,
} from "../utility/validator";
import { useNavigate } from "react-router-dom";
import { signUp, fetchUser } from "../utility/functions/user-crud-functions";
import {
  RegistrationFormFieldsType,
  toastObj,
} from "../utility/type-aliasing/user-type-aliasing";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string | null>(null);
  const { setState, setToken, setUser,setPageNo } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormFieldsType>();

  const onSubmit: SubmitHandler<RegistrationFormFieldsType> = (data) => {
    signUp(data)
      .then((response) => {
        toast.success("Registration sucessfull", toastObj);
        const accessToken = response.data;
        setToken(accessToken);
        fetchUser(accessToken)
          .then((response) => setUser(response))
          .catch((error) => toast.error(error.response.data, toastObj));
        setState("Home");
        setPageNo(1);
        navigate("/user/");
      })
      .catch((error) => toast.error(error.response.data, toastObj));
  };

  const logIn = () => {
    setState("Log In");
    navigate("/login");
  };
  return (
    <div className="mt-48 mb-6 flex flex-col h-1/2 w-1/4 p-8 bg-[#E8C872] mx-auto rounded-md">
      <u className=" mt-4 text-4xl  text-slate-800 flex items-center justify-center">
        Sign Up
      </u>
      <div>
        <form
          className="mt-4 flex flex-col mb-16 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-4 text-xl  text-slate-800 mb-2">User Name : </div>
          <input
            className="h-9 rounded-md p-2"
            {...register("username", {
              validate: (value) => {
                const msg: string | null = usernameValidator(value);
                if (msg) return msg;
              },
            })}
          ></input>
          {errors.username && (
            <div className="text-red-700">{errors.username.message}</div>
          )}
          <div className="mt-4 text-xl  text-slate-800 mb-2">User Email : </div>
          <input
            className="h-9 rounded-md p-2"
            {...register("useremail", {
              validate: (value) => {
                const msg: string | null = emailValidator(value);
                if (msg) return msg;
              },
            })}
            type="text"
          ></input>
          {errors.useremail && (
            <div className="text-red-700">{errors.useremail.message}</div>
          )}
          <div className="mt-4 text-xl  text-slate-800 mb-2">Password : </div>
          <input
            className="h-9 rounded-md p-2"
            {...register("password", {
              validate: (value) => {
                const msg: string | null = passwordValidator(value);
                if (!msg) setPassword(value);
                if (msg) return msg;
              },
            })}
            type="password"
          ></input>
          {errors.password && (
            <div className="text-red-700">{errors.password.message}</div>
          )}
          <div className="mt-4 text-xl  text-slate-800 mb-2">
            Re-enter Password
          </div>
          <input
            className="h-9 rounded-md p-2"
            {...register("reEnteredPassword", {
              validate: (value) => {
                if (!value) return "Value required.";
                else if (value != password) return "Password doesn't match.";
              },
            })}
            type="password"
          ></input>
          {errors.reEnteredPassword && (
            <div className="text-red-700">
              {errors.reEnteredPassword.message}
            </div>
          )}
          <button
            className="mt-6 mb-5 mx-auto w-1/3 h-12 bg-slate-800 text-cyan-50 rounded-md"
            type="submit"
          >
            Sign Up
          </button>
          <div className="text-lg  text-slate-800 mx-auto">
            Already have an account?{" "}
            <u
              className="text-blue-800 text-2xl cursor-pointer"
              onClick={logIn}
            >
              Log In
            </u>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
