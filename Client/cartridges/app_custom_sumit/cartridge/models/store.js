'use strict';

//Define a variable named base that equals module.superModule

var base = module.superModule;


function store(storeObject) {
    //use base.call to assign the standard values to the object
    //then set the email attribute to the store email
    base.call(this, storeObject);
    this.email = storeObject.email;

}

store.prototype = Object.create(base.prototype);

module.exports = store;
