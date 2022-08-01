'use strict'

const ipreception = require('../../../../../cartridges/app_custom_sumit/cartridge/scripts/hooks/ipreception');

var assert = require('chai'), assert;
var proxyquire = require( 'proxyquire').noPreserveCache();

describe('iPerception Hook', function () {
    var perceptionHook = proxyquire('../../../../../../Client/cartridges/app_custom_sumit/cartridge/scripts/hooks/ipreception',{
        'dw/template/ISML':
        {
            renderTemplate: function ()
            {
                return 'someISMLTemplate';
            }
        }
    });
    describe('afterfooter' ,function(){
        it('should call the afterfooter function',function(){
            var result = ipreception.afterfooter();
            assert.equal(result,'someISMLTemplate');
        });
    });
});