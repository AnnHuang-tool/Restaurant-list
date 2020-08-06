// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 restaurant model
const Expense = require('../../views/models/expense')
// 定義首頁路由

router.get('/', (req, res) => {
  Expense.find()
    .lean()
    .then(expense => res.render('index', { expense }))
    .catch(error => console.error(error))
  // past the movie data into 'index' partial template
  // res.render('index', { restaurants: results })
})
// 匯出路由模組
module.exports = router