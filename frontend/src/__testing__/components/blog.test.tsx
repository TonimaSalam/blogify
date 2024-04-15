import "@testing-library/jest-dom";
import { render,screen, fireEvent } from "@testing-library/react";
import Blog from "../../components/blog";
import { AppContext } from "../../context/AppContextProvider";
import { blogType } from "../../utility/type-aliasing/blog-type-aliasing";
import { AppContextType } from "../../utility/type-aliasing/app-type-aliasing";
import { ReactNode} from "react";
import { JSX } from "react/jsx-runtime";
import { appContextDefaultValues } from "../../utility/default-values/app-context-default-value";

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom',()=>({
  ...jest.requireActual('react-router-dom'),
  useNavigate:()=>mockedUseNavigate,
}))

jest.mock("../../utility/default-values/app-context-default-value");

const blog: blogType = {
  blogID: 2,
  userID: 3,
  title: "mockedBlogTitle",
  content: "mockedBlogContent",
};
const index = 1;
const setBlog: React.Dispatch<React.SetStateAction<blogType | null>> = jest.fn();

const customRender = (ui: Iterable<ReactNode> | JSX.Element | null | undefined, {providerProps , ...renderOptions}: { providerProps:AppContextType; }) => {
    return render(
      <AppContext.Provider value ={{...providerProps}}>{ui}</AppContext.Provider>,
      renderOptions,
    )
  }

describe("Testing Blog component : ", () => {
  it("Should render properly : ", () => {
    render(<Blog blog={blog} index={index}></Blog>);

    const blogTitleText = screen.getByText(blog.title);
    expect(blogTitleText).toBeInTheDocument();

  });

  it("Should show details on click : ", () => {
    const providerProps = {
        ...appContextDefaultValues,
        setBlog : setBlog,
        state : "Home",
      }
      customRender(<Blog blog={blog} index={index}></Blog>, {providerProps});
      const showMoreButton = screen.getByText(/Show more/i);
      fireEvent.click(showMoreButton);
      expect(mockedUseNavigate).toHaveBeenCalled();
  });

  it("Should show less on click : ", () => {
    const providerProps = {
        ...appContextDefaultValues,
        setBlog : setBlog,
        state : "Author",
      }
      customRender(<Blog blog={blog} index={index}></Blog>, {providerProps});
      const showMoreButton = screen.getByText(/Show more/i);
      fireEvent.click(showMoreButton);
      const showLessButton = screen.getByText(/Show less/i);
      expect(showLessButton).toBeInTheDocument();
  });
});
