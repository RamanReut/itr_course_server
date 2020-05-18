const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Locale = require('./locale');
    const CampaignType = require('./campaignType');
    const User = require('./user');

    class Campaign extends Model {};
    Campaign.init({
        owner: User,
        avatar: DataTypes.STRING,
        type: CampaignType,
        content: Locale,
        goal: {
            type: DataTypes.FLOAT,
        },
        finishDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
    });
    return Campaign;
}