import '@testing-library/jest-dom';
import {screen,render} from "@testing-library/react";
import Footer from "../../components/footer";

describe("Testing Footer component : ", ()=>{
    it("Renders correctly : ",()=>{
        render(<Footer></Footer>);
        const footerText = screen.getByText(/Contact Us : 01800000000/i);
        expect(footerText).toBeInTheDocument()
    })
})