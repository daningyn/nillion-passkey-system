module.exports = {
    '/hello-world':         
    {
      get:    ['HelloWorld.getHelloWorld']
    },

    '/generate-challenge':  
    {
      post:    ['Challenge.generateRegistrationChallenge']
    },

    '/register':
    {
      post:   ['Authentication.register']
    }
}