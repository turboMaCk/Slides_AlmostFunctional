interface Functor<T> {
    map(fce : (T) => any);
}

interface Nothing {
    type : string;
}

interface Just<T> {
    type : string;
    value : T;
}

interface Maybe<T> extends Functor<T> {
    getValue() : Nothing|Just<T>;
    getOrElse(T) : T;
}

function Maybe<T>(value : T) : Maybe<T> {
    return {
        map(fce: (T) => any) : Maybe<any> {
            const val = this.getValue()
            switch (val.type) {
                case 'Nothing': return Maybe(null);
                case 'Just': return Maybe(fce(val.value));
            }
        },
        getValue() : Nothing|Just<T> {
            if (value === undefined || value === null) {
                return {
                    type: 'Nothing'
                }
            }
            return {
                type: 'Just',
                value: value
            }
        },
        getOrElse(el: T) : T {
            const val = this.getValue()
            switch (val.type) {
                case 'Nothing': return el;
                case 'Just': return val.value;
            }
        }
    }
}

const result = Maybe(5)
    .map(a => a + 2)
    .map(a => a * 2)
    .getValue();

console.log(result);

// (f . g)(x) == f(g(x))
// compose(f, g)(x)
function compose(f,g) {
    return x => f(g(x));
}

const result2 = Maybe(5).map(compose(a => a + 3, a => a / 2)).getValue();

console.log(result2);

console.log(Maybe(undefined).getOrElse('have no value'));
