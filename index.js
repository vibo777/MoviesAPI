const express = require('express');
const mongoose = require('mongoose');

// code for mongodb connection 
mongoose.connect("mongodb://localhost:27017/moviesapi")
.then(()=>{console.log("Mongo connection sucessfull")})
.catch((err)=>{console.log(err)});

// movies collection schema & model

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

// actors collection schema & model 

const actorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    profile:{type:String,require:true} 
})

const actorModel=new mongoose.model("actors",actorSchema);  

// schema & model for movies_actors

const movieActorSchema = new mongoose.Schema({

    movie_id:{type:mongoose.Schema.Types.ObjectId,ref:"movies"},
    actor_id:{type:mongoose.Schema.Types.ObjectId,ref:"actors"}
})

const movieActorModel = new mongoose.model("movies_actors",movieActorSchema);


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
        res.send({message:"Some Problem Creating the movie"});
    })
})
app.listen(3000);

// to connect movies & actors

app.post("/movieactors",(req,res)=>{

    let movieactor = req.body;
    let movieActorOBJ = new movieActorModel(movieactor);

    movieActorOBJ.save()
    .then(()=>{
        res.send({message:"Actor created for a movie"});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem"});
    })
})

// to fetch movies with actors 
app.get("/moviesactors",(req,res)=>{

    movieActorModel.find().populate('movie_id').populate('actor_id')
    .then((movies)=>{
        res.send(movies);
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem while fetching all movies"})
    })
})

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

// actors endpoints

// To create actors

app.post("/actors",(req,res)=>{

    let actor=req.body;

    let actorOBJ = new actorModel(actor);

    actorOBJ.save()
    .then(()=>{
        res.send({message:"Actor Created"});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem Creating the actor"});
    })

})



