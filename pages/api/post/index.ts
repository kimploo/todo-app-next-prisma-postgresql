import { NextApiHandler } from "next";
import prisma from "@prisma"

const PostHandler: NextApiHandler = async (req, res) => {
    if (req.method === "POST") {
        const { title, id } = req.body as { title: string, id: string }

        await prisma.post.create({ data: { title, author: { connect: { id } } } })

        return res.json({ msg: "Post Created.." })
    }

    if (req.method === "GET") {
        const { postId } = req.query as { postId: string }

        if (!postId) {
            const results = await prisma.post.findMany({
                take: 10,
                include: { author: { select: { profile: true, _count: { select: { Likes: true } }, username: true } }, whoLikes: { select: { userId: true } } }
            })

            return res.json({ posts: results })
        }

        const result = await prisma.post.findUnique({
            where: { id: postId },
            include: { author: { select: { profile: true, _count: { select: { Likes: true } }, username: true } }, whoLikes: { select: { userId: true } } }
        })

        if (!result) return res.status(400).json({ msg: "Cannot Found Post.." })

        return res.json({ post: result })
    }
}

export default PostHandler