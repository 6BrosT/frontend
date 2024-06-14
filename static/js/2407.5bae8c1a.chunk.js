"use strict";(self.webpackChunkfrontend_app=self.webpackChunkfrontend_app||[]).push([[2407],{38037:(e,t,n)=>{n.d(t,{Z:()=>c});var s,o=n(30168),a=n(17592),l=n(61113);const c=(0,a.ZP)(l.Z)(s||(s=(0,o.Z)(['\n  font-family: "Montserrat";\n  font-style: ',";\n  font-weight: ",";\n  font-size: 18px;\n  line-height: 24px;\n  text-wrap: ",";\n  color: ",";\n  @media only screen and (max-width: 767px) {\n    font-size: ",";\n    line-height: ",";\n  }\n"])),(e=>e.fontStyle||"normal"),(e=>e.fontWeight||600),(e=>e.textWrap||"wrap"),(e=>"var(".concat(e.colorname||"--eerie-black-00",")")),(e=>e.fontSizeMobile||"14px"),(e=>e.$lineHeightMobile||"24px"))},12407:(e,t,n)=>{n.r(t),n.d(t,{default:()=>L});var s=n(47313),o=n(79536);const a={searchContainer:"styles_searchContainer__z7WgP",searchInput:"styles_searchInput__mm4w3",containerDetailSolution:"styles_containerDetailSolution__et12E",stickyBack:"styles_stickyBack__ageI3",backButton:"styles_backButton__Q57nc",backIcon:"styles_backIcon__k3QZq",solutionContainer:"styles_solutionContainer__Q2Rdo",userInfo:"styles_userInfo__xcSXt",imgAvatar:"styles_imgAvatar__HR+9r",nameInfoContainer:"styles_nameInfoContainer__7PYuA",solutionButton:"styles_solutionButton__KztC8",solutionIcon:"styles_solutionIcon__-N-Sw",upVote:"styles_upVote__SaJ5r",view:"styles_view__WFl7f",calendar:"styles_calendar__m57yT",tagLanguageSolution:"styles_tagLanguageSolution__YWOMZ",item:"styles_item__6FBz8",commentContainer:"styles_commentContainer__rmZhz",commentTitleContainer:"styles_commentTitleContainer__bpTPv",commentTitle:"styles_commentTitle__-FJn0",commentIcon:"styles_commentIcon__RzMxA",commentBox:"styles_commentBox__toj2a",textArea:"styles_textArea__SxuVi",commentButton:"styles_commentButton__Nw4-c",commentList:"styles_commentList__tligR",commentItem:"styles_commentItem__6r0wy",commentInfoUser:"styles_commentInfoUser__TEVE7",commentContent:"styles_commentContent__jgLGD",commentName:"styles_commentName__GTHZK",commentText:"styles_commentText__pdg+v",commentAction:"styles_commentAction__RCa8g",reply:"styles_reply__IPxig",stickyUpvote:"styles_stickyUpvote__mbKRu",upvoteButton:"styles_upvoteButton__afLv3",markdown:"styles_markdown__OBpHz"};var l=n(14647),c=n(19536),i=n(48119),m=n(42832),r=n(74312),_=n(80007),d=n(38037),u=n(10259),h=n(39276),v=n(627),x=n(2126),y=n(11001),N=n(33223),Z=n(19187),j=n(47477),f=n(75590),g=n(51928),p=n(8344),b=n(60191),k=n(23885),I=n(15162),S=n(75627),C=n(62563),w=n(21933),B=n(22665),T=n(46417);const A=(e,t)=>{try{return void 0===e?e:(0,I.J$)(e,t)}catch(n){return console.error(n),e}};function L(e){var t,n,I,L,M,P,z,R,U,D,G,H,E,F,K;let{handleSolutionDetail:V,selectedSolutionId:W}=e;const{t:J}=(0,f.$G)(),Q=w.Ry().shape({comment:w.Z_().required("".concat(J("detail_problem_discussion_detail_comment")," ").concat(J("common_cannot_be_blank"))).test("not-blank","".concat(J("detail_problem_discussion_detail_comment")," ").concat(J("common_cannot_be_blank")),(e=>void 0!==e&&e.trim().length>0))}),X=(0,g.T)(),[$,q]=(0,s.useState)(null),[O,Y]=(0,s.useState)(!1),[ee,te]=(0,s.useState)(0),[ne,se]=(0,s.useState)(1),[oe,ae]=(0,s.useState)([]),[le,ce]=(0,s.useState)(!0);(0,s.useEffect)((()=>{W&&(X((0,p.K4)(!0)),b.T.getDetailSharedSolution(W).then((e=>{q(e)})).catch((e=>console.log(e))).finally((()=>{X((0,p.K4)(!1))})))}),[]),(0,s.useEffect)((()=>{de()}),[le,ee]);const{register:ie,handleSubmit:me,watch:re,formState:{errors:_e}}=(0,S.cI)({resolver:(0,C.X)(Q)}),de=()=>{W&&(Y(!0),b.T.getRootComments(W,ee,10,le).then((e=>{se(e.totalPages),ae(e.comments)})).catch((e=>console.log(e))).then((()=>{Y(!1)})))},ue=(0,s.useRef)(null),{height:he}=(0,j.Z)({ref:ue});return(0,T.jsxs)(o.Z,{className:a.containerDetailSolution,children:[(0,T.jsxs)(o.Z,{className:a.stickyBack,ref:ue,children:[(0,T.jsxs)(o.Z,{onClick:V,className:a.backButton,children:[(0,T.jsx)(l.Z,{className:a.backIcon}),(0,T.jsx)("span",{"translation-key":"common_back",children:J("common_back")})]}),(0,T.jsx)(c.Z,{})]}),(0,T.jsx)(o.Z,{className:a.solutionContainer,style:{height:"calc(100% - ".concat(he,"px)")},children:$&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(o.Z,{className:a.solutionTitle,children:(0,T.jsx)(d.Z,{children:$.title})}),(0,T.jsxs)(o.Z,{className:a.userInfo,children:[(0,T.jsx)(o.Z,{className:a.avatar,children:(0,T.jsx)(i.Z,{sx:{bgcolor:"".concat((0,B.M)("".concat(null===(t=$.user)||void 0===t?void 0:t.firstName," ").concat(null===(n=$.user)||void 0===n?void 0:n.lastName)))},alt:null===(I=$.user)||void 0===I?void 0:I.firstName,src:null===(L=$.user)||void 0===L?void 0:L.avatarUrl,children:null===(M=$.user)||void 0===M?void 0:M.firstName.charAt(0)})}),(0,T.jsxs)(o.Z,{className:a.nameInfoContainer,children:[(0,T.jsx)(o.Z,{className:a.name,children:"vi"===k.ZP.language?"".concat(null!==(P=null===(z=$.user)||void 0===z?void 0:z.lastName)&&void 0!==P?P:""," ").concat(null!==(R=null===(U=$.user)||void 0===U?void 0:U.firstName)&&void 0!==R?R:""):"".concat(null!==(D=null===(G=$.user)||void 0===G?void 0:G.firstName)&&void 0!==D?D:""," ").concat(null!==(H=null===(E=$.user)||void 0===E?void 0:E.lastName)&&void 0!==H?H:"")}),(0,T.jsxs)(o.Z,{className:a.solutionButton,children:[(0,T.jsxs)(o.Z,{className:a.view,children:[(0,T.jsx)(u.G,{icon:h.Mdf,className:a.solutionIcon}),(0,T.jsx)(o.Z,{className:a.viewNumber,children:$.totalView})]}),(0,T.jsxs)(o.Z,{className:a.calendar,children:[(0,T.jsx)(u.G,{icon:h.fT7,className:a.solutionIcon}),(0,T.jsx)(o.Z,{className:a.calendarNumber,children:null!==(F=A($.createdAt,k.ZP.language))&&void 0!==F?F:""})]})]})]})]}),(0,T.jsx)(o.Z,{className:a.tagLanguageSolution,children:$.tags.map((e=>(0,T.jsx)(o.Z,{className:a.item,children:e.name},e.id)))}),(0,T.jsx)(o.Z,{"data-color-mode":"light",children:(0,T.jsx)(Z.ZP.Markdown,{source:null!==(K=$.content)&&void 0!==K?K:"",className:a.markdown})}),(0,T.jsxs)(o.Z,{className:a.commentContainer,children:[(0,T.jsxs)(o.Z,{className:a.commentTitleContainer,children:[(0,T.jsxs)(o.Z,{className:a.commentTitle,children:[(0,T.jsx)(u.G,{icon:h.lXL,className:a.commentIcon}),(0,T.jsx)(o.Z,{className:a.commentNumber,"translation-key":"detail_problem_discussion_detail_comment_count",children:J("detail_problem_discussion_detail_comment_count",{commentNumber:10})})]}),(0,T.jsx)(o.Z,{className:a.filterComment,children:"L\u1ecdc theo: M\u1edbi nh\u1ea5t"})]}),(0,T.jsx)(o.Z,{className:a.commentBox,children:(0,T.jsxs)("form",{onSubmit:me((e=>{null!==W&&b.T.createComment({sharedSolutionId:W,content:e.comment}).then((e=>{de()})).catch((e=>{console.log(e)}))})),children:[(0,T.jsx)(y.u,{"aria-label":"empty textarea","translation-key":"detail_problem_discussion_your_comment",placeholder:J("detail_problem_discussion_your_comment"),className:a.textArea,minRows:5,...ie("comment"),"aria-invalid":!!_e.comment}),(0,T.jsx)(N.Z,{type:"submit",variant:"contained",className:a.commentButton,"translation-key":"detail_problem_discussion_detail_comment",children:J("detail_problem_discussion_detail_comment")})]})}),_e.comment&&(0,T.jsx)(_.Z,{colorname:"--red-error",children:_e.comment.message}),(0,T.jsx)(o.Z,{className:a.commentList,children:(0,T.jsxs)(o.Z,{className:a.commentItem,children:[oe.map((e=>{var t,n,s,l,m,r,_,d,u,h,y,N,Z;return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)(o.Z,{className:a.commentInfo,children:[(0,T.jsxs)(o.Z,{className:a.commentInfoUser,children:[(0,T.jsx)(i.Z,{sx:{bgcolor:"".concat((0,B.M)("".concat(null===(t=e.user)||void 0===t?void 0:t.firstName," ").concat(null===(n=e.user)||void 0===n?void 0:n.lastName)))},alt:null===(s=e.user)||void 0===s?void 0:s.firstName,src:null===(l=e.user)||void 0===l?void 0:l.avatarUrl,children:null===(m=e.user)||void 0===m?void 0:m.firstName.charAt(0)}),(0,T.jsx)(o.Z,{className:a.commentName,children:"vi"===k.ZP.language?"".concat(null!==(r=null===(_=e.user)||void 0===_?void 0:_.lastName)&&void 0!==r?r:""," ").concat(null!==(d=null===(u=$.user)||void 0===u?void 0:u.firstName)&&void 0!==d?d:""):"".concat(null!==(h=null===(y=e.user)||void 0===y?void 0:y.firstName)&&void 0!==h?h:""," ").concat(null!==(N=null===(Z=e.user)||void 0===Z?void 0:Z.lastName)&&void 0!==N?N:"")})]}),(0,T.jsx)(o.Z,{className:a.commentText,children:(0,T.jsx)(v.U,{children:e.content,remarkPlugins:[x.Z]})})]},e.user.id),(0,T.jsx)(c.Z,{})]})})),(0,T.jsx)(m.Z,{alignItems:"center",children:(0,T.jsx)(r.Z,{count:ne,onChange:(e,t)=>{te(t-1)},page:ee+1})})]})})]})]})})]})}},14647:(e,t,n)=>{var s=n(64836);t.Z=void 0;var o=s(n(45045)),a=n(46417);t.Z=(0,o.default)((0,a.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"}),"ArrowBack")}}]);