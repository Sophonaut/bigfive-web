import { getInvitation, getUserById, getUserByEmail } from '../../lib/invitation-helpers'
import mongoose from 'mongoose'
const Invitation = mongoose.model('Invitation')

const router = require('express').Router()

// const util = require('util')
// console.log(`analyzing request: ${util.inspect(req)}`)

// JWT conversion helper
const tokenCheck = (req) => {
  let token = req.body && req.body.token ? req.body.token.split('.') : false
  if (!token) token = req.params && req.params.token ? req.params.token.split('.') : false
  if (!token) throw new Error('Not a valid query')
  return JSON.parse(Buffer.from(token[1], 'base64').toString('ascii')).id
}

/*
  POST: Should insert an invitation into both users' queues on their documents, along with the objectId
  for the invitation
*/
router.post('/invitations', async (req, res, next) => {
  const invitation = new Invitation()
  let invitee = req.body.invitee
  let user = ''

  const currentUserId = tokenCheck(req)
  console.log(`currentUserId check: ${currentUserId}`)

  // pull invitee information based on email provided by user
  invitee = getUserByEmail(invitee)
  if (!invitee) { return res.status(400).json({ success: false, message: 'Unable to find user' }) }
  if (invitee._id.toString() === currentUserId) { return res.status(400).json({ success: false, message: 'Unable to share results with self!' }) }

  // pull user inviting another based on token stored in context
  user = getUserById(currentUserId)
  if (!user) { return res.status(400).json({ success: false, message: "We weren't able to send this invitation...are you logged in?" }) }

  console.log(`checking invitee's invitations queue: ${JSON.stringify(invitee.invitations)}`)

  // check duplicate invitations and assign filter results to duplicates
  // TODO: Check whitelist for existing user berfore sending invitation
  let duplicates = false
  if (invitee.invitations.length > 0) {
    duplicates = invitee.invitations.filter(invitation => {
      return invitation.invitee === invitee.email && invitation.createdBy === user.email
    })
  }
  if (duplicates.length > 0) {
    return res.status(400).json({ message: 'Invite for this user already exists!' })
  }

  // initialize invitation fields if users are both valid
  invitation.invitee = { email: invitee.email, _id: invitee._id.toString() }
  invitation.createdBy = { email: user.email, _id: currentUserId }
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
  GET: Simply retrieve user's invite actions to take
*/
router.get('/invitations/:token', async (req, res) => {
  let user = {}
  const currentUserId = tokenCheck(req)

  user = getUserById(currentUserId)
  if (!user) { return res.status(400).json({ success: false, message: "We weren't able to retrieve your invitations...are you logged in?" }) }

  return res.json({ invitations: user.invitations })
})

/*
  PUT: Should update the invitation to true, and move the invitation object from the users' documents
  to the whitelist
*/

router.put('/invitations', async (req, res, next) => {
  let invitee = ''
  let createdBy = ''
  let invitation = ''
  const inviteId = req.body._id

  invitation = getInvitation(inviteId)
  if (!invitation) { return res.status(400).json({ success: false, message: "We weren't able to update this invitation." }) }

  // TODO: handle case where old invitation exists and user has declined previous invitation but receives another one?

  // update invitation object for recording response
  if (req.body.selection) {
    invitation.accepted = req.body.selection
    await invitation.save()
  }

  // if true
  // update invitee whitelist and invitation queue
  invitee = getUserById(invitation.invitee.get('_id'))

  if (req.body.selection) {
    invitee.whitelist.push(invitation.createdBy)
  }

  invitee.invitations = invitee.invitations.filter(invite => invite._id.toString() !== inviteId)
  await invitee.save()

  // update createdBy whitelist
  if (req.body.selection) {
    createdBy = getUserById(invitation.createdBy.get('_id'))
    createdBy.whitelist.push(invitation.invitee)
    await createdBy.save()
  }

  return res.json({ success: true, message: 'Invitation accepted and results shared successfully!' })

  // TODO: the delete function should actually go in invitation update
})

module.exports = router
