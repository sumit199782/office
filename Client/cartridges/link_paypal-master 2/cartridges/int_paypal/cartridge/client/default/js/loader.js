/* eslint-disable require-jsdoc */
module.exports = function (containerElement) {
    function Constructor() {
        this.containerEl = containerElement;
    }
    Constructor.prototype.show = function () {
        this.containerEl.style.display = 'block';
    };
    Constructor.prototype.hide = function () {
        this.containerEl.style.display = 'none';
    };
    return new Constructor();
};
