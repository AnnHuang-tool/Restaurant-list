const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },

})
module.exports = mongoose.model('Expense', expSchema)