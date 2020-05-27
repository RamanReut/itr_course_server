const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Locale = require('./locale');
    const CampaignType = require('./campaignType');
    const User = require('./user');
    const MediaContent = require('./mediaContent');
    const Rating = require('./rating');
    const Reward = require('./reward');

    class Campaign extends Model {
        get getID() {
            return this.getDataValue('id');
        }

        get getAvatar() {
            return this.getDataValue('avatar');
        }
        set setAvatar(url) {
            this.setDataValue('avatar', url);
        }

        get getType() {
            return this.getDataValue('type');
        }
        set setType(type) {
            this.setDataValue('type', type);
        }
        
        get getGoal() {
            return this.getDataValue('goal');
        }
        set setGoal(goal) {
            this.setDataValue('goal', goal);
        }

        get getFinishDate() {
            return this.getDataValue('finishdate');
        }
        set setFinishDate(date) {
            this.setDataValue('finishdate', date);
        }

        get getOwner() {
            return this.getDataValue('owner');
        }
        set setOwner(owner) {
            this.setDataValue('owner', owner);
        }

        get getLocale() {
            return this.getDataValue('locale');
        }
        set setLocale(locale) {
            this.setDataValue('locale', locale);
        }

        get getMediaContent() {
            return this.getDataValue('mediacontent');
        }
        set setMediaContent(content) {
            this.setDataValue('mediacontent', content);
        }

        get getRating() {
            return this.getDataValue('rating');
        }

        get getRewards() {
            return this.getDataValue('reward');
        }
        set setRewards(rewards) {
            return this.setDataValue('reward', rewards)
        }
    };
    Campaign.init({
        avatar: DataTypes.STRING,
        type: CampaignType,
        goal: {
            type: DataTypes.FLOAT,
        },
        finishDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
    });
    Campaign.belongsTo(User, { as: 'owner' });
    Campaign.belongsTo(CampaignType);
    Campaign.belongsTo(Locale, { as: 'content' });
    Campaign.hasMany(MediaContent);
    Campaign.hasMany(Rating);
    Campaign.hasMany(Reward);
    
    return Campaign;
}