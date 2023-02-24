import React from 'react'
import { useQuery } from 'react-query'
import Images from '../Images/Images'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import { PostsApi } from '@/types/types'
import { AnimatePresence,motion } from 'framer-motion'


const eachListVariant = {
  visible: {
      y: 0,
      height: 'auto',
      opacity: 1,
      transition: {
          type: "spring",
          damping: 25,
          stiffness: 300,
          duration: 1
      }
  },
  hidden: {
      y: -100,
      height: 0,
      opacity: 0
  },
  exit : {
      scale : 0,
      opacity : 0
  }
}

const getPosts = async () => {
  try {
    const res = await fetch("/api/post")
    const data = await res.json()

    const parseResult = PostsApi.safeParse(data)

    if (!parseResult.success) throw new Error(parseResult.error.message)

    return parseResult.data
  } catch (e) {
    throw new Error("Error When Try To Fetch..")
  }
}

const Card = () => {
  const { data: session } = useSession()
  const { data: posts, isLoading, refetch, isError } = useQuery("posts", getPosts)

  const findId = (whoLikes: Array<{ userId: string }>) => {
    return whoLikes.find(like => like.userId === session?.user.id)
  }

  const handleLike = async (postId: string) => {
    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: session?.user.id, postId })
      })

      if (res.ok) {
        refetch()
      }
    } catch (e) {
      console.error(e)
    }

    return
  }

  if (isError) {
    return <p className='text-sm text-center text-stone-500 m-2'>Ouch there is something wrong 🤖</p>
  }

  if (isLoading) {
    return (
      <div className='flex justify-center mt-2'>
        <progress className="progress w-56"></progress>
      </div>
    )
  }

  if (!posts?.posts.length) {
    return <p className='text-center text-neutral-600 mt-3'>There is no post 🥲</p>
  }

  return (
    <main className='mt-3'>
      <AnimatePresence>
      {posts?.posts.map((post, i) => (
        <motion.section variants={eachListVariant} initial="hidden" animate="visible" exit="exit" className='bg-stone-200 p-2 w-screen h-32' key={i}>
          <div className='flex items-center gap-2'>
            <Images src={post.author.profile} width={40} height={40} />
            <p className='text-sm text-stone-700'>{post.author.username}</p>
          </div>
          <div>
            <p className='text-stone-700 pl-12'>{post.title}</p>
          </div>
          <div onClick={() => handleLike(post.id)} className='text-stone-600 hover:opacity-75 transition-[200ms] pl-12 mt-3'>
            {!findId(post.whoLikes) ?
              <AiOutlineHeart size={25} /> : <AiFillHeart size={25} />
            }
            {post.whoLikes.length > 0 && <p>{post.whoLikes.length}</p>}
          </div>
        </motion.section>
      ))}
      </AnimatePresence>
    </main>
  )
}

export default Card