const router = require('express').Router();
const { 
  find,
  findById,
  create,
  update,
  updateById,
  remove 
} = require('../../controllers/user.controller');




// get all plants 
router.get("/", async (req, res) => {
  try {
    const payload = await find(req.query)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

// get plant by id
router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await findById(id)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})


module.exports = router;