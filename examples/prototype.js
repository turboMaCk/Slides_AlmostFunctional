function meta(object) {
    object.__proto__.hi = () => {
        console.log('hi');
    };
}

const object = {
    property: 'value',
    setProperty(value) {
        this.property = value;
    }
};

const child = Object.create(object);

child.setProperty('new');

console.log(child.property, object.property); // logs 'new' 'value'

meta(child);
child.hi(); // logs 'hi'
