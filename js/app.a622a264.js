(function(e){function t(t){for(var r,o,s=t[0],c=t[1],i=t[2],l=0,d=[];l<s.length;l++)o=s[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);f&&f(t);while(d.length)d.shift()();return u.push.apply(u,i||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==a[s]&&(r=!1)}r&&(u.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},a={app:0},u=[];function s(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-2d006e08":"89bd910e","chunk-2d0a406d":"7b2ed1ff","chunk-2d2091cc":"4cac6776"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-2d006e08":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d006e08":"4be0d4b2","chunk-2d0a406d":"31d6cfe0","chunk-2d2091cc":"31d6cfe0"}[e]+".css",a=c.p+r,u=document.getElementsByTagName("link"),s=0;s<u.length;s++){var i=u[s],l=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(l===r||l===a))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){i=d[s],l=i.getAttribute("data-href");if(l===r||l===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||a,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete o[e],f.parentNode.removeChild(f),n(u)},f.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=u);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=s(e);var d=new Error;i=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}a[e]=void 0}};var f=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/thef2e-2019-w8-storage/",c.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var d=0;d<i.length;d++)t(i[d]);var f=l;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"3ccf":function(e,t,n){"use strict";n("99ee")},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app",on:{click:e.clickHandler}},[n("router-view"),n("Loading")],1)},a=[],u=(n("7f7f"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"slide-fade"}},[e.loading?n("div",{staticClass:"cover"},[n("img",{staticClass:"loading",attrs:{src:"loading.svg",alt:""}}),n("p",{staticClass:"uploadProgress"},[e._v(e._s(e.displayProgress))])]):e._e()])}),s=[],c={computed:{loading:function(){return this.$store.state.loading},uploadProgress:function(){return this.$store.state.uploadProgress},displayProgress:function(){return this.uploadProgress?this.uploadProgress+"%":""}}},i=c,l=(n("3ccf"),n("2877")),d=Object(l["a"])(i,u,s,!1,null,"3927af7f",null),f=d.exports,p={components:{Loading:f},computed:{componentId:function(){return this.$store.state.route.name}},methods:{clickHandler:function(e){"menu"!==e.target.className&&this.$store.commit("toggleMenu",!1)}}},h=p,g=(n("5c0b"),Object(l["a"])(h,o,a,!1,null,null,null)),m=g.exports,v=n("8c4f");r["a"].use(v["a"]);var b=new v["a"]({routes:[{path:"/folders/:id",name:"folder",component:function(){return Promise.all([n.e("chunk-2d006e08"),n.e("chunk-2d2091cc")]).then(n.bind(null,"a854"))}},{path:"/",name:"home",component:function(){return Promise.all([n.e("chunk-2d006e08"),n.e("chunk-2d0a406d")]).then(n.bind(null,"054f"))}}]}),y=n("2f62");r["a"].use(y["a"]);var k=new y["a"].Store({state:{showMenu:!1,loading:!1,uploadProgress:0},mutations:{toggleMenu:function(e,t){e.showMenu=t},setLoadingState:function(e,t){e.loading=t},setProgress:function(e,t){e.uploadProgress=t}}});r["a"].config.productionTip=!1,new r["a"]({router:b,store:k,render:function(e){return e(m)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("e332")},"99ee":function(e,t,n){},e332:function(e,t,n){}});
//# sourceMappingURL=app.a622a264.js.map