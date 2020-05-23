import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders caddy ui title", () => {
  const { getByText } = render(<App />);
  const element = getByText(/Caddy UI/i);
  expect(element).toBeInTheDocument();
});
