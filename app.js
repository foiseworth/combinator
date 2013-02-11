var sys = require('sys'),
    http = require('http'),
    url = require('url'),
    jade = require('jade'),
    fs = require('fs');

var combinate = function(request, response){
    var query = url.parse(request.url, true).query;

    response.setHeader("Content-Type", "text/html");

    fs.readFile('./index.html', function(err, data){
        var output = jade.compile(data);

        if (query.hasOwnProperty('numbers') && query.hasOwnProperty('target')) {
            numbers = query.numbers.split('\r\n');
            target = parseInt(query.target, 10);
            console.log(subset_sum(numbers, target));
        }

        response.end(output());
    });

};

http.createServer(combinate).listen(8080);

var subset_sum_recursive = function(numbers, target, partial) {
    var s = 0;

    partial_length = partial.length;

    for (var i = 0; i < partial_length; i++) {
        s = s + parseInt(partial[i], 10);
    }

    if (s === target) {
        return partial;
    }

    if (s > target) {
        return false;
    }

    num_length = numbers.length;
    var successes = [];

    for (var i = 0; i < num_length; i++) {
        var remaining = numbers.slice(i+1);
        var n = numbers[i];
        new_partial = partial.slice(0);
        new_partial.push(n);
        var result = subset_sum_recursive(remaining, target, new_partial);
        
        if (result !== false && result.length !== 0) {
            successes = successes.concat([result]);
        }
    }

    return successes;
};


var subset_sum = function(numbers, target) {
    return subset_sum_recursive(numbers, target, []);
};