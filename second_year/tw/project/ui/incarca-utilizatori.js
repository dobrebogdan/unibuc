$.ajax(window.API_URL + "list_users/", {
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
    error: function() {
        document.getElementById("placeholder-utilizatori").textContent = "Eroare incarcare utilizatori. Reincarcati pagina.";
    },
    success: function(data) {
        document.getElementById("placeholder-utilizatori").remove();
        for (var i = 0; i < data.length; ++ i) {
            var menuButton = document.createElement("div");
            menuButton.className = "menu-button";
            var menuButtonLink = document.createElement("a");
            menuButtonLink.textContent = data[i].name;
            menuButtonLink.href = "utilizator/index.html?id-utilizator=" + data[i].id;
            menuButtonLink.className = "menu-button-link";
            menuButton.appendChild(menuButtonLink);
            document.getElementById("container").appendChild(menuButton);
        }
    },
    crossOrigin: true,
});
