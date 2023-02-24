import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/google"
import prisma from "@prisma"
import { NextAuthOptions } from "next-auth";

const NextOption : NextAuthOptions = ({
    providers : [
        GithubProvider({
            clientId : process.env.CLIENT!,
            clientSecret : process.env.CLIENT_SECRET!,
        })
    ],
    callbacks : {
        async signIn({user,account}) {
            const duplicate = await prisma.user.findFirst({where : {email: user.email!}})

            if (!duplicate) {
                try {
                    await prisma.user.create({data : {email : user.email!, profile : user?.image!, username : user.name!, id : account?.providerAccountId}})
                }catch(e) {
                    console.error(e)
                }
                return true
            }

            return true
        },
        session({session, token}) {
            if (!session.user.id) {
                session.user.id = token.sub

                return session
            }

            return session
        }
    },
    secret : process.env.NEXTAUTH_SECRET!,
    session : {
        strategy : "jwt",
    },
    pages : {
        signIn : "/",
        signOut : "/"
    }
})

export default NextAuth(NextOption)