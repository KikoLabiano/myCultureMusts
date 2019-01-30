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

tmdbModule.getTranslations();

    $('#addMovie').on("click", function (e) {
        tableModule.insertElement("movies", JSON.stringify({
            movie_title: $("#movie_title").val(),
            movie_director: $("#movie_director").val(),
            movie_year: $("#movie_year").val(),
            movie_rating: $("#movie_rating").val()
        }),$("#tblMovies tbody"));
    });  

      $("#movie_title").on("keypress",function(){
        tmdbModule.searchByTitle($(this).val());
      });

}