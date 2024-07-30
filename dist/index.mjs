"use client";
import n,{useEffect as $,useMemo as Y}from"react";import{setup as J}from"goober";import{create as Z}from"zustand";import S from"color";var I="https://app.resubscribe.ai",L="https://api.resubscribe.ai",O="app.resubscribe.ai",R={get:async(e,o)=>{let r={};Object.entries(o).forEach(([d,u])=>{u&&(r[d]=u)});let a=Object.entries(r).map(([d,u])=>`${d}=${encodeURIComponent(u)}`).join("&"),c=`${L}/v1/${e}?${a}`,i=await fetch(c,{cache:"no-cache",headers:{Accept:"application/json","Content-Type":"application/json"}});if(!i.ok)throw new Error(`Failed to fetch ${c}`);return i.json()}},B=e=>{switch(e){case"intent":return"Not ready to pay?";case"churn":return"We're sorry to see you go";case"delete":return"We're sorry to see you go";case"subscriber":return"Would you like to tell us about your experience?";case"presubscription":return"Can we ask you a few questions?";case"precancel":return"Can we ask you a few questions?"}},D=e=>{switch(e){case"intent":return"Can we ask you a few questions? It should only take a few minutes.";case"churn":return"Can we ask you a few questions? It should only take a few minutes.";case"delete":return"Can we ask you a few questions? It should only take a few minutes.";case"subscriber":return"Can we ask you a few questions? It should only take a few minutes.";case"presubscription":return"We'd love to hear your thoughts. It should only take a few minutes.";case"precancel":return"We'd love to hear your thoughts. It should only take a few minutes."}},T=()=>navigator.languages&&navigator.languages.length?navigator.languages[0]:navigator.userLanguage||navigator.language||navigator.browserLanguage||null,N=(e,o)=>S(e).alpha(o).string(),F=e=>S(e).isDark(),b=(...e)=>e.filter(Boolean).join(" ");import w from"react";import{styled as f,keyframes as W,css as C}from"goober";var k=f("div")`
  flex: 1;
  text-align: center;
  padding: 0.5rem 0.75rem;
  background-color: ${e=>e.bgcolor||"#000"};
  color: ${e=>e.color||"#fff"};
  ${e=>e.secondarycolor?`
    border-width: 1px;
    border-style: solid;
    border-color: ${N(e.secondaryColor,.3)||"#d4d7de"};
  `:`
    border: none;
  `}
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
`,P=W(`
0% {opacity:.5;}
100% {opacity:1;}
`),U=f("div")`
  background-color: ${e=>e.isdark==="1"?"rgba(0, 0, 0, 0.2)":"rgba(255, 255, 255, 0.2)"};
  backdrop-filter: blur(5px);
  animation: ${P} 150ms ease-in-out forwards;

  position: 'fixed';
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`,v=({isDark:e,className:o,children:r})=>w.createElement(U,{isdark:e?"1":"0",className:o},r),j=`
flex: 1;
margin-left: 4px;
margin-right: 4px;
border-radius: 8px;
overflow: hidden;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`,A=W(`
0% {transform: translateY(-4px); opacity:.5;}
100% {transform: translateY(0px); opacity:1;}
`),z=f("div")`
  ${j}
  animation: ${A} 150ms ease-in-out forwards;

  padding: 1.25rem;
  max-width: 28rem;
  background-color: ${e=>e.bgcolor||"white"};
  color: ${e=>e.color||"#111827"};

  @media (min-width: 576px) {
    padding: 1.5rem;
  }
`,E=({backgroundColor:e,color:o,className:r,children:a})=>w.createElement(z,{bgcolor:e,color:o,className:r},a),V=f("div")`
  ${j}
  animation: ${A} 150ms ease-in-out forwards;

  height: 80vh;
  max-width: 600px;
  background-color: ${e=>e.bgcolor||"white"};
  position: relative;
`,q=({backgroundColor:e,className:o,children:r})=>w.createElement(V,{bgcolor:e,className:o},r),h={title:C`
font-size: 1.25rem;
font-weight: 600;
text-align: center;
`,description:C`
margin-top: 1rem;
font-size: 1rem;
text-align: center;
opacity: 0.8;
`,buttons:C`
margin-top: 1.5rem;
display: flex;
flex-direction: column;
gap: 0.75rem;

@media (min-width: 576px) {
  flex-direction: row;
}
`};J(n.createElement);var l=Z(e=>({state:"closed",options:null,openConsent:o=>e({state:"confirming",options:o}),close:()=>e({state:"closed",options:null})})),M=e=>{let o={slug:e.slug,uid:e.userId,email:e.userEmail,ait:e.aiType,brloc:T()};R.get("sessions/consent",o).catch(r=>{console.error("Failed to fetch sessions/consent: ",r)})},_=({options:e})=>{$(()=>{let r=a=>{if(new URL(a.origin).hostname===O)try{JSON.parse(a.data).type==="close"&&y("close")}catch(i){console.error("Failed to parse data: ",i)}};return window.addEventListener("message",r),()=>{window.removeEventListener("message",r)}},[e]);let o=Y(()=>{let r={ait:e.aiType,uid:e.userId,email:e.userEmail,iframe:"true",hideclose:"true"};return`${I}/chat/${e.slug}?${Object.entries(r).filter(([c,i])=>i!==void 0).map(([c,i])=>`${c}=${encodeURIComponent(String(i))}`).join("&")}`},[e]);return n.createElement(n.Fragment,null,n.createElement("iframe",{src:o,width:"100%",height:"100%",style:{border:"none",display:"block"}}),n.createElement("div",{style:{position:"absolute",top:16,right:10,height:32,width:32,display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"},onClick:()=>{confirm("Are you sure you want to close the chat?")&&y("close")}},n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 -960 960 960",width:"24px",fill:"#5f6368"},n.createElement("path",{d:"m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"}))))},g=!1,G=()=>{let{state:e,options:o}=l();$(()=>(g=!0,()=>{g=!1}),[]);let r=n.useRef(!1);if($(()=>{!o||r.current||e==="confirming"&&M(o)},[o,e]),e==="closed")return null;if(!o)return console.error("No options provided"),null;let{aiType:a,title:c,description:i,primaryButtonText:d,cancelButtonText:u,colors:t,classNames:s}=o,x=t!=null&&t.background?F(t.background):!1;return e==="confirming"?n.createElement(v,{isDark:x,className:s==null?void 0:s.overlay},n.createElement(E,{backgroundColor:t==null?void 0:t.background,color:t==null?void 0:t.text,className:s==null?void 0:s.modal},n.createElement("div",{className:b(h.title)},c||B(a)),n.createElement("div",{className:b(h.description)},i||D(a)),n.createElement("div",{className:b(h.buttons)},n.createElement(k,{onClick:()=>{y("cancel-consent")},role:"button",tabIndex:0,bgcolor:"transparent",color:(t==null?void 0:t.text)||"#000",secondarycolor:(t==null?void 0:t.text)||"#000"},u||"Not right now"),n.createElement(k,{onClick:()=>{l.setState({state:"open"})},bgcolor:t==null?void 0:t.primary,color:x?t==null?void 0:t.text:t==null?void 0:t.background,role:"button",tabIndex:0},d||"Let's chat!")))):n.createElement(v,{isDark:x,className:s==null?void 0:s.overlay},n.createElement(q,{backgroundColor:t==null?void 0:t.background,className:s==null?void 0:s.modal},n.createElement(_,{options:o})))},p=null,H=e=>{if(g||console.error("ResubscribeComponent is not mounted"),l.getState().state!=="closed"){console.warn("ResubscribeComponent is already open");return}l.setState({state:"confirming",options:e}),e.onClose&&(p=e.onClose)},y=e=>{g||console.error("ResubscribeComponent is not mounted"),l.setState({state:"closed",options:null}),p&&(p(e),p=null)},m=null,K=e=>{m=e},Q=e=>{if(!m){console.error("No headless options set");return}if(g||console.error("ResubscribeComponent is not mounted"),l.getState().state!=="closed"){console.warn("ResubscribeComponent is already open");return}let o={...m,...e};l.setState({state:"open",options:o}),o.onClose&&(p=o.onClose)},X=()=>{if(!m){console.error("No headless options set");return}M(m)},me={Component:G,openWithConsent:H,close:y,headless:{setOptions:K,openChat:Q,registerConsentRequest:X}};export{me as default};
//# sourceMappingURL=index.mjs.map