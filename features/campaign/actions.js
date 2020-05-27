const {
    Campaign: CampaignModel,
    CampaignType: CampaignTypeModel,
    Locale: LocaleModel,
    MediaContent: MediaContentModel,
    Reward: RewardModel,
    LocaleContent: LocaleContentModel,
    User: UserModel,
} = require('../../models');
const sequelize = require('sequelize');

async function getCampaign(id) {
    return await CampaignModel.findByPk(id);
}

async function generateLocaleContent(locale) {
    let promises = [];
    let res = [];
    Object.keys(locale).forEach((lang) => {
        promises = [
            ...promises,
            ...Object.keys(obj).map((field) => {
                LocaleContentModel.create({
                    language: lang,
                    field: field,
                    content: obj[field],
                });
            }),
        ]
    });
    for (let i=0; i < promises.length; i++) {
        res[i] = await promises[i]();
    }
    return res;
}

async function createReward(data) {
    let Reward = await RewardModel.create();
    let Locale = await generateLocaleContent(data.locale);
    Reward.setCost(data.cost);
    Reward.setLocale(Locale);
    return Reward;
}

async function generateRewards(rewards) {
    let res = [];
    let promises = rewards.map((elem) => {
        return createReward(elem);
    });
    for (let i=0; i<promises.length; i++) {
        res[i] = await promises[i]();
    }
    return res;
}

async function updateLocale(campaign, locale) {
    const localeObj = await LocaleModel.create();
    const localeContent = await generateLocaleContent(locale);

    localeObj.setContent(localeContent);
    campaign.setLocale(localeObj);
}

async function updateType(campaign, type) {
    const typeObj = await CampaignTypeModel.findOne({ where: {name: type} });
    campaign.setType(typeObj);
}

async function updateRewards(rewards) {
    const rewardsObj = await generateRewards(rewards);
    campaign.setRewards(rewardsObj);
}

async function basicUpdateCampaign(
    campaign,
    locale,
    avatar,
    type,
    rewards,
) {
    await updateLocale(campaign, locale);
    await updateType(campaign, type);
    await updateRewards(campaign, rewards);
    campaign.setAvatar(avatar);
}

async function createCampaign(
    locale,
    owner,
    avatar,
    type,
    goal,
    finish,
    rewards,
) {
    const campaign = await CampaignModel.create();
    await basicUpdateCampaign(campaign, locale, avatar, type, rewards);
    campaign.setGoal(goal);
    campaign.setFinishDate(finish);
    campaign.setOwner(owner);
    return (await campaign).save();
}

async function updateCampaign(
    id,
    locale,
    avatar,
    type,
    rewards,
) {
    const campaign = CampaignModel.findByPk(id);
    await basicUpdateCampaign(campaign, locale, avatar, type, rewards);
    (await campaign).save();
}

async function handleUpdateRequest(

) {

}

module.exports = {
    createCampaign,
    updateCampaign,
}