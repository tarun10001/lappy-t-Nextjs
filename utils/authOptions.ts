import User from '@/app/models/User';
import connectDB from '@/config/database';
import GoogleProvider from 'next-auth/providers/google';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
    throw new Error('Missing Google OAuth credentials');
}

export const authOptions = {
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
        //Invoke when successful signin
        async signIn({profile}) {
            await connectDB();
            const userExists = await User.findOne({ email: profile.email});

            if (!userExists) {
                const username = profile.name.slice(0, 20);

                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                })
            }

            return true;
        },
        async session({session}) {
            const user = await User.findOne({ email: session.user.email})
            session.user.id = user._id.toString();
            return session;
        }
    }
};
