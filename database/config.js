const mongoose = require('mongoose');


const db = async()  => {

    try {
        await mongoose.connect(process.env.MONGO_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });        
        console.log('base de datos online');

    }catch(error) {
        throw new Error('Error en iniciar la base de datos');
    }


}

module.exports = {
    db
}