require('dotenv').config();
const express= require ("express");
const bodyParser= require("body-parser");
const mongoose= require("mongoose");
const ejs= require("ejs");
const md5= require("md5");

const app=express();

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));



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
    const newUser = new User(
        { 
            email: req.body.username,
            pass:md5(req.body.password)          // this is hashfunction

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

    const username=req.body.username;
    const password =md5(req.body.password);     // again the  hash function 
                                                // what the user has entered in the pass field we changed it to the hashcode
  User.findOne({email:username}, function(err , found)
  {
    if(err)
    {
        
        console.log(err);

    }

    else{


        if(found){
        if(found.pass    === password )    //comparing both the hash codes.
                                           // because hashfunction always produced the same output if the  input is same
        {
    
            res.render("secrets");
        }
        else
        {
        
            res.send("you have entered the worng password");
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
