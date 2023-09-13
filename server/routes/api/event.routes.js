const router = require('express').Router();
const { 
  find,
  findById,
  create,
  updateById,
  remove 
} = require('../../controllers/event.controller');


//get alt event posts
router.get("/", async (req, res) => {
  try {
    const payload = await find(req.query)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", message: "no good" })
  }
})

//get event post by id
router.get("/:id", async (req, res) => {
 