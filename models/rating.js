const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = require('./user');

    class Rating extends Model {};
    Rating.init({
        rate: DataTypes.INTEGER,
    });
    Rating.belongsTo(User);
    return Rating;
}