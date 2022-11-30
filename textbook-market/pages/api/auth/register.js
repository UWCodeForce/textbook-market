import dbConnect from '../../../lib/dbConnect'
const User = require('../../../models/user')

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { username, password } = req.body

		try {
			await dbConnect()
			const exists = await User.findOne({ username: username })

			if (exists) {
				res.status(422).json({ message: 'Already Registered' })
			} else {
				const user = new User({ username, password })
				await user.save()
				res.status(201).json({ status: true, user: user })
			}
		} catch (e) {
			console.error(e)
			res.status(500).json({ error: e.message })
		}
	} else res.status(500).json({ message: 'HTTP method not valid' })
}
