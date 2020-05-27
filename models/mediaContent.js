const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const MediaContentType = require('./mediaContentType');

    class MediaContent extends Model {};
    MediaContent.init({
        url: DataTypes.STRING,
        position: DataTypes.INTEGER,
    }, {sequelize});
    MediaContent.belongsTo(MediaContentType);
    return MediaContent;
}