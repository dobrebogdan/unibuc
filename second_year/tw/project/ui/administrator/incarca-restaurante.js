$.ajax(window.API_URL + "list_restaurants/", {
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
    success: function(data) {
        for (var i = 0; i < data.length; ++ i) {
            var optiune = document.createElement("option");
            optiune.id = "select-restaurant-optiune-" + data[i].id;
            optiune.textContent = data[i].name;
            if (i === 0) {
                optiune.selected = true;
            }
            document.getElementById("select-restaurant").appendChild(optiune);
        }

        document.getElementById("buton-compileaza-comanda").onclick = function() {
            var optiuneSelectata = Array.from(document.getElementById("select-restaurant").children)
                .find(function(opt) { return opt.selected; });
            compileazaComanda(parseInt(optiuneSelectata.id.substr("select-restaurant-optiune-".length)));
        }
    },
    crossOrigin: true,
});

function compileazaComanda(restaurantId) {
    $.ajax(window.API_URL + "compile_order/", {
        method: "POST",
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        },
        data: {
            restaurantId: restaurantId,
        },
        success: function(data) {
            var freqData = new Map();
            var indexedData = new Map();
            for (var i = 0; i < data.length; ++ i) {
                indexedData.set(data[i].id, data[i]);
                freqData.set(data[i].id, (freqData.get(data[i].id) || 0) + 1);
            }
            var productIds = Array.from(indexedData.keys()).sort(function(a, b) { return a - b; });
            var tabel = document.createElement("table");
            tabel.className = "tabel-comanda";
            var total = 0;
            for (var i = 0; i < productIds.length; ++ i) {
                var product = indexedData.get(productIds[i]);
                var freq = freqData.get(productIds[i]);

                var row = document.createElement("tr");
                var cell = document.createElement("td");
                cell.textContent = freq + "×";
                row.appendChild(cell);
                cell = document.createElement("td");
                cell.textContent = product.name;
                row.appendChild(cell);
                cell = document.createElement("td");
                cell.className = "coloana-pret";
                cell.textContent = (product.price * freq / 100).toFixed(2) + " RON";
                row.appendChild(cell);
                tabel.appendChild(row);
                total += product.price * freq;
            }
            var lastRow = document.createElement("tr");
            lastRow.className = "tabel-comanda-ultimul-rand";
            lastRow.appendChild(document.createElement("td"));
            lastRow.appendChild(document.createElement("td"));
            var lastCell = document.createElement("td");
            lastCell.className = "coloana-pret";
            lastCell.textContent = (total / 100).toFixed(2) + " RON";
            lastRow.appendChild(lastCell);
            tabel.appendChild(lastRow);
            var containerComandaCompilata = document.getElementById("comanda-compilata");
            while (containerComandaCompilata.children.length) {
                containerComandaCompilata.children[0].remove();
            }
            containerComandaCompilata.appendChild(tabel);
        },
    });
}
