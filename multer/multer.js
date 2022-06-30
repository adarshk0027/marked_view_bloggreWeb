const multer =require('multer')
//disk storage initialization
const shortid=require('shortid')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
      const prefix=shortid.generate()
      cb(null,prefix+'-'+file.originalname)
    }
})
exports.upload=multer({storage:storage})