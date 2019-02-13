$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.tabs').tabs();

    //Initial load
    tableModule.getElements("tblMovies", "movies");
    //tableModule.getElements($("#tblBooks tbody"),"books");
    //tableModule.getElements($("#tblMusic tbody"),"music");

    var ranges = document.querySelectorAll("input[type=range]");
    M.Range.init(ranges);

    bindings();
});

function bindings() {
    //Modal initialization
    $('#modalAdd').modal();
    $('#modalDelete').modal();

    //Select initialization
    $('select').formSelect();
    tmdbModule.getTranslations($("#ddlLanguage"));

    $('#addMovie').on("click", function (e) {
        tableModule.insertElement("movies", JSON.stringify({
            movie_title: $("#movie_title").val(),
            movie_director: $("#movie_director").val(),
            movie_year: $("#movie_year").val(),
            movie_rating: $("#movie_rating").val(),
            movie_notes: $("#movie_notes").val()
        }), $("#tblMovies tbody"));
    });

    //let timeout = null;

    $("#movie_title").on("keypress", function () {

        // if(timeout) {
        //     clearTimeout(timeout);
        //     timeout = null;
        // }

        //timeout = setTimeout(()=> {
        //console.log("asdff");
        tmdbModule.searchByTitle($(this).val());
        //}, 2000);
    });

}