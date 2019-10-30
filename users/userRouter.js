/*dependencies & imports*/
const express = require("express");
const userDb = require("./userDb");
const postsDb = require("../posts/postDb");
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  const body = req.body;
  userDb
    .insert(body)
    .then(user => {
      res.status(201).json({ user });
    })
    .catch(err => {
      res.status(500).json({ message: "could not add user " });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const body = req.body;
  body.user_id = req.params.id;

  postDb
    .insert(body)
    .then(user => {
      res.status(201).json({ user });
    })
    .catch(err => {
      res.status(500).json({ message: "could not add  post" });
    });
});

router.get("/", (req, res) => {
  userDb
    .get()
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(err => {
      res.status(500).json({ message: "could not retreive users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(201).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  userDb.getUserPosts(req.params.id);
  then(posts => {
    res.status(200).json({ posts });
  }).catch(err => {
    res.status(500).json({ message: "could not retreive user's posts" });
  });
});

router.delete("/:id", validateUserId, (req, res) => {
  userDb
    .remove(req.params.id)
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(err => {
      res.status(500).json({ message: "could not delete user" });
    });
});

router.put("/:id", validateUser, validateUserId, (req, res) => {
  userDb.update(req.params.id, req.body).then(() => {
    userDb
      .getById(req.params.id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({ message: "could not update user" });
      });
  });
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  userDb
    .getById(id)
    .then(user => {
      !user
        ? res.status(404).json({ message: "invalid user id" })
        : (req.user = user);
      next();
    })
    .catch(err => {
      res.status(400).json({ err });
    });
}

function validateUser(req, res, next) {
  const body = req.body;
  const name = req.body.name;

  !body
    ? res.status(400).json({ message: "missing user data" })
    : !name
    ? res.status(400).json({ message: "missing required name field" })
    : next();
}

function validatePost(req, res, next) {
  const body = req.body;
  const text = req.body.text;
  !body
    ? res.status(400).json({ message: "missing post data" })
    : !text
    ? res.status(400).json({ message: "missing required text field" })
    : next();
}

module.exports = router;
