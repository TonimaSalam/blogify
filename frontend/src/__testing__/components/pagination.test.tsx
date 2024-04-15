import "@testing-library/jest-dom";
import { render,screen, fireEvent } from "@testing-library/react";
import Pagination from "../../components/pagination";
import { AppContext } from "../../context/AppContextProvider";
import { AppContextType } from "../../utility/type-aliasing/app-type-aliasing";
import { appContextDefaultValues } from "../../utility/default-values/app-context-default-value";


const customRender = (ui: JSX.Element , {providerProps , ...renderOptions}: { providerProps:AppContextType; }) => {
    return render(
      <AppContext.Provider value ={{...providerProps}}>{ui}</AppContext.Provider>,
      renderOptions,
    )
  }

  describe("Testing Pagination component : ",()=>{
    it("Should render properly : ", ()=>{
        const providerProps = {
            ...appContextDefaultValues,
            state: "Home",
            pageNo:1,
            setPageNo:jest.fn(),
            numberOfPages:4
        };

        customRender(<Pagination></Pagination>, {providerProps});
        const pageNoText = screen.getByText(/1/i);
        expect(pageNoText).toBeInTheDocument();
    })

    it("Should disable prev button for the first page : ", ()=>{
        const providerProps = {
            ...appContextDefaultValues,
            state: "Home",
            pageNo:1,
            setPageNo:jest.fn(),
            numberOfPages:4
        };

        customRender(<Pagination></Pagination>, {providerProps});
        const prevGrayButton = screen.getByTestId("prevGray");
        expect(prevGrayButton).toBeInTheDocument();
    })

    it("Should disable next button for the last page : ", ()=>{
        const providerProps = {
            ...appContextDefaultValues,
            state: "Home",
            pageNo:4,
            setPageNo:jest.fn(),
            numberOfPages:4
        };

        customRender(<Pagination></Pagination>, {providerProps});
        const nextGrayButton = screen.getByTestId("nextGray");
        expect(nextGrayButton).toBeInTheDocument();
    })

    it("Should go to prev page on click prev button : ", ()=>{
        const providerProps = {
            ...appContextDefaultValues,
            state: "Home",
            pageNo:2,
            setPageNo:jest.fn(),
            numberOfPages:4
        };

        customRender(<Pagination></Pagination>, {providerProps});
        const prevButton = screen.getByTestId("prev");
        fireEvent.click(prevButton);
        expect(providerProps.setPageNo).toHaveBeenCalledWith(1);
    })

    it("Should go to next page on click next button : ", ()=>{
        const providerProps = {
            ...appContextDefaultValues,
            state: "Home",
            pageNo:2,
            setPageNo:jest.fn(),
            numberOfPages:4
        };

        customRender(<Pagination></Pagination>, {providerProps});
        const nextButton = screen.getByTestId("next");
        fireEvent.click(nextButton);
        expect(providerProps.setPageNo).toHaveBeenCalledWith(3);
    })
  })