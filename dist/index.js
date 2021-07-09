/*!
 * https://github.com/Julienedies/jhandy-cli.git
 * license:ISC
 * V0.5.26
 * 7/10/2021, 2:13:47 AM
 */
module.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=13)}([function(t,e){t.exports=require("fs")},function(t,e){t.exports=require("path")},function(t,e,n){"use strict";var r=n(0),o=n.n(r),c=n(1),a=n.n(c);function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}
/*!
 * Created by j on 18/11/9.
 * 把json文件包装成对象进行增删改查
 */
var u=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e=a.a.resolve(__dirname,"".concat(e)),this.jsonPath=e,o.a.existsSync(e))try{var r=o.a.readFileSync(this.jsonPath,"utf8");this.json=JSON.parse(r)}catch(t){throw new Error(t)}else this.json=n}var e,n,r;return e=t,(n=[{key:"merge",value:function(t){Object.assign(this.json,t)}},{key:"save",value:function(){o.a.writeFileSync(this.jsonPath,JSON.stringify(this.json,null,"\t"))}},{key:"get",value:function(t){if(!t)return this.json;var e=t.split(".");return function t(e,n){var r=n.shift(),o=e[r];return o&&n.length?t(e[r],n):o}(this.json,e)}},{key:"match",value:function(t){return this.get(t)}}])&&i(e.prototype,n),r&&i(e,r),t}();e.a=function(t,e){return new u(t,e)}},function(t,e){t.exports=require("iconv-lite")},function(t,e){t.exports=require("cheerio-httpcli")},,function(t,e,n){"use strict";n.d(e,"a",function(){return u});var r=n(0),o=n.n(r),c=n(3),a=n.n(c);function i(t,e,n,r){e=e||t.split(".").shift()+".json",n=(n=n||[]).map(function(t){return 1*t});var c=/\s{3,}/;return r&&(c=/[\t]+/),new Promise(function(i,u){o.a.readFile(t,function(s,l){if(s)return u(s);var f=(l=a.a.decode(l,"GBK")).split("\r\n");console.log("".concat(t,"行数是=> "),f.length);var p=1,h=[];f.forEach(function(t){var e=t.split(c);p=e.length>=p?e.length:p,h.push(e)});var d=[];h.forEach(function(t){if(p-t.length>2)return console.log("冗余行 => ",p,t.length,t.join());0===n.length?d.push(t):d.push(t.filter(function(t,e){return n.indexOf(e)>=0}))});var v=d.shift();console.log("列标题是=> ",v),console.log("有效rows length => ",d.length),r&&d.forEach(function(t){t[1]&&(t[1]=t[1].replace(/\s+/gim,"").replace("Ａ","A"))});var g=JSON.stringify(d,null,"\t");/\.js$/.test(e)&&(g="STOCKS = ".concat(g," ;")),o.a.writeFileSync(e,g),console.log("数据成功写入".concat(e,".")),i(d)})})}function u(t){return i(t.csvFile,t.jsonFile,t.cols,t.isCsdStocksJson)}e.b=i},function(t,e,n){"use strict";var r=n(1),o=n.n(r),c=n(4),a=n.n(c);var i=function(t){return t.replace(/\s+/gim,"")},u=i,s=i,l=i,f={ths_c:{url:function(t){return"http://basic.10jqka.com.cn/".concat(t,"/concept.html")},parse:function(t){var e=t("#concept table.gnContent"),n=e.find("tr td.gnName"),r=e.find("tr.extend_content"),o={};n.each(function(e){var n=u(t(this).text());o[n]=u(r.eq(e).text())});var c={"概念详情":o};return console.log(JSON.stringify(c,null,"\t")),c}},ths_new:{url:function(t){return"http://basic.10jqka.com.cn/".concat(t,"/")},parse:function(t){var e=t("#profile table"),n=e.eq(0).find("td"),r=n.eq(0).text().replace("公司亮点：",""),o=n.eq(4).text().replace("概念贴合度排名：","").replace("概念强弱排名：","").replace("涉及概念：","").replace("详情>>",""),c=t("#chinaCompanyListAll").text().replace("A股：",""),a=e.eq(1).find("td").eq(3).text().replace("分类：",""),i={"亮点":s(r),"概念":s(o),"同业":s(c),"分类":s(a)};return console.log(JSON.stringify(i,null,"\t")),i}},ths_p:{url:function(t){return"http://basic.10jqka.com.cn/".concat(t,"/company.html")},parse:function(t){var e=t("#detail td"),n=e.eq(1).text().replace("公司名称：",""),r=e.eq(2).text().replace("所属地域：",""),o=e.eq(4).text().replace("所属申万行业：",""),c=e.eq(7).text().replace("主营业务：",""),a=e.eq(8).text().replace("产品名称：",""),i={"全名":l(n),"地域":l(r),"行业":l(o),"业务":l(c),"产品":l(a)};return console.log(JSON.stringify(i,null,"\t")),i}},ycj:{url:function(t){return t=(/^6/.test(t)?"sh":"sz")+t,"http://www.yuncaijing.com/quote/".concat(t,".html")},parse:function(t){var e={"概念y":t(".ralate table tr").map(function(){var e=t(this).find("td a").text()||"",n=t(this).find("td small").text()||"";return e.trim()+"-"+n.trim()}).get().join("  ")};return console.log(JSON.stringify(e,null,"\t")),e}},xgb:{url:function(t){return t+=/^6/.test(t)?".SS":".SZ","https://xuangubao.cn/stock/".concat(t)},parse:function(t){var e=t(".stock-info-bkj .related-subject .related-subject-item .related-subject-item-name");return console.log(e.length,e.text()),{"概念xgb":e.map(function(){return t(this).text()||""}).get().join("  ")}}}};
/*!
 * Created by j on 18/11/25.
 * 同花顺概念页面资料解析: http://basic.10jqka.com.cn/000001/concept.html
 */a.a.set("gzip",!0),a.a.set("timeout",3e4),a.a.set("headers",{"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.34"});var p=function(t,e,n){var r=f[e];return new Promise(function(n,o){a.a.fetch(r.url(t),function(c,a,i,u){if(c)return o(c);try{var s=r.parse(a);n({result:s,source_id:e,code:t})}catch(t){o(t)}})})},h=n(2),d=n(9),v=n.n(d),g=function(t){return new Promise(function(e,n){var r="http://basic.10jqka.com.cn/mapp/".concat(t,"/a_companies_list.json");v.a.get(r).accept("json").end(function(r,o){if(r)return n(r);var c=o.body.data,a=c.domestic.company_data[0].list;a=a.map(function(t,e){return t.name});var i={};i[c.field]=a;var u={"同业":i};console.log(JSON.stringify(u,"null","\t")),e({result:u,source_id:"ths_a",code:t})})})};function m(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,c=void 0;try{for(var a,i=t[Symbol.iterator]();!(r=(a=i.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,c=t}finally{try{r||null==i.return||i.return()}finally{if(o)throw c}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}n.d(e,"b",function(){return w});var y,b=["ths_new","ths_p","ths_c","ycj","xgb"],j=!1,x={};function S(t,e,n,r){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(t,e){return console.log(t,e)};if(!t)throw new Error("必须提供csd数据存储路径.");if(e||(e=Object(h.a)(o.a.resolve(t,"./stocks.json")).json),"string"==typeof e&&/\.json$/.test(e)&&(e=Object(h.a)(o.a.resolve(t,e)).json),/^\d{6}$/.test(""+(n*=1)))for(var a=0;a<e.length;a++)if(1*e[a][0]===n){n=a;break}r=r||b,console.log("stocks.length is ".concat(e.length)),j=!1,function t(e,n,r,c,a){var i=e[n];if(!i)return a(x={over:!0,index:n}),console.log("fetch over, size is ".concat(n));var u=m(i,2),s=u[0],l=u[1],f=(n+1)/e.length*100;f=f.toFixed(2),f="".concat(n+1,"/").concat(e.length),a(x={name:l,code:s,index:n,progress:f});var d=r.map(function(t,e){return p(s,t,e*(Math.random()+.1)*5e3)});d.push(g(s)),Promise.all(d).then(function(i){var u=Object(h.a)(o.a.resolve(c,"./s/".concat(s,".json")));u.merge({"名称":l,code:s});var f=!0,p=!1,d=void 0;try{for(var v,g=i[Symbol.iterator]();!(f=(v=g.next()).done);f=!0){var m=v.value;u.merge(m.result)}}catch(t){p=!0,d=t}finally{try{f||null==g.return||g.return()}finally{if(p)throw d}}u.save(),y=setTimeout(function(){!j&&t(e,n+1,r,c,a)},5e3*(Math.random()+.2))}).catch(function(t){console.error(t),a(x,t)})}(e,n,r,t,function(t){c(t)})}function w(t){return S(t.csdPath,t.stocks,t.index,t.sources,t.watcher)}w.stop=S.stop=function(){return console.log("clear fetch timer =>",y),clearTimeout(y),j=!0,x},w.SOURCES=S.SOURCES=b;e.a=S},function(t,e,n){"use strict";n.d(e,"b",function(){return f});var r=n(0),o=n.n(r),c=n(1),a=n.n(c),i=n(3),u=n.n(i),s=n(2);function l(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:["概念","概念y","产品","业务","全名","备注","概念z","亮点","同业"],r=arguments.length>3?arguments[3]:void 0;return new Promise(function(c,i){var l=Object(s.a)(a.a.resolve(t,"./stocks.json")).json,f=a.a.resolve(t,e.split(/[\/\\]/).pop());if(o.a.writeFileSync(f,""),"string"==typeof n&&(n=[n]),n.forEach(function(e,n){!function(t,e,n,r,c){var i=a.a.resolve(n,"./".concat(t,".txt")),u="";c.forEach(function(r,o){var c=r[0],i=/^6/.test(c)?1:0,l=Object(s.a)(a.a.resolve(n,"./s/".concat(c,".json"))),f=function(t){return l.get(t)||""},p="";if(console.log(r[0],r[1]),!l.json.code)return console.log("".concat(r[0]," : ").concat(r[1]," is {}"));switch(t){case"概念":p=f("概念").replace(/[，]/gim,"  ")+"  "+f("行业").replace(/^.+[—]/,"-")+"  "+f("概念z")+"  ";break;case"概念y":p=f("概念y").replace(/[-]\d+[%]/gim,"  ");break;case"产品":p=f("产品").replace(/[、]/gim,"  ");break;case"业务":p=f("业务")+"  ";break;default:p=f(t)+"  "}u+=[i,c,e,p,"0.000"].join("|")+"\r\n"}),o.a.writeFileSync(i,u),o.a.writeFileSync(r,u,{encoding:"utf8",flag:"a"})}(e,n+1,t,f,l)}),1===n.length)return c(a.a.resolve(t,"".concat(n[0],".txt")));r&&r(f,t,l),o.a.createReadStream(f).pipe(u.a.decodeStream("utf8")).pipe(u.a.encodeStream("GBK")).pipe(o.a.createWriteStream(e)),console.log("****数据写入 ".concat(e,", 通达信自定义数据更新完成****")),c(f)})}function f(t){return l(t.csdPath,t.tdxFile,t.props)}e.a=l},function(t,e){t.exports=require("superagent")},,,,function(t,e,n){"use strict";n.r(e);var r=n(6);n.d(e,"csv",function(){return r.a});var o=n(7);n.d(e,"fetch",function(){return o.b});var c=n(8);n.d(e,"tdx",function(){return c.b}),e.default={csv:r.b,fetch:o.a,tdx:c.a}}]);
//# sourceMappingURL=index.js.map