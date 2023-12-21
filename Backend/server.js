// Importing libraries
require("dotenv").config();
const express = require("express")
const {Web3} = require('web3');
const Axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passpoerLocalMongoose = require("passport-local-mongoose");


//Middlewares
const app = express();
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    credentials: true
}));
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(bodyParser.json());

mongoose.set("strictQuery", true);

//Getting Contract abhi and assigning chain
const Contract = require(__dirname+"/bettingPlatform.json")
const web3 = new Web3(process.env.CHAIN);

//Connecting to Database
mongoose.connect("mongodb+srv://sourabhchoudhary:"+ process.env.MONGO_PASSWORD +"@cluster0.hch1sgl.mongodb.net/Tenders");

//Assignning mongoose Schmeas

const AdminData = new mongoose.Schema({
    username: String,
    password: String,
    token: String
})

//Adding passport local mongoose plugin
AdminData.plugin(passpoerLocalMongoose);

// Create monggose models
const Admin = mongoose.model("AdminData", AdminData);

// Creating passport strategy

passport.use(Admin.createStrategy());

//Serializing and Deserializing User


passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    Admin.findById(id, function (err, user) {
      done(err, user);
    });
  });

//Assigning Abi for my contrat

const myContract = new web3.eth.Contract(Contract.abi, process.env.CONTRACTADDRESS, {
    from: process.env.NOOBSWALLET.toLowerCase()
}); 

//Function to convert text to hex

function hexEncode(company){
        var result = '';
        for (var i=0; i<company.length; i++) {
          result += company.charCodeAt(i).toString(16);
        }
        return result;
}

  //Route for registration of a company
app.post("/bet", async function(req,res){
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
    await myContract.methods.bet(req.body.amount, req.body.answer,req.body.address.toLowerCase()).send({from: process.env.NOOBSWALLET.toLowerCase(),gas:process.env.GAS})
    .then(async receipt=>{
        console.log(receipt)
            res.send("Done!");
        })
    .catch(err=>{
        console.log(err);
        res.send("Error!");
    });
});



app.get("/getWinner", async function(req,res){
    await myContract.methods.getAll().call()
    .then(receipt=>{
        console.log(receipt[Object.keys(receipt)['0']]);
        list=[]
        for(var i=0;i<receipt[Object.keys(receipt)['0']].length;i++){
            list.push({address:receipt[Object.keys(receipt)['0']][i].better,amount:Number(receipt[Object.keys(receipt)['0']][i].betamount),answer:Number(receipt[Object.keys(receipt)['0']][i].answer)})
        }
        res.send({bets:list,answerog: Number(receipt[Object.keys(receipt)['1']])});
    })
    .catch(err=>{
        console.log(err);
        res.send("Error");
    });
});

    //Route to get details about a token Id

app.get("/uploadQuestion", async function(req,res){
    await Axios.get('http://localhost:8080/get_generated_text')
    .then((response) => {
      console.log(response.data);
      const question = response.data;
    })
    .catch(err=>{
      console.log(err);
      res.send("Error");
    });
    await myContract.methods.uploadQuestion().call()
    .then(receipt=>{
        res.send("Done!");
    })
    .catch(err=>{
        console.log(err);
        res.send("Error");
    });
});

app.post("/uploadAnswer", async function(req,res){
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
    await myContract.methods.adminAnswer(req.body.answer).send({from: process.env.NOOBSWALLET.toLowerCase(), gas:process.env.GAS})
    .then(receipt=>{
        res.send("Done!");
    })
    .catch(err=>{
        console.log(err);
        res.send("Error!");
    });
});

  app.post("/login", function (req, res) {
    const user = new Admin({
      username: req.body.username,
      password: req.body.password
    });
    req.login(user, function (err) {
      if (err) {
        res.send(false)
      } else {
        passport.authenticate("local", { failureRedirect: process.env.REACT_URL + "/login" })(req, res, function () {
          res.send(true)
        });
      }
    });
  });

const port=8282||process.env.PORT;
app.listen(port,function(){
    console.log("server running at port: "+port);
});
