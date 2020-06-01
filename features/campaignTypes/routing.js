const actions = require('./actions');

function setRoutes(app) {
    app.get('/api/campaignTypes', async (req, resp) => {
        const res = await actions.getCampaignTypes();
        resp.json(res);
    });
}

module.exports = {
    setRoutes,
}