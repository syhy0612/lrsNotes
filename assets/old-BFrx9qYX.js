import{Q as le,U as ue,aZ as He,V as Pe,a2 as oe,aK as Ke,D as te,A as k,at as de,aP as ke,E as re,av as Fe,bq as je,br as Xe,bs as Ge,bi as me,s as Q,u as G,B as z,aC as pe,J as x,K as X,N as V,X as m,a4 as f,ax as ge,ab as p,O as L,P as s,a7 as ne,a9 as q,aR as ye,aB as be,_ as se,ad as he,F as Le,a5 as N,a6 as Ce,bt as We,a$ as De,al as Ze,R as Te,ar as ie,aa as W,bu as qe,x as Je,bn as Qe,a0 as Ee,z as S,bv as eo,aE as oo,bw as to,bx as ve,Z as no,$ as so,aJ as ao,as as lo,b4 as ro,by as io,bz as uo,bA as Se,Y as Oe,aq as Ie,bB as co,w as we,bC as Be,bD as xe,au as fo,bE as mo,b7 as po,bF as vo,bG as go,bH as yo,bI as bo,bJ as ho,bK as Co,G as _o,bL as ko,b0 as Z,a8 as K,aW as To,aw as Eo,aO as So,b8 as wo,b9 as xo}from"./index-DxeyDVsE.js";import{r as Mo,E as Lo}from"./el-col-BVrjt7vP.js";import{t as Do,B as Oo,F as Io,U as Ae,y as Bo,z as Ao,A as No,D as Vo,w as Ro,u as $o,j as zo,E as Yo}from"./el-input-B7fh_LHO.js";import"element-plus";const Uo=(...e)=>t=>{e.forEach(o=>{le(o)?o(t):o.value=t})};var ae=(e=>(e[e.TEXT=1]="TEXT",e[e.CLASS=2]="CLASS",e[e.STYLE=4]="STYLE",e[e.PROPS=8]="PROPS",e[e.FULL_PROPS=16]="FULL_PROPS",e[e.HYDRATE_EVENTS=32]="HYDRATE_EVENTS",e[e.STABLE_FRAGMENT=64]="STABLE_FRAGMENT",e[e.KEYED_FRAGMENT=128]="KEYED_FRAGMENT",e[e.UNKEYED_FRAGMENT=256]="UNKEYED_FRAGMENT",e[e.NEED_PATCH=512]="NEED_PATCH",e[e.DYNAMIC_SLOTS=1024]="DYNAMIC_SLOTS",e[e.HOISTED=-1]="HOISTED",e[e.BAIL=-2]="BAIL",e))(ae||{});const Ho=(e,t,o,n)=>{let l={offsetX:0,offsetY:0};const i=v=>{const b=v.clientX,w=v.clientY,{offsetX:T,offsetY:E}=l,C=e.value.getBoundingClientRect(),M=C.left,h=C.top,B=C.width,A=C.height,c=document.documentElement.clientWidth,I=document.documentElement.clientHeight,D=-M+T,R=-h+E,g=c-M-B+T,Y=I-h-A+E,U=y=>{let P=T+y.clientX-b,F=E+y.clientY-w;n!=null&&n.value||(P=Math.min(Math.max(P,D),g),F=Math.min(Math.max(F,R),Y)),l={offsetX:P,offsetY:F},e.value&&(e.value.style.transform=`translate(${oe(P)}, ${oe(F)})`)},H=()=>{document.removeEventListener("mousemove",U),document.removeEventListener("mouseup",H)};document.addEventListener("mousemove",U),document.addEventListener("mouseup",H)},a=()=>{t.value&&e.value&&t.value.addEventListener("mousedown",i)},d=()=>{t.value&&e.value&&t.value.removeEventListener("mousedown",i)},r=()=>{l={offsetX:0,offsetY:0},e.value&&(e.value.style.transform="none")};return ue(()=>{He(()=>{o.value?a():d()})}),Pe(()=>{d()}),{resetPostion:r}},Po=(e,t={})=>{Ke(e)||Do("[useLockscreen]","You need to pass a ref param to this function");const o=t.ns||te("popup"),n=k(()=>o.bm("parent","hidden"));if(!de||ke(document.body,n.value))return;let l=0,i=!1,a="0";const d=()=>{setTimeout(()=>{Ge(document==null?void 0:document.body,n.value),i&&document&&(document.body.style.width=a)},200)};re(e,r=>{if(!r){d();return}i=!ke(document.body,n.value),i&&(a=document.body.style.width),l=Oo(o.namespace.value);const v=document.documentElement.clientHeight<document.body.scrollHeight,b=Fe(document.body,"overflowY");l>0&&(v||b==="scroll")&&i&&(document.body.style.width=`calc(100% - ${l}px)`),je(document.body,n.value)}),Xe(()=>d())},Ne=e=>{if(!e)return{onClick:me,onMousedown:me,onMouseup:me};let t=!1,o=!1;return{onClick:a=>{t&&o&&e(a),t=o=!1},onMousedown:a=>{t=a.target===a.currentTarget},onMouseup:a=>{o=a.target===a.currentTarget}}},Me={},Ko=Q({value:{type:[String,Number],default:""},max:{type:Number,default:99},isDot:Boolean,hidden:Boolean,type:{type:String,values:["primary","success","warning","info","danger"],default:"danger"},showZero:{type:Boolean,default:!0},color:String,badgeStyle:{type:G([String,Object,Array])},offset:{type:G(Array),default:[0,0]},badgeClass:{type:String}}),Fo=z({name:"ElBadge"}),jo=z({...Fo,props:Ko,setup(e,{expose:t}){const o=e,n=te("badge"),l=k(()=>o.isDot?"":pe(o.value)&&pe(o.max)?o.max<o.value?`${o.max}+`:o.value===0&&!o.showZero?"":`${o.value}`:`${o.value}`),i=k(()=>{var a,d,r,v,b;return[{backgroundColor:o.color,marginRight:oe(-((d=(a=o.offset)==null?void 0:a[0])!=null?d:0)),marginTop:oe((v=(r=o.offset)==null?void 0:r[1])!=null?v:0)},(b=o.badgeStyle)!=null?b:{}]});return t({content:l}),(a,d)=>(x(),X("div",{class:L(s(n).b())},[V(a.$slots,"default"),m(be,{name:`${s(n).namespace.value}-zoom-in-center`,persisted:""},{default:f(()=>[ge(p("sup",{class:L([s(n).e("content"),s(n).em("content",a.type),s(n).is("fixed",!!a.$slots.default),s(n).is("dot",a.isDot),a.badgeClass]),style:ne(s(i)),textContent:q(s(l))},null,14,["textContent"]),[[ye,!a.hidden&&(s(l)||a.isDot)]])]),_:1},8,["name"])],2))}});var Xo=se(jo,[["__file","badge.vue"]]);const Go=he(Xo),Wo=["start","center","end","space-around","space-between","space-evenly"],Zo=["top","middle","bottom"],qo=Q({tag:{type:String,default:"div"},gutter:{type:Number,default:0},justify:{type:String,values:Wo,default:"start"},align:{type:String,values:Zo}}),Jo=z({name:"ElRow"}),Qo=z({...Jo,props:qo,setup(e){const t=e,o=te("row"),n=k(()=>t.gutter);Le(Mo,{gutter:n});const l=k(()=>{const a={};return t.gutter&&(a.marginRight=a.marginLeft=`-${t.gutter/2}px`),a}),i=k(()=>[o.b(),o.is(`justify-${t.justify}`,t.justify!=="start"),o.is(`align-${t.align}`,!!t.align)]);return(a,d)=>(x(),N(Ce(a.tag),{class:L(s(i)),style:ne(s(l))},{default:f(()=>[V(a.$slots,"default")]),_:3},8,["class","style"]))}});var et=se(Qo,[["__file","row.vue"]]);const ot=he(et),tt=Q({mask:{type:Boolean,default:!0},customMaskEvent:Boolean,overlayClass:{type:G([String,Array,Object])},zIndex:{type:G([String,Number])}}),nt={click:e=>e instanceof MouseEvent},st="overlay";var at=z({name:"ElOverlay",props:tt,emits:nt,setup(e,{slots:t,emit:o}){const n=te(st),l=r=>{o("click",r)},{onClick:i,onMousedown:a,onMouseup:d}=Ne(e.customMaskEvent?void 0:l);return()=>e.mask?m("div",{class:[n.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:i,onMousedown:a,onMouseup:d},[V(t,"default")],ae.STYLE|ae.CLASS|ae.PROPS,["onClick","onMouseup","onMousedown"]):We("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[V(t,"default")])}});const lt=at,Ve=Symbol("dialogInjectionKey"),Re=Q({center:Boolean,alignCenter:Boolean,closeIcon:{type:De},draggable:Boolean,overflow:Boolean,fullscreen:Boolean,showClose:{type:Boolean,default:!0},title:{type:String,default:""},ariaLevel:{type:String,default:"2"}}),rt={close:()=>!0},it=z({name:"ElDialogContent"}),ut=z({...it,props:Re,emits:rt,setup(e,{expose:t}){const o=e,{t:n}=Ze(),{Close:l}=qe,{dialogRef:i,headerRef:a,bodyId:d,ns:r,style:v}=Te(Ve),{focusTrapRef:b}=Te(Io),w=k(()=>[r.b(),r.is("fullscreen",o.fullscreen),r.is("draggable",o.draggable),r.is("align-center",o.alignCenter),{[r.m("center")]:o.center}]),T=Uo(b,i),E=k(()=>o.draggable),C=k(()=>o.overflow),{resetPostion:M}=Ho(i,a,E,C);return t({resetPostion:M}),(h,B)=>(x(),X("div",{ref:s(T),class:L(s(w)),style:ne(s(v)),tabindex:"-1"},[p("header",{ref_key:"headerRef",ref:a,class:L([s(r).e("header"),{"show-close":h.showClose}])},[V(h.$slots,"header",{},()=>[p("span",{role:"heading","aria-level":h.ariaLevel,class:L(s(r).e("title"))},q(h.title),11,["aria-level"])]),h.showClose?(x(),X("button",{key:0,"aria-label":s(n)("el.dialog.close"),class:L(s(r).e("headerbtn")),type:"button",onClick:A=>h.$emit("close")},[m(s(ie),{class:L(s(r).e("close"))},{default:f(()=>[(x(),N(Ce(h.closeIcon||s(l))))]),_:1},8,["class"])],10,["aria-label","onClick"])):W("v-if",!0)],2),p("div",{id:s(d),class:L(s(r).e("body"))},[V(h.$slots,"default")],10,["id"]),h.$slots.footer?(x(),X("footer",{key:0,class:L(s(r).e("footer"))},[V(h.$slots,"footer")],2)):W("v-if",!0)],6))}});var dt=se(ut,[["__file","dialog-content.vue"]]);const ct=Q({...Re,appendToBody:Boolean,appendTo:{type:G([String,Object]),default:"body"},beforeClose:{type:G(Function)},destroyOnClose:Boolean,closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:Boolean,modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:Boolean,headerAriaLevel:{type:String,default:"2"}}),ft={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[Ae]:e=>Je(e),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},mt=(e,t)=>{var o;const l=oo().emit,{nextZIndex:i}=Qe();let a="";const d=Ee(),r=Ee(),v=S(!1),b=S(!1),w=S(!1),T=S((o=e.zIndex)!=null?o:i());let E,C;const M=eo("namespace",to),h=k(()=>{const u={},_=`--${M.value}-dialog`;return e.fullscreen||(e.top&&(u[`${_}-margin-top`]=e.top),e.width&&(u[`${_}-width`]=oe(e.width))),u}),B=k(()=>e.alignCenter?{display:"flex"}:{});function A(){l("opened")}function c(){l("closed"),l(Ae,!1),e.destroyOnClose&&(w.value=!1)}function I(){l("close")}function D(){C==null||C(),E==null||E(),e.openDelay&&e.openDelay>0?{stop:E}=ve(()=>U(),e.openDelay):U()}function R(){E==null||E(),C==null||C(),e.closeDelay&&e.closeDelay>0?{stop:C}=ve(()=>H(),e.closeDelay):H()}function g(){function u(_){_||(b.value=!0,v.value=!1)}e.beforeClose?e.beforeClose(u):R()}function Y(){e.closeOnClickModal&&g()}function U(){de&&(v.value=!0)}function H(){v.value=!1}function y(){l("openAutoFocus")}function P(){l("closeAutoFocus")}function F(u){var _;((_=u.detail)==null?void 0:_.focusReason)==="pointer"&&u.preventDefault()}e.lockScroll&&Po(v);function ce(){e.closeOnPressEscape&&g()}return re(()=>e.modelValue,u=>{u?(b.value=!1,D(),w.value=!0,T.value=Bo(e.zIndex)?i():T.value++,no(()=>{l("open"),t.value&&(t.value.scrollTop=0)})):v.value&&R()}),re(()=>e.fullscreen,u=>{t.value&&(u?(a=t.value.style.transform,t.value.style.transform=""):t.value.style.transform=a)}),ue(()=>{e.modelValue&&(v.value=!0,w.value=!0,D())}),{afterEnter:A,afterLeave:c,beforeLeave:I,handleClose:g,onModalClick:Y,close:R,doClose:H,onOpenAutoFocus:y,onCloseAutoFocus:P,onCloseRequested:ce,onFocusoutPrevented:F,titleId:d,bodyId:r,closed:b,style:h,overlayDialogStyle:B,rendered:w,visible:v,zIndex:T}},pt=z({name:"ElDialog",inheritAttrs:!1}),vt=z({...pt,props:ct,emits:ft,setup(e,{expose:t}){const o=e,n=so();ao({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},k(()=>!!n.title));const l=te("dialog"),i=S(),a=S(),d=S(),{visible:r,titleId:v,bodyId:b,style:w,overlayDialogStyle:T,rendered:E,zIndex:C,afterEnter:M,afterLeave:h,beforeLeave:B,handleClose:A,onModalClick:c,onOpenAutoFocus:I,onCloseAutoFocus:D,onCloseRequested:R,onFocusoutPrevented:g}=mt(o,i);Le(Ve,{dialogRef:i,headerRef:a,bodyId:b,ns:l,rendered:E,style:w});const Y=Ne(c),U=k(()=>o.draggable&&!o.fullscreen);return t({visible:r,dialogContentRef:d,resetPostion:()=>{d.value.resetPostion()}}),(y,P)=>(x(),N(s(No),{to:y.appendTo,disabled:y.appendTo!=="body"?!1:!y.appendToBody},{default:f(()=>[m(be,{name:"dialog-fade",onAfterEnter:s(M),onAfterLeave:s(h),onBeforeLeave:s(B),persisted:""},{default:f(()=>[ge(m(s(lt),{"custom-mask-event":"",mask:y.modal,"overlay-class":y.modalClass,"z-index":s(C)},{default:f(()=>[p("div",{role:"dialog","aria-modal":"true","aria-label":y.title||void 0,"aria-labelledby":y.title?void 0:s(v),"aria-describedby":s(b),class:L(`${s(l).namespace.value}-overlay-dialog`),style:ne(s(T)),onClick:s(Y).onClick,onMousedown:s(Y).onMousedown,onMouseup:s(Y).onMouseup},[m(s(Ao),{loop:"",trapped:s(r),"focus-start-el":"container",onFocusAfterTrapped:s(I),onFocusAfterReleased:s(D),onFocusoutPrevented:s(g),onReleaseRequested:s(R)},{default:f(()=>[s(E)?(x(),N(dt,lo({key:0,ref_key:"dialogContentRef",ref:d},y.$attrs,{center:y.center,"align-center":y.alignCenter,"close-icon":y.closeIcon,draggable:s(U),overflow:y.overflow,fullscreen:y.fullscreen,"show-close":y.showClose,title:y.title,"aria-level":y.headerAriaLevel,onClose:s(A)}),ro({header:f(()=>[y.$slots.title?V(y.$slots,"title",{key:1}):V(y.$slots,"header",{key:0,close:s(A),titleId:s(v),titleClass:s(l).e("title")})]),default:f(()=>[V(y.$slots,"default")]),_:2},[y.$slots.footer?{name:"footer",fn:f(()=>[V(y.$slots,"footer")])}:void 0]),1040,["center","align-center","close-icon","draggable","overflow","fullscreen","show-close","title","aria-level","onClose"])):W("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])],46,["aria-label","aria-labelledby","aria-describedby","onClick","onMousedown","onMouseup"])]),_:3},8,["mask","overlay-class","z-index"]),[[ye,s(r)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])]),_:3},8,["to","disabled"]))}});var gt=se(vt,[["__file","dialog.vue"]]);const yt=he(gt),$e=["success","info","warning","error"],O=Vo({customClass:"",center:!1,dangerouslyUseHTMLString:!1,duration:3e3,icon:void 0,id:"",message:"",onClose:void 0,showClose:!1,type:"info",plain:!1,offset:16,zIndex:0,grouping:!1,repeatNum:1,appendTo:de?document.body:void 0}),bt=Q({customClass:{type:String,default:O.customClass},center:{type:Boolean,default:O.center},dangerouslyUseHTMLString:{type:Boolean,default:O.dangerouslyUseHTMLString},duration:{type:Number,default:O.duration},icon:{type:De,default:O.icon},id:{type:String,default:O.id},message:{type:G([String,Object,Function]),default:O.message},onClose:{type:G(Function),default:O.onClose},showClose:{type:Boolean,default:O.showClose},type:{type:String,values:$e,default:O.type},plain:{type:Boolean,default:O.plain},offset:{type:Number,default:O.offset},zIndex:{type:Number,default:O.zIndex},grouping:{type:Boolean,default:O.grouping},repeatNum:{type:Number,default:O.repeatNum}}),ht={destroy:()=>!0},$=io([]),Ct=e=>{const t=$.findIndex(l=>l.id===e),o=$[t];let n;return t>0&&(n=$[t-1]),{current:o,prev:n}},_t=e=>{const{prev:t}=Ct(e);return t?t.vm.exposed.bottom.value:0},kt=(e,t)=>$.findIndex(n=>n.id===e)>0?16:t,Tt=z({name:"ElMessage"}),Et=z({...Tt,props:bt,emits:ht,setup(e,{expose:t}){const o=e,{Close:n}=co,{ns:l,zIndex:i}=uo("message"),{currentZIndex:a,nextZIndex:d}=i,r=S(),v=S(!1),b=S(0);let w;const T=k(()=>o.type?o.type==="error"?"danger":o.type:"info"),E=k(()=>{const g=o.type;return{[l.bm("icon",g)]:g&&Se[g]}}),C=k(()=>o.icon||Se[o.type]||""),M=k(()=>_t(o.id)),h=k(()=>kt(o.id,o.offset)+M.value),B=k(()=>b.value+h.value),A=k(()=>({top:`${h.value}px`,zIndex:a.value}));function c(){o.duration!==0&&({stop:w}=ve(()=>{D()},o.duration))}function I(){w==null||w()}function D(){v.value=!1}function R({code:g}){g===zo.esc&&D()}return ue(()=>{c(),d(),v.value=!0}),re(()=>o.repeatNum,()=>{I(),c()}),Ro(document,"keydown",R),$o(r,()=>{b.value=r.value.getBoundingClientRect().height}),t({visible:v,bottom:B,close:D}),(g,Y)=>(x(),N(be,{name:s(l).b("fade"),onBeforeLeave:g.onClose,onAfterLeave:U=>g.$emit("destroy"),persisted:""},{default:f(()=>[ge(p("div",{id:g.id,ref_key:"messageRef",ref:r,class:L([s(l).b(),{[s(l).m(g.type)]:g.type},s(l).is("center",g.center),s(l).is("closable",g.showClose),s(l).is("plain",g.plain),g.customClass]),style:ne(s(A)),role:"alert",onMouseenter:I,onMouseleave:c},[g.repeatNum>1?(x(),N(s(Go),{key:0,value:g.repeatNum,type:s(T),class:L(s(l).e("badge"))},null,8,["value","type","class"])):W("v-if",!0),s(C)?(x(),N(s(ie),{key:1,class:L([s(l).e("icon"),s(E)])},{default:f(()=>[(x(),N(Ce(s(C))))]),_:1},8,["class"])):W("v-if",!0),V(g.$slots,"default",{},()=>[g.dangerouslyUseHTMLString?(x(),X(Oe,{key:1},[W(" Caution here, message could've been compromised, never use user's input as message "),p("p",{class:L(s(l).e("content")),innerHTML:g.message},null,10,["innerHTML"])],2112)):(x(),X("p",{key:0,class:L(s(l).e("content"))},q(g.message),3))]),g.showClose?(x(),N(s(ie),{key:2,class:L(s(l).e("closeBtn")),onClick:Ie(D,["stop"])},{default:f(()=>[m(s(n))]),_:1},8,["class","onClick"])):W("v-if",!0)],46,["id"]),[[ye,v.value]])]),_:3},8,["name","onBeforeLeave","onAfterLeave"]))}});var St=se(Et,[["__file","message.vue"]]);let wt=1;const ze=e=>{const t=!e||we(e)||Be(e)||le(e)?{message:e}:e,o={...O,...t};if(!o.appendTo)o.appendTo=document.body;else if(we(o.appendTo)){let n=document.querySelector(o.appendTo);fo(n)||(n=document.body),o.appendTo=n}return o},xt=e=>{const t=$.indexOf(e);if(t===-1)return;$.splice(t,1);const{handler:o}=e;o.close()},Mt=({appendTo:e,...t},o)=>{const n=`message_${wt++}`,l=t.onClose,i=document.createElement("div"),a={...t,id:n,onClose:()=>{l==null||l(),xt(b)},onDestroy:()=>{xe(null,i)}},d=m(St,a,le(a.message)||Be(a.message)?{default:le(a.message)?a.message:()=>a.message}:null);d.appContext=o||J._context,xe(d,i),e.appendChild(i.firstElementChild);const r=d.component,b={id:n,vnode:d,vm:r,handler:{close:()=>{r.exposed.visible.value=!1}},props:d.component.props};return b},J=(e={},t)=>{if(!de)return{close:()=>{}};if(pe(Me.max)&&$.length>=Me.max)return{close:()=>{}};const o=ze(e);if(o.grouping&&$.length){const l=$.find(({vnode:i})=>{var a;return((a=i.props)==null?void 0:a.message)===o.message});if(l)return l.props.repeatNum+=1,l.props.type=o.type,l.handler}const n=Mt(o,t);return $.push(n),n.handler};$e.forEach(e=>{J[e]=(t={},o)=>{const n=ze(t);return J({...n,type:e},o)}});function Lt(e){for(const t of $)(!e||e===t.props.type)&&t.handler.close()}J.closeAll=Lt;J._context=null;const Dt=mo(J,"$message"),Ot={name:"WerewolfNotes",components:{Setting:vo,VideoPlay:go,VideoPause:yo,RefreshRight:bo,Delete:ho,Download:Co},setup(){const e=S(!1),t=S(null),o=S(null),n=20*60*1e3,l="有效局",i=S(n),a=k(()=>B(i.value)),d=k(()=>i.value<=0),r=k(()=>e.value||i.value===n),v=S(""),b=S(!1),w=S(!1),T=_o([{number:"01",role:"狼",hexagonClasses:["hexagon-red","hexagon-one"],handOn:!0,input:""},{number:"02",role:"X",hexagonClasses:["hexagon-green","hexagon-one"],handOn:!0,input:""},{number:"03",role:"",hexagonClasses:["hexagon"],handOn:!0,input:""},{number:"04",role:"",hexagonClasses:["hexagon"],handOn:!0,input:""},{number:"05",role:"丘",hexagonClasses:["hexagon-gold","hexagon-one"],handOn:!0,input:""},{number:"06",role:"幸",hexagonClasses:["hexagon-gold","hexagon-one"],handOn:!0,input:""},{number:"07",role:"子狐",hexagonClasses:["hexagon-blue","hexagon-two"],handOn:!0,input:""},{number:"08",role:"",hexagonClasses:["hexagon"],handOn:!0,input:""},{number:"09",role:"",hexagonClasses:["hexagon"],handOn:!0,input:""},{number:"10",role:"警1",hexagonClasses:["hexagon-green","hexagon-two"],handOn:!0,input:""},{number:"11",role:"",hexagonClasses:["hexagon"],handOn:!0,input:""},{number:"12",role:"",hexagonClasses:["hexagon"],handOn:!0,input:""}]),E=S(!1),C=S(!1),M=S(""),h=S(!1);function B(u){const _=Math.round(u/1e3),j=Math.floor(_/60),ee=_%60;return u<=0?l:`${j.toString().padStart(2,"0")}:${ee.toString().padStart(2,"0")}`}function A(){const u=new Date().getTime(),_=t.value-u;i.value=_>0?_:0,_<=0&&e.value&&(clearInterval(o.value),e.value=!1)}function c(){!e.value&&i.value>0?(e.value=!0,t.value=new Date().getTime()+i.value,o.value=setInterval(A,100)):e.value&&(clearInterval(o.value),e.value=!1)}function I(){!e.value&&i.value!==n&&(clearInterval(o.value),e.value=!1,t.value=null,i.value=n)}function D(){confirm("确定重置吗？")&&(v.value="",T.forEach(u=>{u.input="",u.handOn=!0}))}function R(){M.value=g(),E.value=!0}function g(){let _=`${Y(new Date)}
***************************************
${v.value}
***************************************
发言信息：
`;return T.forEach((j,ee)=>{const fe=j.input.replace(/\n/g,`
	`);_+=`[${j.number}] 	${fe}
`,ee===5&&(_+=`***************************************
`)}),_}function Y(u){const _=u.getFullYear(),j=(u.getMonth()+1).toString().padStart(2,"0"),ee=u.getDate().toString().padStart(2,"0"),fe=u.getHours().toString().padStart(2,"0"),Ye=u.getMinutes().toString().padStart(2,"0"),Ue=u.getSeconds().toString().padStart(2,"0");return`${_}年${j}月${ee}日 ${fe}:${Ye}:${Ue}`}function U(){navigator.clipboard.writeText(M.value).then(()=>{h.value=!0,setTimeout(()=>{h.value=!1},2e3)}).catch(u=>{console.error("无法复制内容: ",u)})}function H(u){u.preventDefault();const _=u.target.selectionStart,j=u.target.selectionEnd;M.value=M.value.substring(0,_)+"	"+M.value.substring(j),u.target.selectionStart=u.target.selectionEnd=_+1}function y(){b.value=!b.value}function P(){w.value=!w.value}function F(u){T[u].handOn=!T[u].handOn}function ce(){C.value=!0}return ue(()=>{}),ko(()=>{o.value&&clearInterval(o.value)}),{timerDisplay:a,countdownActive:e,startStopDisabled:d,resetDisabled:r,remarks:v,remarkLocked:b,talkLocked:w,roles:T,exportModalVisible:E,explainModalVisible:C,exportText:M,copySuccessVisible:h,startOrPauseTimer:c,resetTimer:I,resetNotes:D,exportNotes:R,copyToClipboard:U,handleTab:H,toggleRemarkLock:y,toggleTalkLock:P,toggleHand:F,showExplainModal:ce}}},_e=e=>(wo("data-v-2de7e27f"),e=e(),xo(),e),It={class:"container"},Bt={id:"top"},At=_e(()=>p("b",{id:"title"},"在 线 笔 记",-1)),Nt={id:"bottom"},Vt={class:"right"},Rt={class:"header"},$t={class:"timer-container"},zt={class:"timer"},Yt={id:"timer"},Ut=_e(()=>p("br",{class:"responsive-break"},null,-1)),Ht={class:"note"},Pt=["src"],Kt={class:"note"},Ft=["src"],jt={id:"roles"},Xt=["src","onClick"],Gt={class:"dialog-footer"},Wt=_e(()=>p("p",null,[K(" 源码："),p("a",{href:"https://github.com/syhy0612/lrsNotes",target:"_blank",style:{color:"blue"}},"点击跳转"),p("br"),p("br"),K(" 6月24日重新拾起项目。 ")],-1)),Zt={class:"dialog-footer"};function qt(e,t,o,n,l,i){const a=Z("Setting"),d=ie,r=To,v=Z("VideoPlay"),b=Z("VideoPause"),w=Z("RefreshRight"),T=Z("Delete"),E=Z("Download"),C=Yo,M=Lo,h=ot,B=yt,A=Dt;return x(),X("div",It,[p("div",Bt,[At,m(r,{class:"settings-link",onClick:n.showExplainModal,text:""},{default:f(()=>[m(d,null,{default:f(()=>[m(a)]),_:1})]),_:1},8,["onClick"])]),p("div",Nt,[p("div",Vt,[p("div",Rt,[p("div",$t,[p("div",zt,[p("span",Yt,q(n.timerDisplay),1),m(r,{class:"timer-link",onClick:n.startOrPauseTimer,disabled:n.startStopDisabled},{default:f(()=>[n.countdownActive?(x(),N(d,{key:1},{default:f(()=>[m(b)]),_:1})):(x(),N(d,{key:0},{default:f(()=>[m(v)]),_:1}))]),_:1},8,["onClick","disabled"]),m(r,{class:"timer-link",onClick:n.resetTimer,disabled:n.resetDisabled},{default:f(()=>[m(d,null,{default:f(()=>[m(w)]),_:1})]),_:1},8,["onClick","disabled"])])]),Ut,m(r,{onClick:n.resetNotes,class:"button reset-button",title:"重置"},{default:f(()=>[m(d,null,{default:f(()=>[m(T)]),_:1})]),_:1},8,["onClick"]),m(r,{onClick:n.exportNotes,class:"button export-button",title:"导出"},{default:f(()=>[m(d,null,{default:f(()=>[m(E)]),_:1})]),_:1},8,["onClick"])]),p("div",Ht,[p("h2",null,[K("备注信息 "),p("img",{src:n.remarkLocked?"img/locked.png":"img/unlocked.png",alt:"",class:"locked",onClick:t[0]||(t[0]=(...c)=>n.toggleRemarkLock&&n.toggleRemarkLock(...c))},null,8,Pt)]),m(C,{modelValue:n.remarks,"onUpdate:modelValue":t[1]||(t[1]=c=>n.remarks=c),type:"textarea",rows:3,placeholder:"请输入",disabled:n.remarkLocked},null,8,["modelValue","disabled"])]),p("div",Kt,[p("h2",null,[K("发言信息 "),p("img",{src:n.talkLocked?"img/locked.png":"img/unlocked.png",alt:"",class:"locked",onClick:t[2]||(t[2]=(...c)=>n.toggleTalkLock&&n.toggleTalkLock(...c))},null,8,Ft)]),p("div",jt,[m(h,{gutter:20},{default:f(()=>[(x(!0),X(Oe,null,Eo(n.roles,(c,I)=>(x(),N(M,{span:12,key:I},{default:f(()=>[p("div",{class:L(["role-entry",{odd:I%2===0,even:I%2!==0}])},[p("label",null,[p("img",{src:c.handOn?"svg/hand-on.svg":"svg/hand-off.svg",class:"toggle-icon",onClick:D=>n.toggleHand(I)},null,8,Xt),K(" "+q(c.number)+" ",1),p("div",{class:L(["hexagon",...c.hexagonClasses])},q(c.role),3)]),m(C,{modelValue:c.input,"onUpdate:modelValue":D=>c.input=D,type:"textarea",rows:3,disabled:n.talkLocked},null,8,["modelValue","onUpdate:modelValue","disabled"])],2)]),_:2},1024))),128))]),_:1})])])])]),m(B,{modelValue:n.exportModalVisible,"onUpdate:modelValue":t[5]||(t[5]=c=>n.exportModalVisible=c),title:"笔记预览",width:"50%",center:""},{footer:f(()=>[p("span",Gt,[m(r,{onClick:n.copyToClipboard},{default:f(()=>[K("复制")]),_:1},8,["onClick"]),m(r,{onClick:t[4]||(t[4]=c=>n.exportModalVisible=!1)},{default:f(()=>[K("取消")]),_:1})])]),default:f(()=>[m(C,{modelValue:n.exportText,"onUpdate:modelValue":t[3]||(t[3]=c=>n.exportText=c),type:"textarea",rows:10,placeholder:"预览内容",onKeydown:So(Ie(n.handleTab,["prevent"]),["tab"])},null,8,["modelValue","onKeydown"])]),_:1},8,["modelValue"]),m(B,{modelValue:n.explainModalVisible,"onUpdate:modelValue":t[7]||(t[7]=c=>n.explainModalVisible=c),title:"设置",width:"30%",center:""},{footer:f(()=>[p("span",Zt,[m(r,{onClick:t[6]||(t[6]=c=>n.explainModalVisible=!1)},{default:f(()=>[K("好的")]),_:1})])]),default:f(()=>[Wt]),_:1},8,["modelValue"]),m(A,{modelValue:n.copySuccessVisible,"onUpdate:modelValue":t[8]||(t[8]=c=>n.copySuccessVisible=c),type:"success",duration:2e3,center:""},{default:f(()=>[K("复制成功~ ")]),_:1},8,["modelValue"])])}const tn=po(Ot,[["render",qt],["__scopeId","data-v-2de7e27f"]]);export{tn as default};
