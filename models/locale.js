const Sequelize, { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Campaign = require('./campaign');

    class Locale extends Model { }
    Locale.init({}, {sequelize});
    return Locale;
}