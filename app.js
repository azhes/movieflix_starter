/*
 Authors:
 Your name and student #: Andrew Graystone A01265976
 Your Partner's Name and student #: I did this by myself
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require('fs').promises;

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let formData = req.body.movies;
  console.log(formData);
  let movies = formData.split(',')
  console.log(movies)
  if (movies) {
  res.render("pages/index.ejs", {movies: movies})
  } else {
    res.render("pages/index.ejs", {movies: null})
  }
});

app.get("/myListQueryString", (req, res) => {
  let movie1 = req.query.movie1;
  let movie2 = req.query.movie2;
  let movies = [movie1, movie2];

  res.render("pages/index.ejs", {movies: movies});
});

app.get("/search/:movieName", (req, res) => {
  return new Promise((resolve, reject) => { 
  let movie = req.params.movieName
  fs.readFile("movieDescriptions.txt")
  .then((data) => {
    const splitDescriptions = (data.toString().split('\n'))
    splitDescriptions.forEach(description => {
      if (description.includes(movie)){
        const splitDescription = description.split(':')
        let movieDescription = splitDescription[1]
        res.render("pages/searchResult.ejs", {movieName: movie.replace(':', ''), description: movieDescription})
      } else {
        res.render("pages/searchResult.ejs", {movieName: movie.replace(':', ''), description: 'Movie could not be found.'})
      }
      resolve()
    })
  }) .catch(err => reject(err))
})
}) 

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});