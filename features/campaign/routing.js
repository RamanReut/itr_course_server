const actions = require('./actions');

function setUpdateRoute(app, checkJwt) {
    app.post('/api/campaign/update', checkJwt, (req, resp) => {
        actions.update({...req.body, owner: req.user.sub})
        resp.send('ok');
    });
}

function setGetCampaignsRoute(app) {
    app.get('/api/campaigns', async (req, resp) => {
        resp.json(await actions.getCampaigns());
    });
}

function setGetCampaignRoute(app) {
    app.get('/api/campaign/:id', async (req, resp) => {
        resp.json(await actions.getCampaign(req.params.id));
    }); 
}

function setCampaignRoute(app, checkJwt) {
    setUpdateRoute(app, checkJwt);
    setGetCampaignsRoute(app);
    setGetCampaignRoute(app);
}

module.exports = {
    setRoutes: setCampaignRoute,
}