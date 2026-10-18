import {CATEGORIES,initData,getProviders,escapeHTML,money,setSelectedProvider} from "./data.js";
initData();
const $=id=>document.getElementById(id);
const grid=$("providerGrid");
function setupCategories(){
 const catGrid=$("categoryGrid"), filter=$("categoryFilter");
 CATEGORIES.forEach(([name,icon])=>{
   const opt=document.createElement("option");opt.value=name;opt.textContent=name;filter.append(opt);
   const b=document.createElement("button");b.className="category-card";b.dataset.category=name;b.innerHTML=`<span>${icon}</span><strong>${escapeHTML(name)}</strong>`;
   b.addEventListener("click",()=>{filter.value=name;document.querySelectorAll(".category-card").forEach(x=>x.classList.toggle("selected",x===b));render();$("providers").scrollIntoView({behavior:"smooth"});});
   catGrid.append(b);
 });
 const loc=$("locationFilter");["Abuja","Lagos","Kano","Kaduna","Port Harcourt","Ibadan","Jos","Other"].forEach(city=>{const o=document.createElement("option");o.value=city;o.textContent=city;loc.append(o)});
}
function render(){
 const q=$("searchInput").value.trim().toLowerCase(),loc=$("locationFilter").value,cat=$("categoryFilter").value,rat=+$("ratingFilter").value,price=+$("priceFilter").value,avail=$("availabilityFilter").value;
 const blocked=new Set(JSON.parse(localStorage.getItem("ainm_blocked")||"[]"));
 let list=getProviders().filter(p=>!blocked.has(p.id)&&(!q||[p.name,p.service,p.location,p.description,...(p.services||[])].join(" ").toLowerCase().includes(q))&&(!loc||p.location===loc)&&(!cat||p.service===cat)&&(!rat||Number(p.rating||0)>=rat)&&(!price||Number(p.price||0)<=price)&&(!avail||p.available));
 list.sort((a,b)=>Number(!!b.premium)-Number(!!a.premium)||Number(b.rating||0)-Number(a.rating||0));
 $("providerCount").textContent=`${list.length} provider${list.length===1?"":"s"}`;
 grid.innerHTML=list.map(p=>`<article class="provider-card"><div class="provider-top"><img class="provider-image" src="${escapeHTML(p.image||"https://i.pravatar.cc/160?img=5")}" alt=""><div><div class="provider-name">${escapeHTML(p.name)} ${p.verified?'<span class="verified">✓ VERIFIED</span>':""}</div><div class="provider-service">${escapeHTML(p.service)}</div><div class="provider-location">📍 ${escapeHTML(p.location)}</div></div></div><p class="provider-description">${escapeHTML(p.description)}</p><div class="provider-info"><span>⭐ ${Number(p.rating||0).toFixed(1)} · ${p.available?"Available":"Unavailable"}</span><b>From ${money(p.price)}</b></div><div class="provider-actions"><button class="view-btn" data-view="${p.id}">View profile</button><button class="contact-btn" data-book="${p.id}">Request service</button></div></article>`).join("");
 $("emptyState").classList.toggle("hidden",list.length>0);
 grid.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>{const p=getProviders().find(x=>x.id===b.dataset.view);if(p){setSelectedProvider(p);location.href="provider.html"}});
 grid.querySelectorAll("[data-book]").forEach(b=>b.onclick=()=>{const p=getProviders().find(x=>x.id===b.dataset.book);if(p){setSelectedProvider(p);location.href="booking.html"}});
}
setupCategories();render();
["searchInput","locationFilter","categoryFilter","ratingFilter","priceFilter","availabilityFilter"].forEach(id=>$(id).addEventListener("input",render));
$("searchBtn").onclick=()=>{$("providers").scrollIntoView({behavior:"smooth"});render()};
$("clearFilters").onclick=()=>{["searchInput","locationFilter","categoryFilter","ratingFilter","priceFilter","availabilityFilter"].forEach(id=>$(id).value="");document.querySelectorAll(".category-card").forEach(x=>x.classList.remove("selected"));render()};
$("menuBtn").onclick=()=>$("mainNav").classList.toggle("open");