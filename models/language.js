const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Language extends Model {};
    Language.init({
        name: {
            type: DataTypes.STRING,
            unique: 'string',
        },
    }, {sequelize});
    return Language;
}