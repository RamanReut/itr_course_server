const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CampaignType extends Model {};
    CampaignType.init({
        name: DataTypes.STRING,
    }, {sequelize});
    return CampaignType;
}