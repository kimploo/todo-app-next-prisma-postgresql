import { PostRes } from "@/types/types";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import useSWR from "swr";

function useGetPosts() {
  const { data: session } = useSession();
  const userId = session?.user.id;

const fetcher = (url: string, token: string = '') => {
  if (!userId) {
    // toast.error("Please log in");
    return;
  }
  return fetch(url + token)
    .then((res) => res.json())
    .then((json) => {
      const res = PostRes.parse(json);
      return res;
    })
};

const { data, error, isLoading, mutate } = useSWR([`/api/post`, `?userId=${userId}`], ([url, token]) => fetcher(url, token));

  return {
    oneUserPosts: data,
    isLoading,
    isError: error,
    mutate,
  }
}

export {
  useGetPosts
}

