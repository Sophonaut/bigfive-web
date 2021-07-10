const routes = module.exports = require('next-routes')()

routes
  .add('buy', '/')
  .add('test', '/test/:lang?')
  .add('result', '/result')
  .add('showResult', '/result/:id')
  .add('compare', '/compare')
  .add('signup', '/signup')
  .add('showCompare', '/compare/:id', 'showCompare')
