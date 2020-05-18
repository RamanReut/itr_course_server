const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Locale = require('./locale');
    const Campaign = require('./campaign');

    class Reward extends Model {};
    Reward.init({
        campaign: Campaign,
        locale: Locale,
        cost: DataTypes.FLOAT,
    }, {sequelize});
    return Reward;
}