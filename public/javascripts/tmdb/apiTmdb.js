//API for calling TheMovieDB API

var tmdbModule = (function () {
    "use strict";

    var tmdbAPI = {
        searchByTitle: (title) => {
            fetchCall(`https://api.themoviedb.org/3/search/movie?api_key=ed3f1499acdc713141dc990dc1262022&language=en-US&query=${title}&page=1&include_adult=false`)
                .then(function (res) {
                    let titlesObject = {};
                    if (res.results) {
                        for (let i = 0; i < res.results.length; i++) {
                            titlesObject[res.results[i].title] = res.results[i].flag;
                        }
                    }
                    $("#movie_title").autocomplete({
                        data: titlesObject,
                        onAutocomplete: function (name) {
                            let movie = res.results.filter(obj => obj.title === name);
                            console.log(movie[0]);
                            $("#movie_year").val(movie[0].release_date.substring(0, 4));
                            $("#movie_rating").val(movie[0].vote_average);
                            
                            //getCreditsById
                            fetchCall(`https://api.themoviedb.org/3/movie/${movie[0].id}/credits?api_key=ed3f1499acdc713141dc990dc1262022`)
                            .then(function(credits){
                                console.log(credits);
                                let director = credits.crew.filter(obj => obj.job === "Director");
                                $("#movie_director").val(director[0].name);
                                M.updateTextFields();
                            });                            
                        }
                    });
                });
        }
    }

    return tmdbAPI;
})();

function fetchCall(callUrl) {
    return fetch(callUrl)
        .then((response) => {
            return response.json();
        });

}