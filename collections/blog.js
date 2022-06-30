const Blog = require('../models/blogSchema')
const showdown = require('showdown')
const converter = new showdown.Converter()
exports.CreateBlog = async (req, res) => {
  try {
    const { title, description, marked } = req.body
    const isBlogAlready = await Blog.findOne({ title: title }).exec()
    if (isBlogAlready)
      return res.status(400).json({ message: 'already posted ' })
    else {
      console.log(req.file)
      const blogImage = req.file && req.file.filename
      const createdBy = req.user._id
      const create_Blog = await Blog.create({
        title,
        description,
        blogImage,
        marked,
        _html: converter.makeHtml(marked),
        createdBy
      })
      res.status(200).json({
        message: 'added succesfull',
        data: create_Blog
      })
    }
    //send responses
  } catch (error) {
    console.log(error)
  }
}
exports.GetBlogData = async (req, res) => {
  try {
    const { blogId } = req.params
    console.log(blogId.toString())
    const datas = await Blog.findOne({ slug: blogId }).exec()
    console.log('true')
    if (datas) {
      res.status(200).json({
        data: datas
      })
    } else {
      console.log('error')
      res.status(400).json({
        error: 'wrong'
      })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: 'id not right' })
  }
}
exports.Get_all_blogs = async (req, res) => {
  try {
    const all_blogs = await Blog.find({}).populate(
      'createdBy',
      'firstName userName _id profilePicture'
    )
    if (all_blogs) {
      res.status(200).json({
        mesage: 'data got success fully',
        blogs: all_blogs
      })
    }
  } catch (error) {
    res.send('something wrong check internet !!!')
    console.log(error)
  }
}
exports.updateBlogData = async (req, res) => {
  try {
    const _forUpdate = await Blog.findOneAndUpdate(
      { _id: req.body._id },
      {
        title: req.body.title,
        description: req.body.description,
        marked: req.body.marked,
        blogImage: req.file && req.file.filename,
        _html: converter.makeHtml(req.body.marked)
      }
    )
    if (_forUpdate) {
      res.status(200).json({
        message: 'updated'
      })
    }
  } catch (error) {
    console.log(error)
  }
}
exports.MyBlogs = async (req, res) => {
  try {
    const id = req.user._id
    const myBlog = await Blog.find({ createdBy: id }).exec()
    if (myBlog) {
      res.status(200).json({ data: myBlog })
    } else {
      res.status(400).json({ message: 'error happens' })
    }
  } catch (error) {
    res.send('something Went wrong check internet!!!!!')
  }
}
exports.DleteBlog = async (req, res) => {
  try {
    const id = req.params.blogId
    const _delete = await Blog.findOneAndDelete({ _id: id })
    if (_delete) {
      res.status(200).json({ mess: _delete })
    }
  } catch (error) {
    console.log(error)
  }
}

exports.Charts = async (req, res) => {
  try {
    let chart = {}
    const data = await Blog.find({}).select("createdAt")
    //console.log(data);
    const dates= await data.map((item)=>{
      let date= new Date(item.createdAt)
      let key=`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      chart[key]=chart[key] ? chart[key] + 1 : 1
      
    })
    
    res.status(200).json(chart)
  } catch (err) {
    console.log(err)
  }
}
