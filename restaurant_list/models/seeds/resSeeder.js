if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json');
const bcrypt = require('bcryptjs')


const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  Promise.all(Array.from(
    { length: 2 },
    (_, i) =>
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
        .then(hash => User.create({
          name: SEED_USER[i].name,
          email: SEED_USER[i].email,
          password: hash
        }))
        .then(user => {
          const userId = { userId: user._id }
          let restaurantOwner = []
          restaurantList.results.forEach(data => {
            if (user.name === 'user1' && data.id <= 3) {
              data = Object.assign(data, userId)
              restaurantOwner.push(data)
            }
            else if (user.name === 'user2' && data.id > 3) {
              data = Object.assign(data, userId)
              restaurantOwner.push(data)
            }
          })
          return Promise.all(Array.from(
            { length: 3 }, (_, i) => Restaurant.create(restaurantOwner[i]))
          )
        })
        .then(() => {
          console.log('done.')
          process.exit()
        })
  ))
})


