import {useContext} from "react";
import { useNavigate } from "react-router-dom";
import goBackIcon from "../assets/go-back.png";
import { AppContext } from "../context/AppContextProvider";

const GoBack = ()=>{
    const navigate = useNavigate();
    const {state,token} = useContext(AppContext);
    const back =()=>{
        if(state==="Profile")navigate("/user/profile");
        else if(state==="Home0")navigate("/");
        else if(state==="Home")navigate("/user");
        else if(state==="Author") token? navigate("/user") : navigate("/");
    }
    return(
        <div className="flex flex-row mt-10">
            <img className="cursor-pointer" src={goBackIcon} alt=" " width="35px" height="30px" onClick={back}/>
            <div className=" ml-2 text-2xl"> Go Back </div>
        </div>
    )
}

export default GoBack;