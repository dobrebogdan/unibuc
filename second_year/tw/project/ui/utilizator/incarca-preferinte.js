var userId = (new URL(document.location)).searchParams.get("id-utilizator");
if (userId == null) {
    document.getElementById("placeholder-preferinte").textContent = "Eroare incarcare preferinte. Reincarcati pagina.";
    throw Error("ID Utilizator invalid!");
}

var user = null;

function afiseazaUtilizator() {
    var unde = document.getElementById("username");
    unde.textContent = user.name;
}

function afiseazaPreferintaImplicita(parinte, data, restaurantId) {
    var preferinta = data.defaultPreferences.find(function(obj) { return obj.userId === user.id && obj.restaurantId === restaurantId; });
    var niciunProdus;
    if (preferinta == null) {
        niciunProdus = document.createElement("em");
        niciunProdus.textContent = "Niciun produs.";
        parinte.appendChild(niciunProdus);
        return;
    }
    var productIds = preferinta.productIds;
    if (productIds.length === 0) {
        niciunProdus = document.createElement("em");
        niciunProdus.textContent = "Niciun produs.";
        parinte.appendChild(niciunProdus);
        return;
    }
    for (var i = 0; i < productIds.length; ++ i) {
        var produs = data.products.find(function(obj) { return obj.id === productIds[i]; });
        var containerProdus = document.createElement("div");
        containerProdus.appendChild(document.createTextNode(produs.name));
        parinte.appendChild(containerProdus);
    }
}

function afiseazaFormularPreferinta(parinte, data, products, restaurantId) {
    function creeazaSelect(optiuneSelectata) {
        var select = document.createElement("select");
        select.className = "product-select";
        for (var i = 0; i < products.length; ++ i) {
            var optiune = document.createElement("option");
            optiune.textContent = products[i].name;
            optiune.selected = (products[i].name === optiuneSelectata);
            select.appendChild(optiune);
        }
        return select;
    }

    var formular = document.createElement("div");
    formular.className = "product-selection-form";
    var butonAdaugareProdus = document.createElement("button");
    butonAdaugareProdus.textContent = "Adauga produs";
    butonAdaugareProdus.className = "add-product-button";
    butonAdaugareProdus.onclick = function() {
        var select = creeazaSelect();
        var selectContainer = document.createElement("div");
        selectContainer.className = "select-container";
        selectContainer.appendChild(select);
        var butonStergereProdus = document.createElement("button");
        butonStergereProdus.className = "remove-product-button";
        butonStergereProdus.textContent = "Sterge";
        butonStergereProdus.onclick = function() {
            formular.removeChild(selectContainer);
        };
        selectContainer.appendChild(butonStergereProdus);

        formular.insertBefore(selectContainer, butonAdaugareProdus);
    };
    formular.appendChild(butonAdaugareProdus);
    var preferinta = data.defaultPreferences.find(function(obj) { return obj.userId === user.id && obj.restaurantId === restaurantId; });
    if (preferinta != null) {
        for (var i = 0; i < preferinta.productIds.length; ++ i) {
            var produs = products.find(function(obj) { return obj.id === preferinta.productIds[i]; });
            var select = creeazaSelect(produs.name);
            var selectContainer = document.createElement("div");
            selectContainer.className = "select-container";
            selectContainer.appendChild(select);
            var butonStergereProdus = document.createElement("button");
            butonStergereProdus.className = "remove-product-button";
            butonStergereProdus.textContent = "Sterge";
            butonStergereProdus.onclick = function() {
                formular.removeChild(selectContainer);
            };
            selectContainer.appendChild(butonStergereProdus);

            formular.insertBefore(selectContainer, butonAdaugareProdus);
        }
    }
    parinte.appendChild(formular);
    return formular;
}

function salveazaFormularPreferinta(formular, data, products, restaurantId) {
    var productIds = Array.from(formular.children)
        .filter(function(e) { return e.className === "select-container"; })
        .map(function(e) {
            return Array.from(e.children[0].children).find(function(opt) {
                return opt.selected;
            }).textContent;
        })
        .map(function(nume) {
            return products.find((function(p) { return p.name === nume; })).id;
        });
    var uniqueProductIds = Array.from(new Set(productIds));
    $.ajax(window.API_URL + "save_user_restaurant_default_preference/", {
        method: "POST",
        data: {
            userId: userId,
            restaurantId: restaurantId,
            productIds: uniqueProductIds,
        },
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        },
        success: function() {
            window.location.reload();
        }
    });
}

