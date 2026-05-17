/*! ****************************************************************************
 * ES6lib v3.0.0-beta.1.4
 *
 * A template for writing pure ES6 Javascript libraries.
 * (you can download it from npm or github repositories)
 * Copyright (c) 2026 Mobilabs <contact@mobilabs.fr> (https://www.mobilabs.fr).
 * Released under the MIT license. You may obtain a copy of the License
 * at: http://www.opensource.org/licenses/mit-license.php).
 * Built from {{boiler:name}} v{{boiler:name:version}}.
 * ************************************************************************** */
const $__ES6GLOB={};!function(t,e){"use strict";"function"==typeof define&&define.amd?define([""],e):"object"==typeof exports?module.exports=e(t):t.ES6lib=e(t)}($__ES6GLOB,t=>{"use strict";let e,n;const i={Public:{}};return n=function(t,e){const n=Object.keys(e);for(let i=0;i<n.length;i++)t[n[i]]=e[n[i]]},function(){const t=i.Public;n(t,{getString:()=>"I am a string!",getArray:()=>[1,2,3]})}(),function(){const n=i.Public;e=function(){const t=Object.create(o);return t._library={name:"ES6lib",version:"3.0.0-beta.1.4"},t},e.NAME="ES6lib",e.VERSION="3.0.0-beta.1.4";const r=t.ES6lib;e._setTestMode=function(){return[]},e.noConflict=function(){return t.ES6lib=r,this};const o={whoami(){return this._library},getString:()=>n.getString(),getArray:()=>n.getArray()}}(),e});export default $__ES6GLOB.ES6lib;