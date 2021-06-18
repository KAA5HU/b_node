//IMport express
const express = require('express')
let app = express()     //instance of object

app.use(express.json())
//movies data
movies = [
    {
        movie_name: "Harry Potter",
        year: 2006,
        directer: "Chris Columbus"
    }
]


//get request
app.get('/movies',function (request, response) {

    response.send(movies)
})


//post request
app.post('/addMovie', (req, res) => {
    //new data
    const movie_name = req.body.movie_name
    const year = req.body.year
    const directer = req.body.directer
    const movie = { movie_name, year, directer }
    movies.push(movie)
    if (res.status(200)) {
        //status success(200)
        res.json({ status: "success", message: `${movie_name} has been added to the array` })
    } else {
        //404
        res.status(404).json({ error: "No such movie found" })
    }
})


//delete method
app.delete('/delete', (req, res) => {
    const movie = req.body.movie_name
    const movieIndex = movies.findIndex(item => {
        return (item.movie_name === movie)
    })
    if (movieIndex >= 0) {
        movies.splice(movieIndex, 1);
        //status success(200)
        res.status(200).json({ status: "success", message: `${movie} has been removed from the array` })
    }
    else {
        //404
        res.status(404).json({ error: "No such movie found" })
    }
})

//put method
app.put('/movieyear', (req, res) => {
    const index = movies.findIndex(item => {
        return (item.movie_name == req.body.movie)
    })
    console.log(index);


    if (index >= 0) {
        //if movie is matches year iwill be changes
        const updatedMovieYear = movies[index];
        updatedMovieYear.year = req.body.year
        res.status(200).json(updatedMovieYear)
    }
    else {
        res.status(404).json({ error: "Updation of year failed" })
    }
})


//server is at 3000
app.listen(3000, () => 
    console.log("server is runnning at 3000")
)

