import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../../components/header";
import { AppContext } from "../../context/AppContextProvider";
import { AppContextType } from "../../utility/type-aliasing/app-type-aliasing";
import { appContextDefaultValues } from "../../utility/default-values/app-context-default-value";

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));
const mockappContextValue = {
  ...appContextDefaultValues,
  setState: jest.fn(),
  setToken: jest.fn(),
  setPageNo: jest.fn(),
  token: "mockToken",
};

const customRender = (ui: JSX.Element , {providerProps , ...renderOptions}: { providerProps:AppContextType; }) => {
    return render(
      <AppContext.Provider value ={{...providerProps}}>{ui}</AppContext.Provider>,
      renderOptions,
    )
  }

  describe("Testing Header component : ", ()=>{
    it("Should render properly for state Home0 : ",()=>{
        const providerProps={
            ...mockappContextValue,
            state: "Home0",
          };
        customRender(<Header></Header>,{providerProps});
        const signUpLogInText=screen.getByText("Sign Up/Log In");
        expect(signUpLogInText).toBeInTheDocument();
    })
    it("Should render properly for state Home : ",()=>{
        const providerProps={
            ...mockappContextValue,
            state: "Home",
          };
        customRender(<Header></Header>,{providerProps});
        const profileText=screen.getByText(/Profile/i);
        expect(profileText).toBeInTheDocument();
        const createBlogText=screen.getByText(/Create Blog/i);
        expect(createBlogText).toBeInTheDocument();
        const logOutText=screen.getByText(/Log Out/i);
        expect(logOutText).toBeInTheDocument();
    })
    it("Should render properly for state Profile : ",()=>{
        const providerProps={
            ...mockappContextValue,
            state: "Profile",
          };
        customRender(<Header></Header>,{providerProps});
        const homeText=screen.getByText(/Home/i);
        expect(homeText).toBeInTheDocument();
        const createBlogText=screen.getByText(/Create Blog/i);
        expect(createBlogText).toBeInTheDocument();
        const logOutText=screen.getByText(/Log Out/i);
        expect(logOutText).toBeInTheDocument();
    })
  })