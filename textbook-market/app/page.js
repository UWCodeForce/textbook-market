import React from 'react'
import AuthButtons from '../components/AuthButtons'
import clientPromise from '../lib/mongodb'
import { unstable_getServerSession } from 'next-auth/next'

const mongodb = async () => {
	try {
		await clientPromise

		return {
			props: {
				isConnected: true,
			},
		}
	} catch (error) {
		console.log(error)

		return {
			props: {
				isConnected: false,
			},
		}
	}
}

export default async function Home() {
	const session = await unstable_getServerSession()
	const user = session?.user

	return (
		<>
			<h1>Welcome {user?.name} to our Textbook Market homepage</h1>
			<AuthButtons user={user} />
		</>
	)
}
