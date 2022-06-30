var express = require('express')
var router = express.Router()
const { is_User_In } = require('../collections/user')
const { CreateBlog, GetBlogData, Get_all_blogs, updateBlogData, MyBlogs, DleteBlog, Charts } = require('../collections/blog')
const { upload } = require('../multer/multer')
const marked=require('marked')
const { UpdateFavourites, Get_Favourites } = require('../collections/favourite')
// const CreateDom=require('dompurify')
// const {JSDOM} =require('jsdom')
// const dompurify=CreateDom(new JSDOM().window)


router.post('/create-new', is_User_In, upload.single('blogImage'), CreateBlog)
router.get('/getblog-data/:blogId', GetBlogData)
router.get('/get-all-blogs',Get_all_blogs)
router.get('/my-blogs',is_User_In,MyBlogs)
router.post('/update',upload.single('blogImage'),updateBlogData)
router.post('/delete/:blogId',DleteBlog)
router.post('/heart',is_User_In,UpdateFavourites)
router.get('/favourites',is_User_In,Get_Favourites)
router.get('/chart',Charts)

module.exports = router
