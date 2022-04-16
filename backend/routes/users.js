const { model } = require('mongoose')
const router = require('express').Router()
const passport = require('passport')
const mongo = require('mongojs')
const User = model('User')
const auth = require('./auth')
const { getStripeSession } = require('./stripe')

// POST api/users registers users
router.post('/users', async (req, res, next) => {
  const user = new User()

  const sessionId = req.query.sessionId
  const session = await getStripeSession(sessionId)

  user.paid = session.payment_status === 'paid'

  user.email = req.body.user.email
  user.setPassword(req.body.user.password)

  if (!user.paid) {
    res.status(403).json({ errors: { message: 'something went wrong with the payment, try again.' } })
  }

  user.save()
    .then(user => {
      return res.json({
        user: user.toAuthJSON(user)
      })
    }).catch(next)
})

// POST api/users/login log a user in with a valid email and pass
router.post('/users/login', (req, res, next) => {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } })
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } })
  }

  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) { return next(err) }

    if (user) {
      user.token = user.generateJWT()
      return res.json({ user: user.toAuthJSON(user) })
    } else {
      return res.status(422).json(info)
    }
  })(req, res, next)
})

// GET api/user verify a specific user is logged in
router.get('/user', auth.required, (req, res, next) => {
  User.findById(req.payload.id).exec().then((user) => {
    if (!user) { return res.sendStatus(401) }

    return res.json({ user: user.toAuthJSON(), user_data: user })
  }).catch(next)
})

router.get('/user/:token', (req, res) => {
  const token = req.params && req.params.token ? req.params.token.split('.') : false
  if (!token) throw new Error('Not a valid query')
  const userId = JSON.parse(Buffer.from(token[1], 'base64').toString('ascii')).id

  // check to see if request is looking for particular user result, otherwise return most recently pushed
  const userResultsIndex = req.params.index || -1
  User.findOne({ _id: mongo.ObjectId(userId) })
    .exec()
    .then(user => {
      if (!user) { return res.sendStatus(401) }

      // TODO: support lookup keys for returning historic results
      return res.json({ result: user.results.slice(userResultsIndex).pop(), user_data: user })
    })
})

// GET results from user via :id
router.get('/user/result/:id', (req, res) => {
  const userId = req.params && req.params.id ? req.params.id : false
  if (!userId) throw new Error('Not a valid query')

  // check to see if request is looking for particular user result, otherwise return most recently pushed
  const userResultsIndex = req.params.index || -1
  User.findOne({ _id: mongo.ObjectId(userId) })
    .exec()
    .then(user => {
      if (!user) { return res.sendStatus(401) }

      // TODO: support lookup keys for returning historic results
      return res.json({ result: user.results.slice(userResultsIndex).pop() })
    })
})

// PUT api/user update password and or email
/* TODO refactor
   Does it also make sense to make PUT user update the user model to add the results?
*/
router.put('/user', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if (!user) { return res.sendStatus(401) }

    if (typeof req.body.user.email !== 'undefined') {
      user.email = req.body.user.email
    }
    if (typeof req.body.user.password !== 'undefined') {
      user.setPassword(req.body.user.password)
    }

    return user.save().then(() => {
      return res.json({ user: user.toAuthJSON() })
    })
  }).catch(next)
})

// GET api/logout logs a user out
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
