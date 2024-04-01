import { createUser, getUser, logInUser } from "@/lib/actions/user.action";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
var generator = require("generate-password");

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "name", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as any;

        const userinfo = {
          email: email as string,
          password: password as string,
        };

        const user = await logInUser({ userinfo });

        if (user)
          return {
            id: user._id,
            name: user.fullname,
            email: user.email,
          };

        return null;
      },
    }),

    CredentialsProvider({
      id: "register-credentials",
      name: "register-credentials",
      credentials: {
        id: { label: "id", type: "text", placeholder: "" },
        email: { label: "name", type: "text", placeholder: "" },
        fullname: { label: "fullname", type: "text", placeholder: "" },
      },
      async authorize(credentials, req) {
        const { id, email, fullname } = credentials as any;

        return {
          id: id,
          name: fullname,
          email: email,
        };
      },
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
