interface Maybe<T> {
    type : string;
    value? : T;
}

function success<T>(value : T) : Maybe<T> {
    return { type: 'Just', value: value };
}

function fail<T>(_ : T) : Maybe<T> {
    return { type: 'Nothing' }
}

function withDefault<T>(def : T, result : Maybe<T>) {
    return result.type == 'Just' ? result.value : def;
}

function randomFail<T>(value: T) : Maybe<T> {
    return Math.random() > 0.5 ? success(value) : fail(value);
}

function fmap<A,B>(fce, a : Maybe<A>) : Maybe<B> {
    switch (a.type) {
        case 'Nothing' : return fail(fce(a.value));
        case 'Just' : return success(fce(a.value));
    }
}

console.log( withDefault('fail', randomFail('success')) );
console.log( withDefault(0, randomFail(1)) );
console.log( fmap(function(str) {
    return parseInt(str) * 5;
}, randomFail('7 kittens')) );
