(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5946],{34206:function(n,t,u){(window.__NEXT_P=window.__NEXT_P||[]).push(["/authentication/authorize",function(){return u(92394)}])},72662:function(n,t,u){"use strict";u.d(t,{a:function(){return c}});var r=u(67294),e=u(52926),c=function(){return(0,r.useContext)(e.Vo)}},38242:function(n,t,u){"use strict";u.d(t,{s:function(){return e}});var r=u(67294),e=function(){var n=(0,r.useRef)(!1);return(0,r.useEffect)((function(){return n.current=!0,function(){n.current=!1}}),[]),(0,r.useCallback)((function(){return n.current}),[])}},92394:function(n,t,u){"use strict";u.r(t);var r=u(67294),e=u(11163),c=u(72662),o=u(38242);t.default=function(){var n=(0,o.s)(),t=(0,e.useRouter)(),u=(0,c.a)().handleRedirectCallback;return(0,r.useEffect)((function(){var r=window.location.search;r.includes("code=")&&r.includes("state=")&&u().then((function(u){if(n()){var r=(null===u||void 0===u?void 0:u.returnUrl)||"/dashboard";t.push(r).catch(console.error)}})).catch((function(u){console.error(u),n()&&t.push("/authentication/login").catch(console.error)}))}),[]),null}}},function(n){n.O(0,[9774,2888,179],(function(){return t=34206,n(n.s=t);var t}));var t=n.O();_N_E=t}]);