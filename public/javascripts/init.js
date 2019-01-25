$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.tabs').tabs();


    //Initial load
    tableModule.getElements($("#tblMovies tbody"), "movies");
    //tableModule.getElements($("#tblBooks tbody"),"books");
    //tableModule.getElements($("#tblMusic tbody"),"music");

    bindings();
});

function bindings() {
    $('.modal').modal();
    $('.modal-action').on("click", function (e) {
        tableModule.insertElement("movies", JSON.stringify({
            movie_title: $("#movie_title").val(),
            movie_director: $("#movie_director").val(),
            movie_year: $("#movie_year").val(),
            movie_rating: $("#movie_rating").val()
        }));
    });
}