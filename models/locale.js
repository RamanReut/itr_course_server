const Sequelize, { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const LocaleContent = require('./campaign');

    class Locale extends Model {
        get getContent() {
            return this.getDataValue('content');
        }
        set setContent(content) {
            this.setDataValue('content', content);
        }
    }
    Locale.init({}, {sequelize});
    Locale.hasMany(LocaleContent, { as: 'content' });
    return Locale;
}