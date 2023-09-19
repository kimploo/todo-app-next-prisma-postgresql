import Images from "../Images/Images";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="w-full">
      <section className="h-[12vh] flex items-center justify-around">
        <section className="flex items-center justify-start gap-2">
          <Images
            property="rounded-full shadow-sm"
            src={session?.user.image!}
            height={60}
            width={60}
          />
          <div>
            <p className="text-stone-600 dark:text-stone-200 text-sm">
              Sign in as
            </p>
            <h4 className="font-[500] text-stone-700 dark:text-stone-200">
              {!session?.user.name ? "Unknown" : session.user.name}
            </h4>
          </div>
        </section>
        <button
          onClick={() => {
            status === "unauthenticated" ? signIn("github") : signOut();
          }}
          className="bg-stone-700 text-stone-50 hover:bg-stone-600 transition-[200ms] rounded-xl p-3"
        >
          {status !== "unauthenticated" ? (
            <GoSignOut size={20} />
          ) : (
            <GoSignIn size={20} />
          )}
        </button>
      </section>
    </header>
  );
};

export default Header;
