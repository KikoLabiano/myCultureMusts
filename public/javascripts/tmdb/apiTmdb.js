//API for calling TheMovieDB API

var tmdbModule = (function () {
    "use strict";

    var tmdbAPI = {
        searchByTitle: async (title) => {
            let res = await fetchCall(`https://api.themoviedb.org/3/search/movie?api_key=ed3f1499acdc713141dc990dc1262022&language=en&query=${title}&page=1&include_adult=false`);
            let titlesObject = {};
            if (res.results) {
                for (let i = 0; i < res.results.length; i++) {
                    titlesObject[res.results[i].title] = res.results[i].flag;
                }
            }
            $("#movie_title").autocomplete({
                data: titlesObject,
                onAutocomplete: async function (name) {
                    let movie = res.results.filter(obj => obj.title === name);
                    console.log(movie[0]);
                    $("#movie_year").val(movie[0].release_date.substring(0, 4));
                    $("#movie_rating").val(movie[0].vote_average);
                    $("#movie_overview").val(movie[0].overview);
                    M.textareaAutoResize($('#movie_overview'));
                    //getCreditsById
                    let credits = await fetchCall(`https://api.themoviedb.org/3/movie/${movie[0].id}/credits?api_key=ed3f1499acdc713141dc990dc1262022`);
                    let director = credits.crew.filter(obj => obj.job === "Director");
                    $("#movie_director").val(director[0].name);
                    M.updateTextFields();

                    //Add cast of the movie
                    addCast($("#ddlCast"), credits.cast);
                }
            });
        },
        getTranslations: async () => {
            let trans = await getTranslationCodes();
            let transFiltered = trans.map((e) => {
                return e.split('-')[0];
            });
            let lang = await getLanguages();

            var filteredLang = lang.filter(function (l) {
                return transFiltered.indexOf(l.iso_639_1.toLowerCase()) > -1;
            });
            console.log(filteredLang);
        }
    }

    return tmdbAPI;
})();

function addCast(selectCast, arrayCast) {
    selectCast
        .find('option')
        .remove()
        .end();

    arrayCast.forEach(c => {
        if (c.profile_path == null) {
            selectCast.append(`<option value='${c.name}' data-icon=images/noPhoto.png>${c.name} (${c.character})</option`);
        } else {
            selectCast.append(`<option value='${c.name}' data-icon=http://image.tmdb.org/t/p/w92${c.profile_path}>${c.name} (${c.character})</option`);
        }
    });

    $('select').formSelect();
}

async function fetchCall(url) {
    try {
        let resp = await fetch(url);
        let json = await resp.json();
        return json;
    } catch (err) {
        console.log(err)
    }
}

async function getTranslationCodes() {
    return await fetchCall(`https://api.themoviedb.org/3/configuration/primary_translations?api_key=ed3f1499acdc713141dc990dc1262022`);
}

async function getLanguages() {
    return await fetchCall(`https://api.themoviedb.org/3/configuration/languages?api_key=ed3f1499acdc713141dc990dc1262022`);
}

///Simple fetchCall and return JSON
// function fetchCall(callUrl) {
//     return fetch(callUrl)
//         .then((response) => {
//             return response.json();
//         });
// }