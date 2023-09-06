const router = require('express').Router();
const { 
  find,
  findById,
  create,
  update,
  updateById,
  remove 
} = require('../../controllers/user.controller');


//get all blog posts
router.get("/", async (req, res) => {
  try {
    const payload = await find(req.query)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

//get blog post by id
router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await findById(id)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

//create new blog post
router.post("/", async (req, res) => {
  try {
    const payload = await create(req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

//update blog post by id
router.put("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await updateById(id, req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

//delete blog post by id
router.delete("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await remove(id)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})


module.exports = router;