import "@testing-library/jest-dom";
import { screen, render,fireEvent } from "@testing-library/react";
import ConfirmationBlock from "../../components/confirmation-block";

const handleDeleteOnClick = jest.fn();
const handleKeepOnClick = jest.fn();

describe("Testing ConfirmationBlock component : ", () => {
  it("should render properly : ", () => {
    render(
      <ConfirmationBlock
        option="blog"
        handleDeleteOnClick={handleDeleteOnClick}
        handleKeepOnClick={handleKeepOnClick}
      ></ConfirmationBlock>
    );

    const confirmationBlockText = screen.getByText(`Are you sure you want to delete this blog?`);
    expect(confirmationBlockText).toBeInTheDocument();
  });

  it("should delete blog on click : ", () => {
    render(
      <ConfirmationBlock
        option="blog"
        handleDeleteOnClick={handleDeleteOnClick}
        handleKeepOnClick={handleKeepOnClick}
      ></ConfirmationBlock>
    );

    const deleteButton = screen.getByText(/delete blog/i);
    fireEvent.click(deleteButton)
    expect(handleDeleteOnClick).toHaveBeenCalled();
  });

  it("should keep blog on click : ", () => {
    render(
      <ConfirmationBlock
        option="blog"
        handleDeleteOnClick={handleDeleteOnClick}
        handleKeepOnClick={handleKeepOnClick}
      ></ConfirmationBlock>
    );

    const keepButton = screen.getByText(/keep blog/i);
    fireEvent.click(keepButton)
    expect(handleKeepOnClick).toHaveBeenCalled();
  });

});
