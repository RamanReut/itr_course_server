const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const MediaContentType = require('./mediaContentType');

    class MediaContent extends Model {};
    MediaContent.init({
        type: MediaContentType,
        url: DataTypes.STRING,
        position: DataTypes.INTEGER,
    }, {sequelize});
    return MediaContent;
}