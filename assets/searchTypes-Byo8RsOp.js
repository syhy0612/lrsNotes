import{_ as b,C as D,J as R,r as w,I,v as U,x as O,N as A,o as a,c as l,e as c,w as d,A as i,$ as H,a0 as J,F as V,L as z,B as u,h as K,b as v,z as j,a1 as q,y as G,a2 as y,a3 as P,a4 as Q,K as L,a5 as W,a6 as X,U as Y,V as Z,H as ee}from"./index-C37dYTTM.js";/* empty css                 */const B=_=>(Y("data-v-371d5b7e"),_=_(),Z(),_),se={class:"suffix-container"},te={key:0,class:"dropdown"},ae={key:0,class:"favorites-section"},oe=B(()=>v("div",{class:"section-title"},"收藏版型",-1)),ne=["onClick"],le={key:1,class:"others-section"},ce=B(()=>v("div",{class:"section-title"},"全部版型",-1)),ie=["onClick"],re={key:2,class:"no-results"},de={__name:"searchTypes",setup(_){const t=D(),{gameModes:p,isInitialized:ue}=R(t),o=w(""),n=w(!1),h=w(null),g=I(()=>{if(!p.value)return[];const e=o.value.toLowerCase();return p.value.filter(r=>r.name.toLowerCase().includes(e)||r.pinyin.includes(e))}),m=I(()=>g.value.filter(e=>e.isFavorite)),k=I(()=>g.value.filter(e=>!e.isFavorite)),E=()=>{o.value&&(n.value=!0)},$=()=>{n.value=!0},x=()=>{o.value="",n.value=!1},N=()=>{n.value=!n.value},F=e=>{t.selectMode(e.id),o.value=e.name,n.value=!1},M=e=>{t.toggleFavorite(e.id)},S=e=>{h.value&&!h.value.contains(e.target)&&(n.value=!1)};return U(async()=>{document.addEventListener("click",S),t.isInitialized||await t.initializeStore(),t.selectedMode&&(o.value=t.selectedMode.name)}),O(()=>{document.removeEventListener("click",S)}),A(p,e=>{e&&e.length>0&&t.selectedMode&&(o.value=t.selectedMode.name)}),(e,r)=>{const f=ee,T=K;return a(),l("div",{class:"search-container",ref_key:"containerRef",ref:h},[c(T,{modelValue:o.value,"onUpdate:modelValue":r[0]||(r[0]=s=>o.value=s),placeholder:"搜索版型...",onInput:E,onFocus:$,class:"custom-input","prefix-icon":i(Q),onClear:x},{suffix:d(()=>[v("div",se,[o.value?(a(),j(f,{key:0,class:"clear-icon el-input__clear",onClick:x},{default:d(()=>[c(i(q))]),_:1})):u("",!0),c(f,{class:G(["dropdown-icon",{"is-reverse":n.value}]),onMousedown:y(N,["prevent"])},{default:d(()=>[c(i(P))]),_:1},8,["class"])])]),_:1},8,["modelValue","prefix-icon"]),i(t).isInitialized?H((a(),l("div",te,[m.value.length>0?(a(),l("div",ae,[oe,(a(!0),l(V,null,z(m.value,s=>(a(),l("div",{key:s.id,class:"dropdown-item favorite",onClick:C=>F(s)},[v("span",null,L(s.name),1),c(f,{class:"favorite-icon",onClick:y(C=>M(s),["stop"])},{default:d(()=>[c(i(W))]),_:2},1032,["onClick"])],8,ne))),128))])):u("",!0),k.value.length>0?(a(),l("div",le,[ce,(a(!0),l(V,null,z(k.value,s=>(a(),l("div",{key:s.id,class:"dropdown-item",onClick:C=>F(s)},[v("span",null,L(s.name),1),c(f,{class:"favorite-icon",onClick:y(C=>M(s),["stop"])},{default:d(()=>[c(i(X))]),_:2},1032,["onClick"])],8,ie))),128))])):u("",!0),m.value.length===0&&k.value.length===0?(a(),l("div",re," 没有匹配版型 ")):u("",!0)],512)),[[J,n.value]]):u("",!0)],512)}}},fe=b(de,[["__scopeId","data-v-371d5b7e"]]);export{fe as default};