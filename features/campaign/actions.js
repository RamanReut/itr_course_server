const {
    Campaign: CampaignModel,
    CampaignType: CampaignTypeModel,
    Locale: LocaleModel,
    MediaContent: MediaContentModel,
    Reward: RewardModel,
    LocaleContent: LocaleContentModel,
    User: UserModel,
} = require('../../models');

function generateLocaleContent(locale) {
    let res = [];
    Object.keys(locale).forEach((localeKey) => {
        res = [
            ...res,
            ...Object.keys(locale[localeKey]).map((field) => {
                return {
                    content: locale[localeKey][field],
                    field: field,
                    language: localeKey,
                }
            }),
        ]
    });
    return res;
}

function generateRewards(rewards) {
    return rewards.map((reward) => {
        const { cost, ...locale } = reward;
        return {
            cost: cost,
            locale: {
                content: generateLocaleContent(locale),
            }
        }
    });
}

async function createCampaign({
    id,
    owner,
    locale,
    avatar,
    type,
    goal,
    rewards,
    mediaContent,
}) {
    const typeInstance = await CampaignTypeModel.findOne({ where: { name: type } });
    let campaign = await CampaignModel.create({
        id: id,
        content: {
            content: generateLocaleContent(locale),
        },
        avatar: avatar,
        goal: goal.goal,
        finishDate: goal.date,
        rewards: generateRewards(rewards),
        media: [...mediaContent.map((value, key) => {
            return {
                ...value,
                position: key,
            }
        })],
    }, {
        include: [
            'owner',
            {
                association: 'content',
                include: [{
                    association: 'content',
                }],
            },
            'type',
            {
                association: 'rewards',
                include: [
                    {
                        association: 'locale',
                        include: ['content']
                    },
                ]
            },
            'media',
        ],
    });
    campaign.setType(typeInstance.getDataValue('id'));
    campaign.setOwner(owner.getDataValue('id'));
}

async function updateCampaign(
   data,
) {
    const campaign = await CampaignModel.findByPk(data.id, { 
        include: ['owner']
    });
    if (campaign.owner.id === data.owner.id) {
    } else {
        throw Error(`Wrong owner. Must: ${campaign.getOwner.getID()}; Have: ${owner.getID()}`);
    }
}

async function update(data) {
    const [owner] = await UserModel.findOrCreate({ where: { name: data.owner } });
    data = { ...data, owner: owner };
    if (data.id) {
        updateCampaign(data);
    } else {
        createCampaign(data);
    }
}

function campaignListLocale(locale) {
    let res = {};
    locale.forEach((record) => {
        if (record.field === 'name')
            res = {
                ...res,
                [record.language]: record.content,
            }
    });
    return res;
}

function prepareCampaignList(campaigns) {
    let res = {}
    campaigns.forEach((campaign) => {
        res = {
            ...res,
            [campaign.id]: {
                avatar: campaign.avatar,
                type: campaign.type.name,
                names: campaignListLocale(campaign.content.content),
            },
        }
    });
    return res;
}

async function getCampaigns() {
    const campaigns = await CampaignModel.findAll(
        {
            attributes: ['id', 'avatar'],
            include: [
                {
                    association: 'content',
                    include: ['content']
                },
                'type',
            ],
        }
    );
    return prepareCampaignList(campaigns);
}

function generateMedia(media) {
    return media.map((cur) => {
        return {
            url: cur.url,
            position: cur.position,
            type: cur.type,
        }
    });
}

function generateLocaleFromDB(locale) {
    let res = {};
    locale.forEach((record) => {
        res[record.language] = {
            ...res[record.language],
            [record.field]: record.content,
        }
    });
    return res;
}

function generateRewardsFromDB(rewards) {
    return rewards.map((reward => {
        return {
            cost: reward.cost,
            locale: generateLocaleFromDB(reward.locale.content),
        }
    }));
}

function prepareCampaignData(campaign) {
    return {
        id: campaign.id,
        owner: campaign.owner.name,
        avatar: campaign.avatar,
        type: campaign.type.name,
        media: generateMedia(campaign.media),
        goal: {
            goal: campaign.goal,
            date: campaign.finishDate,
        },
        rewards: generateRewardsFromDB(campaign.rewards),
        locale: generateLocaleFromDB(campaign.content.content),
    }
}

async function getCampaign(id) {
    const campaign = await CampaignModel.findByPk(id, {
        include: [
            'owner',
            'type',
            {
                association: 'content',
                include: ['content'],
            },
            'media',
            {
                association: 'rewards',
                include: [
                    {
                        association: 'locale',
                        include: ['content'],
                    },
                ],
            },
        ],
    });
    return prepareCampaignData(campaign);
}

module.exports = {
    update,
    getCampaigns,
    getCampaign,
}