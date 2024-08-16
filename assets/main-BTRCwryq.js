import{s as le,u as A,w as N,Q as ae,B as K,D as re,al as ge,z as y,A as D,E as me,J as k,K as $,O as W,P as g,N as M,aa as Y,ax as we,aR as _e,X as V,a4 as O,Y as ye,aw as X,aq as ie,ab as x,a9 as ee,a8 as ue,_ as ce,Z as U,b4 as te,b5 as oe,b6 as ne,as as se,a7 as Ce,ad as Se,b7 as pe,G as Ie,aW as xe,b8 as Ee,b9 as ke}from"./index-DxeyDVsE.js";import{r as $e,v as de,U as G,n as Re,p as Be,m as Ne,E as fe}from"./el-input-B7fh_LHO.js";import{c as Ve,a as Ae,E as Pe}from"./el-popper-DjW12nQ_.js";import"element-plus";const We=(e,r)=>{const p=e.toLowerCase();return(r.label||r.value).toLowerCase().includes(p)},De=(e,r,p)=>{const{selectionEnd:n}=e;if(n===null)return;const d=e.value,w=Ve(r);let o=-1,i;for(let s=n-1;s>=0;--s){const u=d[s];if(u===p||u===`
`||u==="\r"){o=s;continue}if(w.includes(u)){const f=o===-1?n:o;i={pattern:d.slice(s+1,f),start:s+1,end:f,prefix:u,prefixIndex:s,splitIndex:o,selectionEnd:n};break}}return i},Me=(e,r={debug:!1,useSelectionEnd:!1})=>{const p=e.selectionStart!==null?e.selectionStart:0,n=e.selectionEnd!==null?e.selectionEnd:0,d=r.useSelectionEnd?n:p,w=["direction","boxSizing","width","height","overflowX","overflowY","borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth","borderStyle","paddingTop","paddingRight","paddingBottom","paddingLeft","fontStyle","fontVariant","fontWeight","fontStretch","fontSize","fontSizeAdjust","lineHeight","fontFamily","textAlign","textTransform","textIndent","textDecoration","letterSpacing","wordSpacing","tabSize","MozTabSize"];if(r.debug){const _=document.querySelector("#input-textarea-caret-position-mirror-div");_!=null&&_.parentNode&&_.parentNode.removeChild(_)}const o=document.createElement("div");o.id="input-textarea-caret-position-mirror-div",document.body.appendChild(o);const i=o.style,s=window.getComputedStyle(e),u=e.nodeName==="INPUT";i.whiteSpace=u?"nowrap":"pre-wrap",u||(i.wordWrap="break-word"),i.position="absolute",r.debug||(i.visibility="hidden"),w.forEach(_=>{if(u&&_==="lineHeight")if(s.boxSizing==="border-box"){const R=Number.parseInt(s.height),E=Number.parseInt(s.paddingTop)+Number.parseInt(s.paddingBottom)+Number.parseInt(s.borderTopWidth)+Number.parseInt(s.borderBottomWidth),P=E+Number.parseInt(s.lineHeight);R>P?i.lineHeight=`${R-E}px`:R===P?i.lineHeight=s.lineHeight:i.lineHeight="0"}else i.lineHeight=s.height;else i[_]=s[_]}),$e()?e.scrollHeight>Number.parseInt(s.height)&&(i.overflowY="scroll"):i.overflow="hidden",o.textContent=e.value.slice(0,Math.max(0,d)),u&&o.textContent&&(o.textContent=o.textContent.replace(/\s/g," "));const f=document.createElement("span");f.textContent=e.value.slice(Math.max(0,d))||".",f.style.position="relative",f.style.left=`${-e.scrollLeft}px`,f.style.top=`${-e.scrollTop}px`,o.appendChild(f);const c={top:f.offsetTop+Number.parseInt(s.borderTopWidth),left:f.offsetLeft+Number.parseInt(s.borderLeftWidth),height:Number.parseInt(s.fontSize)*1.5};return r.debug?f.style.backgroundColor="#aaa":document.body.removeChild(o),c.left>=e.clientWidth&&(c.left=e.clientWidth),c},Oe=le({...de,options:{type:A(Array),default:()=>[]},prefix:{type:A([String,Array]),default:"@",validator:e=>N(e)?e.length===1:e.every(r=>N(r)&&r.length===1)},split:{type:String,default:" ",validator:e=>e.length===1},filterOption:{type:A([Boolean,Function]),default:()=>We,validator:e=>e===!1?!0:ae(e)},placement:{type:A(String),default:"bottom"},showArrow:Boolean,offset:{type:Number,default:0},whole:Boolean,checkIsWhole:{type:A(Function)},modelValue:String,loading:Boolean,popperClass:{type:String,default:""},popperOptions:{type:A(Object),default:()=>({})}}),Te={[G]:e=>N(e),search:(e,r)=>N(e)&&N(r),select:(e,r)=>N(e.value)&&N(r),focus:e=>e instanceof FocusEvent,blur:e=>e instanceof FocusEvent},He=le({options:{type:A(Array),default:()=>[]},loading:Boolean,disabled:Boolean}),ze={select:e=>N(e.value)},Fe=K({name:"ElMentionDropdown"}),Le=K({...Fe,props:He,emits:ze,setup(e,{expose:r,emit:p}){const n=e,d=re("mention"),{t:w}=ge(),o=y(-1),i=y(),s=y(),u=y(),f=(l,m)=>[d.be("dropdown","item"),d.is("hovering",o.value===m),d.is("disabled",l.disabled||n.disabled)],c=l=>{l.disabled||n.disabled||p("select",l)},_=l=>{o.value=l},R=D(()=>n.disabled||n.options.every(l=>l.disabled)),E=D(()=>n.options[o.value]),P=()=>{E.value&&p("select",E.value)},H=l=>{const{options:m}=n;if(m.length===0||R.value)return;l==="next"?(o.value++,o.value===m.length&&(o.value=0)):l==="prev"&&(o.value--,o.value<0&&(o.value=m.length-1));const h=m[o.value];if(h.disabled){H(l);return}U(()=>j(h))},j=l=>{var m,h,B,C;const{options:t}=n,a=t.findIndex(b=>b.value===l.value),v=(m=s.value)==null?void 0:m[a];if(v){const b=(B=(h=u.value)==null?void 0:h.querySelector)==null?void 0:B.call(h,`.${d.be("dropdown","wrap")}`);b&&Re(b,v)}(C=i.value)==null||C.handleScroll()};return me(()=>n.options,()=>{R.value||n.options.length===0?o.value=-1:o.value=0},{immediate:!0}),r({navigateOptions:H,selectHoverOption:P,hoverOption:E}),(l,m)=>(k(),$("div",{ref_key:"dropdownRef",ref:u,class:W(g(d).b("dropdown"))},[l.$slots.header?(k(),$("div",{key:0,class:W(g(d).be("dropdown","header"))},[M(l.$slots,"header")],2)):Y("v-if",!0),we(V(g(Ae),{ref_key:"scrollbarRef",ref:i,tag:"ul","wrap-class":g(d).be("dropdown","wrap"),"view-class":g(d).be("dropdown","list")},{default:O(()=>[(k(!0),$(ye,null,X(l.options,(h,B)=>(k(),$("li",{ref_for:!0,ref_key:"optionRefs",ref:s,key:h.value,class:W(f(h,B)),onMouseenter:C=>_(B),onClick:ie(C=>c(h),["stop"])},[M(l.$slots,"label",{item:h,index:B},()=>{var C;return[x("span",null,ee((C=h.label)!=null?C:h.value),1)]})],42,["onMouseenter","onClick"]))),128))]),_:3},8,["wrap-class","view-class"]),[[_e,l.options.length>0&&!l.loading]]),l.loading?(k(),$("div",{key:1,class:W(g(d).be("dropdown","loading"))},[M(l.$slots,"loading",{},()=>[ue(ee(g(w)("el.mention.loading")),1)])],2)):Y("v-if",!0),l.$slots.footer?(k(),$("div",{key:2,class:W(g(d).be("dropdown","footer"))},[M(l.$slots,"footer")],2)):Y("v-if",!0)],2))}});var Ue=ce(Le,[["__file","mention-dropdown.vue"]]);const Ke=K({name:"ElMention"}),je=K({...Ke,props:Oe,emits:Te,setup(e,{expose:r,emit:p}){const n=e,d=D(()=>Be(n,Object.keys(de))),w=re("mention"),o=y(),i=y(),s=y(),u=y(!1),f=y(),c=y(),_=D(()=>n.showArrow?n.placement:`${n.placement}-start`),R=D(()=>n.showArrow?["bottom","top"]:["bottom-start","top-start"]),E=D(()=>{const{filterOption:t,options:a}=n;return!c.value||!t?a:a.filter(v=>t(c.value.pattern,v))}),P=t=>{p("update:modelValue",t),h()},H=t=>{var a,v,b,S;if("key"in t&&!((a=o.value)!=null&&a.isComposing)){if(["ArrowLeft","ArrowRight"].includes(t.key))h();else if(["ArrowUp","ArrowDown"].includes(t.key)){if(!u.value)return;t.preventDefault();const I=t.key==="ArrowUp"?"prev":"next";(v=s.value)==null||v.navigateOptions(I)}else if(["Enter"].includes(t.key)){if(!u.value)return;t.preventDefault(),(b=s.value)!=null&&b.hoverOption?(S=s.value)==null||S.selectHoverOption():u.value=!1}else if(["Backspace"].includes(t.key)&&n.whole&&c.value){const{splitIndex:I,selectionEnd:z,pattern:F,prefixIndex:T,prefix:he}=c.value,L=m();if(!L)return;const Q=L.value,be=n.options.find(q=>q.value===F);if((ae(n.checkIsWhole)?n.checkIsWhole(F,he):be)&&I!==-1&&I+1===z){t.preventDefault();const q=Q.slice(0,T)+Q.slice(I+1);p(G,q);const Z=T;U(()=>{L.selectionStart=Z,L.selectionEnd=Z,C()})}}}},{wrapperRef:j}=Ne(o,{afterFocus(){h()},beforeBlur(t){var a;return(a=i.value)==null?void 0:a.isFocusInsideContent(t)},afterBlur(){u.value=!1}}),J=()=>{h()},l=t=>{if(!c.value)return;const a=m();if(!a)return;const v=a.value,{split:b}=n,S=v.slice(c.value.end),I=S.startsWith(b),z=`${t.value}${I?"":b}`,F=v.slice(0,c.value.start)+z+S;p(G,F),p("select",t,c.value.prefix);const T=c.value.start+z.length+(I?1:0);U(()=>{a.selectionStart=T,a.selectionEnd=T,a.focus(),C()})},m=()=>{var t,a;return n.type==="textarea"?(t=o.value)==null?void 0:t.textarea:(a=o.value)==null?void 0:a.input},h=()=>{setTimeout(()=>{B(),C(),U(()=>{var t;return(t=i.value)==null?void 0:t.updatePopper()})},0)},B=()=>{const t=m();if(!t)return;const a=Me(t),v=t.getBoundingClientRect(),b=o.value.$el.getBoundingClientRect();f.value={position:"absolute",width:0,height:`${a.height}px`,left:`${a.left+v.left-b.left}px`,top:`${a.top+v.top-b.top}px`}},C=()=>{const t=m();if(document.activeElement!==t){u.value=!1;return}const{prefix:a,split:v}=n;if(c.value=De(t,a,v),c.value&&c.value.splitIndex===-1){u.value=!0,p("search",c.value.pattern,c.value.prefix);return}u.value=!1};return r({input:o,tooltip:i}),(t,a)=>(k(),$("div",{ref_key:"wrapperRef",ref:j,class:W(g(w).b())},[V(g(fe),se(se(g(d),t.$attrs),{ref_key:"elInputRef",ref:o,"model-value":t.modelValue,onInput:P,onKeydown:H,onMousedown:J}),te({_:2},[X(t.$slots,(v,b)=>({name:b,fn:O(S=>[M(t.$slots,b,oe(ne(S)))])}))]),1040,["model-value"]),V(g(Pe),{ref_key:"tooltipRef",ref:i,visible:u.value&&(!!g(E).length||t.loading),"popper-class":[g(w).e("popper"),t.popperClass],"popper-options":t.popperOptions,placement:g(_),"fallback-placements":g(R),effect:"light",pure:"",offset:t.offset,"show-arrow":t.showArrow},{default:O(()=>[x("div",{style:Ce(f.value)},null,4)]),content:O(()=>{var v;return[V(Ue,{ref_key:"dropdownRef",ref:s,options:g(E),disabled:t.disabled,loading:t.loading,onSelect:l,onClick:ie((v=o.value)==null?void 0:v.focus,["stop"])},te({_:2},[X(t.$slots,(b,S)=>({name:S,fn:O(I=>[M(t.$slots,S,oe(ne(I)))])}))]),1032,["options","disabled","loading","onClick"])]}),_:3},8,["visible","popper-class","popper-options","placement","fallback-placements","offset","show-arrow"])],2))}});var qe=ce(je,[["__file","mention.vue"]]);const Ye=Se(qe),ve=e=>(Ee("data-v-fac0dee2"),e=e(),ke(),e),Xe={class:"outBox"},Ge={class:"note note-top"},Je=ve(()=>x("h2",null,"自记信息",-1)),Qe={class:"note"},Ze=ve(()=>x("h2",null,"发言信息",-1)),et={class:"messageLeft"},tt={class:"messageInfo"},ot={__name:"board",setup(e){const r=y(),p=Ie({});for(let w=1;w<=12;w++){const o=`player${String(w).padStart(2,"0")}`;p[o]={election:"",flag:!0,message:"",sign:"",status:1}}const n=y([{label:"跳-预言家-发金水",value:"C预@0金水/1.2.3/"},{label:"跳-预言家-发查杀",value:"C预@0查杀/1.2.3/"},{label:"跳-魔镜-发平民",value:"C镜@0平民/1.2.3/"},{label:"跳-魔镜-发狼人",value:"C镜@0狼人/1.2.3/"},{label:"跳-女巫-发银水",value:"C女巫@0银水"},{label:"跳-守卫-报盾口",value:"CC守卫/0.1.2/"},{label:"跳-猎人",value:"C猎人"},{label:"跳-商人-发查验",value:"C商@0幸运儿-查验"},{label:"跳-商人-发毒药",value:"C商@0幸运儿-毒药"},{label:"跳-幸运儿-发金水",value:"C幸@0金水"},{label:"跳-幸运儿-发查杀",value:"C幸@0查杀"}]);function d(){console.log("remarks:",r.value),console.log("chatRecords:",p)}return(w,o)=>{const i=fe,s=Ye,u=xe;return k(),$("div",Xe,[x("div",Ge,[Je,V(i,{modelValue:r.value,"onUpdate:modelValue":o[0]||(o[0]=f=>r.value=f),type:"textarea",class:"note-textarea-top",rows:4,placeholder:"请输入"},null,8,["modelValue"])]),x("div",Qe,[Ze,x("div",et,[x("div",tt,[V(s,{modelValue:p.player01.message,"onUpdate:modelValue":o[1]||(o[1]=f=>p.player01.message=f),type:"textarea",class:"note-textarea-down",rows:3,placeholder:"请输入01号玩家发言信息",prefix:"C",options:n.value},null,8,["modelValue","options"])])])]),V(u,{type:"primary",onClick:d},{default:O(()=>[ue("调试")]),_:1})])}}},nt=pe(ot,[["__scopeId","data-v-fac0dee2"]]),st={class:"bgColor"},lt={class:""},at={__name:"main",setup(e){return(r,p)=>{const n=nt;return k(),$("div",st,[x("div",lt,[x("div",null,[V(n)])])])}}},dt=pe(at,[["__scopeId","data-v-c345519c"]]);export{dt as default};
