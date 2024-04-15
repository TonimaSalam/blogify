import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import { deleteUser } from "../utility/functions/user-crud-functions";
import { toastObj } from "../utility/type-aliasing/user-type-aliasing";
import { toast } from "react-toastify";
import userIcon from "../assets/user.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import ConfirmationBlock from "./confirmation-block";

const ProfileInfo = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const deleteMyProfile = () => {
    if (isDelete) {
      deleteUser(token)
        .then(() => {
          toast.success("user delete successful.", toastObj); 
          navigate("/");})
        .catch((error) => {
          toast.error(error.response.data, toastObj);
          navigate("/user/profile");
        });
    } else setIsDelete(true);
  };

  const keepMyProfile = () => setIsDelete(false);
  const editMyProfile = () => navigate("/user/update");

  return (
    <div className="flex flex-col bg-transparent mb-6 w-3/6 m-10 mx-auto">
      <div className="flex flex-row mb-4">
        <div className="flex flex-col">
          <img
            className=" ml-10 h-56 w-56 shadow-md rounded-full"
            src={userIcon}
          ></img>
          {!isDelete && (
            <div>
              <img
                className= "h-10 w-10 ml-48 -mt-10 shadow-md cursor-pointer"
                src={editIcon}
                onClick={editMyProfile}
              ></img>
              <img
                className="h-10 w-10 ml-60 -mt-10 shadow-md cursor-pointer"
                src={deleteIcon}
                onClick={deleteMyProfile}
              ></img>
            </div>
          )}
        </div>
        <div className="flex flex-col ml-14 mr-14 mt-28">
          <div className=" text-4xl text-slate-800">{user?.username}</div>
          <div> user email : {user?.useremail}</div>
          <div> user ID : {user?.userID}</div>
        </div>
      </div>
      <div>
        {isDelete && (
          <ConfirmationBlock
            option="profile"
            handleDeleteOnClick={deleteMyProfile}
            handleKeepOnClick={keepMyProfile}
          ></ConfirmationBlock>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
