import  { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { toastObj } from "../utility/type-aliasing/user-type-aliasing";
import { toast } from "react-toastify";
import HeaderOption from "./header-options";

const Header = () => {
  const navigate = useNavigate();
  const { state, setState, setToken,setPageNo,token } = useContext(AppContext);

  const onClickSignUp = () => {
    setState("Registration");
    navigate("/login");
  };

  const onClickProfile = () => {
    setPageNo(1);
    setState("Profile");
    navigate("/user/profile");
  };

  const onClickHome = () => {
    setPageNo(1);
    setState("Home");
    token? navigate("/user/") : navigate("/");
  };

  const onClickCreateBlog = () => {
    navigate("/blog/");
  };

  const onClickLogOut = () => {
    toast.error("You are logged out.", toastObj);
    setState("Home0");
    setPageNo(1);
    navigate("/");
    setToken("");
  };

return (
  <div className="h-24 fixed top-0 w-full bg-gray-800 text-white p-6 pl-36 pr-36 flex flex-row justify-end">
    {(state === "Home0"||(state==="Author" && !token)) && (
      <HeaderOption option="Sign Up/Log In" handleClick={onClickSignUp}></HeaderOption>
    )}
      {(state == "Profile"||(state==="Author" && token) || state==="Registration" || state==="Login") && (
        <HeaderOption option="Home" handleClick={onClickHome}></HeaderOption>
      )}
    {(state == "Home"|| (state==="Author" && token)) && (
      <HeaderOption option="Profile" handleClick={onClickProfile}></HeaderOption>
    )}
    {(state == "Home" || state == "Profile" || (state==="Author" && token)) && (
      <HeaderOption option="Create Blog" handleClick={onClickCreateBlog}></HeaderOption>
    )}
    {(state == "Home" || state == "Profile" || (state==="Author" && token)) && (
      <HeaderOption option="Log Out" handleClick={onClickLogOut}></HeaderOption>
    )}
  </div>
);
};

export default Header;
