const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const slugify = require('slugify')
const BlogSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    title: {
      type: String,
      required: true,
      min: 2,
      trim: true,
      unique:true
    },
    description: {
      type: String,
      required: true,
      trim: true

      
    },
    marked: {
      type: String,
      required:true
    },
    _html:{
      type:String,
      required:true
    },
    slug: {
      type: String
    },
    blogImage:{
      type:String,
      required:false,
    }
  },
  { timestamps }
)
//create slug before validation
BlogSchema.pre('save',function(next){
    if(this.title){
      console.log("hyyyy");
        this.slug=slugify(this.title,{lower:true,strict:true})
    }
    next()
})

module.exports=mongoose.model('blogs',BlogSchema)
