import dbConnect from '../../../lib/dbConnect'
const User = require('../../../models/user')

export default async function handler(req, res) {
	const { username, password } = req.body
	console.log(username, password)

	try {
		await dbConnect()
		const exists = await User.findOne({ username: username })
		console.log(exists)

		if (exists) {
			res.status(200).json({ message: 'Already Registered' })
		}

		const user = new User({ username, password })
		await user.save()
		console.log('Success')
		res.status(201).json({ message: 'Success' })
	} catch (e) {
		console.error(e)
		res.status(500).json({ error: e.message })
	}
}
