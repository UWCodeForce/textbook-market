import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongodb'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/user'

export default NextAuth({
	adapter: MongoDBAdapter(clientPromise),
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 3000,
	},
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			async authorize(credentials, req) {
				await dbConnect()
				// check if user exitsts
				const user = await User.findOne({ username: credentials.username })
				if (!user) throw new Error('No user found')

				const isValid = await user.validatePassword(credentials.password)
				if (isValid) return { id: user._id, name: user.username }

				return null
			},
		}),
	],
})
