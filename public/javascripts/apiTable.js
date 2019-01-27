var tableModule = (function () {
    "use strict";

    var tableAPI = {
        getElements: (domElt, type) => {
            $.ajax({
                type: 'get',
                url: '/' + type,
                success: function (data) {
                    $(`#${domElt} tbody`).append(createRows(domElt, data));
                    $(`#${domElt} tbody tr`).click(function () {
                        let id = $(this).find(".rowHidden");
                        //Open modal
                        $(".modalDelete").modal();
                        $("#btnDelete").on("click", function () {                            
                            deleteElement(domElt, type, id.html(), deleteRowsCbk);
                        })
                        //return false;
                    });
                }
            });
        },
        insertElement: (type, data, domElt) => {
            $.ajax({
                type: 'post',
                url: '/' + type,
                data: data,
                dataType: "json",
                success: function (data) {
                    console.log("Registro insertado");
                    $(domElt).append(tableAPI.createRows(domElt, data));
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            });
        }

    }

    function createRows(domElt, data){
        let rows = data.map(row => `<tr>${getCells(row, 'td')}</tr>`).join('');
        return rows;
    }

    function getCells(data, type) {
        let cells = "";
        Object.values(data).map((c, i) => {
            if (i === 0) {
                cells += `<${type} class='rowHidden'>${c}</${type}>`;
            } else {
                cells += `<${type}>${c}</${type}>`;
            }
        }).join('');
        cells += `<${type}><a class="modal-trigger" data-target="modalDelete"><i class="material-icons right delete">delete</i></a></${type}>`
        return cells;
    }

    function deleteElement(domElt, type, idx, callback) {
        $.ajax({
            type: 'delete',
            url: '/' + type,
            data: JSON.stringify({id: idx}),
            dataType: "json",
            success: function (data) {
                console.log("Registro eliminado");
                if(typeof callback == "function") 
                callback(domElt, id);
                //$(domElt).append(tableAPI.createRows(domElt, data));
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
    }

    function deleteRowsCbk(domElt,id){
        alert("Callback;");
    }

    return tableAPI;
})();