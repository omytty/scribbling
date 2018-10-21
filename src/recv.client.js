(function(window, document) {
    "use strict"

    /**
     * Blade effect
     * @param {HTMLCanvasElement} canvas 
     */
    function recvClient(canvas, ip) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.lineWidth = 4;
        this.ws = app.getSocket();
        this.ip = ip;
        this.state = {
            asyncPosition: {},
            lastPosition: {},
            x: 0,
            y: 0
        };

        this.handleMessage = this.handleMessage.bind(this);
    }

    recvClient.prototype.listen = function() {
        this.ws.addEventListener('message', this.handleMessage);
    };

    recvClient.prototype.handleMessage = function(event) {
        var points = JSON.parse(event.data);
        var x = points.x * app.numericals.width;
        var y = points.y * app.numericals.height;
        var ip = points.ip;

        if (ip == this.ip) {
            return false;
        }

        if (points.x < 0) {
            delete this.state.lastPosition[ip];
            return true;
        }

        this.state.asyncPosition[ip] = {
            x: x, y: y
        };
        this.render();
    }

    recvClient.prototype.render = function() {
        for (var ip in this.state.asyncPosition) {
            var posistion = this.state.asyncPosition[ip];
            if (!this.state.lastPosition[ip]) {
                this.drawLine(posistion.x, posistion.y, posistion.x, posistion.y);
            } else {
                var lastPosition = this.state.lastPosition[ip];
                this.drawLine(lastPosition.x, lastPosition.y, posistion.x, posistion.y);
            }
            this.state.lastPosition[ip] = posistion;
        }
    };

    recvClient.prototype.drawLine = function(lx, ly, x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(lx, ly);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.closePath();
    };

    window.RecvClient = recvClient;
})(window, window.document);
