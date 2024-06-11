"use strict";(self.webpackChunkfrontend_app=self.webpackChunkfrontend_app||[]).push([[3534],{33534:(e,t,n)=>{n.r(t),n.d(t,{AlertType:()=>W,EAmountAnswer:()=>D,ELanguage:()=>O,EQType:()=>B,EQuestionLevel:()=>Q,default:()=>L});var s=n(9019),r=n(47825),i=n(79536),a=n(88797),o=n(51405),l=n(47131),c=n(90200),u=n(16977),d=n(31845),h=n(80007),m=n(99221),g=n(47313),x=n(58467);const p={root:"styles_root__vXtW1",container:"styles_container__MFkqz",tabWrapper:"styles_tabWrapper__MFNE8",formBody:"styles_formBody__DxuXr",linkLevel:"styles_linkLevel__IdAe2",breadCump:"styles_breadCump__-wDLP",stickyFooterItem:"styles_stickyFooterItem__uqWa2",phantom:"styles_phantom__jZGw4",stickyFooterContainer:"styles_stickyFooterContainer__Bcksd",textEditor:"styles_textEditor__iVHEZ",listQuestion:"styles_listQuestion__T13Y8",loading:"styles_loading__73Cb6",questionCard:"styles_questionCard__SuPmB",question:"styles_question__uXlVt",questionEdit:"styles_questionEdit__r1C9o",btnContainer:"styles_btnContainer__8YPLQ",deleteBtn:"styles_deleteBtn__7W8hR",answer:"styles_answer__LNsbL",answerItem:"styles_answerItem__oRBVS",answerContent:"styles_answerContent__4DsxE",answerContentEdit:"styles_answerContentEdit__Hytjx",none:"styles_none__5d3Wz"};var y=n(99140),w=n(47477),j=n(15305),f=n(34923),_=n(97707),Z=n(83929),v=n(74268),q=n(38037),C=n(51997),b=n(85281),T=n(27013),E=n(3352),S=n(20637);const N=new E.$D("AIzaSyCzF7o3Z3RTO8Bqo6s18Yj18WyFeqZrvVM"),A=[{qtypeId:1,questions:[{id:0,question:"Ai l\xe0 ng\u01b0\u1eddi \u0111\u1eb7t c\xe2u h\u1ecfi n\xe0y ?",answers:[{id:1,content:"Kh\xf4ng ai c\u1ea3"}]},{id:1,question:"Google l\xe0 c\xf4ng ty n\xe0o ?",answers:[{id:1,content:"Google l\xe0 m\u1ed9t c\xf4ng ty \u0111a qu\u1ed1c gia c\u1ee7a M\u1ef9 chuy\xean v\u1ec1 c\xf4ng ngh\u1ec7, t\u1eadp trung v\xe0o c\xe1c d\u1ecbch v\u1ee5 v\xe0 s\u1ea3n ph\u1ea9m li\xean quan \u0111\u1ebfn Internet, bao g\u1ed3m:\n\t\t\t\t\tC\xf4ng c\u1ee5 t\xecm ki\u1ebfm:"}]}]},{qtypeId:2,questions:[{id:0,question:"Ai l\xe0 ng\u01b0\u1eddi \u0111\u1eb7t c\xe2u h\u1ecfi n\xe0y ?",answers:[{id:1,content:"D\u01b0\u01a1ng Ch\xed Th\xf4ng"},{id:2,content:"Nguy\u1ec5n Qu\u1ed1c Tu\u1ea5n"},{id:3,content:"Tr\u01b0\u01a1ng Gia Ti\u1ebfn"}],correctAnswer:1}]},{qtypeId:3,questions:[{id:0,question:"Elon Musk stated that Tesla will not accept payments in ________ because of environmental concerns.",answers:[{id:0,content:"Bitcoin"}]}]},{qtypeId:4,questions:[{id:0,question:"Elon Musk stated that Tesla will not accept payments in Bitcoin because of environmental concerns.",answers:[{id:1,content:"True"},{id:2,content:"False"}],correctAnswer:1},{id:1,question:"Con trai th\u01b0\u1eddng c\xe1 t\xednh h\u01a1n con g\xe1i ?",answers:[{id:1,content:"True"},{id:2,content:"False"}],correctAnswer:1}]}];const k=async function(e,t,n,s,r,i,a){const o=A.find((e=>e.qtypeId===n)),l=N.getGenerativeModel({model:"gemini-1.5-flash-latest"});let c="";c=n===B.Essay?"Essay":n===B.MultipleChoice?"Multiple choice":n===B.ShortAnswer?"Short answer":"True/false";let u="";u=i===Q.Easy?"Beginner":i===Q.Medium?"Intermediate":"Advanced";const d='\nII. SYSTEM_INSTRUCTIONS:\n\tA. Goal: Generate a well-structured JSON response containing questions aligned with the specified criteria.\n\n\tB. Provided Information Details:\n\t- Topic: "'.concat(e,'"\n\t- Description: ').concat(t||"No description provided.",'\n\t- Question Type: "').concat(c,'"\n  ').concat(n===B.MultipleChoice?"- The Amount of answer to each question: ".concat(s):"","\n  - Number of Questions: ").concat(r,'\n\t- Level: "').concat(u,'"\n\n\tC. Expected Response Format:\n\t\tThe structure of the response must be JSON which follows the following structure:\n\t\t- qtypeId: The type of question contains the following values.\n\t\t\t+ 1: Essay\n\t\t\t+ 2: Multiple choice\n\t\t\t+ 3: Short answer\n\t\t\t+ 4: True/False\n\t\t- questions: An array of questions (IQuestion).\n\t\t\t+ IQuestion: The data structure for a question:\n\t\t\t\t* id: A number, the unique identifier for the question.\n\t\t\t\t* question: A string, the content of the question. Do not use "" (Quotation Marks) on any character in the string. Instead, if you want to highlight text,... For example, replace it with \\"Personal Name\\" \n\t\t\t\t* answers: An array of answer (IAnswer[]) representing the answer\n\t\t\t\t\t** Note:\n\t\t\t\t\t\t*** Answer should follow the markdown syntax. Must be use "\\n" for line breaks.\n\t\t\t\t\t\t*** For "Essay" and "Short Answer" questions, there should only be 1 answer element, and the content attribute of the answer should not be empty or null. It should be filled with complete information, which can be the detailed answer to the question, suggestions for answering the question, etc., to help the question creator know the appropriate answer.\n\t\t\t\t\t\t*** For "True/False" questions, there should be two answer elements, which are the correct answer and the incorrect answer. Sample: [{ id: 1, content: "True" }, { id: 2, content: "False" }]\n\t\t\t\t\t** IAnswer: The data structure for an answer:\n\t\t\t\t\t\t*** id: A number, the unique identifier for the answer.\n\t\t\t\t\t\t*** content: A string, the content of the answer. Do not use "" (Quotation Marks) on any character in the string. Instead, if you want to highlight text,... For example, replace it with \\"Personal Name\\" \n\t\t\t\t* correctAnswer: The index of the correct answer (only applies to multiple choice and true/false questions).\n\n\t\tExample Response Format:\n\t\t\t').concat(JSON.stringify(o),"\n\n\t\tNote: Ensure the response is in valid JSON format !!!\n\n\tD. Additional Considerations:\n\t\t- Clarity: Questions should be clear, concise, and directly address the learning objectives.\n\t\t- Comprehensiveness: Cover various aspects of the topic, ensuring a balanced assessment of understanding.\n\t\t- Difficulty: Tailor the question difficulty level to the specified ").concat(u,".\n\n\tE. Please use ").concat(a===O.Vietnamese?"Vietnamese":"English"," everywhere to write questions and answers for students."),h="\n".concat("\nI. YOUR ROLE:\n\tA. You are Generator Question AI, a large language model trained on a massive dataset of text and code.\n  B. Your expertise encompasses various domains, including software engineering and programming.\n  C. You can generate code-related questions of diverse types (multiple choice, true/false, short answer, essay) to aid learning and assessment in Tertiary Education.","\n\n").concat(d);try{const e=await l.generateContent(h),t=await e.response,n=t.text().replace(/```/g,"").replace(/json/g,"");console.log("cleanText",n);const s=(0,S.K)(n),r=JSON.parse(s);return console.log(r),r}catch(m){return m}};var I=n(19187),P=n(75590),F=n(23885),M=n(46417);let W=function(e){return e.Success="success",e.INFO="info",e.Warning="warning",e.Error="error",e}({}),B=function(e){return e[e.Essay=1]="Essay",e[e.MultipleChoice=2]="MultipleChoice",e[e.ShortAnswer=3]="ShortAnswer",e[e.TrueFalse=4]="TrueFalse",e}({}),Q=function(e){return e[e.Easy=1]="Easy",e[e.Medium=2]="Medium",e[e.Hard=3]="Hard",e}({}),O=function(e){return e[e.Vietnamese=1]="Vietnamese",e[e.English=2]="English",e}({}),D=function(e){return e[e.Three=3]="Three",e[e.Four=4]="Four",e[e.Five=5]="Five",e}({});const L=e=>{const t=(0,x.s0)(),n=((0,x.SN)(),(0,g.useRef)(null));let{height:E}=(0,w.Z)({ref:n});e.insideCrumb&&(E=0);const[S,N]=(0,g.useState)(!1),{t:A}=(0,P.$G)(),[L,V]=(0,g.useState)([]),[R,z]=(0,g.useState)(0),[G,Y]=(0,g.useState)(!1),[H,J]=(0,g.useState)(""),[U,K]=(0,g.useState)(""),[X,$]=(0,g.useState)(5),[ee,te]=(0,g.useState)(Q.Easy),[ne,se]=(0,g.useState)(B.MultipleChoice),[re,ie]=(0,g.useState)(O.Vietnamese),[ae,oe]=(0,g.useState)(D.Three),[le,ce]=(0,g.useState)(!1),[ue,de]=(0,g.useState)(""),[he,me]=(0,g.useState)(W.Success);const ge=(0,x.UO)();return(0,M.jsxs)(s.ZP,{className:p.root,children:[(0,M.jsx)(c.Z,{ref:n}),(0,M.jsxs)(r.Z,{style:{marginTop:"".concat(E,"px")},className:p.container,children:[(0,M.jsx)(i.Z,{className:p.tabWrapper,children:(0,M.jsxs)(h.Z,{className:p.breadCump,colorname:"--gray-50",fontWeight:"600",children:[(0,M.jsx)("span",{onClick:()=>t("/lecturer/question-bank-management"),"translation-key":"common_question_bank",children:F.ZP.format(A("common_question_bank"),"firstUppercase")})," ","> ",(0,M.jsx)("span",{onClick:()=>t("/lecturer/question-bank-management/".concat(ge.categoryId)),children:"H\u1ecdc OOP"})," ","> ",(0,M.jsx)("span",{children:"T\u1ea1o c\xe2u h\u1ecfi"})]})}),(0,M.jsxs)(s.ZP,{container:!0,spacing:1,columns:12,children:[(0,M.jsx)(s.ZP,{item:!0,xs:6,children:(0,M.jsxs)(i.Z,{component:"form",className:p.formBody,autoComplete:"off",children:[(0,M.jsx)(d.Z,{fontWeight:"500","translation-key":"common_add_question",children:A("common_add_question")}),(0,M.jsxs)(s.ZP,{container:!0,spacing:1,columns:12,children:[(0,M.jsx)(s.ZP,{item:!0,xs:12,md:3,children:(0,M.jsx)(m.Z,{children:"Danh m\u1ee5c"})}),(0,M.jsx)(s.ZP,{item:!0,xs:12,md:9,children:(0,M.jsxs)(a.Z,{value:1,fullWidth:!0,size:"small",required:!0,children:[(0,M.jsx)(o.Z,{value:1,children:"Ten"}),(0,M.jsx)(o.Z,{value:2,children:"Twenty"}),(0,M.jsx)(o.Z,{value:3,children:"Thirty"})]})}),(0,M.jsx)(s.ZP,{item:!0,xs:12,md:3,children:(0,M.jsx)(m.Z,{children:"Ch\u1ee7 \u0111\u1ec1"})}),(0,M.jsx)(s.ZP,{item:!0,xs:12,md:9,children:(0,M.jsx)(u.Z,{onChange:e=>J(e.target.value),value:H,placeholder:"Nh\u1eadp ch\u1ee7 \u0111\u1ec1",fullWidth:!0})}),(0,M.jsx)(s.ZP,{item:!0,xs:12,md:3,children:(0,M.jsx)(m.Z,{children:"M\xf4 t\u1ea3"})}),(0,M.jsx)(s.ZP,{item:!0,xs:12,md:9,children:(0,M.jsx)(j.Z,{onChange:e=>K(e.target.value),value:U,placeholder:"Nh\u1eadp m\xf4 t\u1ea3",minRows:6,maxRows:6,size:"lg"})}),(0,M.jsx)(s.ZP,{item:!0,xs:12,md:3,children:(0,M.jsx)(m.Z,{children:"Lo\u1ea1i c\xe2u h\u1ecfi"})}),(0,M.jsx)(s.ZP,{item:!0,xs:12,md:9,children:(0,M.jsxs)(a.Z,{value:ne,onChange:e=>se(e.target.value),fullWidth:!0,size:"small",required:!0,children:[(0,M.jsx)(o.Z,{value:B.Essay,children:"T\u1ef1 lu\u1eadn"}),(0,M.jsx)(o.Z,{value:B.MultipleChoice,children:"Tr\u1eafc nghi\u1ec7m"}),(0,M.jsx)(o.Z,{value:B.ShortAnswer,children:"Tr\u1ea3 l\u1eddi ng\u1eafn"}),(0,M.jsx)(o.Z,{value:B.TrueFalse,children:"\u0110\xfang sai"})]})}),ne===B.MultipleChoice&&(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(s.ZP,{item:!0,xs:12,md:3,children:(0,M.jsx)(m.Z,{children:"S\u1ed1 l\u01b0\u1ee3ng \u0111\xe1p \xe1n"})}),(0,M.jsx)(s.ZP,{item:!0,xs:12,md:9,children:(0,M.jsxs)(a.Z,{value:ae,onChange:e=>oe(e.target.value),fullWidth:!0,size:"small",required:!0,children:[(0,M.jsx)(o.Z,{value:D.Three,children:"3"}),(0,M.jsx)(o.Z,{value:D.Four,children:"4"}),(0,M.jsx)(o.Z,{value:D.Five,children:"5"})]})})]}),(0,M.jsx)(s.ZP,{item:!0,xs:12,md:3,children:(0,M.jsx)(m.Z,{children:"S\u1ed1 l\u01b0\u1ee3ng c\xe2u h\u1ecfi"})}),(0,M.jsx)(s.ZP,{item:!0,xs:12,md:9,children:(0,M.jsx)(u.Z,{type:"number",value:X,onChange:e=>{e.target.value<1&&$(1),$(e.target.value)},placeholder:"Nh\u1eadp s\u1ed1 l\u01b0\u1ee3ng c\xe2u h\u1ecfi"})}),(0,M.jsx)(s.ZP,{item:!0,xs:12,md:3,children:(0,M.jsx)(m.Z,{children:"\u0110\u1ed9 kh\xf3"})}),(0,M.jsx)(s.ZP,{item:!0,xs:12,md:9,children:(0,M.jsxs)(a.Z,{value:ee,onChange:e=>te(e.target.value),fullWidth:!0,size:"small",required:!0,children:[(0,M.jsx)(o.Z,{value:Q.Easy,children:"D\u1ec5"}),(0,M.jsx)(o.Z,{value:Q.Medium,children:"Trung b\xecnh"}),(0,M.jsx)(o.Z,{value:Q.Hard,children:"Kh\xf3"})]})}),(0,M.jsx)(s.ZP,{item:!0,xs:12,md:3,children:(0,M.jsx)(m.Z,{children:"Ng\xf4n ng\u1eef"})}),(0,M.jsx)(s.ZP,{item:!0,xs:12,md:9,children:(0,M.jsxs)(a.Z,{value:re,onChange:e=>ie(e.target.value),fullWidth:!0,size:"small",required:!0,children:[(0,M.jsx)(o.Z,{value:O.Vietnamese,children:"Ti\u1ebfng Vi\u1ec7t"}),(0,M.jsx)(o.Z,{value:O.English,children:"Ti\u1ebfng Anh"})]})})]}),(0,M.jsx)(y.Z,{onClick:async()=>{Y(!0),V([]),await k(H,U,ne,ae,X,ee,re).then((e=>{if(!e||"number"!==typeof(n=e).qtypeId||"object"!==typeof n.questions)throw new Error("Internal server error");var t,n;V(null===e||void 0===e?void 0:e.questions),z(null===e||void 0===e||null===(t=e.questions)||void 0===t?void 0:t.length),ce(!0),de("T\u1ea1o c\xe2u h\u1ecfi th\xe0nh c\xf4ng"),me(W.Success)})).catch((e=>{console.error("Error generating content:",e),ce(!0),de("T\u1ea1o c\xe2u h\u1ecfi th\u1ea5t b\u1ea1i, h\xe3y th\u1eed l\u1ea1i l\u1ea7n n\u1eefa"),me(W.Error)})).finally((()=>{Y(!1)}))},btnType:y.s.Primary,children:"T\u1ea1o c\xe2u h\u1ecfi"})]})}),(0,M.jsx)(s.ZP,{item:!0,xs:6,children:(0,M.jsxs)(i.Z,{className:p.listQuestion,children:[0!==(null===L||void 0===L?void 0:L.length)&&(0,M.jsx)(y.Z,{btnType:y.s.Primary,onClick:()=>{N(!S)},children:S?"L\u01b0u":"Ch\u1ec9nh s\u1eeda"}),0===(null===L||void 0===L?void 0:L.length)&&(0,M.jsx)(b.Z,{className:G?p.loading:p.none}),L&&L.map(((e,t)=>(0,M.jsxs)(i.Z,{className:p.questionCard,children:[(0,M.jsxs)(f.Z,{fontWeight:"500",children:[t+1,"/",R]}),(0,M.jsx)(q.Z,{className:S?p.questionEdit:p.question,fontWeight:"600",contentEditable:S,children:e.question}),(0,M.jsx)(i.Z,{className:p.answer,children:(0,M.jsx)(_.Z,{"aria-labelledby":"demo-radio-buttons-group-label",defaultValue:"female",name:"radio-buttons-group",value:e.correctAnswer,onChange:t=>((e,t)=>{V((n=>n.map((n=>n.id===t?{...n,correctAnswer:parseInt(e.target.value)}:n))))})(t,e.id),children:e.answers&&e.answers.map(((t,n)=>(0,M.jsx)(i.Z,{className:p.answerItem,children:e.correctAnswer?(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(Z.Z,{value:n+1,control:S?(0,M.jsx)(v.Z,{}):(0,M.jsx)(M.Fragment,{}),label:String.fromCharCode(65+n),labelPlacement:"start",className:p.radio}),e.correctAnswer===n+1&&(0,M.jsx)(h.Z,{className:S?p.answerContentEdit:p.answerContent,contentEditable:S,colorname:"--green-500",children:t.content}),e.correctAnswer!==n+1&&(0,M.jsx)(h.Z,{className:S?p.answerContentEdit:p.answerContent,contentEditable:S,children:t.content})]}):(0,M.jsx)(i.Z,{"data-color-mode":"light",className:S?p.answerContentEdit:p.answerContent,contentEditable:S,children:(0,M.jsx)(I.ZP.Markdown,{source:t.content,className:p.markdown})})},n)))})}),(0,M.jsx)(i.Z,{className:S?p.btnContainer:p.none,children:(0,M.jsx)(l.Z,{className:p.deleteBtn,onClick:()=>(e=>{V((t=>t.filter((t=>t.id!==e))))})(t),children:(0,M.jsx)(C.Z,{})})})]},t)))]})}),(0,M.jsx)(T.Z,{open:le,setOpen:ce,type:he,content:ue})]})]})]})}}}]);