var lookup = require('binlookup')();
var AsyncCache = require('async-cache');
 
var cache = new AsyncCache({
    load: lookup,
});
 
cache.get(bin, function( err, data ){
    console.log(data);
});