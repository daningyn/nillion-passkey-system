module.exports = {
    '/ping':
    {
        get:    ['HelloWorld.getHelloWorld']
    },

    '/generate-register-challenge':
    {
        post:   ['Challenge.generateRegistrationChallenge']
    },

    '/generate-authentication-challenge':
    {
        post:   ['Challenge.generateAuthenChallenge']
    },

    '/register':
    {
        post:   ['Authentication.register']
    },

    '/authenticate':
    {
        post:   ['Authentication.loginPasskey'],
        get:    ['Authentication.authenticateJWT']
    },

}