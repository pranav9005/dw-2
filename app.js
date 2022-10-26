const express = require("express");
const path =require("path");
const fs =require("fs");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlparser:true});
const bodyparser = require("body-parser");
const port =80;

// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
    name: String,
  });

const contact = mongoose.model('contact', contactSchema);

// expressing specific stuff
// app.use(express.static('static' , options))
app.use('/static', express.static('static'))// for serving static files
app.use(express.urlencoded())

// pug specific stuff
app.set('view engine','pug') //set the template engine as pug
app.set('views',path.join(__dirname,'views'))// sets the view directory

// endpoints
app.get('/',(req, res)=>{
    // const con = "this is the best series on internet you will ever find. so pls do like it."
    const params = {}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req, res)=>{
    const con = "this is the best series on internet you will ever find. so pls do like it."
    const params = {'title':'Pubg is the best game', "content" : con}
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the data base")
    });
})

app.post('/',(req,res)=>{
    name = req.body.name
    age = req.body.age
    gender = req.body.gender
    address = req.body.address
    more = req.body.more
    let outputToWrite =`the name of the client is ${name},${age} years old,${gender},residence at ${address}, more about him/her ${more}`

    fs.writeFileSync('output.txt', outputToWrite)
    // console.log(req.body)
    const params = {'message':'your form has been submitted successfully'}
    res.status(200).render('index.pug',params);
})

// start the server
app.listen(port,()=>{
    console.log(`the application started succesfully on port ${port}`)
});
