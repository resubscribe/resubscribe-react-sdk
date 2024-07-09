"use client";
"use strict";var z=Object.create;var m=Object.defineProperty;var U=Object.getOwnPropertyDescriptor;var V=Object.getOwnPropertyNames;var Y=Object.getPrototypeOf,J=Object.prototype.hasOwnProperty;var Z=(e,t)=>{for(var n in t)m(e,n,{get:t[n],enumerable:!0})},S=(e,t,n,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of V(t))!J.call(e,i)&&i!==n&&m(e,i,{get:()=>t[i],enumerable:!(s=U(t,i))||s.enumerable});return e};var C=(e,t,n)=>(n=e!=null?z(Y(e)):{},S(t||!e||!e.__esModule?m(n,"default",{value:e,enumerable:!0}):n,e)),G=e=>S(m({},"__esModule",{value:!0}),e);var ae={};Z(ae,{default:()=>ie});module.exports=G(ae);var r=C(require("react")),M=require("goober"),L=require("zustand");var k=C(require("color")),O="https://app.resubscribe.ai",H="https://api.resubscribe.ai",I="app.resubscribe.ai",B={get:async(e,t)=>{let n=Object.entries(t).map(([l,x])=>`${l}=${x}`).join("&"),s=`${H}/v1/${e}?${n}`,i=await fetch(s,{cache:"no-cache",headers:{Accept:"application/json","Content-Type":"application/json"}});if(!i.ok)throw new Error(`Failed to fetch ${s}`);return i.json()}},D=e=>{switch(e){case"intent":return"Not ready to pay?";case"churn":return"We're sorry to see you go";case"delete":return"We're sorry to see you go";case"subscriber":return"Would you like to tell us about your experience?";case"presubscription":return"Can we ask you a few questions?";case"precancel":return"Can we ask you a few questions?"}},T=e=>{switch(e){case"intent":return"Can we ask you a few questions? It should only take a few minutes.";case"churn":return"Can we ask you a few questions? It should only take a few minutes.";case"delete":return"Can we ask you a few questions? It should only take a few minutes.";case"subscriber":return"Can we ask you a few questions? It should only take a few minutes.";case"presubscription":return"We'd love to hear your thoughts. It should only take a few minutes.";case"precancel":return"We'd love to hear your thoughts. It should only take a few minutes."}},N=()=>navigator.languages&&navigator.languages.length?navigator.languages[0]:navigator.userLanguage||navigator.language||navigator.browserLanguage||null,R=(e,t)=>(0,k.default)(e).alpha(t).string(),F=e=>(0,k.default)(e).isDark(),b=(...e)=>e.filter(Boolean).join(" ");var f=C(require("react")),c=require("goober");var v=(0,c.styled)("div")`
  flex: 1;
  text-align: center;
  padding: 0.5rem 0.75rem;
  background-color: ${e=>e.bgcolor||"#000"};
  color: ${e=>e.color||"#fff"};
  ${e=>e.secondarycolor?`
    border-width: 1px;
    border-style: solid;
    border-color: ${R(e.secondaryColor,.3)||"#d4d7de"};
  `:`
    border: none;
  `}
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
`,K=(0,c.keyframes)(`
0% {opacity:.5;}
100% {opacity:1;}
`),Q=(0,c.styled)("div")`
  background-color: ${e=>e.isdark==="1"?"rgba(0, 0, 0, 0.2)":"rgba(255, 255, 255, 0.2)"};
  backdrop-filter: blur(5px);
  animation: ${K} 150ms ease-in-out forwards;

  position: 'fixed';
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`,$=({isDark:e,className:t,children:n})=>f.default.createElement(Q,{isdark:e?"1":"0",className:t},n),W=`
flex: 1;
margin-left: 4px;
margin-right: 4px;
border-radius: 8px;
overflow: hidden;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`,j=(0,c.keyframes)(`
0% {transform: translateY(-4px); opacity:.5;}
100% {transform: translateY(0px); opacity:1;}
`),X=(0,c.styled)("div")`
  ${W}
  animation: ${j} 150ms ease-in-out forwards;

  padding: 1.25rem;
  max-width: 28rem;
  background-color: ${e=>e.bgcolor||"white"};
  color: ${e=>e.color||"#111827"};

  @media (min-width: 576px) {
    padding: 1.5rem;
  }
`,A=({backgroundColor:e,color:t,className:n,children:s})=>f.default.createElement(X,{bgcolor:e,color:t,className:n},s),_=(0,c.styled)("div")`
  ${W}
  animation: ${j} 150ms ease-in-out forwards;

  height: 80vh;
  max-width: 600px;
  background-color: ${e=>e.bgcolor||"white"};
  position: relative;
`,q=({backgroundColor:e,className:t,children:n})=>f.default.createElement(_,{bgcolor:e,className:t},n),y={title:c.css`
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
`};(0,M.setup)(r.default.createElement);var u=(0,L.create)(e=>({state:"closed",options:null,openConsent:t=>e({state:"confirming",options:t}),close:()=>e({state:"closed",options:null})})),P=e=>{let t={slug:e.slug,uid:e.userId,ait:e.aiType,brloc:N()};B.get("sessions/consent",t).catch(n=>{console.error("Failed to fetch sessions/consent: ",n)})},ee=({options:e})=>{(0,r.useEffect)(()=>{let n=s=>{if(new URL(s.origin).hostname===I)try{JSON.parse(s.data).type==="close"&&h("close")}catch(l){console.error("Failed to parse data: ",l)}};return window.addEventListener("message",n),()=>{window.removeEventListener("message",n)}},[e]);let t=(0,r.useMemo)(()=>{let n={ait:e.aiType,uid:e.userId,iframe:"true",hideclose:"true"};return`${O}/chat/${e.slug}?${Object.entries(n).map(([i,l])=>`${i}=${l||""}`).join("&")}`},[e]);return r.default.createElement(r.default.Fragment,null,r.default.createElement("iframe",{src:t,width:"100%",height:"100%",style:{border:"none",display:"block"}}),r.default.createElement("div",{style:{position:"absolute",top:16,right:10,height:32,width:32,display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"},onClick:()=>{confirm("Are you sure you want to close the chat?")&&h("close")}},r.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 -960 960 960",width:"24px",fill:"#5f6368"},r.default.createElement("path",{d:"m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"}))))},p=!1,te=()=>{let{state:e,options:t}=u();(0,r.useEffect)(()=>(p=!0,()=>{p=!1}),[]);let n=r.default.useRef(!1);if((0,r.useEffect)(()=>{!t||n.current||e==="confirming"&&P(t)},[t,e]),e==="closed")return null;if(!t)return console.error("No options provided"),null;let{aiType:s,title:i,description:l,primaryButtonText:x,cancelButtonText:E,colors:o,classNames:a}=t,w=o!=null&&o.background?F(o.background):!1;return e==="confirming"?r.default.createElement($,{isDark:w,className:a==null?void 0:a.overlay},r.default.createElement(A,{backgroundColor:o==null?void 0:o.background,color:o==null?void 0:o.text,className:a==null?void 0:a.modal},r.default.createElement("div",{className:b(y.title)},i||D(s)),r.default.createElement("div",{className:b(y.description)},l||T(s)),r.default.createElement("div",{className:b(y.buttons)},r.default.createElement(v,{onClick:()=>{h("cancel-consent")},role:"button",tabIndex:0,bgcolor:"transparent",color:o==null?void 0:o.text,secondarycolor:o==null?void 0:o.text},E||"Not right now"),r.default.createElement(v,{onClick:()=>{u.setState({state:"open"})},bgcolor:o==null?void 0:o.primary,color:w?o==null?void 0:o.text:o==null?void 0:o.background,role:"button",tabIndex:0},x||"Let's chat!")))):r.default.createElement($,{isDark:w,className:a==null?void 0:a.overlay},r.default.createElement(q,{backgroundColor:o==null?void 0:o.background,className:a==null?void 0:a.modal},r.default.createElement(ee,{options:t})))},d=null,oe=e=>{if(p||console.error("ResubscribeComponent is not mounted"),u.getState().state!=="closed"){console.warn("ResubscribeComponent is already open");return}u.setState({state:"confirming",options:e}),e.onClose&&(d=e.onClose)},h=e=>{p||console.error("ResubscribeComponent is not mounted"),u.setState({state:"closed",options:null}),d&&(d(e),d=null)},g=null,ne=e=>{g=e},re=e=>{if(!g){console.error("No headless options set");return}if(p||console.error("ResubscribeComponent is not mounted"),u.getState().state!=="closed"){console.warn("ResubscribeComponent is already open");return}let t={...g,...e};u.setState({state:"open",options:t}),t.onClose&&(d=t.onClose)},se=()=>{if(!g){console.error("No headless options set");return}P(g)},ie={Component:te,openWithConsent:oe,close:h,headless:{setOptions:ne,openChat:re,registerConsentRequest:se}};
//# sourceMappingURL=index.js.map