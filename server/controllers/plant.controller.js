const { Plant, User } = require("../models");
const Model = Plant;

//get all plants
async function find(criteria = {}) {
  try {
    const payload = await Model.find(criteria);
    return payload;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
  }
}

// get plants by id
async function findById(id) {
  try {
    const payload = await Model.findById(id);
    return payload;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
    throw new Error(err);
  }
}

//get a plant by name
async function findByName(name = {}){
  try {
    const payload = await Model.find(name)
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
  }
}

module.exports = {
  find,
  findById,
  findByName,
};
