// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 準備引入路由模組
const { authenticator } = require('../middleware/auth')  // 掛載 middleware



const users = require('./modules/users')

const auth = require('./modules/auth')   // 引用模組

// 引入 home 模組程式碼
const home = require('./modules/home')


// 引入 res 模組程式碼
const restaurants = require('./modules/restaurants')


// 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組 
router.use('/restaurants', authenticator, restaurants)// 加入驗證程序



router.use('/users', users)
// 匯出路由器

router.use('/auth', auth)  // 掛載模組
// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', authenticator, home) // 加入驗證程序放到最下面

module.exports = router
