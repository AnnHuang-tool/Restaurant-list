// require packages used in the project
const express = require('express')
// 載入 mongoose
// const mongoose = require('mongoose')
const session = require('express-session')
const app = express()
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
// // 設定連線到 mongoDB
// mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

// // 取得資料庫連線狀態
// const db = mongoose.connection



// // 連線異常
// db.on('error', () => {
//   console.log('mongodb error')
// })

// // 連線成功
// db.once('open', () => {
//   console.log('mongodb connected!')
// })

const port = process.env.PORT

// require express-handlebars here
const exphbs = require('express-handlebars')

// / 引用路由器
const routes = require('./routes')
require('./config/mongoose')


// 載入餐廳清單
const { results } = require('./restaurant.json')
// const Restaurant = require('./views/models/restaurant')

// 引用 body-parser
const bodyParser = require('body-parser')
// const restaurantlist = require('./restaurant.json')
// 載入 method-override
const methodOverride = require('method-override')

const flash = require('connect-flash')   // 引用套件
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// setting template engine (載入之後，要告訴 Express：麻煩幫我把樣板引擎交給 express-handlebars)
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// app.set：透過這個方法告訴 Express 說要設定的 view engine 是 handlebars

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// setting static files
app.use(express.static('public'))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

app.use(flash())  // 掛載套件


app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

// 將 request 導入路由器
app.use(routes)

// routes setting

// app.get('/', (req, res) => {
//   Restaurant.find()
//     .lean()
//     .then(restaurants => res.render('index', { restaurants }))
//     .catch(error => console.error(error))
//   // past the movie data into 'index' partial template
//   // res.render('index', { restaurants: results })
// })

// // 新增
// app.get('/restaurants/new', (req, res) => {
//   return res.render('new')
// })

// app.post('/restaurants', (req, res) => {
//   const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
//   return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
//     .then(() => res.redirect('/')
//       .catch(error => console.log(error)))
// })

// // 瀏覽
// app.get('/restaurants/:id', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .lean()
//     .then(restaurant => res.render('show', { restaurant }))
//     .catch(error => console.log(error))
// })

// // 編輯修改
// app.get('/restaurants/:id/edit', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .lean()
//     .then((restaurant) => res.render('edit', { restaurant }))
//     .catch(error => console.log(error))
// })

// // Update 功能：資料庫修改特定 res 的資料
// app.put('/restaurants/:id', (req, res) => {
//   const id = req.params.id
//   const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
//   return Restaurant.findById(id)
//     .then(restaurant => {
//       restaurant.name = name
//       restaurant.name_en = name_en
//       restaurant.category = category
//       restaurant.image = image
//       restaurant.location = location
//       restaurant.phone = phone
//       restaurant.google_map = google_map
//       restaurant.rating = rating
//       restaurant.description = description
//       return restaurant.save()
//     })
//     .then(() => res.redirect(`/restaurants/${id}`))
//     .catch(error => console.log(error))
// })



// // 刪除
// app.delete('/restaurants/:id', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .then(restaurants => restaurants.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const restaurant = results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
//   res.render('show', { restaurant: restaurant })
// })

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const restaurants = results.filter(restaurants => {
//     return restaurants.name.toLowerCase().includes(keyword.toLowerCase()) ||
//       restaurants.category.toLowerCase().includes(keyword.toLowerCase())
//   })
//   res.render('index', { restaurants, keyword })
// }
// )

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})