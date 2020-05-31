const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = require('./user')(sequelize, DataTypes);

    class Rating extends Model {};
    Rating.init({
        rate: DataTypes.INTEGER,
    }, {sequelize});
    Rating.belongsTo(User);
    return Rating;
}