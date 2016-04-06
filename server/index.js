var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var methodOverride=require('method-override');
var _ =require('lodash');

//create application
var app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));


//CORS Support
app.use(function(req,res,next){
res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
res.header('Access-Control-Allow-Headers','Content-Type');
next();
});

app.use('/hello',function(req,res,next){
res.send('Hello World!');
next();
});

//connect to database
mongoose.connect('mongodb://localhost:27017/ecomapp');
mongoose.connection.once('open',function(){

//load all the mdoels
app.models=require('./models/index');

//load the routes
var routes=require('./routes');
_.each(routes,function(controller,route){
app.use(route,controller(app,route));
});

app.listen(3000);
console.log('Listening');
});


