/*dependencies & inports*/
const express = require("express");
const PostsDB = require("./postDb");
const router = express.Router();

/*requests*/

router.get("/", (req, res) => {
  PostsDB.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  PostsDB.getById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  const id = req.params.id;
  PostsDB.remove(id)
    .then(() => {
      res.status(200).json(id);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", validatePostId, (req, res) => {
  PostsDB.update(req.params.id, req.body)
    .then(() => {
      PostsDB.getById(req.params.id).then(post => {
        res.status(200).json(post);
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

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
