const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MediaContent extends Model {};
    MediaContent.init({
        url: DataTypes.STRING,
        position: DataTypes.INTEGER,
        type: DataTypes.STRING,
    }, {sequelize});
    return MediaContent;
}