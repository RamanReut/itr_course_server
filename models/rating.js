const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = require('./user');
    const Campaign = require('./campaign');

    class Rating extends Model {};
    Rating.init({
        user: User,
        campaign: Campaign,
        rate: DataTypes.INTEGER,
    });
}