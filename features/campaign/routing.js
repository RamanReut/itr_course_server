const actions = require('./actions');

function handleUpdate(req, resp) {
    
}

function setUpdateRoute(app, checkJwt) {
    app.post('/api/campaign/update', checkJwt, (req, resp) => {
        actions.update({...req.body, owner: req.user.sub})
        resp.send('ok');
    });
}

function setCampaignRoute(app, checkJwt) {
    setUpdateRoute(app, checkJwt);
}

module.exports = {
    setRoutes: setCampaignRoute,
}