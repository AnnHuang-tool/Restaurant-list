// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
// 載入餐廳清單
const restaurantlist = require('./restaurant.json')
// setting template engine (載入之後，要告訴 Express：麻煩幫我把樣板引擎交給 express-handlebars)
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// app.set：透過這個方法告訴 Express 說要設定的 view engine 是 handlebars

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  // past the movie data into 'index' partial template
  res.render('index', { restaurants: restaurantlist.results })
})
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantlist.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantlist.results.filter(restaurants => {
    return restaurants.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurants.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
}
)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})