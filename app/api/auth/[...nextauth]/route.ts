import { createUser, userExist } from "@/lib/actions/user.action";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user }: any) {
      const checkuser = await userExist(user.email);

      if (!checkuser) {
        const userinfo = {
          name: user.name,
          email: user.email,
          password: "",
        };
        await createUser(user.email);
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
