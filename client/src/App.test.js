import { render, screen } from '@testing-library/react';
import App from './App';

test('renders My Austin weather alert header', () => {
  render(<App />);
  const linkElement = screen.getByText(/My Austin weather alert/i);
  expect(linkElement).toBeInTheDocument();
});

/*
it("renders user data", async () => {
  const fakeForecast = {"id": 0, date: aDateStr0, "day": {"weather": "sunny", "rainchance": "4%", "temp_extreme": "59"}, "night": {"weather": "clear", "rainchance": "3%", "temp_extreme": "36"}};
  //{ name: "Joni Baez",    age: "32",    address: "123, Charming Avenue"  };  
  jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeForecast)    }) );
  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<User id="123" />, container);
  });

  expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
  expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
  expect(container.textContent).toContain(fakeUser.address);

  // remove the mock to ensure tests are completely isolated  global.fetch.mockRestore();});
*/