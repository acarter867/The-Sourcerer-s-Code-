const User = require('./User');
const Posts = require('./Posts');
const Tags = require('./Tags')

User.hasMany(Posts, {
    foreignKey: 'user_id',
});

Posts.hasMany(Tags, {
    foreignKey: 'post_id'
})

Posts.belongsTo(User, {
    foreignKey: 'user_id'
});

Tags.belongsTo(Posts, {
    foreignKey: 'post_id'
})

module.exports = {User, Posts, Tags};