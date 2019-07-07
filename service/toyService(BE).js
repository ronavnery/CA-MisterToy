// Core Modules:
const fs = require('fs')

module.exports = {
    query,
    getToyById,
    // update,
    // remove,
    // add
}


var toys = _createToys()

function query() {
    return Promise.resolve(toys)
}


function getToyById(id) {
    let toy = toys.find(toy => toy._id === id)
    if (toy) return Promise.resolve(toy)
    return Promise.reject('Unknown toy')
}


// Private

function _createToys() {
    toys = require('../data/toyDB.json')
    if (toys && toys.length) return toys;
    return [_createToy('Popopopo Ja', 39, 'Funny'),
    _createToy('KuKu Gambo', 92, 'Educational')]
}

function _createToy(name, price, type) {
    return {
        "_id": _makeId(),
        "name": name,
        "price": price,
        "type": type,
        "createdAt": Date.now(),
        "inStock": true
    }
}



// Utils

function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}