"use strict"

var _ip = Date.parse( new Date());

/**
 * Get position of canvas.
 * 
 * @param {HTMLCanvasElement} canvas 
 * @param {int} x 
 * @param {int} y 
 */
function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: (x - bbox.left) * (canvas.width / bbox.width),
        y: (y - bbox.top) * (canvas.height / bbox.height)
    };
}


function prepareBaseLayer() {
    var layer = new Layer(app.numericals.width, app.numericals.height);
    /** @var {HTMLCanvasElement} canvas */
    var canvas = layer.getdom();
    var bladeClient = new BladeClient(canvas, _ip);
    bladeClient.listenTouch();
    app.append(canvas);

    var clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', () => {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, app.numericals.width, app.numericals.height);
    });
}

function prepareRecvLayer() {
    var layer = new Layer(app.numericals.width, app.numericals.height);
    /** @var {HTMLCanvasElement} canvas */
    var canvas = layer.getdom();
    var recvClient = new RecvClient(canvas, _ip);
    recvClient.listen();
    app.append(canvas);

    var clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', () => {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, app.numericals.width, app.numericals.height);
    });
}