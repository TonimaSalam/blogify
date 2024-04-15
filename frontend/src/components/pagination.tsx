import { useContext } from "react";
import prevIcon from "../assets/prev.png";
import nextIcon from "../assets/next.png";
import prevGrayIcon from "../assets/prev-gray.png";
import nextGrayIcon from "../assets/next-gray.png";
import { AppContext } from "../context/AppContextProvider";

const Pagination = () => {
  const { state, pageNo, setPageNo, numberOfPages } = useContext(AppContext);
  const prevPage = () => setPageNo(Math.max(pageNo - 1, 1));
  const nextPage = () => setPageNo(Math.min(pageNo + 1, numberOfPages));

  return (
    <>
      {!(state === "Sign Up" || state === "Log In") && (
        <div className="flex flex-row ">
          {pageNo > 1 ? (
            <div
              className="m-2 cursor-pointer"
              data-testid="prev"
              onClick={prevPage}
            >
              <img src={prevIcon} alt=" " width="35px" height="30px" />
            </div>
          ) : (
            <div className="m-2" data-testid="prevGray">
              <img src={prevGrayIcon} alt=" " width="35px" height="30px" />
            </div>
          )}
          <div className=" bg-slate-800 pl-3 pr-3 text-4xl text-white rounded-md ml-3 mr-3">
            {pageNo}
          </div>
          {pageNo < numberOfPages ? (
            <div
              className="m-2 cursor-pointer"
              data-testid="next"
              onClick={nextPage}
            >
              <img src={nextIcon} alt=" " width="35px" height="30px" />
            </div>
          ) : (
            <div className="m-2" data-testid="nextGray">
              <img src={nextGrayIcon} alt=" " width="35px" height="30px" />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Pagination;
