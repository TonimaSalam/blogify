import "@testing-library/jest-dom";
import { render,screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import GoBack from "../../components/go-back";
import goBackIcon from "../../assets/go-back.png";

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom',()=>({
  ...jest.requireActual('react-router-dom'),
  useNavigate:()=>mockedUseNavigate,
}))


describe("Testing GoBack component : ", () => {
  it("should render properly : ", () => {
    render(<GoBack></GoBack>);
    const goBackText = screen.getByText(/Go Back/i);
    expect(goBackText).toBeInTheDocument();
    expect(goBackIcon).toBeDefined();
    
  })

  it("should go back on click : ", async ()=>{
    user.setup();
    render(<GoBack></GoBack>);
    const goBackButton = screen.getByRole("img");
    await user.click(goBackButton);
    expect(mockedUseNavigate).toHaveBeenCalled();
  })
});
