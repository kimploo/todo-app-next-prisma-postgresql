import { useSession } from "next-auth/react";
import { useState } from "react";
import { BiPaperPlane } from "react-icons/bi";
import useSWRMutation from 'swr/mutation'
import { toast } from "react-toastify";

const Input = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");

  const createPost = () => {
    if (!title) {
      return toast.error('Write TODO first to post')
    }

    fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        id: session?.user.id!,
      }),
    }).then((res) => {
      toast.success('Successfully post TODO')
    }).catch(e => {
      toast.error(`Error: ${e}`)
    })
  }
  const { trigger } = useSWRMutation('/api/user', createPost)

  return (
    <section className="flex flex-row justify-center items-center h-24 mt-4 px-8">
      <textarea
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        value={title}
        className="h-full rounded-l-xl resize-none bg-stone-300 dark:bg-stone-500 text-sm placeholder:text-stone-500 dark:placeholder:text-stone-300 text-stone-700 dark:text-stone-200 outline-none p-4"
        placeholder="TODO Here"
      />
      <button
        onClick={() => trigger()}
        className="h-full w-8 flex flex-col justify-center items-center object-cover rounded-r-xl shadow-sm bg-stone-600 dark:bg-stone-300 text-stone-100 dark:text-stone-500 outline-none"
      >
        <BiPaperPlane size={24} />
      </button>
    </section>
  );
};

export default Input;
