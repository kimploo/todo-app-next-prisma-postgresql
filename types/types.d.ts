type Post = {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  author: { profile: string; _count: { Likes: number }; username: string };
  whoLikes: any[];
};
