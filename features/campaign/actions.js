const {
    Campaign: CampaignModel,
    CampaignType: CampaignTypeModel,
    Locale: LocaleModel,
    MediaContent: MediaContentModel,
    Reward: RewardModel,
    LocaleContent: LocaleContentModel,
    User: UserModel,
} = require('../../models');

async function getCampaign(id) {
    return await CampaignModel.findByPk(id);
}

/*async function generateLocaleContent(locale) {
    let promises = [];
    let res = [];
    Object.keys(locale).forEach((lang) => {
        const obj = locale[lang];
        promises = [
            ...promises,
            ...Object.keys(obj).map((field) => {
                return LocaleContentModel.build({
                    language: lang,
                    field: field,
                    content: obj[field],
                });
            }),
        ]
    });
    for (let i = 0; i < promises.length; i++) {
        res[i] = await promises[i];
    }
    return res;
}

async function createReward(data) {
    const { cost, ...rest } = data;
    let Reward = await RewardModel.create();
    let Locale = await updateLocale(Reward, rest);
    Reward.setCost = cost;
    Reward.setLocale = Locale;
    await Reward.save();
    return Reward;
}

async function generateRewards(rewards) {
    let res = [];
    let promises = rewards.map((elem) => {
        return createReward(elem);
    });
    for (let i = 0; i < promises.length; i++) {
        res[i] = await promises[i];
    }
    return res;
}

async function updateLocale(mod, locale) {
    const localeContent = await generateLocaleContent(locale);
    console.log(localeContent);
    const localeObj = await LocaleModel.build({
        сontent: localeContent,
    }, {
        include: [{
            association: LocaleContentModel,
            as: 'сontent',
        }]
    });

    return localeObj
    //mod.setLocale = localeObj;
    //await mod.save();
}

async function updateType(campaign, type) {
    const typeObj = await CampaignTypeModel.findOne({ where: { name: type } });
    campaign.setType = typeObj;
}

async function updateRewards(campaign, rewards) {
    const rewardsObj = await generateRewards(rewards);
    campaign.setRewards = rewardsObj;
}

async function basicUpdateCampaign(
    {
        campaign,
        locale,
        avatar,
        type,
        rewards,
    }
) {
    await updateLocale(campaign, locale);
    await updateType(campaign, type);
    await updateRewards(campaign, rewards);
    campaign.setAvatar = avatar;
}

async function createCampaign(
    {
        locale,
        owner,
        avatar,
        type,
        goal,
        rewards,
    }
) {
    const campaign = await CampaignModel.create();
    await basicUpdateCampaign({ campaign, locale, avatar, type, rewards });
    campaign.setGoal = goal.goal;
    campaign.setFinishDate = new Date(goal.date);
    campaign.setOwner = owner;
    return await campaign.save();
}*/

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
        const {cost, ...locale} = reward;
        return {
            cost: cost,
            locale: {
                content: generateLocaleContent(locale),
            }
        }
    });
}

async function createCampaign({
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
    {
        id,
        owner,
        locale,
        avatar,
        type,
        rewards,
    }
) {
    const campaign = await CampaignModel.findByPk(id, { include: 'owner' });
    if (campaign.getOwner.getID() === owner.getID()) {
        await basicUpdateCampaign(campaign, locale, avatar, type, rewards);
        await campaign.save();
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

module.exports = {
    update
}