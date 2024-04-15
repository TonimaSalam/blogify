What to test?
1. test component renders
2. test component renders with props
3. test component renders in different states
4. test component reacts to events

Every test generally involves the following basic steps:
1. render the component
2. find an element rendered by the component
3. assert against the element found in step 2 which will pass or fail the test

To render the component, we use the render method from RTL.
For assertion, we use expect passing in a value and combine it with a matcher function from jest or jest-dom

To find single element on the page, we have
1. getBy..
2. queryBy..
3. findBy..

To find multiple element on the page, we have 
1. getAllBy..
2. queryAllBy..
3. findAllBy.. 

The suffix(..) can be one of Role, LabelText, PlaceHolderText, Text, DisplayValue, AltText, Title and TestId
For corresponding role : https://www.w3.org/TR/html-aria/#docconformance
getByRoles options : name, level, hidden, selected, checked, pressed

TextMatch-regex
screen.getByText(/Contact Us : 01800000000/) // substring match
screen.getByText(/Contact Us : 01800000000/i) // substring match, ignore case
screen.getByText(/^Contact Us : 01800000000$/i) // full string match, ignore case

TextMatch- custom function
(content?:string, element?:Element|null)=>boolean
true-> if match
false-> if not match
<div>Contact Us : 01800000000</div>
screen.getByText((content)=>content.startsWith('Contact'))

Testing component that uses context : https://testing-library.com/docs/example-react-context/

const customRender = (ui: JSX.Element , {providerProps , ...renderOptions}: { providerProps:MyContextType; }) => {
    return render(
      <MyContext.Provider value ={{...providerProps}}>{ui}</MyContext.Provider>,
      renderOptions,
    )
  }
