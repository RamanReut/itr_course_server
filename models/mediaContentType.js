const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MediaContentType extends Model {};
    MediaContentType.init({
        name: {
            type: DataTypes.STRING,
            unique: 'string',
        },
    }, {sequelize});
    return MediaContentType;
}