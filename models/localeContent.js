const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Locale = require('./locale');
    const Language = require('./language');

    class LocaleContent extends Model {};
    LocaleContent.init({
        language: Language,
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        field: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        locale: Locale,
    }, {sequelize});
    return LocaleContent;
}