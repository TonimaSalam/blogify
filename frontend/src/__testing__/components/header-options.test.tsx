import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
import HeaderOption from "../../components/header-options";
import { boxClass } from "../../utility/type-aliasing/app-type-aliasing";

const handleClick = jest.fn();

describe("Testing HeaderOption component : ", () => {
  it("should render properly : ", () => {
    render(
      <HeaderOption option="Home" handleClick={handleClick}></HeaderOption>
    );
    const headerText = screen.getByText("Home");
    expect(headerText).toBeInTheDocument();
  });

  it("should go to Home Page on click : ", async () => {
    user.setup();
    render(
      <HeaderOption option="Home" handleClick={handleClick}></HeaderOption>
    );
    const headerText = screen.getByText("Home");
    await user.click(headerText);
    expect(handleClick).toHaveBeenCalled();
  });

  it("should select on mouse enter : ", () => {
    render(
      <HeaderOption option="Home" handleClick={handleClick}></HeaderOption>
    );
    const headerText = screen.getByText("Home");
    fireEvent.mouseEnter(headerText);
    expect(headerText.className).toBe(boxClass[1]);
  });

  it("should deselect on mouse leave : ", () => {
    render(
      <HeaderOption option="Home" handleClick={handleClick}></HeaderOption>
    );
    const headerText = screen.getByText("Home");
    fireEvent.mouseLeave(headerText);
    expect(headerText.className).toBe(boxClass[0]);
  });
});
