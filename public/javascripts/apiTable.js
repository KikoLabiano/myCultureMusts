var tableModule = (function () {
    "use strict";

    var tableAPI = {
        createRows: (data) => {
            return data.map(row => `<tr>${getCells(row, 'td')}</tr>`).join('')
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
        insertElement: (type, data) =>{
            $.ajax({
                type: 'post',
                url: '/' + type,
                data: data,
                dataType: "json",
                success: function (data) {
                    console.log("Registro insertado");
                    //$(domElt).append(tableAPI.createRows(data));
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
        return cells;
    }
    return tableAPI;
})();