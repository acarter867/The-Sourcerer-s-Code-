const sequelize = require('../config/connection');
const { User, Posts } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

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
  process.exit(0);
};

seedDatabase();
