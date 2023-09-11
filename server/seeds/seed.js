const connection = require("../config/connection");

const comments = require("./comments.json");
const flowers = require("./flowers.json");
const forum = require("./forum.json");
const journal = require("./journal.json");
const plants = require("./plants.json");
const users = require("./users.json");

const { Comment, Flower, Forum, Journal, Plant, User } = require("../models");

connection.once("open", async () => {
  let plantsDB = await connection.db
    .listCollections({ name: "plants" })
    .toArray();
  if (plantsDB.length) await connection.dropCollection("plants");
  let plantsInserted;
  try {
    plantsInserted = await Plant.insertMany(plants);
  } catch (err) {
    throw new Error(err);
  }

  let flowersDB = await connection.db
    .listCollections({ name: "flowers" })
    .toArray();
  if (flowersDB.length) await connection.dropCollection("flowers");
  let flowersInserted;
  try {
    flowersInserted = await Flower.insertMany(flowers);
  } catch (err) {
    throw new Error(err);
  }

  let usersDB = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (usersDB.length) await connection.dropCollection("users");
  let usersInserted;
  try {
    const plantIds = plantsInserted.map((plant) => plant._id);
    // usersInserted = await User.insertMany([
    usersInserted = await User.create([
      ...users,
      {
        username: "GreenThumb123",
        email: "greenthumb123@email.com",
        password: "123456789",
        favPlant: plantIds,
        gardenPlant: [],
        myForums: [],
        myJournals: [],
      },
    ]);
  } catch (err) {
    throw new Error(err);
  }

  let commentsDB = await connection.db
    .listCollections({ name: "comments" })
    .toArray();
  if (commentsDB.length) await connection.dropCollection("comments");
  let commentsInserted;
  try {
    commentsInserted = await Comment.insertMany(comments);
  } catch (err) {
    throw new Error(err);
  }

  let forumDB = await connection.db
    .listCollections({ name: "forums" })
    .toArray();
  if (forumDB.length) await connection.dropCollection("forums");
  let forumInserted;
  try {
    forumInserted = await Forum.insertMany(forum);
  } catch (err) {
    throw new Error(err);
  }

  let journalDB = await connection.db
    .listCollections({ name: "journals" })
    .toArray();
  if (journalDB.length) await connection.dropCollection("journals");
  let journalInserted;
  try {
    journalInserted = await Journal.insertMany(journal);
  } catch (err) {
    throw new Error(err);
  }

  console.log("seeding complete");
  process.exit(0);
});
