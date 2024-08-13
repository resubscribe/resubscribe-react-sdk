"use client";
"use strict";var U=Object.create;var f=Object.defineProperty;var z=Object.getOwnPropertyDescriptor;var K=Object.getOwnPropertyNames;var V=Object.getPrototypeOf,Y=Object.prototype.hasOwnProperty;var J=(e,t)=>{for(var n in t)f(e,n,{get:t[n],enumerable:!0})},I=(e,t,n,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of K(t))!Y.call(e,i)&&i!==n&&f(e,i,{get:()=>t[i],enumerable:!(s=z(t,i))||s.enumerable});return e};var k=(e,t,n)=>(n=e!=null?U(V(e)):{},I(t||!e||!e.__esModule?f(n,"default",{value:e,enumerable:!0}):n,e)),Z=e=>I(f({},"__esModule",{value:!0}),e);var ae={};J(ae,{default:()=>ie});module.exports=Z(ae);var r=k(require("react")),M=require("goober"),L=require("zustand");var v=k(require("color")),O="https://app.resubscribe.ai",_="https://api.resubscribe.ai",R="app.resubscribe.ai",B={get:async(e,t,n)=>{let s={};Object.entries(t).forEach(([d,o])=>{o&&(s[d]=o)});let i=Object.entries(s).map(([d,o])=>`${d}=${encodeURIComponent(o)}`).join("&"),l=`${_}/v1/${e}?${i}`,b=await fetch(l,{cache:"no-cache",headers:{Accept:"application/json","Content-Type":"application/json",...n?{Authorization:"Bearer "+n}:{}}});if(!b.ok)throw new Error(`Failed to fetch ${l}`);return b.json()}},D=e=>{switch(e){case"intent":return"Not ready to pay?";case"churn":return"We're sorry to see you go";case"delete":return"We're sorry to see you go";case"subscriber":return"Would you like to tell us about your experience?";case"presubscription":return"Can we ask you a few questions?";case"precancel":return"Can we ask you a few questions?"}},T=e=>{switch(e){case"intent":return"Can we ask you a few questions? It should only take a few minutes.";case"churn":return"Can we ask you a few questions? It should only take a few minutes.";case"delete":return"Can we ask you a few questions? It should only take a few minutes.";case"subscriber":return"Can we ask you a few questions? It should only take a few minutes.";case"presubscription":return"We'd love to hear your thoughts. It should only take a few minutes.";case"precancel":return"We'd love to hear your thoughts. It should only take a few minutes."}},N=()=>navigator.languages&&navigator.languages.length?navigator.languages[0]:navigator.userLanguage||navigator.language||navigator.browserLanguage||null,F=(e,t)=>(0,v.default)(e).alpha(t).string(),W=e=>(0,v.default)(e).isDark(),y=(...e)=>e.filter(Boolean).join(" ");var h=k(require("react")),c=require("goober");var $=(0,c.styled)("div")`
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
`,G=(0,c.keyframes)(`
0% {opacity:.5;}
100% {opacity:1;}
`),H=(0,c.styled)("div")`
  background-color: ${e=>e.isdark==="1"?"rgba(0, 0, 0, 0.2)":"rgba(255, 255, 255, 0.2)"};
  backdrop-filter: blur(5px);
  animation: ${G} 150ms ease-in-out forwards;

  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`,S=({isDark:e,className:t,children:n})=>h.default.createElement(H,{isdark:e?"1":"0",className:t},n),j=`
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
`,E=({backgroundColor:e,color:t,className:n,children:s})=>h.default.createElement(Q,{bgcolor:e,color:t,className:n},s),X=(0,c.styled)("div")`
  ${j}
  animation: ${A} 150ms ease-in-out forwards;

  height: 80vh;
  max-width: 600px;
  background-color: ${e=>e.bgcolor||"white"};
  position: relative;
`,q=({backgroundColor:e,className:t,children:n})=>h.default.createElement(X,{bgcolor:e,className:t},n),x={title:c.css`
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
`};(0,M.setup)(r.default.createElement);var u=(0,L.create)(e=>({state:"closed",options:null,openConsent:t=>e({state:"confirming",options:t}),close:()=>e({state:"closed",options:null})})),P=e=>{let t={slug:e.slug,uid:e.userId,email:e.userEmail,ait:e.aiType,brloc:N()};B.get("sessions/consent",t,e.apiKey).catch(n=>{console.error("Failed to fetch sessions/consent: ",n)})},ee=({options:e})=>{(0,r.useEffect)(()=>{let n=s=>{if(new URL(s.origin).hostname===R)try{JSON.parse(s.data).type==="close"&&C("close")}catch(l){console.error("Failed to parse data: ",l)}};return window.addEventListener("message",n),()=>{window.removeEventListener("message",n)}},[e]);let t=(0,r.useMemo)(()=>{let n={ait:e.aiType,uid:e.userId,email:e.userEmail,iframe:"true",hideclose:"true"};return`${O}/chat/${e.slug}?${Object.entries(n).filter(([i,l])=>l!==void 0).map(([i,l])=>`${i}=${encodeURIComponent(String(l))}`).join("&")}`+(e.apiKey?"#apiKey="+e.apiKey:"")},[e]);return r.default.createElement(r.default.Fragment,null,r.default.createElement("iframe",{src:t,width:"100%",height:"100%",style:{border:"none",display:"block"}}),r.default.createElement("div",{style:{position:"absolute",top:16,right:10,height:32,width:32,display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"},onClick:()=>{confirm("Are you sure you want to close the chat?")&&C("close")}},r.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 -960 960 960",width:"24px",fill:"#5f6368"},r.default.createElement("path",{d:"m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"}))))},g=!1,te=()=>{let{state:e,options:t}=u();(0,r.useEffect)(()=>(g=!0,()=>{g=!1}),[]);let n=r.default.useRef(!1);if((0,r.useEffect)(()=>{!t||n.current||e==="confirming"&&P(t)},[t,e]),e==="closed")return null;if(!t)return console.error("No options provided"),null;let{aiType:s,title:i,description:l,primaryButtonText:b,cancelButtonText:d,colors:o,classNames:a}=t,w=o!=null&&o.background?W(o.background):!1;return e==="confirming"?r.default.createElement(S,{isDark:w,className:a==null?void 0:a.overlay},r.default.createElement(E,{backgroundColor:o==null?void 0:o.background,color:o==null?void 0:o.text,className:a==null?void 0:a.modal},r.default.createElement("div",{className:y(x.title)},i||D(s)),r.default.createElement("div",{className:y(x.description)},l||T(s)),r.default.createElement("div",{className:y(x.buttons)},r.default.createElement($,{onClick:()=>{C("cancel-consent")},role:"button",tabIndex:0,bgcolor:"transparent",color:(o==null?void 0:o.text)||"#000",secondarycolor:(o==null?void 0:o.text)||"#000"},d||"Not right now"),r.default.createElement($,{onClick:()=>{u.setState({state:"open"})},bgcolor:o==null?void 0:o.primary,color:w?o==null?void 0:o.text:o==null?void 0:o.background,role:"button",tabIndex:0},b||"Let's chat!")))):r.default.createElement(S,{isDark:w,className:a==null?void 0:a.overlay},r.default.createElement(q,{backgroundColor:o==null?void 0:o.background,className:a==null?void 0:a.modal},r.default.createElement(ee,{options:t})))},p=null,oe=e=>{if(g||console.error("ResubscribeComponent is not mounted"),u.getState().state!=="closed"){console.warn("ResubscribeComponent is already open");return}u.setState({state:"confirming",options:e}),e.onClose&&(p=e.onClose)},C=e=>{g||console.error("ResubscribeComponent is not mounted"),u.setState({state:"closed",options:null}),p&&(p(e),p=null)},m=null,ne=e=>{m=e},re=e=>{if(!m){console.error("No headless options set");return}if(g||console.error("ResubscribeComponent is not mounted"),u.getState().state!=="closed"){console.warn("ResubscribeComponent is already open");return}let t={...m,...e};u.setState({state:"open",options:t}),t.onClose&&(p=t.onClose)},se=()=>{if(!m){console.error("No headless options set");return}P(m)},ie={Component:te,openWithConsent:oe,close:C,headless:{setOptions:ne,openChat:re,registerConsentRequest:se}};
//# sourceMappingURL=index.js.map