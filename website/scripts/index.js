let engine_main_file = require("../engine/index.js")
let start_button = document.querySelector("#start");
function start(){
    engine_main_file.start(document.querySelector("#email").value, document.querySelector("#pass").value)
}
start_button.addEventListener('click', start)


let encryptor = require("../engine/encryptorcli.js")
let inputs = document.querySelectorAll("input")
function encrypt(){
    if(inputs[1].value == "" || inputs[2].value == ""){
        document.querySelector("#status").textContent = "To encrypt data you need to insert data!"
        document.querySelector("#status").className = "d-flex flex-column justify-content-center align-items-center text-center text-danger"
    }else{
    encryptor.encrypt(inputs[1].value, inputs[2].value)
    }
}
document.querySelector("#button_save").addEventListener("click", encrypt);