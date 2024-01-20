import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, {
          access_token: account.access_token,
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        // console.log('ID Token:', token.id_token);
        session = Object.assign({}, session, {
          access_token: token.access_token,
        });
        // console.log(session);
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

// const handler = async (req, res) => {
//   try {
//     const secret = process.env.SECRET;
//     const token = await getToken({ req, secret });
//     const accessToken = token.accessToken;
//     console.log(accessToken, res);
//   } catch (error) {
//     console.error("Error in handler:", error);
//     res.status(500).end("Internal Server Error");
//   }
// };

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     jwt: async ({ token, account }) => {
//       if (account?.access_token) {
//         token.access_token = account.access_token;
//       }
//       return token;
//     },
//   },
// });

// export { handler as GET, handler as POST };
