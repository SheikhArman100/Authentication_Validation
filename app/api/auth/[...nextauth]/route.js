import clientPromise from "@/libs/mongodb/client";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "@/libs/mongodb/model/user_schema";
import connectMongo from "@/libs/mongodb/connect";
import { compare } from "bcryptjs";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    //google signIn provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // -------------------Credential provider part starts here---------------------------------
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await connectMongo().catch((error) => {
          error: "Connection Failed...!";
        });

        // check user existance
        const user = await Users.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Email doesn't match with any registered user");
        }

        // compare()
        const checkPassword = await compare(
          credentials.password,
          user.password
        );

        // incorrect password
        if (!checkPassword) {
          throw new Error("Password doesn't match");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.name = token.name || token.username;

      return session;
    },
    async jwt({ token, user,trigger,session}) {
      if (user) {
        token.id = user.id;
        token.jwt = user.jwt;
        token.name = user.name || user.username; /* added */
      }
      if (trigger === 'update' && session?.name) {
        token.name = session.name
      }

      return token;
    },
  },
  // -------------------------------Credential provider part finished here-------------------------------

  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
