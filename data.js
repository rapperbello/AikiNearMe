export const CATEGORIES = [
 ["Electrician","⚡"],["Plumber","🔧"],["Mechanic","🚗"],["Phone Repair","📱"],
 ["Computer Repair","💻"],["Tailor","🧵"],["Barber","💈"],["Hairdresser","💇"],
 ["Painter","🎨"],["Cleaner","🧹"],["Welder","🔥"],["Carpenter","🪚"],
 ["Generator Repair","⚙️"],["AC/Fridge Repair","❄️"],["Photographer","📷"],
 ["Graphic Designer","🖥️"],["Tutor","📚"],["Other Services","➕"]
];
export const SEED_PROVIDERS = [
 {id:"demo-1",name:"Musa Electrical Services",service:"Electrician",location:"Abuja",rating:4.8,price:2500,available:true,verified:true,premium:true,views:0,phone:"",image:"https://i.pravatar.cc/160?img=12",description:"Electrical installation, wiring and home electrical repairs.",services:["Electrical installation","Wiring","Fault finding"],reviews:[]},
 {id:"demo-2",name:"Aminu Plumbing Works",service:"Plumber",location:"Kano",rating:4.7,price:3000,available:true,verified:true,premium:false,views:0,phone:"",image:"https://i.pravatar.cc/160?img=11",description:"Pipe installation, leak repair and general plumbing.",services:["Pipe installation","Leak repair"],reviews:[]},
 {id:"demo-3",name:"Ibrahim Auto Care",service:"Mechanic",location:"Kaduna",rating:4.6,price:5000,available:false,verified:true,premium:false,views:0,phone:"",image:"https://i.pravatar.cc/160?img=13",description:"Vehicle diagnostics and general automobile maintenance.",services:["Diagnostics","Maintenance"],reviews:[]},
 {id:"demo-4",name:"SmartFix Phones",service:"Phone Repair",location:"Lagos",rating:4.9,price:1500,available:true,verified:true,premium:true,views:0,phone:"",image:"https://i.pravatar.cc/160?img=14",description:"Smartphone screen, charging port and software repairs.",services:["Screen repair","Charging port","Software"],reviews:[]},
 {id:"demo-5",name:"TechCare Computers",service:"Computer Repair",location:"Abuja",rating:4.5,price:3000,available:true,verified:false,premium:false,views:0,phone:"",image:"https://i.pravatar.cc/160?img=15",description:"Laptop troubleshooting, operating system installation and upgrades.",services:["Laptop repair","Setup","Upgrades"],reviews:[]},
 {id:"demo-6",name:"Elegant Stitches",service:"Tailor",location:"Kano",rating:4.7,price:4000,available:true,verified:true,premium:false,views:0,phone:"",image:"https://i.pravatar.cc/160?img=16",description:"Custom clothing, traditional outfits and professional tailoring.",services:["Custom outfits","Alterations"],reviews:[]}
];
const KEYS={providers:"ainm_providers",bookings:"ainm_bookings",reports:"ainm_reports",blocked:"ainm_blocked",subscriptions:"ainm_subscriptions",notices:"ainm_notifications",reviews:"ainm_reviews"};
export function read(key,fallback=[]){try{const x=JSON.parse(localStorage.getItem(KEYS[key])||"null");return x??fallback}catch{return fallback}}
export function write(key,value){localStorage.setItem(KEYS[key],JSON.stringify(value));return value}
export function initData(){if(!localStorage.getItem(KEYS.providers))write("providers",SEED_PROVIDERS);for(const k of ["bookings","reports","blocked","subscriptions","notices","reviews"])if(!localStorage.getItem(KEYS[k]))write(k,[])}
export function getProviders(){initData();return read("providers",[])}
export function saveProvider(p){const all=getProviders();const i=all.findIndex(x=>x.id===p.id);if(i>=0)all[i]={...all[i],...p};else all.push(p);write("providers",all);return p}
export function escapeHTML(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
export function money(n){return "₦"+Number(n||0).toLocaleString("en-NG")}
export function notice(type,message,bookingId=null){const ns=read("notices",[]);ns.unshift({id:crypto.randomUUID?.()||String(Date.now()),type,message,bookingId,createdAt:new Date().toISOString(),read:false});write("notices",ns.slice(0,200))}
export function selectedProvider(){try{return JSON.parse(localStorage.getItem("ainm_selected_provider")||"null")}catch{return null}}
export function setSelectedProvider(p){localStorage.setItem("ainm_selected_provider",JSON.stringify(p))}
export function todayISO(){return new Date().toISOString().slice(0,10)}
export function statusClass(s){return String(s||"pending").toLowerCase()}
export function seedIfNeeded(){initData();}