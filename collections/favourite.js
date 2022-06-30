const Favourite = require('../models/favouriteSchema')

exports.UpdateFavourites = async (req, res) => {
  try {
    const state = req.body.heart
    const { blogItem } = req.body
    // check the user have an collection or not
    const _already_a_collection = await Favourite.findOne({
      user: req.user._id
    }).exec()
    //if have already a collection update the array with each click
    if (_already_a_collection) {
        console.log(_already_a_collection.favourites);
      //then update the array
      //if the heart is already red for that cart
      const heart_already_fill = _already_a_collection.favourites.find(
        (blog, item) => blog.blogItems == blogItem
      )
      if (heart_already_fill) {
        if (!state) {
          //the heat is false delete the blog
          const heart_unfill=await Favourite.findOneAndUpdate({user:req.user._id},{
            $pull:{
                "favourites":{blogItems:blogItem}
            }
          })
          if(heart_unfill){
            return res.status(200).json({message:"heart unfill  "})
          }
        }
      } else {
        console.log(state);
        //add the blog id to favourites array
        const heart_red = await Favourite.findOneAndUpdate(
          { user: req.user._id },
          {
            "$push": {
              'favourites': {blogItems:blogItem}
            }
          }
        )
        if (heart_red) {
          return res.status(200).json('new blog will add with heart fill')
        }
      }
      //delete blog id from array
    } else {
      if (state) {
        let favourites = []
        favourites.push({ blogItems: blogItem })
        const create_collection = await Favourite.create({
          user: req.user._id,
          favourites
        })
        if (create_collection) {
          res.status(200).json({ message: 'added succesfully' })
        }
      }
    }
    //not a collection just create it with user id
  } catch (error) {
    console.log(error)
  }
}

exports.Get_Favourites=async(req,res)=>{
try{
const all_favourites=await Favourite.find({user:req.user._id}).populate('favourites.blogItems')
const Favourites={}
all_favourites[0].favourites.forEach(blog => {
    Favourites[blog.blogItems._id]=true
});
res.status(200).json({data:Favourites,fav:all_favourites[0].favourites})
}
catch(error){
    console.log(error);
}
}
