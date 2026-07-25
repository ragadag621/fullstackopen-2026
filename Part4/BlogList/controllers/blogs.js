const blogsRouter = require("express").Router()
const Blog = require("../models/Blog")

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (erorr) {
    next(erorr)
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true },
    )

    response.status(200).json(updatedBlog)
  } catch (erorr) {
    next(erorr)
  }
})

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (erorr) {
    next(erorr)
  }
})

blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    })

    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
