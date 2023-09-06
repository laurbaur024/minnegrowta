const { Blog } = require('../models');
const Model = Blog


//get all blog posts
async function find(criteria = {}){
  try {
    const payload = await Model.find(criteria)
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

//get blog post by id
async function findById(id){
  try {
    const payload = await Model.findById(id)
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// create new blog post
async function create(body){
  try {
    const payload = await Model.create(body)
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// update existing blog post by id
async function updateById(id, body){
  try {
    const payload = await Model.findByIdAndUpdate(id, body, { new: true })
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
    throw new Error(err)
  }
}

// delete blog post by id
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
  findOne,
  findById,
  create,
  update,
  updateById,
  remove
}