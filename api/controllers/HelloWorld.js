

const getHelloWorld = (req, res, next) => {

    return res.send('Hello World!');
  
}

module.exports = {
    getHelloWorld
}
