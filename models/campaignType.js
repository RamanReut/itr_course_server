const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Locale = require('./locale');

    class CampaignType extends Model {};
    CampaignType.init({
        name: DataTypes.STRING,
        locale: Locale,
    }, {sequelize});
    return CampaignType;
}