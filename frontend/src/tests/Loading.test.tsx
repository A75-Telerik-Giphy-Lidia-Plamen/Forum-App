import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loading from "../components/ui/Loading";

describe("Loading", () => {
  it("renders the loading text", () => {
    render(<Loading />);
    expect(screen.getByText(/loading session/i)).toBeInTheDocument();
  });

  it("renders the spinner icon", () => {
    const { container } = render(<Loading />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("renders the outer glow pulse element", () => {
    const { container } = render(<Loading />);
    const pulse = container.querySelector(".animate-pulse");
    expect(pulse).toBeInTheDocument();
  });
});
