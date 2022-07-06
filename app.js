require('dotenv').config();
const express= require ("express");
const bodyParser= require("body-parser");
const mongoose= require("mongoose");
const ejs= require("ejs");
const bcrypt = require("bcrypt");

const app=express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
const saltrounds=8;


mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema=new mongoose.Schema({
    email:String,
    pass:String
});



const User =new mongoose.model("user", userSchema);             // lowercase (user) is the collection name
                                                                //uppercase (User) is model name


app.get("/", function(req, res)
{
    res.render("home");
});


app.get("/login", function(req, res)
{
    res.render("login");
});


app.get("/register", function(req, res)
{
    res.render("register");
});

app.post("/register", function(req, res)
{

    bcrypt.hash(req.body.password, saltrounds,function(err,hash)
    {

        const newUser = new User(
            { 
                email: req.body.username,
                pass:hash                // now the hash password with salting 8 rounds is saved in the DB
    
            }
        );
        newUser.save(function(err)
        {
            if(!err)
            {
                res.render("secrets");
    
            }
            else
            {
                console.log(err);
            }
        });
    });
    });
   

///////////////////////
app.post("/login", function(req, res)
{

    const username=req.body.username;
    const password =req.body.password;    
  User.findOne({email:username}, function(err , found)
  {
    if(err)
    {
        
        console.log(err);

    }

    else{


        if(found){

            bcrypt.compare(password,found.pass, function(err, result) {
                if(result===true)
                {
                    res.render("secrets");
                }
                else
                {
                    res.send("you have done something wrong");
                }
            });
            if(!found)
            {
                res.send("you have done something wrong")
            }
            
    }}
  
});
  

});

app.get("/check", function(req, res)
{
    User.find({email:"chiragbatheja32@gmail.com"}, function (err, fo)
    {
        res.send(fo);
    });
});


app.listen(3000, function()
{
console.log("server is running on port 3000");
} );
