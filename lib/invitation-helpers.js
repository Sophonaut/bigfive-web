const mongo = require('mongojs')
const { model } = require('mongoose')
const Invitation = model('Invitation')
const User = model('User')

exports.getInvitation = async inviteId => {
  let invitation = ''
  try {
    invitation = await Invitation.findOne({ _id: mongo.ObjectId(inviteId) }).exec()
  } catch (err) {
    console.log(err.stack)
  }
  return invitation
}

exports.getUserById = async userId => {
  let user = ''
  try {
    user = await User.findOne({ _id: mongo.ObjectId(userId) }).exec()
  } catch (err) {
    console.log(err.stack)
  }
  return user
}

exports.getUserByEmail = async userEmail => {
  let user = ''
  try {
    user = await User.findOne({ email: userEmail }).exec()
  } catch (err) {
    console.log(err.stack)
  }
  return user
}
