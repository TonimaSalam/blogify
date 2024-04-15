import "@testing-library/jest-dom";
import { render, screen,fireEvent } from "@testing-library/react";
import RegistrationForm from "../../forms/registration-form";
import { AppContext } from "../../context/AppContextProvider";
import { AppContextType } from "../../utility/type-aliasing/app-type-aliasing";
import { appContextDefaultValues } from "../../utility/default-values/app-context-default-value";

const mockedUseNavigate = jest.fn();
const mockedUseQueryClient = jest.fn();
const mockedHandleSubmit= jest.fn();
const mockUser = {
  userID: 2,
  username: "mockUsername",
  useremail: "mockUseremail",
};
const providerProps = {
  ...appContextDefaultValues,
  user: mockUser,
  token: "mockedToken",
  state: "Home",
  pageNo: 2,
};
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
      handleSubmit: () => mockedHandleSubmit,
      register: jest.fn(),
      control: {
          register: jest.fn(),
          unregister: jest.fn(),
          getFieldState: jest.fn(),
          _names: {
              array: new Set('test'),
              mount: new Set('test'),
              unMount: new Set('test'),
              watch: new Set('test'),
              focus: 'test',
              watchAll: false,
          },
          _subjects: {
              watch: jest.fn(),
              array: jest.fn(),
              state: jest.fn(),
          },
          _getWatch: jest.fn(),
          _formValues: ['test'],
          _defaultValues: ['test'],
      },
      getValues: () => {
          return [];
      },
      setValue: () => jest.fn(),
      formState: () => jest.fn(),
      watch: () => jest.fn(),
  }),
  Controller: () => [],
  useSubscribe: () => ({
      r: {current: {subject: {subscribe: () => jest.fn()}}},
  }),
}))

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

jest.mock("../../utility/functions/user-crud-functions")
jest.mock("../../utility/validator");
jest.mock("react-toastify", () => ({
  ...jest.requireActual("react-toastify"),
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useQueryClient: () => mockedUseQueryClient,
}));

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

describe("Testing RegistrationForm component : ", () => {
  it("Should render properly : ", () => {
    customRender(<RegistrationForm></RegistrationForm>, { providerProps });
    const formText = screen.getAllByText(/Sign Up/i)
    expect(formText[0].className).toBe("mt-4 text-4xl  text-slate-800 flex items-center justify-center");
  });
  it("Should handle submit : ", async ()=>{
    customRender(<RegistrationForm></RegistrationForm>, { providerProps });
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeInTheDocument();
     fireEvent.submit(submitButton);
     expect(mockedHandleSubmit).toHaveBeenCalled();
  })
});
