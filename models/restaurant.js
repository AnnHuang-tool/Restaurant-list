const mongoose = require('mongoose')
const Schema = mongoose.Schema
const resSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: String,
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    lowercase: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  phone: String,
  google_map: {
    type: String,
    lowercase: true,
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  description: {
    type: String,
    required: true
  },
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Restaurant', resSchema)