import{d as I,s as V,v as M,x as c,y as C,r as D,o as U,c as E,b as e,z as w,A as n,B as d,C as q,a as A,w as B,f as T,D as m,E as b,p as H,e as O,_ as j}from"./index-axJO93Is.js";import{_ as z}from"./Line-Ru759zyg.js";import{c as _,a as h}from"./validate--tri5rLx.js";import{M as L}from"./bootstrap.esm-dmlelioT.js";const t=u=>(H("data-v-ccb1a896"),u=u(),O(),u),N={class:"container-fluid d-flex align-items-center bg-neutral-bg text-white position-relative"},R=t(()=>e("img",{src:z,alt:"Line",class:"position-absolute end-0 top-0 mt-8 py-5"},null,-1)),G=t(()=>e("img",{src:"https://images.unsplash.com/photo-1630587148265-761cbd139043?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"loginImg",class:"w-50 object-fit-cover position-relative z-1 d-none d-lg-block",style:{"max-height":"1078px"}},null,-1)),W={class:"row w-lg-50 flex-grow-1 position-relative z-1"},Y={class:"col-lg-6 col mx-auto"},$=t(()=>e("p",{class:"mb-2 text-primary fw-bold fs-small fs-lg-0"},"享樂酒店，誠摯歡迎",-1)),F=t(()=>e("h1",{class:"fw-bold fs-lg-1 fs-3 mb-7"},"立即開始旅程",-1)),J={class:"mb-3"},K=t(()=>e("label",{for:"email",class:"form-label"},"電子信箱",-1)),Q={class:"mb-3"},X=t(()=>e("label",{for:"password",class:"form-label"},"密碼",-1)),Z={class:"mb-7 d-flex justify-content-between"},ee={class:"form-check"},se=t(()=>e("label",{class:"form-check-label",for:"remember"}," 記住帳號 ",-1)),oe=t(()=>e("input",{type:"submit",class:"btn btn-primary w-100 py-3 px-6",value:"會員登入"},null,-1)),te=t(()=>e("span",null,"沒有會員嗎？",-1)),ae={class:"modal-dialog modal-dialog-centered"},le={class:"modal-content"},ie=t(()=>e("div",{class:"modal-header"},[e("h5",{class:"modal-title text-black"},"忘記密碼"),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)),re={class:"mb-3"},ne=t(()=>e("label",{for:"myEmail",class:"form-label"},"電子信箱",-1)),ce={class:"mb-3"},de=t(()=>e("label",{for:"newPassword",class:"form-label"},"新密碼",-1)),me=t(()=>e("label",{for:"code",class:"form-label"},"驗證碼",-1)),ue=t(()=>e("div",{class:"modal-footer"},[e("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"取消"),e("button",{type:"submit",class:"btn btn-primary"},"確認")],-1)),pe=I({__name:"LoginView",setup(u){const g=V(),x=M(),p=c(!1),i=c({email:"",password:""});C(async()=>{localStorage.getItem("email")&&(i.value.email=localStorage.getItem("email")||"",p.value=!0),f.value=new L(v.value)});async function y(){if(!P(i.value))return;const o=await b("/api/v1/user/login","POST",i.value);if(!o.status){m.fire({icon:"error",title:o.message});return}p.value?localStorage.setItem("email",i.value.email):localStorage.removeItem("email"),localStorage.setItem("token",o.token),g.setUserInfo(o.result),x.push("/user")}const v=c(),f=c(),r=c({email:"",newPassword:"",code:""});async function k(){const{value:o}=await m.fire({title:"請輸入註冊的電子信箱",input:"text",inputValidator:a=>{if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(a))return"電子信箱格式錯誤"}});if(!o)return;(await b("/api/v1/verify/email","POST",{email:o})).result.isEmailExists||m.fire({icon:"error",title:"該信箱未註冊"}),await b("/api/v1/verify/generateEmailCode","POST",{email:o});const l=await m.fire({title:"已發送驗證碼至信箱"});(l.isConfirmed||l.isDismissed)&&f.value&&f.value.show()}async function S(){const{email:o,newPassword:s}=r.value;if(!(_(o)&&h(s,s)))return;const l=await b("/api/v1/user/forgot","POST",r.value);console.log(l),m.fire({icon:l.status?"success":"error",title:l.status?"變更密碼成功":l.message}),l.status&&f.value.hide()}function P(o){return _(o.email)&&h(o.password,o.password)}return(o,s)=>{const l=D("router-link");return U(),E("main",N,[R,G,e("div",W,[e("div",Y,[e("div",null,[$,F,e("form",{class:"needs-validation mb-7",onSubmit:w(y,["prevent"])},[e("div",J,[K,n(e("input",{type:"email",class:"form-control",id:"email","aria-describedby":"emailHelp",placeholder:"hello@exsample.com",required:"","onUpdate:modelValue":s[0]||(s[0]=a=>i.value.email=a)},null,512),[[d,i.value.email]])]),e("div",Q,[X,n(e("input",{type:"password",class:"form-control",id:"password","aria-describedby":"password",autocomplete:"on",placeholder:"請輸入密碼",required:"","onUpdate:modelValue":s[1]||(s[1]=a=>i.value.password=a)},null,512),[[d,i.value.password]])]),e("div",Z,[e("div",ee,[n(e("input",{class:"form-check-input",type:"checkbox",id:"remember","onUpdate:modelValue":s[2]||(s[2]=a=>p.value=a)},null,512),[[q,p.value]]),se]),e("span",{class:"text-decoration-underline text-primary pointer",onClick:k},"忘記密碼？")]),oe],32),te,A(l,{to:"/signIn"},{default:B(()=>[T("前往註冊")]),_:1})])])]),e("div",{class:"modal fade",tabindex:"-1",ref_key:"modalPwd",ref:v,"data-bs-backdrop":"static"},[e("div",ae,[e("div",le,[ie,e("form",{class:"modal-body text-black",onSubmit:w(S,["prevent"])},[e("div",re,[ne,n(e("input",{type:"email",class:"form-control",id:"myEmail",placeholder:"hello@exsample.com",required:"","onUpdate:modelValue":s[3]||(s[3]=a=>r.value.email=a)},null,512),[[d,r.value.email]])]),e("div",ce,[de,n(e("input",{type:"password",class:"form-control",id:"newPassword",autocomplete:"on",placeholder:"請輸入新密碼",required:"","onUpdate:modelValue":s[4]||(s[4]=a=>r.value.newPassword=a)},null,512),[[d,r.value.newPassword]])]),e("div",null,[me,n(e("input",{type:"text",class:"form-control",id:"code",autocomplete:"on",placeholder:"請輸入驗證碼",required:"","onUpdate:modelValue":s[5]||(s[5]=a=>r.value.code=a)},null,512),[[d,r.value.code]])]),ue],32)])])],512)])}}}),he=j(pe,[["__scopeId","data-v-ccb1a896"]]);export{he as default};
