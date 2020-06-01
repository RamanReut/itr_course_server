const {
    CampaignType
} = require('../../models');

async function getCampaignTypesFromDB() {
    return await CampaignType.findAll({
        include: [{
            association: 'labels',
            include: ['content']
        }],
    });
}

function generateLocale(content) {
    let res = {};
    content.forEach((obj) => {
        res[obj.language] = obj.content
    });
    return res;
}

function prepareData(types) {
    return types.map((type) => {
        return {
            name: type.name,
            locale: generateLocale(type.labels.content),
        }
    });
}

async function getCampaignTypes() {
    const types = await getCampaignTypesFromDB();
    return prepareData(types);
}

module.exports = {
    getCampaignTypes,
}