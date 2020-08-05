// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 restaurant model
const Restaurant = require('../../views/models/restaurant')
// 定義首頁路由

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
  // past the movie data into 'index' partial template
  // res.render('index', { restaurants: results })
})
// 匯出路由模組
module.exports = router