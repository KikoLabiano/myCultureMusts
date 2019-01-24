$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.tabs').tabs();
    $('.modal').modal();
    
    //Initial load
    tableModule.getElements($("#tblMovies tbody"),"movies");  
    //tableModule.getElements($("#tblBooks tbody"),"books");
    //tableModule.getElements($("#tblMusic tbody"),"music");

    bindings();
});

function bindings(){

}