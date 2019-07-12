var express = require("express");
var router = express.Router();
const postsModel = require("../models/posts");

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("welcome to my API").status(200);
});

router.get("/all", async (req, res, next) => {
  const allPosts = await postsModel.getAll();
  res.json(allPosts).status(200);
});

router.get("/post/:id?", async (req, res, next) => {
  const postId = req.params.id;
  const postData = await postsModel.getOneById(postId);
  res.json(postData).status(200);
});

router.delete("/post/delete/:id?", async (req, res, next) => {
  const postId = req.params.id;
  const response = await postsModel.removePost(postId);
  if (response.command === "DELETE" && response.rowCount >= 1) {
    res.sendStatus(200);
  } else {
    res.send(`There is no post with post id ${postId}`).status(409);
  }
});

router.post("/post/add", async (req, res, next) => {
  const { title, content, author_id } = req.body;
  postsModel.addPost(title, content, author_id);
  if (res.command === "INSERT" && res.rowCount >= 1) {
    res.sendStatus(200);
  } else {
    res.send(`Could not add new blog post: ${title}`).status(409);
  }
});

router.put("/post/update/:id?", async (req, res, next) => {
  const { title, content, author_id } = req.body;
  const postId = req.params.id;
  const response = await postsModel.updatePost(postId, "content", content);
  console.log(response);
  if (response.command === "UPDATE" && response.rowCount >= 1) {
    res.sendStatus(200);
  } else {
    res.send(`Could not update post with id ${postId}`).status(200);
  }
});

module.exports = router;
