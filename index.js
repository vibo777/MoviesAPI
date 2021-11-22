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

// to fetch all the movies
app.get("/movies",(req,res)=>{

    movieModel.find()
    .then((movies)=>{
        res.send(movies);
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem while fetching all movies"})
    })

})

// to fetch a single movie with id 
app.get("/movies/:id",(req,res)=>{
  
    let id = req.params.id;

    movieModel.findOne({_id:id})
    .then((movie)=>{
        res.send(movie);
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem while fetching movie"})
    })

})

// to delete a movie 

app.delete("/movies/:id",(req,res)=>{
  
    let id = req.params.id;

    movieModel.deleteOne({_id:id})
    .then((movie)=>{
        res.send({message:"Movie deleted"});
    })
    .catch((err)=>{
        console.log(err);
        res.send("Some problem while fetching movie");
    })

})

// to update the movie 

app.put("/movies/:id",(req,res)=>{
  
    let id = req.params.id;
    let dataToUpdate=req.body;

    movieModel.updateOne({_id:id},dataToUpdate)
    .then(()=>{
        res.send({message:"Movie Updated"});
    })
    .catch((err)=>{
        console.log(err);
        res.send("Some problem while updating the movie");
    })

})