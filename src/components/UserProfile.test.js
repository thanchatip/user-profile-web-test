import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserProfile from "./UserProfile";

describe("User Profile Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user profile", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ name: "John Doe", email: "john@example.com" }),
    });

    render(<UserProfile userId="1" />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/john doe/i)).toBeInTheDocument();
      expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it("handles fetch error", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error("Failed to fetch user data"));

    render(<UserProfile userId="2" />);

    await waitFor(() => {
      expect(
        screen.getByText(/failed to fetch user data/i)
      ).toBeInTheDocument();
    });

    // Assert that loading state is gone
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
