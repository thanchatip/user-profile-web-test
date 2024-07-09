import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserProfile from "./components/UserProfile";

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({ name: "John Doe", email: "john@example.com" }),
  })
);

test("renders user profile", async () => {
  render(<UserProfile userId="1" />);

  // Loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for user data to be displayed
  await waitFor(() =>
    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
  );

  // Check if email is displayed
  expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
});

test("handles error", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.reject(new Error("Failed to fetch user data"))
  );

  render(<UserProfile userId="2" />);

  // Wait for error message to be displayed
  await waitFor(() =>
    expect(screen.getByText(/failed to fetch user data/i)).toBeInTheDocument()
  );
});
