(this["webpackJsonpnew-todolist"]=this["webpackJsonpnew-todolist"]||[]).push([[0],{116:function(t,e,n){},145:function(t,e,n){"use strict";n.r(e);var a=n(3),c=n(0),i=n.n(c),o=n(10),r=n.n(o),s=(n(116),function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,197)).then((function(e){var n=e.getCLS,a=e.getFID,c=e.getFCP,i=e.getLCP,o=e.getTTFB;n(t),a(t),c(t),i(t),o(t)}))}),d=(n(75),n(186)),l=n(187),u=n(188),j=n(180),b=n(147),O=n(183),f=n(189),h=n(190),g=n(97),m=n.n(g),p=n(17),T=n(8),x=n(89),S=n.n(x).a.create(Object(T.a)({},{baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"c9904dcf-3bb3-447f-a0b3-278ebd3674e9"}})),v=function(){return S.get("todo-lists")},I=function(t){return S.post("todo-lists",{title:t})},k=function(t){return S.delete("todo-lists/".concat(t))},C=function(t,e){return S.put("todo-lists/".concat(t),{title:e})},E=function(t){return S.post("auth/login",t)},y=function(){return S.delete("auth/login")},A=function(){return S.get("auth/me")},w=function(t,e){t.messages.length?e(R(t.messages[0])):e(R("some error occurred")),e(F("failed"))},L=function(t,e){e(R(t.message?t.message:"Some error occurred")),e(F("failed"))},D={isLoggedIn:!1},N=function(t){return{type:"login/SET-IS-LOGGED-IN",value:t}},P={status:"loading",error:null,isInitialized:!1},F=function(t){return{type:"APP/SET-STATUS",status:t}},R=function(t){return{type:"APP/SET-ERROR",error:t}},M=n(196),G=n(193);function K(t){return Object(a.jsx)(G.a,Object(T.a)({elevation:6,variant:"filled"},t))}var B,H,U=i.a.memo((function(){var t=Object(p.c)((function(t){return t.app.error})),e=Object(p.b)(),n=function(t,n){"clickaway"!==n&&e(R(null))};return Object(a.jsx)(M.a,{open:null!==t,autoHideDuration:3e3,onClose:n,children:Object(a.jsx)(K,{onClose:n,severity:"error",children:t})})})),z=n(184),V=n(146),Z=n(49),q=n(191),Y=n(192),J=Object(Y.a)({red:{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",color:"white",height:31,padding:"0 10px",margin:8},blue:{background:"linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px rgba(33, 203, 243, .3)",color:"white",height:31,padding:"0 10px",margin:3},smallBtn:{background:"linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px rgba(33, 203, 243, .3)",color:"white",height:34,minWidth:11,padding:"0 10px",margin:"1px 15px"},removeTask:{padding:6,borderRadius:"50%",minWidth:40}}),W=i.a.memo((function(t){console.log("AddItemForm called");var e=Object(c.useState)(""),n=Object(Z.a)(e,2),i=n[0],o=n[1],r=Object(c.useState)(null),s=Object(Z.a)(r,2),d=s[0],l=s[1],u=function(){""!==i.trim()?(t.addItem(i),o("")):l("Title required")},j=J();return Object(a.jsxs)("div",{children:[Object(a.jsx)(q.a,{error:!!d,value:i,onChange:function(t){o(t.currentTarget.value)},onKeyPress:function(t){null!==d&&l(null),"Enter"===t.key&&u()},variant:"outlined",label:"Type value...",helperText:d,disabled:"loading"===t.entityStatus}),Object(a.jsx)(O.a,{className:j.smallBtn,onClick:u,disabled:"loading"===t.entityStatus,children:"Add"})]})})),$=i.a.memo((function(t){console.log("EditableSpan called");var e=Object(c.useState)(!1),n=Object(Z.a)(e,2),i=n[0],o=n[1],r=Object(c.useState)(""),s=Object(Z.a)(r,2),d=s[0],l=s[1];return i?Object(a.jsx)(q.a,{type:"text",value:d,onBlur:function(){o(!1),t.onChange(d)},autoFocus:!0,onChange:function(t){l(t.currentTarget.value)}}):Object(a.jsx)("span",{className:"title-task",onDoubleClick:function(){o(!0),l(t.title)},children:t.title})})),_=n(93),Q=n.n(_),X=n(194);!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(B||(B={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.High=2]="High",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(H||(H={}));var tt=function(t){return S.get("todo-lists/".concat(t,"/tasks"))},et=function(t,e){return S.post("todo-lists/".concat(t,"/tasks"),{title:e})},nt=function(t,e){return S.delete("todo-lists/".concat(t,"/tasks/").concat(e))},at=function(t,e,n){return S.put("todo-lists/".concat(t,"/tasks/").concat(e),n)},ct=i.a.memo((function(t){var e=t.removeTask,n=t.changeTaskStatus,i=t.changeTasksTitle,o=t.task,r=t.todolistId,s=t.entityStatus,d=J(),l=Object(c.useCallback)((function(t){i(o.id,r,t)}),[i,o.id,r]);return Object(a.jsxs)("li",{className:o.status===B.Completed?"completed-task":"",children:[Object(a.jsx)(X.a,{checked:o.status===B.Completed,onChange:function(t){var e=t.currentTarget.checked;n(o.id,e?B.Completed:B.New,r)}}),Object(a.jsx)($,{title:o.title,onChange:l}),Object(a.jsx)(j.a,{className:d.removeTask,onClick:function(){return e(o.id,r)},disabled:"loading"===s,children:"\xd7"})]},o.id)})),it=n(46),ot=n(64),rt=[],st=function(t,e){return{type:"CHANGE-TODOLIST-ENTITY-STATUS",todolistId:t,entityStatus:e}},dt={},lt=function(t,e,n){return{type:"UPDATE-TASK",model:e,taskId:t,todolistId:n}},ut=function(t,e,n){return function(a,c){var i=c().tasks[t].find((function(t){return t.id===n}));if(i){var o=Object(T.a)({deadline:i.deadline,description:i.description,priority:i.priority,status:i.status,title:i.title},e);at(t,n,o).then((function(c){0===c.data.resultCode?a(lt(n,e,t)):w(c.data,a)})).catch((function(t){L(t,a)}))}else console.warn("task not found in the state")}},jt=i.a.memo((function(t){var e=t.tasks,n=t.removeTask,i=t.changeFilter,o=t.addTask,r=t.changeTaskStatus,s=t.todolist,d=t.removeTodolists,l=t.changeTasksTitle,u=t.onChangeTitle,j=t.demo;console.log("Todolist called"),"undefined"===typeof j&&(j=!1);var b=Object(p.b)();Object(c.useEffect)((function(){var t;j||b((t=s.id,function(e){e(F("loading")),tt(t).then((function(n){e(function(t,e){return{type:"SET-TASKS",tasks:t,todolistId:e}}(n.data.items,t)),e(F("succeeded"))}))}))}),[b,s.id,j]);var f=Object(c.useCallback)((function(){i("all",s.id)}),[i,s.id]),h=Object(c.useCallback)((function(){i("active",s.id)}),[i,s.id]),g=Object(c.useCallback)((function(){i("completed",s.id)}),[i,s.id]),m=Object(c.useCallback)((function(t){o(t,s.id)}),[o,s.id]),T=Object(c.useCallback)((function(t){u(s.id,t)}),[u,s.id]),x=J(),S=e;return"active"===s.filter&&(S=e.filter((function(t){return t.status===B.New}))),"completed"===s.filter&&(S=e.filter((function(t){return t.status===B.Completed}))),Object(a.jsxs)("div",{children:[Object(a.jsxs)("div",{children:[Object(a.jsxs)("h3",{children:[Object(a.jsx)($,{title:s.title,onChange:T}),Object(a.jsx)(O.a,{className:x.smallBtn,onClick:function(){d(s.id)},disabled:"loading"===s.entityStatus,children:Object(a.jsx)(Q.a,{})})]}),Object(a.jsx)(W,{addItem:m,entityStatus:s.entityStatus})]}),Object(a.jsx)("ul",{children:S.map((function(t){return Object(a.jsx)(ct,{todolistId:s.id,removeTask:n,changeTasksTitle:l,changeTaskStatus:r,task:t,entityStatus:s.entityStatus},t.id)}))}),Object(a.jsxs)("div",{children:[Object(a.jsx)(O.a,{className:"all"===s.filter?x.red:x.blue,onClick:f,children:"All"}),Object(a.jsx)(O.a,{className:"active"===s.filter?x.red:x.blue,onClick:h,children:"Active"}),Object(a.jsx)(O.a,{className:"completed"===s.filter?x.red:x.blue,onClick:g,children:"Completed"})]})]})})),bt=n(15),Ot=function(t){var e=t.demo,n=Object(p.c)((function(t){return t.todolists})),i=Object(p.c)((function(t){return t.tasks})),o=Object(p.c)((function(t){return t.auth.isLoggedIn})),r=Object(p.b)();Object(c.useEffect)((function(){!e&&o&&r((function(t){t(F("loading")),v().then((function(e){t({type:"SET-TODOLISTS",todolists:e.data}),t(F("succeeded"))})).catch((function(e){L(e,t)}))}))}),[r,e,o]);var s=Object(c.useCallback)((function(t,e){r(function(t,e){return function(n){n(F("loading")),n(st(t,"loading")),nt(t,e).then((function(){n(function(t,e){return{type:"REMOVE-TASK",todolistId:e,taskId:t}}(e,t)),n(F("succeeded")),n(st(t,"succeeded"))}))}}(e,t))}),[r]),d=Object(c.useCallback)((function(t,e){r(function(t,e){return function(n){n(F("loading")),n(st(e,"loading")),et(e,t).then((function(t){0===t.data.resultCode?(n({type:"ADD-TASK",task:t.data.data.item}),n(F("succeeded")),n(st(e,"succeeded"))):w(t.data,n)})).catch((function(t){L(t,n)}))}}(t,e))}),[r]),l=Object(c.useCallback)((function(t,e,n){r(ut(n,{status:e},t))}),[r]),u=Object(c.useCallback)((function(t,e,n){r(ut(e,{title:n},t))}),[r]),j=Object(c.useCallback)((function(t){r(function(t){return function(e){e(F("loading")),e(st(t,"loading")),k(t).then((function(){e(function(t){return{type:"REMOVE-TODOLIST",id:t}}(t)),e(F("succeeded"))}))}}(t))}),[r]),b=Object(c.useCallback)((function(t){r(function(t){return function(e){e(F("loading")),I(t).then((function(t){0===t.data.resultCode?(e({type:"ADD-TODOLIST",todolist:t.data.data.item}),e(F("succeeded"))):(e(R(t.data.messages[0])),e(F("succeeded")))}))}}(t))}),[r]),O=Object(c.useCallback)((function(t,e){r(function(t,e){return function(n){n(F("loading")),n(st(t,"loading")),C(t,e).then((function(a){0===a.data.resultCode?(n(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",todolistId:t,title:e}}(t,e)),n(F("succeeded")),n(st(t,"succeeded"))):w(a.data,n)}))}}(t,e))}),[r]),f=Object(c.useCallback)((function(t,e){var n=function(t,e){return{type:"CHANGE-TODOLIST-FILTER",todolistId:t,filter:e}}(e,t);r(n)}),[r]);return o?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(z.a,{container:!0,style:{padding:20},children:Object(a.jsx)(W,{addItem:b})}),Object(a.jsx)(z.a,{container:!0,spacing:6,children:n.map((function(t){var n=i[t.id];return Object(a.jsx)(z.a,{item:!0,children:Object(a.jsx)(V.a,{elevation:3,style:{padding:10},children:Object(a.jsx)(jt,{demo:e,todolist:t,tasks:n,removeTask:s,changeFilter:f,addTask:d,changeTaskStatus:l,removeTodolists:j,changeTasksTitle:u,onChangeTitle:O},t.id)})},t.id)}))})]}):Object(a.jsx)(bt.a,{to:"/login"})},ft=n(100),ht=n(181),gt=n(182),mt=n(185),pt=function(){var t=Object(p.c)((function(t){return t.auth.isLoggedIn})),e=Object(p.b)(),n=Object(ft.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<4&&(e.password="Must be more than 4 characters"):e.password="Required",e},onSubmit:function(t){var a;e((a=t,function(t){t(F("loading")),E(a).then((function(e){0===e.data.resultCode?(t(N(!0)),t(F("succeeded"))):w(e.data,t)})).catch((function(e){L(e,t)}))})),n.resetForm()}});return t?Object(a.jsx)(bt.a,{to:"/"}):Object(a.jsx)(z.a,{container:!0,justify:"center",children:Object(a.jsx)(z.a,{item:!0,xs:4,children:Object(a.jsx)("form",{onSubmit:n.handleSubmit,children:Object(a.jsxs)(ht.a,{children:[Object(a.jsxs)(gt.a,{children:[Object(a.jsxs)("p",{children:["To log in get registered",Object(a.jsx)("a",{href:"https://social-network.samuraijs.com/",rel:"noopener",children:" here"})]}),Object(a.jsx)("p",{children:"or use common test account credentials:"}),Object(a.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(a.jsx)("p",{children:"Password: free"})]}),Object(a.jsx)(q.a,Object(T.a)({type:"text",label:"email",margin:"normal"},n.getFieldProps("email"))),n.touched.email&&n.errors.email?Object(a.jsx)("div",{style:{color:"#990000",fontSize:"14px"},children:n.errors.email}):null,Object(a.jsx)(q.a,Object(T.a)({type:"password",label:"password",margin:"normal"},n.getFieldProps("password"))),n.touched.password&&n.errors.password?Object(a.jsx)("div",{style:{color:"#990000",fontSize:"14px"},children:n.errors.password}):null,Object(a.jsx)(mt.a,Object(T.a)(Object(T.a)({label:"Remember me",control:Object(a.jsx)(X.a,{})},n.getFieldProps("rememberMe")),{},{checked:n.values.rememberMe})),Object(a.jsx)(O.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})})})})},Tt=function(t){var e=t.demo,n=void 0!==e&&e,i=Object(p.c)((function(t){return t.app.status})),o=Object(p.c)((function(t){return t.app.isInitialized})),r=Object(p.c)((function(t){return t.auth.isLoggedIn})),s=Object(p.b)();Object(c.useEffect)((function(){s((function(t){A().then((function(e){t(F("loading")),0===e.data.resultCode?(t(N(!0)),t(F("succeeded"))):w(e.data,t),t({type:"APP/SET-IS-INITIALIZED",isInitialized:!0})}))}))}),[s]);var g=Object(c.useCallback)((function(){s((function(t){t(F("loading")),y().then((function(e){0===e.data.resultCode?(t(N(!1)),t(F("succeeded"))):w(e.data,t)})).catch((function(e){L(e,t)}))}))}),[s]);return o?Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(l.a,{position:"static",children:Object(a.jsxs)(u.a,{children:[Object(a.jsx)(j.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(a.jsx)(m.a,{})}),Object(a.jsx)(b.a,{variant:"h6",children:"News"}),r&&Object(a.jsx)(O.a,{color:"inherit",onClick:g,children:"Log out"})]})}),"loading"===i&&Object(a.jsx)(f.a,{color:"secondary"}),Object(a.jsxs)(h.a,{fixed:!0,children:[Object(a.jsx)(bt.b,{exact:!0,path:"/",render:function(){return Object(a.jsx)(Ot,{demo:n})}}),Object(a.jsx)(bt.b,{path:"/login",render:function(){return Object(a.jsx)(pt,{})}})]}),Object(a.jsx)(U,{})]}):Object(a.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(a.jsx)(d.a,{})})},xt=n(45),St=n(98),vt=Object(xt.c)({todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:rt,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":var n=t.filter((function(t){return t.id!==e.id}));return n;case"ADD-TODOLIST":var a=Object(T.a)(Object(T.a)({},e.todolist),{},{filter:"all",entityStatus:"idle"});return[a].concat(Object(ot.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.todolistId?Object(T.a)(Object(T.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.todolistId?Object(T.a)(Object(T.a)({},t),{},{filter:e.filter}):t}));case"SET-TODOLISTS":return e.todolists.map((function(t){return Object(T.a)(Object(T.a)({},t),{},{filter:"all",entityStatus:"idle"})}));case"CHANGE-TODOLIST-ENTITY-STATUS":return t.map((function(t){return t.id===e.todolistId?Object(T.a)(Object(T.a)({},t),{},{entityStatus:e.entityStatus}):t}));default:return t}},tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:dt,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":var n=Object(T.a)({},t),a=t[e.todolistId],c=a.filter((function(t){return t.id!==e.taskId}));return n[e.todolistId]=c,n;case"ADD-TASK":var i=Object(T.a)({},t),o=e.task,r=i[o.todoListId],s=[o].concat(Object(ot.a)(r));return i[o.todoListId]=s,i;case"UPDATE-TASK":return Object(T.a)(Object(T.a)({},t),{},Object(it.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(T.a)(Object(T.a)({},t),e.model):t}))));case"CHANGE-TASK-TITLE":return Object(T.a)(Object(T.a)({},t),{},Object(it.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(T.a)(Object(T.a)({},t),{},{title:e.title}):t}))));case"ADD-TODOLIST":return Object(T.a)(Object(it.a)({},e.todolist.id,[]),t);case"REMOVE-TODOLIST":var d=Object(T.a)({},t);return delete d[e.todolistId],d;case"SET-TODOLISTS":var l=Object(T.a)({},t);return e.todolists.forEach((function(t){l[t.id]=[]})),l;case"SET-TASKS":var u=Object(T.a)({},t);return u[e.todolistId]=e.tasks,u;default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"APP/SET-STATUS":return Object(T.a)(Object(T.a)({},t),{},{status:e.status});case"APP/SET-ERROR":return Object(T.a)(Object(T.a)({},t),{},{error:e.error});case"APP/SET-IS-INITIALIZED":return Object(T.a)(Object(T.a)({},t),{},{isInitialized:e.isInitialized});default:return t}},auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"login/SET-IS-LOGGED-IN":return Object(T.a)(Object(T.a)({},t),{},{isLoggedIn:e.value});default:return t}}}),It=Object(xt.d)(vt,Object(xt.a)(St.a));window.store=It;var kt=n(50);r.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(p.a,{store:It,children:Object(a.jsx)(kt.a,{children:Object(a.jsx)(Tt,{})})})}),document.getElementById("root")),s()},75:function(t,e,n){}},[[145,1,2]]]);
//# sourceMappingURL=main.3897a94e.chunk.js.map