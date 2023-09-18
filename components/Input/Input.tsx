import { useSession } from "next-auth/react";
import { useState } from "react";
import { BiPaperPlane } from "react-icons/bi";
import { useMutation, useQueryClient } from "react-query";
import { AnimatePresence } from "framer-motion";
import Alert from "../Alert/Alert";

const Input = () => {
  const { data: session } = useSession();
  const [error, setIsError] = useState(false);
  const [success, setIsSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const mutatePost = useMutation({
    mutationFn: (body: { title: string; id: string }) =>
      fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      setTitle("");
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
      }, 1500);
      return queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: () => {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 1500);
    },
  });

  const handlePost = async () => {
    if (!title) {
      setIsError(true);
      return setTimeout(() => {
        setIsError(false);
      }, 1500);
    }
    const post = {
      title,
      id: session?.user.id!,
    };

    return mutatePost.mutate(post);
  };

  return (
    <main>
      <AnimatePresence>
        {error && <Alert type="danger" />}
        {success && <Alert type="success" />}
      </AnimatePresence>
      <section className="flex flex-col justify-center items-center mt-3">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          className="bg-stone-300 p-2 w-80 h-32 text-sm placeholder:text-stone-500 rounded-tl-lg text-stone-700 rounded-tr-lg outline-none"
          placeholder="This is was really awesome!"
        />
        <button
          onClick={handlePost}
          className="w-80 p-2 shadow-sm bg-stone-600 text-stone-100 rounded-bl-xl rounded-br-xl outline-none flex justify-center "
        >
          <BiPaperPlane size={28} />
        </button>
      </section>
    </main>
  );
};

export default Input;
