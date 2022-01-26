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
const requestCountry = require('request-country')
const config = require('../config')
const validMongoId = require('../lib/valid-mongoid')
const { join } = require('path')
const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const i18n = require('../i18n')
const app = next({ dev })
const handler = routes.getRequestHandler(app)
const port = parseInt(process.env.PORT, 10) || 3000
const express = require('express')
require('./models/User')
require('./shared/passport')
const userRoutes = require('./routes/users')
const stripeRoutes = require('./routes/stripe')

i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      fallbackLng: 'en',
      preload: ['en', 'es'], // Preload all languages
      ns: ['common', 'home'], // Need to preload all the namespaces
      backend: {
        loadPath: join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
        addPath: join(__dirname, '../locales/{{lng}}/{{ns}}.missing.json')
      }
    },
    () => {
      // Loaded translations we can bootstrap our routes
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
        server.use(i18nextMiddleware.handle(i18n))
        server.use('../locales', express.static(join(__dirname, '../locales'))) // Serve locales for client
        server.use(requestCountry.middleware({
          privateIpCountry: 'en'
        }))

        server.get('../sitemap.xml', (req, res) => {
          const filePath = join(__dirname, 'static', 'sitemap.xml')
          return app.serveStatic(req, res, filePath)
        })

        server.get('../service-worker.js', (req, res) => {
          const filePath = join(__dirname, '.next', 'service-worker.js')
          return app.serveStatic(req, res, filePath)
        })

        server.post('../locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n))

        server.get('/api/get/:id', (req, res) => {
          const id = req.params && req.params.id ? req.params.id : false
          if (!id || !validMongoId(id)) throw new Error('Not a valid id')
          collection.findOne({ _id: mongo.ObjectId(id) }, (error, data) => {
            if (error) throw error
            res.send(data)
          })
        })

        /*
          Takes in the updated body, locates user based on EMAIL (yikes, could we handle this with token instead?),
          then continues to save the result in the results collection as normal. There has to be a way to insert
          this into the User collection without explicitly requiring the mongoose model after mongoose setup, right?
        */
        server.post('/api/save', (req, res) => {
          console.log(req.body)
          if (req.body.user.email) {
            const user = User.findOne({ email: req.body.user.email }, (err) => {
              if (err) { throw err }
              if (!user) { return res.sendStatus(401) }
            }).then((user) => {
              user.result = req.body.result
              user.save((err) => {
                if (err) throw err
              })
            })
          }

          const payload = req.body.result
          collection.insert(payload, (error, data) => {
            if (error) throw error
            res.send(data)
          })
        })

        // api/users routes mounted
        server.use('/api/', userRoutes)

        // api/stripe routes mounted
        server.use('/api/', stripeRoutes)

        server.use(handler)

        server.listen(port, (err) => {
          if (err) throw err
          console.log(`> Ready on http://localhost:${port}`)
        })
      })
    }
  )
