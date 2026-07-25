const { test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const api = supertest(app)

const initialBlogs = [
  {
    title: "First Blog",
    author: "First Author",
    url: "https://first.com",
    likes: 10,
  },
  {
    title: "Second Blog",
    author: "Second Author",
    url: "https://second.com",
    likes: 20,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test("all blogs are returned as json with contact", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
  const contents = response.body.map((blog) => blog.title)
  assert(contents.includes("First Blog"))
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test("new blog can be added", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "https://test.com",
    likes: 5,
  }
  const blogsAtStart = await api.get("/api/blogs")
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)
  const blogsAtEnd = await api.get("/api/blogs")
  const titles = blogsAtEnd.body.map((b) => b.title)
  assert(titles.includes("Test Blog"))
  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length + 1)
})

test("blogs have an id property", async () => {
  const response = await api.get("/api/blogs")
  const blogs = response.body
  blogs.forEach((blog) => {
    assert.ok(blog.id)
  })
})

test("valid blog can be added without likes", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "https://test.com",
  }
  const blogsAtStart = await api.get("/api/blogs")
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)
  const blogsAtEnd = await api.get("/api/blogs")
  const addedBlog = blogsAtEnd.body.find((blog) => blog.title === "Test Blog")
  assert.strictEqual(addedBlog.likes, 0)
  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length + 1)
})

test("blog without title is not added", async () => {
  const newBlog = {
    author: "Test Author",
    url: "https://test.com",
    likes: 1,
  }

  const blogsAtStart = await api.get("/api/blogs")

  await api.post("/api/blogs").send(newBlog).expect(400)

  const blogsAtEnd = await api.get("/api/blogs")

  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length)
})
test("blog without author is added", async () => {
  const newBlog = {
    title: "Test Blog",
    url: "https://test.com",
    likes: 1,
  }

  const blogsAtStart = await api.get("/api/blogs")

  await api.post("/api/blogs").send(newBlog).expect(201)

  const blogsAtEnd = await api.get("/api/blogs")

  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length + 1)
})
test("blog without url is not added", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    likes: 1,
  }

  const blogsAtStart = await api.get("/api/blogs")

  await api.post("/api/blogs").send(newBlog).expect(400)

  const blogsAtEnd = await api.get("/api/blogs")

  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length)
})

test("one bloge can be deleted", async () => {
  const blogAsStart = await api.get("/api/blogs")
  const blogToDelete = blogAsStart.body[0]
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
  const blogsAtEnd = await api.get("/api/blogs")
  assert.strictEqual(blogsAtEnd.body.length, blogAsStart.body.length - 1)
  const titles = blogsAtEnd.body.map((blog) => blog.title)
  assert(!titles.includes(blogToDelete.title))
})
test("one bloge can be updated", async () => {
  const updatedBlog = {
    likes: 100,
  }
  const blogAsStart = await api.get("/api/blogs")
  const blogToupdat = blogAsStart.body[0]
  await api.put(`/api/blogs/${blogToupdat.id}`).send(updatedBlog).expect(200)
  const blogsAtEnd = await api.get("/api/blogs")
  assert.strictEqual(blogsAtEnd.body.length, blogAsStart.body.length)
  const titles = blogsAtEnd.body.map((blog) => blog.title)
  assert(titles.includes(blogToupdat.title))
})

after(async () => {
  await mongoose.connection.close()
})
