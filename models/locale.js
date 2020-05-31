const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Locale extends Model {}
    Locale.init({}, {sequelize});
    return Locale;
}