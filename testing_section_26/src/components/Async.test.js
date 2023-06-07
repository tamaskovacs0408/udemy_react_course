import { render, screen } from "@testing-library/react";
import Async from "./Async";


describe('Testing Async component', () => {
    test('renders posts if request succeeds', async () => {
        render(<Async />);
        /* 
        We have to use in that case (requesting data from endpoint) the finAllByRole, 
        because it returns a Promise that we have to handle with async/await. The findAllByRole
        can have more arguments and the 3rd argument is the timeout which is 1000ms by default
        */
        const listElement = await screen.findAllByRole('listitem');   
        expect(listElement).not.toHaveLength(0);
    })
})