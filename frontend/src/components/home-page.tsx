import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContextProvider";
import { useQuery } from "react-query";
import { blogType } from "../utility/type-aliasing/blog-type-aliasing";
import { useLocation } from "react-router-dom";
import Blog from "./blog";
import ProfileInfo from "./profile-info";
import Pagination from "./pagination";
import {
  tellMyStateAccordingPath,
  tellMeNumberOfPages,
  paginatedBlogsAccordingState,
} from "../utility/functions/app-functions";
const HomePage = () => {
  const location = useLocation();
  const {
    state,
    setState,
    blogs,
    setBlogs,
    token,
    user,
    pageNo,
    setNumberOfPages,
  } = useContext(AppContext);

  const queryKey = state==="Profile"? "MyBlogs-" + user?.userID  : "AllBlogs" ;
  useEffect(() => {
    const myState: string = tellMyStateAccordingPath(location.pathname);
    if (myState) setState(myState);
  }, [location, setState]);

  useEffect(() => {
    tellMeNumberOfPages(state, user?.userID).then((response) =>
      setNumberOfPages(response)
    );
  }, [state]);

  const {data} = useQuery([`${queryKey}-${pageNo}`,state,pageNo],
  ()=> {return paginatedBlogsAccordingState(state, pageNo, token)},
  {
    staleTime: 5 * 60 * 1000,
  }
  )

  useEffect(() => {
    setBlogs(data? data : [])
  }, [state, pageNo,data]);

  return (
    <>
      <div className="w-full pt-36 pb-28 flex flex-col justify-center items-center">
        {state === "Profile" && <ProfileInfo></ProfileInfo>}
        {blogs &&
          blogs.map((blog: blogType, index: number) => (
            <div className="w-4/6 m-10 p-10 shadow-2xl  " key={index}>
              <Blog blog={blog} index={index}></Blog>
            </div>
          ))}
        {blogs.length!=0 && <Pagination></Pagination>}
      </div>
    </>
  );
};

export default HomePage;
