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

        var locals = {
            target: '',
            results: false,
            numberStr: ''
        };

        if (query.hasOwnProperty('numbers') && query.hasOwnProperty('target')) {
            locals.numberStr = query.numbers;
            numbers = locals.numberStr.split('\r\n').map(function(a){
                return parseInt(a, 10);
            });
            locals.target = parseInt(query.target, 10);
            locals.results = subset_sum(numbers, locals.target);
        }

        response.end(output(locals));
    });

};

http.createServer(combinate).listen(17532);

var subset_sum_recursive = function(numbers, target, partial) {
    var sum = partial.reduce(function(a, b){
        return a + b;
    }, 0);

    if (sum === target) {
        return [partial];
    }

    if (sum > target) {
        return false;
    }

    var num_length = numbers.length;
    var successes = [];

    for (var i = 0; i < num_length; i++) {
        var n = numbers[i];
        var new_partial = partial.slice(0);
        new_partial.push(n);
        
        var remaining = numbers.slice(i+1);

        var result = subset_sum_recursive(remaining, target, new_partial);
        
        
        if (result !== false && result.length !== 0) {
            result_len = result.length;

            for (var ii = 0; ii < result_len; ii++) {
                successes.push(result[ii]);
            }
        }
    }

    if (successes.length === 0) {
        return false;
    }

    return successes;
};

/* Thanks to msalvadores http://stackoverflow.com/users/418267/msalvadores */
var subset_sum = function(numbers, target) {
    return subset_sum_recursive(numbers, target, []) || [];
};