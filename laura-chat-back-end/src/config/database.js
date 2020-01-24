const mongoose = require('mongoose');

const database = mongoose.connect('mongodb+srv://deploy:deploy@cluster0-qk7ny.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

module.exports = database;