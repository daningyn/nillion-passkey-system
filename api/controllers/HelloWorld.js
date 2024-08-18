

const getHelloWorld = (req, res, next) => {

    return res.send('Pong!');
  
}

module.exports = {
    getHelloWorld
}
