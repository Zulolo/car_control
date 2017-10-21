var socket = io.connect();
var sendTimeInMs;
var wslatency;

var alpha = 0,
    beta = 0,
    gamma = 0,
    handleOrientationEvent = function(e) {
        alpha = e.alpha,
        beta = e.beta,
        gamma = e.gamma;
    },
    sendOrientation = function() {
        socket.emit('setOrientation', {
            alpha: alpha, beta: beta, gamma: gamma
        });
    };

socket.on('led', function(data) {
    document.getElementById("inputSlider").value = data.value;
    document.getElementById("outputText").innerHTML = data.value;
});

socket.on('getTime', function(data) {
    wslatency = Date.now() - sendTimeInMs;
    document.getElementById("wslatency").innerHTML = wslatency;
});

socket.on('getOrientation', function(data) {
    document.getElementById("orientation").innerHTML = data.alpha;
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

if (window.DeviceOrientationEvent) {
    // Create an event listener
    window.addEventListener('deviceorientation', handleOrientationEvent, false);
    window.setInterval(sendOrientation, 100);
}