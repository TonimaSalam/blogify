import "@testing-library/jest-dom";
import { render, screen,fireEvent } from "@testing-library/react";
import ProfileInfo from "../../components/profile-info";
import { AppContext } from "../../context/AppContextProvider";
import { AppContextType } from "../../utility/type-aliasing/app-type-aliasing";
import { appContextDefaultValues } from "../../utility/default-values/app-context-default-value";

const mockedUseNavigate = jest.fn();
const mockedConfirmationBlock = jest.fn();
const mockUser = {
  userID: 2,
  username: "mockUsername",
  useremail: "mockUseremail",
};
const mockappContextValue = {
  ...appContextDefaultValues,
  user: mockUser,
  token: "mockToken",
};
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

jest.mock("../../components/confirmation-block", () => ({
  ...jest.requireActual("../../components/confirmation-block"),
  ConfirmationBlock: () => mockedConfirmationBlock,
}));
jest.mock("../../utility/functions/user-crud-functions");

const customRender = (
  ui: JSX.Element,
  { providerProps, ...renderOptions }: { providerProps: AppContextType }
) => {
  return render(
    <AppContext.Provider value={{ ...providerProps }}>
      {ui}
    </AppContext.Provider>,
    renderOptions
  );
};

describe("Testing ProfileInfo component : ", () => {
  it("Should render user properly : ", () => {
    const providerProps = {
      ...mockappContextValue,
    };
    customRender(<ProfileInfo></ProfileInfo>, { providerProps });
    const userName = screen.getByText(/mockUsername/i);
    expect(userName).toBeInTheDocument();
    const userEmail = screen.getByText(/mockUseremail/i);
    expect(userEmail).toBeInTheDocument();
  });
  it("Should edit profile on click : ", () => {
    const providerProps = {
      ...mockappContextValue,
    };
    customRender(<ProfileInfo></ProfileInfo>, { providerProps });
    const buttons = screen.getAllByRole("img");
    fireEvent.click(buttons[1]);
    expect(mockedUseNavigate).toHaveBeenCalled();
  });
  it("Should delete profile on click : ", () => {
    const providerProps = {
      ...mockappContextValue,
    };
    customRender(<ProfileInfo></ProfileInfo>, { providerProps });
    const buttons = screen.getAllByRole("img");
    fireEvent.click(buttons[2]);
    const confirmationBlockText = screen.getByText(
      /Are you sure you want to delete this profile?/i
    );
    expect(confirmationBlockText).toBeInTheDocument();
  });
});
