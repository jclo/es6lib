/*! ****************************************************************************
 * ES6lib v1.0.4
 *
 * A template for writing pure ES6 Javascript libraries.
 * (you can download it from npm or github repositories)
 * Copyright (c) 2020 Mobilabs <contact@mobilabs.fr> (http://www.mobilabs.fr/).
 * Released under the MIT license. You may obtain a copy of the License
 * at: http://www.opensource.org/licenses/mit-license.php).
 * Built from {{boiler:name}} v{{boiler:name:version}}.
 * ************************************************************************** */
const $__ES6GLOB={};!function(t,e){"use strict";"function"==typeof define&&define.amd?define([""],e):"object"==typeof exports?module.exports=e(t):t.ES6lib=e(t)}($__ES6GLOB,t=>{"use strict";let e,n;const i={Public:{}};return n=function(t,e){const n=Object.keys(e);for(let i=0;i<n.length;i++)t[n[i]]=e[n[i]]},function(){const t=i.Public;n(t,{getString:()=>"I am a string!",getArray:()=>[1,2,3]})}(),function(){const n=i.Public,r=t.ES6lib;let o;e=function(){const t=Object.create(o);return t._library={name:"ES6lib",version:"1.0.4"},t},e.NAME="ES6lib",e.VERSION="1.0.4",e._setTestMode=function(){return[]},e.noConflict=function(){return t.ES6lib=r,this},o={whoami(){return this._library},getString:()=>n.getString(),getArray:()=>n.getArray()}}(),e});export default $__ES6GLOB.ES6lib;