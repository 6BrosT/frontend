"use strict";(self.webpackChunkfrontend_app=self.webpackChunkfrontend_app||[]).push([[7389],{67389:(e,n,t)=>{t.r(n),t.d(n,{default:()=>G});var i=t(96447),s=t(93714),a=t(47313),l=t(9019),o=t(79536),r=t(47825),c=t(9289),m=t(47131),d=t(65033),u=t(19536),_=t(16429),x=t(83929),h=t(44758),g=t(99881),p=t(33223),y=t(86138),f=t(19860),j=t(90200),Z=t(7547),S=t(15535),v=t(37735),b=t(95087),C=t(92556),w=t(63408),I=t(58467),k=t(90469),E=t(38556);const N={root:"styles_root__CJAeV",container:"styles_container__Fnrca",mainContent:"styles_mainContent__bCgCc",generalInfo:"styles_generalInfo__hDgbF",textEditor:"styles_textEditor__IT8I8",submissionTime:"styles_submissionTime__+J8ny",formBody:"styles_formBody__XCHVO",toolBar:"styles_toolBar__qx0RI",breadcumpWrapper:"styles_breadcumpWrapper__u5Y2h",icArrow:"styles_icArrow__0JM2r",cursorPointer:"styles_cursorPointer__9SYmP",drawerBody:"styles_drawerBody__xKnE7",drawerFieldContainer:"styles_drawerFieldContainer__2Qv0Q",action:"styles_action__ebJRQ",shake:"styles_shake__dLWkA",slideUp:"styles_slideUp__luZR0"};var A=t(47477),T=t(75590),O=t(70816),P=t.n(O),U=t(91603),z=t(33060),B=t(54750),R=t(46417);const F=(0,B.Z)((0,R.jsx)("path",{d:"M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"NavigateNext");var M=t(33099),L=t(21933),D=t(62563),q=t(75627),H=t(23885),Q=t(16705),Y=t(65537);function G(){var e;const{t:n,i18n:t}=(0,T.$G)(),[O,B]=(0,a.useState)((()=>H.ZP.language)),{width:G}=(0,E.Z)(),V=(0,I.s0)(),[W,K]=((0,f.Z)(),(0,a.useState)(!0)),[J,X]=(0,a.useState)(!1),[$,ee]=(0,a.useState)([]),[ne,te]=(0,a.useState)(!0),[ie,se]=(0,a.useState)(!1),[ae,le]=(0,a.useState)(!1),[oe,re]=(0,a.useState)(!1),[ce,me]=(0,a.useState)(!1),[de,ue]=(0,a.useState)(!0),[_e,xe]=(0,a.useState)(!0),[he,ge]=(0,a.useState)(null),{courseId:pe,assignmentId:ye}=(0,I.UO)(),fe=(0,Y.v9)((e=>e.course));console.log(_e);(0,a.useEffect)((()=>{t.language!==O&&null!==be&&void 0!==be&&be.name&&(Ce(),B(t.language))}),[t.language]);const je=(0,a.useMemo)((()=>L.Ry().shape({name:L.Z_().required("assignment_name_required"),intro:L.Z_(),activity:L.Z_(),maxScore:L.Rx().required("assignment_management_max_score_required"),timeOpen:L.Z_().required("assignment_management_allow_submission_from_date_required"),timeClose:L.Z_().required("assignment_management_submission_due_date_required"),wordLimit:L.Z_(),maxUploadedFile:L.Z_().required("assignment_management_max_uploaded_file_required"),maxFileSize:L.Z_().required("assignment_management_max_file_size_required")})),[n]),{control:Ze,handleSubmit:Se,watch:ve,formState:{errors:be},trigger:Ce,setValue:we}=(0,q.cI)({resolver:(0,D.X)(je),defaultValues:{name:"",intro:"",activity:"",maxScore:100,timeOpen:P().utc().add(0,"days").toISOString(),timeClose:P().utc().add(7,"days").toISOString(),wordLimit:"",maxUploadedFile:"20",maxFileSize:"40000"}}),Ie=(0,a.useCallback)((async e=>{try{const n=await Q.Y.createIntroAttachment(e);if(n)return console.log("Create intro attachment successfully"),n}catch(n){console.log(n)}return null}),[]),ke=(0,a.useCallback)((async(e,n)=>{try{await Q.Y.updateIntroAttachment(e,n)&&console.log("Update intro attachment successfully")}catch(t){console.log(t)}}),[]),Ee=(0,a.useCallback)((async e=>{try{const n=await Q.Y.createAssignment(e);if(n)return console.log("Create assignment successfully"),n}catch(n){console.log(n)}return null}),[]),Ne=(0,a.useCallback)((async(e,n)=>{try{const t=await Q.Y.updateAssignment(e,n);if(t)return console.log("Update assignment successfully"),t}catch(t){console.log(t)}return null}),[]),Ae=(0,a.useCallback)((async e=>{try{await Q.Y.deleteIntroAttachment(e)&&console.log("Delete all intro attachment successfully")}catch(n){console.log(n)}}),[]);(0,a.useEffect)((()=>{ye&&(async e=>{try{const n=await Q.Y.getAssignmentById(e);n&&ge(n)}catch(n){console.log(n)}})(ye)}),[]),(0,a.useEffect)((()=>{var e;he&&(console.log(he),we("name",he.title),we("intro",he.intro),we("activity",he.activity),we("maxScore",he.maxScore),we("timeOpen",he.timeOpen instanceof Date?he.timeOpen.toISOString():he.timeOpen),we("timeClose",he.timeClose instanceof Date?he.timeClose.toISOString():he.timeClose),we("wordLimit",he.wordLimit),we("maxUploadedFile",he.maxUploadFiles),we("maxFileSize",he.maxFileSize),ee(null===he||void 0===he?void 0:he.introAttachments.map((e=>{let n=new File([""],e.fileName,{type:e.mimetype,lastModified:(new Date).getTime()});return{id:e.id,name:e.fileName,size:e.fileSize,type:e.mimetype,downloadUrl:e.fileUrl,imageUrl:e.fileUrl,file:n,uploadStatus:"success"}})))),xe(null===(e=null===he||void 0===he?void 0:he.allowSubmitLate)||void 0===e||e)}),[he]),(0,a.useEffect)((()=>{K(!(G<1080))}),[G]);const Te=(0,a.useRef)(null),{height:Oe}=(0,A.Z)({ref:Te}),Pe=(0,a.useRef)(null),{height:Ue}=(0,A.Z)({ref:Pe}),ze=Array.from({length:20},((e,n)=>({value:(n+1).toString(),label:(n+1).toString()}))),Be=[{value:"10",label:"10 KB"},{value:"50",label:"50 KB"},{value:"100",label:"100 KB"},{value:"500",label:"500 KB"},{value:"1000",label:"1 MB"},{value:"2000",label:"2 MB"},{value:"5000",label:"5 MB"},{value:"10000",label:"10 MB"},{value:"20000",label:"20 MB"},{value:"40000",label:"40 MB"}],[Re,Fe]=(0,a.useState)(!1),[Me,Le]=(0,a.useState)(!1);return(0,R.jsxs)(l.ZP,{className:N.root,children:[(0,R.jsx)(j.Z,{ref:Te}),(0,R.jsx)(o.Z,{sx:{marginTop:"".concat(Oe,"px")},className:N.container,children:(0,R.jsxs)(r.Z,{children:[(0,R.jsx)(c.Z,{className:N.toolBar,children:(0,R.jsxs)(o.Z,{id:N.breadcumpWrapper,children:[(0,R.jsx)(w.Z,{colorname:"--blue-500",className:N.cursorPointer,onClick:()=>V(k._.lecturer.course.management),"translation-key":"common_course_management",children:n("common_course_management")}),(0,R.jsx)(i.Z,{id:N.icArrow}),(0,R.jsx)(w.Z,{colorname:"--blue-500",className:N.cursorPointer,onClick:()=>V(k._.lecturer.course.information.replace(":courseId",null!==pe&&void 0!==pe?pe:"")),children:null===(e=fe.courseDetail)||void 0===e?void 0:e.name}),(0,R.jsx)(i.Z,{id:N.icArrow}),(0,R.jsx)(w.Z,{colorname:"--blue-500",className:N.cursorPointer,onClick:()=>V(k._.lecturer.course.assignment.replace(":courseId",null!==pe&&void 0!==pe?pe:"")),"translation-key":"course_detail_assignment_list",children:n("course_detail_assignment_list")}),(0,R.jsx)(i.Z,{id:N.icArrow}),he?(0,R.jsx)(w.Z,{colorname:"--blue-500","translation-key":"assignment_management_update_assignment",children:n("assignment_management_update_assignment")}):(0,R.jsx)(w.Z,{colorname:"--blue-500","translation-key":"assignment_management_create_assignment",children:n("assignment_management_create_assignment")})]})}),(0,R.jsxs)("form",{className:N.mainContent,style:{height:"calc(100% - ".concat(Ue+Oe,"px)"),marginTop:"".concat(Ue,"px")},onSubmit:Se((async e=>{if(!ce&&!de)return re(!0),void setTimeout((()=>re(!1)),2e3);X(!0);const n={...e},{name:t,intro:i,activity:s,maxScore:a,timeOpen:l,timeClose:o,wordLimit:r,maxUploadedFile:c,maxFileSize:m}=n;let d=[],u=[];try{if(he){const e=he.introAttachments||[],n=$.filter((n=>!e.some((e=>e.id===n.id)))),t=e.filter((e=>!$.some((n=>n.id===e.id))));for(const i of t)await Ae(i.id);for(const i of n){const e={fileName:i.name||"",fileUrl:i.downloadUrl||"",fileSize:i.size||0,mimeType:i.type||"",timeModified:(new Date).toISOString()},n=await Ie(e);n&&(d.push(e),u.push(n.id))}}else for(const n of $){const e={fileName:n.name||"",fileUrl:n.downloadUrl||"",fileSize:n.size||0,mimeType:n.type||"",timeModified:(new Date).toISOString()},t=await Ie(e);t&&(d.push(e),u.push(t.id))}let e;if(he?(console.log(he.id),e=await Ne({title:t,intro:i,activity:s,wordLimit:r,maxUploadFiles:c,maxFileSize:m,maxScore:a,timeOpen:l,timeClose:o,type:ce&&de?"BOTH":ce?"TEXT_ONLINE":"FILE",visible:!0,allowSubmitLate:_e},he.id)):e=await Ee({courseId:null!==pe&&void 0!==pe?pe:"",title:t,intro:i,activity:s,wordLimit:r,maxUploadFiles:c,maxFileSize:m,maxScore:a,timeOpen:l,timeClose:o,type:ce&&de?"BOTH":ce?"TEXT_ONLINE":"FILE",visible:!0,allowSubmitLate:_e}),e&&d.length>0)for(let n=0;n<d.length;n++){const t={...d[n],assignmentId:e.assignmentId};console.log("temp",t),await ke(t,u[n])}}catch(_){Le(!0)}finally{X(!1),Fe(!0),setTimeout((()=>{V(k._.lecturer.course.assignment.replace(":courseId",null!==pe&&void 0!==pe?pe:""))}),2e3)}})),children:[he?(0,R.jsx)(z.Z,{"translation-key":"assignment_management_update_assignment",children:n("assignment_management_update_assignment")}):(0,R.jsx)(z.Z,{"translation-key":"assignment_management_create_assignment",children:n("assignment_management_create_assignment")}),(0,R.jsxs)(o.Z,{className:N.generalInfo,children:[(0,R.jsxs)(o.Z,{display:"flex",alignItems:"center",margin:1,children:[ne?(0,R.jsx)(m.Z,{sx:{padding:"5px"},onClick:()=>te(!ne),children:(0,R.jsx)(s.Z,{style:{fontSize:30}})}):(0,R.jsx)(m.Z,{sx:{padding:"5px"},onClick:()=>te(!ne),children:(0,R.jsx)(F,{style:{fontSize:30}})}),(0,R.jsx)(M.Z,{fontWeight:500,"translation-key":"common_general",children:n("common_general")})]}),(0,R.jsx)(d.Z,{in:ne,timeout:"auto",unmountOnExit:!0,children:(0,R.jsxs)(o.Z,{display:"flex",flexDirection:"column",alignItems:"center",gap:2,marginLeft:3,marginBottom:2,children:[(0,R.jsx)(q.Qr,{defaultValue:"",control:Ze,name:"name",rules:{required:!0},render:e=>{var t;let{field:{ref:i,...s}}=e;return(0,R.jsx)(U.Z,{titleAlignment:"horizontal",error:Boolean(null===be||void 0===be?void 0:be.name),errorMessage:null===(t=be.name)||void 0===t?void 0:t.message,title:n("common_assignment_name"),type:"text",placeholder:n("common_assignment_enter_name"),titleRequired:!0,"translation-key":["common_assignment_name","common_assignment_enter_name","assignment_name_required"],inputRef:i,...s})}}),(0,R.jsxs)(l.ZP,{container:!0,spacing:1,columns:12,children:[(0,R.jsx)(l.ZP,{item:!0,xs:3,children:(0,R.jsx)(w.Z,{"translation-key":"common_assignment_description",children:n("common_assignment_description")})}),(0,R.jsx)(l.ZP,{item:!0,xs:9,className:N.textEditor,"translation-key":"common_enter_description",children:(0,R.jsx)(q.Qr,{control:Ze,name:"intro",render:e=>{let{field:t}=e;return(0,R.jsx)(C.Z,{openDialog:!0,roundedBorder:!0,placeholder:n("common_enter_description")+"...",onChange:t.onChange,value:t.value||""})}})})]}),(0,R.jsxs)(l.ZP,{container:!0,spacing:1,columns:12,children:[(0,R.jsx)(l.ZP,{item:!0,xs:3,children:(0,R.jsx)(w.Z,{"translation-key":"common_assignment_guide",children:n("common_assignment_guide")})}),(0,R.jsx)(l.ZP,{item:!0,xs:9,className:N.textEditor,"translation-key":"common_enter_guideline",children:(0,R.jsx)(q.Qr,{control:Ze,name:"activity",render:e=>{let{field:t}=e;return(0,R.jsx)(C.Z,{openDialog:!0,roundedBorder:!0,placeholder:n("common_enter_guideline")+"...",...t,value:t.value||""})}})})]}),(0,R.jsxs)(l.ZP,{container:!0,spacing:1,columns:12,children:[(0,R.jsx)(l.ZP,{item:!0,xs:3,children:(0,R.jsx)(w.Z,{"translation-key":"asingment_management_attach_file",children:n("asingment_management_attach_file")})}),(0,R.jsx)(l.ZP,{item:!0,xs:9,children:(0,R.jsx)(b.Z,{extFiles:$,setExtFiles:ee})})]})]})})]}),(0,R.jsx)(u.Z,{}),(0,R.jsxs)(o.Z,{className:N.submissionTime,children:[(0,R.jsxs)(o.Z,{display:"flex",alignItems:"center",margin:1,children:[ie?(0,R.jsx)(m.Z,{sx:{padding:"5px"},onClick:()=>se(!ie),children:(0,R.jsx)(s.Z,{style:{fontSize:30}})}):(0,R.jsx)(m.Z,{sx:{padding:"5px"},onClick:()=>se(!ie),children:(0,R.jsx)(F,{style:{fontSize:30}})}),(0,R.jsx)(M.Z,{"translation-key":"common_time_setting",fontWeight:500,children:n("common_time_setting")})]}),(0,R.jsx)(d.Z,{in:ie,timeout:"auto",unmountOnExit:!0,children:(0,R.jsxs)(o.Z,{display:"flex",flexDirection:"column",alignItems:"center",gap:2,marginLeft:3,marginBottom:2,children:[(0,R.jsxs)(l.ZP,{container:!0,spacing:1,columns:12,children:[(0,R.jsx)(l.ZP,{item:!0,xs:3,children:(0,R.jsx)(w.Z,{"translation-key":"asingment_management_allow_time",children:n("asingment_management_allow_time")})}),(0,R.jsx)(l.ZP,{item:!0,xs:9,children:(0,R.jsx)(q.Qr,{control:Ze,name:"timeOpen",rules:{required:!0},render:e=>{let{field:{ref:n,...t}}=e;return(0,R.jsx)(S.Z,{value:P()(t.value),onHandleValueChange:e=>{e&&we("timeOpen",e.toISOString())}})}})})]}),(0,R.jsxs)(l.ZP,{container:!0,spacing:1,columns:12,children:[(0,R.jsx)(l.ZP,{item:!0,xs:3,children:(0,R.jsx)(w.Z,{"translation-key":"asingment_management_deadline",children:n("asingment_management_deadline")})}),(0,R.jsx)(l.ZP,{item:!0,xs:9,children:(0,R.jsx)(q.Qr,{control:Ze,name:"timeClose",rules:{required:!0},render:e=>{let{field:{ref:n,...t}}=e;return(0,R.jsx)(S.Z,{value:P()(t.value),onHandleValueChange:e=>{e&&we("timeClose",e.toISOString())}})}})})]}),(0,R.jsxs)(l.ZP,{container:!0,spacing:1,columns:12,children:[(0,R.jsx)(l.ZP,{item:!0,xs:3}),(0,R.jsx)(l.ZP,{item:!0,xs:9,children:(0,R.jsx)(_.Z,{style:{flexDirection:"row"},children:(0,R.jsx)(x.Z,{"translation-key":"common_allow_submission_after_end_time",control:(0,R.jsx)(h.Z,{checked:_e,onChange:e=>xe(e.target.checked),name:"textSubmission"}),label:n("common_allow_submission_after_end_time")})})})]})]})})]}),(0,R.jsx)(u.Z,{}),(0,R.jsxs)(o.Z,{className:N.submissionType,children:[(0,R.jsxs)(o.Z,{display:"flex",alignItems:"center",margin:1,children:[ae?(0,R.jsx)(m.Z,{sx:{padding:"5px"},onClick:()=>le(!ae),children:(0,R.jsx)(s.Z,{style:{fontSize:30}})}):(0,R.jsx)(m.Z,{sx:{padding:"5px"},onClick:()=>le(!ae),children:(0,R.jsx)(F,{style:{fontSize:30}})}),(0,R.jsx)(M.Z,{"translation-key":"common_submission_type",fontWeight:500,children:n("common_submission_type")})]}),(0,R.jsx)(d.Z,{in:ae,timeout:"auto",unmountOnExit:!0,children:(0,R.jsxs)(o.Z,{display:"flex",flexDirection:"column",gap:2,marginLeft:3,marginBottom:2,children:[(0,R.jsxs)(l.ZP,{container:!0,children:[(0,R.jsx)(l.ZP,{item:!0,xs:3,alignContent:"center",children:(0,R.jsx)(w.Z,{"translation-key":"common_submission_type",children:n("common_submission_type")})}),(0,R.jsxs)(l.ZP,{item:!0,xs:9,style:{position:"relative"},children:[(0,R.jsxs)(_.Z,{style:{flexDirection:"row"},children:[(0,R.jsx)(x.Z,{"translation-key":"common_submission_type_online_text",control:(0,R.jsx)(h.Z,{checked:ce,onChange:e=>{me(e.target.checked)},name:"textSubmission"}),label:n("common_submission_type_online_text")}),(0,R.jsx)(x.Z,{"translation-key":"common_submission_type_file",control:(0,R.jsx)(h.Z,{checked:de,onChange:e=>{ue(e.target.checked)},name:"fileSubmission"}),label:n("common_submission_type_file")})]}),oe&&(0,R.jsx)(g.Z,{className:oe?N.shake:N.slideUp,severity:"error",sx:{position:"absolute",top:-50,zIndex:9999},children:"H\xe3y ch\u1ecdn lo\u1ea1i b\xe0i t\u1eadp"})]})]}),ce&&(0,R.jsx)(q.Qr,{control:Ze,name:"wordLimit",render:e=>{var t;let{field:i}=e;return(0,R.jsx)(U.Z,{"translation-key":"common_enter_word_limit",widthInput:"200px",error:Boolean(null===be||void 0===be?void 0:be.wordLimit),errorMessage:null===(t=be.wordLimit)||void 0===t?void 0:t.message,titleAlignment:"horizontal",title:n("common_word_limit"),type:"number",placeholder:n("common_enter_word_limit"),...i,value:i.value||""})}}),de&&(0,R.jsxs)(l.ZP,{container:!0,children:[(0,R.jsx)(l.ZP,{item:!0,xs:3,alignContent:"center",children:(0,R.jsx)(w.Z,{"translation-key":"common_max_upload_file",children:n("common_max_upload_file")})}),(0,R.jsx)(l.ZP,{item:!0,xs:9,children:(0,R.jsx)(q.Qr,{control:Ze,defaultValue:"40000",name:"maxUploadedFile",render:e=>{let{field:{onChange:n,value:t}}=e;return(0,R.jsx)(v.Z,{labelId:"maxUploadedFile",width:"50px",borderRadius:"12px",title:"Max number of uploaded files",onHandleChange:n,value:t,items:ze})}})})]}),de&&(0,R.jsxs)(l.ZP,{container:!0,children:[(0,R.jsx)(l.ZP,{item:!0,xs:3,alignContent:"center",children:(0,R.jsx)(w.Z,{"translation-key":"common_max_submission_file_size",children:n("common_max_submission_file_size")})}),(0,R.jsx)(l.ZP,{item:!0,xs:9,children:(0,R.jsx)(q.Qr,{control:Ze,name:"maxFileSize",render:e=>{let{field:{onChange:n,value:t}}=e;return(0,R.jsx)(v.Z,{labelId:"maxFileSize",width:"50px",borderRadius:"12px",title:"Maximum submission size",value:t,onHandleChange:n,items:Be})}})})]}),(0,R.jsx)(q.Qr,{control:Ze,name:"maxScore",render:e=>{var t;let{field:i}=e;return(0,R.jsx)(U.Z,{widthInput:"200px",titleAlignment:"horizontal",title:n("assignment_management_max_score"),type:"number",placeholder:"Nh\u1eadp \u0111i\u1ec3m t\u1ed1i \u0111a",error:Boolean(be.maxScore),errorMessage:null===(t=be.maxScore)||void 0===t?void 0:t.message,...i})}})]})})]}),(0,R.jsx)(u.Z,{}),(0,R.jsx)(o.Z,{className:N.action,children:(0,R.jsxs)(o.Z,{display:"flex",justifyContent:"center",gap:2,children:[(0,R.jsx)(Z.Z,{variant:"contained",loading:J,type:"submit","translation-key":"common_save",children:n("common_save")}),(0,R.jsx)(p.Z,{type:"button",color:"inherit",onClick:()=>V(k._.lecturer.course.assignment),"translation-key":"common_cancel",children:n("common_cancel")})]})})]})]})}),(0,R.jsx)(y.Z,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:Re,autoHideDuration:6e3,onClose:()=>Fe(!1),children:(0,R.jsx)(g.Z,{severity:"success",sx:{width:"100%"},onClose:()=>Fe(!1),children:n(he?"update_successful_assignment":"create_successful_assignment")})}),(0,R.jsx)(y.Z,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:Me,autoHideDuration:6e3,onClose:()=>Le(!1),children:(0,R.jsx)(g.Z,{severity:"error",sx:{width:"100%"},onClose:()=>Le(!1),children:n("create_failed_assignment")})})]})}},16705:(e,n,t)=>{t.d(n,{Y:()=>a});var i=t(66010),s=t(65005);class a{static async handleResponse(e){if(e.status>=200&&e.status<300)return e.data;throw new Error("Unexpected response status: ".concat(e.status))}static handleError(e){var n,t,i,s,a,l;return console.error("API call failed",e),Promise.reject({code:(null===(n=e.response)||void 0===n||null===(t=n.data)||void 0===t?void 0:t.code)||503,status:(null===(i=e.response)||void 0===i||null===(s=i.data)||void 0===s?void 0:s.status)||"Service Unavailable",message:(null===(a=e.response)||void 0===a||null===(l=a.data)||void 0===l?void 0:l.message)||e.message})}static async getAssignmentsByCourseId(e){try{const n=await this.apiClient.get("".concat(i.b.COURSE.ASSIGNMENT.DEFAULT),{params:{courseId:e}});return this.handleResponse(n)}catch(n){return this.handleError(n)}}static async getAssignmentById(e){try{const n=await this.apiClient.get("".concat(i.b.COURSE.ASSIGNMENT.GET_BY_ID.replace(":id",e)));return this.handleResponse(n)}catch(n){return this.handleError(n)}}static async createAssignment(e){try{const n=await this.apiClient.post(i.b.COURSE.ASSIGNMENT.CREATE,e);return this.handleResponse(n)}catch(n){return this.handleError(n)}}static async updateAssignment(e,n){try{const t=await this.apiClient.put(i.b.COURSE.ASSIGNMENT.UPDATE_BY_ID.replace(":id",n),e);return this.handleResponse(t)}catch(t){return this.handleError(t)}}static async deleteAssignment(e){try{const n=await this.apiClient.delete(i.b.COURSE.ASSIGNMENT.DELETE_BY_ID.replace(":id",e));return this.handleResponse(n)}catch(n){return this.handleError(n)}}static async createIntroAttachment(e){try{const n=await this.apiClient.post(i.b.COURSE.ASSIGNMENT.INTRO_ATTACHMENT,e);return this.handleResponse(n)}catch(n){return this.handleError(n)}}static async updateIntroAttachment(e,n){try{const t=await this.apiClient.put("".concat(i.b.COURSE.ASSIGNMENT.INTRO_ATTACHMENT,"/").concat(n),e);return this.handleResponse(t)}catch(t){return this.handleError(t)}}static async deleteIntroAttachment(e){try{const n=await this.apiClient.delete("".concat(i.b.COURSE.ASSIGNMENT.INTRO_ATTACHMENT,"/").concat(e));return this.handleResponse(n)}catch(n){return this.handleError(n)}}}a.apiClient=(0,s.Z)({baseURL:"https://api.codedynamite.click",isAuthorization:!0})}}]);