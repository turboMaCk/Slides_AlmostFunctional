interface Data {
    attr : string;
}

interface Interface {
    set(value : string) : void;
    get() : string;
    isEdited() : boolean;
}

function constructor(data : Data) : Interface {
    const copy : Data = Object.create(data)
    let edited : boolean = false;

    function _set(val : string) : void {
        copy.attr = val;
        edited = true;
    }

    return {
        get() : string {
            return copy.attr;
        },
        set(val : string) : void {
            _set(val);
        },
        isEdited() : boolean {
            return edited;
        }
    }
}

interface Decorated extends Interface {
    sayNicely() : string;
    active : boolean;
}

function decorate(instance : Interface) : Decorated {
    const decorated = Object.create(instance);

    decorated.active = false;
    decorated.sayNicely = function() : string {
        const cond : string = decorated.isEdited() ? '' : ' not';
        return `My value is ${decorated.get()} and I'm${cond} edited`;
    }

    return decorated;
}

const data : Data = { attr: 'initial' }

const instance : Interface = constructor(data);
const instance2 : Interface = constructor(data);
const decorated : Decorated = decorate(instance);

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
