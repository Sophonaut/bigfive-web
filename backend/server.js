const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  require('dotenv').config()
}
// TODO cleanup and comment
const next = require('next')
// frontend routes
const routes = require('../routes')
const mongo = require('mongojs')
const mongoose = require('mongoose')

const helmet = require('helmet')
const config = require('../config')
const validMongoId = require('../lib/valid-mongoid')
const { join } = require('path')
const app = next({ dev })
const handler = routes.getRequestHandler(app)
const port = parseInt(process.env.PORT, 10) || 3000
const express = require('express')
require('./models/User')
require('./models/Invitation')
require('./shared/passport')
const userRoutes = require('./routes/users')
const invitationRoutes = require('./routes/invitations')
const stripeRoutes = require('./routes/stripe')

app.prepare().then(() => {
  const server = express()
  const db = mongo(config.DB_CONNECTION)
  const collection = db.collection(config.DB_COLLECTION)

  mongoose
    .connect(config.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(console.log(`MongoDB connected ${config.DB_CONNECTION}`))
    .catch(err => console.log(err))

  if (dev) {
    mongoose.set('debug', true)
  }

  /*
  The reason this is here is because I was running into an issue querying on User without using the Mongoose model.
  I know that this gets handled in the routes bootstrapping for User, but is there a better way to handle this?
  */
  const User = mongoose.model('User')

  server.use(helmet())
  server.use(express.json())

  /* Alheimsins config stuff */
  server.get('../sitemap.xml', (req, res) => {
    const filePath = join(__dirname, 'static', 'sitemap.xml')
    return app.serveStatic(req, res, filePath)
  })

  server.get('../service-worker.js', (req, res) => {
    const filePath = join(__dirname, '.next', 'service-worker.js')
    return app.serveStatic(req, res, filePath)
  })

  // TODO: Results APIs should be compartmentalized into their own routes
  server.get('/api/get/:id', (req, res) => {
    const id = req.params && req.params.id ? req.params.id : false
    if (!id || !validMongoId(id)) throw new Error('Not a valid id')
    collection.findOne({ _id: mongo.ObjectId(id) }, (error, data) => {
      if (error) throw error
      res.send(data)
    })
  })

  server.post('/api/save', async (req, res) => {
    const token = req.body.user && req.body.user.token ? req.body.user.token.split('.') : false
    if (!token) throw new Error('Not a valid query')
    const userId = JSON.parse(Buffer.from(token[1], 'base64').toString('ascii')).id

    const payload = req.body.result
    const result = await collection.insert(payload)
    if (!result) return res.sendStatus(401)

    console.log(JSON.stringify(result))

    if (userId) {
      User.findOne({ _id: mongo.ObjectId(userId) })
        .exec()
        .then((user) => {
          user.results.push(result._id)
          user.save((err) => {
            if (err) throw err
          })
        })
        .catch(err => { throw new Error(err) })
    }

    res.send(data)
  })

  // api/users routes mounted
  server.use('/api/', userRoutes)

  // api/invitations routes mounted
  server.use('/api/', invitationRoutes)

  // api/stripe routes mounted
  server.use('/api/', stripeRoutes)

  server.use(handler)

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port} - env ${process.env.NODE_ENV}`)
  })
})
