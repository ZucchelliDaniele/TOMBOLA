"use strict"
var ws;
var value=0;

function WebSocketTest() {
    var value = document.getElementById("input").value
    if(value!="") {
        ws.send(value);
        console.log("sended: "+value);
    }
    else console.log("Value not valid")
}
function connect() {
    ws = new WebSocket("ws://localhost:8080");
    ws.addEventListener('message', function (event) {
        if(value==0) {
            ws.send(JSON.stringify({ connect: 1, nick: String(document.getElementById("nick").value) , group: String(document.getElementById("group").value)}))
            value++;
        }
        console.log("Server: "+event.data);
        document.getElementById("text").innerHTML="Received: "+event.data;
    });
}