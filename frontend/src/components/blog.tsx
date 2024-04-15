import { useContext, useState } from "react";
import { AppContext } from "../context/AppContextProvider";
import { blogType } from "../utility/type-aliasing/blog-type-aliasing";
import { useNavigate } from "react-router-dom";
import { images } from "../utility/default-values/app-context-default-value";

type blogPropType = {
  blog: blogType;
  index: number;
};

const Blog = (props: blogPropType) => {
  const navigate = useNavigate();
  const [view, setView] = useState<boolean>(false);
  const { setBlog, state } = useContext(AppContext);
  const detailsViev = () => {
    if (state === "Author") setView(true);
    else {
      setBlog(props.blog);
      navigate("/blog/details");
    }
  };

  const lessView = () => setView(false);

  return (
    <div className="flex flex-row">
      {props.index % 2 == 1 && (
        <img
          className="mr-5 ml-5"
          src={images[props.index % 6]}
          width="300px"
          height="30px"
        ></img>
      )}
      <div>
        <div className="text-4xl pb-6 text-slate-800">{props.blog.title}</div>
        {view == true ? (
          <div>
            {props.blog.content}
            <u
              className="text-blue-800 pl-2 cursor-pointer"
              onClick={lessView}
            >
              Show less
            </u>
            ...
          </div>
        ) : (
          <div>
            {props.blog.content.slice(0, 300)}
            <u
              className="text-blue-800 pl-2 cursor-pointer"
              onClick={detailsViev}
            >
              Show more
            </u>
            ...
          </div>
        )}
      </div>
      {!(props.index % 2) && (
        <img
          className="mr-5 ml-5"
          src={images[props.index % 6]}
          width="300px"
          height="30px"
        ></img>
      )}
    </div>
  );
};

export default Blog;
