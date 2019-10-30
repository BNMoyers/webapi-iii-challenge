/*dependencies & imports*/
const express = require("express");
const userDb = require("./userDb");
const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

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

    !body ? res.status(400).json({ message: "missing user data" })
    : !name ? res.status(400).json({ message: "missing required name field"  })
    : next();
}

function validatePost(req, res, next) {}

module.exports = router;
