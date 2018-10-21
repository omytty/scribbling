(function(window, document) {
    "use strict"

    function imageLoader(files) {
        this.files = files;
        this.promises = [];
        this.eachLoadHandle = null;
        this.data = {};
        for (var key in this.files) {
            var fileName = this.files[key];
            this.attach(key, fileName);
        }
    }

    imageLoader.prototype.loadByFileName = function(key, fileName) {
        return new Promise((resolve, reject) => {
            var image = new Image();
            image.setAttribute('src', fileName);
            image.onload = () => resolve(this.onImageLoad(event, key));
            image.onabort = (event) => reject(event);
        });
    };

    imageLoader.prototype.onImageLoad = function(event, key) {
        var image = event.target;
        if (typeof(this.eachLoadHandle) === 'function') {
            this.eachLoadHandle(image, key);
        }
        this.data[key] = image;
        return image;
    };

    imageLoader.prototype.attach = function(key, fileName) {
        this.promises.push(this.loadByFileName(key, fileName));
    };

    imageLoader.prototype.onEachLoaded = function(callback) {
        this.eachLoadHandle = callback;
    };

    imageLoader.prototype.load = function() {
        return Promise.all(this.promises).then((images) => this.data);
    };

    window.ImageLoader = imageLoader;
})(window, window.document);
