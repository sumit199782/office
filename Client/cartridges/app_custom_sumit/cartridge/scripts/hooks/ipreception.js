'use strict';
var ISML = require('dw/template/ISML');

function afterfooter()
{
    return ISML.renderTemplate('components/ipreception');
}

module.exports = {

    afterfooter : afterfooter
};