var socket = io.connect();
var sendTimeInMs;
var wslatency;

socket.on('led', function(data) {
    document.getElementById("inputSlider").value = data.value;
    document.getElementById("outputText").innerHTML = data.value;
});

socket.on('getTime', function(data) {
    wslatency = Date.now() - sendTimeInMs;
    document.getElementById("wslatency").innerHTML = wslatency;
});

function showValue(newValue) {
    document.getElementById("outputText").innerHTML = newValue;
    socket.emit('led', {
        value: newValue
    });
}

function sendTime() {
    sendTimeInMs = Date.now();
    socket.emit('setTime', {
        millisecond: sendTimeInMs
    });
}