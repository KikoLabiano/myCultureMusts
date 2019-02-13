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
                        //$("#modalDelete").modal();
                        //$("#modalDelete").modal('open');
                        $("#btnDelete").on("click", function () {
                            deleteElement(domElt, type, id.html(), deleteRowsCbk);
                        });                        
                        //return false;
                    });
                    $('.tooltipped').tooltip();
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
        return data.map(row => `<tr>${getCells(row, 'td')}</tr>`).join('');
        // $(rows).each(function () {
        //     console.log($(this).html());
        // });
        // return rows;
    }

    function getCells(data, type) {
        let cells = "";
        let arrData = [];
        // return `<${type} class='rowHidden'>${data.Id}</${type}><${type}>${data.Director}</${type}><${type}>${data.Year}</${type}><${type}>${data.Director}</${type}><${type}>${data.Rating}</${type}><${type}><a class="modal-trigger" data-target="modalDelete"><i class="material-icons right delete">delete</i></a></${type}>`;
        for(let [key, value] of Object.entries(data)) {
            if(key.toLowerCase().includes("id")){
                arrData[0] = value;
            }
            else if(key.toLowerCase().includes("title")){
                arrData[1] = value;
            }
            else if(key.toLowerCase().includes("year")){
                arrData[2] = value;
            }
            else if(key.toLowerCase().includes("director")){
                arrData[3] = value;
            }
            else if(key.toLowerCase().includes("rating")){
                arrData[4] = value;
            }
            else if(key.toLowerCase().includes("notes")){
                if(value!==null){
                    arrData[5] = value;
                }
                else{
                    arrData[5] = "";
                }
            }
        }

        arrData.map((c, i) => {
            if (i === 0) {
                cells += `<${type} class='rowHidden'>${c}</${type}>`;
            } 
            else if (i === 5) {
                cells += `<${type} class='notes tooltipped' data-position="top" data-tooltip="${c != '' ? c : 'No notes'}">${c}</${type}>`;
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
        $(`#${domElt}`).find("td").filter(function () {
            return $(this).text() == idx;
        }).closest("tr").remove();
    }

    return tableAPI;
})();