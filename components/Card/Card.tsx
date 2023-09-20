import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useGetPosts } from "@/lib/swr/post";

const eachListVariant = {
  visible: {
    y: 0,
    height: "auto",
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      duration: 1,
    },
  },
  hidden: {
    height: 0,
    opacity: 0,
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};
const Card = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const { oneUserPosts, isError, isLoading, mutate } = useGetPosts()

  const findId = (whoLikes: Array<{ userId: string }>) => {
    return whoLikes.find((like) => like.userId === userId);
  };

  const handleLike = async (postId: string) => {
    return fetch("/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: session?.user.id, postId }),
    })
      .then((_) => {
        mutate();
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  if (isError) {
    return (
      <section className="w-full mt-4 px-20">
        <p className="text-stone-500 dark:text-stone-200">
          Ouch there is something wrong 🤖
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="w-full mt-4 px-20">
        <div className="flex justify-center mt-2">
          <progress className="progress w-56"></progress>
        </div>
      </section>
    );
  }

  if (!oneUserPosts) {
    return (
      <section className="w-full mt-4 px-20">
        <p className="text-stone-500 dark:text-stone-200">no post</p>
      </section>
    );
  }

  if (!oneUserPosts?.Posts.length) {
    return (
      <section className="w-full mt-4 px-20">
        <p className="text-stone-500 dark:text-stone-200">no post</p>
      </section>
    );
  }

  return (
    <AnimatePresence>
      <motion.section
        variants={eachListVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="overflow-auto mt-4 w-full px-20"
      >
        <section className="mt-4">
          {oneUserPosts?.Posts.map((post) => (
            <article key={post.id} className="flex flex-row justify-between">
              <div>
                <p className="text-stone-500 dark:text-stone-200">
                  {post.title}
                </p>
              </div>
              <div
                onClick={() => handleLike(post.id)}
                className="flex flex-row text-stone-500 dark:text-stone-200 hover:opacity-50 transition-[100ms]"
              >
                {post.whoLikes.length > 0 && <p>{post.whoLikes.length}</p>}
                {!findId(post.whoLikes) ? (
                  <AiOutlineHeart size={25} />
                ) : (
                  <AiFillHeart size={25} />
                )}
              </div>
            </article>
          ))}
        </section>
      </motion.section>
    </AnimatePresence>
  );
};

export default Card;
