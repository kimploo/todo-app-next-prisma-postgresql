import { NextApiHandler } from "next";
import prisma from "@prisma";

const PostHandler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { title, id } = req.body as { title: string; id: string };
    await prisma.post.create({
      data: {
        title,
        author: {
          connect: {
            id,
          },
        },
      },
    });
    return res.json({ msg: "Post Created" });
  }

  if (req.method === "GET") {
    // TODO: Type Narrowing
    const { userId } = req.query;
    if (!userId) return res.status(404).json({ msg: "User Not Found" });
    if (Array.isArray(userId)) return res.status(400).json({ msg: "Bad Request" });

    // TODO: & 연산자 학습
    const oneUserPosts = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Posts: {
          include: {
            whoLikes: {
              select: {
                userId: true
              }
            }
          }
        },
      },
    });
    
    if (!oneUserPosts) return res.status(404).json({ msg: "Cannot Found Post" });
    return res.json(oneUserPosts);
  }
  
  // TODO: Delete Post  
};

export default PostHandler;
