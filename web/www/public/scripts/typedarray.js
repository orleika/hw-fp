// https://wzrd.in/standalone/typedarray@latest
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.typedarray=t()}}(function(){return function t(e,r,n){function o(i,s){if(!r[i]){if(!e[i]){var h="function"==typeof require&&require;if(!s&&h)return h(i,!0);if(f)return f(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var a=r[i]={exports:{}};e[i][0].call(a.exports,function(t){var r=e[i][1][t];return o(r?r:t)},a,a.exports,t,e,r,n)}return r[i].exports}for(var f="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({1:[function(t,e,r){function n(t){if(x&&v){var e,r=x(t);for(e=0;e<r.length;e+=1)v(t,r[e],{value:t[r[e]],writable:!1,enumerable:!1,configurable:!1})}}function o(t){function e(e){v(t,e,{get:function(){return t._getter(e)},set:function(r){t._setter(e,r)},enumerable:!0,configurable:!1})}if(v){if(t.length>N)throw new RangeError("Array too large for polyfill");var r;for(r=0;r<t.length;r+=1)e(r)}}function f(t,e){var r=32-e;return t<<r>>r}function i(t,e){var r=32-e;return t<<r>>>r}function s(t){return[255&t]}function h(t){return f(t[0],8)}function u(t){return[255&t]}function a(t){return i(t[0],8)}function y(t){return t=Y(Number(t)),[t<0?0:t>255?255:255&t]}function p(t){return[t>>8&255,255&t]}function g(t){return f(t[0]<<8|t[1],16)}function l(t){return[t>>8&255,255&t]}function E(t){return i(t[0]<<8|t[1],16)}function b(t){return[t>>24&255,t>>16&255,t>>8&255,255&t]}function c(t){return f(t[0]<<24|t[1]<<16|t[2]<<8|t[3],32)}function _(t){return[t>>24&255,t>>16&255,t>>8&255,255&t]}function w(t){return i(t[0]<<24|t[1]<<16|t[2]<<8|t[3],32)}function T(t,e,r){function n(t){var e=I(t),r=t-e;return r<.5?e:r>.5?e+1:e%2?e+1:e}var o,f,i,s,h,u,a,y=(1<<e-1)-1;for(t!==t?(f=(1<<e)-1,i=j(2,r-1),o=0):t===1/0||t===-(1/0)?(f=(1<<e)-1,i=0,o=t<0?1:0):0===t?(f=0,i=0,o=1/t===-(1/0)?1:0):(o=t<0,t=M(t),t>=j(2,1-y)?(f=S(I(m(t)/R),1023),i=n(t/j(2,f)*j(2,r)),i/j(2,r)>=2&&(f+=1,i=1),f>y?(f=(1<<e)-1,i=0):(f+=y,i-=j(2,r))):(f=0,i=n(t/j(2,1-y-r)))),h=[],s=r;s;s-=1)h.push(i%2?1:0),i=I(i/2);for(s=e;s;s-=1)h.push(f%2?1:0),f=I(f/2);for(h.push(o?1:0),h.reverse(),u=h.join(""),a=[];u.length;)a.push(parseInt(u.substring(0,8),2)),u=u.substring(8);return a}function A(t,e,r){var n,o,f,i,s,h,u,a,y=[];for(n=t.length;n;n-=1)for(f=t[n-1],o=8;o;o-=1)y.push(f%2?1:0),f>>=1;return y.reverse(),i=y.join(""),s=(1<<e-1)-1,h=parseInt(i.substring(0,1),2)?-1:1,u=parseInt(i.substring(1,1+e),2),a=parseInt(i.substring(1+e),2),u===(1<<e)-1?0!==a?NaN:h*(1/0):u>0?h*j(2,u-s)*(1+a/j(2,r)):0!==a?h*j(2,-(s-1))*(a/j(2,r)):h<0?-0:0}function O(t){return A(t,11,52)}function L(t){return T(t,11,52)}function d(t){return A(t,8,23)}function U(t){return T(t,8,23)}var v,B=void 0,N=1e5,P=function(){var t=Object.prototype.toString,e=Object.prototype.hasOwnProperty;return{Class:function(e){return t.call(e).replace(/^\[object *|\]$/g,"")},HasProperty:function(t,e){return e in t},HasOwnProperty:function(t,r){return e.call(t,r)},IsCallable:function(t){return"function"==typeof t},ToInt32:function(t){return t>>0},ToUint32:function(t){return t>>>0}}}(),R=Math.LN2,M=Math.abs,I=Math.floor,m=Math.log,S=Math.min,j=Math.pow,Y=Math.round;v=Object.defineProperty&&function(){try{return Object.defineProperty({},"x",{}),!0}catch(t){return!1}}()?Object.defineProperty:function(t,e,r){if(!t===Object(t))throw new TypeError("Object.defineProperty called on non-object");return P.HasProperty(r,"get")&&Object.prototype.__defineGetter__&&Object.prototype.__defineGetter__.call(t,e,r.get),P.HasProperty(r,"set")&&Object.prototype.__defineSetter__&&Object.prototype.__defineSetter__.call(t,e,r.set),P.HasProperty(r,"value")&&(t[e]=r.value),t};var x=Object.getOwnPropertyNames||function(t){if(t!==Object(t))throw new TypeError("Object.getOwnPropertyNames called on non-object");var e,r=[];for(e in t)P.HasOwnProperty(t,e)&&r.push(e);return r};!function(){function t(t,r,i){var s;return s=function(t,r,f){var i,h,u,a;if(arguments.length&&"number"!=typeof arguments[0])if("object"==typeof arguments[0]&&arguments[0].constructor===s)for(i=arguments[0],this.length=i.length,this.byteLength=this.length*this.BYTES_PER_ELEMENT,this.buffer=new e(this.byteLength),this.byteOffset=0,u=0;u<this.length;u+=1)this._setter(u,i._getter(u));else if("object"!=typeof arguments[0]||(arguments[0]instanceof e||"ArrayBuffer"===P.Class(arguments[0]))){if("object"!=typeof arguments[0]||!(arguments[0]instanceof e||"ArrayBuffer"===P.Class(arguments[0])))throw new TypeError("Unexpected argument type(s)");if(this.buffer=t,this.byteOffset=P.ToUint32(r),this.byteOffset>this.buffer.byteLength)throw new RangeError("byteOffset out of range");if(this.byteOffset%this.BYTES_PER_ELEMENT)throw new RangeError("ArrayBuffer length minus the byteOffset is not a multiple of the element size.");if(arguments.length<3){if(this.byteLength=this.buffer.byteLength-this.byteOffset,this.byteLength%this.BYTES_PER_ELEMENT)throw new RangeError("length of buffer minus byteOffset not a multiple of the element size");this.length=this.byteLength/this.BYTES_PER_ELEMENT}else this.length=P.ToUint32(f),this.byteLength=this.length*this.BYTES_PER_ELEMENT;if(this.byteOffset+this.byteLength>this.buffer.byteLength)throw new RangeError("byteOffset and length reference an area beyond the end of the buffer")}else for(h=arguments[0],this.length=P.ToUint32(h.length),this.byteLength=this.length*this.BYTES_PER_ELEMENT,this.buffer=new e(this.byteLength),this.byteOffset=0,u=0;u<this.length;u+=1)a=h[u],this._setter(u,Number(a));else{if(this.length=P.ToInt32(arguments[0]),f<0)throw new RangeError("ArrayBufferView size is not a small enough positive integer");this.byteLength=this.length*this.BYTES_PER_ELEMENT,this.buffer=new e(this.byteLength),this.byteOffset=0}this.constructor=s,n(this),o(this)},s.prototype=new f,s.prototype.BYTES_PER_ELEMENT=t,s.prototype._pack=r,s.prototype._unpack=i,s.BYTES_PER_ELEMENT=t,s.prototype._getter=function(t){if(arguments.length<1)throw new SyntaxError("Not enough arguments");if(t=P.ToUint32(t),t>=this.length)return B;var e,r,n=[];for(e=0,r=this.byteOffset+t*this.BYTES_PER_ELEMENT;e<this.BYTES_PER_ELEMENT;e+=1,r+=1)n.push(this.buffer._bytes[r]);return this._unpack(n)},s.prototype.get=s.prototype._getter,s.prototype._setter=function(t,e){if(arguments.length<2)throw new SyntaxError("Not enough arguments");if(t=P.ToUint32(t),t>=this.length)return B;var r,n,o=this._pack(e);for(r=0,n=this.byteOffset+t*this.BYTES_PER_ELEMENT;r<this.BYTES_PER_ELEMENT;r+=1,n+=1)this.buffer._bytes[n]=o[r]},s.prototype.set=function(t,e){if(arguments.length<1)throw new SyntaxError("Not enough arguments");var r,n,o,f,i,s,h,u,a,y;if("object"==typeof arguments[0]&&arguments[0].constructor===this.constructor){if(r=arguments[0],o=P.ToUint32(arguments[1]),o+r.length>this.length)throw new RangeError("Offset plus length of array is out of range");if(u=this.byteOffset+o*this.BYTES_PER_ELEMENT,a=r.length*this.BYTES_PER_ELEMENT,r.buffer===this.buffer){for(y=[],i=0,s=r.byteOffset;i<a;i+=1,s+=1)y[i]=r.buffer._bytes[s];for(i=0,h=u;i<a;i+=1,h+=1)this.buffer._bytes[h]=y[i]}else for(i=0,s=r.byteOffset,h=u;i<a;i+=1,s+=1,h+=1)this.buffer._bytes[h]=r.buffer._bytes[s]}else{if("object"!=typeof arguments[0]||"undefined"==typeof arguments[0].length)throw new TypeError("Unexpected argument type(s)");if(n=arguments[0],f=P.ToUint32(n.length),o=P.ToUint32(arguments[1]),o+f>this.length)throw new RangeError("Offset plus length of array is out of range");for(i=0;i<f;i+=1)s=n[i],this._setter(o+i,Number(s))}},s.prototype.subarray=function(t,e){function r(t,e,r){return t<e?e:t>r?r:t}t=P.ToInt32(t),e=P.ToInt32(e),arguments.length<1&&(t=0),arguments.length<2&&(e=this.length),t<0&&(t=this.length+t),e<0&&(e=this.length+e),t=r(t,0,this.length),e=r(e,0,this.length);var n=e-t;return n<0&&(n=0),new this.constructor(this.buffer,this.byteOffset+t*this.BYTES_PER_ELEMENT,n)},s}var e=function(t){if(t=P.ToInt32(t),t<0)throw new RangeError("ArrayBuffer size is not a small enough positive integer");this.byteLength=t,this._bytes=[],this._bytes.length=t;var e;for(e=0;e<this.byteLength;e+=1)this._bytes[e]=0;n(this)};r.ArrayBuffer=r.ArrayBuffer||e;var f=function(){},i=t(1,s,h),T=t(1,u,a),A=t(1,y,a),v=t(2,p,g),N=t(2,l,E),R=t(4,b,c),M=t(4,_,w),I=t(4,U,d),m=t(8,L,O);r.Int8Array=r.Int8Array||i,r.Uint8Array=r.Uint8Array||T,r.Uint8ClampedArray=r.Uint8ClampedArray||A,r.Int16Array=r.Int16Array||v,r.Uint16Array=r.Uint16Array||N,r.Int32Array=r.Int32Array||R,r.Uint32Array=r.Uint32Array||M,r.Float32Array=r.Float32Array||I,r.Float64Array=r.Float64Array||m}(),function(){function t(t,e){return P.IsCallable(t.get)?t.get(e):t[e]}function e(e){return function(n,o){if(n=P.ToUint32(n),n+e.BYTES_PER_ELEMENT>this.byteLength)throw new RangeError("Array index out of range");n+=this.byteOffset;var i,s=new r.Uint8Array(this.buffer,n,e.BYTES_PER_ELEMENT),h=[];for(i=0;i<e.BYTES_PER_ELEMENT;i+=1)h.push(t(s,i));return Boolean(o)===Boolean(f)&&h.reverse(),t(new e(new r.Uint8Array(h).buffer),0)}}function o(e){return function(n,o,i){if(n=P.ToUint32(n),n+e.BYTES_PER_ELEMENT>this.byteLength)throw new RangeError("Array index out of range");var s,h,u=new e([o]),a=new r.Uint8Array(u.buffer),y=[];for(s=0;s<e.BYTES_PER_ELEMENT;s+=1)y.push(t(a,s));Boolean(i)===Boolean(f)&&y.reverse(),h=new r.Uint8Array(this.buffer,n,e.BYTES_PER_ELEMENT),h.set(y)}}var f=function(){var e=new r.Uint16Array([4660]),n=new r.Uint8Array(e.buffer);return 18===t(n,0)}(),i=function(t,e,o){if(0===arguments.length)t=new r.ArrayBuffer(0);else if(!(t instanceof r.ArrayBuffer||"ArrayBuffer"===P.Class(t)))throw new TypeError("TypeError");if(this.buffer=t||new r.ArrayBuffer(0),this.byteOffset=P.ToUint32(e),this.byteOffset>this.buffer.byteLength)throw new RangeError("byteOffset out of range");if(arguments.length<3?this.byteLength=this.buffer.byteLength-this.byteOffset:this.byteLength=P.ToUint32(o),this.byteOffset+this.byteLength>this.buffer.byteLength)throw new RangeError("byteOffset and length reference an area beyond the end of the buffer");n(this)};i.prototype.getUint8=e(r.Uint8Array),i.prototype.getInt8=e(r.Int8Array),i.prototype.getUint16=e(r.Uint16Array),i.prototype.getInt16=e(r.Int16Array),i.prototype.getUint32=e(r.Uint32Array),i.prototype.getInt32=e(r.Int32Array),i.prototype.getFloat32=e(r.Float32Array),i.prototype.getFloat64=e(r.Float64Array),i.prototype.setUint8=o(r.Uint8Array),i.prototype.setInt8=o(r.Int8Array),i.prototype.setUint16=o(r.Uint16Array),i.prototype.setInt16=o(r.Int16Array),i.prototype.setUint32=o(r.Uint32Array),i.prototype.setInt32=o(r.Int32Array),i.prototype.setFloat32=o(r.Float32Array),i.prototype.setFloat64=o(r.Float64Array),r.DataView=r.DataView||i}()},{}]},{},[1])(1)});