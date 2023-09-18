import { z } from "zod";

export const Post = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  createdAt: z.string(),
  author: z.object({
    profile: z.string(),
    username: z.string(),
    _count: z.object({
      Likes: z.number(),
    }),
  }),
  whoLikes: z.array(z.object({ userId: z.string() })),
});

export const PostsApi = z.object({
  posts: z.array(Post),
});
