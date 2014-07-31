/* -------------------------------------------------------------------------- */
/* InheritJS: a lightning fast inheritance model for large objects            */
/* -------------------------------------------------------------------------- */
/* The following implementation provides a lightning fast model for creating  */
/* large objects with hundreds of properties.                                 */
/* -------------------------------------------------------------------------- */
/* Author : Vincent Fontaine                                                  */
/* -------------------------------------------------------------------------- */

var inherits = function(__super__, p){
	var c = p && p.__constructor__ ? p.__constructor__ : function(){};

	var m = function(id){
		__super__.call(this, id);
		c.apply(this, arguments);
	};

	m.prototype = Object.create(Shape.prototype);
	m.prototype.constructor = Object.create(m.prototype);

	for (var i in p) {
		if (p.hasOwnProperty(i) && i != "__constructor__") {
			m.prototype[i] = p[i];
		}
	}

	return m;
};

var PropertyContainer = function(element){
	this.__proxy__ = element;
};

PropertyContainer.prototype = {
	__setProperty__ : function(property, value){
		var element = this.__proxy__;
		element.cache[property] = value;
		element.__onPropertyChange__.call(element, property, value);
	},

	__getProperty__ : function(property, defaultValue){
		return	this.__proxy__.cache[property] != undefined ? 
				this.__proxy__.cache[property] : defaultValue;
	}
};

Object.defineDynamicProperties = function(element, properties, handler){
	var descriptor = {},
		keys = Object.keys(properties);

	for (var i in keys) {
		var property = keys[i],
			defaultValue = properties[property];

		descriptor[property] = handler.call(element, property, defaultValue);
	}

	Object.defineProperties(element, descriptor);
};


Object.defineDynamicProperties(PropertyContainer.prototype, 
	{
		top : 0,
		left : 0,

		// ... 
		// 200+ other properties */
		// ... 
		
		width : 0,
		height : 0,
		name : ""
	},

	function handler(property, defaultValue){
		var proto = this;

		return {
			enumerable : true,
			configurable : false,

			get : function(){
				return this.__getProperty__(property, defaultValue);
			},

			set : function(value) {
				this.__setProperty__(property, value);
			}
		};
	}

);