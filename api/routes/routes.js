module.exports = {
    '/hello-world':         
    {
      get:    ['HelloWorld.getHelloWorld']
    },

    '/generate-register-challenge':
    {
      post:    ['Challenge.generateRegistrationChallenge']
    },

    '/register':
    {
      post:   ['Authentication.register']
    }
}