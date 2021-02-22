const mongoose = require('mongoose');


const db = async()  => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });        
        console.log('base de datos online');

    }catch(error) {
        console.log(error);
        throw new Error('Error en iniciar la base de datos');
    }


}

module.exports = {
    db
}