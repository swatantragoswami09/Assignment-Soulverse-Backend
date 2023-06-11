const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: false
})

mongoose.connection.on('connected',()=>{
    console.log('Mongo db connection successfull')
})