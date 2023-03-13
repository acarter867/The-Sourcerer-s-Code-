const sequelize = require('../config/connection');
const { User, Posts, Tags } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const tagData = require('./tagData.json');

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
  process.exit(0);
};

seedDatabase();
