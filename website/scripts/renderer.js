
window.api.receive("no_of_pokes_recive_channel", (data) => { // exception on trying to access window.api.receive
    document.querySelector("#no_of_pokes").innerHTML = data
});
window.api.send("no_of_pokes", 3);