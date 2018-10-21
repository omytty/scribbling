(function(window, document) {
    "use strict"

    /**
     * Blade effect
     * @param {HTMLCanvasElement} canvas 
     */
    function bladeClient(canvas, ip) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.lineWidth = 4;
        this.ws = app.getSocket();
        this.state = {
            isTouching: false,
            lastPosition: {},
            x: 0,
            y: 0
        };

        this.randomPixelPoint = this.randomPixelPoint.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.ip = ip;
    }

    bladeClient.prototype.listenTouch = function() {
        this.canvas.ontouchstart = (touchEvent) => {
            var touch = touchEvent.changedTouches.item(0);
            this.state.isTouching = true;
            this.state.lastPosition = {
                x: touch.pageX,
                y: touch.pageY
            }
            this.randomPixelPoint(touchEvent);
        };
        this.canvas.ontouchmove = this.randomPixelPoint;
        this.canvas.ontouchend = this.touchEnd;
        this.canvas.ontouchcancel = this.touchEnd;
    };

    /**
     * @param {TouchEvent} touchEvent
     */
    bladeClient.prototype.randomPixelPoint = function(touchEvent) {
        var touch = touchEvent.changedTouches.item(0);
        var lastPosition = this.state.lastPosition;
        this.state.x = touch.pageX;
        this.state.y = touch.pageY;
        this.drawLine(lastPosition.x, lastPosition.y, touch.pageX, touch.pageY);
        this.state.lastPosition = {
            x: touch.pageX,
            y: touch.pageY
        }
        this.serverSent(this.state.x, this.state.y);
    };

    bladeClient.prototype.serverSent = function(x, y) {
        this.ws.send(JSON.stringify({
            x: x / app.numericals.width,
            y: y / app.numericals.height,
            ip: this.ip
        }));
    };

    bladeClient.prototype.drawLine = function(lx, ly, x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(lx, ly);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    bladeClient.prototype.touchEnd = function(touchEvent) {
        this.state.isTouching = false;
        this.serverSent(-1, -1);
    };

    window.BladeClient = bladeClient;
})(window, window.document);
