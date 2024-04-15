import { AppContextType } from "../type-aliasing/app-type-aliasing";
import img1 from "../../assets/image1.jpg";
import img2 from "../../assets/image2.jpg";
import img3 from "../../assets/image3.jpg";
import img4 from "../../assets/image4.jpg";
import img5 from "../../assets/image5.png";
import img6 from "../../assets/image6.jpg";

export const appContextDefaultValues: AppContextType = {
    state: "Home0",
    setState: () => {},
    token: "",
    setToken: () => {},
    pageNo: 1,
    setPageNo: () => {},
    numberOfPages: 1,
    setNumberOfPages: () => {},
    user: null,
    setUser: () => {},
    author: null,
    setAuthor: () => {},
    blog: null,
    setBlog: () => {},
    blogs: [],
    setBlogs: () => {},
  };

  export const images = [img1,img2,img3,img4,img5,img6];
  export const colours = ["#FFECD6","#E8C872","#C9D7DD"];