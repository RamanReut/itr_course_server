const User = require('./user');
const Campaign = require('./campaign');
const CampaignType = require('./campaignType');
const LocaleContent = require('./localeContent');
const Locale = require('./locale');
const MediaContentType = require('./mediaContentType');
const MediaContent = require('./mediaContent');
const Rating = require('./rating');
const Reward = require('./reward');

function initializeDatabase() {
    User.sync();
    Reward.sync();
    CampaignType.sync();
    Campaign.sync();
    Locale.sync();
    LocaleContent.sync();
    MediaContentType.sync();
    MediaContent.sync();
    Rating.sync();
}

module.exports = {
    initializeDatabase,
}