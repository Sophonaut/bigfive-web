const { model, Schema } = require('mongoose')
const crypto = require('crypto')
const uniqueValidator = require('mongoose-unique-validator')
const jwt = require('jsonwebtoken')
const secret = require('../../config').JWT_SECRET

const UserSchema = new Schema({
  email: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true, unique: true },
  paid: { type: Boolean, required: false },
  salt: { type: String, required: true },
  hash: { type: String, required: true },
  results: { type: Array, required: false },
  // Invitations could be the ID of the reference to manage the relationship between two users
  invitations: { type: Array, required: false },
  /*
    Whitelist should be the list of users that have accepted the invitation this user made
    OR the list of users this user has accepted invitation from

    In either case, the whitelist should contain email or objectId of the user so we can do a lookup
    on their most recent results at the time of comparison request

    It probably also makes sense to update the model with latestResult and allow an easy lookup
    for the result rather than performing this operation solely on the user model array to prevent bloat
  */
  whitelist: { type: Array, required: false }
}, { timestamps: true })

UserSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.generateJWT = function () {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + 60)

  return jwt.sign({
    id: this._id,
    email: this.email,
    exp: parseInt(exp.getTime() / 1000)
  }, secret)
}

UserSchema.methods.toAuthJSON = (user) => {
  return {
    email: user.email,
    token: user.generateJWT()
  }
}

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })

module.exports = model('User', UserSchema)
