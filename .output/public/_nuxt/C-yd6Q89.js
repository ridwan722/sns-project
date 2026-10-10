const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CZ6NtdHu.js","./DjA4A5__.js","./entry.C0CLiSWO.css"])))=>i.map(i=>d[i]);
import{_ as mt,c,o as d,e as It,h as Nt,r as T,a as t,b as s,w as m,f as i,d as p,t as n,F as q,G,p as y,K as lt,C as Tt,L as Mt,j as Pt,M as Ot,D as Bt,N as Ut,m as $,i as Vt,z as wt,n as Lt}from"./DjA4A5__.js";import{_ as jt}from"./DZtcXRsr.js";import{_ as $t}from"./eZebTRru.js";import{_ as zt}from"./CWXnnNIX.js";import{_ as Ft}from"./C0en9cBd.js";import{V as W,c as Ht,b as ht,a as Kt,d as ct}from"./fpwwcyMl.js";import{V as R,a as Yt}from"./CB8Zw4yL.js";import{a as qt,b as nt,j as Gt}from"./CNWd5yFq.js";import{_ as Wt}from"./XMWtEco3.js";import{h as kt}from"./1FzCnDfd.js";import{u as Jt}from"./CNbYDhNZ.js";import{u as Qt}from"./DhNEAQH0.js";import{u as Xt}from"./I4np_pCM.js";import{u as At}from"./Dut8tjvj.js";import{V as St}from"./CDvg7J_J.js";import{V as Zt}from"./BJNXaCDR.js";import{V as N}from"./DSk2bOaQ.js";import{V as at}from"./DCBL48pO.js";import{V as ot}from"./CJjfb_P2.js";import"./3Zj1-Z2b.js";import"./Clvz0qmw.js";import"./DMsGOtYY.js";import"./CEYcsVNP.js";import"./D__SnHKz.js";const te={},ee={class:"success-container"};function ie(C,x){return d(),c("div",ee,[...x[0]||(x[0]=[It('<div class="modern-success-message" data-v-a674f496><div class="icon-wrapper" data-v-a674f496><svg stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="success-icon" data-v-a674f496><path d="M9 12l2 2 4-4" data-v-a674f496></path><circle r="10" cy="12" cx="12" data-v-a674f496></circle></svg></div><div class="text-wrapper" data-v-a674f496><div class="title" data-v-a674f496>INVOICE SUCCESS</div></div></div>',1)])])}const ne=mt(te,[["render",ie],["__scopeId","data-v-a674f496"]]),ae={class:"delivery-order-wrapper"},oe={class:"info-section mb-6"},le={class:"info-table"},se={style:{"vertical-align":"top"}},re={class:"main-table mb-6"},de={key:0,class:"text-center v-align-top"},ue={key:1,class:"v-align-top"},ce={style:{"white-space":"pre-line"}},me={key:2,class:"text-center v-align-top"},pe={class:"signature-section mt-6 page-break-section"},fe={class:"mb-4 text-caption"},ge={class:"no-print action-bar d-flex justify-center gap-2 mt-4"},ve=Nt({__name:"delivery-order",props:{invoiceDetail:{}},setup(C){const x=C,z=T(null),P=T(!1),Q=A=>{if(!A)return"-";const o=new Date(A);return isNaN(o.getTime())?"-":new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"long",year:"numeric"}).format(o)};function F(){const A=z.value;if(!A)return;const o=window.open("","_blank");if(!o){console.error("Tidak dapat membuka print window.");return}const b=Array.from(document.querySelectorAll('style, link[rel="stylesheet"]')).map(r=>r.outerHTML).join("");o.document.write(`
    <!DOCTYPE html>

    <html>

      <head>

        <meta charset="UTF-8" />

        <title>
          Delivery Order
        </title>

        ${b}

        <style>

          


          html,
          body {
            margin: 0 !important;
            padding: 0 !important;

            width: 100% !important;

            background: #ffffff !important;

            font-family: Arial, Helvetica, sans-serif;
          }


          


          .delivery-order-wrapper {
            width: 100% !important;

            margin: 0 !important;
            padding: 0 !important;
          }


          


          .no-print {
            display: none !important;
          }


          


          .invoice-paper {
            width: 210mm !important;

            min-width: 210mm !important;
            max-width: 210mm !important;

            min-height: 297mm !important;

            margin: 0 !important;

            padding: 15mm !important;

            box-sizing: border-box !important;

            background: #ffffff !important;

            border: none !important;

            border-radius: 0 !important;

            box-shadow: none !important;

            overflow: hidden !important;
          }

          @page {
            size: A4 portrait;
            margin: 0;
          }

          .main-table {
            page-break-inside: auto;
          }

          .main-table tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }


          .signature-section {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

        </style>

      </head>


      <body>

        ${A.innerHTML}


        <script>

          window.onload = function () {

            setTimeout(function () {

              window.print();

            }, 300);

          };


          window.onafterprint = function () {

            window.close();

          };

        <\/script>

      </body>

    </html>
  `),o.document.close()}const X=async()=>{const A=z.value;if(!(!A||P.value)){P.value=!0;try{const o=(await lt(async()=>{const{default:k}=await import("./DXEQVQnt.js");return{default:k}},[],import.meta.url)).default,{jsPDF:b}=await lt(async()=>{const{jsPDF:k}=await import("./CZ6NtdHu.js").then(w=>w.j);return{jsPDF:k}},__vite__mapDeps([0,1,2]),import.meta.url),r=A.cloneNode(!0),D=document.createElement("div");D.style.position="absolute",D.style.left="-99999px",D.style.top="0",D.style.width="850px",D.style.background="#ffffff",D.style.padding="0",D.style.margin="0",D.appendChild(r),document.body.appendChild(D),r.querySelectorAll(".no-print").forEach(k=>{k.style.display="none"}),r.querySelectorAll(".invoice-paper").forEach(k=>{const w=k;w.style.boxShadow="none",w.style.border="none",w.style.borderRadius="0"}),r.style.background="#ffffff";const O=Array.from(r.querySelectorAll("img"));await Promise.all(O.map(k=>k.complete?Promise.resolve():new Promise(w=>{k.onload=()=>w(),k.onerror=()=>w()})));const B=await o(r,{scale:2,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",logging:!1,imageTimeout:15e3,scrollX:0,scrollY:0,windowWidth:850});document.body.removeChild(D);const U=new b({orientation:"portrait",unit:"mm",format:"a4",compress:!0}),a=U.internal.pageSize.getWidth(),H=U.internal.pageSize.getHeight(),V=B.width,K=B.height,J=a/V,st=Math.floor(H/J);let S=0,Z=0;for(;S<K;){Z>0&&U.addPage();const k=K-S,w=Math.min(st,k),l=document.createElement("canvas");l.width=V,l.height=w;const e=l.getContext("2d");if(!e)throw new Error("Canvas context tidak tersedia.");e.fillStyle="#ffffff",e.fillRect(0,0,l.width,l.height),e.drawImage(B,0,S,V,w,0,0,V,w);const v=l.toDataURL("image/jpeg",.95),f=w*J;U.addImage(v,"JPEG",0,0,a,f,void 0,"FAST"),S+=w,Z++}const rt=new Date().getFullYear(),pt=x.invoiceDetail?.id||"DO";U.save(`Delivery-Order-DRM-${rt}.pdf`)}catch(o){console.error("Gagal menyimpan PDF Delivery Order:",o),alert("Gagal membuat PDF. Silakan buka Console (F12) untuk melihat detail error.")}finally{P.value=!1}}};return(A,o)=>(d(),c("div",ae,[t("div",{ref_key:"printArea",ref:z,class:"invoice-paper-wrapper"},[s(W,{width:"850",class:"pa-10 invoice-paper elevation-2 mx-auto"},{default:m(()=>[o[16]||(o[16]=t("div",{class:"header-section text-center mb-6"},[t("div",{class:"d-flex align-center justify-center mb-2"},[t("img",{src:Ft,class:"logo-header mr-3",alt:"Logo Perusahaan"}),t("h1",{class:"company-name"},"PT. DUTA RAYA MARINE")]),t("div",{class:"company-address"},[p(" Ruko Dream Land Blok A No.05, Dreamland Square, Marina City, "),t("br"),p(" Tanjung Riau, Kec. Sekupang, Kota Batam 29425. "),t("br"),p(" Hp. +62853 6201 8099 ")]),t("div",{class:"document-title mt-4"},"DELIVERY ORDER")],-1)),t("div",oe,[t("table",le,[t("tbody",null,[t("tr",null,[o[0]||(o[0]=t("td",{width:"140"},"Company Name",-1)),o[1]||(o[1]=t("td",{width:"15"},":",-1)),t("td",null,n(C.invoiceDetail.nama_customer),1)]),t("tr",null,[o[2]||(o[2]=t("td",{style:{"vertical-align":"top"}},"Address",-1)),o[3]||(o[3]=t("td",{style:{"vertical-align":"top"}},":",-1)),t("td",se,n(C.invoiceDetail.alamat_customer),1)]),t("tr",null,[o[4]||(o[4]=t("td",null,"Quotation No.",-1)),o[5]||(o[5]=t("td",null,":",-1)),t("td",null,n(C.invoiceDetail.no_penawaran),1)]),t("tr",null,[o[6]||(o[6]=t("td",null,"PO No.",-1)),o[7]||(o[7]=t("td",null,":",-1)),t("td",null,n(C.invoiceDetail.no_preorder),1)]),t("tr",null,[o[8]||(o[8]=t("td",null,"Invoice No.",-1)),o[9]||(o[9]=t("td",null,":",-1)),t("td",null,"INV/DRM/2026/"+n(C.invoiceDetail.no_inv),1)]),t("tr",null,[o[10]||(o[10]=t("td",null,"Vessel",-1)),o[11]||(o[11]=t("td",null,":",-1)),t("td",null,n(C.invoiceDetail.vessel||"-"),1)]),o[12]||(o[12]=t("tr",null,[t("td",null,"Location"),t("td",null,":"),t("td",null,"Batam")],-1))])])]),t("table",re,[o[13]||(o[13]=t("thead",null,[t("tr",null,[t("th",{width:"4%",class:"text-center"},"No"),t("th",{width:"47%"},"Desc"),t("th",{width:"15%",class:"text-center"},"Qty")])],-1)),t("tbody",null,[(d(!0),c(q,null,G(C.invoiceDetail.item_pekerjaan,(b,r)=>(d(),c("tr",{key:"do-item-"+r},[b.kategori_item=="Barang"||b.kategori_item=="Barang & Jasa"?(d(),c("td",de,n(r+1)+".",1)):y("",!0),b.kategori_item=="Barang"||b.kategori_item=="Barang & Jasa"?(d(),c("td",ue,[t("div",ce,n(b.nama),1)])):y("",!0),b.kategori_item=="Barang"||b.kategori_item=="Barang & Jasa"?(d(),c("td",me,n(b.qty)+" "+n(b.uom||"Unit"),1)):y("",!0)]))),128))])]),t("div",pe,[t("div",fe," Received by : "+n(Q(C.invoiceDetail.tanggal)),1),o[14]||(o[14]=t("div",{class:"stamp-box mb-3"},null,-1)),o[15]||(o[15]=t("div",{class:"received-details"},[t("div",{class:"d-flex align-center mb-1"},[t("span",{class:"label-field"}," Name "),t("span",null," : ........................................................... ")]),t("div",{class:"d-flex align-center"},[t("span",{class:"label-field"}," Date "),t("span",null," : ........................................................... ")])],-1))])]),_:1})],512),t("div",ge,[s(R,{color:"red",variant:"elevated","prepend-icon":"mdi-file-pdf-box",loading:i(P),onClick:X},{default:m(()=>[...o[17]||(o[17]=[p(" Save PDF Delivery Order ",-1)])]),_:1},8,["loading"]),s(R,{color:"primary",variant:"elevated","prepend-icon":"mdi-printer",class:"ml-2",onClick:F},{default:m(()=>[...o[18]||(o[18]=[p(" Cetak Delivery Order ",-1)])]),_:1})])]))}}),ye=mt(ve,[["__scopeId","data-v-b6ad5865"]]),be=""+new URL("ttd_seilla.DikPLsan.png",import.meta.url).href,_e=""+new URL("ttd_leo.CeDrTxz-.png",import.meta.url).href,we=""+new URL("ttd_ridwan.yNz7_L_q.png",import.meta.url).href,he={class:"finish-dialog-header"},ke={class:"finish-header-icon"},Ae={class:"form-section"},Se={class:"section-title"},Ne={class:"form-section mt-6"},De={class:"section-title"},Ce={class:"upload-card"},xe={for:"upload-po",class:"upload-area"},Ee=["disabled"],Re={class:"upload-icon-wrapper"},Ie={key:0,class:"upload-loading"},Te={key:0,class:"selected-files mt-4"},Me={class:"selected-files-header"},Pe={class:"file-count"},Oe={class:"po-file-list"},Be={class:"file-left"},Ue={class:"file-icon"},Ve={class:"file-info"},Le={class:"po-file-name"},je={class:"file-size"},$e=["disabled","onClick"],ze={class:"preview-container d-flex justify-center"},Fe={class:"invoice-top-inner"},He={class:"invoice-main-info"},Ke={class:"invoice-icon-box"},Ye={class:"invoice-heading"},qe={class:"invoice-number"},Ge={class:"text-caption"},We={class:"text-caption font-weight-bold",style:{display:"flex"}},Je={class:"invoice-meta"},Qe={class:"invoice-status-row"},Xe={class:"invoice-created"},Ze={class:"created-item"},ti={class:"created-item"},ei={class:"preview-container d-flex justify-center"},ii={class:"reference-grid"},ni={class:"reference-block reference-left"},ai={class:"reference-value"},oi={class:"reference-block reference-right"},li={key:0,class:"po-list"},si={key:1,class:"reference-empty"},ri={class:"reference-block reference-left payment-block"},di={class:"reference-value"},ui={class:"reference-block reference-right payment-block"},ci={key:0,class:"po-list"},mi={key:1,class:"reference-empty"},pi={class:"preview-container d-flex justify-center"},fi={class:"info-grid mb-4"},gi={class:"info-box-left"},vi={class:"w-100"},yi={style:{"vertical-align":"top"}},bi={style:{"vertical-align":"top"}},_i={width:"80"},wi={style:{"vertical-align":"top"}},hi={style:{"vertical-align":"top"}},ki={width:"80"},Ai={width:"80"},Si={width:"80"},Ni={class:"info-box-right"},Di={class:"w-100"},Ci={width:"110"},xi={width:"110"},Ei={width:"110"},Ri={width:"110"},Ii={width:"110"},Ti={class:"main-table"},Mi={width:"47%"},Pi={width:"5%"},Oi={width:"35%"},Bi={class:"no-cell v-align-middle"},Ui={class:"text-center"},Vi={class:"desc-cell"},Li={style:{"white-space":"pre-line"}},ji={class:"qty-cell v-align-middle"},$i={class:"align-center text-center"},zi={class:"qty-cell v-align-middle"},Fi={class:"align-center text-center"},Hi={class:"amount-cell v-align-middle"},Ki={class:"d-flex justify-space-between align-center"},Yi={class:"footer-value"},qi={class:"d-flex justify-space-between"},Gi={key:0},Wi={class:"footer-label"},Ji={class:"footer-value"},Qi={class:"d-flex justify-space-between"},Xi={key:1},Zi={class:"footer-label"},tn={class:"footer-value"},en={class:"d-flex justify-space-between"},nn={class:"terbilang-strip"},an={key:0},on={key:1},ln={key:0,class:"w-100"},sn={class:"remark-cell"},rn={class:"remark-border-box"},dn={class:"text-body-2 font-weight-bold"},un={class:"remark-list-style",style:{"list-style":"none"}},cn={class:"d-flex justify-space-between mt-6 page-break-section"},mn={class:"d-flex justify-space-between"},pn={class:"bank-details"},fn={class:"bank-table"},gn={key:0},vn={key:1},yn={key:2},bn={class:"mt-8 signature-area"},_n={class:"font-italic"},wn={key:3,width:"150",class:"ml-3 font-italic text-grey-lighten-1 text-caption"},hn={key:4},kn={key:5},An={key:6},Sn={key:7},Nn={class:"d-flex justify-center gap-3 mt-4"},Dn={class:"preview-container d-flex justify-center mt-8"},Cn=Nt({__name:"[id]",setup(C){const x=Qt(),z=Jt(),P=Xt(),Q=Tt(),F=Mt(),X=T(null),A=T(!1),o=T(!1),b=T(!1),r=T("en");function D(l){const e=Math.floor(Math.abs(l||0)),v=["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"],f=["","","Twenty","Thirty","Fourty","Fifty","Sixty","Seventy","Eighty","Ninety"];function h(g){if(g<20)return v[g];if(g<100)return f[Math.floor(g/10)]+(g%10?` ${v[g%10]}`:"");if(g<1e3)return`${v[Math.floor(g/100)]} Hundred${g%100?` ${h(g%100)}`:""}`;const L=[[1e9,"Billion"],[1e6,"Million"],[1e3,"Thousand"]];for(const[u,_]of L)if(g>=u)return`${h(Math.floor(g/u))} ${_}${g%u?` ${h(g%u)}`:""}`;return""}return`${l<0?"Minus ":""}${h(e)}`}Pt(async()=>{At().setLoading(!0),await x.tarikDetailInvoiceAct(F.params.id),At().setLoading(!1)});const O=Ot({dialogSelesai:!1}),B=l=>{if(!l)return"-";const e=new Date(l);return new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"2-digit",year:"numeric"}).format(e).replace(/\//g,"-")};function U(){O.dialogSelesai=!0}const a=Bt(()=>x.getDetailInvoice),H=new Map;function V(l){try{let e=l.dataUrl;if(e.startsWith("data:")){const v=H.get(e);if(v)e=v;else{const f=e.indexOf(","),h=e.slice(0,f);if(f<0||!h.endsWith(";base64"))throw new Error("Format dokumen PO tidak valid");const g=Uint8Array.from(atob(e.slice(f+1)),_=>_.charCodeAt(0)),L=h.slice(5).split(";")[0]||l.contentType||"application/octet-stream",u=URL.createObjectURL(new Blob([g],{type:L}));H.set(e,u),e=u}}window.open(e,"_blank","noopener,noreferrer")}catch{P.showError("Dokumen PO tidak dapat dibuka. Silakan coba unggah ulang file.")}}Ut(()=>{H.forEach(l=>URL.revokeObjectURL(l)),H.clear()});const K=T(null);function J(){z.setReset(),A.value=!1}async function st(){const l=F.params.id,e=JSON.parse(JSON.stringify(a.value));e.status="Dikirim",e.dokumen_dikirim=z.getUrlRef,e.dikirimAt=kt().unix(),e.dikirimBy=Q.getEmail,await x.updateInvoiceAct(l,e)&&(await x.tarikDetailInvoiceAct(l),J(),Lt("/admin/invoice/dikirim"))}const S=T([]);function Z(l){return new Promise((e,v)=>{const f=new FileReader;f.onload=()=>{typeof f.result=="string"?e(f.result):v(new Error("File PO tidak dapat dibaca"))},f.onerror=()=>v(f.error||new Error("File PO tidak dapat dibaca")),f.onabort=()=>v(new Error("Pembacaan file PO dibatalkan")),f.readAsDataURL(l)})}function rt(l){const e=l.target;e.files&&e.files.length>0&&(S.value=[...S.value,...Array.from(e.files)]),e.value=""}async function pt(){if(!a.value.tanggal_bayar){P.showError("Tanggal di Bayar wajib diisi!");return}if(!await X.value?.show("Konfirmasi Selesai","Anda yakin ingin mengubah status invoice menjadi Selesai?"))return;const e=F.params.id,v=JSON.parse(JSON.stringify(a.value)),f=[];for(const g of S.value)f.push({name:g.name,dataUrl:await Z(g),size:g.size,contentType:g.type||"application/octet-stream"});v.doc_bukti_bayar=[...a.value.doc_bukti_bayar||[],...f],v.status="Selesai",v.tanggal_bayar=a.value.tanggal_bayar,v.selesaiAt=kt().unix(),v.selesaiBy=Q.getEmail,await x.updateInvoiceAct(e,v)&&(S.value=[],O.dialogSelesai=!1,await x.tarikDetailInvoiceAct(e))}function k(){const l=K.value;if(!l)return;const e=window.open("","_blank");if(!e)return;const v=Array.from(document.querySelectorAll('style, link[rel="stylesheet"]')).map(f=>f.outerHTML).join("");e.document.write(`
    <html>
      <head>
        <title>INV - </title>
        ${v}

        <style>
          body {
            background: white !important;
            margin: 0;
            padding: 0;
          }

          .invoice-paper {
            border: none !important;
            box-shadow: none !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          .logo-header {
            max-width: 100px !important;
            height: auto !important;
          }

          @page {
            margin: 0.5cm;
          }

          .page-break-section {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        </style>
      </head>

      <body>
        ${l.innerHTML}

        <script>
          window.onload = () => {
            window.print();
            window.close();
          };
        <\/script>
      </body>
    </html>
  `),e.document.close()}const w=async()=>{const l=K.value;if(!(!l||o.value)){o.value=!0;try{const[{default:e},{jsPDF:v}]=await Promise.all([lt(()=>import("./DXEQVQnt.js"),[],import.meta.url),lt(()=>import("./CZ6NtdHu.js").then(I=>I.j),__vite__mapDeps([0,1,2]),import.meta.url)]),f=await e(l,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1,onclone:I=>{I.querySelectorAll(".no-print, .no-print-cell, .drag-icon").forEach(M=>{M.style.display="none"}),I.querySelectorAll(".print-only-cell").forEach(M=>{M.style.display="table-cell"})}}),h=new v("p","mm","a4"),g=h.internal.pageSize.getWidth(),L=h.internal.pageSize.getHeight(),u=5,_=12,tt=10,dt=l.getBoundingClientRect(),ft=f.height/dt.height,Dt=l.querySelectorAll(".main-table tr, .terbilang-strip, .remark-border-box, .page-break-section, .info-grid"),gt=[];Dt.forEach(I=>{const M=I.getBoundingClientRect(),vt=(M.top-dt.top)*ft,E=(M.bottom-dt.top)*ft;gt.push({top:vt,bottom:E})});let j=0,et=0;for(;j<f.height;){et>0&&h.addPage();const I=et>0?_:0,M=et>0?tt:u;let E=(L-I-M)*f.width/g;const yt=f.height-j;if(yt>E){const bt=j+E,ut=gt.find(_t=>bt>_t.top&&bt<_t.bottom);ut&&ut.top>j&&(E=ut.top-j)}else E=yt;const Y=document.createElement("canvas");Y.width=f.width,Y.height=E;const it=Y.getContext("2d");it&&(it.fillStyle="#ffffff",it.fillRect(0,0,Y.width,Y.height),it.drawImage(f,0,j,f.width,E,0,0,f.width,E));const Et=Y.toDataURL("image/png"),Rt=E*g/f.width;h.addImage(Et,"PNG",0,I,g,Rt),j+=E,et++}const Ct=new Date().getFullYear(),xt=a.value?.id||F.params.id;h.save(`INV-DRM-${Ct}-${xt}.pdf`)}catch(e){console.error("Gagal menyimpan PDF:",e)}finally{o.value=!1}}};return(l,e)=>{const v=jt,f=$t,h=ne,g=zt,L=ye;return d(),c("div",null,[s(v,{ref_key:"confirmationDialog",ref:X},null,512),s(R,{variant:"text",color:"grey-darken-3","prepend-icon":"mdi-arrow-left",onClick:e[0]||(e[0]=u=>l.$router.go(-1)),class:"text-capitalize font-weight-bold mb-2"},{default:m(()=>[...e[6]||(e[6]=[p(" Kembali ",-1)])]),_:1}),s(St,{modelValue:i(A),"onUpdate:modelValue":e[1]||(e[1]=u=>Vt(A)?A.value=u:null),"max-width":"500",persistent:""},{default:m(()=>[s(W,{class:"rounded-lg"},{default:m(()=>[s(Ht,{class:"bg-primary text-white pa-4"},{default:m(()=>[...e[7]||(e[7]=[p(" Kirim Invoice ",-1)])]),_:1}),s(ht,{class:"pa-4 bg-grey-lighten-4"},{default:m(()=>[s(Zt),s(R,{variant:"outlined",color:"grey-darken-1",onClick:J},{default:m(()=>[...e[8]||(e[8]=[p(" Batal ",-1)])]),_:1}),s(R,{color:"primary",variant:"flat","prepend-icon":"mdi-send",onClick:st},{default:m(()=>[...e[9]||(e[9]=[p(" Simpan & Kirim ",-1)])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),s(St,{modelValue:i(O).dialogSelesai,"onUpdate:modelValue":e[4]||(e[4]=u=>i(O).dialogSelesai=u),"max-width":"700",scrollable:"",persistent:i(b)},{default:m(()=>[s(W,{class:"finish-invoice-dialog",rounded:"xl"},{default:m(()=>[t("div",he,[t("div",ke,[s(N,{icon:"mdi-check-circle-outline",size:"28"})]),e[10]||(e[10]=t("div",null,[t("div",{class:"finish-header-title"},"Selesaikan Invoice"),t("div",{class:"finish-header-subtitle"}," Lengkapi tanggal pembayaran dan bukti pembayaran ")],-1))]),s(at),s(Kt,{class:"pa-6"},{default:m(()=>[t("div",Ae,[t("div",Se,[s(N,{icon:"mdi-calendar-check-outline",size:"19",class:"mr-2"}),e[11]||(e[11]=p(" Informasi Pembayaran ",-1))]),s(f,{label:"Tanggal Dibayar",modelValue:i(a).tanggal_bayar,"onUpdate:modelValue":e[2]||(e[2]=u=>i(a).tanggal_bayar=u)},null,8,["modelValue"])]),t("div",Ne,[t("div",De,[s(N,{icon:"mdi-file-document-outline",size:"19",class:"mr-2"}),e[12]||(e[12]=p(" Bukti Pembayaran ",-1))]),t("div",Ce,[t("label",xe,[t("input",{id:"upload-po",type:"file",multiple:"",class:"po-file-input",disabled:i(b),onChange:rt},null,40,Ee),t("div",Re,[s(N,{icon:"mdi-cloud-upload-outline",size:"30"})]),e[13]||(e[13]=t("div",{class:"upload-content"},[t("div",{class:"upload-title"},"Klik untuk memilih file"),t("div",{class:"upload-description"}," Upload bukti pembayaran invoice "),t("div",{class:"upload-limit"},"Maksimal ukuran file 650 KB")],-1))]),i(b)?(d(),c("div",Ie,[s(Yt,{indeterminate:"",size:"20",width:"2",class:"mr-2"}),e[14]||(e[14]=p(" Membaca file... ",-1))])):y("",!0)]),i(S).length?(d(),c("div",Te,[t("div",Me,[e[15]||(e[15]=t("div",{class:"selected-files-title"},"File Terpilih",-1)),t("div",Pe,n(i(S).length)+" file",1)]),t("div",Oe,[(d(!0),c(q,null,G(i(S),(u,_)=>(d(),c("div",{key:_,class:"po-file-item"},[t("div",Be,[t("div",Ue,[s(N,{icon:"mdi-file-check-outline",size:"20"})]),t("div",Ve,[t("div",Le,n(u.name),1),t("div",je,n(Math.ceil(u.size/1024))+" KB ",1)])]),t("button",{type:"button",class:"po-file-remove",disabled:i(b),onClick:tt=>i(S).splice(_,1)},[s(N,{icon:"mdi-close",size:"18"})],8,$e)]))),128))])])):y("",!0)])]),_:1}),s(at),s(ht,{class:"dialog-footer"},{default:m(()=>[s(R,{variant:"text",color:"grey-darken-1",disabled:i(b)||l.savingInvoice,onClick:e[3]||(e[3]=u=>i(O).dialogSelesai=!1)},{default:m(()=>[...e[16]||(e[16]=[p(" Batal ",-1)])]),_:1},8,["disabled"]),s(R,{color:"primary",variant:"flat",rounded:"lg","prepend-icon":"mdi-check-circle-outline",loading:l.savingInvoice,disabled:i(b)||l.savingInvoice,onClick:pt},{default:m(()=>[...e[17]||(e[17]=[p(" Simpan Bukti Bayar ",-1)])]),_:1},8,["loading","disabled"])]),_:1})]),_:1})]),_:1},8,["modelValue","persistent"]),i(a).status=="Selesai"?(d(),$(h,{key:0})):y("",!0),t("div",ze,[s(W,{flat:"",class:"invoice-top-card border rounded-lg mb-3 elevation-1",width:"850"},{default:m(()=>[t("div",Fe,[t("div",He,[t("div",Ke,[s(N,{size:"21",color:"white"},{default:m(()=>[...e[18]||(e[18]=[p(" mdi-file-document-outline ",-1)])]),_:1})]),t("div",Ye,[e[22]||(e[22]=t("div",{class:"invoice-eyebrow"},"INVOICE",-1)),t("div",qe," #INV/DRM/2026/"+n(i(a).id),1),s(g,{to:"/admin/penawaran/"+i(a).id_penawaran,class:"quotation-link"},{default:m(()=>[e[20]||(e[20]=t("span",null,"Quotation",-1)),t("strong",null,n(i(a).no_penawaran),1),s(N,{size:"13"},{default:m(()=>[...e[19]||(e[19]=[p("mdi-open-in-new",-1)])]),_:1})]),_:1},8,["to"]),s(at,{class:"my-2"}),t("div",Ge,n(i(a).perihal),1),t("div",We,[s(N,{color:"#1e3a5f",class:"mr-1"},{default:m(()=>[...e[21]||(e[21]=[p("mdi-domain",-1)])]),_:1}),p(n(i(a).nama_customer),1)])])]),t("div",Je,[t("div",Qe,[s(ot,{size:"small",variant:"flat",class:"invoice-status",label:""},{default:m(()=>[p(n(i(a).status),1)]),_:1}),i(a).status=="Draft"?(d(),$(ot,{key:0,"prepend-icon":"mdi-check-circle-outline",color:"primary",size:"small",class:"invoice-complete-btn",label:"",onClick:U},{default:m(()=>[...e[23]||(e[23]=[p(" Upload Bukti Bayar (Selesai) ",-1)])]),_:1})):y("",!0)]),t("div",Xe,[t("div",Ze,[s(N,{size:"15"},{default:m(()=>[...e[24]||(e[24]=[p("mdi-account-circle-outline",-1)])]),_:1}),t("span",null,n(i(a).createdBy),1)]),e[26]||(e[26]=t("span",{class:"created-separator"},"•",-1)),t("div",ti,[s(N,{size:"15"},{default:m(()=>[...e[25]||(e[25]=[p("mdi-clock-outline",-1)])]),_:1}),t("span",null,n(("rubahtanggalunix"in l?l.rubahtanggalunix:i(qt))(i(a).createdAt)),1)])])])])]),_:1})]),t("div",ei,[s(W,{flat:"",class:"invoice-reference-card border rounded-lg mb-3 elevation-1",width:"850"},{default:m(()=>[t("div",ii,[t("div",ni,[e[27]||(e[27]=t("div",{class:"reference-label"},"INVOICE BASED ON",-1)),t("div",ai,n(i(a).no_preorder||"-"),1)]),t("div",oi,[e[29]||(e[29]=t("div",{class:"reference-label"},"PURCHASE ORDER DOCUMENT",-1)),i(a).doc_preorder?.length?(d(),c("div",li,[(d(!0),c(q,null,G(i(a).doc_preorder,(u,_)=>(d(),$(ot,{key:_,size:"small",variant:"outlined",class:"po-chip font-weight-medium",label:"",href:u.dataUrl,onClick:wt(tt=>V(u),["prevent"]),target:"_blank",rel:"noopener noreferrer"},{default:m(()=>[s(N,{size:"14",class:"mr-1"},{default:m(()=>[...e[28]||(e[28]=[p(" mdi-file-document-outline ",-1)])]),_:1}),p(" "+n(u.name),1)]),_:2},1032,["href","onClick"]))),128))])):(d(),c("div",si,"No document attached"))]),e[33]||(e[33]=t("div",{class:"reference-divider"},null,-1)),t("div",ri,[e[30]||(e[30]=t("div",{class:"reference-label"},"TANGGAL BAYAR",-1)),t("div",di,n(i(a).tanggal_bayar||"-"),1)]),t("div",ui,[e[32]||(e[32]=t("div",{class:"reference-label"},"DOC. BUKTI BAYAR",-1)),i(a).doc_bukti_bayar?.length?(d(),c("div",ci,[(d(!0),c(q,null,G(i(a).doc_bukti_bayar,(u,_)=>(d(),$(ot,{key:_,size:"small",variant:"outlined",class:"po-chip font-weight-medium",label:"",href:u.dataUrl,onClick:wt(tt=>V(u),["prevent"]),target:"_blank",rel:"noopener noreferrer"},{default:m(()=>[s(N,{size:"14",class:"mr-1"},{default:m(()=>[...e[31]||(e[31]=[p(" mdi-file-document-outline ",-1)])]),_:1}),p(" "+n(u.name),1)]),_:2},1032,["href","onClick"]))),128))])):(d(),c("div",mi,"No document attached"))])])]),_:1})]),t("div",pi,[t("div",{ref_key:"printArea",ref:K,class:"invoice-paper-wrapper"},[s(R,{class:"no-print text-center mx-auto mb-3",size:"x-small",color:"primary","prepend-icon":"mdi-translate-variant",block:"",onClick:e[5]||(e[5]=u=>r.value=i(r)==="en"?"id":"en")},{default:m(()=>[p(n(i(r)==="en"?"English":"Indonesia"),1)]),_:1}),s(W,{width:"850",class:"pa-10 invoice-paper elevation-2"},{default:m(()=>[e[85]||(e[85]=t("div",{class:"letterhead"},[t("div",{class:"header-section"},[t("div",{class:"logo-wrapper"},[t("img",{src:Wt,alt:"Logo Header"})]),t("div",{class:"letterhead-info"},[t("h1",{class:"company-name"},"PT. DUTA RAYA MARINE"),t("p",{class:"address-line"},[p(" Cipta Grand City G-8, Sagulung, Kota Batam, "),t("br"),p(" Kepulauan Riau 29425 ")]),t("p",{class:"phone-line"},[p(" E-mail: sales@dutarayamarine.com, HP : (+62) 853 6201 8099 "),t("br"),p(" Website: www.dutarayamarine.com ")])]),t("div",{class:"header-spacer","aria-hidden":"true"})]),t("div",{class:"header-divider"},[t("div",{class:"accent-bar"}),t("div",{class:"secondary-bar"})])],-1)),e[86]||(e[86]=t("div",{class:"text-center my-3 font-weight-bold"},[t("span",{class:"font-weight-bold",style:{"font-size":"23px"}},"INVOICE")],-1)),t("div",fi,[t("div",gi,[t("table",vi,[t("tbody",null,[t("tr",null,[t("td",yi,n(i(r)==="id"?"Perihal":"Subject"),1),e[34]||(e[34]=t("td",{style:{"vertical-align":"top"}},":",-1)),t("td",bi,n(i(a).perihal),1)]),t("tr",null,[t("td",_i,n(i(r)==="id"?"Pelanggan":"Customer"),1),e[35]||(e[35]=t("td",{width:"10"},":",-1)),t("td",null,[t("span",null,n(i(a).nama_customer),1)])]),t("tr",null,[t("td",wi,n(i(r)==="id"?"Alamat":"Address"),1),e[36]||(e[36]=t("td",{style:{"vertical-align":"top"}},":",-1)),t("td",hi,n(i(a).alamat_customer),1)]),t("tr",null,[t("td",ki,n(i(r)==="id"?"PIC":"Attn"),1),e[37]||(e[37]=t("td",{width:"10"},":",-1)),t("td",null,[t("span",null,n(i(a).pic),1)])]),t("tr",null,[t("td",Ai,n(i(r)==="id"?"Kapal":"Vessel"),1),e[38]||(e[38]=t("td",{width:"10"},":",-1)),t("td",null,[t("span",null,n(i(a).vessel),1)])]),t("tr",null,[t("td",Si,n(i(r)==="id"?"Lokasi":"Location"),1),e[39]||(e[39]=t("td",{width:"10"},":",-1)),e[40]||(e[40]=t("td",null,[t("span",null,"Batam")],-1))])])])]),t("div",Ni,[t("table",Di,[t("tbody",null,[t("tr",null,[t("td",Ci,n(i(r)==="id"?"No. Penawaran":"Quotation No"),1),e[41]||(e[41]=t("td",{width:"10"},":",-1)),t("td",null,n(i(a).no_penawaran),1)]),t("tr",null,[t("td",xi,n(i(r)==="id"?"Tanggal Penawaran":"Quotation Date"),1),e[42]||(e[42]=t("td",{width:"10"},null,-1)),t("td",null,n(B(i(a).tanggal_penawaran)),1)]),t("tr",null,[t("td",Ei,n(i(r)==="id"?"No. PO":"PO No"),1),e[43]||(e[43]=t("td",{width:"10"},":",-1)),t("td",null,n(i(a).no_preorder),1)]),t("tr",null,[t("td",Ri,n(i(r)==="id"?"Tanggal PO":"PO Date"),1),e[44]||(e[44]=t("td",{width:"10"},":",-1)),t("td",null,n(B(i(a).tanggal_preorder)),1)]),t("tr",null,[t("td",Ii,n(i(r)==="id"?"No. Invoice":"Invoice No"),1),e[45]||(e[45]=t("td",{width:"10"},":",-1)),t("td",null,"INV/DRM/2026/"+n(i(a).no_inv),1)]),t("tr",null,[t("td",null,n(i(r)==="id"?"Tanggal Invoice":"Invoice Date"),1),e[46]||(e[46]=t("td",null,":",-1)),t("td",null,n(B(i(a).tanggal)),1)]),t("tr",null,[t("td",null,n(i(r)==="id"?"Mata Uang":"Currency"),1),e[47]||(e[47]=t("td",null,":",-1)),e[48]||(e[48]=t("td",null,"IDR – (Rupiah)",-1))])])])])]),t("table",Ti,[t("thead",null,[t("tr",null,[e[49]||(e[49]=t("th",{width:"3%"},"NO.",-1)),t("th",Mi,n(i(r)==="id"?"DESKRIPSI":"DESCRIPTION"),1),e[50]||(e[50]=t("th",{width:"5%"},"QTY",-1)),t("th",Pi,n(i(r)==="id"?"SATUAN":"UOM"),1),t("th",Oi,n(i(r)==="id"?"JUMLAH":"AMOUNT"),1)])]),t("tbody",null,[(d(!0),c(q,null,G(i(a).item_pekerjaan,(u,_)=>(d(),c("tr",{key:_},[t("td",Bi,[t("div",Ui,[t("span",null,n(_+1)+".",1)])]),t("td",Vi,[t("div",null,[t("span",Li,n(u.nama),1)])]),t("td",ji,[t("div",$i,[t("span",null,n(u.qty),1)])]),t("td",zi,[t("div",Fi,[t("span",null,n(u.uom),1)])]),t("td",Hi,[t("div",Ki,[e[51]||(e[51]=t("span",null,"Rp",-1)),t("span",null,n(("rupiah"in l?l.rupiah:i(nt))(u.amount)),1)])])]))),128)),t("tr",null,[e[53]||(e[53]=t("td",null,null,-1)),e[54]||(e[54]=t("td",null,null,-1)),e[55]||(e[55]=t("td",null,null,-1)),e[56]||(e[56]=t("td",{class:"footer-label"},[t("span",null,"TOTAL")],-1)),t("td",Yi,[t("div",qi,[e[52]||(e[52]=t("span",null,"Rp",-1)),t("span",null,n(("rupiah"in l?l.rupiah:i(nt))(i(a).subtotal_invoice)),1)])])]),i(a).pakai_ppn==!0?(d(),c("tr",Gi,[e[58]||(e[58]=t("td",null,null,-1)),e[59]||(e[59]=t("td",null,null,-1)),e[60]||(e[60]=t("td",null,null,-1)),t("td",Wi,[t("strong",null,n(i(r)==="id"?"PPN 11%":"VAT 11%"),1)]),t("td",Ji,[t("div",Qi,[e[57]||(e[57]=t("span",null,"Rp",-1)),t("span",null,n(("rupiah"in l?l.rupiah:i(nt))(i(a).ppn)),1)])])])):y("",!0),i(a).dp_persen>0?(d(),c("tr",Xi,[e[62]||(e[62]=t("td",null,null,-1)),e[63]||(e[63]=t("td",null,null,-1)),e[64]||(e[64]=t("td",null,null,-1)),t("td",Zi,[t("strong",null,n(i(r)==="id"?"Uang Muka":"Down Payment")+" "+n(i(a).dp_persen)+" %",1)]),t("td",tn,[t("div",en,[e[61]||(e[61]=t("span",null,"Rp",-1)),t("strong",null,n(("rupiah"in l?l.rupiah:i(nt))(i(a).grandtotal_invoice)),1)])])])):y("",!0)])]),t("div",nn,[i(r)==="id"?(d(),c("span",an," Terbilang: #"+n(("jadirupiah"in l?l.jadirupiah:i(Gt))(i(a).grandtotal_invoice))+" Rupiah. ",1)):(d(),c("span",on," Amount in words: #"+n(D(i(a).grandtotal_invoice))+" Rupiah. ",1))]),i(a).termCondition?.length>0?(d(),c("table",ln,[t("tbody",null,[t("tr",null,[t("td",sn,[t("div",rn,[t("strong",dn,n(i(r)==="id"?"SYARAT & KETENTUAN :":"TERMS & CONDITIONS :"),1),t("ul",un,[(d(!0),c(q,null,G(i(a).termCondition,(u,_)=>(d(),c("li",{key:_},n(_+1)+". "+n(u.nama_term),1))),128))])])])])])])):y("",!0),t("div",cn,[t("div",mn,[t("div",pn,[t("div",null,[t("table",fn,[i(a).sign_by=="Seilla Maryana"?(d(),c("tbody",gn,[t("tr",null,[t("td",null,n(i(r)==="id"?"NAMA BANK":"BANK NAME"),1),e[65]||(e[65]=t("td",null,":",-1)),e[66]||(e[66]=t("td",null,"BCA",-1))]),t("tr",null,[t("td",null,n(i(r)==="id"?"NOMOR REKENING":"ACCOUNT NUMBER"),1),e[67]||(e[67]=t("td",null,":",-1)),e[68]||(e[68]=t("td",null,"8551 0635 77",-1))]),t("tr",null,[t("td",null,n(i(r)==="id"?"ATAS NAMA":"BENEFICIARY NAME"),1),e[69]||(e[69]=t("td",null,":",-1)),e[70]||(e[70]=t("td",null,"Seilla Maryana",-1))])])):y("",!0),i(a).sign_by=="Leo Adiatmaja Sembiring"?(d(),c("tbody",vn,[t("tr",null,[t("td",null,n(i(r)==="id"?"NAMA BANK":"BANK NAME"),1),e[71]||(e[71]=t("td",null,":",-1)),e[72]||(e[72]=t("td",null,"BCA",-1))]),t("tr",null,[t("td",null,n(i(r)==="id"?"NOMOR REKENING":"ACCOUNT NUMBER"),1),e[73]||(e[73]=t("td",null,":",-1)),e[74]||(e[74]=t("td",null,"8550 7530 23",-1))]),t("tr",null,[t("td",null,n(i(r)==="id"?"ATAS NAMA":"BENEFICIARY NAME"),1),e[75]||(e[75]=t("td",null,":",-1)),e[76]||(e[76]=t("td",null,"Leo Adiatmaja Sembiring",-1))])])):y("",!0),i(a).sign_by=="Muhammad Ridwan"?(d(),c("tbody",yn,[t("tr",null,[t("td",null,n(i(r)==="id"?"NAMA BANK":"BANK NAME"),1),e[77]||(e[77]=t("td",null,":",-1)),e[78]||(e[78]=t("td",null,"BCA",-1))]),t("tr",null,[t("td",null,n(i(r)==="id"?"NOMOR REKENING":"ACCOUNT NUMBER"),1),e[79]||(e[79]=t("td",null,":",-1)),e[80]||(e[80]=t("td",null,"8691 8096 92",-1))]),t("tr",null,[t("td",null,n(i(r)==="id"?"ATAS NAMA":"BENEFICIARY NAME"),1),e[81]||(e[81]=t("td",null,":",-1)),e[82]||(e[82]=t("td",null,"Muhammad Ridwan",-1))])])):y("",!0)])])])])]),t("div",bn,[t("span",_n,n(i(r)==="id"?"Hormat kami,":"Yours sincerely,"),1),e[83]||(e[83]=t("br",null,null,-1)),e[84]||(e[84]=t("strong",null,"PT. DUTA RAYA MARINE",-1)),i(a).sign_by=="Seilla Maryana"?(d(),$(ct,{key:0,src:be,width:"150"})):y("",!0),i(a).sign_by=="Leo Adiatmaja Sembiring"?(d(),$(ct,{key:1,src:_e,width:"150",class:"ml-3"})):y("",!0),i(a).sign_by=="Muhammad Ridwan"?(d(),$(ct,{key:2,src:we,width:"150",class:"ml-3"})):y("",!0),i(a).sign_by=="Lilis Trisnawati"?(d(),c("div",wn," No Signature Required ")):y("",!0),i(a).sign_by=="Muhammad Ridwan"?(d(),c("strong",hn,"Muhammad Ridwan")):y("",!0),i(a).sign_by=="Seilla Maryana"?(d(),c("strong",kn,"Seilla Maryana")):y("",!0),i(a).sign_by=="Leo Adiatmaja Sembiring"?(d(),c("strong",An,"Leo Adiatmaja Sembiring")):y("",!0),i(a).sign_by=="Lilis Trisnawati"?(d(),c("strong",Sn,"Lilis Trisnawati")):y("",!0)])]),_:1})],512)]),t("div",Nn,[s(R,{"prepend-icon":"mdi-file-pdf-box",color:"red-darken-1",variant:"elevated",loading:i(o),onClick:w,class:"mr-2"},{default:m(()=>[...e[87]||(e[87]=[p(" Save PDF Invoice ",-1)])]),_:1},8,["loading"]),s(R,{"prepend-icon":"mdi-printer",color:"indigo",variant:"elevated",onClick:k},{default:m(()=>[...e[88]||(e[88]=[p(" Print Invoice ",-1)])]),_:1})]),s(at,{class:"my-1 mt-10",opacity:"100",color:"primary"}),t("div",Dn,[s(L,{"invoice-detail":i(a)},null,8,["invoice-detail"])])])}}}),Xn=mt(Cn,[["__scopeId","data-v-58610814"]]);export{Xn as default};
