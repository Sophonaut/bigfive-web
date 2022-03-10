const routes = module.exports = require('next-routes')()

routes
  .add({ name: 'default', pattern: '/', page: 'buy' })
  .add('buy', '/buy')
  .add('about', '/about')
  .add('index', '/test-prep')
  .add('test', '/test/:lang?')
  // .add('result', '/result')
  // .add('showResult', '/result/:id')
  .add('showResult', '/result')
  .add('compare', '/compare')
  .add('signup', '/signup')
  .add('showCompare', '/compare/:id', 'showCompare')
