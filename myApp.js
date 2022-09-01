require('dotenv').config()
let express = require('express');
let app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

app.use("/public",express.static(__dirname+"/public"))

app.get("/now",(req,res,next)=>{
    req.time = new Date().toString();
    next();
},(req,res)=>{
    res.json({"time":req.time})
})

app.route("/name").get((req,res)=>{
    res.json({name:`${req.query.first} ${req.query.last}`})
}).post((req,res)=>{
    console.log(req.body)
    res.json({name:`${req.body.first} ${req.body.last}`})
})

app.get("/:word/echo",(req,res)=>{
    res.json({echo:req.params.word})
})

app.get("/",function (req,res) {
    res.sendFile(__dirname+"/views/index.html")
})

app.get("/json",(req,res)=>{
    if(process.env.MESSAGE_STYLE==="uppercase"){
        res.json({"message":"HELLO JSON"});
    } else{
        res.json({"message":"Hello json"})
    }
})


























 module.exports = app;
