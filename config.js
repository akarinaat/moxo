const config = {

    app: {
        port: process.env.PORT || 3001
    }, 

    db: {
        connectionUrl: process.env.MONGO_URL || 'mongodb://localhost/moxo' //Aqui es donde esta la base de datos
    }
}

module.exports = config;