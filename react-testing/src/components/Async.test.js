import { render, screen } from "@testing-library/react";
import Async from "./Async";


describe('Testing Async component', () => {
    test('renders posts if request succeeds', async () => {
        /* 
        ----- USE MOCKS TO TEST THE HTTP REQUEST INSTEAD OF THE REAL ENDPOINTS! ------
       Override the component's http request (fetch) with a dummy fetch function witch is set to
       take only an id and a title.
        */
       window.fetch = jest.fn();
       window.fetch.mockResolvedValueOnce({
        json: async () => [{id: 'p1', title: 'First post'}]
       });
        render(<Async />);
        /*
         We have to use in that case (requesting data from endpoint) the finAllByRole, 
        because it returns a Promise that we have to handle with async/await. The findAllByRole
        can have more arguments and the 3rd argument is the timeout which is 1000ms by default.
        */
        const listElement = await screen.findAllByRole('listitem');   
        expect(listElement).not.toHaveLength(0);
    })
})