const { Event, User } = require("../models");
const Model = Event;

//get all events
async function find(criteria = {}) {
  try {
    const payload = await Model.find(criteria);
    return payload;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
  }
}

// get events by id
async function findById(id) {
  try {
    const payload = await Model.findById(id);
    return payload;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
    throw new Error(err);
  }
}

//get all events by name
async function findByName(req) {
  try {
    const payload = await Model.find({ name: req.params.name });
    return payload;
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
  }
}

// create new event
async function create(body){
    try {
            const payload = await Model.create(body)
            return payload
    } catch(err){
            if(process.env.NODE_ENV === "development") console.log(err)
            throw new Error(err)
    }
    }

    // update existing event by id
    async function updateById(id, body){
    try {
            const payload = await Model.findByIdAndUpdate(id, body, { new: true })
            return payload
    } catch(err){
            if(process.env.NODE_ENV === "development") console.log(err)
            throw new Error(err)
    }
    }

    // delete event by id
    async function remove(id){
    try {
            const payload = await Model.findByIdAndDelete(id)
            return payload
    } catch(err){
            if(process.env.NODE_ENV === "development") console.log(err)
            throw new Error(err)
    }
    }



module.exports = {
  find,
  findById,
  findByName,
  create,
  updateById,
  remove
};
