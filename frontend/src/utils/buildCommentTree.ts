import type { Comment } from "../types/Comment";

export function buildCommentTree(comments: Comment[]): Comment[] {
  const nodes = comments.map((comment) => ({
    ...comment,
    replies: [],
  }));

  const byId = new Map<string, Comment>();
  for (const node of nodes) {
    byId.set(node.id, node);
  }

  const roots: Comment[] = [];

  for (const node of nodes) {
    if (node.parent_id && byId.has(node.parent_id)) {
      const parent = byId.get(node.parent_id);
      if (parent) {
        parent.replies.push(node);
      }
    } else {
      roots.push(node);
    }
  }

  return roots;
}

export function countComments(comments: Comment[]): number {
  let total = 0;
  for (const comment of comments) {
    total += 1;
    if (comment.replies.length > 0) {
      total += countComments(comment.replies);
    }
  }
  return total;
}
