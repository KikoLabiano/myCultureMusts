var tableModule = (function () {
    "use strict";

    var tableAPI = {
        createRows: (domElt,data) => {
            let rows = data.map(row => `<tr>${getCells(row, 'td')}</tr>`).join('');
            $(`${domElt} tr`).click(function(){
                //Open modal
                //$(this).remove();
                //return false;
            });
            return rows;
        },
        getElements: (domElt,type) => {
            $.ajax({
                type: 'get',
                url: '/' + type,
                success: function (data) {
                    $(domElt).append(tableAPI.createRows(data));
                }
            });
        },
        insertElement: (type, data, domElt) =>{
            $.ajax({
                type: 'post',
                url: '/' + type,
                data: data,
                dataType: "json",
                success: function (data) {
                    console.log("Registro insertado");
                    $(domElt).append(tableAPI.createRows(data));
                },
                error:function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                  }
            });
        }
    }

    function getCells(data, type) {
        let cells = "";
        Object.values(data).map(c => {
            cells += `<${type}>${c}</${type}>`;
        }).join('');
        cells += `<${type}><i class="material-icons right">delete</i></${type}>`
        return cells;
    }
    return tableAPI;
})();