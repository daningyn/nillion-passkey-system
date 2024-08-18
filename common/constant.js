
const rpID = process.env.RP_ID || 'localhost';
const origin = rpID == 'localhost' ? `http://${rpID}:3001` : `https://${rpID}`;

const CHALLENGE_TYPE = {
    REGISTRATION: 'registration',
    AUTHENTICATION: 'authentication'
}

module.exports = {
    rpID,
    CHALLENGE_TYPE,
    origin
}
