import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs'; // Ensure bcryptjs is imported

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const username = credentials.username.trim().toLowerCase();
        const { password } = credentials;

        const user = await prisma.user.findFirst({
          where: { username: username },
        });

        if (!user) {
          console.log('No user found with the username:', username);
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          console.log('Password mismatch for user:', username);
          return null;
        }

        return { id: user.id.toString(), username: user.username };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user }) {
      const castUser = user as any; // or as { username?: string }
      const username = castUser.username ?? '';
      const existingUser = await prisma.user.findFirst({
        where: { username },
      });

      return !!existingUser;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Append id to the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      if (token.username) {
        session.user.username = token.username; // Ensure username is added to the session
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
