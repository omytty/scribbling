(function(window, document) {
    "use strict"

    /**
     * Create a canvas layer.
     * 
     * @param {string} width canvas width
     * @param {string} height canvas height
     * @property {HTMLCanvasElement} canvas
     */
    function layer(width, height) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.style.position = 'fixed';
        canvas.style.top = 0;
        canvas.style.left = 0;
        this.canvas = canvas;
    }

    layer.prototype.getdom = function() {
        return this.canvas;
    };

    layer.prototype.terminate = function() {
        this.canvas.remove();
    };

    window.Layer = layer;

})(window, window.document);
