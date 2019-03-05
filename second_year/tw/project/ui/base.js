window.API_URL = "http://100.115.92.205:8889/";

function renderCurrentTime() {
    var d = new Date();
    return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
}

function setCurrentTime() {
    document.getElementById("current-time").textContent = renderCurrentTime();
}

setTimeout(setCurrentTime, 50);
setInterval(setCurrentTime, 1000);

setTimeout(function() {
    $.ajax(window.API_URL + "list_restaurants/", {
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        },
        success: function(data) {
            var parinte = document.getElementById("meniu-dropdown-content");
            for (var i = 0; i < data.length; ++ i) {
                var link = document.createElement("a");
                link.href = (window.IS_HOME ? "." : "..") + "/meniu/index.html?id-restaurant=" + data[i].id + "&nume-restaurant=" + data[i].name;
                link.textContent = data[i].name;
                link.target = "_blank";
                parinte.appendChild(link);
            }
        },
        crossOrigin: true,
    });
}, 100);