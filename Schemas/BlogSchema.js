const mongoose = require('mongoose')

const BlogSchema =  mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    
    text: {
        type: String,
        required: true,
    }
   
});

module.exports = mongoose.model('File', BlogSchema)