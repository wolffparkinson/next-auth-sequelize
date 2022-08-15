import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0"
import SequelizeAdapter from '@next-auth/sequelize-adapter';
import { randomUUID } from 'crypto';

const sequelize = new Sequelize(process.env.DB_URI, {});

// ONCE
// sequelize.sync().then(sql=>{
//   sql.query(`
//   INSERT INTO "accounts" ("id","type","provider","provider_account_id")
//   VALUES ($1,$2,$3,$4)
//   RETURNING "id","type","provider","provider_account_id";
//   `,{bind: [randomUUID(),'oauth',process.env.MY_ACCOUNT_PROVIDER,process.env.MY_ACCOUNT_PROVIDER_ID,]})
// })

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: `${process.env.DISCORD_CLIENT_ID}`,
      clientSecret: `${process.env.DISCORD_SECRET}`,
      authorization: {
        params: {
          scope: 'identify guilds',
        },
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  debug:true,
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
}

export default NextAuth(authOptions)
