const mongoose = require('mongoose')
const timestamp=require('mongoose-timestamp')
const FavouriteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required:true,
  },
  favourites: [
    {
      blogItems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs'
      }
    }
  ]
},{timestamp})

module.exports=mongoose.model('favourite',FavouriteSchema)
