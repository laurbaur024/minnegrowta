const router = require("express").Router();
const {
  find,
  findById,
  create,
  update,
  updateById,
  remove,
  addFavorite,
  addGarden,
  findFavPlantById,
} = require("../../controllers/user.controller");

router.get("/", async (req, res) => {
  try {
    const payload = await find(req.query);
    return res.status(200).json({ status: "success", payload });
  } catch (err) {
    return res.status(400).json({ status: "error", message: "no good" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const payload = await findById(id);
    return res.status(200).json({ status: "success", payload });
  } catch (err) {
    return res.status(400).json({ status: "error", message: "no good" });
  }
});

router.get("/myfavorites/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const payload = await findFavPlantById(id);
    return res.status(200).json({ status: "success", payload });
  } catch (err) {
    return res.status(400).json({ status: "error", message: "no good" });
  }
});

router.post("/", async (req, res) => {
  try {
    const payload = await create(req.body);
    return res.status(200).json({ status: "success", payload });
  } catch (err) {
    return res.status(400).json({ status: "error", message: "no good" });
  }
});

router.put("/", async (req, res) => {
  try {
    const payload = await update(req.query, req.body);
    return res.status(200).json({ status: "success", payload });
  } catch (err) {
    return res.status(400).json({ status: "error", message: "no good" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const payload = await updateById(id, req.body);
    return res.status(200).json({ status: "success", payload });
  } catch (err) {
    return res.status(400).json({ status: "error", message: "no good" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const payload = await remove(id);
    return res.status(200).json({ status: "success", payload });
  } catch (err) {
    return res.status(400).json({ status: "error", message: "no good" });
  }
});

//add favorite plant
router.put("/:id/addfavorite/:plantId", async (req, res) => {
  const id = req.params.id;
  const plantID = req.params.plantId;
  try {
    const payload = await addFavorite(id, plantID);
    return res.status(200).json({ status: "success", payload });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ status: "error", message: "no good" });
  }
});

//add plant to garden
router.put("/:id/addgarden/:plantId", async (req, res) => {
  const id = req.params.id;
  const plantID = req.params.plantId;
  try {
    const payload = await addGarden(id, plantID);
    return res.status(200).json({ status: "success", payload });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ status: "error", message: "no good" });
  }
});

//update user by removing plant from their favorites
router.put("/:id/favorites-remove/:plantId", async (req, res) => {
  console.log(req.params);
  const userId = req.params.id;
  const plantId = req.params.plantId;
  try {
    const payload = await updateById(userId, plantId);
    return res.status(200).json({ status: "success", payload });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: "error", message: "no good" });
  }
});

//remove plant from garden
router.delete("/:id/removegarden/:plantId", async (req, res) => {
  const id = req.params.id;
  try {
    const payload = await remove(id);
    return res.status(200).json({ status: "success", payload });
  } catch (err) {
    return res.status(400).json({ status: "error", message: "no good" });
  }
});

module.exports = router;
