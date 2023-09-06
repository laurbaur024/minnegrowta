


const { Plants } = require('../models')
const Model = Plants



//get all plants
async function find(criteria = {}){
  try {
    const payload = await Model.find(criteria)
    return payload
  } catch(err){
    if(process.env.NODE_ENV === "development") console.log(err)
  }
}

// get plants by id
async function findById(id){
  try {
    const payload = await Model.findById(id)
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