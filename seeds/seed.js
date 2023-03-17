const sequelize = require('../config/connection');
const { User, Posts, Tags, Comments } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const tagData = require('./tagData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log('--------------USERS SEEDED---------------');
  await Posts.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });
  console.log('--------------POSTS SEEDED---------------');
  await Tags.bulkCreate(tagData, {
    individualHooks: true,
    returning: true,
  });
  console.log('--------------TAGS SEEDED---------------');
  await Comments.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
  console.log('--------------COMMENTS SEEDED---------------');
  process.exit(0);
};

seedDatabase();
