const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Reward extends Model {};
    Reward.init({
        cost: DataTypes.FLOAT,
    }, {sequelize});
    return Reward;
}