(self.webpackChunkfrontend_app=self.webpackChunkfrontend_app||[]).push([[4527],{18708:(e,t,s)=>{"use strict";s.d(t,{J:()=>n});let a=0,o=(new Date).toISOString().replace(/T.*$/,"");n(),n();function n(){return String(a++)}},80240:(e,t,s)=>{"use strict";s.d(t,{Z:()=>y});var a=s(2e3),o=s(10306),n=s(61682),i=s(14298),r=s(49709),l=s(79536),c=s(99221),d=s(80007),u=s(38476),v=s(18796),m=s(63521),p=s(23885),g=s(47313),h=s(46417);function y(e){let{events:t,handleDateSelect:s,editable:r}=e;const[l,c]=(0,g.useState)((()=>p.ZP.language));return(0,g.useEffect)((()=>{c(p.ZP.language)}),[p.ZP.language]),(0,h.jsx)("div",{className:"demo-app",children:(0,h.jsx)("div",{className:"demo-app-main",children:(0,h.jsx)(n.Z,{plugins:[a.Z,i.Z,o.ZP],headerToolbar:{right:"prev,next today",left:"title"},initialView:"dayGridMonth",editable:r||!1,selectable:!0,selectMirror:!0,dayMaxEvents:!0,select:s,eventContent:S,eventClick:function(){},events:t,locale:"en"===l?m.Z:v.Z})})})}function S(e){return(0,h.jsx)(r.Z,{title:e.event.title,placement:"top-start",children:(0,h.jsxs)(l.Z,{sx:{padding:"5px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis","@media (max-width: 600px)":{fontSize:"10px",padding:"3px"}},children:[(0,h.jsx)(u.Z,{sx:{fontSize:"12px","@media (max-width: 600px)":{fontSize:"10px"}},children:e.timeText}),(0,h.jsx)(c.Z,{sx:{color:"white",textWrap:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontSize:"13px","@media (max-width: 600px)":{fontSize:"11px"}},children:e.event.title}),(0,h.jsx)(d.Z,{sx:{fontSize:"12px",color:"grey","@media (max-width: 600px)":{fontSize:"10px"}},children:e.event.extendedProps.description||"No description"})]})})}},96743:(e,t,s)=>{"use strict";s.d(t,{Z:()=>h});var a=s(79536),o=s(66212),n=s(1550),i=s(15103),r=s(51405),l=s(49914),c=s(88797),d=s(47313);const u="styles_container__Lu+Ak",v="styles_formWrapperContainer__9YqpE",m="styles_selectedChip__dhVt2";var p=s(46417);const g={PaperProps:{style:{maxHeight:224}}},h=e=>{const[t,s]=(0,d.useState)(e.filterList);return(0,p.jsx)("div",{className:u,children:(0,p.jsxs)(n.Z,{className:v,children:[(0,p.jsx)(i.Z,{id:"multipleChipLabel",children:e.label}),(0,p.jsx)(c.Z,{style:{backgroundColor:e.backgroundColor||"white"},id:"multipleChip",labelId:"demo-multipleChipLabel-chip-label",multiple:!0,value:t,onChange:t=>{const{target:{value:a}}=t;s("string"===typeof a?a.split(","):a),e.onFilterListChangeHandler("string"===typeof a?a.split(","):a)},input:(0,p.jsx)(l.Z,{id:"selectMultipleChip",label:e.label}),renderValue:e=>(0,p.jsx)(a.Z,{className:m,children:e.map((e=>(0,p.jsx)(o.Z,{label:e},e)))}),MenuProps:g,fullWidth:!0,readOnly:e.readOnly,children:e.defaultChipList.map((e=>(0,p.jsx)(r.Z,{value:e,children:e},e)))})]})})}},5124:(e,t,s)=>{"use strict";s.d(t,{Z:()=>E});var a=s(47313),o=s(57983),n=s(81195),i=s(1550),r=s(70501),l=s(49709),c=s(47131),d=s(31649),u=s(71263);const v="styles_gridContainer__ZApDK",m="styles_formWrapper__10Eqy",p="styles_container__J54Lz",g="styles_inputField__u9Uo-",h="styles_button__y3T1G",y="styles_searchDivider__e5Dah";var S=s(9019),x=s(41727),f=s(19536),_=s(75590),b=s(46417);const E=e=>{const{t:t}=(0,_.$G)(),{onSearchClick:s,placeHolder:E}=e,[Z,U]=(0,a.useState)(!1),[j,C]=(0,a.useState)("");return(0,a.useEffect)((()=>{U(null!==j&&""!==j)}),[j]),(0,b.jsx)(S.ZP,{container:!0,className:v,style:{maxWidth:e.maxWidth?e.maxWidth:"600px"},children:(0,b.jsx)(S.ZP,{item:!0,xs:12,md:12,sm:12,lg:12,children:(0,b.jsx)(i.Z,{className:m,children:(0,b.jsx)(r.Z,{className:p,style:{width:"100%"},children:(0,b.jsx)(d.ZP,{className:g,placeholder:E||t("common_search"),onChange:e=>{C(e.target.value)},value:j,startAdornment:(0,b.jsxs)(x.Z,{position:"start",children:[(0,b.jsx)(l.Z,{title:t("search_bar_click"),arrow:!0,disableInteractive:!0,children:(0,b.jsx)(c.Z,{onClick:()=>{s(j)},children:(0,b.jsx)(o.Z,{})})}),(0,b.jsx)(f.Z,{className:y,orientation:"vertical"})]}),endAdornment:(0,b.jsx)(x.Z,{position:"end",children:Z?(0,b.jsx)(c.Z,{onClick:()=>{C(""),U(!1)},className:h,edge:"end",children:(0,b.jsx)(n.Z,{})}):(0,b.jsx)(c.Z,{className:h,disabled:!0,edge:"end",children:(0,b.jsx)(u.Z,{})})})})})})})})}},32952:(e,t,s)=>{"use strict";s.d(t,{Z:()=>d});s(47313);var a=s(79536),o=s(6306),n=s(54045),i=s(99249),r=s(75975),l=s(78925),c=s(46417);function d(e){let{files:t=[],treeView:s=!0}=e;const d=async e=>{if(void 0===e)return;const s=t.find((t=>t.id===e));if(s)if(s.downloadUrl){const e=await fetch(s.downloadUrl),t=await e.blob();(0,l.saveAs)(t,s.name)}else console.error("File not found")};return(0,c.jsx)(a.Z,{sx:{flexGrow:1},children:s?(0,c.jsx)(i.L,{"aria-label":"file system navigator",defaultCollapseIcon:(0,c.jsx)(o.Z,{}),defaultExpandIcon:(0,c.jsx)(n.Z,{}),children:0!==t.length&&(0,c.jsx)(r.k,{nodeId:"root",label:"Files",children:t.map(((e,t)=>(0,c.jsx)("div",{className:"thumbnail",children:(0,c.jsx)("a",{href:e.downloadUrl,style:{display:"block",wordBreak:"break-word",whiteSpace:"normal"},onClick:t=>{t.preventDefault(),d(e.id)},children:e.name},e.id)},t)))})}):(0,c.jsx)("div",{className:"thumbnail",children:t.map(((e,t)=>(0,c.jsx)("a",{href:e.downloadUrl,style:{display:"block",wordBreak:"break-word",whiteSpace:"normal"},onClick:t=>{t.preventDefault(),d(e.id)},children:e.name},e.id)))})})}},38476:(e,t,s)=>{"use strict";s.d(t,{Z:()=>r});var a,o=s(30168),n=s(17592),i=s(61113);const r=(0,n.ZP)(i.Z)(a||(a=(0,o.Z)(['\n  font-family: "Montserrat";\n  font-style: normal;\n  font-weight: ',";\n  font-size: 12px;\n  line-height: 16px;\n  letter-spacing: 0.015em;\n  color: ",";\n"])),(e=>e.fontWeight||400),(e=>"var(".concat(e.colorname||"--eerie-black-00",")")))},38556:(e,t,s)=>{"use strict";s.d(t,{Z:()=>n});var a=s(47313);function o(){const{innerWidth:e,innerHeight:t}=window;return{width:e,height:t}}function n(){const[e,t]=(0,a.useState)(o());return(0,a.useEffect)((()=>{function e(){t(o())}return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]),e}},19425:(e,t,s)=>{"use strict";s.d(t,{Q:()=>a,u:()=>o});let a=function(e){return e.assignment="Assignments",e.file="Files",e.url="URLs",e.exam="Quizzes",e}({}),o=function(e){return e[e.notSubmitted=1]="notSubmitted",e[e.submitted=2]="submitted",e}({})},83789:(e,t,s)=>{"use strict";s.d(t,{_:()=>f,Z:()=>_});var a=s(2119);const o={container:"styles_container__89t5M",accordionContainer:"styles_accordionContainer__l4KO7",announcementSubject:"styles_announcementSubject__Vfj0V","MuiInputBase-root":"styles_MuiInputBase-root__+yGDr",imageResource:"styles_imageResource__p65z5",titleContainer:"styles_titleContainer__8T9rn",title:"styles_title__ZOMam"};var n=s(24110),i=s(41872),r=s(98492),l=s(79536),c=s(47313),d=s(80007),u=s(99140),v=s(92556),m=s(58467),p=s(90469),g=s(75590),h=s(10658),y=s.n(h),S=s(37400),x=s(46417);let f=function(e){return e.assignment="assignment",e.exam="exam",e}({});const _=e=>{let{resourceTitle:t,resourceEndedDate:s,courseId:h,examId:_,intro:b,type:E}=e;const{t:Z}=(0,g.$G)(),U=(0,m.s0)();E=E||f.assignment;const[j,C]=(0,c.useState)(!1);return(0,x.jsx)(l.Z,{className:o.container,children:(0,x.jsxs)(n.Z,{expanded:j,className:o.accordionContainer,children:[(0,x.jsxs)(r.Z,{className:o.accordionDetails,onClick:()=>{C(!0)},children:[(0,x.jsxs)(l.Z,{className:o.titleContainer,children:[(0,x.jsx)("img",{src:E==f.assignment?S.Z.course.assignmentIcon:S.Z.course.quizIcon,className:o.imageResource,alt:"assignment"}),(0,x.jsx)(d.Z,{children:t})]}),(0,x.jsxs)(d.Z,{"translation-key":"course_assignment_deadline",children:[Z("course_assignment_deadline"),": ",y()(s).format("hh:mm DD/MM/YYYY")]})]}),(0,x.jsx)(i.Z,{children:(0,x.jsx)(v.Z,{value:b,readOnly:!0})}),(0,x.jsxs)(a.Z,{children:[(0,x.jsx)(u.Z,{btnType:u.s.Text,onClick:()=>{C(!1)},"translation-key":"common_cancel",children:Z("common_cancel")}),(0,x.jsx)(u.Z,{btnType:u.s.Primary,onClick:()=>{E===f.assignment?U(p._.lecturer.assignment.detail.replace(":courseId",null!==h&&void 0!==h?h:"").replace(":assignmentId",null!==_&&void 0!==_?_:"")):U(p._.lecturer.exam.detail.replace(":courseId",null!==h&&void 0!==h?h:"").replace(":examId",null!==_&&void 0!==_?_:""))},"translation-key":"course_assignment_detail",children:Z("course_assignment_detail")})]})]})})}},15067:(e,t,s)=>{"use strict";s.d(t,{N:()=>l});var a=s(35662),o=s(66010),n=s(74776),i=s.n(n);const r="https://api.codedynamite.site";class l{static async getCourses(e){let{search:t="",courseType:s=[],pageNo:n=0,pageSize:l=10}=e;try{const e=await a.Z.get("".concat(r).concat(o.b.COURSE.COURSE.DEFAULT),{params:{search:t,courseType:s,pageNo:n,pageSize:l},paramsSerializer:e=>i().stringify(e,{arrayFormat:"repeat"})});if(200===e.status)return Promise.resolve(e.data)}catch(g){var c,d,u,v,m,p;return console.error("Failed to fetch courses",g),Promise.reject({code:(null===(c=g.response)||void 0===c||null===(d=c.data)||void 0===d?void 0:d.code)||503,status:(null===(u=g.response)||void 0===u||null===(v=u.data)||void 0===v?void 0:v.status)||"Service Unavailable",message:(null===(m=g.response)||void 0===m||null===(p=m.data)||void 0===p?void 0:p.message)||g.message})}}static async getSectionsByCourseId(e){try{const t=await a.Z.get("".concat(r).concat(o.b.COURSE.COURSE.SECTION,"/").concat(e));if(200===t.status)return t.data}catch(d){var t,s,n,i,l,c;return console.error("Failed to fetch sections by course id",d),Promise.reject({code:(null===(t=d.response)||void 0===t||null===(s=t.data)||void 0===s?void 0:s.code)||503,status:(null===(n=d.response)||void 0===n||null===(i=n.data)||void 0===i?void 0:i.status)||"Service Unavailable",message:(null===(l=d.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)||d.message})}}}},6968:(e,t,s)=>{"use strict";s.d(t,{_:()=>i});var a=s(35662),o=s(66010);const n="https://api.codedynamite.site";class i{static async getCourseTypes(){try{const e=await a.Z.get("".concat(n).concat(o.b.COURSE.COURSE_TYPE.DEFAULT),{});if(200===e.status)return Promise.resolve(e.data)}catch(c){var e,t,s,i,r,l;return console.error("Failed to fetch course types",c),Promise.reject({code:(null===(e=c.response)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.code)||503,status:(null===(s=c.response)||void 0===s||null===(i=s.data)||void 0===i?void 0:i.status)||"Service Unavailable",message:(null===(r=c.response)||void 0===r||null===(l=r.data)||void 0===l?void 0:l.message)||c.message})}}static async getCourseTypeById(e){try{const t=await a.Z.get("".concat(n).concat(o.b.COURSE.COURSE_TYPE.GET_BY_ORGANIZATION_ID).replace(":id",e));if(200===t.status)return t.data}catch(d){var t,s,i,r,l,c;return console.error("Failed to fetch course type by organization id",d),Promise.reject({code:(null===(t=d.response)||void 0===t||null===(s=t.data)||void 0===s?void 0:s.code)||503,status:(null===(i=d.response)||void 0===i||null===(r=i.data)||void 0===r?void 0:r.status)||"Service Unavailable",message:(null===(l=d.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)||d.message})}}}},4094:(e,t,s)=>{"use strict";s.d(t,{E:()=>l});var a=s(35662),o=s(66010),n=s(74776),i=s.n(n);const r="https://api.codedynamite.site";class l{static async getUserByCourseId(e,t){let{search:s="",pageNo:n=0,pageSize:i=10}=t;try{const t=await a.Z.get("".concat(r).concat(o.b.COURSE.COURSE_USER.GET_USER_BY_COURSE_ID.replace(":id",e)),{params:{search:s,pageNo:n,pageSize:i}});if(200===t.status)return Promise.resolve(t.data)}catch(p){var l,c,d,u,v,m;return console.error("Failed to fetch course user",p),Promise.reject({code:(null===(l=p.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.code)||503,status:(null===(d=p.response)||void 0===d||null===(u=d.data)||void 0===u?void 0:u.status)||"Service Unavailable",message:(null===(v=p.response)||void 0===v||null===(m=v.data)||void 0===m?void 0:m.message)||p.message})}}static async countStudentByCourseId(e){try{const t=await a.Z.get("".concat(r).concat(o.b.COURSE.COURSE_USER.COUNT_STUDENT_BY_COURSE_ID.replace(":id",e)));if(200===t.status)return Promise.resolve(t.data)}catch(d){var t,s,n,i,l,c;return console.error("Failed to fetch course user",d),Promise.reject({code:(null===(t=d.response)||void 0===t||null===(s=t.data)||void 0===s?void 0:s.code)||503,status:(null===(n=d.response)||void 0===n||null===(i=n.data)||void 0===i?void 0:i.status)||"Service Unavailable",message:(null===(l=d.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)||d.message})}}static async getAllCourseByUserId(e,t){let{search:s="",courseType:n=[],pageNo:l=0,pageSize:c=10}=t;try{const t=await a.Z.get("".concat(r).concat(o.b.COURSE.COURSE_USER.GET_ALL_COURSE_BY_USER_ID.replace(":id",e)),{params:{search:s,courseType:n,pageNo:l,pageSize:c},paramsSerializer:e=>i().stringify(e,{arrayFormat:"repeat"})});if(200===t.status)return Promise.resolve(t.data)}catch(h){var d,u,v,m,p,g;return console.error("Failed to fetch course user",h),Promise.reject({code:(null===(d=h.response)||void 0===d||null===(u=d.data)||void 0===u?void 0:u.code)||503,status:(null===(v=h.response)||void 0===v||null===(m=v.data)||void 0===m?void 0:m.status)||"Service Unavailable",message:(null===(p=h.response)||void 0===p||null===(g=p.data)||void 0===g?void 0:g.message)||h.message})}}}},74512:(e,t,s)=>{"use strict";s.d(t,{O:()=>i});var a=s(35662),o=s(66010);const n="https://api.codedynamite.site";class i{static async getExamsByCourseId(e){try{const t=await a.Z.get("".concat(n).concat(o.b.COURSE.EXAM.DEFAULT.replace(":courseId",e)));if(200===t.status)return Promise.resolve(t.data)}catch(d){var t,s,i,r,l,c;return console.error("Failed to fetch exams",d),Promise.reject({code:(null===(t=d.response)||void 0===t||null===(s=t.data)||void 0===s?void 0:s.code)||503,status:(null===(i=d.response)||void 0===i||null===(r=i.data)||void 0===r?void 0:r.status)||"Service Unavailable",message:(null===(l=d.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)||d.message})}}static async getExamById(e){try{const t=await a.Z.get("".concat(n).concat(o.b.COURSE.EXAM.GET_BY_ID.replace(":id",e)));if(200===t.status)return Promise.resolve(t.data)}catch(d){var t,s,i,r,l,c;return console.error("Failed to fetch exam",d),Promise.reject({code:(null===(t=d.response)||void 0===t||null===(s=t.data)||void 0===s?void 0:s.code)||503,status:(null===(i=d.response)||void 0===i||null===(r=i.data)||void 0===r?void 0:r.status)||"Service Unavailable",message:(null===(l=d.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)||d.message})}}static async getExamQuestionById(e,t){try{const s=null!==t?t:"",i=await a.Z.get("".concat(n).concat(o.b.COURSE.EXAM_QUESTION.DEFAULT.replace(":examId",e),"?currentPage=").concat(s));if(200===i.status)return Promise.resolve(i.data)}catch(u){var s,i,r,l,c,d;return console.error("Failed to fetch exam",u),Promise.reject({code:(null===(s=u.response)||void 0===s||null===(i=s.data)||void 0===i?void 0:i.code)||503,status:(null===(r=u.response)||void 0===r||null===(l=r.data)||void 0===l?void 0:l.status)||"Service Unavailable",message:(null===(c=u.response)||void 0===c||null===(d=c.data)||void 0===d?void 0:d.message)||u.message})}}static async getOverviewsByExamId(e){try{const t=await a.Z.get("".concat(n).concat(o.b.COURSE.EXAM.OVERVIEW.replace(":id",e)));if(200===t.status)return Promise.resolve(t.data)}catch(d){var t,s,i,r,l,c;return console.error("Failed to fetch exam overview",d),Promise.reject({code:(null===(t=d.response)||void 0===t||null===(s=t.data)||void 0===s?void 0:s.code)||503,status:(null===(i=d.response)||void 0===i||null===(r=i.data)||void 0===r?void 0:r.status)||"Service Unavailable",message:(null===(l=d.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)||d.message})}}static async createExam(e){try{const t=await a.Z.post("".concat(n).concat(o.b.COURSE.EXAM.CREATE),e);if(200===t.status)return t.data}catch(d){var t,s,i,r,l,c;return console.error("Failed to create exam",d),Promise.reject({code:(null===(t=d.response)||void 0===t||null===(s=t.data)||void 0===s?void 0:s.code)||503,status:(null===(i=d.response)||void 0===i||null===(r=i.data)||void 0===r?void 0:r.status)||"Service Unavailable",message:(null===(l=d.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)||d.message})}}static async startExam(e){try{const t=await a.Z.post("".concat(n).concat(o.b.COURSE.EXAM.START),e);if(200===t.status)return t.data}catch(d){var t,s,i,r,l,c;return console.error("Failed to start exam",d),Promise.reject({code:(null===(t=d.response)||void 0===t||null===(s=t.data)||void 0===s?void 0:s.code)||503,status:(null===(i=d.response)||void 0===i||null===(r=i.data)||void 0===r?void 0:r.status)||"Service Unavailable",message:(null===(l=d.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)||d.message})}}static async endExam(e){try{const t=await a.Z.post("".concat(n).concat(o.b.COURSE.EXAM.END),e);if(200===t.status)return t.data}catch(d){var t,s,i,r,l,c;return console.error("Failed to end exam",d),Promise.reject({code:(null===(t=d.response)||void 0===t||null===(s=t.data)||void 0===s?void 0:s.code)||503,status:(null===(i=d.response)||void 0===i||null===(r=i.data)||void 0===r?void 0:r.status)||"Service Unavailable",message:(null===(l=d.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)||d.message})}}static async submitExam(e){try{const t=await a.Z.post("".concat(n).concat(o.b.COURSE.EXAM.SUBMIT),e);if(200===t.status)return t.data}catch(d){var t,s,i,r,l,c;return console.error("Failed to submit exam",d),Promise.reject({code:(null===(t=d.response)||void 0===t||null===(s=t.data)||void 0===s?void 0:s.code)||503,status:(null===(i=d.response)||void 0===i||null===(r=i.data)||void 0===r?void 0:r.status)||"Service Unavailable",message:(null===(l=d.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)||d.message})}}static async getExamSubmissionById(e){try{const t=await a.Z.get("".concat(n).concat(o.b.COURSE.EXAM.SUBMISSION.replace(":id",e)));if(200===t.status)return Promise.resolve(t.data)}catch(d){var t,s,i,r,l,c;return console.error("Failed to fetch exam submission",d),Promise.reject({code:(null===(t=d.response)||void 0===t||null===(s=t.data)||void 0===s?void 0:s.code)||503,status:(null===(i=d.response)||void 0===i||null===(r=i.data)||void 0===r?void 0:r.status)||"Service Unavailable",message:(null===(l=d.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)||d.message})}}}},33256:(e,t,s)=>{"use strict";s.d(t,{J:()=>i});var a=s(35662),o=s(66010);const n="https://api.codedynamite.site";class i{static async getSubmissionAssignmentById(e,t){try{const s=await a.Z.get("".concat(n).concat(o.b.COURSE.SUBMISSION_ASSIGNMENT.GET_BY_USER_ID_ASSIGNMENT_ID),{params:{userId:e,assignmentId:t}});if(200===s.status)return s.data}catch(u){var s,i,r,l,c,d;return console.error("Failed to fetch submission assignment by id",u),Promise.reject({code:(null===(s=u.response)||void 0===s||null===(i=s.data)||void 0===i?void 0:i.code)||503,status:(null===(r=u.response)||void 0===r||null===(l=r.data)||void 0===l?void 0:l.status)||"Service Unavailable",message:(null===(c=u.response)||void 0===c||null===(d=c.data)||void 0===d?void 0:d.message)||u.message})}}static async getSubmissionAssignmentByAssignmentId(e){try{const t=await a.Z.get("".concat(n).concat(o.b.COURSE.SUBMISSION_ASSIGNMENT.DEFAULT),{params:{assignmentId:e}});if(200===t.status)return t.data}catch(d){var t,s,i,r,l,c;return console.error("Failed to fetch submission assignment by id",d),Promise.reject({code:(null===(t=d.response)||void 0===t||null===(s=t.data)||void 0===s?void 0:s.code)||503,status:(null===(i=d.response)||void 0===i||null===(r=i.data)||void 0===r?void 0:r.status)||"Service Unavailable",message:(null===(l=d.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)||d.message})}}static async countSubmissionToGrade(e){try{const t=await a.Z.get("".concat(n).concat(o.b.COURSE.SUBMISSION_ASSIGNMENT.COUNT_TO_GRADE),{params:{assignmentId:e}});if(200===t.status)return t.data}catch(d){var t,s,i,r,l,c;return console.error("Failed to fetch submission assignment by id",d),Promise.reject({code:(null===(t=d.response)||void 0===t||null===(s=t.data)||void 0===s?void 0:s.code)||503,status:(null===(i=d.response)||void 0===i||null===(r=i.data)||void 0===r?void 0:r.status)||"Service Unavailable",message:(null===(l=d.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)||d.message})}}static async countAllSubmission(e){try{const t=await a.Z.get("".concat(n).concat(o.b.COURSE.SUBMISSION_ASSIGNMENT.COUNT_ALL),{params:{assignmentId:e}});if(200===t.status)return t.data}catch(d){var t,s,i,r,l,c;return console.error("Failed to fetch submission assignment by id",d),Promise.reject({code:(null===(t=d.response)||void 0===t||null===(s=t.data)||void 0===s?void 0:s.code)||503,status:(null===(i=d.response)||void 0===i||null===(r=i.data)||void 0===r?void 0:r.status)||"Service Unavailable",message:(null===(l=d.response)||void 0===l||null===(c=l.data)||void 0===c?void 0:c.message)||d.message})}}}},71538:(e,t,s)=>{"use strict";s.d(t,{m:()=>a});const a=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en";if(e<0)return"0h 0m 0s";const s=Math.floor(e/31536e6),a=Math.floor(e%31536e6/2592e6),o=Math.floor(e%2592e6/864e5),n=Math.floor(e%864e5/36e5),i=Math.floor(e%36e5/6e4),r=Math.floor(e%6e4/1e3);let l="";return"vi"===t?(s>0&&(l+="".concat(s," n\u0103m ")),a>0&&(l+="".concat(a," th\xe1ng ")),o>0&&(l+="".concat(o," ng\xe0y ")),n>0&&(l+="".concat(n," gi\u1edd ")),l+="".concat(i," ph\xfat ").concat(r," gi\xe2y ")):(s>0&&(l+="".concat(s," years ")),a>0&&(l+="".concat(a," months ")),o>0&&(l+="".concat(o," days ")),n>0&&(l+="".concat(n,"h ")),l+="".concat(i,"m ").concat(r,"s ")),l.trim()}},24654:()=>{}}]);