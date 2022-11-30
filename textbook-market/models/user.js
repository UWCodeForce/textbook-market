const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10

var UserSchema = new mongoose.Schema({
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
})

UserSchema.pre('save', function (next) {
	var user = this

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next()

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err)

		// hash the password using our new salt
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err)

			// override the cleartext password with the hashed one
			user.password = hash
			next()
		})
	})
})

UserSchema.methods.validatePassword = async function validatePassword(data) {
	return bcrypt.compare(data, this.password)
}

module.exports = mongoose.models.User || mongoose.model('User', UserSchema) // check if model already exists, if not create it
