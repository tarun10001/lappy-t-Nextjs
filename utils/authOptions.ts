// import User from '@/app/models/User';
// import connectDB from '@/config/database';
// import GoogleProvider from 'next-auth/providers/google';

// const clientId = process.env.GOOGLE_CLIENT_ID;
// const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

// if (!clientId || !clientSecret) {
//     throw new Error('Missing Google OAuth credentials');
// }

// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: clientId,
//             clientSecret: clientSecret,
//             authorization: {
//                 params: {
//                     prompt: "consent",
//                     access_type: "offline",
//                     response_type: "code"
//                 }
//             }
//         })
//     ],
//     callbacks: {
//         //Invoke when successful signin
//         async signIn({user, account, profile}) {
//             await connectDB();
//             const userExists = await User.findOne({ email: profile.email});

//             if (!userExists) {
//                 const username = profile.name.slice(0, 20);

//                 await User.create({
//                     email: profile.email,
//                     username,
//                     image: profile.picture
//                 })
//             }

//             return true;
//         },
//         async session({session}) {
//             const user = await User.findOne({ email: session.user.email})
//             session.user.id = user._id.toString();
//             return session;
//         }
//     }
// };







import User from '@/app/models/User';
import connectDB from '@/config/database';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

const clientId = process.env.GOOGLE_CLIENT_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;

if (!clientId || !clientSecret) {
    throw new Error('Missing Google OAuth credentials');
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: clientId,
            clientSecret: clientSecret,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            await connectDB();
            
            // Check if the user exists in the database by their email
            const userExists = await User.findOne({ email: user.email });

            // If user doesn't exist, create a new one
            if (!userExists && profile) {
                const username = profile.name.slice(0, 20); // Restrict username length to 20 characters

                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture // Save user's Google profile picture
                });
            }

            return true; // Allow sign-in
        },
        async session({ session }) {
            await connectDB();

            // Attach user ID to the session
            const user = await User.findOne({ email: session.user?.email });
            if (user) {
                session.user.id = user._id.toString();
            }

            return session;
        }
    }
};
