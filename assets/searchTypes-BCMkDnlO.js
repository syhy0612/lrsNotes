import{_ as T,r as d,v as h,D as $,L as M,o as a,c as t,e as l,w as m,M as O,N as R,b as u,F as b,A as j,O as w,h as U,B as k,y as A,z as F,P as L,J,K,Q as P,R as Q,S as G,T as H}from"./index-DomQjjNR.js";/* empty css                 */const S=p=>(J("data-v-53555def"),p=p(),K(),p),W={class:"dropdown"},X={key:0,class:"favorites-section"},Y=S(()=>u("div",{class:"section-title"},"收藏",-1)),Z=["onClick"],ee={key:1,class:"others-section"},ne=S(()=>u("div",{class:"section-title"},"其他",-1)),se=["onClick"],ie={key:2,class:"no-results"},ae={__name:"searchTypes",setup(p){const o=d(""),i=d(!1),C=d(null),v=d(null),V=d([{id:1,name:"狼美人骑士",pinyin:"lmrqs"},{id:2,name:"觉醒之夜",pinyin:"jxzy"},{id:3,name:"觉醒孤独少女",pinyin:"jxgdsn"},{id:4,name:"觉醒狼王",pinyin:"jxlw"},{id:5,name:"迷雾鸦影",pinyin:"mwyy"},{id:6,name:"咒狐乌鸦",pinyin:"zhwy"},{id:7,name:"孤独少女",pinyin:"gdsn"},{id:8,name:"永序之轮",pinyin:"yxzl"},{id:9,name:"狼王守卫",pinyin:"lwsw"},{id:10,name:"寻香识命",pinyin:"xxsm"},{id:11,name:"猎日逐光",pinyin:"lrzg"},{id:12,name:"时波之乱",pinyin:"sbzl"},{id:13,name:"纯白夜影",pinyin:"cbyy"},{id:14,name:"动物梦境",pinyin:"dwmj"},{id:15,name:"白狼王守卫",pinyin:"blwsw"},{id:16,name:"狼王摄梦人",pinyin:"lwsmr"},{id:17,name:"狼王魔术师",pinyin:"lwmss"},{id:18,name:"恶夜骑士",pinyin:"eyqs"},{id:19,name:"白狼王骑士",pinyin:"blwqs"},{id:20,name:"石像鬼守墓人",pinyin:"sxgsmr"},{id:21,name:"赤月猎魔人",pinyin:"cylmr"},{id:22,name:"噩梦之影",pinyin:"emzy"},{id:23,name:"觉醒女巫",pinyin:"jxnw"},{id:24,name:"标准场",pinyin:"bzc"},{id:25,name:"奇迹商人",pinyin:"qjsr"},{id:26,name:"镜隐迷踪",pinyin:"jymz"},{id:27,name:"丘比特场",pinyin:"qbtc"}]),c=d([]),g=e=>{const n=c.value.findIndex(r=>r.id===e.id);n>-1?c.value.splice(n,1):c.value.push(e)},q=()=>{o.value&&(i.value=!0)},D=()=>{i.value=!0},E=()=>{o.value="",C.value=null},B=()=>{i.value=!i.value},x=e=>{C.value=e,o.value=e.name,i.value=!1},I=h(()=>{const e=o.value.toLowerCase();return V.value.filter(n=>n.name.toLowerCase().includes(e)||n.pinyin.includes(e))}),y=h(()=>I.value.filter(e=>c.value.some(n=>n.id===e.id))),_=h(()=>I.value.filter(e=>!c.value.some(n=>n.id===e.id))),z=e=>{v.value&&!v.value.contains(e.target)&&(i.value=!1)};return $(()=>{document.addEventListener("click",z)}),M(()=>{document.removeEventListener("click",z)}),(e,n)=>{const r=P,N=U;return a(),t("div",{class:"search-container",ref_key:"containerRef",ref:v},[l(N,{modelValue:o.value,"onUpdate:modelValue":n[0]||(n[0]=s=>o.value=s),placeholder:"搜索版型...",onInput:q,onFocus:D,onClear:E,class:"custom-input",clearable:""},{suffix:m(()=>[l(r,{class:"dropdown-icon",onClick:B},{default:m(()=>[l(k(Q),{class:A({"is-reverse":i.value})},null,8,["class"])]),_:1})]),_:1},8,["modelValue"]),O(u("div",W,[y.value.length>0?(a(),t("div",X,[Y,(a(!0),t(b,null,j(y.value,s=>(a(),t("div",{key:s.id,class:"dropdown-item favorite",onClick:f=>x(s)},[u("span",null,F(s.name),1),l(r,{class:"favorite-icon",onClick:L(f=>g(s),["stop"])},{default:m(()=>[l(k(G))]),_:2},1032,["onClick"])],8,Z))),128))])):w("",!0),_.value.length>0?(a(),t("div",ee,[ne,(a(!0),t(b,null,j(_.value,s=>(a(),t("div",{key:s.id,class:"dropdown-item",onClick:f=>x(s)},[u("span",null,F(s.name),1),l(r,{class:"favorite-icon",onClick:L(f=>g(s),["stop"])},{default:m(()=>[l(k(H))]),_:2},1032,["onClick"])],8,se))),128))])):w("",!0),y.value.length===0&&_.value.length===0?(a(),t("div",ie," 没有匹配结果 ")):w("",!0)],512),[[R,i.value]])],512)}}},oe=T(ae,[["__scopeId","data-v-53555def"]]);export{oe as default};
