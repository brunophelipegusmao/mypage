import clsx from "clsx";

import {
  postStatusBadgeClasses,
  postStatusLabels,
} from "@/components/dashboard/blog/post-client";
import type { PostStatus } from "@/types/post";

type PostStatusBadgeProps = {
  status: PostStatus;
};

export default function PostStatusBadge({ status }: PostStatusBadgeProps) {
  return (
    <span
      className={clsx(
        "rounded-full border px-3 py-1 text-xs font-medium",
        postStatusBadgeClasses[status],
      )}
    >
      {postStatusLabels[status]}
    </span>
  );
}
