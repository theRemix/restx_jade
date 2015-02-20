(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
var Main = function(router) {
	(function(instance,router1) {
		var filters = new restx.core.ArgumentsFilter();
		var processor = new restx.core.ArgumentProcessor(filters,[]);
		var process = new routes.Index_root_RouteProcess({ },instance,processor);
		router1.registerMethod("/","get",process);
	})(new routes.Index(),router);
	(function(instance1,router2) {
		var filters1 = new restx.core.ArgumentsFilter();
		var processor1 = new restx.core.ArgumentProcessor(filters1,[]);
		var process1 = new routes.Blog_index_RouteProcess({ },instance1,processor1);
		router2.registerMethod("/blog/","get",process1);
		var filters2 = new restx.core.ArgumentsFilter();
		var processor2 = new restx.core.ArgumentProcessor(filters2,[{ name : "id", optional : false, type : "Int", sources : ["params"]}]);
		var process2 = new routes.Blog_show_RouteProcess({ id : null},instance1,processor2);
		router2.registerMethod("/blog/:id","get",process2);
	})(new routes.Blog(),router);
};
Main.__name__ = true;
Main.main = function() {
	var app = new restx.App(process.env.PORT || 8888);
	app.start(function() {
		new Main(app.router);
	});
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
var express = {};
express.Express = require("express");
var haxe = {};
haxe.StackItem = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.CallStack = function() { };
haxe.CallStack.__name__ = true;
haxe.CallStack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe.CallStack.exceptionStack = function() {
	return [];
};
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe.CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe.CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
};
haxe.IMap = function() { };
haxe.IMap.__name__ = true;
haxe.ds = {};
haxe.ds.Option = { __ename__ : true, __constructs__ : ["Some","None"] };
haxe.ds.Option.Some = function(v) { var $x = ["Some",0,v]; $x.__enum__ = haxe.ds.Option; return $x; };
haxe.ds.Option.None = ["None",1];
haxe.ds.Option.None.__enum__ = haxe.ds.Option;
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [haxe.IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js.Boot.__string_rec(o[i1],s); else str2 += js.Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var restx = {};
restx.App = function(port) {
	this.port = port;
	this.server = express.Express({ });
	this.router = new restx.Router(this.server);
};
restx.App.__name__ = true;
restx.App.prototype = {
	start: function(callback) {
		var _g = this;
		this.server.listen(this.port,function() {
			console.log("" + Std.string(_g.server.name) + " listening on " + _g.port);
			if(null != callback) callback();
		});
	}
};
restx.IRoute = function() { };
restx.IRoute.__name__ = true;
restx.RouteProcess = function(args,instance,argumentProcessor) {
	this.instance = instance;
	this.argumentProcessor = argumentProcessor;
	this.args = args;
};
restx.RouteProcess.__name__ = true;
restx.RouteProcess.prototype = {
	run: function(req,res,next) {
		var _g = this;
		this.argumentProcessor.processArguments(req,this.args).then(function(result) {
			switch(result[1]) {
			case 0:
				_g.instance.request = req;
				_g.instance.response = res;
				_g.instance.next = next;
				_g.execute();
				break;
			case 2:
				var param = result[2];
				next(new Error("Parameter \"" + param + "\" is required"));
				break;
			case 1:
				var err = result[2];
				next(err);
				break;
			}
		});
	}
	,execute: function() {
		throw "RouteProcess.execute() must be overwritten";
	}
};
restx.Router = function(server) {
	this.server = server;
};
restx.Router.__name__ = true;
restx.Router.prototype = {
	registerMethod: function(path,method,process) {
		if(null == method) method = "get";
		Reflect.callMethod(this.server,Reflect.field(this.server,method.toLowerCase()),[path,$bind(process,process.run)]);
	}
};
restx.core = {};
restx.core.ArgumentProcessing = { __ename__ : true, __constructs__ : ["Ok","InvalidFilter","Required"] };
restx.core.ArgumentProcessing.Ok = ["Ok",0];
restx.core.ArgumentProcessing.Ok.__enum__ = restx.core.ArgumentProcessing;
restx.core.ArgumentProcessing.InvalidFilter = function(err) { var $x = ["InvalidFilter",1,err]; $x.__enum__ = restx.core.ArgumentProcessing; return $x; };
restx.core.ArgumentProcessing.Required = function(parameter) { var $x = ["Required",2,parameter]; $x.__enum__ = restx.core.ArgumentProcessing; return $x; };
restx.core.ArgumentProcessor = function(filters,requirements) {
	if(null != filters) this.filters = filters; else this.filters = new restx.core.ArgumentsFilter();
	this.requirements = requirements;
	this.filters.checkRequirements(requirements);
};
restx.core.ArgumentProcessor.__name__ = true;
restx.core.ArgumentProcessor.getValue = function(name,source,sources) {
	var o;
	var value;
	var _g = 0;
	while(_g < sources.length) {
		var sourceName = sources[_g];
		++_g;
		o = Reflect.field(source,sourceName);
		if(null == o) continue;
		value = Reflect.field(o,name);
		if(null != value) return haxe.ds.Option.Some(value);
	}
	return haxe.ds.Option.None;
};
restx.core.ArgumentProcessor.prototype = {
	processArguments: function(source,results) {
		var promises = [];
		var _g = 0;
		var _g1 = this.requirements;
		while(_g < _g1.length) {
			var r = [_g1[_g]];
			++_g;
			{
				var _g2 = restx.core.ArgumentProcessor.getValue(r[0].name,source,r[0].sources);
				switch(_g2[1]) {
				case 0:
					var v = _g2[2];
					var future = this.filters.getFilterType(r[0].type).filter(v);
					promises.push(thx.promise._Promise.Promise_Impl_.success(future,(function(r) {
						return function(value) {
							results[r[0].name] = value;
						};
					})(r)));
					break;
				case 1:
					if(r[0].optional) results[r[0].name] = null; else return thx.promise.Future.value(restx.core.ArgumentProcessing.Required(r[0].name));
					break;
				}
			}
		}
		return thx.promise._Promise.Promise_Impl_.mapEither(thx.promise._Promise.Promise_Impl_.all(promises),function(_) {
			return restx.core.ArgumentProcessing.Ok;
		},function(err) {
			return restx.core.ArgumentProcessing.InvalidFilter(err);
		});
	}
};
restx.core.IFilterArgument = function() { };
restx.core.IFilterArgument.__name__ = true;
restx.core.filters = {};
restx.core.filters.DateFilter = function() {
	this.type = "Date";
};
restx.core.filters.DateFilter.__name__ = true;
restx.core.filters.DateFilter.__interfaces__ = [restx.core.IFilterArgument];
restx.core.filters.DateFilter.prototype = {
	filter: function(value) {
		if(restx.core.filters.DateFilter.TIME_PATTERN.match(value)) return thx.promise._Promise.Promise_Impl_.value((function($this) {
			var $r;
			var t = thx.core.Floats.parse(value);
			var d = new Date();
			d.setTime(t);
			$r = d;
			return $r;
		}(this)));
		try {
			return thx.promise._Promise.Promise_Impl_.value(HxOverrides.strDate(value));
		} catch( e ) {
			return thx.promise._Promise.Promise_Impl_.error(new thx.core.Error("\"" + value + "\" is not a Date value",null,{ fileName : "DateFilter.hx", lineNumber : 18, className : "restx.core.filters.DateFilter", methodName : "filter"}));
		}
	}
};
restx.core.filters.IntFilter = function() {
	this.type = "Int";
};
restx.core.filters.IntFilter.__name__ = true;
restx.core.filters.IntFilter.__interfaces__ = [restx.core.IFilterArgument];
restx.core.filters.IntFilter.prototype = {
	filter: function(value) {
		if(thx.core.Ints.canParse(value)) return thx.promise._Promise.Promise_Impl_.value(thx.core.Ints.parse(value)); else return thx.promise._Promise.Promise_Impl_.error(new thx.core.Error("\"" + value + "\" is not an Integer value",null,{ fileName : "IntFilter.hx", lineNumber : 15, className : "restx.core.filters.IntFilter", methodName : "filter"}));
	}
};
restx.core.filters.FloatFilter = function() {
	this.type = "Float";
};
restx.core.filters.FloatFilter.__name__ = true;
restx.core.filters.FloatFilter.__interfaces__ = [restx.core.IFilterArgument];
restx.core.filters.FloatFilter.prototype = {
	filter: function(value) {
		if(thx.core.Floats.canParse(value)) return thx.promise._Promise.Promise_Impl_.value(thx.core.Floats.parse(value)); else return thx.promise._Promise.Promise_Impl_.error(new thx.core.Error("\"" + value + "\" is not a Float value",null,{ fileName : "FloatFilter.hx", lineNumber : 15, className : "restx.core.filters.FloatFilter", methodName : "filter"}));
	}
};
restx.core.filters.BoolFilter = function() {
	this.type = "Bool";
};
restx.core.filters.BoolFilter.__name__ = true;
restx.core.filters.BoolFilter.__interfaces__ = [restx.core.IFilterArgument];
restx.core.filters.BoolFilter.prototype = {
	filter: function(value) {
		if(thx.core.Bools.canParse(value)) return thx.promise._Promise.Promise_Impl_.value(thx.core.Bools.parse(value)); else return thx.promise._Promise.Promise_Impl_.error(new thx.core.Error("\"" + value + "\" is not a Boolean value",null,{ fileName : "BoolFilter.hx", lineNumber : 15, className : "restx.core.filters.BoolFilter", methodName : "filter"}));
	}
};
restx.core.filters.StringFilter = function() {
	this.type = "String";
};
restx.core.filters.StringFilter.__name__ = true;
restx.core.filters.StringFilter.__interfaces__ = [restx.core.IFilterArgument];
restx.core.filters.StringFilter.prototype = {
	filter: function(value) {
		return thx.promise._Promise.Promise_Impl_.value(value);
	}
};
restx.core.ArgumentsFilter = function() {
	this.filters = new haxe.ds.StringMap();
	restx.core.ArgumentsFilter.globalFilters.map($bind(this,this.addFilter));
};
restx.core.ArgumentsFilter.__name__ = true;
restx.core.ArgumentsFilter.prototype = {
	addFilter: function(filter) {
		if(null == filter.type) throw "Invalid null parameter IFilterArgument.typeName";
		this.filters.set(filter.type,filter);
	}
	,canFilterType: function(type) {
		return this.filters.exists(type);
	}
	,getFilterType: function(type) {
		return this.filters.get(type);
	}
	,checkRequirements: function(requirements) {
		var _g = 0;
		while(_g < requirements.length) {
			var requirement = requirements[_g];
			++_g;
			if(!this.canFilterType(requirement.type)) throw "No filter is specified for type " + requirement.type;
		}
	}
};
var routes = {};
routes.Blog = function() {
};
routes.Blog.__name__ = true;
routes.Blog.__interfaces__ = [restx.IRoute];
routes.Blog.prototype = {
	index: function() {
		this.response.send("Blog");
	}
	,show: function(id) {
		this.response.send({ id : id});
	}
};
routes.Blog_index_RouteProcess = function(args,instance,argumentProcessor) {
	restx.RouteProcess.call(this,args,instance,argumentProcessor);
};
routes.Blog_index_RouteProcess.__name__ = true;
routes.Blog_index_RouteProcess.__super__ = restx.RouteProcess;
routes.Blog_index_RouteProcess.prototype = $extend(restx.RouteProcess.prototype,{
	execute: function() {
		this.instance.index();
	}
});
routes.Blog_show_RouteProcess = function(args,instance,argumentProcessor) {
	restx.RouteProcess.call(this,args,instance,argumentProcessor);
};
routes.Blog_show_RouteProcess.__name__ = true;
routes.Blog_show_RouteProcess.__super__ = restx.RouteProcess;
routes.Blog_show_RouteProcess.prototype = $extend(restx.RouteProcess.prototype,{
	execute: function() {
		this.instance.show(this.args.id);
	}
});
routes.Index = function() {
};
routes.Index.__name__ = true;
routes.Index.__interfaces__ = [restx.IRoute];
routes.Index.prototype = {
	root: function() {
		this.response.send("Root");
	}
};
routes.Index_root_RouteProcess = function(args,instance,argumentProcessor) {
	restx.RouteProcess.call(this,args,instance,argumentProcessor);
};
routes.Index_root_RouteProcess.__name__ = true;
routes.Index_root_RouteProcess.__super__ = restx.RouteProcess;
routes.Index_root_RouteProcess.prototype = $extend(restx.RouteProcess.prototype,{
	execute: function() {
		this.instance.root();
	}
});
var thx = {};
thx.core = {};
thx.core.Arrays = function() { };
thx.core.Arrays.__name__ = true;
thx.core.Arrays.mapi = function(array,callback) {
	var r = [];
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		r.push(callback(array[i],i));
	}
	return r;
};
thx.core.Bools = function() { };
thx.core.Bools.__name__ = true;
thx.core.Bools.canParse = function(v) {
	var _g = v.toLowerCase();
	switch(_g) {
	case "true":case "false":
		return true;
	default:
		return false;
	}
};
thx.core.Bools.parse = function(v) {
	var _g = v.toLowerCase();
	switch(_g) {
	case "true":
		return true;
	case "false":
		return false;
	default:
		return null;
	}
};
thx.core.Either = { __ename__ : true, __constructs__ : ["Left","Right"] };
thx.core.Either.Left = function(value) { var $x = ["Left",0,value]; $x.__enum__ = thx.core.Either; return $x; };
thx.core.Either.Right = function(value) { var $x = ["Right",1,value]; $x.__enum__ = thx.core.Either; return $x; };
thx.core.Error = function(message,stack,pos) {
	Error.call(this,message);
	this.message = message;
	if(null == stack) {
		try {
			stack = haxe.CallStack.exceptionStack();
		} catch( e ) {
			stack = [];
		}
		if(stack.length == 0) try {
			stack = haxe.CallStack.callStack();
		} catch( e1 ) {
			stack = [];
		}
	}
	this.stackItems = stack;
	this.pos = pos;
};
thx.core.Error.__name__ = true;
thx.core.Error.__super__ = Error;
thx.core.Error.prototype = $extend(Error.prototype,{
	toString: function() {
		return this.message + "\nfrom: " + this.pos.className + "." + this.pos.methodName + "() at " + this.pos.lineNumber + "\n\n" + haxe.CallStack.toString(this.stackItems);
	}
});
thx.core.Floats = function() { };
thx.core.Floats.__name__ = true;
thx.core.Floats.canParse = function(s) {
	return thx.core.Floats.pattern_parse.match(s);
};
thx.core.Floats.parse = function(s) {
	if(s.substring(0,1) == "+") s = s.substring(1);
	return parseFloat(s);
};
thx.core.Ints = function() { };
thx.core.Ints.__name__ = true;
thx.core.Ints.canParse = function(s) {
	return thx.core.Ints.pattern_parse.match(s);
};
thx.core.Ints.parse = function(s,base) {
	var v = parseInt(s,base);
	if(isNaN(v)) return null; else return v;
};
thx.promise = {};
thx.promise.Future = function() {
	this.handlers = [];
	this.state = haxe.ds.Option.None;
};
thx.promise.Future.__name__ = true;
thx.promise.Future.create = function(handler) {
	var future = new thx.promise.Future();
	handler($bind(future,future.setState));
	return future;
};
thx.promise.Future.value = function(v) {
	return thx.promise.Future.create(function(callback) {
		callback(v);
	});
};
thx.promise.Future.prototype = {
	map: function(handler) {
		var _g = this;
		return thx.promise.Future.create(function(callback) {
			_g.then(function(value) {
				callback(handler(value));
			});
		});
	}
	,then: function(handler) {
		this.handlers.push(handler);
		this.update();
		return this;
	}
	,setState: function(newstate) {
		{
			var _g = this.state;
			switch(_g[1]) {
			case 1:
				this.state = haxe.ds.Option.Some(newstate);
				break;
			case 0:
				var r = _g[2];
				throw new thx.core.Error("future was already \"" + Std.string(r) + "\", can't apply the new state \"" + Std.string(newstate) + "\"",null,{ fileName : "Future.hx", lineNumber : 85, className : "thx.promise.Future", methodName : "setState"});
				break;
			}
		}
		this.update();
		return this;
	}
	,update: function() {
		{
			var _g = this.state;
			switch(_g[1]) {
			case 1:
				break;
			case 0:
				var result = _g[2];
				var index = -1;
				while(++index < this.handlers.length) this.handlers[index](result);
				this.handlers = [];
				break;
			}
		}
	}
};
thx.promise._Promise = {};
thx.promise._Promise.Promise_Impl_ = {};
thx.promise._Promise.Promise_Impl_.__name__ = true;
thx.promise._Promise.Promise_Impl_.all = function(arr) {
	if(arr.length == 0) return thx.promise._Promise.Promise_Impl_.value([]);
	return thx.promise._Promise.Promise_Impl_.create(function(resolve,reject) {
		var results = [];
		var counter = 0;
		var hasError = false;
		thx.core.Arrays.mapi(arr,function(p,i) {
			thx.promise._Promise.Promise_Impl_.either(p,function(value) {
				if(hasError) return;
				results[i] = value;
				counter++;
				if(counter == arr.length) resolve(results);
			},function(err) {
				if(hasError) return;
				hasError = true;
				reject(err);
			});
		});
	});
};
thx.promise._Promise.Promise_Impl_.create = function(callback) {
	return thx.promise.Future.create(function(cb) {
		callback(function(value) {
			cb(thx.core.Either.Right(value));
		},function(error) {
			cb(thx.core.Either.Left(error));
		});
	});
};
thx.promise._Promise.Promise_Impl_.error = function(err) {
	return thx.promise._Promise.Promise_Impl_.create(function(_,reject) {
		reject(err);
	});
};
thx.promise._Promise.Promise_Impl_.value = function(v) {
	return thx.promise._Promise.Promise_Impl_.create(function(resolve,_) {
		resolve(v);
	});
};
thx.promise._Promise.Promise_Impl_.either = function(this1,success,failure) {
	this1.then(function(r) {
		switch(r[1]) {
		case 1:
			var value = r[2];
			success(value);
			break;
		case 0:
			var error = r[2];
			failure(error);
			break;
		}
	});
	return this1;
};
thx.promise._Promise.Promise_Impl_.mapEither = function(this1,success,failure) {
	return this1.map(function(result) {
		switch(result[1]) {
		case 1:
			var value = result[2];
			return success(value);
		case 0:
			var error = result[2];
			return failure(error);
		}
	});
};
thx.promise._Promise.Promise_Impl_.success = function(this1,success) {
	return thx.promise._Promise.Promise_Impl_.either(this1,success,function(_) {
	});
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
var __map_reserved = {}

      // Production steps of ECMA-262, Edition 5, 15.4.4.21
      // Reference: http://es5.github.io/#x15.4.4.21
      if (!Array.prototype.reduce) {
        Array.prototype.reduce = function(callback /*, initialValue*/) {
          'use strict';
          if (this == null) {
            throw new TypeError('Array.prototype.reduce called on null or undefined');
          }
          if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
          }
          var t = Object(this), len = t.length >>> 0, k = 0, value;
          if (arguments.length == 2) {
            value = arguments[1];
          } else {
            while (k < len && ! k in t) {
              k++;
            }
            if (k >= len) {
              throw new TypeError('Reduce of empty array with no initial value');
            }
            value = t[k++];
          }
          for (; k < len; k++) {
            if (k in t) {
              value = callback(value, t[k], k, t);
            }
          }
          return value;
        };
      }
    ;
restx.core.filters.DateFilter.TIME_PATTERN = new EReg("$\\d+^","");
restx.core.ArgumentsFilter.globalFilters = [new restx.core.filters.DateFilter(),new restx.core.filters.IntFilter(),new restx.core.filters.FloatFilter(),new restx.core.filters.BoolFilter(),new restx.core.filters.StringFilter()];
thx.core.Floats.pattern_parse = new EReg("^(\\+|-)?\\d+(\\.\\d+)?(e-?\\d+)?$","");
thx.core.Ints.pattern_parse = new EReg("^[+-]?(\\d+|0x[0-9A-F]+)$","i");
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
