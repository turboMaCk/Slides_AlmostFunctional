function constructor(data) {
    var copy = Object.create(data);
    var edited = false;
    function _set(val) {
        copy.attr = val;
        edited = true;
    }
    return {
        get: function () {
            return copy.attr;
        },
        set: function (val) {
            _set(val);
        },
        isEdited: function () {
            return edited;
        }
    };
}
function decorate(instance) {
    var decorated = Object.create(instance);
    decorated.active = false;
    decorated.sayNicely = function () {
        var cond = decorated.isEdited() ? '' : ' not';
        return "My value is " + decorated.get() + " and I'm" + cond + " edited";
    };
    return decorated;
}
var data = { attr: 'initial' };
var instance = constructor(data);
var instance2 = constructor(data);
var decorated = decorate(instance);
console.log('intial instance value:', instance.get(), instance.isEdited());
// => intial instance value: initial false
console.log('state of decorated:', decorated.sayNicely(), '| props', decorated.active, decorated.get());
// => state of decorated: My value is initial and I'm not edited | props false inital
instance.set('custom');
console.log('after set:', instance.get(), instance.isEdited());
// => after set: custom true
console.log('data not modified:', data);
// => data not modified: { attr: 'initial' }
console.log('state of decorated:', decorated.sayNicely(), '| props:', decorated.active, decorated.get());
// => state of decorated: My value is custom and I'm edited | props false custom
decorated.set('brand new!');
decorated.active = true;
console.log('after set on decorated:', instance.get(), instance.isEdited());
// => after set on decorated: brand new! true
console.log('data not modified:', data);
// => data not modified: { attr: 'initial' }
console.log('state of decorated:', decorated.sayNicely(), '| props:', decorated.active, decorated.get());
// => state of decorated: My value is brand new! and I'm edited | props true brand new!
console.log('instance 2 untouched:', instance2.get());
// => instance 2 untouched: initial
