"use strict";(self.webpackChunkfrontend_app=self.webpackChunkfrontend_app||[]).push([[8836],{58836:(e,s,t)=>{t.r(s),t.d(s,{default:()=>K});var o=t(74839),a=t(96447),i=t(79604),l=t(19495),n=t(33223),r=t(85281),c=t(9019),d=t(95861),u=t(1550),p=t(88797),_=t(51405),m=t(65280),g=t(8372),h=t(5479),b=t(80007),x=t(63408),f=t(51928),j=t(47477),y=t(38504),Z=t.n(y),v=t(30161),C=t(47313),I=t(75590),L=(t(95363),t(58467)),N=t(294),k=t(60245),w=t(1604),B=t(42321),T=t(90469),W=t(26720),R=t(75031),S=t(42844),P=t(83177),A=t(17431),E=t(87138),D=t(42172);const z={root:"styles_root__5XTtf",body:"styles_body__45VC3",breadcump:"styles_breadcump__ufFGM",submit:"styles_submit__s-Lf7",runBtn:"styles_runBtn__XAoak",submitBtn:"styles_submitBtn__YPqzW",breadcumpWrapper:"styles_breadcumpWrapper__fK5fq",icArrow:"styles_icArrow__UToAr",cursorPointer:"styles_cursorPointer__zezXf",codeContainer:"styles_codeContainer__uJXBl",rightBody:"styles_rightBody__Nm5Ie",codeStubContainer:"styles_codeStubContainer__sRwWW",codeStubHead:"styles_codeStubHead__AsqPi",codeTestcaseContainer:"styles_codeTestcaseContainer__dnvuE",stickyTabList:"styles_stickyTabList__5UEOI",leftBody:"styles_leftBody__y992d",tabBody:"styles_tabBody__+jHQP",tabWrapper:"styles_tabWrapper__MhRNe",tabs:"styles_tabs__sCxEF",tabPanelTopic:"styles_tabPanelTopic__exqQ0",tabPanel:"styles_tabPanel__OL+DK"};var H=t(53645),F=t(8344),M=t(1229),Q=t(46417);function K(){const e=(0,M.Z)(),{problemId:s,courseId:t,lessonId:y}=(0,L.UO)(),{pathname:K}=(0,L.TH)(),X=(0,L.s0)(),q=(0,f.T)(),U=(0,f.C)((e=>e.executeData)),[G,O]=(0,C.useState)(!1),J=(0,f.C)((e=>e.detailCodeQuestion.codeQuestion)),V=new Map;let[Y,$]=(0,C.useState)(Z()(null===J||void 0===J?void 0:J.languages));null===Y||void 0===Y||Y.forEach(((e,s)=>{V.set(e.id,{pLanguage:e,index:s})})),(0,C.useEffect)((()=>{void 0!==s&&(q((0,F.K4)(!0)),W.o.getDetailCodeQuestion(s).then((e=>{q((0,k.g7)((e=>{var s;const t=new Map;return null===(s=e.codeSubmissions)||void 0===s||s.forEach((e=>{t.set(e.languageId,e.sourceCode)})),e.languages=e.languages.map((e=>{const s=t.get(e.id);return e.sourceCode=void 0!==s?s:"".concat(e.headCode,"\n").concat(e.bodyCode,"\n").concat(e.tailCode),e})),e})(e)))})).catch((e=>console.log(e))).finally((()=>q((0,F.K4)(!1)))))}),[q]);const[ee,se]=(0,C.useState)({id:"",sourceCode:""});(0,C.useEffect)((()=>{var e;se(void 0!==(null===J||void 0===J?void 0:J.languages)&&(null===J||void 0===J?void 0:J.languages.length)>0?{id:null===J||void 0===J?void 0:J.languages[0].id,sourceCode:null!==(e=null===J||void 0===J?void 0:J.languages[0].sourceCode)&&void 0!==e?e:""}:{id:"",sourceCode:""}),$(null===J||void 0===J?void 0:J.languages)}),[null===J||void 0===J?void 0:J.languages]),(0,C.useEffect)((()=>{const e=V.get(ee.id);if(void 0!==e&&void 0!==e.pLanguage.headCode&&void 0!==e.pLanguage.tailCode){const s=ee.sourceCode;q((0,w.wb)(s)),q((0,w.gs)(e.pLanguage.judge0Id)),q((0,w.ib)(e.pLanguage.id)),q((0,w.IK)(e.pLanguage.timeLimit)),q((0,w.sG)(e.pLanguage.memoryLimit))}}),[ee]);const te=(0,C.useMemo)((()=>s?[T._.user.problem.detail.description,T._.user.problem.detail.solution,T._.user.problem.detail.submission]:[T._.user.course_certificate.detail.lesson.description,T._.user.course_certificate.detail.lesson.solution,T._.user.course_certificate.detail.lesson.submission]),[T._]),oe=e=>!!(0,N.LX)(K,e),ae=(0,C.useMemo)((()=>{if(s){const e=te.findIndex((e=>oe(e.replace(":problemId",s))));return-1===e?0:e}if(t&&y){const e=te.findIndex((e=>oe(e.replace(":courseId",t).replace(":lessonId",y))));return-1===e?0:e}}),[K,te]),[ie,le]=(0,C.useState)(0),ne=(0,C.useRef)(null),{height:re}=(0,j.Z)({ref:ne}),ce=(0,C.useRef)(null),{width:de}=(0,j.Z)({ref:ce}),ue=(0,C.useRef)(null),{height:pe}=(0,j.Z)({ref:ue}),_e=(0,C.useRef)(null),{height:me}=(0,j.Z)({ref:_e}),ge=(0,C.useRef)(null),{height:he}=(0,j.Z)({ref:ge}),[be,xe]=(0,C.useState)("50%"),[fe,je]=(0,C.useState)("50%"),[ye,Ze]=(0,C.useState)(void 0),ve=(0,C.useRef)(10),{t:Ce}=(0,I.$G)();return(0,Q.jsx)(g.Z,{className:z.root,children:(0,Q.jsxs)(g.Z,{className:z.body,style:{height:"calc(100% - ".concat(pe+2*ve.current,"px)"),marginTop:"".concat(pe,"px"),gap:"".concat(ve.current,"px"),marginBottom:"".concat(ve.current,"px")},children:[(0,Q.jsxs)(g.Z,{className:z.breadcump,ref:ne,children:[s&&(0,Q.jsxs)(g.Z,{id:z.breadcumpWrapper,ref:ce,children:[(0,Q.jsx)(x.Z,{colorname:"--blue-500",className:z.cursorPointer,onClick:()=>X(T._.user.problem.root),children:Ce("list_problem")}),(0,Q.jsx)(a.Z,{id:z.icArrow}),(0,Q.jsx)(x.Z,{colorname:"--blue-500",children:null===J||void 0===J?void 0:J.name})]}),t&&y&&(0,Q.jsxs)(g.Z,{id:z.breadcumpWrapper,ref:ce,children:[(0,Q.jsx)(x.Z,{colorname:"--blue-500",className:z.cursorPointer,onClick:()=>X(T._.user.course_certificate.root),children:"Danh s\xe1ch kh\xf3a h\u1ecdc"}),(0,Q.jsx)(a.Z,{id:z.icArrow}),(0,Q.jsx)(x.Z,{colorname:"--blue-500",className:z.cursorPointer,onClick:()=>{t&&X(T._.user.course_certificate.detail.introduction.replace(":courseId",t))},children:"H\u1ecdc C++ c\u01a1 b\u1ea3n"}),(0,Q.jsx)(a.Z,{id:z.icArrow}),(0,Q.jsx)(x.Z,{colorname:"--blue-500",children:"Hello world"})]}),(0,Q.jsxs)(g.Z,{className:z.submit,children:[!e.isLoggedIn&&(0,Q.jsx)(n.Z,{className:z.runBtn,variant:"contained",color:"primary","translation-key":"header_login_button",onClick:()=>X(T._.user.login.root,{state:{navigateBack:s?T._.user.problem.detail.description.replace(":problemId",s):void 0}}),disabled:e.isLoggedIn,children:Ce("header_login_button")}),e.isLoggedIn&&(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(n.Z,{className:z.runBtn,variant:"contained",color:"primary","translation-key":"detail_problem_execute",focusRipple:!0,onClick:()=>{le(1),q((0,B.tF)(!0)),U.test_cases&&Promise.all(U.test_cases.map((e=>R.V.execute(U.language_id,e.inputData,e.outputData,U.cpu_time_limit,U.memory_limit,U.source_code)))).then((e=>{var s;null===(s=U.test_cases)||void 0===s||s.forEach(((s,t)=>{e[t].input_data=s.inputData,e[t].output_data=s.outputData})),q((0,B.ag)(e))})).catch((e=>{console.log("Execute error: ",e);let s=e.message;void 0===s&&(s="Unexpected error"),q((0,B.NJ)(s))})).finally((()=>q((0,B.tF)(!1))))},disabled:!e.isLoggedIn,children:[(0,Q.jsx)(i.Z,{}),Ce("detail_problem_execute")]}),(0,Q.jsxs)(n.Z,{className:z.submitBtn,color:"primary","translation-key":"detail_problem_submit",onClick:()=>{void 0!==s&&void 0!==U.source_code&&void 0!==U.system_language_id&&(O(!0),H.i.createCodeSubmission({codeQuestionId:s,languageId:U.system_language_id,sourceCode:U.source_code}).then((e=>{console.log("create submit response",e),X(T._.user.problem.detail.submission.replace(":problemId",s))})).catch((e=>{console.log(e)})).finally((()=>O(!1))))},focusRipple:!0,disabled:!e.isLoggedIn,children:[G&&(0,Q.jsx)(r.Z,{size:20}),!G&&(0,Q.jsx)(l.Z,{})," ",Ce("detail_problem_submit")]})]})]}),(0,Q.jsx)(g.Z,{style:{width:"".concat(de,"px")}})]}),(0,Q.jsxs)(c.ZP,{container:!0,className:z.codeContainer,style:{height:"calc(100% - ".concat(re,"px)")},children:[(0,Q.jsx)(v.e,{size:{width:be,height:"100%"},minWidth:0,maxWidth:"100%",enable:{top:!1,right:!0,bottom:!1,left:!1,topRight:!1,bottomRight:!1,bottomLeft:!1,topLeft:!1},onResize:(e,s,t,o)=>{clearTimeout(ye);const a=window.setTimeout((()=>{const e=t.style.width,s="".concat(100-parseFloat(e),"%");xe(e),je(s)}),200);Ze(a)},children:(0,Q.jsxs)(g.Z,{className:z.leftBody,children:[(0,Q.jsx)(g.Z,{id:z.tabWrapper,ref:_e,children:(0,Q.jsxs)(d.Z,{value:ae,onChange:(e,o)=>{s?X(te[o].replace(":problemId",s)):t&&y&&X(te[o].replace(":courseId",t).replace(":lessonId",y))},"aria-label":"basic tabs example",className:z.tabs,children:[(0,Q.jsx)(m.Z,{sx:{textTransform:"none"},"translation-key":"detail_problem_description",label:(0,Q.jsx)(b.Z,{children:Ce("detail_problem_description")}),value:0}),e.isLoggedIn&&(0,Q.jsx)(m.Z,{sx:{textTransform:"none"},"translation-key":"detail_problem_discussion",label:(0,Q.jsx)(b.Z,{children:Ce("detail_problem_discussion")}),value:1}),e.isLoggedIn&&(0,Q.jsx)(m.Z,{sx:{textTransform:"none"},"translation-key":"detail_problem_submission",label:(0,Q.jsx)(b.Z,{children:Ce("detail_problem_submission")}),value:2})]})}),(0,Q.jsx)(g.Z,{id:z.tabBody,style:{height:"calc(100% - ".concat(me,"px)")},children:(0,Q.jsxs)(L.Z5,{children:[(0,Q.jsx)(L.AW,{path:"description",element:(0,Q.jsx)(S.Z,{})}),(0,Q.jsx)(L.AW,{path:"solution",element:(0,Q.jsx)(P.Z,{})}),(0,Q.jsx)(L.AW,{path:"submission",element:(0,Q.jsx)(E.Z,{submissionLoading:G})})]})})]})}),(0,Q.jsx)(v.e,{size:{width:fe,height:"100%"},minWidth:0,maxWidth:"100%",enable:{top:!1,right:!1,bottom:!1,left:!1,topRight:!1,bottomRight:!1,bottomLeft:!1,topLeft:!1},children:(0,Q.jsxs)(g.Z,{className:z.rightBody,children:[(0,Q.jsxs)(g.Z,{className:z.codeStubContainer,children:[(0,Q.jsxs)(g.Z,{id:z.codeStubHead,ref:ge,children:[(0,Q.jsx)(o.Z,{}),(0,Q.jsx)(u.Z,{children:(0,Q.jsx)(p.Z,{value:ee.id,onChange:e=>{const s=e.target.value,t=V.get(ee.id);if(void 0!==t&&void 0!==Y){console.log(ee.sourceCode);let e=Y.map(((e,s)=>s===t.index?{...e,sourceCode:ee.sourceCode}:e));$(e)}const o=V.get(s);se({id:s,sourceCode:null!==o&&void 0!==o&&o.pLanguage.sourceCode?null===o||void 0===o?void 0:o.pLanguage.sourceCode:""})},sx:{bgcolor:"white",width:"150px",height:"40px"},children:null===J||void 0===J?void 0:J.languages.map((e=>(0,Q.jsx)(_.Z,{value:e.id,children:e.name})))})})]}),(0,Q.jsx)(g.Z,{style:{height:"calc(100% - ".concat(he,"px)"),overflow:"auto"},children:(0,Q.jsx)(h.Z,{value:ee.sourceCode,onChange:e=>{se({id:ee.id,sourceCode:e})}})})]}),(0,Q.jsx)(g.Z,{className:z.codeTestcaseContainer,children:(0,Q.jsx)(g.Z,{className:z.testcaseContainer,children:(0,Q.jsxs)(g.Z,{className:z.testcaseBody,children:[(0,Q.jsx)(g.Z,{id:z.tabWrapper,ref:_e,children:(0,Q.jsxs)(d.Z,{value:ie,onChange:(e,s)=>{le(s)},"aria-label":"basic tabs example",className:z.tabs,children:[(0,Q.jsx)(m.Z,{sx:{textTransform:"none"},label:(0,Q.jsx)(b.Z,{children:"Test Cases"}),value:0}),e.isLoggedIn&&(0,Q.jsx)(m.Z,{sx:{textTransform:"none"},"translation-key":"detail_problem_result",label:(0,Q.jsx)(b.Z,{children:Ce("detail_problem_result")}),value:1})]})}),(0,Q.jsx)(g.Z,{className:z.tabBody,style:{height:"calc(50% - ".concat(me,"px)")},children:0===ie?(0,Q.jsx)(D.Z,{}):(0,Q.jsx)(A.Z,{})})]})})})]})})]})]})})}}}]);