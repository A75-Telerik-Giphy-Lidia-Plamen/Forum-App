import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import PostCard from "../components/PostCard/PostCard";
import type { Post } from "../types/Post";

const mockPost: Post = {
  id: "1",
  title: "How to sharpen a knife properly",
  content:
    "This is a long enough content string to pass validation requirements in the forum app.",
  author_id: "user-1",
  author: {
    username: "john_doe",
    avatar_url: null,
    reputation: 10,
  },
  tags: [{ name: "survival" }, { name: "tools" }],
  likes_count: 5,
  dislikes_count: 1,
  comments_count: 3,
  created_at: "2026-02-28T10:00:00Z",
  updated_at: "2026-02-28T10:00:00Z",
  is_deleted: false,
  is_verified: false,
};

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("PostCard (default variant)", () => {
  it("renders the post title", () => {
    renderWithRouter(<PostCard post={mockPost} />);
    expect(
      screen.getByText(/how to sharpen a knife properly/i),
    ).toBeInTheDocument();
  });

  it("renders the author username", () => {
    renderWithRouter(<PostCard post={mockPost} />);
    expect(screen.getByText("john_doe")).toBeInTheDocument();
  });

  it("renders 'Unknown' when author is null", () => {
    renderWithRouter(<PostCard post={{ ...mockPost, author: null }} />);
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });
  it("renders the tags", () => {
    renderWithRouter(<PostCard post={mockPost} />);
    expect(screen.getByText("#survival")).toBeInTheDocument();
    expect(screen.getByText("#tools")).toBeInTheDocument();
  });

  it("renders likes count", () => {
    renderWithRouter(<PostCard post={mockPost} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders comments count", () => {
    renderWithRouter(<PostCard post={mockPost} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders a content preview", () => {
    renderWithRouter(<PostCard post={mockPost} />);
    expect(
      screen.getByText(/this is a long enough content/i),
    ).toBeInTheDocument();
  });

  it("calls onClick when the card is clicked", async () => {
    const handleClick = vi.fn();
    renderWithRouter(<PostCard post={mockPost} onClick={handleClick} />);
    await userEvent.click(screen.getByText(/how to sharpen a knife properly/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("links to the correct post url", () => {
    renderWithRouter(<PostCard post={mockPost} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/posts/1");
  });
});

describe("PostCard (compact variant)", () => {
  it("renders the post title in compact mode", () => {
    renderWithRouter(<PostCard post={mockPost} variant="compact" />);
    expect(
      screen.getByText(/how to sharpen a knife properly/i),
    ).toBeInTheDocument();
  });

  it("renders the author in compact mode", () => {
    renderWithRouter(<PostCard post={mockPost} variant="compact" />);
    expect(screen.getByText("john_doe")).toBeInTheDocument();
  });
});

describe("PostCard (featured variant)", () => {
  it("renders the trending badge in featured mode", () => {
    renderWithRouter(<PostCard post={mockPost} variant="featured" />);
    expect(screen.getByText(/trending/i)).toBeInTheDocument();
  });
});
