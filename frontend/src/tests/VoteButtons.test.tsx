import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import VoteButtons from "../components/VoteButtons/VoteButtons";
import * as useVoteModule from "../hooks/useVote";

const mockVote = vi.fn();

vi.mock("../hooks/useVote");

beforeEach(() => {
  mockVote.mockClear();
  vi.mocked(useVoteModule.useVote).mockReturnValue({
    userVote: null,
    isLoading: false,
    error: null,
    vote: mockVote,
  });
});

describe("VoteButtons", () => {
  it("renders likes and dislikes count", () => {
    render(
      <VoteButtons
        postId="1"
        likesCount={5}
        dislikesCount={2}
        onVote={vi.fn()}
      />,
    );
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calls vote with 1 when upvote button is clicked", async () => {
    render(
      <VoteButtons
        postId="1"
        likesCount={5}
        dislikesCount={2}
        onVote={vi.fn()}
      />,
    );
    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[0]);
    expect(mockVote).toHaveBeenCalledWith(1);
  });

  it("calls vote with -1 when downvote button is clicked", async () => {
    render(
      <VoteButtons
        postId="1"
        likesCount={5}
        dislikesCount={2}
        onVote={vi.fn()}
      />,
    );
    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[1]);
    expect(mockVote).toHaveBeenCalledWith(-1);
  });

  it("calls onVote callback with correct value and previousValue", async () => {
    const onVote = vi.fn();
    render(
      <VoteButtons
        postId="1"
        likesCount={5}
        dislikesCount={2}
        onVote={onVote}
      />,
    );
    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[0]);
    expect(onVote).toHaveBeenCalledWith(1, null);
  });

  it("disables both buttons when isLoading is true", () => {
    vi.mocked(useVoteModule.useVote).mockReturnValue({
      userVote: null,
      isLoading: true,
      error: null,
      vote: mockVote,
    });

    render(
      <VoteButtons
        postId="1"
        likesCount={5}
        dislikesCount={2}
        onVote={vi.fn()}
      />,
    );
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });
});
