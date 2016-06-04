function Maybe(value) {
    return {
        map: function (fce) {
            var val = this.getValue();
            switch (val.type) {
                case 'Nothing': return Maybe(null);
                case 'Just': return Maybe(fce(val.value));
            }
        },
        getValue: function () {
            if (value === undefined || value === null) {
                return {
                    type: 'Nothing'
                };
            }
            return {
                type: 'Just',
                value: value
            };
        },
        getOrElse: function (el) {
            var val = this.getValue();
            switch (val.type) {
                case 'Nothing': return el;
                case 'Just': return val.value;
            }
        }
    };
}
var result = Maybe(5)
    .map(function (a) { return a + 2; })
    .map(function (a) { return a * 2; })
    .getValue();
console.log(result);
// (f . g)(x) == f(g(x))
// compose(f, g)(x)
function compose(f, g) {
    return function (x) { return f(g(x)); };
}
var result2 = Maybe(5).map(compose(function (a) { return a + 3; }, function (a) { return a / 2; })).getValue();
console.log(result2);
console.log(Maybe(undefined).getOrElse('have no value'));
