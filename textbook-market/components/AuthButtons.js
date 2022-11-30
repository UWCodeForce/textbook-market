'use client'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function AuthButtons({ user }) {
	const router = useRouter()

	return (
		<>
			{user && (
				<button
					onClick={() => {
						signOut()
					}}
				>
					Sign Out
				</button>
			)}
			{!user && (
				<>
					<button
						onClick={() => {
							router.push('/signup')
						}}
					>
						Sign Up
					</button>
					<button
						onClick={() => {
							router.push('/signin')
						}}
					>
						Sign In
					</button>
				</>
			)}
		</>
	)
}
