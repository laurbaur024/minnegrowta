const router = require('express').Router();
const { 
  find,
  findById,
  create,
  updateById,
  remove 
} = require('../../controllers/comments.controller');

// get all comments
router.get("/", async (req, res) => {
  try {
    const payload = await find(req.query)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", message: "no good" })
  }
})

// get comment by id
router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await findById(id)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", message: "no good" })
  }
})

// create new comment
router.post("/:id", async (req, res) => {
  try {
    console.log(req.session)
    const payload = await create(req.params, req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", message: "no good" })
  }
})

// update comment by id
router.put("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await updateById(id, req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", message: "no good" })
  }
})

// delete comment by id
router.delete("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await remove(id)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", message: "no good" })
  }
})



module.exports = router;