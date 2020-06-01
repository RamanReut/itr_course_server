require('dotenv').config();
const express = require('express');
const expressJwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models')
const campaign = require('./features/campaign/routing');
const campaignTypes = require('./features/campaignTypes');
const path = require('path');

const checkJwt = expressJwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: 'https://itrcourse.herokuapp.com/',
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithm: ['RS256'],
});

const app = express();
db.initializeDatabase();

app.use(express.static('build'));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

campaign.setRoutes(app, checkJwt)
campaignTypes.setRoutes(app);

app.get('/', (req, resp) => {
    resp.sendFile('index.html');
});

app.listen(process.env.PORT);