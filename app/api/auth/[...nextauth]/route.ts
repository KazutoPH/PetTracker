import { createUser, getUser } from "@/lib/actions/user.action";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
var generator = require("generate-password");

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user }: any) {
      const checkuser = await getUser(user.email);

      if (!checkuser) {
        var password = await generator.generate({
          length: 10,
          uppercase: true,
          numbers: true,
          strict: true,
        });

        const userinfo = {
          fullname: user.name,
          email: user.email,
          password: password.toString(),
        };

        await createUser({ userinfo });
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
