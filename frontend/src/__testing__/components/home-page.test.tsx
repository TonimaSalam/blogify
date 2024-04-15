import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HomePage from "../../components/home-page";
import { AppContext } from "../../context/AppContextProvider";
import { AppContextType } from "../../utility/type-aliasing/app-type-aliasing";
import { appContextDefaultValues } from "../../utility/default-values/app-context-default-value";

const mockedUseLocation = jest.fn();
const mockedUseQuery = jest.fn();
const mockTellMyStateAccordingPath = jest.fn();
const mockTellMeNumberOfPages = jest.fn();
const mockPaginatedBlogsAccordingState = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => mockedUseLocation,
  useNavigate: ()=>jest.fn(),
}));
jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useQuery: () => mockedUseQuery,
}));
jest.mock("../../utility/functions/app-functions", () => ({
  ...jest.requireActual("../../utility/functions/app-functions"),
  tellMyStateAccordingPath:()=> mockTellMyStateAccordingPath,
  tellMeNumberOfPages: async()=>mockTellMeNumberOfPages,
  paginatedBlogsAccordingState: async()=> mockPaginatedBlogsAccordingState,
}));
const mockedBlog = jest.fn();
jest.mock("../../components/blog", () => ({
  ...jest.requireActual("../../components/blog"),
  Blog: () => mockedBlog,
}));
const mockedProfileInfo = jest.fn();
jest.mock("../../components/profile-info", () => ({
  ...jest.requireActual("../../components/profile-info"),
  ProfileInfo: () => mockedProfileInfo,
}));
const mockedPagination = jest.fn();
jest.mock("../../components/pagination", () => ({
  ...jest.requireActual("../../components/pagination"),
  Pagination: () => mockedPagination,
}));
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
];
const mockUser = {
    userID: 2,
    username: "mockUsername",
    useremail: "mockUseremail",
  };
const mockappContextValue = {
    ...appContextDefaultValues,
    state:"Home",
    setState:jest.fn(),
    blogs:mockBlogs,
    setBlogs:jest.fn(),
    token:"mockToken",
    user:mockUser,
    pageNo:1,
    setNumberOfPages:jest.fn(),
  };

const customRender = (ui: JSX.Element , {providerProps , ...renderOptions}: { providerProps:AppContextType; }) => {
    return render(
      <AppContext.Provider value ={{...providerProps}}>{ui}</AppContext.Provider>,
      renderOptions,
    )
  }

describe("Testing HomePage component : ",()=>{
    it("Should render properly : ",async ()=>{
        mockedUseLocation.mockReturnValue("/user");
        mockTellMyStateAccordingPath.mockReturnValue("Home");
        mockTellMeNumberOfPages.mockResolvedValue(4);
        mockPaginatedBlogsAccordingState.mockResolvedValue(mockBlogs)
        const providerProps={
            ...mockappContextValue,
          };
        await customRender(<HomePage></HomePage>,{providerProps});
        mockedUseQuery.mockReturnValue({mockBlogs});
        const blogTitle = screen.getByText("mockTitle");
        expect(blogTitle).toBeInTheDocument();
        const blogTitle1 = screen.getByText("mockTitle1");
        expect(blogTitle1).toBeInTheDocument();
    })
})