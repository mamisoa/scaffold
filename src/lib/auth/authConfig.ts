import NextAuth, { CredentialsSignin, User } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Google from "next-auth/providers/google"
import Nodemailer from "next-auth/providers/nodemailer"
import Credentials from "next-auth/providers/credentials"
import { compare, genSalt, hash } from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
    // Use the NEXTAUTH_URL environment variable
    trustHost: true,

    // Use Prisma adapter for database integration
    adapter: PrismaAdapter(prisma),

    // Secret used to encrypt tokens
    secret: process.env.AUTH_SECRET,

    // Session configuration
    session: {
        strategy: "jwt",
        maxAge: 30*24*60*60, // 30 days
    },

    // Custom pages
    pages: {
        signIn: "/auth/sign-in",
        error: "/auth/error",
    },

    // Authentication providers
    providers: [
        // Google provider
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),

        // Nodemailer provider for passwordless authentication
        Nodemailer({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: parseInt(process.env.EMAIL_SERVER_PORT!, 10),
                auth: {
                  user: process.env.EMAIL_SERVER_USER,
                  pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),

        // Credentials provider for username/password authentication
        Credentials({
            credentials: {
              username: { label: "Username", type: "text" },
              password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
              // Check if username and password are provided
              if (!credentials?.username || !credentials?.password) {
                console.log("Missing username or password");
                return null;
              }
       
              
                // Find user by username in the usersLocal table
                const user = await prisma.usersLocal.findUnique({
                  where: { username: credentials.username as string }
                }); // OK
       
                // If user is not found or doesn't have a password, return null
                if (!user || !user.password) {
                  console.log("User not found or password not set");
                  throw new CredentialsSignin('Please provide both email and password')
                  // return null;
                } //
       
                // Compare the provided password with the stored hash
                console.log('credentials.password: ', await hash(credentials.password as string,10));
                console.log('user.password: ', user.password);
                const isPasswordValid = await compare(credentials.password as string, user.password);
                console.log("Validation: ", isPasswordValid);
                // const isPasswordValid = false;
                // If password is invalid, return null
                if (!isPasswordValid) {
                  throw new CredentialsSignin('Please provide valid email and password')
                  // return null;
                }
       
                // If everything is valid, return the user object
                console.log("Username and password are valid.")
                return {
                  id: user.id.toString(),
                  username: user.username,
                  email: user.email,
                  name: `${user.firstName} ${user.lastName}`,
                };
              
            },
        }),
    ],

    // Callbacks for customizing JWT and session handling
    callbacks: {
        // Customize JWT contents
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                };
            }
            return token;
        },

        // Customize session object
        async session({ session, token }) {
            console.log("session callback", { session, token });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id as string,
                },
            };
        },
    },
});

// Helper function to hash password (use this when creating a new user)
// async function hashAndSaltPassword(password: string, saltRounds = 10) {
//   const salt = await genSalt(saltRounds);
//   return hash(password, salt);
// }
