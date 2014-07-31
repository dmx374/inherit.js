inherit.js : a lightning fast inheritance model
===============================================

The following implementation provides a lightning fast model for creating large objects with hundreds of properties. Take a look at `inherit.js` to see the magic.


### Inheritance Test

```javascript

var m = new Shape("chimere");
var n = new Square("foobar");

console.log(m.id); // "chimere"
console.log(m.style.left); // 0
console.log(m.cache.left); // undefined
m.style.left = 50;
console.log(m.style.left); // 50
console.log(m.cache.left); // 50
m.style.name = "toto"; // setName(toto)
console.log(m.style.name); // toto

console.log("-----");

console.log(n.id); // foobar
console.log(n.style.left); // 0
console.log(n.style.top); // 0
n.style.left = 80;
console.log(n.style.left); // 80
console.log(m.style.left); // 50

m.style.name = "titi"; // setName(titi)
console.log(n.style.name); // should be ""

```

### Performance Test

**The following demonstrates the small time taken for 500 000 instanciations.**

```javascript

var z = [],
    t = +new Date();


for (var i=0; i<500000; i++){
    z[i] = new Shape();
}

console.log((+new Date())-t, "ms");

```