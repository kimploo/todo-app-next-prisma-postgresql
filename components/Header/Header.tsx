import Images from "../Images/Images"
import {GoSignIn, GoSignOut} from "react-icons/go"
import { signIn, signOut, useSession } from "next-auth/react"

const Header = () => {
    const { data : session, status } = useSession()

  return (
    <header>
        <section className="w-screen h-[12vh] bg-stone-200 flex items-center justify-around">
            <section className="flex items-center justify-start gap-2">
            <Images property="rounded-full shadow-sm" src={session?.user.image!} height={60} width={60} />
            <div>
                <p className="text-stone-600 text-sm">Sign in as</p>
                <h4 className="font-[500] text-stone-700 ">{!session?.user.name ? "Unknown" : session.user.name}</h4>
            </div>
            </section>
            <button onClick={() => status === "unauthenticated" ? signIn("google") : signOut()} className="bg-stone-700 text-stone-50 hover:bg-stone-600 transition-[200ms] rounded-xl p-3">
              {status !== "unauthenticated" ? <GoSignOut size={20}/> : <GoSignIn size={20}/>}
            </button>
        </section>
    </header>
  )
}

export default Header