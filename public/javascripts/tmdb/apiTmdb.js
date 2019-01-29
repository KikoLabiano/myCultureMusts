//API for calling TheMovieDB API

var tmdbModule = (function () {
    "use strict";

    var tmdbAPI = {
        searchByTitle: (title) => {
            $.ajax({
                type: 'get',
                url: `https://api.themoviedb.org/3/search/movie?api_key=ed3f1499acdc713141dc990dc1262022&language=en-US&query=${title}&page=1&include_adult=false`,
                success: function (data) {
                    console.log(data.results);
                    let titlesObject = {};
                    for (let i = 0; i < data.results.length; i++) {
                        titlesObject[data.results[i].title] = data.results[i].flag;
                    }

                    $("#movie_title").autocomplete({
                        data: titlesObject,
                        onAutocomplete: function(name){
                            let movie = data.results.filter(obj=>obj.title===name);
                            $("#movie_year").val(movie[0].release_date.substring(0,4));
                            M.updateTextFields();
                        }
                    });
                }
            });
        },
        getRestValuesByTitle: (title) =>{

        }
    }

    return tmdbAPI;
})();