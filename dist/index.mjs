"use client";
import o,{useEffect as f,useMemo as B}from"react";import{css as h,styled as y,setup as L,keyframes as b}from"goober";import{create as N}from"zustand";import C from"color";var w="https://app.resubscribe.ai",x="https://api.resubscribe.ai",v="app.resubscribe.ai",k=()=>navigator.languages&&navigator.languages.length?navigator.languages[0]:navigator.userLanguage||navigator.language||navigator.browserLanguage||null,$=(e,n)=>C(e).alpha(n).string(),I=e=>C(e).isDark(),l=(...e)=>e.filter(Boolean).join(" ");L(o.createElement);var i=N(e=>({state:"closed",options:null,openConsent:n=>e({state:"confirming",options:n}),close:()=>e({state:"closed",options:null})})),P=e=>{switch(e){case"intent":return"Not ready to pay?";case"churn":return"We're sorry to see you go";case"delete":return"We're sorry to see you go";case"subscriber":return"Would you like to tell us about your experience?";case"presubscription":return"Can we ask you a few questions?";case"precancel":return"Can we ask you a few questions?"}},q=e=>{switch(e){case"intent":return"Can we ask you a few questions? It should only take a few minutes.";case"churn":return"Can we ask you a few questions? It should only take a few minutes.";case"delete":return"Can we ask you a few questions? It should only take a few minutes.";case"subscriber":return"Can we ask you a few questions? It should only take a few minutes.";case"presubscription":return"We'd love to hear your thoughts. It should only take a few minutes.";case"precancel":return"We'd love to hear your thoughts. It should only take a few minutes."}},S=y("div")`
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
`,E=`
0% {opacity:.5;}
100% {opacity:1;}
`,D=({isDark:e,children:n})=>o.createElement("div",{style:{...Q,backgroundColor:e?"rgba(255, 255, 255, 0.2)":"rgba(0, 0, 0, 0.2)",animation:`${b(E)} 150ms ease-in-out forwards`}},n),T=`
0% {transform: translateY(-4px); opacity:.5;}
100% {transform: translateY(0px); opacity:1;}
`,U=y("div")`
  padding: 1.25rem;
  max-width: 28rem;
  background-color: ${e=>e.bgcolor||"white"};
  color: ${e=>e.color||"#111827"};

  @media (min-width: 576px) {
    padding: 1.5rem;
  }
`,z=({backgroundColor:e,color:n,children:r})=>o.createElement(U,{bgcolor:e,color:n,style:{...O,animation:`${b(T)} 150ms ease-in-out forwards`}},r),V=y("div")`
  height: 80vh;
  max-width: 600px;
  background-color: ${e=>e.bgcolor||"white"};
  position: relative;
`,Y=({backgroundColor:e,children:n})=>o.createElement(V,{bgcolor:e,style:{...O,animation:`${b(T)} 150ms ease-in-out forwards`}},n),J=h`
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
`,Z=h`
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
  opacity: 0.8;
`,G=h`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 576px) {
    flex-direction: row;
  }
`,H=({options:e})=>{f(()=>{let r=s=>{if(new URL(s.origin).hostname===v)try{JSON.parse(s.data).type==="close"&&p("close")}catch(a){console.error("Failed to parse data: ",a)}};return window.addEventListener("message",r),()=>{window.removeEventListener("message",r)}},[e]);let n=B(()=>{let r={ait:e.aiType,uid:e.userId,iframe:"true",hideclose:"true"};return`${w}/chat/${e.slug}?${Object.entries(r).map(([c,a])=>`${c}=${a}`).join("&")}`},[e]);return o.createElement(o.Fragment,null,o.createElement("iframe",{src:n,width:"100%",height:"100%",style:{border:"none",display:"block"}}),o.createElement("div",{style:{position:"absolute",top:16,right:10,height:32,width:32,display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"},onClick:()=>{confirm("Are you sure you want to close the chat?")&&p("close")}},o.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 -960 960 960",width:"24px",fill:"#5f6368"},o.createElement("path",{d:"m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"}))))},d=!1,K=()=>{let{state:e,options:n}=i();f(()=>(d=!0,()=>{d=!1}),[]);let r=o.useRef(!1);if(f(()=>{if(!(!n||r.current)&&e==="confirming"){r.current=!0;let F={slug:n.slug,uid:n.userId,ait:n.aiType,brloc:k()},j=`${x}/v1/sessions/consent?${Object.entries(F).map(([m,A])=>`${m}=${A}`).join("&")}`;fetch(j,{cache:"no-cache",headers:{Accept:"application/json","Content-Type":"application/json"}}).catch(m=>{console.error("Failed to fetch consent: ",m)})}},[n,e]),e==="closed")return null;if(!n)return console.error("No options provided"),null;let{aiType:s,title:c,description:a,primaryButtonText:W,cancelButtonText:M,colors:t}=n,g=t!=null&&t.background?I(t.background):!1;return e==="confirming"?o.createElement(D,{isDark:g},o.createElement(z,{backgroundColor:t==null?void 0:t.background,color:t==null?void 0:t.text},o.createElement("div",{className:l(J)},c||P(s)),o.createElement("div",{className:l(Z)},a||q(s)),o.createElement("div",{className:l(G)},o.createElement(S,{onClick:()=>{p("cancel-consent")},role:"button",tabIndex:0,bgcolor:"transparent",color:t==null?void 0:t.text,secondarycolor:t==null?void 0:t.text},M||"Not right now"),o.createElement(S,{onClick:()=>{i.setState({state:"open"})},bgcolor:t==null?void 0:t.primary,color:g?t==null?void 0:t.text:t==null?void 0:t.background,role:"button",tabIndex:0},W||"Let's chat!")))):o.createElement(D,{isDark:g},o.createElement(Y,{backgroundColor:t==null?void 0:t.background},o.createElement(H,{options:n})))},Q={position:"fixed",zIndex:9999,top:0,left:0,width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"},O={flex:1,marginLeft:4,marginRight:4,borderRadius:8,overflow:"hidden",boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)"},u=null,R=e=>{if(d||console.error("ResubscribeComponent is not mounted"),i.getState().state!=="closed"){console.warn("ResubscribeComponent is already open");return}i.setState({state:"confirming",options:e}),e.onClose&&(u=e.onClose)},p=e=>{d||console.error("ResubscribeComponent is not mounted"),i.setState({state:"closed",options:null}),u&&(u(e),u=null)},re={Component:K,openWithConsent:R,close:p};export{re as default};
//# sourceMappingURL=index.mjs.map