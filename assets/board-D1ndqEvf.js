import{_ as W,G as J,r as m,C as P,D as G,o as $,z as X,w as _,b as s,y as q,J as T,c as R,F as z,I as D,A as w,t as L,f as k,V as re,H as j,v as ee,e as n,M as I,N as v,W as ce,X as Q,Y as ie,Z as ue,h as de,U as pe,$ as ge,S as me}from"./index-BiM0nisx.js";/* empty css                   *//* empty css                 *//* empty css                  */import ve from"./searchTypes-BLvdJAGL.js";const fe="/home/assets/hand-up-DIAiWQej.svg",he="/home/assets/hand-down-ERN56488.svg",Y="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%20viewBox='0%200%201600%201600'%3e%3cdefs%3e%3cstyle%3e%20.cls-1,%20.cls-2,%20.cls-3%20{%20stroke:%20%23000;%20}%20.cls-1,%20.cls-4%20{%20fill:%20none;%20}%20.cls-5%20{%20fill:%20%23eecabc;%20}%20.cls-2,%20.cls-6%20{%20fill:%20red;%20}%20.cls-2,%20.cls-3%20{%20stroke-width:%2016px;%20}%20.cls-2,%20.cls-3,%20.cls-4%20{%20stroke-miterlimit:%2010;%20}%20.cls-7%20{%20fill:%20%23fff;%20}%20.cls-3%20{%20opacity:%20.5;%20}%20.cls-8%20{%20display:%20none;%20}%20.cls-9%20{%20fill:%20%23bf0000;%20}%20.cls-4%20{%20stroke:%20red;%20stroke-width:%2099px;%20}%20%3c/style%3e%3c/defs%3e%3cg%3e%3cg%20id='bottom'%3e%3cpolygon%20class='cls-6'%20points='100%201272.9%20100%201572.9%201500%201572.9%201500%201272.9%201450%201272.9%201450%201522.9%20150%201522.9%20150%201272.9%20100%201272.9'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e",_e={class:"role-options"},ye={__name:"roleSelector",props:{currentRole:{type:String,default:""},placement:{type:String,default:"right"}},emits:["update:role"],setup(O,{emit:b}){const i=O,p=J(()=>i.placement),a=b,o=m(!1),y=P(),{selectedMode:f}=G(y),x=J(()=>{var u;return[...((u=f.value)==null?void 0:u.roles)||[],{text:"神",color:"gold"},{text:"好人",color:"gold"},{text:"金水",color:"gold"},{text:"银水",color:"gold"},{text:"警1",color:"green"},{text:"警2",color:"green"},{text:"警3",color:"green"},{text:"X",color:"green"},{text:"你",color:"purple"}]}),V=J(()=>{var u;const g=x.value.find(r=>r.text===i.currentRole)||{color:"gray"};return["hexagon",i.currentRole?`hexagon-${g.color}`:"hexagon-gray",((u=i.currentRole)==null?void 0:u.length)===1?"hexagon-one":"hexagon-two",{active:o.value}]}),E=g=>{i.currentRole===g?(a("update:role",""),o.value=!1):(a("update:role",g),o.value=!1)};return(g,u)=>($(),X(w(re),{visible:o.value,"onUpdate:visible":u[0]||(u[0]=r=>o.value=r),placement:p.value,width:160,trigger:"click"},{reference:_(()=>[s("div",{class:q(V.value)},T(O.currentRole||"未选"),3)]),default:_(()=>[s("div",_e,[($(!0),R(z,null,D(x.value,r=>($(),X(w(L),{key:r.text,size:"small",class:q([`hexagon-${r.color}`,"role-button"]),onClick:C=>E(r.text)},{default:_(()=>[k(T(r.text),1)]),_:2},1032,["class","onClick"]))),128))])]),_:1},8,["visible","placement"]))}},Z=W(ye,[["__scopeId","data-v-89bf5ff8"]]),Se={class:"game-settings"},xe={class:"game-settings-search"},we={class:"actions"},$e={__name:"gameSettings",emits:["update-config"],setup(O,{expose:b,emit:i}){const p=i,a=P(),{gameModes:o}=G(a),y=m(JSON.parse(JSON.stringify(o.value))),f=m(!1),x=()=>{I.confirm("确定要保存当前配置吗？这将覆盖之前的配置。","保存确认",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{V()}).catch(()=>{v({type:"info",message:"已取消保存",duration:500})})},V=()=>{p("update-config",o.value),y.value=JSON.parse(JSON.stringify(o.value)),f.value=!1,v({type:"success",message:"配置已保存",duration:500})},E=()=>{I.confirm("确定要重置所有配置吗？这将丢失所有未保存的更改。","重置确认",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{g()}).catch(()=>{v({type:"info",message:"已取消重置",duration:500})})},g=()=>{a.resetToOriginal(),o.value=JSON.parse(JSON.stringify(a.gameModes)),y.value=JSON.parse(JSON.stringify(o.value)),f.value=!1,v({type:"warning",message:"配置已重置",duration:500})};return j(o,()=>{f.value=JSON.stringify(o.value)!==JSON.stringify(y.value)},{deep:!0}),ee(()=>{}),b({handleClose:r=>{f.value?I.confirm("有未保存的更改，是否保存？","确认",{confirmButtonText:"保存",cancelButtonText:"不保存",type:"warning",distinguishCancelAndClose:!0}).then(()=>{V(),r(!0)}).catch(C=>{C==="cancel"?(f.value=!1,r(!0)):r(!1)}):r(!0)}}),(r,C)=>{const B=L;return $(),R("div",Se,[s("div",xe,[n(ve)]),s("div",we,[n(B,{onClick:x,type:"primary",disabled:!f.value},{default:_(()=>[k("保存")]),_:1},8,["disabled"]),n(B,{onClick:E,type:"warning"},{default:_(()=>[k("重置")]),_:1})])])}}},ke=W($e,[["__scopeId","data-v-4cde12ca"]]),be={xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 24 24"},Ve=s("path",{d:"M12.5 2a.5.5 0 0 0-.5.5V12h-2V4.5a.5.5 0 0 0-1 0V14H7c-.38-1.62-1.358-2.56-2.405-2.678A89 89 0 0 0 6.166 15.1c.86 1.962 1.725 3.422 2.838 4.399C10.078 20.442 11.459 21 13.5 21a5.5 5.5 0 0 0 5.5-5.5V7a.5.5 0 0 0-1 0v5h-2V4a.5.5 0 0 0-1 0v8h-2V2.5a.5.5 0 0 0-.5-.5M21 15.5a7.5 7.5 0 0 1-7.5 7.5c-2.458 0-4.328-.692-5.816-1.998-1.45-1.274-2.459-3.064-3.35-5.1-.93-2.127-1.444-3.422-1.724-4.178-.357-.964.136-2.312 1.476-2.406a4.02 4.02 0 0 1 2.914.94V4.5a2.5 2.5 0 0 1 3.04-2.442 2.5 2.5 0 0 1 4.79-.467A2.502 2.502 0 0 1 18 4v.55q.243-.05.5-.05A2.5 2.5 0 0 1 21 7z"},null,-1),Ce=[Ve];function Be(O,b){return $(),R("svg",be,[...Ce])}const Re={render:Be},Ie={class:"outBox"},Oe={class:"topText"},Ee={class:"note note-top"},Te={class:"note"},Ne={class:"players-container"},Ue={class:"players-column"},Me={class:"messageInfo"},Je={class:"messageInfo-left"},ze=["src","alt","title","onClick"],je={class:"player-number"},Ae={class:"messageInfo-right"},De={class:"players-column"},We={class:"messageInfo"},Pe={class:"messageInfo-left"},Ge=["src","alt","title","onClick"],Le={class:"player-number"},Fe={class:"messageInfo-right"},He={class:"dialog-footer"},Ke={__name:"board",setup(O){const b=P(),{selectedMode:i}=G(b),p=m(""),a=m(Object.fromEntries(Array.from({length:12},(e,l)=>[`player${String(l+1).padStart(2,"0")}`,{election:3,flag:!0,message:"",sign:"",status:1}]))),o=m(!1),y=m(""),f=J(()=>i.value?i.value.phrases:[]),x=m(!1),V=()=>{x.value=!0},E=m(!1),g=m(null),u=m("50%"),r=m(window.innerWidth),C=()=>{r.value>=768?u.value="50%":u.value="80%"};j(r,e=>{C()}),ee(()=>{const e=localStorage.getItem("remarks");e&&(p.value=e);const l=localStorage.getItem("chatRecords");l&&Object.assign(a.value,JSON.parse(l)),C();const h=()=>{r.value=window.innerWidth};window.addEventListener("resize",h)});const B=e=>{const l=a.value[e];l.message=l.message.trim(),p.value=p.value.trim()};j(p,e=>{localStorage.setItem("remarks",e)},{deep:!0}),j(a,e=>{localStorage.setItem("chatRecords",JSON.stringify(e))},{deep:!0});const F=(e,l)=>{a.value[e].sign=l};function H(e){switch(e){case 1:return fe;case 2:return he;case 3:return Y;default:return Y}}function N(e){switch(e){case 1:return"警上刚手";case 2:return"警上放手";case 3:return"警下";default:return"警下"}}function K(e){e.election=e.election%3+1}const te=()=>{I.confirm("确定要重置自记信息吗？","重置自记信息",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(()=>{p.value="",v({type:"success",message:"自记信息已重置",duration:500})}).catch(()=>{v({type:"info",message:"已取消重置",duration:500})})},ae=()=>{I.confirm("确定要重置所有玩家的发言内容吗？","重置发言信息",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(()=>{Object.keys(a.value).forEach(e=>{a.value[e].message="",a.value[e].sign="",a.value[e].election=3}),v({type:"success",message:"所有发言信息已重置",duration:500})}).catch(()=>{v({type:"info",message:"已取消重置",duration:500})})},se=()=>{I.confirm("确定要使所有玩家更新为上警举手状态吗？","一键上警",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(()=>{Object.keys(a.value).forEach(e=>{a.value[e].election=1}),v({type:"success",message:"所有玩家已上警",duration:500})}).catch(()=>{v({type:"info",message:"已取消更新",duration:500})})},le=()=>{let e=`版型：${i.value?i.value.name:"未选择"}
`;e+=`♫♪♫♪♫♪♫♪♫♪♫♪♫♪
`,e+=`自记信息：
${p.value.trim()}
`,e+=`♫♪♫♪♫♪♫♪♫♪♫♪♫♪
`;const l=Object.entries(a.value).filter(([S,d])=>d.election===1||d.election===2).map(([S,d])=>S.slice(-2)),h=Object.entries(a.value).filter(([S,d])=>d.election===3).map(([S,d])=>S.slice(-2));l.length>0&&(l.length===12?e+=`（全员上警）
`:(e+=`警上：[${l.join(",")}]
`,e+=`警下：[${h.join(",")}]
`),e+=`♫♪♫♪♫♪♫♪♫♪♫♪♫♪
`),e+=`发言信息：
`;const U=h.length===12;Object.entries(a.value).forEach(([S,d])=>{const M=S.slice(-2);let t="";U||(t=d.election===1||d.election===2?"*":"_");const c=d.message.split(`
`);if(c.length>0){e+=`[${M}]${t} ${c[0]}
`;for(let A=1;A<c.length;A++)e+=`   	 ${c[A]}
`}}),y.value=e.trim(),o.value=!0},ne=()=>{navigator.clipboard.writeText(y.value).then(()=>{v({message:"信息已复制到剪贴板",type:"success",duration:2e3}),o.value=!1}).catch(()=>{v({message:"复制失败，请手动复制",type:"error",duration:2e3})})},oe=e=>{g.value?g.value.handleClose(l=>{l&&(E.value=!1,e())}):e()};return(e,l)=>{const h=L,U=de,S=pe,d=ge,M=me;return $(),R(z,null,[s("div",Ie,[s("div",Oe,[k(" 当前版型："),s("a",{href:"#",onClick:ce(V,["prevent"])},T(w(i)?w(i).name:"点击选择"),1)]),s("div",Ee,[s("h2",null,[k("自记信息 "),n(h,{plain:"",type:"primary",onClick:te,size:"small",icon:w(Q),class:"reset-button"},null,8,["icon"]),n(h,{plain:"",type:"primary",onClick:le,size:"small",icon:w(ie),class:"reset-button"},null,8,["icon"])]),n(U,{modelValue:p.value,"onUpdate:modelValue":l[0]||(l[0]=t=>p.value=t),type:"textarea",class:"note-textarea",rows:4,placeholder:"请输入自记信息",onBlur:l[1]||(l[1]=t=>B(null))},null,8,["modelValue"])]),s("div",Te,[s("h2",null,[k("发言信息 "),n(h,{plain:"",type:"primary",onClick:ae,size:"small",icon:w(Q),class:"reset-button"},null,8,["icon"]),n(h,{plain:"",type:"primary",onClick:se,size:"small",class:"reset-button"},{default:_(()=>[n(S,null,{default:_(()=>[n(w(Re))]),_:1})]),_:1})]),s("div",Ne,[s("div",Ue,[($(),R(z,null,D(6,t=>s("div",{key:`player${t}`,class:"player-item"},[s("div",Me,[s("div",Je,[s("img",{src:H(a.value[`player${String(t).padStart(2,"0")}`].election),alt:N(a.value[`player${String(t).padStart(2,"0")}`].election),title:N(a.value[`player${String(t).padStart(2,"0")}`].election),onClick:c=>K(a.value[`player${String(t).padStart(2,"0")}`])},null,8,ze),s("div",je,T(String(t).padStart(2,"0")),1),n(Z,{currentRole:a.value[`player${String(t).padStart(2,"0")}`].sign,"onUpdate:role":c=>F(`player${String(t).padStart(2,"0")}`,c),placement:"right"},null,8,["currentRole","onUpdate:role"])]),s("div",Ae,[n(d,{modelValue:a.value[`player${String(t).padStart(2,"0")}`].message,"onUpdate:modelValue":c=>a.value[`player${String(t).padStart(2,"0")}`].message=c,type:"textarea",class:"note-textarea",rows:3,placeholder:`请输入${t}号玩家发言信息`,prefix:["A","C"],options:f.value,onBlur:c=>B(`player${String(t).padStart(2,"0")}`)},null,8,["modelValue","onUpdate:modelValue","placeholder","options","onBlur"])])])])),64))]),s("div",De,[($(),R(z,null,D(6,t=>s("div",{key:`player${t+6}`,class:"player-item"},[s("div",We,[s("div",Pe,[s("img",{src:H(a.value[`player${String(t+6).padStart(2,"0")}`].election),alt:N(a.value[`player${String(t+6).padStart(2,"0")}`].election),title:N(a.value[`player${String(t+6).padStart(2,"0")}`].election),onClick:c=>K(a.value[`player${String(t+6).padStart(2,"0")}`])},null,8,Ge),s("div",Le,T(String(t+6).padStart(2,"0")),1),n(Z,{currentRole:a.value[`player${String(t+6).padStart(2,"0")}`].sign,"onUpdate:role":c=>F(`player${String(t+6).padStart(2,"0")}`,c),placement:"left"},null,8,["currentRole","onUpdate:role"])]),s("div",Fe,[n(d,{modelValue:a.value[`player${String(t+6).padStart(2,"0")}`].message,"onUpdate:modelValue":c=>a.value[`player${String(t+6).padStart(2,"0")}`].message=c,type:"textarea",class:"note-textarea",rows:3,placeholder:`请输入${t+6}号玩家发言信息`,prefix:["A","C"],options:f.value,onBlur:c=>B(`player${String(t+6).padStart(2,"0")}`)},null,8,["modelValue","onUpdate:modelValue","placeholder","options","onBlur"])])])])),64))])])]),n(M,{modelValue:x.value,"onUpdate:modelValue":l[2]||(l[2]=t=>x.value=t),title:"设置","close-on-click-modal":!1,"close-on-press-escape":!1,"before-close":oe,class:"settings-dialog",width:"40%"},{default:_(()=>[n(ke,{ref_key:"gameSettingsRef",ref:g},null,512)]),_:1},8,["modelValue"])]),n(M,{modelValue:o.value,"onUpdate:modelValue":l[4]||(l[4]=t=>o.value=t),title:"导出信息","close-on-click-modal":!1,style:ue({width:u.value})},{footer:_(()=>[s("span",He,[n(h,{type:"primary",onClick:ne},{default:_(()=>[k(" 复制到剪贴板 ")]),_:1})])]),default:_(()=>[n(U,{modelValue:y.value,"onUpdate:modelValue":l[3]||(l[3]=t=>y.value=t),type:"textarea",rows:24,class:"export-textarea"},null,8,["modelValue"])]),_:1},8,["modelValue","style"])],64)}}},et=W(Ke,[["__scopeId","data-v-ea5e795f"]]);export{et as B};
