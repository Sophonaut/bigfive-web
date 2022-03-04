const { model } = require('mongoose')
const router = require('express').Router()
const mongo = require('mongojs')
const User = model('User')
const Invitation = model('Invitation')

/*
  POST: Should insert an invitation into both users' queues on their documents, along with the objectId
  for the invitation
*/
router.post('/invitations', async (req, res, next) => {
  const invitation = new Invitation()
  let invitee = req.query.invitee
  let user = ''

  const token = req.params && req.params.token ? req.params.token.split('.') : false
  if (!token) throw new Error('Not a valid query')
  const userId = JSON.parse(Buffer.from(token[1], 'base64').toString('ascii')).id

  // pull invitee information based on email provided by user
  try {
    invitee = await User.findById(invitee).exec()
  } catch (err) {
    console.log(err.stack)
  }
  if (!invitee) { return res.status(400).json({ success: false, message: 'Unable to find user' }) }

  // pull user inviting another based on token stored in context
  try {
    user = await User.findOne({ _id: mongo.ObjectId(userId) }).exec()
  } catch (err) {
    console.log(err.stack)
  }
  if (!user) { return res.status(401).json({ success: false, message: "We weren't able to send this invitation" }) }

  // initialize invitation fields if users are both valid
  invitation.invitee = invitee.email
  invitation.createdBy = user.email
  invitation.accepted = false

  invitation.save()
    .then(async result => {
      // check this to ensure that ID is being added after the save to DB
      console.log(JSON.stringify(result))

      // after this we'll need to update the user model for the invitee with their pending invitations
      invitee.invitations.push({ _id: result._id, invitee: invitee.email })
      await invitee.save()

      return res.json({ invitation: result })
    })
    .catch(next)
})

/*
  PUT: Should update the invitation to true, and move the invitation object from the users' documents
  to the whitelist
*/

router.put('/invitations', (req, res, next) => {

})
