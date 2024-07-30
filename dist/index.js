"use client";
"use strict";var U=Object.create;var f=Object.defineProperty;var z=Object.getOwnPropertyDescriptor;var V=Object.getOwnPropertyNames;var Y=Object.getPrototypeOf,J=Object.prototype.hasOwnProperty;var Z=(e,t)=>{for(var n in t)f(e,n,{get:t[n],enumerable:!0})},I=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of V(t))!J.call(e,s)&&s!==n&&f(e,s,{get:()=>t[s],enumerable:!(i=z(t,s))||i.enumerable});return e};var k=(e,t,n)=>(n=e!=null?U(Y(e)):{},I(t||!e||!e.__esModule?f(n,"default",{value:e,enumerable:!0}):n,e)),_=e=>I(f({},"__esModule",{value:!0}),e);var ae={};Z(ae,{default:()=>ie});module.exports=_(ae);var r=k(require("react")),M=require("goober"),L=require("zustand");var v=k(require("color")),O="https://app.resubscribe.ai",G="https://api.resubscribe.ai",R="app.resubscribe.ai",B={get:async(e,t)=>{let n={};Object.entries(t).forEach(([p,d])=>{d&&(n[p]=d)});let i=Object.entries(n).map(([p,d])=>`${p}=${encodeURIComponent(d)}`).join("&"),s=`${G}/v1/${e}?${i}`,l=await fetch(s,{cache:"no-cache",headers:{Accept:"application/json","Content-Type":"application/json"}});if(!l.ok)throw new Error(`Failed to fetch ${s}`);return l.json()}},D=e=>{switch(e){case"intent":return"Not ready to pay?";case"churn":return"We're sorry to see you go";case"delete":return"We're sorry to see you go";case"subscriber":return"Would you like to tell us about your experience?";case"presubscription":return"Can we ask you a few questions?";case"precancel":return"Can we ask you a few questions?"}},T=e=>{switch(e){case"intent":return"Can we ask you a few questions? It should only take a few minutes.";case"churn":return"Can we ask you a few questions? It should only take a few minutes.";case"delete":return"Can we ask you a few questions? It should only take a few minutes.";case"subscriber":return"Can we ask you a few questions? It should only take a few minutes.";case"presubscription":return"We'd love to hear your thoughts. It should only take a few minutes.";case"precancel":return"We'd love to hear your thoughts. It should only take a few minutes."}},N=()=>navigator.languages&&navigator.languages.length?navigator.languages[0]:navigator.userLanguage||navigator.language||navigator.browserLanguage||null,F=(e,t)=>(0,v.default)(e).alpha(t).string(),W=e=>(0,v.default)(e).isDark(),h=(...e)=>e.filter(Boolean).join(" ");var y=k(require("react")),c=require("goober");var $=(0,c.styled)("div")`
  flex: 1;
  text-align: center;
  padding: 0.5rem 0.75rem;
  background-color: ${e=>e.bgcolor||"#000"};
  color: ${e=>e.color||"#fff"};
  ${e=>e.secondarycolor?`
    border-width: 1px;
    border-style: solid;
    border-color: ${F(e.secondaryColor,.3)||"#d4d7de"};
  `:`
    border: none;
  `}
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
`,H=(0,c.keyframes)(`
0% {opacity:.5;}
100% {opacity:1;}
`),K=(0,c.styled)("div")`
  background-color: ${e=>e.isdark==="1"?"rgba(0, 0, 0, 0.2)":"rgba(255, 255, 255, 0.2)"};
  backdrop-filter: blur(5px);
  animation: ${H} 150ms ease-in-out forwards;

  position: 'fixed';
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`,S=({isDark:e,className:t,children:n})=>y.default.createElement(K,{isdark:e?"1":"0",className:t},n),j=`
flex: 1;
margin-left: 4px;
margin-right: 4px;
border-radius: 8px;
overflow: hidden;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`,A=(0,c.keyframes)(`
0% {transform: translateY(-4px); opacity:.5;}
100% {transform: translateY(0px); opacity:1;}
`),Q=(0,c.styled)("div")`
  ${j}
  animation: ${A} 150ms ease-in-out forwards;

  padding: 1.25rem;
  max-width: 28rem;
  background-color: ${e=>e.bgcolor||"white"};
  color: ${e=>e.color||"#111827"};

  @media (min-width: 576px) {
    padding: 1.5rem;
  }
`,E=({backgroundColor:e,color:t,className:n,children:i})=>y.default.createElement(Q,{bgcolor:e,color:t,className:n},i),X=(0,c.styled)("div")`
  ${j}
  animation: ${A} 150ms ease-in-out forwards;

  height: 80vh;
  max-width: 600px;
  background-color: ${e=>e.bgcolor||"white"};
  position: relative;
`,q=({backgroundColor:e,className:t,children:n})=>y.default.createElement(X,{bgcolor:e,className:t},n),x={title:c.css`
font-size: 1.25rem;
font-weight: 600;
text-align: center;
`,description:c.css`
margin-top: 1rem;
font-size: 1rem;
text-align: center;
opacity: 0.8;
`,buttons:c.css`
margin-top: 1.5rem;
display: flex;
flex-direction: column;
gap: 0.75rem;

@media (min-width: 576px) {
  flex-direction: row;
}
`};(0,M.setup)(r.default.createElement);var u=(0,L.create)(e=>({state:"closed",options:null,openConsent:t=>e({state:"confirming",options:t}),close:()=>e({state:"closed",options:null})})),P=e=>{let t={slug:e.slug,uid:e.userId,email:e.userEmail,ait:e.aiType,brloc:N()};B.get("sessions/consent",t).catch(n=>{console.error("Failed to fetch sessions/consent: ",n)})},ee=({options:e})=>{(0,r.useEffect)(()=>{let n=i=>{if(new URL(i.origin).hostname===R)try{JSON.parse(i.data).type==="close"&&C("close")}catch(l){console.error("Failed to parse data: ",l)}};return window.addEventListener("message",n),()=>{window.removeEventListener("message",n)}},[e]);let t=(0,r.useMemo)(()=>{let n={ait:e.aiType,uid:e.userId,email:e.userEmail,iframe:"true",hideclose:"true"};return`${O}/chat/${e.slug}?${Object.entries(n).filter(([s,l])=>l!==void 0).map(([s,l])=>`${s}=${encodeURIComponent(String(l))}`).join("&")}`},[e]);return r.default.createElement(r.default.Fragment,null,r.default.createElement("iframe",{src:t,width:"100%",height:"100%",style:{border:"none",display:"block"}}),r.default.createElement("div",{style:{position:"absolute",top:16,right:10,height:32,width:32,display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"},onClick:()=>{confirm("Are you sure you want to close the chat?")&&C("close")}},r.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 -960 960 960",width:"24px",fill:"#5f6368"},r.default.createElement("path",{d:"m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"}))))},m=!1,te=()=>{let{state:e,options:t}=u();(0,r.useEffect)(()=>(m=!0,()=>{m=!1}),[]);let n=r.default.useRef(!1);if((0,r.useEffect)(()=>{!t||n.current||e==="confirming"&&P(t)},[t,e]),e==="closed")return null;if(!t)return console.error("No options provided"),null;let{aiType:i,title:s,description:l,primaryButtonText:p,cancelButtonText:d,colors:o,classNames:a}=t,w=o!=null&&o.background?W(o.background):!1;return e==="confirming"?r.default.createElement(S,{isDark:w,className:a==null?void 0:a.overlay},r.default.createElement(E,{backgroundColor:o==null?void 0:o.background,color:o==null?void 0:o.text,className:a==null?void 0:a.modal},r.default.createElement("div",{className:h(x.title)},s||D(i)),r.default.createElement("div",{className:h(x.description)},l||T(i)),r.default.createElement("div",{className:h(x.buttons)},r.default.createElement($,{onClick:()=>{C("cancel-consent")},role:"button",tabIndex:0,bgcolor:"transparent",color:(o==null?void 0:o.text)||"#000",secondarycolor:(o==null?void 0:o.text)||"#000"},d||"Not right now"),r.default.createElement($,{onClick:()=>{u.setState({state:"open"})},bgcolor:o==null?void 0:o.primary,color:w?o==null?void 0:o.text:o==null?void 0:o.background,role:"button",tabIndex:0},p||"Let's chat!")))):r.default.createElement(S,{isDark:w,className:a==null?void 0:a.overlay},r.default.createElement(q,{backgroundColor:o==null?void 0:o.background,className:a==null?void 0:a.modal},r.default.createElement(ee,{options:t})))},g=null,oe=e=>{if(m||console.error("ResubscribeComponent is not mounted"),u.getState().state!=="closed"){console.warn("ResubscribeComponent is already open");return}u.setState({state:"confirming",options:e}),e.onClose&&(g=e.onClose)},C=e=>{m||console.error("ResubscribeComponent is not mounted"),u.setState({state:"closed",options:null}),g&&(g(e),g=null)},b=null,ne=e=>{b=e},re=e=>{if(!b){console.error("No headless options set");return}if(m||console.error("ResubscribeComponent is not mounted"),u.getState().state!=="closed"){console.warn("ResubscribeComponent is already open");return}let t={...b,...e};u.setState({state:"open",options:t}),t.onClose&&(g=t.onClose)},se=()=>{if(!b){console.error("No headless options set");return}P(b)},ie={Component:te,openWithConsent:oe,close:C,headless:{setOptions:ne,openChat:re,registerConsentRequest:se}};
//# sourceMappingURL=index.js.map