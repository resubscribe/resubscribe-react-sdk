"use client";
import n,{useEffect as k,useMemo as Y}from"react";import{setup as J}from"goober";import{create as Z}from"zustand";import v from"color";var $="https://app.resubscribe.ai",P="https://api.resubscribe.ai",S="app.resubscribe.ai",O={get:async(e,o)=>{let r=Object.entries(o).map(([l,a])=>`${l}=${a}`).join("&"),i=`${P}/v1/${e}?${r}`;await fetch(i,{cache:"no-cache",headers:{Accept:"application/json","Content-Type":"application/json"}})}},I=e=>{switch(e){case"intent":return"Not ready to pay?";case"churn":return"We're sorry to see you go";case"delete":return"We're sorry to see you go";case"subscriber":return"Would you like to tell us about your experience?";case"presubscription":return"Can we ask you a few questions?";case"precancel":return"Can we ask you a few questions?"}},B=e=>{switch(e){case"intent":return"Can we ask you a few questions? It should only take a few minutes.";case"churn":return"Can we ask you a few questions? It should only take a few minutes.";case"delete":return"Can we ask you a few questions? It should only take a few minutes.";case"subscriber":return"Can we ask you a few questions? It should only take a few minutes.";case"presubscription":return"We'd love to hear your thoughts. It should only take a few minutes.";case"precancel":return"We'd love to hear your thoughts. It should only take a few minutes."}},D=()=>navigator.languages&&navigator.languages.length?navigator.languages[0]:navigator.userLanguage||navigator.language||navigator.browserLanguage||null,T=(e,o)=>v(e).alpha(o).string(),N=e=>v(e).isDark(),g=(...e)=>e.filter(Boolean).join(" ");import x from"react";import{styled as m,keyframes as R,css as h}from"goober";var C=m("div")`
  flex: 1;
  text-align: center;
  padding: 0.5rem 0.75rem;
  background-color: ${e=>e.bgcolor||"#000"};
  color: ${e=>e.color||"#fff"};
  ${e=>e.secondarycolor?`
    border-width: 1px;
    border-style: solid;
    border-color: ${T(e.secondaryColor,.3)||"#d4d7de"};
  `:`
    border: none;
  `}
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
`,E=R(`
0% {opacity:.5;}
100% {opacity:1;}
`),z=m("div")`
  background-color: ${e=>e.isdark==="1"?"rgba(0, 0, 0, 0.2)":"rgba(255, 255, 255, 0.2)"};
  backdrop-filter: blur(5px);
  animation: ${E} 150ms ease-in-out forwards;

  position: 'fixed';
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`,w=({isDark:e,className:o,children:r})=>x.createElement(z,{isdark:e?"1":"0",className:o},r),W=`
flex: 1;
margin-left: 4px;
margin-right: 4px;
border-radius: 8px;
overflow: hidden;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`,F=R(`
0% {transform: translateY(-4px); opacity:.5;}
100% {transform: translateY(0px); opacity:1;}
`),U=m("div")`
  ${W}
  animation: ${F} 150ms ease-in-out forwards;

  padding: 1.25rem;
  max-width: 28rem;
  background-color: ${e=>e.bgcolor||"white"};
  color: ${e=>e.color||"#111827"};

  @media (min-width: 576px) {
    padding: 1.5rem;
  }
`,A=({backgroundColor:e,color:o,className:r,children:i})=>x.createElement(U,{bgcolor:e,color:o,className:r},i),V=m("div")`
  ${W}
  animation: ${F} 150ms ease-in-out forwards;

  height: 80vh;
  max-width: 600px;
  background-color: ${e=>e.bgcolor||"white"};
  position: relative;
`,j=({backgroundColor:e,className:o,children:r})=>x.createElement(V,{bgcolor:e,className:o},r),b={title:h`
font-size: 1.25rem;
font-weight: 600;
text-align: center;
`,description:h`
margin-top: 1rem;
font-size: 1rem;
text-align: center;
opacity: 0.8;
`,buttons:h`
margin-top: 1.5rem;
display: flex;
flex-direction: column;
gap: 0.75rem;

@media (min-width: 576px) {
  flex-direction: row;
}
`};J(n.createElement);var c=Z(e=>({state:"closed",options:null,openConsent:o=>e({state:"confirming",options:o}),close:()=>e({state:"closed",options:null})})),q=e=>{let o={slug:e.slug,uid:e.userId,ait:e.aiType,brloc:D()};O.get("sessions/consent",o).catch(r=>{console.error("Failed to fetch sessions/consent: ",r)})},G=({options:e})=>{k(()=>{let r=i=>{if(new URL(i.origin).hostname===S)try{JSON.parse(i.data).type==="close"&&f("close")}catch(a){console.error("Failed to parse data: ",a)}};return window.addEventListener("message",r),()=>{window.removeEventListener("message",r)}},[e]);let o=Y(()=>{let r={ait:e.aiType,uid:e.userId,iframe:"true",hideclose:"true"};return`${$}/chat/${e.slug}?${Object.entries(r).map(([l,a])=>`${l}=${a}`).join("&")}`},[e]);return n.createElement(n.Fragment,null,n.createElement("iframe",{src:o,width:"100%",height:"100%",style:{border:"none",display:"block"}}),n.createElement("div",{style:{position:"absolute",top:16,right:10,height:32,width:32,display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"},onClick:()=>{confirm("Are you sure you want to close the chat?")&&f("close")}},n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 -960 960 960",width:"24px",fill:"#5f6368"},n.createElement("path",{d:"m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"}))))},d=!1,H=()=>{let{state:e,options:o}=c();k(()=>(d=!0,()=>{d=!1}),[]);let r=n.useRef(!1);if(k(()=>{!o||r.current||e==="confirming"&&q(o)},[o,e]),e==="closed")return null;if(!o)return console.error("No options provided"),null;let{aiType:i,title:l,description:a,primaryButtonText:M,cancelButtonText:L,colors:t,classNames:s}=o,y=t!=null&&t.background?N(t.background):!1;return e==="confirming"?n.createElement(w,{isDark:y,className:s==null?void 0:s.overlay},n.createElement(A,{backgroundColor:t==null?void 0:t.background,color:t==null?void 0:t.text,className:s==null?void 0:s.modal},n.createElement("div",{className:g(b.title)},l||I(i)),n.createElement("div",{className:g(b.description)},a||B(i)),n.createElement("div",{className:g(b.buttons)},n.createElement(C,{onClick:()=>{f("cancel-consent")},role:"button",tabIndex:0,bgcolor:"transparent",color:t==null?void 0:t.text,secondarycolor:t==null?void 0:t.text},L||"Not right now"),n.createElement(C,{onClick:()=>{c.setState({state:"open"})},bgcolor:t==null?void 0:t.primary,color:y?t==null?void 0:t.text:t==null?void 0:t.background,role:"button",tabIndex:0},M||"Let's chat!")))):n.createElement(w,{isDark:y,className:s==null?void 0:s.overlay},n.createElement(j,{backgroundColor:t==null?void 0:t.background,className:s==null?void 0:s.modal},n.createElement(G,{options:o})))},u=null,K=e=>{if(d||console.error("ResubscribeComponent is not mounted"),c.getState().state!=="closed"){console.warn("ResubscribeComponent is already open");return}c.setState({state:"confirming",options:e}),e.onClose&&(u=e.onClose)},f=e=>{d||console.error("ResubscribeComponent is not mounted"),c.setState({state:"closed",options:null}),u&&(u(e),u=null)},p=null,Q=e=>{p=e},X=e=>{if(!p){console.error("No headless options set");return}if(d||console.error("ResubscribeComponent is not mounted"),c.getState().state!=="closed"){console.warn("ResubscribeComponent is already open");return}let o={...p,...e};c.setState({state:"open",options:o}),o.onClose&&(u=o.onClose)},_=()=>{if(!p){console.error("No headless options set");return}q(p)},me={Component:H,openWithConsent:K,close:f,headless:{setOptions:Q,openChat:X,registerConsentRequest:_}};export{me as default};
//# sourceMappingURL=index.mjs.map