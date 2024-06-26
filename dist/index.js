"use client";
"use strict";var L=Object.create;var u=Object.defineProperty;var N=Object.getOwnPropertyDescriptor;var P=Object.getOwnPropertyNames;var q=Object.getPrototypeOf,E=Object.prototype.hasOwnProperty;var U=(e,t)=>{for(var r in t)u(e,r,{get:t[r],enumerable:!0})},b=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of P(t))!E.call(e,a)&&a!==r&&u(e,a,{get:()=>t[a],enumerable:!(i=N(t,a))||i.enumerable});return e};var C=(e,t,r)=>(r=e!=null?L(q(e)):{},b(t||!e||!e.__esModule?u(r,"default",{value:e,enumerable:!0}):r,e)),z=e=>b(u({},"__esModule",{value:!0}),e);var re={};U(re,{default:()=>ne});module.exports=z(re);var n=C(require("react")),s=require("goober"),T=require("zustand");var y=C(require("color")),w="https://app.resubscribe.ai",x="https://api.resubscribe.ai",v="app.resubscribe.ai",k=()=>navigator.languages&&navigator.languages.length?navigator.languages[0]:navigator.userLanguage||navigator.language||navigator.browserLanguage||null,$=(e,t)=>(0,y.default)(e).alpha(t).string(),I=e=>(0,y.default)(e).isDark(),d=(...e)=>e.filter(Boolean).join(" ");(0,s.setup)(n.default.createElement);var l=(0,T.create)(e=>({state:"closed",options:null,openConsent:t=>e({state:"confirming",options:t}),close:()=>e({state:"closed",options:null})})),V=e=>{switch(e){case"intent":return"Not ready to pay?";case"churn":return"We're sorry to see you go";case"delete":return"We're sorry to see you go";case"subscriber":return"Would you like to tell us about your experience?";case"presubscription":return"Can we ask you a few questions?";case"precancel":return"Can we ask you a few questions?"}},Y=e=>{switch(e){case"intent":return"Can we ask you a few questions? It should only take a few minutes.";case"churn":return"Can we ask you a few questions? It should only take a few minutes.";case"delete":return"Can we ask you a few questions? It should only take a few minutes.";case"subscriber":return"Can we ask you a few questions? It should only take a few minutes.";case"presubscription":return"We'd love to hear your thoughts. It should only take a few minutes.";case"precancel":return"We'd love to hear your thoughts. It should only take a few minutes."}},S=(0,s.styled)("div")`
  flex: 1;
  text-align: center;
  padding: 0.5rem 0.75rem;
  background-color: ${e=>e.bgcolor||"#000"};
  color: ${e=>e.color||"#fff"};
  ${e=>e.secondarycolor?`
    border-width: 1px;
    border-style: solid;
    border-color: ${$(e.secondaryColor,.3)||"#d4d7de"};
  `:`
    border: none;
  `}
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
`,J=`
0% {opacity:.5;}
100% {opacity:1;}
`,D=({isDark:e,children:t})=>n.default.createElement("div",{style:{...te,backgroundColor:e?"rgba(255, 255, 255, 0.2)":"rgba(0, 0, 0, 0.2)",animation:`${(0,s.keyframes)(J)} 150ms ease-in-out forwards`}},t),O=`
0% {transform: translateY(-4px); opacity:.5;}
100% {transform: translateY(0px); opacity:1;}
`,Z=(0,s.styled)("div")`
  padding: 1.25rem;
  max-width: 28rem;
  background-color: ${e=>e.bgcolor||"white"};
  color: ${e=>e.color||"#111827"};

  @media (min-width: 576px) {
    padding: 1.5rem;
  }
`,G=({backgroundColor:e,color:t,children:r})=>n.default.createElement(Z,{bgcolor:e,color:t,style:{...W,animation:`${(0,s.keyframes)(O)} 150ms ease-in-out forwards`}},r),H=(0,s.styled)("div")`
  height: 80vh;
  max-width: 600px;
  background-color: ${e=>e.bgcolor||"white"};
  position: relative;
`,K=({backgroundColor:e,children:t})=>n.default.createElement(H,{bgcolor:e,style:{...W,animation:`${(0,s.keyframes)(O)} 150ms ease-in-out forwards`}},t),Q=s.css`
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
`,R=s.css`
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
  opacity: 0.8;
`,X=s.css`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 576px) {
    flex-direction: row;
  }
`,_=({options:e})=>{(0,n.useEffect)(()=>{let r=i=>{if(new URL(i.origin).hostname===v)try{JSON.parse(i.data).type==="close"&&m("close")}catch(c){console.error("Failed to parse data: ",c)}};return window.addEventListener("message",r),()=>{window.removeEventListener("message",r)}},[e]);let t=(0,n.useMemo)(()=>{let r={ait:e.aiType,uid:e.userId,iframe:"true",hideclose:"true"};return`${w}/chat/${e.slug}?${Object.entries(r).map(([a,c])=>`${a}=${c}`).join("&")}`},[e]);return n.default.createElement(n.default.Fragment,null,n.default.createElement("iframe",{src:t,width:"100%",height:"100%",style:{border:"none",display:"block"}}),n.default.createElement("div",{style:{position:"absolute",top:16,right:10,height:32,width:32,display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"},onClick:()=>{confirm("Are you sure you want to close the chat?")&&m("close")}},n.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 -960 960 960",width:"24px",fill:"#5f6368"},n.default.createElement("path",{d:"m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"}))))},g=!1,ee=()=>{let{state:e,options:t}=l();(0,n.useEffect)(()=>(g=!0,()=>{g=!1}),[]);let r=n.default.useRef(!1);if((0,n.useEffect)(()=>{if(!(!t||r.current)&&e==="confirming"){r.current=!0;let j={slug:t.slug,uid:t.userId,ait:t.aiType,brloc:k()},A=`${x}/v1/sessions/consent?${Object.entries(j).map(([h,B])=>`${h}=${B}`).join("&")}`;fetch(A,{cache:"no-cache",headers:{Accept:"application/json","Content-Type":"application/json"}}).catch(h=>{console.error("Failed to fetch consent: ",h)})}},[t,e]),e==="closed")return null;if(!t)return console.error("No options provided"),null;let{aiType:i,title:a,description:c,primaryButtonText:M,cancelButtonText:F,colors:o}=t,f=o!=null&&o.background?I(o.background):!1;return e==="confirming"?n.default.createElement(D,{isDark:f},n.default.createElement(G,{backgroundColor:o==null?void 0:o.background,color:o==null?void 0:o.text},n.default.createElement("div",{className:d(Q)},a||V(i)),n.default.createElement("div",{className:d(R)},c||Y(i)),n.default.createElement("div",{className:d(X)},n.default.createElement(S,{onClick:()=>{m("cancel-consent")},role:"button",tabIndex:0,bgcolor:"transparent",color:o==null?void 0:o.text,secondarycolor:o==null?void 0:o.text},F||"Not right now"),n.default.createElement(S,{onClick:()=>{l.setState({state:"open"})},bgcolor:o==null?void 0:o.primary,color:f?o==null?void 0:o.text:o==null?void 0:o.background,role:"button",tabIndex:0},M||"Let's chat!")))):n.default.createElement(D,{isDark:f},n.default.createElement(K,{backgroundColor:o==null?void 0:o.background},n.default.createElement(_,{options:t})))},te={position:"fixed",zIndex:9999,top:0,left:0,width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"},W={flex:1,marginLeft:4,marginRight:4,borderRadius:8,overflow:"hidden",boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)"},p=null,oe=e=>{if(g||console.error("ResubscribeComponent is not mounted"),l.getState().state!=="closed"){console.warn("ResubscribeComponent is already open");return}l.setState({state:"confirming",options:e}),e.onClose&&(p=e.onClose)},m=e=>{g||console.error("ResubscribeComponent is not mounted"),l.setState({state:"closed",options:null}),p&&(p(e),p=null)},ne={Component:ee,openWithConsent:oe,close:m};
//# sourceMappingURL=index.js.map