function afiseazaModalEditarePreferintaImplicita(data, products, restaurantId) {
    var restaurant = data.restaurants.find(function(obj) { return obj.id === restaurantId; });

    var modal = document.createElement("div");
    modal.className = "modal";
    var continutModal = document.createElement("div");
    continutModal.className = "modal-content";
    var headerModal = document.createElement("div");
    headerModal.className = "modal-header";
    var butonInchidere = document.createElement("span");
    butonInchidere.className = "close";
    butonInchidere.textContent = "×";
    headerModal.appendChild(butonInchidere);
    var titlu = document.createElement("h3");
    titlu.textContent = "Editare preferinta implicita pentru restaurantul " + restaurant.name + " (utilizator " + user.name + ")";
    headerModal.appendChild(titlu);
    var corpModal = document.createElement("div");
    corpModal.className = "modal-body";
    var formular = afiseazaFormularPreferinta(corpModal, data, products, restaurantId);
    var footerModal = document.createElement("div");
    footerModal.className = "modal-footer";
    var butonSalvare = document.createElement("button");
    butonSalvare.className = "modal-save-button";
    butonSalvare.textContent = "Salveaza";
    var butonAnulare = document.createElement("button");
    butonAnulare.className = "modal-cancel-button";
    butonAnulare.textContent = "Anuleaza";
    var curatator = document.createElement("div");
    curatator.className = "clear-both";
    footerModal.appendChild(butonSalvare);
    footerModal.appendChild(butonAnulare);
    footerModal.appendChild(curatator);
    modal.appendChild(continutModal);
    continutModal.appendChild(headerModal);
    continutModal.appendChild(corpModal);
    continutModal.appendChild(footerModal);
    document.body.appendChild(modal);
    modal.style.display = "block";

    var callbackInchidere = function() {
        modal.remove();
        window.removeEventListener("click", callbackInchidere);
    };

    continutModal.onclick = function(event) {
        event.stopPropagation();
    };
    butonSalvare.onclick = function() {
        salveazaFormularPreferinta(formular, data, products, restaurantId);
    };
    butonInchidere.onclick = callbackInchidere;
    butonAnulare.onclick = callbackInchidere;
    window.addEventListener("click", callbackInchidere);
}

function afiseazaButonModificare(parinte, data, restaurantId) {
    var buton = document.createElement("button");
    buton.appendChild(document.createTextNode("Modifica"));
    buton.className = "change-preference-button";
    buton.onclick = function(event) {
        event.stopPropagation();
        $.ajax(window.API_URL + "list_restaurant_products/", {
            data: {
                restaurantId: restaurantId,
            },
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
            success: function(products) {
                afiseazaModalEditarePreferintaImplicita(data, products, restaurantId);
            },
            crossOrigin: true,
        });
    };
    var containerButon = document.createElement("div");
    containerButon.appendChild(buton);
    parinte.appendChild(containerButon);
}

function afiseazaTabelPreferinte(data) {
    var unde = document.getElementById("placeholder-preferinte");
    unde.textContent = "";

    var tabel = document.createElement("table");
    tabel.className = "tabel-preferinte";

    var headerTabel = document.createElement("tr");
    var celula = document.createElement("th");
    celula.textContent = "Restaurant";
    celula.className = "name-cell";
    headerTabel.appendChild(celula);
    celula = document.createElement("th");
    celula.textContent = "Default";
    headerTabel.appendChild(celula);
    celula = document.createElement("th");
    celula.textContent = "Special";
    headerTabel.appendChild(celula);
    tabel.appendChild(headerTabel);

    for (var i = 0; i < data.restaurants.length; ++ i) {
        var linie = document.createElement("tr");
        celula = document.createElement("td");
        celula.textContent = data.restaurants[i].name;
        celula.className = "name-cell";
        linie.appendChild(celula);
        celula = document.createElement("td");
        afiseazaPreferintaImplicita(celula, data, data.restaurants[i].id);
        afiseazaButonModificare(celula, data, data.restaurants[i].id);
        linie.appendChild(celula);
        celula = document.createElement("td");
        celula.textContent = "Neimplementat inca!";
        linie.appendChild(celula);
        tabel.appendChild(linie);
    }

    unde.appendChild(tabel);
}

$.ajax(window.API_URL + "user_preferences/", {
    data: {
        userId: userId,
    },
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
    error: function() {
        document.getElementById("placeholder-utilizator").textContent = "Eroare incarcare utilizator. Reincarcati pagina.";
        document.getElementById("placeholder-preferinte").textContent = "Eroare incarcare preferinte. Reincarcati pagina.";
    },
    success: function(data) {
        user = data.user;
        afiseazaUtilizator();
        afiseazaTabelPreferinte(data);
    },
    crossOrigin: true,
});
