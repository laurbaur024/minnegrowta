const { Journal, User } = require('../models');
const Model = Journal


// get all journal entries
async function find(criteria = {}){
  try {
    const payload = await Model.find(criteria)
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}


// get journal entry by id
async function findById(id){
  try {
    const payload = await Model.findById(id)
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}



// create new journal entry
async function create(body){
  try {
    const payload = await Model.create(body);
    const updateUser = await User.findOneAndUpdate(
      { _id: body.userId },
      { $push: { myJournals: payload._id } },
      { new: true }
    );

    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}


// update journal entry by id
async function updateById(id, body){
  try {
    const payload = await Model.findByIdAndUpdate(id, body, { new: true })
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// delete journal by id
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
  create,
  updateById,
  remove
}