import "@testing-library/jest-dom";
import { render,screen } from "@testing-library/react";
import AuthorProfileInfo from "../../components/author-profile";
import { AppContext } from "../../context/AppContextProvider";
import { AppContextType } from "../../utility/type-aliasing/app-type-aliasing";
import { appContextDefaultValues } from "../../utility/default-values/app-context-default-value";

const mockedUseNavigate = jest.fn();
const mockedBlog = jest.fn();
const mockAuthor = {
    userID: 2,
    username: "mockUsername",
    useremail: "mockUseremail",
  };
  const mockBlogs = [{
    blogID:7,
    userID:2,
    title:"mockTitle",
    content:"mockContent"
  },
  {blogID:13,
    userID:2,
    title:"mockTitle1",
    content:"mockContent1"
  },
]
  const mockappContextValue = {
    ...appContextDefaultValues,
    blogs: mockBlogs,
    author: mockAuthor,
    setBlogs: jest.fn(),
  };
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUseNavigate,
  }));

  jest.mock("../../components/Blog", () => ({
    ...jest.requireActual("../../components/Blog"),
    Blog: ()=> mockedBlog,
  }));

  const customRender = (ui: JSX.Element , {providerProps , ...renderOptions}: { providerProps:AppContextType; }) => {
    return render(
      <AppContext.Provider value ={{...providerProps}}>{ui}</AppContext.Provider>,
      renderOptions,
    )
  }

  describe("Testing AuthorProfileInfo component : ", ()=>{
    it("Should render author properly : ",()=>{
        const providerProps={
            ...mockappContextValue,
          };
        customRender(<AuthorProfileInfo></AuthorProfileInfo>,{providerProps});
        const authorName = screen.getByText(/mockUsername/i);
        expect(authorName).toBeInTheDocument();
        const authorEmail = screen.getByText(/mockUseremail/i);
        expect(authorEmail).toBeInTheDocument();
    })
    it("Should render blogs properly : ",()=>{
        const providerProps={
            ...mockappContextValue,
          };
        customRender(<AuthorProfileInfo></AuthorProfileInfo>,{providerProps});
        const blogTitle = screen.getByText("mockTitle");
        expect(blogTitle).toBeInTheDocument();
        const blogTitle1 = screen.getByText("mockTitle1");
        expect(blogTitle1).toBeInTheDocument();
    })
  })