//API for managing table data

var tableModule = (function () {
    "use strict";

    var tableAPI = {
        getElements: (domElt, type) => {
            $.ajax({
                type: 'get',
                url: '/api/' + type,
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
                url: '/api/' + type,
                data: data,
                dataType: "json",
                success: function (d) {
                    console.log("Registro insertado");
                    $(domElt).append(createRows(domElt, new Array({
                        id: d,
                        ...JSON.parse(data)
                    })));
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            });
        }
    }




    function createRows(domElt, data) {
        let rows = data.map(row => `<tr>${getCells(row, 'td')}</tr>`).join('');
        $(rows).each(function(){
            console.log($(this).html());
        });
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
            url: '/api/' + type,
            data: JSON.stringify({
                id: idx
            }),
            dataType: "json",
            success: function (data) {
                console.log("Registro eliminado");
                if (typeof callback == "function")
                    callback(domElt, idx);
                //$(domElt).append(tableAPI.createRows(domElt, data));
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
    }

    function deleteRowsCbk(domElt, idx) {
        $("td").filter(function () {
            return $(this).text() == idx;
        }).closest("tr").remove();
    }

    return tableAPI;
})();