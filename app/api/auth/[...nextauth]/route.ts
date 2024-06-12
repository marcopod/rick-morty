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
          console.log('no credentials');
          return null;
        }

        const username = credentials.username.trim().toLowerCase();
        const { password } = credentials;

        const user = await prisma.user.findFirst({
          where: { username: username },
        });
        console.log('user: ', user);

        if (!user) {
          console.log('No user found with the username: ', username);
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
      console.log('signIn: ', !!existingUser);

      return !!existingUser;
    },
    async jwt({ token, user, trigger }) {
      if (trigger === 'signIn') {
        token.id = user.id; // Append id to the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
