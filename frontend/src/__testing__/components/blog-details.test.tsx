import "@testing-library/jest-dom";
import { render,screen,fireEvent } from "@testing-library/react";
import BlogDetails from "../../components/blog-details";
import { AppContext } from "../../context/AppContextProvider";
import { AppContextType } from "../../utility/type-aliasing/app-type-aliasing";
import { appContextDefaultValues } from "../../utility/default-values/app-context-default-value";

const mockedUseNavigate = jest.fn();
const mockedUseQuery = jest.fn();
const mockToastSuccess = jest.fn();
const mockToastError = jest.fn();
const mockedGoBack = jest.fn();
const mockedConfirmationBlock = jest.fn();
const mockUser = {
  userID: 2,
  username: "mockUsername",
  useremail: "mockUseremail",
};
const mockBlog = {
  blogID:7,
  userID:2,
  title:"mockTitle",
  content:"mockContent"
}
const mockappContextValue = {
  ...appContextDefaultValues,
  blog: mockBlog,
  author: mockUser,
  setAuthor: jest.fn(),
  user : mockUser,
  token: "mockedToken",
  state: "Home",
  setState: jest.fn(),
};
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));
jest.mock("../../utility/functions/user-crud-functions");
jest.mock("../../utility/type-aliasing/user-type-aliasing");
jest.mock("react-toastify", () => ({
  ...jest.requireActual("react-toastify"),
  toast: {
    success: ()=>mockToastSuccess,
    error: ()=>mockToastError,
  },
}));
jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useQuery: ()=> mockedUseQuery,
}));

jest.mock("../../components/go-back", () => ({
  ...jest.requireActual("../../components/go-back"),
  GoBack: ()=> mockedGoBack,
}));
jest.mock("../../components/confirmation-block", () => ({
  ...jest.requireActual("../../components/confirmation-block"),
  ConfirmationBlock: ()=> mockedConfirmationBlock,
}));

const customRender = (ui: JSX.Element , {providerProps , ...renderOptions}: { providerProps:AppContextType; }) => {
  return render(
    <AppContext.Provider value ={{...providerProps}}>{ui}</AppContext.Provider>,
    renderOptions,
  )
}

describe("Testing BlogDetails component : ",()=>{
  it("Should render properly : ",()=>{
    const providerProps={
      ...mockappContextValue,
    };
    customRender(<BlogDetails></BlogDetails>,{providerProps});
    mockedUseQuery.mockReturnValue({mockUser});
    const blogTitleText = screen.getByText("mockTitle");
    expect(blogTitleText).toBeInTheDocument();
  })
  it("Should not show author name for user's blog : ", ()=>{
    const providerProps={
      ...mockappContextValue,
    };
    customRender(<BlogDetails></BlogDetails>,{providerProps});
    mockedUseQuery.mockReturnValue({mockUser});
    const authorText=screen.queryByText(/A blog by/i);
    expect(authorText).not.toBeInTheDocument();
  })
  it("Should edit blog on click : ", ()=>{
    const providerProps={
      ...mockappContextValue,
    };
    customRender(<BlogDetails></BlogDetails>,{providerProps});
    mockedUseQuery.mockReturnValue({mockUser});
    const buttons=screen.getAllByRole("img");
    fireEvent.click(buttons[0]);
    expect(mockedUseNavigate).toHaveBeenCalled();
  })
  it("Should delete blog on click : ", ()=>{
    const providerProps={
      ...mockappContextValue,
    };
    customRender(<BlogDetails></BlogDetails>,{providerProps});
    mockedUseQuery.mockReturnValue({mockUser});
    const buttons=screen.getAllByRole("img");
    fireEvent.click(buttons[1]);
    const confirmationBlockText= screen.getByText(/Are you sure you want to delete this blog?/i);
    expect(confirmationBlockText).toBeInTheDocument();
  })
})


