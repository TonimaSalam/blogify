import  { useState } from "react";
import { boxClass } from "../utility/type-aliasing/app-type-aliasing";

type HeaderOptionPropType = {
    option:string;
    handleClick: () => void;
}

const HeaderOption = (props:HeaderOptionPropType)=>{
    const [headerClass, setHeaderClass] = useState<string>(boxClass[0]);
  
    const mouseEnter = () => setHeaderClass(boxClass[1]);
    const mouseLeave = () => setHeaderClass(boxClass[0]);

    return(
        <div
        className={headerClass}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onClick={props.handleClick}
      >
        {props.option}
      </div>
    )
}

export default HeaderOption;