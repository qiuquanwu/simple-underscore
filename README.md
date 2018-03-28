### 手写一个同时支持的函数式和面向对象两种用法underscore.js的实现

```
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

```
### 如何新增方法,比如新增一个sayHello的方法
> #### 在自定义方法开始和自定义方法结束之间插入以下代码
```
    _.sayHello=function(){
        console.log('Hello');
    }
```
然后可以通过以下代码调用
```
_().sayHello();//函数式调用

var obj = new _();
obj.sayHello();//面向对象调用
```
