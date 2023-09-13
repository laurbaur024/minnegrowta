const { User } = require("../models");
const Model = User;

async function find(criteria = {}) {
  try {
    const payload = await Model.find(criteria);
    return payload;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
    throw new Error(err);
  }
}

async function findOne(criteria = {}) {
  try {
    const payload = await Model.find(criteria).populate("myForums").limit(1);
    return Array.isArray(payload) ? payload[0] : payload;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
    throw new Error(err);
  }
}

//find a user's forum posts by their id
async function findById(id) {
  try {
    const payload = await Model.findById(id).populate("myForums").populate("myJournals");
    console.log(payload);
    return payload;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
    throw new Error(err);
  }
}



//find a user's favorite plants
async function findFavPlantById(id) {
  try {
    const payload = await Model.findById(id).populate("favPlant");
    console.log(payload);
    return payload;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
    throw new Error(err);
  }
}



async function create(body) {
  try {
    const payload = await Model.create(body);
    console.log("create", payload);
    return payload;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
    throw new Error(err);
  }
}

async function update(criteria, body) {
  try {
    const payload = await Model.findOneAndUpdate(criteria, body, { new: true });
    return payload;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
    throw new Error(err);
  }
}

async function updateById(id, body) {
  try {
    const payload = await Model.findByIdAndUpdate(id, body, { new: true });
    return payload;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
    throw new Error(err);
  }
}

//remove plant from a user's favorites list
async function updateById(userId, plantId) {
  console.log(plantId);
  try {
    const payload = await Model.findOneAndUpdate(
      { _id: userId },
      { $pull: { favPlant: plantId } },
      { runValidators: true, new: true }
    );
    return payload;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
    throw new Error(err);
  }
}

//original version of remove:
async function remove(id) {
  try {
    const payload = await Model.findByIdAndDelete(id);
    return payload;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
    throw new Error(err);
  }
}

async function addFavorite(userId, plantId) {
  try {
    const payload = await Model.findOneAndUpdate(
      { _id: userId },
      { $push: { favPlant: plantId } },
      { new: true }
    );
    return payload;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
    throw new Error(err);
  }
}

async function addGarden(userId, plantId) {
  try {
    const payload = await Model.findOneAndUpdate(
      {_id: userId},
      {$push: {gardenPlant: plantId}},
      {new:true},
    );return payload
  }   catch (err) {
      if (process.env.NODE_ENV === "development") console.log(err);
      throw new Error(err);
  }
}

module.exports = {
  find,
  findOne,
  findById,
  create,
  update,
  updateById,
  remove,
  addFavorite,
  addGarden,
  findFavPlantById,
};
