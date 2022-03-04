const { model, Schema } = require('mongoose')

/*
  Any methods related to Invitation should use upsert in order to manage the users that have accepted the invite
  to share their results so we don't get users agreeing to invitations twice.

  We could also remove the pending invite from their dashboard and prevent inserting duplicate users that way
  but our priority should be handling things via upsert or using unique indices on the users and accepted arrays.

  TODO: SHOULD WE IMPLEMENT A DELETION OF THIS INVITATION / WHITELIST MANAGEMENT TO REMOVE USER ACCESS FROM RESULTS?
*/

const InvitationSchema = new Schema({
  //  Users should be a pretty simple combination of objectId and email
  createdBy: { type: String, required: true, match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
  invitee: { type: String, required: true, match: [/\S+@\S+\.\S+/, 'is invalid'] },
  accepted: { type: Boolean, required: true }
})

InvitationSchema.methods.acceptInvite = function () {
  this.accepted = true
}

module.exports = model('Invitation', InvitationSchema)
