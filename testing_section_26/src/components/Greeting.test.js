import { render, screen} from '@testing-library/react';
import Greeting from "./Greeting"

test('Rendering Hello Word', () => {
     render(<Greeting />);
     
     expect(screen.getByText(/Hello World/i)).toBeInTheDocument();
})