const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入  model
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Restaurant.creat({ name: 'name-' + i })
  }
  console.log('done')
})