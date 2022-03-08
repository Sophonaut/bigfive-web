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
  // console.log(`analyzing request: ${util.inspect(req)}`)

  const invitation = new Invitation()

  let invitee = req.body.invitee
  let user = ''

  const token = req.body && req.body.token ? req.body.token.split('.') : false
  if (!token) throw new Error('Not a valid query')
  const userId = JSON.parse(Buffer.from(token[1], 'base64').toString('ascii')).id

  // pull invitee information based on email provided by user
  try {
    invitee = await User.findOne({ email: invitee }).exec()
  } catch (err) {
    console.log(err.stack)
  }
  if (!invitee) { return res.status(400).json({ success: false, message: 'Unable to find user' }) }
  if (invitee._id === userId) { return res.status(400).json({ success: false, message: 'Unable to share results with self!' }) }

  // pull user inviting another based on token stored in context
  try {
    user = await User.findOne({ _id: mongo.ObjectId(userId) }).exec()
  } catch (err) {
    console.log(err.stack)
  }
  if (!user) { return res.status(400).json({ success: false, message: "We weren't able to send this invitation" }) }

  console.log(`checking invitee's invitations queue: ${JSON.stringify(invitee.invitations)}`)

  let duplicates = false
  if (invitee.invitations.length > 0) {
    duplicates = invitee.invitations.filter(invitation => {
      console.log(`invitee in mongo: ${invitation.invitee} 
      invitee in request: ${invitee.email}
      checking equivalence: ${invitation.invitee === invitee.email}
      createdBy in invitation: ${invitation.createdBy}
      createdBy in request: ${user.email}
      checking equivalence: ${invitation.createdBy === user.email}
      `)
      return invitation.invitee === invitee.email && invitation.createdBy === user.email
    })
  }
  if (duplicates.length > 0) {
    console.log(`duplicates must exist because we're in this conditional, so let's analyze: ${JSON.stringify(duplicates)}`)
    return res.status(400).json({ message: 'Invite for this user already exists' })
  }

  // initialize invitation fields if users are both valid
  invitation.invitee = invitee.email
  invitation.createdBy = user.email
  invitation.accepted = false

  invitation.save()
    .then(async result => {
      // check this to ensure that ID is being added after the save to DB
      console.log(JSON.stringify(result))

      // after this we'll need to update the user model for the invitee with their pending invitations
      invitee.invitations.push({ _id: result._id, invitee: invitee.email, createdBy: user.email })
      await invitee.save()

      return res.json({ invitation: result })
    })
    .catch(next)
})

/*
  PUT: Should update the invitation to true, and move the invitation object from the users' documents
  to the whitelist
*/

// router.put('/invitations', (req, res, next) => {

// })

module.exports = router
