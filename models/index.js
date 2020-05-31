const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL);

const Campaign = require('./campaign')(db, DataTypes);
const CampaignType = require('./campaignType')(db, DataTypes);
const Locale = require('./locale')(db, DataTypes);
const LocaleContent = require('./localeContent')(db, DataTypes);
const MediaContent = require('./mediaContent')(db, DataTypes);
//const MediaContentType = require('./mediaContentType')(db, DataTypes);
const Rating = require('./rating')(db, DataTypes);
const Reward = require('./reward')(db, DataTypes);
const User = require('./user')(db, DataTypes);

Campaign.belongsTo(User, { as: 'owner' });
Campaign.belongsTo(CampaignType, { as: 'type' });
Campaign.belongsTo(Locale, { as: 'content' });
Campaign.hasMany(MediaContent, { as: 'media' });
Campaign.hasMany(Rating);
Campaign.hasMany(Reward, { as: 'rewards' });

CampaignType.belongsTo(Locale, { as: 'labels' });

Locale.hasMany(LocaleContent, { as: 'content' });

//MediaContent.belongsTo(MediaContentType);
MediaContent.belongsTo(Campaign);

Reward.belongsTo(Locale, { as: 'locale' });
Reward.belongsTo(Campaign);


async function sync() {
    await db.sync();
    [
        {
            name: 'education',
            labels: {
                content: [
                    {
                        field: 'label',
                        content: 'Образование',
                        language: 'ruRU',
                    }, {
                        field: 'label',
                        content: 'Education',
                        language: 'enUS',
                    }
                ],
            },
        }, {
            name: 'science',
            labels: {
                content: [
                    {
                        field: 'label',
                        content: 'Наука',
                        language: 'ruRU',
                    }, {
                        field: 'label',
                        content: 'Science',
                        language: 'enUS',
                    },
                ]
            },
        }
    ].forEach(async (elem) => {
        await CampaignType.findOrCreate(
            {
                where: { name: elem.name },
                include: [{
                    association: 'labels',
                    include: ['content']
                }],
                defaults: elem,
            },
        );

    })
}

module.exports = {
    Campaign,
    CampaignType,
    Locale,
    LocaleContent,
    MediaContent,
 //   MediaContentType,
    Rating,
    Reward,
    User,
    initializeDatabase: sync,
}