// require packages used in the project
const express = require('express')
// 載入 mongoose
const mongoose = require('mongoose')

const app = express()

// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection



// 連線異常
db.on('error', () => {
  console.log('mongodb error')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')


// 載入餐廳清單
const { results } = require('./restaurant.json')
// const restaurantlist = require('./restaurant.json')


// setting template engine (載入之後，要告訴 Express：麻煩幫我把樣板引擎交給 express-handlebars)
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// app.set：透過這個方法告訴 Express 說要設定的 view engine 是 handlebars

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  // past the movie data into 'index' partial template
  res.render('index', { restaurants: results })
})
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = results.filter(restaurants => {
    return restaurants.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurants.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants, keyword })
}
)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})