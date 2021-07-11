const routes = module.exports = require('next-routes')()

routes
  .add({ name: 'default', pattern: '/', page: 'buy' })
  .add('buy', '/buy')
  .add('about', '/about')
  .add('test', '/test/:lang?')
  .add('result', '/result')
  .add('showResult', '/result/:id')
  .add('compare', '/compare')
  .add('signup', '/signup')
  .add('showCompare', '/compare/:id', 'showCompare')
