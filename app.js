const express = require('express');
const expressJwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
require('dotenv').config();

const authConfig = {
    domain: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_API_IDENTIFIER,
  };
const checkJwt = expressJwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: process.env.AUTH0_API_IDENTIFIER,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithm: ['RS256'],
});

const app = express();

app.use(express.static('build'));
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/api/campaign/update', checkJwt, (req, resp) => {
    resp.send('ok');
});

app.listen(process.env.PORT);