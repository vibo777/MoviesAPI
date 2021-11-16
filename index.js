const express = require('express');
const mongoose = require('mongoose');

// code for mongodb connection 
mongoose.connect("mongodb://localhost:27017/moviesapi")
.then(()=>{console.log("Mongo connection sucessfull")})
.catch((err)=>{console.log(err)});

const movieSchema = new mongoose.Schema({
    name:{type:String,required:true},
    releasedate:{type:Date,required:true},
    genre:{type:String,required:true},
    boxoffice:{type:Number,required:true},
    rating:{type:Number,required:true},
    director:{type:String,required:true},
    poster:{type:String,required:true},
    production_studio:{type:String,required:true}
},{timestamps:true})

const movieModel = new mongoose.model('movies',movieSchema);

// Express Object 
const app=express();

app.use(express.json());

// to create a movie
app.post("/movies",(req,res)=>{
     
    let movie = req.body;
    let movieOBJ = new movieModel(movie);
    movieOBJ.save()
    .then(()=>{
        res.send({message:"Movie Created"});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem Creating the problem"});
    })
})
app.listen(3000);



