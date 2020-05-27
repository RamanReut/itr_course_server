const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {};
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'string',
        },
    }, {sequelize});
    return User;
}