const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Campaign extends Model {};
    Campaign.init({
        avatar: DataTypes.STRING,
        goal: {
            type: DataTypes.FLOAT,
        },
        finishDate: {
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
    });
    
    return Campaign;
}