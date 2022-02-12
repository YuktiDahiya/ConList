const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact_list_db');
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'error connecting to db'));
//up and running
db.once('open',function(){
    console.log('successful');
});