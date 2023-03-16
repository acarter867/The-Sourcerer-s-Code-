const User = require("./User");
const Posts = require("./Posts");
const Tags = require("./Tags");
const Comments = require("./Comments");

User.hasMany(Posts, {
  foreignKey: "poster_id",
});

User.hasMany(Comments, {
  foreignKey: "poster_id",
});

Posts.hasMany(Tags, {
  foreignKey: "post_id",
});

Posts.hasMany(Comments, {
  foreignKey: "parent_id",
});

Posts.belongsTo(User, {
  foreignKey: "poster_id",
});

Tags.belongsTo(Posts, {
  foreignKey: "post_id",
});

Comments.belongsTo(Posts, {
  foreignKey: "parent_id",
});

Comments.belongsTo(User, {
  foreignKey: "poster_id",
});

module.exports = { User, Posts, Tags };
