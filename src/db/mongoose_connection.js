const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/i-letknow-db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});