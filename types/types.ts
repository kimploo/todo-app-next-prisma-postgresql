import { z } from "zod";

export const PostRes = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  profile: z.string(),
  Posts: z.array(
    z.object({
      id: z.string(),
      userId: z.string(),
      title: z.string(),
      createdAt: z.string(),
      whoLikes: z.array(
        z.object({
          userId: z.string(),
        }),
      ),
    }),
  ),
});
