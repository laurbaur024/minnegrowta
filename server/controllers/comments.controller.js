const { Comment, Forum } = require('../models');
const Model = Comment


// get all comments
async function find(criteria = {}){
  try {
    const payload = await Model.find(criteria)
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// get comments by id
async function findById(id){
  try {
    const payload = await Model.findById(id)
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// create a new comment 
async function create(params, body){
  try {
    console.log(body)
    const payload = await Model.create({...body, forumId: params.id })
    const forumUpdate = await Forum.findOneAndUpdate({_id: params.id },
      {
        $push: {commentId: payload._id}
      })
    return forumUpdate
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}


// update comment by id
async function updateById(id, body){
  try {
    const payload = await Model.findByIdAndUpdate(id, body, { new: true })
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}


// delete comment by id
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