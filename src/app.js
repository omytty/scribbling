(function(window, document) {
    "use strict"

    function getNumericalValue() {
        var numericalValue = new Object();
        numericalValue.width = document.body.clientWidth;
        numericalValue.height = document.body.clientHeight;

        return numericalValue;
    }

    /**
     * Enture of the game
     * 
     * @param {HTMLElement} element 
     * 
     * @property {HTMLElement} element 
     * @property {Object} numericals
     * @property {Array} clients
     * @property {Object} data
     * @property {Object} state
     */
    function app(element) {
        this.element = element;
        this.data = new Object();
        this.clients = [];
        this.numericals = getNumericalValue();
        this.socket = new WebSocket('ws://localhost:8765');
        this.state = {
            on: false
        };
    }

    app.prototype.set = function(key, value) {
        this.data[key] = value;
    };

    app.prototype.get = function(key) {
        return this.data[key];
    };

    app.prototype.getSocket = function() {
        return this.socket;
    };

    app.prototype.append = function(dom) {
        this.element.appendChild(dom);
    };

    app.prototype.listen = function(client) {
        this.clients.push(client);
    };

    app.prototype.step = function() {
        var step = (timestamp) => {
            if (this.state.on === true) {
                this.clients.forEach(client => {
                    client.update(timestamp);
                });
                window.requestAnimationFrame(step);
            }
        };
        return step;
    };

    app.prototype.start = function() {
        this.state.on = true;
        window.requestAnimationFrame(this.step());
    };

    app.prototype.stop = function() {
        this.state.on = false;
    };

    window.App = app;
})(window, window.document);
