(function(){
 	var _=function(obj){
 		if(this instanceof _){return obj;}
 		if(!(this instanceof _)){return new _(obj);}
 	}
		var root=this;
		root._=_;
	
		_.log=function(){
			console.log(123);
		}
		_.isFunction=function(obj){
			return typeof obj=='function';
		}
		_.function=function(obj){
			var names=[];
			var key;
			for(key in obj){
				if(_.isFunction(obj[key])){
					names.push(key);
				}
			}
			return names.sort();
		}
		_.each=function(obj,callback){
			var len,i=0;
			if (obj.__proto__.constructor==Array) {
				len=obj.length;
				for(;i<len;i++){
					callback.call(obj[i],obj[i]);
				}
			}
		}
		_.mixin=function(obj){
			_.each(_.function(obj),function(name){
				var func=obj[name];
				_.prototype[name]=function(){
					return func.apply(_);
				}
			});
		}
		_.mixin(_);
		console.log(_.function(_));

	
}.call(this))
_().log();//函数式调用

var _obj = new _();
_obj.log();//面向对象调用
