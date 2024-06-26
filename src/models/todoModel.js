const { DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');

const Todo = sequelize.define(
    'todos',
    {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
},

{
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
}

);


Todo.sync({alter: true})
module.exports = Todo;
