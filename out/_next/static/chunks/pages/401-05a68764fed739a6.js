(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1032],{53156:function(e,t,n){"use strict";n.d(t,{Z:function(){return k}});var r=n(63366),i=n(87462),a=n(67294),s=n(86010),o=n(28320),d=n(34867),u=n(94780),c=n(29628);var l=(0,n(70182).ZP)(),m=n(66500),h=n(85893);const p=["className","component","disableGutters","fixed","maxWidth","classes"],f=(0,m.Z)(),x=l("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`maxWidth${(0,o.Z)(String(n.maxWidth))}`],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),b=e=>(0,c.Z)({props:e,name:"MuiContainer",defaultTheme:f});var v=n(98216),Z=n(90948),g=n(71657);const w=function(e={}){const{createStyledComponent:t=x,useThemeProps:n=b,componentName:c="MuiContainer"}=e,l=t((({theme:e,ownerState:t})=>(0,i.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}})),(({theme:e,ownerState:t})=>t.fixed&&Object.keys(e.breakpoints.values).reduce(((t,n)=>{const r=n,i=e.breakpoints.values[r];return 0!==i&&(t[e.breakpoints.up(r)]={maxWidth:`${i}${e.breakpoints.unit}`}),t}),{})),(({theme:e,ownerState:t})=>(0,i.Z)({},"xs"===t.maxWidth&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[e.breakpoints.up(t.maxWidth)]:{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`}}))),m=a.forwardRef((function(e,t){const a=n(e),{className:m,component:f="div",disableGutters:x=!1,fixed:b=!1,maxWidth:v="lg"}=a,Z=(0,r.Z)(a,p),g=(0,i.Z)({},a,{component:f,disableGutters:x,fixed:b,maxWidth:v}),w=((e,t)=>{const{classes:n,fixed:r,disableGutters:i,maxWidth:a}=e,s={root:["root",a&&`maxWidth${(0,o.Z)(String(a))}`,r&&"fixed",i&&"disableGutters"]};return(0,u.Z)(s,(e=>(0,d.Z)(t,e)),n)})(g,c);return(0,h.jsx)(l,(0,i.Z)({as:f,ownerState:g,className:(0,s.Z)(w.root,m),ref:t},Z))}));return m}({createStyledComponent:(0,Z.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`maxWidth${(0,v.Z)(String(n.maxWidth))}`],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,g.Z)({props:e,name:"MuiContainer"})});var k=w},98396:function(e,t,n){"use strict";var r;n.d(t,{Z:function(){return l}});var i=n(67294),a=n(34168),s=n(20539),o=n(58974);function d(e,t,n,r,a){const s="undefined"!==typeof window&&"undefined"!==typeof window.matchMedia,[d,u]=i.useState((()=>a&&s?n(e).matches:r?r(e).matches:t));return(0,o.Z)((()=>{let t=!0;if(!s)return;const r=n(e),i=()=>{t&&u(r.matches)};return i(),r.addListener(i),()=>{t=!1,r.removeListener(i)}}),[e,n,s]),d}const u=(r||(r=n.t(i,2))).useSyncExternalStore;function c(e,t,n,r){const a=i.useCallback((()=>t),[t]),s=i.useMemo((()=>{if(null!==r){const{matches:t}=r(e);return()=>t}return a}),[a,e,r]),[o,d]=i.useMemo((()=>{if(null===n)return[a,()=>()=>{}];const t=n(e);return[()=>t.matches,e=>(t.addListener(e),()=>{t.removeListener(e)})]}),[a,n,e]);return u(d,o,s)}function l(e,t={}){const n=(0,a.Z)(),r="undefined"!==typeof window&&"undefined"!==typeof window.matchMedia,{defaultMatches:i=!1,matchMedia:o=(r?window.matchMedia:null),ssrMatchMedia:l=null,noSsr:m}=(0,s.Z)({name:"MuiUseMediaQuery",props:t,theme:n});let h="function"===typeof e?e(n):e;h=h.replace(/^@media( ?)/m,"");return(void 0!==u?c:d)(h,i,o,l,m)}},58974:function(e,t,n){"use strict";var r=n(16600);t.Z=r.Z},84721:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/401",function(){return n(68090)}])},68090:function(e,t,n){"use strict";n.r(t);var r=n(85893),i=n(67294),a=n(41664),s=n.n(a),o=n(9008),d=n.n(o),u=n(98396),c=n(87357),l=n(53156),m=n(15861),h=n(11057),p=n(2734),f=n(13869);t.default=function(){var e=(0,p.Z)(),t=(0,u.Z)(e.breakpoints.down("sm"));return(0,i.useEffect)((function(){f.w.push({event:"page_view"})}),[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d(),{children:(0,r.jsx)("title",{children:"Error: Authorization Required | Material Kit Pro"})}),(0,r.jsx)(c.Z,{component:"main",sx:{alignItems:"center",backgroundColor:"background.paper",display:"flex",flexGrow:1,py:"80px"},children:(0,r.jsxs)(l.Z,{maxWidth:"lg",children:[(0,r.jsx)(m.Z,{align:"center",variant:t?"h4":"h1",children:"401: Authorization required"}),(0,r.jsx)(m.Z,{align:"center",color:"textSecondary",sx:{mt:.5},variant:"subtitle2",children:"You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation."}),(0,r.jsx)(c.Z,{sx:{display:"flex",justifyContent:"center",mt:6},children:(0,r.jsx)(c.Z,{alt:"Under development",component:"img",src:"/static/error/error401_".concat(e.palette.mode,".svg"),sx:{height:"auto",maxWidth:"100%",width:400}})}),(0,r.jsx)(c.Z,{sx:{display:"flex",justifyContent:"center",mt:6},children:(0,r.jsx)(s(),{href:"/dashboard",passHref:!0,children:(0,r.jsx)(h.Z,{component:"a",variant:"outlined",children:"Back to Dashboard"})})})]})})]})}}},function(e){e.O(0,[1664,9774,2888,179],(function(){return t=84721,e(e.s=t);var t}));var t=e.O();_N_E=t}]);