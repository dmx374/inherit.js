var Shape = function(id){
	this.id = id;
	this.cache = {};

	this.style = new PropertyContainer(this);
};

Shape.prototype = {
	__onPropertyChange__ : function(property, value){
		switch (property) {
			case "name" : 
				this.setName(value);
				break;
		};
	},

	setName : function(name){
		console.log("setName("+name+")");
		this.staticname = name;
	}
};

/* Square inherits from Shape */

var Square = inherits(Shape, {
	__constructor__ : function(){
		console.log("construction of Square");
	},

	method1 : function(x){

	},

	method2 : function(z){

	}
});




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


var z = [],
	t = +new Date();


for (var i=0; i<500000; i++){
	z[i] = new Shape();
}

console.log((+new Date())-t, "ms");


