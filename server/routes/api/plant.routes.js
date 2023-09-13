const router = require("express").Router();
const {
  find,
  findById,
  findByName,
} = require("../../controllers/plant.controller");

// get all plants
router.get("/", async (req, res) => {
  try {
    const payload = await find(req.query);
    return res.status(200).json({ status: "success", payload });
  } catch (err) {
    return res.status(400).json({ status: "error", message: "no good" });
  }
});

// get plant by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const payload = await findById(id);
    return res.status(200).json({ status: "success", payload });
  } catch (err) {
    return res.status(400).json({ status: "error", message: "no good" });
  }
});

//get plant by name
router.get("/search/:name", async (req, res) => {
  const name = req.params.name;
  console.log(name);
  try {
    const payload = await findByName(name)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", message: "no good" })
  }
});

module.exports = router;
