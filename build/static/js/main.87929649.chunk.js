(this.webpackJsonpportclient=this.webpackJsonpportclient||[]).push([[0],{360:function(e,t,a){},361:function(e,t,a){"use strict";a.r(t);var s,r,i=a(8),l=a(0),c=a(23),o=a.n(c),n=a(363),b=a(73),u=a(103),d=a(28),j=a(62),O=a(4),m=a(100),p=a(366),h=a(367),x=a(365),P=a(370),v=a(36),A=a(369),g={labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}},y={wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},f={width:500},D=(e,t,a="Submit")=>e||t?e?"Success!":"Failure!":a,E=m.a.Option,w=p.a.Item,T=(e,t)=>{var a=t.match(/((19|20)\d\d)-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/),s=e.toString().match(/^[-+]?\d+$/);return a&&s},M=((...e)=>t=>class extends l.Component{componentDidMount(){Promise.all(e.map((e=>e(this.props))))}render(){return Object(i.jsx)(t,Object(O.a)({},this.props))}})((({loadMaterials:e})=>e()),(({loadPorts:e})=>e()))((({receivePort:e,selectReceivePort:t,possiblePorts:a,material:s,selectMaterial:r,possibleMaterials:c,materialAmount:o,selectMaterialAmount:n,providePort:b,selectProvidePort:u,comments:d,selectComments:j,transactionDate:p,selectTransactionDate:M,submit:_,toggleWarningModal:C,showWarningModal:S,loading:k,success:I,failure:R})=>{var L=_({receivePort:e,material:s,materialAmount:o,comments:d,transactionDate:p,providePort:b});return[Object(l.createElement)(w,Object(O.a)(Object(O.a)({label:"Port that will receive materials"},g),{},{key:"receivePort"}),Object(i.jsx)(m.a,{value:e,onChange:t,style:f,children:a.map((e=>Object(i.jsx)(E,{value:e,children:e},e)))})),Object(i.jsx)(w,Object(O.a)(Object(O.a)({label:"Select material"},g),{},{children:Object(i.jsx)(m.a,{value:s,onChange:r,style:f,children:c.map((e=>Object(i.jsx)(E,{value:e,children:e},e)))})}),"materal"),Object(i.jsx)(w,Object(O.a)(Object(O.a)({label:"Number of Materials (integers only)"},g),{},{children:Object(i.jsx)(h.a,{value:o,onChange:n,style:f})}),"materialnum"),Object(i.jsx)(w,Object(O.a)(Object(O.a)({label:"Date of Transaction (yyyy-mm-dd)"},g),{},{children:Object(i.jsx)(x.a,{onChange:M,style:f})}),"tdate"),Object(i.jsx)(w,Object(O.a)(Object(O.a)({label:"Port that will provide materials (not required)"},g),{},{children:Object(i.jsx)(m.a,{value:b,onChange:u,style:f,children:a.map((e=>Object(i.jsx)(E,{value:e,children:e},e)))})}),"pport"),Object(i.jsx)(w,Object(O.a)(Object(O.a)({label:"Optional Comments"},g),{},{children:Object(i.jsx)(P.a.TextArea,{rows:4,value:d,onChange:j,style:f})}),"comments"),Object(i.jsx)(w,Object(O.a)(Object(O.a)({},y),{},{children:Object(i.jsx)(v.a,{type:"primary",loading:k.status,disabled:!T(o,p),onClick:b?L:C,children:D(I.status,R.status)})}),"submitbutton"),Object(i.jsx)(A.a,{title:"",visible:S,onOk:()=>{L(),C()},onCancel:C,okText:"Ok.  I only want one port.",cancelText:"Not Ok!  Let me go back and edit.",children:"Warning: no second port selected.  Is this ok?"},"modalWarning")]})),_="UPDATE_RECEIVE_PORT",C="UPDATE_PROVIDE_PORT",S="UPDATE_POSSIBLE_PORTS",k="UPDATE_POSSIBLE_MATERIALS",I="UPDATE_MATERIAL",R="UPDATE_MATERIAL_AMOUNT",L="UPDATE_COMMENTS",N="POPULATE_POSSIBLE_PORTS",U="UPDATE_TRANSACTION_DATE",F="TOGGLE_MODAL",W="AXIOS_FAILURE",B="AXIOS_SUCCESS",G="AXIOS_LOADING",V="POPULATE_POSSIBLE_MATERIALS",J="UPDATE_NEW_PORT",H="UPDATE_NEW_MATERIAL",X="UPDATE_REPORT_DATE",$="UPDATE_REPORT_DATA",q=e=>t=>a=>t({type:e,value:a}),z=e=>t=>(a,s)=>t({type:e,value:s}),K=e=>t=>a=>t({type:e,value:a.target.value}),Q=(e,t)=>a=>a({type:G,value:{status:e,id:t}}),Y=e=>t=>{t(e),setTimeout((()=>{t(e)}),2e3)},Z=e=>Y((e=>({type:W,id:e}))(e)),ee=e=>Y((e=>({type:B,id:e}))(e)),te=q(_),ae=q(I),se=q(R),re=q(C),ie=K(L),le=z(U),ce=e=>()=>e({type:F}),oe=(e,t)=>a=>()=>{fetch(e,{method:"GET"}).then((e=>e.json())).then((e=>{e&&!e.Failure&&a({type:t,value:e})}))},ne=oe("/material",V),be=oe("/port",N),ue=e=>({receivePort:t,material:a,materialAmount:s,comments:r,transactionDate:i,providePort:l})=>()=>{Q(!0)(e);var c={firstPort:{Port:t,Material:a,Date:i,Amount:s,Comment:r}},o=l?Object(O.a)(Object(O.a)({},c),{},{secondPort:Object(O.a)(Object(O.a)({},c.firstPort),{},{Port:l,Amount:-s})}):c;fetch("/transaction",{method:"POST",body:JSON.stringify(o)}).then((e=>e.json())).then((t=>{if(t.Failure)throw new Error(t.Failure);ee("submission")(e)})).catch((t=>{Z("submission")(e)})).finally((()=>{Q(!1)(e)}))},de=Object(j.b)((e=>({receivePort:e.submission.receivePort,possiblePorts:e.submission.possiblePorts,material:e.submission.material,possibleMaterials:e.submission.possibleMaterials,materialAmount:e.submission.materialAmount,providePort:e.submission.providePort,comments:e.submission.comments,showWarningModal:e.submission.showWarningModal,loading:e.axios.loading,success:e.axios.success,failure:e.axios.failure,transactionDate:e.submission.transactionDate})),(e=>({selectReceivePort:te(e),selectMaterial:ae(e),selectMaterialAmount:se(e),selectProvidePort:re(e),selectComments:ie(e),selectTransactionDate:le(e),toggleWarningModal:ce(e),submit:ue(e),loadMaterials:ne(e),loadPorts:be(e)})))(M),je="Port",Oe="Material",me="Delete",pe=a(368),he=p.a.Item,xe=(s=0,r=50,e=>e>s&&e<r),Pe=({val:e,updateVal:t,submit:a,trackAxios:s,title:r,loading:l,success:c,failure:o})=>{return Object(i.jsxs)(he,Object(O.a)(Object(O.a)({label:"".concat(r," (under 50 characters)")},g),{},{children:[Object(i.jsx)(P.a,{value:e,onChange:t,style:f}),Object(i.jsx)(v.a,{type:"primary",loading:s&&l.status,disabled:(n=e,!xe(n.length)),onClick:a,children:s?D(c.status,o.status):D(!1,!1)})]}));var n},ve=({submit:e,trackAxios:t,loading:a,success:s,failure:r})=>Object(i.jsx)(he,Object(O.a)(Object(O.a)({label:"Danger"},g),{},{children:Object(i.jsx)(v.a,{danger:!0,type:"primary",loading:t&&a.status,onClick:Ae(e),children:t?D(s.status,r.status,"Delete All"):D(!1,!1,"Delete All")})})),Ae=e=>()=>{A.a.confirm({title:"Confirm",icon:Object(i.jsx)(pe.a,{}),content:"Are you sure?",okText:"Delete",cancelText:"Cancel",onOk:e})},ge=({newPort:e,selectNewPort:t,newMaterial:a,selectNewMaterial:s,submitNewPort:r,submitNewMaterial:l,submitDeleteAll:c,loading:o,success:n,failure:b})=>[Object(i.jsx)(Pe,{title:"Add Port",val:e,updateVal:t,trackAxios:o.id===je,loading:o,success:n,failure:b,submit:r(e)},je),Object(i.jsx)(Pe,{title:"Add Material Type",val:a,updateVal:s,trackAxios:o.id===Oe,loading:o,success:n,failure:b,submit:l(a)},Oe),Object(i.jsx)(ve,{trackAxios:o.id===me,loading:o,success:n,failure:b,submit:c()},me)],ye=K(J),fe=K(H),De=(e,t,a,s="POST")=>r=>i=>()=>{Q(!0,a)(r),((e,t)=>a=>a({type:e,value:t}))(t,i)(r),fetch(e,{method:s,body:JSON.stringify({[a]:i})}).then((e=>e.json())).then((e=>{if(e.Failure)throw new Error(e.Failure);ee(a)(r)})).catch((()=>{Z(a)(r)})).finally((()=>{Q(!1,a)(r)}))},Ee=De("/port",S,je),we=De("/material",k,Oe),Te=De("/all","DELETE_ALL_DATA",me,"DELETE"),Me=Object(j.b)((e=>({newPort:e.additions.newPort,newMaterial:e.additions.newMaterial,loading:e.axios.loading,success:e.axios.success,failure:e.axios.failure})),(e=>({selectNewPort:ye(e),selectNewMaterial:fe(e),submitNewPort:Ee(e),submitNewMaterial:we(e),submitDeleteAll:Te(e)})))(ge),_e=a(364),Ce=p.a.Item,Se=[{title:"Port",dataIndex:"Port",key:"Port"},{title:"Amount",dataIndex:"Amount",key:"Amount"},{title:"Material",dataIndex:"Material",key:"Material"}],ke="getReports",Ie="allData",Re="Download to CSV",Le=(e,t,a)=>e.id===a||t.id===a,Ne=(e,t,a)=>()=>Object(i.jsx)(v.a,{type:"primary",onClick:e(Ie),children:Le(t,a,Ie)?D(t.status,a.status,Re):D(!1,!1,Re)}),Ue=({setReportDate:e,selectReportData:t,selectAllData:a,reportDate:s,loading:r,success:c,failure:o,data:n})=>{return[Object(l.createElement)(Ce,Object(O.a)(Object(O.a)({label:"Select Reporting Date"},g),{},{key:ke}),Object(i.jsx)(x.a,{onChange:e,style:f}),Object(i.jsx)(v.a,{type:"primary",loading:r.id===ke&&r.status,disabled:(b=s,!(b.length>0)),onClick:t(ke,s),children:Le(c,o,ke)?D(c.status,o.status):D(!1,!1)})),Object(i.jsx)(_e.a,{pagination:!1,title:Ne(a,c,o),dataSource:n,columns:Se},"displaytable")];var b},Fe=z(X),We=e=>(t,a)=>()=>{Q(!0,t)(e),fetch("/all?report_date=".concat(a),{method:"GET"}).then((e=>e.json())).then((t=>{if(t.Failure)throw new Error(t.Failure);e({type:$,value:t.map(((e,t)=>Object(O.a)({key:t},e)))})})).catch((()=>{Z(t)(e)})).finally((()=>{Q(!1,t)(e)}))},Be=e=>t=>()=>{Q(!0,t)(e),fetch("/transaction",{method:"GET"}).then((e=>e.json())).then((e=>{if(e.Failure)throw new Error(e.Failure);((e,t)=>{var a=Object.keys(e[0]),s=e.map((e=>a.map((t=>JSON.stringify(e[t]||"").replace(/\\n/g,"").replace(/[|&;$%@"<>()+\\/"]/g,""))).join(",")));s.unshift(a.join(",")),s=s.join("\r\n");var r=new Blob([s],{type:"text/csv"});if("undefined"!==typeof window.navigator.msSaveBlob)window.navigator.msSaveBlob(r,t);else{var i=window.URL.createObjectURL(r),l=document.createElement("a");l.href=i,l.setAttribute("download",t),l.setAttribute("target","_blank"),document.body.appendChild(l),l.click(),document.body.removeChild(l)}})(e,"results.csv")})).catch((()=>{Z(t)(e)})).finally((()=>{Q(!1,t)(e)}))},Ge=Object(j.b)((e=>({data:e.reports.data,reportDate:e.reports.reportDate,loading:e.axios.loading,success:e.axios.success,failure:e.axios.failure})),(e=>({setReportDate:Fe(e),selectReportData:We(e),selectAllData:Be(e)})))(Ue),Ve=n.a.Header,Je=n.a.Content,He=n.a.Footer,Xe={lineHeight:"64px"},$e={padding:"0 50px"},qe={background:"#fff",padding:24,minHeight:280},ze={textAlign:"center"},Ke="/enter_data",Qe="/add_options",Ye="/results",Ze=({location:e})=>Object(i.jsx)(Ve,{children:Object(i.jsxs)(b.a,{theme:"dark",mode:"horizontal",selectedKeys:[e.pathname],style:Xe,children:[Object(i.jsx)(b.a.Item,{children:Object(i.jsx)(u.b,{to:Ke,children:"Enter Data"})},Ke),Object(i.jsx)(b.a.Item,{children:Object(i.jsx)(u.b,{to:Qe,children:"Add Options"})},Qe),Object(i.jsx)(b.a.Item,{children:Object(i.jsx)(u.b,{to:Ye,children:"Results"})},Ye)]})}),et=()=>Object(i.jsx)(u.a,{children:Object(i.jsxs)(n.a,{className:"layout",children:[Object(i.jsx)(d.b,{path:"/",component:Ze}),Object(i.jsx)(Je,{style:$e,children:Object(i.jsx)("div",{style:qe,children:Object(i.jsxs)(d.d,{children:[Object(i.jsx)(d.a,{exact:!0,to:Ke,from:"/"}),Object(i.jsx)(d.b,{path:Ke,component:de}),Object(i.jsx)(d.b,{path:Qe,component:Me}),Object(i.jsx)(d.b,{path:Ye,component:Ge})]})})}),Object(i.jsx)(He,{style:ze,children:"Port Client"})]})}),tt=(a(360),a(78)),at={loading:{status:!1,id:""},success:{status:!1,id:""},failure:{status:!1,id:""}},st=(e,t,a)=>Object(O.a)(Object(O.a)({},e),{},{[t]:{status:!e[t].status,id:a}}),rt={receivePort:"",possiblePorts:[],material:"",transactionDate:"",possibleMaterials:[],materialAmount:0,providePort:"",comments:"",showWarningModal:!1},it={newPort:"",newMaterial:""},lt={reportDate:"",data:[]},ct=Object(tt.b)({axios:(e=at,t)=>{switch(t.type){case W:return st(e,"failure",t.id);case B:return st(e,"success",t.id);case G:return Object(O.a)(Object(O.a)({},e),{},{loading:t.value});default:return e}},submission:(e=rt,t)=>{switch(t.type){case _:return Object(O.a)(Object(O.a)({},e),{},{receivePort:t.value});case I:return Object(O.a)(Object(O.a)({},e),{},{material:t.value});case U:return Object(O.a)(Object(O.a)({},e),{},{transactionDate:t.value});case R:return Object(O.a)(Object(O.a)({},e),{},{materialAmount:t.value});case C:return Object(O.a)(Object(O.a)({},e),{},{providePort:t.value});case L:return Object(O.a)(Object(O.a)({},e),{},{comments:t.value});case S:return Object(O.a)(Object(O.a)({},e),{},{possiblePorts:[...e.possiblePorts,t.value]});case N:return Object(O.a)(Object(O.a)({},e),{},{possiblePorts:t.value});case k:return Object(O.a)(Object(O.a)({},e),{},{possibleMaterials:[...e.possibleMaterials,t.value]});case V:return Object(O.a)(Object(O.a)({},e),{},{possibleMaterials:t.value});case F:return Object(O.a)(Object(O.a)({},e),{},{showWarningModal:!e.showWarningModal});default:return e}},additions:(e=it,t)=>{switch(t.type){case J:return Object(O.a)(Object(O.a)({},e),{},{newPort:t.value});case H:return Object(O.a)(Object(O.a)({},e),{},{newMaterial:t.value});default:return e}},reports:(e=lt,t)=>{switch(t.type){case X:return Object(O.a)(Object(O.a)({},e),{},{reportDate:t.value});case $:return Object(O.a)(Object(O.a)({},e),{},{data:t.value});default:return e}}}),ot=Object(tt.c)(ct);o.a.render(Object(i.jsx)(j.a,{store:ot,children:Object(i.jsx)(et,{})}),document.getElementById("root"))}},[[361,1,2]]]);
//# sourceMappingURL=main.87929649.chunk.js.map