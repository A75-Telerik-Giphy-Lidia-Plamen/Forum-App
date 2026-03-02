import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AuthorCard from "../components/AuthorCard/AuthorCard";

describe("AuthorCard", () => {
  it("renders the username", () => {
    render(<AuthorCard username="lidia123" />);
    expect(screen.getByText("lidia123")).toBeInTheDocument();
  });

  it("renders reputation points", () => {
    render(<AuthorCard username="lidia123" reputation={42} />);
    expect(screen.getByText("42 pts")).toBeInTheDocument();
  });

  it("renders 0 pts when reputation is not provided", () => {
    render(<AuthorCard username="lidia123" />);
    expect(screen.getByText("0 pts")).toBeInTheDocument();
  });

  it("renders an avatar image when avatarUrl is provided", () => {
    render(
      <AuthorCard
        username="lidia123"
        avatarUrl="https://example.com/avatar.jpg"
      />,
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
    expect(img).toHaveAttribute("alt", "lidia123");
  });

  it("renders initials when avatarUrl is not provided", () => {
    render(<AuthorCard username="lidia123" />);
    expect(screen.getByText("LI")).toBeInTheDocument();
  });

  it("renders initials from first and last name when username has spaces", () => {
    render(<AuthorCard username="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("caps reputation bar at 100% when reputation exceeds 1000", () => {
    const { container } = render(
      <AuthorCard username="lidia123" reputation={9999} />,
    );
    const fill = container.querySelector("[style*='width']") as HTMLElement;
    expect(fill.style.width).toBe("100%");
  });
});
