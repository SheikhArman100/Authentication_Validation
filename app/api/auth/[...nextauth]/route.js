import clientPromise from "@/libs/mongodb/client";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials';
import Users from "@/libs/mongodb/model/user_schema";
import connectMongo from "@/libs/mongodb/connect";
import { compare } from "bcryptjs";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise), //MongoDBAdapter(clientPromise,collection,database_name)
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
    CredentialsProvider({
            name : "Credentials",
            async authorize(credentials, req){
                connectMongo().catch(error => { error: "Connection Failed...!"})

                // check user existance
                const result = await Users.findOne( { email:credentials.email})
                console.log(result)
                if(!result){
                    return null
                }

                // compare()
                const checkPassword = await compare(credentials.password, result.password);
                
                // incorrect password
                if(!checkPassword || result.email !== credentials.email){
                    throw new Error("Username or Password doesn't match");
                }

                return result;

            }
        })
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  debug:true
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
