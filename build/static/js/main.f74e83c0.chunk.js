(this["webpackJsonpoivan-cl"]=this["webpackJsonpoivan-cl"]||[]).push([[0],{158:function(e){e.exports=JSON.parse('{"title":"welcome"}')},464:function(e,t,n){},465:function(e,t,n){},497:function(e,t,n){"use strict";n.r(t);n(261),n(273);var c,a=n(0),r=n(118),i=n(67),l=(n(463),n(94)),o=n(161),u=n(16),b=n(247),s=n(160),j=(n(464),n(465),Object(s.a)(c||(c=Object(b.a)(["\n  html,\n  body {\n    background-color: #f2fafe;\n    width: 100%;\n  }\n\n  body {\n    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  }\n\n  #root {\n    min-height: 100%;\n    min-width: 100%;\n  }\n\n  p,\n  label {\n    font-family: Georgia, Times, 'Times New Roman', serif;\n    line-height: 1.5em;\n  }\n\n  input, select {\n    font-family: inherit;\n    font-size: inherit;\n  }\n"])))),f=n(43),d=n(18),h=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{fallback:null},c=e;t&&(c=function(){return e().then((function(e){return{default:t(e)}}))});var r=Object(a.lazy)(c);return function(e){return Object(d.jsx)(a.Suspense,{fallback:n.fallback,children:Object(d.jsx)(r,Object(f.a)({},e))})}},O=h((function(){return Promise.all([n.e(3),n.e(5)]).then(n.bind(null,568))}),(function(e){return e.HomePage})),p=h((function(){return Promise.all([n.e(4),n.e(6)]).then(n.bind(null,570))}),(function(e){return e.ArticlePage})),g=h((function(){return n.e(7).then(n.bind(null,571))}),(function(e){return e.NotFoundPage})),m=n(498);function v(){var e=Object(m.a)().i18n;return Object(d.jsxs)(o.a,{children:[Object(d.jsx)(l.a,{titleTemplate:"%s - React Boilerplate",defaultTitle:"React Boilerplate",htmlAttributes:{lang:e.language},children:Object(d.jsx)("meta",{name:"description",content:"A React Boilerplate application"})}),Object(d.jsxs)(u.d,{children:[Object(d.jsx)(u.b,{exact:!0,path:"/",component:O}),Object(d.jsx)(u.b,{exact:!0,path:"/article",component:p}),Object(d.jsx)(u.b,{component:g})]}),Object(d.jsx)(j,{})]})}var x=n(245),y=n(123),S=n(253),T=n(256),k=n(35);function A(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return 0===Object.keys(e).length?function(e){return e}:Object(k.b)(Object(f.a)({},e))}var E={article:{articleIndex:-1,articles:[],pageNumber:1}},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E.article,t=arguments.length>1?arguments[1]:void 0,n=t.payload;switch(t.type){case"SELECT_ARTICLE":return Object(f.a)(Object(f.a)({},e),{},{articleIndex:n});case"SAVE_ARTICLES":return Object(f.a)(Object(f.a)({},e),{},{articles:n});case"SAVE_PAGE":return Object(f.a)(Object(f.a)({},e),{},{pageNumber:n});default:return e}};var P=function(e){e&&e instanceof Function&&n.e(8).then(n.bind(null,567)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),c(e),a(e),r(e),i(e)}))},R=n(257),C=n(92),I=n(255),L=n(158),N={},B={en:{translation:L}};!function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:N,c=arguments.length>2?arguments[2]:void 0;Object.keys(t).forEach((function(a){var r=c?"".concat(c,".").concat(a):a;"object"===typeof t[a]?(n[a]={},e(t[a],n[a],r)):n[a]=r}))}(L);R.a.use(C.e).use(I.a).init({resources:B,fallbackLng:"en",debug:!1,interpolation:{escapeValue:!1}});var F=function(){var e=Object(T.a)({}),t=e.run,n=[e],c=[Object(S.a)({createReducer:A,runSaga:t})];return Object(y.a)({reducer:A({article:w}),middleware:[].concat(Object(x.a)(Object(y.b)()),n),devTools:!1,enhancers:c,preloadedState:E})}(),H=document.getElementById("root");r.render(Object(d.jsx)(i.a,{store:F,children:Object(d.jsx)(l.b,{children:Object(d.jsx)(a.StrictMode,{children:Object(d.jsx)(v,{})})})}),H),P()}},[[497,1,2]]]);