import { render, screen, prep } from '@testing-library/react';
import App from './App';

import FormLanding from './components/FormLanding/FormLanding';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


it("should show the validity", async () => {

  render(<FormLanding />)

  let linkElement = screen.getByLabelText("clientName");
  expect(linkElement).toBeInTheDocument();
  console.log(linkElement);
})