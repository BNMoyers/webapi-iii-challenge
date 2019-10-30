/*dependencies & inports*/
const express = require("express");
const PostsDB = require("./postDb");
const router = express.Router();

/*requests*/

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id;
  PostsDB.getById(id)
    .then(posts => {
      !posts
        ? res.status(404).json({ message: "invalid user id" })
        : (req.posts = posts);
      next();
    })
    .catch(err => {
      res.status(400).json({ err });
    });
}

module.exports = router;
