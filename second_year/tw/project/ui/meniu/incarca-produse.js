var restaurantId = (new URL(document.location)).searchParams.get("id-restaurant");
var restaurantName = (new URL(document.location)).searchParams.get("nume-restaurant");

$.ajax(window.API_URL + "list_restaurant_products/", {
    data: {
        restaurantId: restaurantId,
    },
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
    success: function(data) {
        document.getElementById("nume-restaurant").textContent = restaurantName;
        for (var i = 0; i < data.length; ++ i) {
            var productTitle = document.createElement("h3");
            productTitle.textContent = data[i].name + " (" + (data[i].price / 100).toFixed(2) + " RON)";
            document.getElementById("meniu").appendChild(productTitle);
            var productDescription = document.createElement("p");
            productDescription.textContent = data[i].description;
            document.getElementById("meniu").appendChild(productDescription);
        }
    },
    crossOrigin: true,
});
