const sequelize = require('../config/connection');
const { Comment, Flower, Forum, Journal, Plant, User } = require('../models');

const commentData = require('./commentSeedData.json');
const flowerData = require('./flowerSeedData.json');
const forumData = require('./forumSeedData.json');
const journalData = require('./journalSeedData.json');
const plantData = require('./plantSeedData.json');
const userData = require('./userSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({force:true});

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true, 
  });

  const flowers = await Flower.blukCreate(flowerData, {});

  const plants = await Plant.blukCreate(plantData, {});

  const comments = await Comment.blukCreate(commentData, {});

  for (const journal of journalData) {
    await Journal.create({
      ...journal,
    });
  }

  for (const forum of forumData) {
    await Forum.create({
      ...forum,
    });
  }


  process.exit(0);
};

seedDatabase();
