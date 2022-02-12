const express = require('express');
const path= require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express(); //all functionalities of express app has now

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// own middleware 1
// app.use(function(req,res,next){
    // console.log('middleware 1 called');
    // next();
// })
// middleware 2
// app.use(function(req,res,next){
    // console.log('2 called');
    // next();
// })

var contactList = [
    {
        name:'yukti',
        phone: "1111"
    },
    {
        name:'abbu',
        phone:"1112"
    },
    {
        name:'sharma',
        phone:"1113"
    }
]

app.get('/',function(req,res){
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title:"my contact list",
            contact_list: contacts
        });
    });   
});
app.get('/practise',function(req,res){
    return res.render('practise',{
        title: "let us play with ejs",
        
    });
});

app.post('/create-contact',function(req,res){
    //contactList.push({
        //:req.body.name,
       // phone:req.body.phone
    //}, 
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err, newContact){
        if(err){
            console.log('error in creating contact');
            return;
        }
        console.log('******', newContact);
        return res.redirect('back');
    });

});

app.get('/delete-contact',function(req,res){
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('/');
    });
  
});

app.listen(port,function(err){
    if(err){
        console.log('error in running the server',err);
    }
    console.log('express server running on port',port);
})