const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Locale = require('./locale');
    class Reward extends Model {
        get getCost() {
            return this.getDataValue('cost');
        }
        set setCost(cost) {
            this.setDataValue('cost', cost);
        }

        get getLocale() {
            return this.getDataValue('locale', locale);
        }
        set setLocale() {
            this.setDataValue('locale', locale);
        }
    };
    Reward.init({
        cost: DataTypes.FLOAT,
    }, {sequelize});
    Reward.belongsTo(Locale)
    return Reward;
}