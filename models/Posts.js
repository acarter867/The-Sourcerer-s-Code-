const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model{}

Posts.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        body:{
            type: DataTypes.STRING(300),
            allowNull: false
        },
        poster_id: {
            type: DataTypes.INTEGER,
            references:{
                model: 'user',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'posts',
    },
);

module.exports = Posts;