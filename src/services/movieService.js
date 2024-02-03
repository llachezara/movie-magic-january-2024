const movies = [
    {
        _id: 1,
        title: "Jungle Cruise",
        genre: "Adventure",
        director: "Jaume Collet-Serra",
        year: 2021,
        imageUrl: "/img/jungle-cruise.jpeg",
        rating: 5,
        description: "Dreaming about saving countless lives and having another adventure, the feisty English feminist and doctor of botany, Dr Lily Houghton, embarks on a peril-laden mission to change the world. Along with her fashionable brother, MacGregor, Dr Houghton enlists the help of the arrogant, wisecracking riverboat skipper, Captain Frank Wolff, to guide them through the serpentine Amazon River in La Quila, his swift wooden boat. Now, as the intrepid trio ventures deeper and deeper into the heart of an impenetrable green maze, searching for something that cannot be found, a centuries-old curse a the ruthless aristocrat, Prince Joachim, threaten to put an end  their ambitious plans."
    },
    {
        _id: 2,
        title: "The Little Marmaid",
        genre: "Fantasy",
        director: "Rob Marshall",
        year: 2023,
        imageUrl: "/img/the-little-mermaid.jpg",
        rating: 4,
        description: "Description: The youngest of King Triton's daughters, Ariel is a beautiful and spirited young mermaid with a thirst for adventur Longing to find out more about the world beyond the sea, Ariel visits the surface a falls for the dashing Prince Eric. Following her heart, she makes a deal with the ev sea witch, Ursula, to experience life on land."
    },
    {
        _id: 3,
        title: "Home Alone",
        genre: "Comedy",
        director: "Chris Columbus",
        year: 1990,
        imageUrl: "/img/home-alone.jpeg",
        rating: 4,
        description: "It is Christmas time and the McCallister family is preparing for a vacation in Paris, France. But t youngest in the family, Kevin (Macaulay Culkin), got into a scuffle wi his older brother Buzz (Devin Ratray) and was sent to his roo which is on the third floor of his house. Then, the next morning, whi the rest of the family was in a rush to make it to the airport  time, they completely forgot about Kevin, who now has the house a to himself. Being home alone was fun for Kevin, having a pizza all  himself, jumping on his parents' bed, and making a mess. The Kevin discovers about two burglars, Harry (Joe Pesci) and Marv (Dani Stern), about to rob his house on Christmas Eve. Kevin acts quickly  wiring his own house with makeshift booby traps to stop the burgla and to bring them to justice."
    }
];

exports.search = function (title, genre, year){
   let result = movies.slice();

   if (title) {
     result = result.filter(movie => movie.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()) );
   }
   if (genre) {
    result = result.filter(movie => movie.genre.toLocaleLowerCase() === genre.toLocaleLowerCase() );
   }
   if (year) {
    result = result.filter(movie => movie.year === year );
   }

   return result;
}

exports.create = function (movieData) {
    movieData._id = movies[movies.length-1]._id + 1;
    movies.push(movieData)
}

exports.getAll = function (){
    return movies.slice();
}

exports.getOne = function (movieId){
    const currentMovie = movies.find((movie) => movie._id == movieId);
    return currentMovie;
}
