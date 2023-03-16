const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model{}

Posts.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        body:{
            type: DataTypes.STRING(300),
            allowNull: false
        },
        poster_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'user',
                key: 'id'
            }
        },
        poster_username: {
            type: DataTypes.STRING,
            allowNull: false,
            references:{
                model: 'user',
                key: 'username'
            },
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'posts',
    },
);

module.exports = Posts;