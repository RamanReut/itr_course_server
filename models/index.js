const sequelize = require('sequelize');

const db = new sequelize.Sequelize(process.env.DATABASE_URL);

module.exports = {
    Campaign: db.import('./campaign'),
    CampaignType: db.import('./campaignType'),
    Language: db.import('./language'),
    Locale: db.import('./locale'),
    LocaleContent: db.import('./localeContent'),
    MediaContent: db.import('./mediaContent'),
    MediaContentType: db.import('./mediaContentType'),
    Rating: db.import('./rating'),
    Reward: db.import('./reward'),
    User: db.import('./user'),
}