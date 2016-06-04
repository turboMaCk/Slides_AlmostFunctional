function success(value) {
    return { type: 'Just', value: value };
}
function fail(_) {
    return { type: 'Nothing' };
}
function withDefault(def, result) {
    return result.type == 'Just' ? result.value : def;
}
function randomFail(value) {
    return Math.random() > 0.5 ? success(value) : fail(value);
}
function fmap(fce, a) {
    switch (a.type) {
        case 'Nothing': return fail(fce(a.value));
        case 'Just': return success(fce(a.value));
    }
}
console.log(withDefault('fail', randomFail('success')));
console.log(withDefault(0, randomFail(1)));
console.log(fmap(function (str) {
    return parseInt(str) * 5;
}, randomFail('7 kittens')));
