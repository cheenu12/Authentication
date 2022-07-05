require('dotenv').config();
const express= require ("express");
const bodyParser= require("body-parser");
const mongoose= require("mongoose");
const ejs= require("ejs");
const encrypt= require("mongoose-encryption")

const app=express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));



mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema=new mongoose.Schema({
    email:String,
    pass:String
});

//const secret="iamthepass";
userSchema.plugin(encrypt,{secret:process.env.SECRETS ,encryptedFields:["pass"]});

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
    const newUser = new User(
        { 
            email: req.body.username,
            pass:req.body.password

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

///////////////////////
app.post("/login", function(req, res)
{
  User.findOne({email:req.body.username}, function(err , found)
  {
    if(err)
    {
        
        console.log(err);

    }

    else{


        if(found){
        if(found.pass    === req.body.password )
        {
    
            res.render("secrets");
        }
        else
        {
        
            res.send("you have entered the worng password");
        }
    }}
    res.send("incorrect email please register first");
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
