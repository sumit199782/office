(function () {
    var tilesRendered = [];
    var render = function () {
        var tiles = document.querySelectorAll('[data-pwr-itemid]');
        var prStruct = [];
        var tile;
        var i;
        var pageIdValue;
        var uniqueId;
        var reviewObj;

        var mergeObjects = function mergeObjects() {
            var resObj = {};
            var j;
            var obj;
            var keys;

            for (var x = 0; x < arguments.length; x += 1) {
                obj = arguments[x];
                keys = Object.keys(obj);

                for (j = 0; j < keys.length; j += 1) {
                    resObj[keys[j]] = obj[keys[j]];
                }
            }
            return resObj;
        };

        for (i = 0; i < tiles.length; i++) {
            tile = tiles[i];
            if (tilesRendered.indexOf(tile) !== -1) {
                continue; // eslint-disable-line
            }
            pageIdValue = tile.attributes['data-pwr-itemid'].value;
            uniqueId = 'category-snippet-'.concat(Math.random().toString(36).substr(2, 16));
            tile.attributes.id.value = uniqueId;

            if (tile.attributes['data-pwr-itemid'] && tile.attributes['data-pwr-itemid'].value) {
                reviewObj = mergeObjects({}, window.POWER_REVIEWS_CONFIG, {
                    page_id: pageIdValue,
                    components: {
                        CategorySnippet: uniqueId
                    }
                });
                if (tile.className.indexOf('pwr-pdp') !== -1) {
                    reviewObj.components = {
                        ReviewSnippet: uniqueId
                    };
                }
                prStruct.push(reviewObj);
            }
            tilesRendered.push(tile);
        }

        /* global POWERREVIEWS */
        // POWERREVIEWS.display.render(prStruct);
        setTimeout(() => {
            POWERREVIEWS.display.render(prStruct);
           }, 500);
    };
    render();
    var debounce = function (func, wait) {
        var timeout;
        return function () {
            var context = this;
            var args = arguments;
            var later = function () {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    window.PWR_RENDER = debounce(render, 50);
}());

